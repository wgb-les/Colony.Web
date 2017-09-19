using System;
using System.Linq;
using System.Web.Mvc;
using Colony.CMS;
using Colony.Services.Email;
using Colony.Web.Areas.Sharing.Models;

namespace Colony.Web.Areas.Sharing.Controllers
{
    public class ShareController : ColonyFrontendController
    {
        private readonly IMailerService _emailService;

        public ShareController(IMailerService emailService)
        {
            if (emailService == null) throw new ArgumentNullException("emailService");

            _emailService = emailService;
        }

        public ActionResult Share(ShareViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.ShareUrl))
                model.ShareUrl = Request.Url.AbsoluteUri;

            return PartialView(model);
        }

        public ActionResult SendToAFriend(string shareUrl)
        {
            var model = new SendToAFriendViewModel();

            if (LoggedInUser() != null)
                model.EmailFrom = LoggedInUser().Email;

            return PartialView(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SendToAFriend(SendToAFriendViewModel model)
        {
            if (ModelState.IsValid)
            {
                model.Site = ColonyContext.CurrentSite;
                var sendMailResult = _emailService.Send(model.EmailTo, model.EmailFrom, "Share with a friend",
                    "SendToAFriend", model);

                if (Request.IsAjaxRequest())
                    return Json(new {Success = !sendMailResult.All(x => x.Failed)});
                return Redirect(model.ShareUrl);
            }
            if (Request.IsAjaxRequest())
                return Json(new {Success = false});
            return Redirect(model.ShareUrl);
        }

       
    }
}