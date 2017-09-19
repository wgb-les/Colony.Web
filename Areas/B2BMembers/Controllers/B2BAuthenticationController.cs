using System;
using System.Configuration;
using System.Web.Mvc;
using Colony.CMS;
using Colony.CMS.Areas.Members.ViewModels;
using Colony.Web.Areas.B2BMembers.Models;

namespace Colony.Web.Areas.B2BMembers.Controllers
{
	public class B2BAuthenticationController : ColonyFrontendController
	{
		[AllowAnonymous]
		public ActionResult Login(string returnUrl)
		{
			ViewBag.ReturnUrl = returnUrl;
			ColonyContext.Response.CurrentTemplate = "Login";
			return View(new B2BLoginInputViewModel());
		}
		
		[AllowAnonymous]
		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult Login(B2BLoginInputViewModel model, string returnUrl)
		{
			try
			{
				var service = new Integration.Mertex.services();
				service.Url = ConfigurationManager.AppSettings["WebtexBaseUrl"] + "/redant/services.asmx";
				string guid = service.AttemptLogin(model.Email, model.Password);
				string basketguid = VisitorTrackingContext.CurrentVisitor.TrackedVisitorGuid.ToString();
				if (guid.Length > 0)
				{
					Guid temp;
					if (Guid.TryParse(guid, out temp))
					{
						Session["B2BGUID"] = guid;
						Session["B2BBasketGUID"] = basketguid;
						Session["B2BUsername"] = model.Email;
						Session["B2BPassword"] = model.Password;
						return Redirect("http://82.113.227.75/raintegration/redant/ssologin.aspx?guid=" + guid + "&site=" + Request.Url.GetLeftPart(UriPartial.Authority) + "&basketguid=" + basketguid + "&page=" + returnUrl);
					}
				}
				else
				{
					ViewBag.ReturnUrl = returnUrl;
					ColonyContext.Response.CurrentTemplate = "Login";

					ModelState.AddModelError("LoginId", "Login ID or password is incorrect.");
					return View(model);
				}
			}
			catch (Exception ex)
			{
				ViewBag.ReturnUrl = returnUrl;
				ColonyContext.Response.CurrentTemplate = "Login";

				ModelState.AddModelError("LoginId", "Login ID or password is incorrect.");
				return View(model);
			}
			return new HttpNotFoundResult();
		}

		public ActionResult Logout()
		{
			Session["B2BGUID"] = null;
			Session["B2BBasketGUID"] = null;
			Session["B2BUsername"] = null;
			Session["B2BPassword"] = null;
			return Json(new { success = true });
		}

	}
}
