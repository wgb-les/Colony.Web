using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Colony.CMS;

namespace Colony.Web.Areas.B2BMembers.Controllers
{
	public class WebtexController : ColonyFrontendController
	{
		//
		// GET: /B2BMembers/Webtex/
		[AllowAnonymous]
		public ActionResult Index(string webtexUrl)
		{
			if (string.IsNullOrEmpty(Session["B2BGUID"] as string))
				return RedirectToAction("Login", new { area = "B2BMembers", controller = "B2BAuthentication" });
			return View();
		}

		public ActionResult BasketSummary()
		{
			string user = Session["B2BUsername"] as string;
			string password = Session["B2BPassword"] as string;
			string guid = Session["B2BBasketGUID"] as string; 
			if (!string.IsNullOrEmpty(user) && !string.IsNullOrEmpty(password) && !string.IsNullOrEmpty(guid))
			{
				var service = new Integration.Mertex.services();
				service.Url = ConfigurationManager.AppSettings["WebtexBaseUrl"] + "/redant/services.asmx";
				var baskets = service.B2BGetBasket(user, password, guid);
				ColonyContext.Response.CurrentTemplate = "b2c";
				return View(baskets.ToList());
			}
			return RedirectToAction("Login", "B2BAuthentication", new { returnUrl = Url.Action("Index") });
		}

		public ActionResult BasketCommand(string command, string redirectUrl)
		{
			string user = Session["B2BUsername"] as string;
			string password = Session["B2BPassword"] as string;
			string guid = Session["B2BBasketGUID"] as string;
			if (!string.IsNullOrEmpty(user) && !string.IsNullOrEmpty(password) && !string.IsNullOrEmpty(guid))
			{

				var service = new Integration.Mertex.services();
				service.Url = ConfigurationManager.AppSettings["WebtexBaseUrl"] + "/redant/services.asmx";
			
				switch(command.ToLowerInvariant())
				{
					case "remove":
						string customerRef = Request.QueryString["customerRef"];
						string lineNumber = Request.QueryString["lineNumber"];
						string account = Request.QueryString["account"];
						service.B2BRemoveBasketItem(user, password, guid, customerRef, lineNumber, account);
						return Redirect(redirectUrl);
						break;
					case "clear":
						//service.B2BClearBasket();
						break;
				}
			}
			return Redirect(redirectUrl);
				
		}

		//public ActionResult MiniBasket()
		//{
		//	string user = Session["B2BUsername"] as string;
		//	string password = Session["B2BPassword"] as string;
		//	string guid = Session["B2BGUID"] as string;
		//	if (!string.IsNullOrEmpty(user) && !string.IsNullOrEmpty(password) && !string.IsNullOrEmpty(guid))
		//	{
		//		var service = new Integration.Mertex.services();
		//		service.Url = ConfigurationManager.AppSettings["WebtexBaseUrl"] + "/redant/services.asmx";
		//		var baskets = service.B2BGetBasket(user, password, guid);
		//		//return View(baskets);
		//		List<B2BBasketViewModel> viewModels = new List<B2BBasketViewModel>();
		//		viewModels.AddRange(baskets.Select(t => new { CUSREF = t.CUSREF, CUSNAME = t.CUSNAME }).Distinct().Select(t => new B2BBasketViewModel { CustomerReference = t.CUSREF, CustomerName = t.CUSNAME, BasketLines = baskets.Where(v => v.CUSREF == t.CUSREF).Select(v => new B2BBasketLineViewModel { Code = v.Product_Code, Name = v.Description, Price = decimal.Parse(v.Unit_Price), Quantity = decimal.Parse(v.Quantity_Ordered), Status = v.Status }).ToList() }));
		//		return View(viewModels);
		//	}
		//	return null;
		//}

		public ActionResult QuickBuy()
		{
			return View();
		}

		[HttpPost]
		public ActionResult QuickBuy(string productcodes)
		{
			return View();
		}
	}

	public class B2BBasketViewModel
	{
		public string CustomerReference { get; set; }
		public string CustomerName { get; set; }
		public IList<B2BBasketLineViewModel> BasketLines { get; set; }
	}

	public class B2BBasketLineViewModel
	{
		public string ImageUrl { get; set; }
		public string Name { get; set; }
		public string Code { get; set; }
		public string Status { get; set; }
		public decimal Price { get; set; }
		public decimal Quantity { get; set; }
		public decimal LinePrice { get; set; }
	}
}
