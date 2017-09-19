using System.Web.Mvc;
using System.Web.Routing;
using Colony.CMS;
using Colony.Util.Configuration;
using Colony.Util.Web;

namespace Colony.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("www.harlequin.uk.com/{*pathInfo}");
            routes.IgnoreRoute("www.sanderson-uk.com/{*pathInfo}");
            routes.IgnoreRoute("www.scion.uk.com/{*pathInfo}");
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapTidyRoute("Default_PaymentProvider", "checkout/takepayment/{transactionId}",
                new {controller = "DataCashHccPayment", action = "MakePayment", transactionId = UrlParameter.Optional},
                new[] {"Colony.Commerce.PaymentProvider.DataCash.Controllers"}
                );

            //routes.MapTidyRoute("basketMethods", "basket/ReturnCushionUpsellPartial/{site}",
            //    new { controller = "basketcontroller", action = "ReturnCushionUpsellPartial", site = UrlParameter.Optional },
            //    new[] { "Colony.Commerce.Areas.ShopPurchase.Controllers.Frontend" }
            //    );

            routes.MapRoute(
              "Calculator-api-1",
              "Calculator/GetPaintQuantity/{id}",
              new { area = "shop", controller = "WgCalculator", action = "GetPaintQuantity", id = UrlParameter.Optional }
              );
            routes.MapRoute(
              "Calculator-api-2",
              "Calculator/CalculatePaper/{id}",
              new { area = "shop", controller = "WgCalculator", action = "CalculatePaper", id = UrlParameter.Optional }
              );
            routes.MapRoute(
              "Calculator-api-3",
              "Calculator/MeasurementSnippet/{id}",
              new { area = "shop", controller = "WgCalculator", action = "MeasurementSnippet", id = UrlParameter.Optional }
              );
            routes.MapRoute(
              "minibasket",
              "basket/minibasket/{id}",
              new { area = "shoppurchase", controller = "basket", action = "minibasket", id = UrlParameter.Optional }
              );

            routes.MapTidyRoute(
                    "Frontend",
                    "{*url}",
                    new { controller = "Frontend", action = "Index" }, new { actionFilter = new IsPageRouteConstraint() },
                    new[] { "Colony.CMS.Controllers.Frontend" });

          


            routes.MapTidyRoute("Default", "{controller}/{action}/{id}",
                new {controller = "Home", action = "Index", id = UrlParameter.Optional}
                );
        }
    }
}