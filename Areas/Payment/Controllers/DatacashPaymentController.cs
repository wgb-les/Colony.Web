using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using Colony.Commerce;
using Colony.Commerce.Areas.ShopPurchase;
using Colony.Commerce.Models;
using Colony.Commerce.Models.ShopPurchase;
using Colony.Commerce.PaymentProvider.DataCash.Library;
using Colony.Commerce.PaymentProvider.DataCash.Library.Util;
using Colony.Commerce.PaymentProvider.DataCash.Models;
using Colony.Commerce.Services.ShopPurchase;

namespace Colony.Web.Areas.Payment.Controllers
{
	public class DatacashPaymentController : ColonyCommerceFrontendController
	{
		private class DataCashPayment
		{
			public DataCashPayment(Transaction transaction) { }
			public string AcsUrl { get; set; }
			public string PaReq { get; set; }
			public string MD { get; set; }
			public void Update() { }
		}
		
		private string DataCashId { get; set; }
		private string DataCashPassword { get; set; }
		private string ReportedUrl = "http://www.colonycms.co.uk";
		private string PurchaseDescription = "Colony Commerce Purchase";
		private ITransactionService _transactionService;

		public DatacashPaymentController()
		{
			this.DataCashId= ConfigurationManager.AppSettings["DatacashID"];
			this.DataCashPassword= ConfigurationManager.AppSettings["DatacashPassword"];
			_transactionService = GetService<ITransactionService>();
		}

		public ActionResult MakePayment()
		{
			ViewBag.Title = "Payment";
			return View(new PaymentViewModel());
		}

		[HttpPost]
		public ActionResult MakePayment(PaymentViewModel model)
		{
			var transaction = _transactionService.GetById(long.Parse(model.TransactionId));

			var gateway = new BiteDatacashGateway(this.DataCashId, this.DataCashPassword,
				transaction.Id.ToString(), "GBP", this.PurchaseDescription,
				DeviceUsed.PC, this.ReportedUrl, HttpContext);

			var paymentDetails = new PaymentDetails
			{
				Amount = model.Amount,
				CardNumber = model.CardNumber,
				IssueNumber = model.IssueNumber,
				ExpiryMonth = model.ExpiryMonth,
				ExpiryYear = model.ExpiryYear,
				SecureCode = model.Cv2,
				CaptureMethod = CaptureMethod.ECOMM
			};
			if (!String.IsNullOrEmpty(model.StartYear))
			{
				paymentDetails.StartMonth = model.StartMonth;
				paymentDetails.StartYear = model.StartYear;
			}

			XmlDocument xml = new XmlDocument();
			xml.LoadXml(transaction.CheckOutXml);

			var billingXml = xml.SelectSingleNode("");

			var addressDetails = new BillingAddress
			{
				AddressLine1 = billingXml.SelectSingleNode("").Value,
				AddressLine2 = billingXml.SelectSingleNode("").Value,
				AddressLine3 = billingXml.SelectSingleNode("").Value,
				AddressLine4 = billingXml.SelectSingleNode("").Value,
				Postcode = billingXml.SelectSingleNode("").Value
			};

			var paymentResponse = gateway.ProcessPayment(paymentDetails, addressDetails, _transactionService.GetPaymentReference(transaction));
			
			_transactionService.LogPaymentInformation(transaction, gateway.Response, true);

			if (paymentResponse == BiteDatacashGateway.ResponseStatus.SendThreeDSecureRequest)
			{
				DataCashPayment payment = new DataCashPayment(transaction);

				var datacashReference = gateway.Response.DatacashReference;
				payment.AcsUrl = gateway.Response.acsUrl;
				payment.PaReq = gateway.Response.PAReqMessage;
				payment.MD = String.Format("{0}|{1}", gateway.Response.DatacashReference,
													  gateway.Response.TransactionReference);

				payment.Update();

				return RedirectToAction("Payment3dSecureContainer");
			}
			else
			{
				if (paymentResponse == BiteDatacashGateway.ResponseStatus.Accepted)
				{
					_transactionService.ProcessSuccessfulPayment(transaction);
				}
				else if (paymentResponse == BiteDatacashGateway.ResponseStatus.ThreeDSecureNotEnrolled)
				{
					_transactionService.ProcessFailedPayment(transaction, TransactionStatus.ThreeDSecureNotEnrolled);
				}
				else
				{
					_transactionService.ProcessFailedPayment(transaction, TransactionStatus.CardRefused);
				}
				return RedirectToAction("Receipt", "OnlinePayments", new { transactionId = transaction.Id });
			}
		}

		[HttpGet]
		public ActionResult Payment3dSecureContainer()
		{
			return View();
		}

		[HttpGet]
		public ActionResult Payment3dSecureIframe()
		{

			var transaction = _transactionService.GetById(BasketContext.Current.TransactionId.Value);
			
			DataCashPayment payment = new DataCashPayment(transaction);

			string hostUrl = Request.Url.Scheme + "://" + Request.ServerVariables["HTTP_HOST"];
			Payment3dSecureIframeViewModel model = new Payment3dSecureIframeViewModel
			{
				AcsUrl = payment.AcsUrl,
				PaReq = payment.PaReq,
				MD = payment.MD,
				TermUrl = new Uri(new Uri(Request.Url.GetComponents(UriComponents.SchemeAndServer, UriFormat.SafeUnescaped)),Url.Action("Payment3dSecureCallback")).AbsolutePath
			};
			return View(model);
		}

		[HttpPost]
		public ActionResult Payment3dSecureCallback(string MD, string pares)
		{
			var mdParts = MD.Split('|');
			//this is the datacash reference number...
			var datacash_reference = mdParts[0];

			//this holds our order id..
			var ourReference = BiteDatacashGateway.GetTransactionIDFromTransactionReference(mdParts[1]);

			var transaction = _transactionService.GetById(long.Parse(ourReference));

			if (transaction != null)
			{
				try
				{
					DataCashPayment payment = new DataCashPayment(transaction);

					var gateway = new BiteDatacashGateway(this.DataCashId, this.DataCashPassword,
					transaction.Id.ToString(), "GBP", this.PurchaseDescription,
					DeviceUsed.PC, this.ReportedUrl, HttpContext);

					var ThreeDSecureResponse = gateway.ProcessAuthorisation(datacash_reference, pares);
					_transactionService.LogPaymentInformation(transaction, gateway.Response, false);

					if (ThreeDSecureResponse == BiteDatacashGateway.ResponseStatus.Accepted)
					{
						_transactionService.ProcessSuccessfulPayment(transaction);
					}
					else
					{
						_transactionService.ProcessFailedPayment(transaction, TransactionStatus.CardRefused);
					}
				}
				catch (Exception e)
				{
					//Should we be failing this or not??  Wasn't in Bite version.
					_transactionService.ProcessFailedPayment(transaction, TransactionStatus.CardRefused);
					//error process 3dsecure postback
				}
				return View(transaction.Id);
			}
			return null;
		}

	}
}
