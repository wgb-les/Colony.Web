using System.Globalization;
using System.Net;
using System.Web.Mvc;
using System.Web.UI;
using Colony.Commerce;
using Colony.Commerce.Services.ProductCatalogue;

namespace Colony.Web.Areas.Shop.Controllers
{
    public class ProductCategoriesController : ColonyCommerceFrontendController
    {
        private readonly IProductCategoriesService _productCategoriesService;

        public ProductCategoriesController(IProductCategoriesService productCateogriesService)
        {
            _productCategoriesService = productCateogriesService;
        }

        [AllowAnonymous]
        [OutputCache(Location = OutputCacheLocation.ServerAndClient, Duration = 1800)]
        public ActionResult GetBanner(long productCategoryId)
        {
            var banner = _productCategoriesService.GetBanner(productCategoryId.ToString(CultureInfo.InvariantCulture));

            if (banner == null)
                return new HttpStatusCodeResult(HttpStatusCode.NoContent);

            return Content(banner.BannerHtml, "text/html");
        }

        [AllowAnonymous]
        [OutputCache(Location = OutputCacheLocation.ServerAndClient, Duration = 1800)]
        public ActionResult GetBannerBySkuAttributeOption(long skuAttributeOptionId)
        {
            var shopId = CommerceContext.Shop.CurrentShop.Id;
            var banner = _productCategoriesService.GetBannerForFrontendBySkuAttributeOption(skuAttributeOptionId, shopId);

            if (banner == null)
                return new HttpStatusCodeResult(HttpStatusCode.NoContent);

            return Content(banner.BannerHtml, "text/html");
        }
    }
}