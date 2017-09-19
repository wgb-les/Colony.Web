using System;
using System.Web.Mvc;
using Colony.CMS;
using Colony.Models.Core;
using Colony.Services.Security.Authentication;
using Colony.Util.Web.Cookies;
using WalkerGreenbank.Modules.PressMembers.Areas.B2BMembers;

namespace Colony.Web.Areas.Members.Controllers
{
    public class SSOLoginController : ColonyFrontendController
    {
        private readonly ISingleSignOnService _singleSignOnService;
        private readonly CookieHelper<bool> _ssoLoggedInCookieHelper = new CookieHelper<bool>("SSOChecked");

        public SSOLoginController(ISingleSignOnService singleSignOnService)
        {
            _singleSignOnService = singleSignOnService;
        }

        public ActionResult Callback(string returnUrl, string act, Guid? uid = null, string guid = null,
            string basketguid = null, string username = null, string password = null, string siteprofile = null)
        {
            // if we have no url or have performed a sign out then always redirect to the home page
            if (string.IsNullOrWhiteSpace(returnUrl) ||
                act.Equals(SharedWebAssetConstants.SSOSignOut, StringComparison.OrdinalIgnoreCase))
            {
                returnUrl = "/";
            }
            // check this was a callback due to an logged in user check with the SSO provider 
            else if (act.Equals(SharedWebAssetConstants.SSOChecked, StringComparison.OrdinalIgnoreCase))
            {
                if (uid != null && LoggedInUser() == null)
                {
                    // it's a b2b login
                    if (guid != null)
                    {
                        B2BCheckoutService.SetB2BLoggedInUser(HttpContext, guid, basketguid, username, password,
                            siteprofile);
                    }
                    // if we have a uid returned and the user is not logged in, then log them in
                    _singleSignOnService.SingleSignOn(uid.Value, false);
                }
                else if (uid == null && LoggedInUser() != null)
                {
                    // user is not signed into SSO provider so sign them out here as well
                    _singleSignOnService.SingleSignOut();
                }
            }

            _ssoLoggedInCookieHelper.Write(HttpContext, true);

            // redirect to the original location before SSO check
            return Redirect(returnUrl);
        }
    }
}