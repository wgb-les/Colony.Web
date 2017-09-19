using System.Web.Mvc;
using Colony.CMS;
using Colony.Util.Web;

namespace Colony.Web.Areas.Shop
{
    [Registration(Order = 10)]
    public class ShopAreaRegistration : ColonyAreaRegistration
    {
        public override string AreaName
        {
            get { return "CustomShops"; }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapTidyRoute("PaintShop",
                "shops/paint/", new {controller = "WgShop", action = "Paint", id = UrlParameter.Optional},
                new[] {"Colony.Web.Areas.Shop.Controllers"});

            context.MapTidyRoute("CustomShopSearchRoute",
                "shops/search", new {controller = "WgShop", action = "Search", id = UrlParameter.Optional},
                new[] {"Colony.Web.Areas.Shop.Controllers"});

            context.MapTidyRoute("paintSearch",
                "shops/searchpaint", new {controller = "WgShop", action = "SearchPaint", id = UrlParameter.Optional},
                new[] {"Colony.Web.Areas.Shop.Controllers"});

            context.MapTidyRoute("QuickBuy",
                "shops/quickbuy", new {controller = "QuickBuy", action = "Index"},
                new[] {"Colony.Web.Areas.Shop.Controllers"});

            context.MapTidyRoute("QuickView",
                "shops/quickview", new {controller = "WgShop", action = "CollectionQuickView"},
                new[] {"Colony.Web.Areas.Shop.Controllers"});

            context.MapTidyRoute("TransactionFix",
                "shops/movetrialtransactionstoliveaccountra2014",
                new {controller = "WgShop", action = "MoveTrialTransactionsToLiveAccountRA2014"},
                new[] {"Colony.Web.Areas.Shop.Controllers"});


            context.MapTidyRoute("CustomShopRoute",
                "shops/{controller}/{action}/{id}",
                new {controller = "WgShop", action = "Browse", id = UrlParameter.Optional},
                new[] {"Colony.Web.Areas.Shop.Controllers"});
        }
    }
}