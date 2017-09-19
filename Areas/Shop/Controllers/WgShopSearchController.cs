using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;
using System.Web.UI;
using Colony.CMS.Helpers;
using Colony.Commerce;
using Colony.Commerce.Models.ProductCatalogue;
using Colony.Commerce.Services.ProductCatalogue;
using Colony.Commerce.Services.Stock.Abstract;
using Colony.Models.Core.Search;
using Colony.Util;
using Colony.Util.Configuration;
using Colony.Web.Areas.Shop.Models;
using WalkerGreenbank.Modules.CustomSearch.Services;
using WalkerGreenbank.Modules.PressMembers.Areas.B2BMembers;

namespace Colony.Web.Areas.Shop.Controllers
{
    /// <summary>
    /// ozz - 16-12-2016: Added default sort of "alphaasc" in GetSearchCriteria in place of "default"
    /// 
    /// </summary>
    public class WgShopSearchController : ColonyCommerceFrontendController
    {
        private readonly ICustomSearchTermService _customSearchTermService;
        private readonly IProductCategoriesService _productCategoriesService;
        private readonly ISkuAttributeOptionsService _skuAttributeOptionsService;
        private readonly ISkuAttributesService _skuAttributeService;
        private readonly ISkuProductsService _skuProductsService;

        public WgShopSearchController(
            ISkuProductsService skuProductsService
            , ISkuAttributesService skuAttributeService
            , IProductCategoriesService productCategoriesService
            , ISkuAttributeOptionsService skuAttributeOptionsService
            , ICustomSearchTermService customSearchTermService)
        {
            _skuProductsService = skuProductsService;
            _skuAttributeService = skuAttributeService;
            _productCategoriesService = productCategoriesService;
            _skuAttributeOptionsService = skuAttributeOptionsService;
            _customSearchTermService = customSearchTermService;
        }

        //[HttpPost]
        [AllowAnonymous]
        public ActionResult AjaxSearch(FormCollection formCollection = null)
        {
            var productSearchViewModel = new ProductSearchViewModel();
            if (formCollection != null)
            {
                if (!string.IsNullOrEmpty(formCollection["keywords"]))
                {
                    formCollection["keywords"] = formCollection["keywords"].Replace(",", " ");
                }
                TryUpdateModel(productSearchViewModel, formCollection);
            }
            if (string.IsNullOrEmpty(productSearchViewModel.SortBy))
            {
                productSearchViewModel.SortBy = "default"; // "alphaasc";
            }
         //   if (productSearchViewModel.SortBy.ToLower() == "default")
         //   {
         //       productSearchViewModel.SortBy = "alphaasc";
         //   }
            var keywords = Request.QueryString["keywords"];
           
            if (!string.IsNullOrWhiteSpace(keywords))
                productSearchViewModel.Keywords = keywords;

            if (formCollection != null)
            {
                if (formCollection.Has("PriceRange"))
                {
                    var priceRange = formCollection["PriceRange"].Split(',').Select(x => x.AsDecimal(0)).ToArray();
                    productSearchViewModel.MinPrice = priceRange[0];
                    productSearchViewModel.MaxPrice = priceRange[1];
                }
            }
            productSearchViewModel.IsB2B = B2BCheckoutService.IsB2BUserLoggedIn(HttpContext);

            var searchCriteria = GetSearchCriteria(productSearchViewModel);
            
            if (!searchCriteria.CustomCriteria.Any(t => t.Key != "CurrencyId" && t.Key != "ShopId") &&
                !searchCriteria.DiscreteTerms.Any())

                return PartialView("Search", productSearchViewModel);


            if (formCollection != null)
            {
                var brands = formCollection["brand"];
                if (!string.IsNullOrWhiteSpace(brands))
                    productSearchViewModel.SelectedBrands = brands.Split(',').ToList();
            }

            var CelebrosSiteKey = ConfigurationManager.AppSettings["CelebrosSiteKey"];
            var CelebrosSearchURL = ConfigurationManager.AppSettings["CelebrosSearchURL"];

            var currentSiteId = CommerceContext.ColonyContext.CurrentSite.Id.ToString(); //CommerceContext.Shop.CurrentShop.Id.ToString();
            
            var results = _skuProductsService.ProductCatalogue.Products.PerformAjaxCelebrosSearch(searchCriteria, CelebrosSiteKey, CelebrosSearchURL, currentSiteId);
            
            if (results.SearchResults.Count == 0 && searchCriteria.CurrentPage == 1) {
                productSearchViewModel.NoResults = true;
            }
            productSearchViewModel.TotalResultCount = results.SearchResults.RecordCount;
            productSearchViewModel.ProductSearchResults = results.SearchResults.Select(t =>
            {
                if (t.Images.Any())
                {
                    var featuredImage = t.Images.OrderBy(i => i.Order).First();

                    t.ImageUri = Url.ImageUrl(featuredImage.ImageAssetID, "productcatalogue", "productthumbnail");
                    t.DetailImageUri = Url.ImageUrl(featuredImage.ImageAssetID,"ProductCatalogue", "ProductDetail");
                    t.ImageAssetId = featuredImage.ImageAssetID;
                    t.DetailImageAssetId = featuredImage.ImageAssetID;
                  
                }
                return t;
            }).ToList();

         //   productSearchViewModel.ProductCategories = results.AvailableProductCategories.Distinct().ToList();
         //   productSearchViewModel.Attributes = _skuAttributeService.GetAll().Distinct().ToList();
            productSearchViewModel.CurrentPage = searchCriteria.CurrentPage;

            productSearchViewModel.AttributeOptionCounts = results.AvailableSkuAttributeOptionIds
                .GroupBy(t => t)
                .Select(grouping => new {grouping.Key, Count = grouping.LongCount()})
                .ToDictionary(t => t.Key.ToString(CultureInfo.InvariantCulture), t => t.Count);
           
            productSearchViewModel.Options = _skuAttributeOptionsService.GetForShop(CommerceContext.Shop.CurrentShop.Id).Distinct().ToList();
            productSearchViewModel.SearchHandle = results.SearchHandle;
            productSearchViewModel.SearchTerms = results.SearchSequence;
            productSearchViewModel.CelebrosOptions = results.FilterOptions;
            productSearchViewModel.CelebrosLogHandle = results.CelebrosLogHandle;
            productSearchViewModel.CelebrosSearchSessionId = results.CelebrosSearchSessionId;
            productSearchViewModel.LastPage = results.LastPage;

            if (!string.IsNullOrEmpty(results.CelebrosCustomMessage)) {
                productSearchViewModel.CelebrosCustomMessage = "<div class=\"searchBanner bedlinenBanner\">" + results.CelebrosCustomMessage + "</div>";
            } else {
                productSearchViewModel.CelebrosCustomMessage = "";
            }

            productSearchViewModel.IsProductCategoryFilterVisible = true;
            productSearchViewModel.IsPatternsFilterVisible = true;
            //productSearchViewModel.IsDimOutFilterVisible = true;
            productSearchViewModel.IsProductGroupFilterVisible = true;
            productSearchViewModel.IsCompositionFilterVisible = true;
            if (CommerceContext.Shop.CurrentShop.Id == 25)
            {
                productSearchViewModel.IsUsageFilterVisible = false;
                productSearchViewModel.IsContractUsageFilterVisible = true;
            }
            else
            {
                productSearchViewModel.IsUsageFilterVisible = true;
                productSearchViewModel.IsContractUsageFilterVisible = false;
            }

            productSearchViewModel.IsFabricTypesVisible = false;
            productSearchViewModel.IsTrimmingTypesVisible = true;
            productSearchViewModel.IsWallpaperTypesVisible = false;
            productSearchViewModel.IsMartindaleFilterVisible = true;
            productSearchViewModel.IsEndUseFilterVisible = true;
            productSearchViewModel.IsTypeFilterVisible = true;
            productSearchViewModel.IsFlameRetardantFilterVisible = true;
            productSearchViewModel.IsBrandFilterVisible = true;
            productSearchViewModel.IsFRInherentVisible = true;
            productSearchViewModel.IsFRTreatableVisible = true;
            productSearchViewModel.isFRTreatedVisible = true;

            if (productSearchViewModel.ProductSearchResults.All(t => t.Attributes.GetValueOrNull("Martindale") == null))
            {
                productSearchViewModel.IsMartindaleFilterVisible = false;
            }

            var cushionsearch = false;
            var othersearch = false;
            foreach (var group in productSearchViewModel.SelectedProductGroups)
            {
                if (group == "6508" || group == "144")
                {
                    cushionsearch = true;
                }
                else
                {
                    if (group != "0")
                    {
                        othersearch = true;
                    }
                }
            }
            if (cushionsearch && !othersearch)
            {
                productSearchViewModel.IsFRInherentVisible = false;
                productSearchViewModel.IsFRTreatableVisible = false;
                productSearchViewModel.isFRTreatedVisible = false;
            }

            foreach (var group in productSearchViewModel.SelectedProductGroups.Where(group => group == "2981"))
            {
                productSearchViewModel.IsFabricTypesVisible = true;
            }

            foreach (var group in productSearchViewModel.SelectedProductGroups.Where(group => group == "2982"))
            {
                productSearchViewModel.IsWallpaperTypesVisible = true;
            }

            foreach (var group in productSearchViewModel.SelectedProductGroups.Where(group => group == "2980"))
            {
                productSearchViewModel.IsTrimmingTypesVisible = true;
            }

            if (productSearchViewModel.SelectedProductGroups.Count == 0 ||
                productSearchViewModel.SelectedProductGroups.FirstOrDefault() == string.Empty)
            {
                productSearchViewModel.IsFabricTypesVisible = true;
                productSearchViewModel.IsTrimmingTypesVisible = true;
                productSearchViewModel.IsWallpaperTypesVisible = true;
            }

            return Json(productSearchViewModel, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult ShopTheLook(string Products)
        {
            var shopId = CommerceContext.Shop.CurrentShop.Id.ToString(CultureInfo.InvariantCulture);
            var results = _skuProductsService.ProductCatalogue.Products.PerformShopTheLookSearch(Products, shopId);
            var productSearchViewModel = new QuickProductSearchViewModel { IsAjax = Request.IsAjaxRequest() };
            productSearchViewModel.TotalResultCount = results.SearchResults.RecordCount;

            productSearchViewModel.ProductSearchResults = results.SearchResults.Select(t =>
            {
                if (t.Images.Any()) {
                    var featuredImage = t.Images.OrderBy(i => i.Order).First();

                    t.ImageUri = Url.ImageUrl(featuredImage.ImageAssetID, "productcatalogue", "productthumbnail");
                    t.DetailImageUri = Url.ImageUrl(featuredImage.ImageAssetID, "ProductCatalogue", "ProductDetail");
                    t.ImageAssetId = featuredImage.ImageAssetID;
                    t.DetailImageAssetId = featuredImage.ImageAssetID;

                    var otherImages = t.Images.OrderBy(i => i.Order).Skip(1);
                    foreach (var otherImage in otherImages)
                    {
                        t.SecondaryImages.Add(new ProductSearchResultImage
                        {
                            ImageAssetID = otherImage.ImageAssetID,
                            Order = otherImage.Order,
                            Sku = otherImage.Sku,
                            SkuId = otherImage.SkuId,
                            Type = otherImage.Type,
                            ImageAsset = otherImage.ImageAsset,
                            ImageUri = Url.ImageUrl(otherImage.ImageAssetID, "productcatalogue", "productthumbnail"),
                            DetailImageUri =
                                Url.ImageUrl(otherImage.ImageAssetID, "ProductCatalogue", "ProductDetail")
                        });
                    }
                }
                return t;
            }).ToList();

            return PartialView("/Views/Wg/WgShop/ShopTheLookPartial.cshtml", productSearchViewModel);
            
            //return Json(productSearchViewModel, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult AjaxCushion(FormCollection formCollection = null)
        {
            var productSearchViewModel = new ProductSearchViewModel {IsAjax = Request.IsAjaxRequest()};

            if (formCollection != null)
                TryUpdateModel(productSearchViewModel, formCollection);

            var keywords = Request.QueryString["keywords"];

            if (!string.IsNullOrWhiteSpace(keywords))
                productSearchViewModel.Keywords = keywords;

            productSearchViewModel.IsB2B = B2BCheckoutService.IsB2BUserLoggedIn(HttpContext);

            var pc = "2979";
            if (pc != null) {
                productSearchViewModel.ProductCategory = new List<string> { "2979" }; // Cushions Cat Id ;
                var searchCriteria = GetSearchCriteria(productSearchViewModel);

                var CelebrosSiteKey = ConfigurationManager.AppSettings["CelebrosSiteKey"];
                var CelebrosSearchURL = ConfigurationManager.AppSettings["CelebrosSearchURL"];

                var currentSiteId = CommerceContext.ColonyContext.CurrentSite.Id.ToString(); //CommerceContext.Shop.CurrentShop.Id.ToString();
                var results = _skuProductsService.ProductCatalogue.Products.PerformAjaxCelebrosSearch(searchCriteria, CelebrosSiteKey, CelebrosSearchURL, currentSiteId);

                productSearchViewModel.TotalResultCount = results.SearchResults.RecordCount;
                
                productSearchViewModel.ProductSearchResults = results.SearchResults.Select(t => {
                    if (t.Images.Any()) {
                        var featuredImage = t.Images.OrderBy(i => i.Order).First();

                        t.ImageUri = Url.ImageUrl(featuredImage.ImageAssetID, "productcatalogue", "productthumbnail");
                        t.DetailImageUri = Url.ImageUrl(featuredImage.ImageAssetID, "ProductCatalogue", "ProductDetail");
                        t.ImageAssetId = featuredImage.ImageAssetID;
                        t.DetailImageAssetId = featuredImage.ImageAssetID;

                        var otherImages = t.Images.OrderBy(i => i.Order).Skip(1);
                        foreach (var otherImage in otherImages) {
                            t.SecondaryImages.Add(new ProductSearchResultImage {
                                ImageAssetID = otherImage.ImageAssetID,
                                Order = otherImage.Order,
                                Sku = otherImage.Sku,
                                SkuId = otherImage.SkuId,
                                Type = otherImage.Type,
                                ImageAsset = otherImage.ImageAsset,
                                ImageUri = Url.ImageUrl(otherImage.ImageAssetID, "productcatalogue", "productthumbnail"),
                                DetailImageUri =
                                    Url.ImageUrl(otherImage.ImageAssetID, "ProductCatalogue", "ProductDetail")
                            });
                        }
                    }
                    return t;
                }).ToList();

                productSearchViewModel.ProductCategories = results.AvailableProductCategories.ToList();
                productSearchViewModel.Options =
                    _skuAttributeOptionsService.GetAll()
                        .Where(t => results.AvailableSkuAttributeOptionIds.Contains(t.Id))
                        .ToList();
                productSearchViewModel.IsPatternsFilterVisible = true;
                productSearchViewModel.IsDimOutFilterVisible = true;
                productSearchViewModel.IsProductGroupFilterVisible = false;
                productSearchViewModel.IsCompositionFilterVisible = true;
                productSearchViewModel.IsEndUseFilterVisible = true;
                productSearchViewModel.IsTypeFilterVisible = true;
                productSearchViewModel.IsFlameRetardantFilterVisible = true;
                productSearchViewModel.IsBrandFilterVisible = true;
                productSearchViewModel.CelebrosOptions = results.FilterOptions;
                productSearchViewModel.CelebrosLogHandle = results.CelebrosLogHandle;
                productSearchViewModel.CelebrosSearchSessionId = results.CelebrosSearchSessionId;
            }
            return Json(productSearchViewModel, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        [AllowAnonymous]
        public ActionResult AjaxPaint(FormCollection formCollection = null)
        {
            var productSearchViewModel = new ProductSearchViewModel {IsAjax = Request.IsAjaxRequest()};

            if (formCollection != null)
                TryUpdateModel(productSearchViewModel, formCollection);

            var keywords = Request.QueryString["keywords"];

            if (!string.IsNullOrWhiteSpace(keywords))
                productSearchViewModel.Keywords = keywords;

            productSearchViewModel.IsB2B = B2BCheckoutService.IsB2BUserLoggedIn(HttpContext);

            var pc =
                _productCategoriesService.GetForFrontEnd(
                    new {ShopId = CommerceContext.Shop.CurrentShop.Id, Uri = "paint"}).FirstOrDefault();
            if (pc != null)
            {
                productSearchViewModel.ProductCategory = new List<string>
                {
                    pc.Id.ToString(CultureInfo.InvariantCulture)
                };

                var searchCriteria = GetSearchCriteria(productSearchViewModel);

                var results = _skuProductsService.ProductCatalogue.Products.PerformAjaxSearch(searchCriteria);
                productSearchViewModel.ProductSearchResults = results.SearchResults.Select(t =>
                {
                    if (t.Images.Any())
                        t.ImageUri = Url.ImageUrl(t.Images.First().ImageAssetID, "productcatalogue", "productthumbnail");
                    return t;
                });
                productSearchViewModel.ProductCategories = results.AvailableProductCategories.ToList();
                productSearchViewModel.Options =
                    _skuAttributeOptionsService.GetAll()
                        .Where(t => results.AvailableSkuAttributeOptionIds.Contains(t.Id))
                        .ToList();
            }
            return Json(productSearchViewModel, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        //[OutputCache(Location = System.Web.UI.OutputCacheLocation.ServerAndClient, Duration = 1800, VaryByCustom = "sitedevice")]
        [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None, VaryByParam = "*")]
        public ActionResult SearchPanel()
        {
            var model = new ProductSearchViewModel
            {
                PopularSearchTerms =
                    _customSearchTermService.GetBySite(ColonyContext.CurrentSite.Id)
                        .Take(5)
                        .ToDictionary(k => k.Name, t => t.Query) //_productsService.GetPopularSearches(5).ToList()
            };

            return PartialView("_SearchPanel", model);
        }

        private SearchCriteria GetSearchCriteria(ProductSearchViewModel productSearchViewModel = null)
        {
            var perPage = AppSettingsHelper.GetSafeValue("ProductsPerPage", 120);
            var pageQs = Request.QueryString["Page"];
            var page = (string.IsNullOrEmpty(pageQs) ? "1" : pageQs.Split(',').FirstOrDefault()).AsInt(1);

            if (productSearchViewModel == null)
            {
                productSearchViewModel = new ProductSearchViewModel
                {
                    ResultsPerPage = perPage,
                    CurrentPage = page,
                    OrderBy = "alphaasc",
                    SortBy = "alphaasc",
                    Keywords = Request.QueryString["keywords"],
                    SearchHandle = "",
                    SearchTerms = ""
                };
            }

            var categoryId = Request["categoryId"];
            var categoryName = Request["categoryName"];
            var productType = Request["SelectedProductGroups"];
            var brand = Request["brand"];

            if (!string.IsNullOrEmpty(brand))
            {
                productSearchViewModel.Brand.Add(brand);
            }

            var searchCriteria = new SearchCriteria
            {
                OrderBy = productSearchViewModel.SortBy ?? "alphaasc", 
                SortBy = productSearchViewModel.SortBy ?? "alphaasc",
                ResultsPerPage = productSearchViewModel.ResultsPerPage,
                CurrentPage = productSearchViewModel.CurrentPage,
                IsB2B = B2BCheckoutService.IsB2BUserLoggedIn(HttpContext)
            };

            if (searchCriteria.ResultsPerPage == 0)
            {
                searchCriteria.ResultsPerPage = perPage;
            }

            if (searchCriteria.CurrentPage == 0)
            {
                searchCriteria.CurrentPage = page;
            }

            searchCriteria.DiscreteTerms = productSearchViewModel.Keywords;
            searchCriteria.CustomCriteria.Add("CurrencyId", CommerceContext.Currency.CurrentForPricing.CurrencyId.ToString(CultureInfo.InvariantCulture));
            searchCriteria.CustomCriteria.Add("ShopId", CommerceContext.Shop.CurrentShop.Id.ToString(CultureInfo.InvariantCulture));
            searchCriteria.CustomCriteria.Add("MinPrice", productSearchViewModel.MinPrice);
            searchCriteria.CustomCriteria.Add("MaxPrice", productSearchViewModel.MaxPrice);
            searchCriteria.CustomCriteria.Add("ProductCategoryID", !string.IsNullOrEmpty(categoryId) ? categoryId : productSearchViewModel.SelectedProductGroups.Count > 0 ? productSearchViewModel.SelectedProductGroups[0] : productSearchViewModel.ProductCategory.ToDelimitedString());
            
            if (!string.IsNullOrEmpty(categoryName))
                searchCriteria.CustomCriteria.Add("ProductCategoryName", categoryName);
            
            if (!string.IsNullOrEmpty(productType))
            {
                var productGroups = productType.Split(new[] {','}, StringSplitOptions.RemoveEmptyEntries);
                if (productGroups.Length > 0)
                    productSearchViewModel.SelectedProductGroups.AddRange(productGroups);
            }
            searchCriteria.CustomCriteria.Add("SearchHandle", productSearchViewModel.SearchHandle);
            searchCriteria.CustomCriteria.Add("searchTerms", productSearchViewModel.SearchTerms);
            searchCriteria.CustomCriteria.Add("Martindale", productSearchViewModel.Martindale);

            var attributeOptions = ToAttributeString(productSearchViewModel.SelectedEndUses,
                productSearchViewModel.SelectedFlameRetardant,
                productSearchViewModel.SelectedType,
                productSearchViewModel.SelectedPatterns,
                productSearchViewModel.SelectedDimOuts,
                productSearchViewModel.SelectedProductGroups,
                productSearchViewModel.SelectedUsage,
                productSearchViewModel.SelectedContractUsage,
                productSearchViewModel.SelectedComposition,
                productSearchViewModel.SelectedFRTreatable,
                productSearchViewModel.SelectedFRTreated,
                productSearchViewModel.SelectedFRInherent,
                productSearchViewModel.SelectedWallpaperTypes,
                productSearchViewModel.SelectedTrimmingTypes,
                productSearchViewModel.SelectedFabricTypes,
                productSearchViewModel.SelectedUpholsteryClothDesignation,
                productSearchViewModel.SelectedWallpaperCareInstructions,
                productSearchViewModel.SelectedFabricCareInstructions,
                productSearchViewModel.SelectedRooms
                );

            var brandAttributeOptions = ToAttributeString(productSearchViewModel.Brand).Replace(",", "|");

            if (attributeOptions.Length > 1)
                searchCriteria.CustomCriteria.Add("Attributes", attributeOptions);
            
            if (brandAttributeOptions.Length > 1)
                searchCriteria.CustomCriteria.Add("BrandAttributes", brandAttributeOptions);

            if (productSearchViewModel.SelectedColours != null && productSearchViewModel.SelectedColours.Any() &&
                productSearchViewModel.SelectedColours[0].IndexOf(",", StringComparison.Ordinal) > 0)
            {
                productSearchViewModel.SelectedColours = productSearchViewModel.SelectedColours[0].Split(',').ToList();
            }

            searchCriteria.CustomCriteria.Add("ColourCodes", string.Join(",", productSearchViewModel.SelectedColours.ToArray()));

            return searchCriteria;
        }

        private string ToAttributeString(params IList<string>[] attributeLists)
        {
            var attributeString = string.Empty;

            foreach (var attributeList in attributeLists.Where(y => y != null).Select(x => x))
            {
                if (!attributeString.StartsWith("|"))
                    attributeString += "|";

                if (attributeList == null || attributeList.All(string.IsNullOrWhiteSpace)) continue;

                attributeString += string.Join("|",
                    attributeList.Distinct().Where(a => !string.IsNullOrWhiteSpace(a)).Select(x => x.Replace("-", ",")));

                if (!attributeString.EndsWith("|"))
                    attributeString += "|";
            }
            return attributeString;
        }
    }
}