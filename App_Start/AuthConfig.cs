using System.Configuration;
using Colony.CMS.Security.OAuth;
using Colony.Util.Configuration;
using Microsoft.Web.WebPages.OAuth;

namespace Colony.Web
{
    public static class AuthConfig
    {
        public static void RegisterAuth()
        {
            //var facebooksocialData = "email,user_about_me,user_birthday,user_hometown,user_location";
            //var facebookAppId = AppSettingsHelper.GetSafeValue("FacebookAppId", "");
            //var facebookAppSecret = AppSettingsHelper.GetSafeValue("FacebookAppSecret", "");

            var config =
                ConfigurationManager.GetSection(OAuthConfigurationSection.SECTION_NAME) as OAuthConfigurationSection;
            foreach (FacebookOAuthConfigurationElement fb in config.Facebook)
            {
                OAuthWebSecurity.RegisterClient(
                    new FacebookScopedClient(fb.AppId, fb.SecretKey, fb.Scope, string.Format("Facebook_{0}", fb.Id)),
                    string.Format("Facebook_{0}", fb.Id), null);
            }

            //if (!string.IsNullOrEmpty(facebookAppId) && !string.IsNullOrEmpty(facebookAppSecret))
            //{
            //	OAuthWebSecurity.RegisterClient(new FacebookScopedClient(facebookAppId, facebookAppSecret, facebooksocialData), "Facebook", null);
            //}

            OAuthWebSecurity.RegisterTwitterClient("NRwxDjI4SodxiX2pmWNFA", "l19k4vLgNfVykvMrj8cyucLDmGr2TSTr8ziQawlecY");
            OAuthWebSecurity.RegisterGoogleClient();
        }
    }
}