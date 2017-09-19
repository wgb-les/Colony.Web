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
            // TODO Remove brands
            //routes.IgnoreRoute("www.harlequin.uk.com/{*pathInfo}");
            //routes.IgnoreRoute("www.sanderson-uk.com/{*pathInfo}");
            //routes.IgnoreRoute("www.scion.uk.com/{*pathInfo}");
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapTidyRoute("Default_PaymentProvider", "checkout/takepayment/{transactionId}",
                new {controller = "DataCashHccPayment", action = "MakePayment", transactionId = UrlParameter.Optional},
                new[] {"Colony.Commerce.PaymentProvider.DataCash.Controllers"}
                );

            routes.MapRoute("CollectionFilter", "shop/collections/FilterCollections/{id}", new { area = "collections", controller = "Collections", action = "FilterCollections", id = UrlParameter.Optional });

            routes.MapRoute("CollectionSearch", "shop/collections/{id}", new {area = "collections", controller = "Collections", action = "Index", id = UrlParameter.Optional});


            routes.MapRoute("InspireFlter", "inspire/FilterArticles/{id}", new { area = "inspire", controller = "Inspire", action = "FilterArticles", id = UrlParameter.Optional });
            // routes.MapRoute("StylelibraryUGC", "inspire/GetUGC/{id}", new { area = "inspire", controller = "Inspire", action = "GetUGC", id = UrlParameter.Optional });

            routes.MapRoute("SLEmail", "email/{id}", new { area = "Email", controller = "Email", action = "Index", id = UrlParameter.Optional });

            routes.MapRoute("StylelibraryInspire", "inspire/{id}", new { area = "inspire", controller = "Inspire", action = "Index", id = UrlParameter.Optional});

            routes.MapRoute("StylelibraryInspireArticle", "inspire/article/{id}", new { area = "inspire", controller = "Inspire", action = "ShowPost", id = UrlParameter.Optional });
            routes.MapRoute("StylelibraryUGC", "inspire/content/{id}", new { area = "inspire", controller = "Inspire", action = "ShowPost", id = UrlParameter.Optional });
            routes.MapRoute("StylelibraryInspireVideo", "inspire/video/{id}", new { area = "inspire", controller = "Inspire", action = "ShowPost", id = UrlParameter.Optional } );
            routes.MapRoute("StylelibraryInspireAdvice", "inspire/advice/{id}", new { area = "inspire", controller = "Inspire", action = "ShowPost", id = UrlParameter.Optional });
            routes.MapRoute(
                "StylelibraryInspireBlog", "inspire/the-edit/{id}", new { area = "inspire", controller = "Inspire", action = "ShowPost", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                "StylelibraryInspireOurPicks", "inspire/our-picks/{id}", new { area = "inspire", controller = "Inspire", action = "ShowPost", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                "StylelibraryInspireLookbook", "inspire/lookbook/{id}", new { area = "inspire", controller = "Inspire", action = "ShowPost", id = UrlParameter.Optional }
            );

            routes.MapRoute(
              "WallpaperCalculator", "Calculator/wallpaper", new { area = "shop", controller = "WgCalculator", action = "WallpaperCalculator" }
              );

            routes.MapRoute(
             "PaintCalculator", "Calculator/paint", new { area = "shop", controller = "WgCalculator", action = "PaintCalculator" }
             );


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
              "Calculator/CalculatePaint/{id}",
              new { area = "shop", controller = "WgCalculator", action = "CalculatePaint", id = UrlParameter.Optional }
              );
            
            routes.MapRoute(
              "Calculator-api-4",
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