using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Colony.CMS;
using Colony.CMS.Areas.CRM.Models;
using Colony.Commerce;
using Colony.Commerce.Models;
using Colony.Commerce.Models.ShopPurchase;
using Colony.Commerce.PaymentProvider.DataCash.Library.Util;
using Colony.Commerce.PaymentProvider.DataCash.Models;
using Colony.Commerce.Services.ShopPurchase;
using Colony.Models.Base;
using Colony.Util.Web;
using Colony.Web.Areas.B2BMembers.Models;

namespace Colony.Web.Areas.B2BMembers.Controllers
{
	public class B2BCheckoutController : ColonyCommerceFrontendController
	{
		private readonly B2BCheckoutService _b2bCheckoutService;
			
		public B2BCheckoutController()
		{
			_b2bCheckoutService = new B2BCheckoutService(GetService<ITransactionService>(), CommerceContext, VisitorTrackingContext, ColonyContext, HttpContext);
		}

		[HttpGet]
		public ActionResult Index(string[] selectedCustomers)
		{
			if (selectedCustomers == null || selectedCustomers.Length == 0)
				return RedirectToAction("BasketSummary", "Webtex");
			Session["SelectedB2BBaskets"] = null;
            if (_b2bCheckoutService.IsB2BUserLoggedIn(Session))
			{
				ColonyContext.Response.CurrentTemplate = "b2c";

                var models = _b2bCheckoutService.GetCheckoutViewModelsForSelectedCustomers(selectedCustomers, Session);
				Session["SelectedB2BBaskets"] = models;
				return View(models);
			}
			return RedirectToAction("Login", "B2BAuthentication");
		}

		public ActionResult Payment(IEnumerable<B2BCheckoutViewModel> checkouts)
		{
            if (_b2bCheckoutService.IsB2BUserLoggedIn(Session))
			{
				var models = Session["SelectedB2BBaskets"] as IEnumerable<B2BCheckoutViewModel>;
				if (models == null || models.Count() == 0)
					return RedirectToAction("BasketSummary", "Webtex");

				foreach (var model in models)
				{
					var post = checkouts.FirstOrDefault(t => t.CustomerReference == model.CustomerReference);
					model.SpecialInstructions = post.SpecialInstructions;
					model.OrderReference = post.OrderReference;
					model.IsPriorityOrder = post.IsPriorityOrder;
					model.Address = BindModel<AddressViewModel>();

				}
				B2BCheckoutPaymentViewModel viewmodel = new B2BCheckoutPaymentViewModel()
				{
					Checkouts = models,
					Address = new AddressViewModel() { AddressType = AddressType.Billing }
				};
				Session["SelectedB2BBaskets"] = models;
				return View(viewmodel);
			}
			return RedirectToAction("Login", "B2BAuthentication");
		}

		public ActionResult MakePayment()
		{			
			var models = Session["SelectedB2BBaskets"] as IEnumerable<B2BCheckoutViewModel>;
			if (models == null || models.Count() == 0)
				return RedirectToAction("BasketSummary", "Webtex");

			if (Request.Form["paymentType"] == "account")
			{
                if (_b2bCheckoutService.IsB2BUserLoggedIn(Session))
				{
                    var results = _b2bCheckoutService.ProcessMertexOrders(models, Request.Form["savedAddresses"], false, Session);
					return View("CheckoutResult", results);
				}
				return View();
			}
			else if (Request.Form["paymentType"] == "card")
			{
				AddressViewModel address = this.BindModel<AddressViewModel>();
				BillingAddress b = _b2bCheckoutService.BillingAddressFromAddress(address);
				Session["BillingAddress"] = b;
				decimal basketTotal = models.Sum(v => v.Basket.BasketItems.Sum(t => decimal.Parse(t.Unit_Price) * decimal.Parse(t.Quantity_Ordered)));

				Transaction transaction = _b2bCheckoutService.GetTransaction(basketTotal, 0);
				return RedirectToAction("B2BCardPayment", new { transactionId = transaction.Id });
			}
			return View();
		}

		[HttpGet]
		public ActionResult CheckoutResult(long tid)
		{
            if (_b2bCheckoutService.IsB2BUserLoggedIn(Session))
			{
				var models = Session["SelectedB2BBaskets"] as IEnumerable<B2BCheckoutViewModel>;
				if (models == null || models.Count() == 0)
					return RedirectToAction("BasketSummary", "Webtex");

                var results = _b2bCheckoutService.ProcessMertexOrders(models, Request.Form["savedAddresses"], true, Session);
				return View(results);
			}
			return RedirectToAction("Login", "B2BAuthentication");
		}

		[HttpGet]
		public ActionResult CheckoutResult()
		{
            if (_b2bCheckoutService.IsB2BUserLoggedIn(Session))
			{
				return View();
			}
			return RedirectToAction("Login", "B2BAuthentication");
		}

		public ActionResult B2BCardPayment(string transactionId)
		{
            if (_b2bCheckoutService.IsB2BUserLoggedIn(Session))
			{
				ViewBag.Title = "Payment";
				var transaction = _b2bCheckoutService.GetTransaction(long.Parse(transactionId));

				if (transaction == null || transaction.TransactionStatus != TransactionStatus.AwaitingPayment)
					return HttpNotFound();

				var viewModel = _b2bCheckoutService.ProcessPaymentRequest(transaction, Url.Action("MakePaymentCallback", "B2BCheckout", new { area = "B2BMembers", transactionId = transactionId }).AbsoluteUrl());
				return View(viewModel);
			}
			return RedirectToAction("Login", "B2BAuthentication");
		}

		[HttpGet]
		public ActionResult MakePaymentCallback(string transactionId, string dts_reference)
		{
			if (_b2bCheckoutService.IsB2BUserLoggedIn(Session))
			{
				var transaction = _b2bCheckoutService.GetTransaction(long.Parse(transactionId));
				if (transaction == null || transaction.TransactionStatus != TransactionStatus.AwaitingPayment)
					return HttpNotFound();

                var result = _b2bCheckoutService.ProcessPaymentCallback(transaction, dts_reference, Session);
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
            if (_b2bCheckoutService.IsB2BUserLoggedIn(Session))
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
			long? result = _b2bCheckoutService.Process3dSecureCallback(MD,pares);
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
