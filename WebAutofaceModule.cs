using System;
using System.Web;
using Autofac;
using Colony.Commerce.Services.Postage;
using Colony.Services.Security.Authentication;
using Colony.Web.Areas.Shop;
using WalkerGreenbank.Modules.PressMembers.Areas.B2BMembers;

namespace Colony.Web
{
    public class WebAutofaceModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<WgPostageCalculationService>().As<IPostageCalculationService>();
            //builder.RegisterType<MertextStockValidationService>().As<IStockValidationService>();

            // Single Sign On
            builder.RegisterType<WgSingleSignOnService>()
                .As<IAuthenticationService>()
                .As<ISingleSignOnService>()
                .OnActivated(
                    act => { act.Instance.OnRedirectingToSingleSignOnProvider += RedirectToSingleSignOnProvider; });
        }

        public void RedirectToSingleSignOnProvider(SingleSignOnService.SingleSignOnRequest args)
        {
            var ReturnUrl = HttpContext.Current.Request.Url.AbsoluteUri;
            var isSecureConnection = string.Equals(HttpContext.Current.Request.Headers["X-Forwarded-Proto"], "https",
                StringComparison.OrdinalIgnoreCase);
            if (isSecureConnection)
            {
                ReturnUrl = ReturnUrl.Replace("http://", "https://");
            }
            args.ReturnUrl = ReturnUrl;
        }
    }
}