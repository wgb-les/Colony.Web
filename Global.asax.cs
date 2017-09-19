using System;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.WebPages;
using Colony.CMS;
using Colony.Commerce;
using Colony.Util.Configuration;
using Colony.Util.Web.ReCaptcha;

namespace Colony.Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : ColonyCommerceApplication
    {
        private static readonly string ConfigAddress = AppDomain.CurrentDomain.BaseDirectory + "\\" + "Web.config";


        protected override void OnApplicationStarted()
        {
            DependencyResolverConfig.RegisterModules();
            DependencyResolverConfig.RegisterModules(new WebAutofaceModule());
            AuthConfig.RegisterAuth();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            BundleConfig.RegisterBundles(BundleTable.Bundles);

            ReCaptchaSettings.PrivateKey = AppSettingsHelper.GetSafeValue("ReCaptchaPrivateKey",
                "6LfY-wsTAAAAAPxoBBKF2wLePFSz2FZLzmxHeg4_");
            ReCaptchaSettings.PublicKey = AppSettingsHelper.GetSafeValue("ReCaptchaPublicKey",
                "6LfY-wsTAAAAAPZqlSzQzFh5-66JLeoYR-D82Yab");

            DisplayModeProvider.Instance.Modes.Insert(0, new DefaultDisplayMode("")
            {
                //ContextCondition = (context => DeviceDetectionHelpers.GetDeviceType(context.GetOverriddenUserAgent()) == "tablet")
                ContextCondition = context => ColonyContext.Current.DeviceType == "tablet"
            });

            DisplayModeProvider.Instance.Modes.Insert(1, new DefaultDisplayMode("Mobile")
            {
                //ContextCondition = (context => DeviceDetectionHelpers.GetDeviceType(context.GetOverriddenUserAgent()) == "mobile")
                ContextCondition = context => ColonyContext.Current.DeviceType == "mobile"
            });

            base.OnApplicationStarted();
        }
    }
}