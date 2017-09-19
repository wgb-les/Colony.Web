using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Colony.CMS.Helpers;
using Colony.Commerce.Models.ProductCatalogue;
using Colony.Commerce.Services.ProductCatalogue;
using Colony.Commerce.Services.Shops;
using Colony.Commerce.Services.Stock.Abstract;
using Colony.Data.Abstract;
using Colony.Models.Core.Search;
using Colony.Util;
using Colony.Web.Areas.Shop.Models;

namespace Colony.Web.Areas.Shop.Controllers
{
    public class WgShopController : Colony.Commerce.Areas.Shops.Controllers.Frontend.ShopController
    {
        private readonly IShopsService _shopsService;
        private readonly ISkuProductsService _skuProductsService;
        private readonly ISkuAttributesService _skuAttributeService;
        private readonly ISkuAttributeOptionsService _skuAttributeOptionsService;
        private readonly IProductRecentlyViewedService _productRecentlyViewedService;
        private readonly ICacheProvider<ProductCategory> _productCategoryCache;
        private readonly IProductCategoriesService _productCategoriesService;
        private readonly IProductsService _productsService;
        private readonly ISkuGroupsService _skuGroupsService;
        private readonly ISkuVariantsService _skuVariantsService;

        public WgShopController(IShopsService shopService, ISkuProductsService skuProductsService, ICacheProvider<ProductCategory> productCategoryCache,
            IProductRecentlyViewedService productRecentlyViewedService, ISkuAttributesService skuAttributesService,
            ISkuAttributeOptionsService skuAttributeOptionsService, IProductCategoriesService productCategoriesService,
            IProductsService productsService, ISkuGroupsService skuGroupsService, ISkuVariantsService skuVariantsService)
            : base(shopService, skuProductsService, productCategoryCache, productRecentlyViewedService, skuAttributesService,
            skuAttributeOptionsService, productCategoriesService, productsService, skuGroupsService, skuVariantsService)
        {
            if (shopService == null) throw new ArgumentNullException("shopService");
            if (skuProductsService == null) throw new ArgumentNullException("skuProductsService");
            if (productCategoryCache == null) throw new ArgumentNullException("productCategoryCache");
            if (productRecentlyViewedService == null) throw new ArgumentNullException("productRecentlyViewedService");
            if (skuAttributesService == null) throw new ArgumentNullException("skuAttributesService");
            if (skuAttributeOptionsService == null) throw new ArgumentNullException("skuAttributeOptionsService");
            if (productCategoriesService == null) throw new ArgumentNullException("productCategoriesService");
            if (productsService == null) throw new ArgumentNullException("productsService");
            if (skuGroupsService == null) throw new ArgumentNullException("skuGroupsService");
            if (skuVariantsService == null) throw new ArgumentNullException("skuVariantsService");

            _shopsService = shopService;
            _skuProductsService = skuProductsService;
            _productCategoryCache = productCategoryCache;
            _productRecentlyViewedService = productRecentlyViewedService;
            _skuAttributeOptionsService = skuAttributeOptionsService;
            _skuAttributeService = skuAttributesService;
            _productCategoriesService = productCategoriesService;
            _productsService = productsService;
            _skuGroupsService = skuGroupsService;
            _skuVariantsService = skuVariantsService;
        }

        public ActionResult SearchPanel()
        {
            var model = new ProductSearchViewModel()
            {
                PopularSearchTerms = _productsService.GetPopularSearches(5).ToList()
            };

            return PartialView("_SearchPanel", model);

        }

        [HttpGet]
        public override ActionResult Search()
        {
            var model = new ProductSearchViewModel();
            var formCollection = new FormCollection(Request.Form);

            TryUpdateModel<ProductSearchViewModel>(model, formCollection);

            var keyword = Request.QueryString["keyword"];

            if (!string.IsNullOrWhiteSpace(keyword))
                model.Keywords = keyword;

            var selectedColours = Request.QueryString["SelectedColours"];
            if (!string.IsNullOrWhiteSpace(selectedColours))
            {
                model.SelectedColours = selectedColours;
            }

            model.ProductCategories = _productCategoriesService.GetAll().ToList();
            model.Options = _skuAttributeOptionsService.GetAll().ToList();

            model.IsPatternsFilterVisible = model.Options.Any(x => x.SkuAttribute.Name == "Pattern");
            model.IsEndUseFilterVisible = model.Options.Any(x => x.SkuAttribute.Name == "End Use");
            model.IsTypeFilterVisible = model.Options.Any(x => x.SkuAttribute.Name == "Type");
            model.IsFlameRetardantFilterVisible = model.Options.Any(x => x.SkuAttribute.Name == "Flame Retardant");
            model.IsMatindalFilterVisible = model.Options.Any(x => x.SkuAttribute.Name == "Martindale");
            model.IsPriceFilterVisible = model.IsPatternsFilterVisible && model.IsEndUseFilterVisible && model.IsTypeFilterVisible
                                            && model.IsFlameRetardantFilterVisible && model.IsMatindalFilterVisible;
            model.IsProductCategoryFilterVisibel = model.IsPatternsFilterVisible && model.IsEndUseFilterVisible && model.IsTypeFilterVisible
                                           && model.IsFlameRetardantFilterVisible && model.IsMatindalFilterVisible;

            return PartialView(model);
        }

        [HttpPost]
        public override ActionResult Search(FormCollection formCollection)
        {
            var productModel = new ProductSearchViewModel();

            TryUpdateModel<ProductSearchViewModel>(productModel, formCollection);

            if (formCollection.Has("PriceRange"))
            {
                var priceRange = formCollection["PriceRange"].Split(',').Select(x => x.AsDecimal(0)).ToArray();
                productModel.MinPrice = priceRange[0];
                productModel.MaxPrice = priceRange[1];
            }

            if (formCollection.Has("Martindale"))
            {
                productModel.Martindale = formCollection["Martindale"].AsInt(0);
            }

            var searchCriteria = new SearchCriteria
            {
                OrderBy = productModel.OrderBy ?? "default",
                ResultsPerPage = productModel.ResultsPerPage,
                CurrentPage = productModel.CurrentPage
            };

            searchCriteria.CustomCriteria.Add("CurrencyId", CommerceContext.Currency.CurrentForPricing.Id.ToString());
            searchCriteria.CustomCriteria.Add("ShopId", CommerceContext.Shop.CurrentShop.Id.ToString());
            searchCriteria.CustomCriteria.Add("MinPrice", productModel.MinPrice);
            searchCriteria.CustomCriteria.Add("MaxPrice", productModel.MaxPrice);
            searchCriteria.CustomCriteria.Add("ProductCategoryID", productModel.ProductCategory.ToDelimitedString());
            searchCriteria.CustomCriteria.Add("Martindate", productModel.Martindale);

            var attributeOptions = ToAttributeString(productModel.Brand,
                                                    productModel.Patterns,
                                                    productModel.Type,
                                                    productModel.FlameRetardant,
                                                    productModel.EndUse);

            searchCriteria.CustomCriteria.Add("Attributes", attributeOptions);
            searchCriteria.CustomCriteria.Add("Colours", productModel.SelectedColours);

            var results = _skuProductsService.ProductCatalogue.Products.PerformSearch(searchCriteria).Cast<ProductSearchResult>();

            if (Request.IsJsonRequest())
                return Json(results);

            return PartialView(results);
        }

        private string ToAttributeString(params IList<string>[] attributeLists)
        {
            string attributeString = string.Empty;

            foreach (var attributeList in attributeLists)
            {
                if (!attributeString.StartsWith("|"))
                    attributeString += "|";

                if (attributeList != null && attributeList.Any(x => !string.IsNullOrWhiteSpace(x)))
                {
                    attributeString += string.Join("|", attributeList.Where(a => !string.IsNullOrWhiteSpace(a)).Select(x => x.Replace("-", ",")));

                    if (!attributeString.EndsWith("|"))
                        attributeString += "|";
                }
            }
            return attributeString;
        }
    }
}