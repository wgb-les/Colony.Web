using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Colony.CMS;
using Colony.CMS.Areas.VisitorTracking;
using Colony.Commerce.Models;
using Colony.Commerce.Models.ShopPurchase;
using Colony.Commerce.PaymentProvider.DataCash.Library;
using Colony.Commerce.PaymentProvider.DataCash.Library.Util;
using Colony.Commerce.PaymentProvider.DataCash.Models;
using Colony.Commerce.Services.ShopPurchase;
using Colony.Util.Configuration;
using Colony.Util;
using Colony.Web.Areas.B2BMembers.Models;
using System.Configuration;
using Colony.CMS.Areas.CRM.Models;
using System.Xml.Linq;
using Colony.Web.Integration.Mertex;

namespace Colony.Web.Areas.B2BMembers
{
	public enum PaymentCallbackResult
	{
		RedirectTo3dSecure,
		RedirectToReceipt
	}

	public class B2BCheckoutService
	{
		private readonly ITransactionService _transactionService;
		private readonly ICommerceContext _commerceContext;
		private readonly VisitorTrackingContext _trackingContext;
		private readonly ColonyContext _colonyContext;
		private readonly HttpContextBase _context;

		private string DataCashId { get; set; }
		private string DataCashPassword { get; set; }
		private string ReportedUrl = "http://www.colonycms.co.uk";
		private string PurchaseDescription = "Colony Commerce Purchase";
		private int DataCashPageSetId { get; set; }

		public B2BCheckoutService(ITransactionService transactionService, ICommerceContext commerceContext, VisitorTrackingContext trackingContext, ColonyContext colonyContext, HttpContextBase context)
		{
			_transactionService = transactionService;
			_commerceContext = commerceContext;
			_colonyContext = colonyContext;
			_trackingContext = trackingContext;
			_context = context;

			this.DataCashId = AppSettingsHelper.GetSafeValue("DatacashID", string.Empty);
			this.DataCashPassword = AppSettingsHelper.GetSafeValue("DatacashPassword", string.Empty);
			this.DataCashPageSetId = AppSettingsHelper.GetSafeValue("DataCashPageSetId", 1);
		}

        public bool IsB2BUserLoggedIn(HttpSessionStateBase session)
		{
            string user = session["B2BUsername"] as string;
            string password = session["B2BPassword"] as string;
            string guid = session["B2BBasketGUID"] as string;
			return (!string.IsNullOrEmpty(user) && !string.IsNullOrEmpty(password) && !string.IsNullOrEmpty(guid));
		}

		public Transaction GetTransaction(decimal amount, decimal vat)
		{
			Transaction transaction = new Transaction
			{
				PaymentMethodId = 1,
				TransactionType = TransactionType.ShopPurchase,
				TransactionStatus = TransactionStatus.AwaitingPayment,
				AmountEx = amount,
				AmountInc = amount,
				VAT = vat,
				UserAccountId = System.Guid.Empty,
				ShopId = _commerceContext.Shop.CurrentShop.Id,
				CurrencyId = _commerceContext.Shop.CurrentShop.CurrencyId,
				SiteId = _colonyContext.CurrentSite.Id,
				Site = _colonyContext.CurrentSite,
				PurchaseXml = string.Empty,
				TrackedVisitorId = _trackingContext.CurrentVisitor.Id
			};
			transaction = _transactionService.Create(transaction);

			return transaction;
		}

		public Transaction GetTransaction(long transactionId)
		{
			return _transactionService.GetById(transactionId);
		}

		private BiteDatacashGateway GetDatacashGateway(long transactionId)
		{
			return new BiteDatacashGateway(this.DataCashId, this.DataCashPassword,
					transactionId.ToString(), "GBP", this.PurchaseDescription,
					DeviceUsed.PC, this.ReportedUrl, _context);

		}

		public long? Process3dSecureCallback(string MD, string pares)
		{
			var mdParts = MD.Split('|');
			//this is the datacash reference number...
			var datacash_reference = mdParts[0];

			//this holds our order id..
			var ourReference = BiteDatacashGateway.GetTransactionIDFromTransactionReference(mdParts[1]);

			var transaction = GetTransaction(long.Parse(ourReference));
			if (transaction != null)
			{
				try
				{
					DataCashPayment payment = new DataCashPayment(transaction);

					var gateway = GetDatacashGateway(transaction.Id);

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
				return transaction.Id;
			}
			return null;
		}

		public PaymentCallbackResult ProcessPaymentCallback(Transaction transaction, string dts_reference, HttpSessionStateBase session)
		{
			var gateway = GetDatacashGateway(transaction.Id);

			var paymentDetails = new PaymentDetails
			{
				Amount = transaction.AmountInc.AsDecimal(0) + transaction.DeliveryCost.AsDecimal(0),
				CardNumber = dts_reference,
				CaptureMethod = CaptureMethod.ECOMM
			};

            var addressDetails = session["BillingAddress"] as BillingAddress;

			DataCashPayment payment = new DataCashPayment(transaction);

			var paymentResponse = gateway.ProcessHccPayment(paymentDetails, addressDetails, payment.DatacashReference);

			_transactionService.LogPaymentInformation(transaction, gateway.Response.DocumentXML.OuterXml, true);
			payment.DatacashReference = gateway.Response.DatacashReference;
			//Probably a little paranoid to add this here, but means the journalling's done, even if there's an exception thrown later.
			_transactionService.Update(transaction);

			if (paymentResponse == BiteDatacashGateway.ResponseStatus.SendThreeDSecureRequest)
			{
				payment.AcsUrl = gateway.Response.acsUrl;
				payment.PaReq = gateway.Response.PAReqMessage;
				payment.MD = String.Format("{0}|{1}", payment.DatacashReference,
													  gateway.Response.TransactionReference);
				_transactionService.Update(transaction);
				return PaymentCallbackResult.RedirectTo3dSecure;
			}
			else
			{
				if (paymentResponse == BiteDatacashGateway.ResponseStatus.Accepted)
				{
					_transactionService.ProcessSuccessfulPayment(transaction);
				}
				else if (paymentResponse == BiteDatacashGateway.ResponseStatus.ThreeDSecureNotEnrolled)
				{
					_transactionService.ProcessSuccessfulPayment(transaction);
				}
				else
				{
					_transactionService.ProcessFailedPayment(transaction, TransactionStatus.CardRefused);
				}
				return PaymentCallbackResult.RedirectToReceipt;
			}
		}

		private Integration.Mertex.services GetMertexService()
		{
			var service = new Integration.Mertex.services();
			service.Url = ConfigurationManager.AppSettings["WebtexBaseUrl"] + "/redant/services.asmx";
			return service;
		}

		private string CreateMertexOrder(string customerReference, string address, string orderReference, string deliveryInstructions, bool isPriority, bool isPaidByCard, HttpSessionStateBase session)
		{
            string user = session["B2BUsername"] as string;
            string password = session["B2BPassword"] as string;
            string guid = session["B2BBasketGUID"] as string;
			var service = GetMertexService();
			return service.B2BCreateOrder(user, password, guid, customerReference, address, orderReference, deliveryInstructions, isPriority, isPaidByCard);
		}

		public PaymentViewModel ProcessPaymentRequest(Transaction transaction, string makePaymentCallbackUrl)
		{
			var gateway = GetDatacashGateway(transaction.Id);

			var paymentDetails = new PaymentDetails
			{
				Amount = transaction.AmountInc.AsDecimal(0) + transaction.DeliveryCost.AsDecimal(0),
				CaptureMethod = CaptureMethod.ECOMM
			};

			var response = gateway.SetupHcc(paymentDetails, makePaymentCallbackUrl, DataCashPageSetId);

			return new PaymentViewModel
			{
				TransactionId = transaction.Id.ToString(),
				HccSessionUrl = response.HpsUrl + "?HPS_SessionID=" + response.SessionId
			};
		}

		public BillingAddress BillingAddressFromAddress(AddressViewModel address)
		{
			BillingAddress b = new BillingAddress();
			b.AddressLine1 = address.Line1;
			b.AddressLine2 = address.Line2;
			b.AddressLine3 = address.Town;
			b.AddressLine4 = address.County;
			b.Postcode = address.Postcode;
			return b;
		}

		public IList<B2BCheckoutResultViewModel> ProcessMertexOrders(IEnumerable<B2BCheckoutViewModel> models, string savedAddresses, bool isPaidByCard, HttpSessionStateBase session)
		{
			string response = string.Empty;
			List<B2BCheckoutResultViewModel> results = new List<B2BCheckoutResultViewModel>();
			foreach (var model in models)
			{
				string address = string.Empty;
				if (!string.IsNullOrEmpty(savedAddresses))
					address = savedAddresses;
				else if (!string.IsNullOrEmpty(model.Address.LastName))
					address = string.Join("|", new string[] { model.Address.Description + " " + model.Address.FirstName + " " + model.Address.LastName, model.Address.Line1, model.Address.Line2, model.Address.Town, model.Address.County, model.Address.Postcode, string.Empty, model.Address.CountryISO3 });
				string orderReference = model.OrderReference;
				string deliveryInstructions = model.SpecialInstructions;
				bool isPriority = model.IsPriorityOrder;
				response = CreateMertexOrder(model.CustomerReference, address, orderReference, deliveryInstructions, isPriority, isPaidByCard, session);
				string[] responseparts = response.Split('\n');

				B2BCheckoutResultViewModel resultmodel = new B2BCheckoutResultViewModel()
				{
					Result = responseparts[3],
					CustomerName = model.Basket.CustomerName,
					CustomerReference = model.Basket.CustomerReference
				};

				XDocument doc = XDocument.Parse(responseparts[2].Substring(1, responseparts[2].Length - 2));
				var order = doc.Descendants("ORDER").FirstOrDefault();
				if (order != null)
				{
					resultmodel.OrderNumber = order.Attribute("NUMBER").Value;
				}
				results.Add(resultmodel);
			}
			return results;
		}

		public IEnumerable<BasketViewModel> GetB2BBaskets(HttpSessionStateBase session)
		{
			string user = session["B2BUsername"] as string;
            string password = session["B2BPassword"] as string;
            string guid = session["B2BBasketGUID"] as string;
			var service = GetMertexService();
			return service.B2BGetBasket(user, password, guid);
		}

		public IEnumerable<B2BCheckoutViewModel> GetCheckoutViewModelsForSelectedCustomers(IEnumerable<string> selectedCustomers, HttpSessionStateBase session)
		{
			var baskets = GetB2BBaskets(session);
			List<B2BCheckoutViewModel> models = new List<B2BCheckoutViewModel>();
			foreach (var basket in baskets.Where(t => selectedCustomers.Contains(t.CustomerReference)))
			{
				var model = new B2BCheckoutViewModel() { Basket = basket };
				model.Address = new AddressViewModel();

				if (basket.CustomerAddresses.Any())
				{
					CustomerAddress selectedAddress;
					if (basket.CustomerDefaultAddressID != null)
					{
						selectedAddress = basket.CustomerAddresses.FirstOrDefault(t => t.DELREF == basket.CustomerDefaultAddressID);
					}
					else
						selectedAddress = basket.CustomerAddresses.FirstOrDefault();

					model.Address.Description = selectedAddress.DELREF;
					model.Address.LastName = selectedAddress.DELNAME;
					model.Address.Line1 = selectedAddress.DELADDR1;
					model.Address.Line2 = selectedAddress.DELADDR2;
					model.Address.Town = selectedAddress.DELADDR3;
					model.Address.County = selectedAddress.DELADDR4;
					model.Address.Postcode = selectedAddress.DELPCODE;
				}

				var key = basket.BasketItems.First().Key;
				model.CustomerReference = basket.CustomerReference;
				model.BasketGuid = key.Substring(key.LastIndexOf("*") + 1);
				models.Add(model);
			}
			return models;
		}

		public string GetMertexInvoiceAmount(string orderNumber)
		{
			var service = GetMertexService();
			return string.Empty;
		}

		public void MarkMertexInvoiceAsPaid(string orderNumber)
		{
			var service = GetMertexService();
		}
	}
}