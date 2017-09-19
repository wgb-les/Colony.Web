using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Colony.CMS.Areas.CRM.Models;
using Colony.Commerce;
using Colony.Commerce.Models;
using Colony.Commerce.Models.ShopPurchase;
using Colony.Commerce.PaymentProvider.DataCash.Library.Util;
using Colony.Commerce.PaymentProvider.DataCash.Models;
using Colony.Commerce.Services.ShopPurchase;
using Colony.Web.Areas.B2BMembers.Models;
using Colony.Util;
using Colony.Util.Web;

namespace Colony.Web.Areas.B2BMembers.Controllers
{
	public class B2BInvoiceController : ColonyCommerceFrontendController
	{
		private readonly B2BCheckoutService _b2bCheckoutService;
			
		public B2BInvoiceController()
		{
			_b2bCheckoutService = new B2BCheckoutService(GetService<ITransactionService>(), CommerceContext, VisitorTrackingContext, ColonyContext, Session, HttpContext);
		}
		public ActionResult Index(string orderNumber, string redirectTo)
		{
			//TODO: Add hash validation if possible at Webtex end.

			string amount = _b2bCheckoutService.GetMertexInvoiceAmount(orderNumber);
			decimal decimalamount;
			if (decimal.TryParse(amount, out decimalamount))
			{
				Session["webtexOrderNumber"] = orderNumber;
				Session["redirectTo"] = redirectTo;
				Transaction transaction = _b2bCheckoutService.GetTransaction(decimalamount, 0);
				return RedirectToAction("B2BCardPayment", new { transactionId = transaction.Id });
			}
			return HttpNotFound();
		}
		
		[HttpGet]
		public ActionResult CheckoutResult(long tid)
		{
			if (_b2bCheckoutService.IsB2BUserLoggedIn())
			{
				_b2bCheckoutService.MarkMertexInvoiceAsPaid(Session["webtexOrderNumber"] as string);
				Session["webtexOrderNumber"] = null;
				Session["redirectTo"] = null;
			}
			return RedirectToAction("Login", "B2BAuthentication");
		}

		public ActionResult B2BCardPayment(string transactionId)
		{
			if (_b2bCheckoutService.IsB2BUserLoggedIn())
			{
				ViewBag.Title = "Payment";
				var transaction = _b2bCheckoutService.GetTransaction(long.Parse(transactionId));

				if (transaction == null || transaction.TransactionStatus != TransactionStatus.AwaitingPayment)
					return HttpNotFound();

				var viewModel = _b2bCheckoutService.ProcessPaymentRequest(transaction, Url.Action("MakePaymentCallback", "B2BInvoice", new { area = "B2BMembers", transactionId = transactionId }).AbsoluteUrl());
				return View(viewModel);
			}
			return RedirectToAction("Login", "B2BAuthentication");
		}

		[HttpGet]
		public ActionResult MakePaymentCallback(string transactionId, string dts_reference)
		{
			if (_b2bCheckoutService.IsB2BUserLoggedIn())
			{
				var transaction = _b2bCheckoutService.GetTransaction(long.Parse(transactionId));
				if (transaction == null || transaction.TransactionStatus != TransactionStatus.AwaitingPayment)
					return HttpNotFound();

				var result = _b2bCheckoutService.ProcessPaymentCallback(transaction, dts_reference);
				switch (result)
				{
					case PaymentCallbackResult.RedirectTo3dSecure:
						return RedirectToAction("Payment3dSecureContainer", new { tid = transactionId });
						break;
					case PaymentCallbackResult.RedirectToReceipt:
						var url = Url.Action("CheckoutResult", new { tid = transaction.Id });
						return Content(string.Format("<html><script>window.top.location.href='{0}'</script></html>", url));
						break;
				}
			}
			return RedirectToAction("Login", "B2BAuthentication");
		}

		[HttpGet]
		public ActionResult Payment3dSecureContainer(long tid)
		{
			if (_b2bCheckoutService.IsB2BUserLoggedIn())
			{
				ColonyContext.Response.CurrentTemplate = "Empty";
				return View();
			}
			return RedirectToAction("Login", "B2BAuthentication");
		}

		[HttpGet]
		public ActionResult Payment3dSecureIframe(long tid)
		{
			var transaction = _b2bCheckoutService.GetTransaction(tid);
			if (transaction == null || transaction.TransactionStatus != TransactionStatus.AwaitingPayment)
				return HttpNotFound();

			DataCashPayment payment = new DataCashPayment(transaction);

			Payment3dSecureIframeViewModel model = new Payment3dSecureIframeViewModel
			{
				AcsUrl = payment.AcsUrl,
				PaReq = payment.PaReq,
				MD = payment.MD,
				TermUrl = new Uri(new Uri(Request.Url.GetComponents(UriComponents.SchemeAndServer, UriFormat.SafeUnescaped)), Url.Action("Payment3dSecureCallback")).AbsoluteUri
			};
			ColonyContext.Response.CurrentTemplate = "Empty";
			return View(model);
		}

		[HttpPost]
		public ActionResult Payment3dSecureCallback(string MD, string pares)
		{
			long? result = _b2bCheckoutService.Process3dSecureCallback(MD, pares);
			if (result != null)
			{
				_b2bCheckoutService.Process3dSecureCallback(MD, pares);
				var url = Url.Action("CheckoutResult", new { tid = result });

				// return script to break out of the iframe
				return Content(string.Format("<html><script>window.top.location.href='{0}'</script></html>", url));
			}
			return HttpNotFound();
		}
	}
}
