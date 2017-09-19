using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using Colony.CMS;
using Colony.CMS.Helpers;
using Colony.Commerce;
using Colony.Commerce.Areas.Shops.Controllers.Frontend;
using Colony.Commerce.Areas.Shops.Helpers;
using Colony.Commerce.Areas.Shops.Models;
using Colony.Commerce.Models.ProductCatalogue;
using Colony.Commerce.Models.ShopPurchase;
using Colony.Commerce.Models.Stock;
using Colony.Commerce.Services.Currencies.Abstract;
using Colony.Commerce.Services.Postage;
using Colony.Commerce.Services.ProductCatalogue;
using Colony.Commerce.Services.ShopPurchase;
using Colony.Commerce.Services.Shops;
using Colony.Commerce.Services.Stock.Abstract;
using Colony.Data.AdoNet;
using Colony.Data.Helpers;
using Colony.Models.Base;
using Colony.Models.Core.Search;
using Colony.Services.Core.Abstract.Countries;
using Colony.Util;
using Colony.Util.Configuration;
using Colony.Util.Serialization;
using Colony.Web.Areas.Shop.Models;
using Colony.Web.Integration.Mertex;
using WalkerGreenbank.Modules.CustomSearch.Services;
using WalkerGreenbank.Modules.PressMembers.Areas.B2BMembers;
using Basket = Colony.Commerce.Models.ShopPurchase.Basket;

namespace Colony.Web.Areas.Shop.Controllers
{
    public class WgShopController : ShopController
    {
        private readonly B2BCheckoutService _b2bCheckoutService;
        private ICustomSearchTermService _customSearchTermService;

        public WgShopController(IShopsService shopService, ISkuProductsService skuProductsService,
            ICacheProvider<ProductCategory> productCategoryCache,
            IProductRecentlyViewedService productRecentlyViewedService, ISkuAttributesService skuAttributesService,
            ISkuAttributeOptionsService skuAttributeOptionsService, IProductCategoriesService productCategoriesService,
            IProductsService productsService, ISkuGroupsService skuGroupsService, ISkuVariantsService skuVariantsService,
            ISkuColourService skuColourService, ICustomSearchTermService customSearchTermService,
            IDeliveryChargeService deliveryChargeService, ISkuService skuService, ISkuPricesService skuPricesService)
            : base(
                shopService, skuProductsService, productCategoryCache, productRecentlyViewedService,
                skuAttributesService,
                skuAttributeOptionsService, productCategoriesService, productsService, skuGroupsService,
                skuVariantsService,
                skuColourService, deliveryChargeService, skuService, skuPricesService)
        {
            _customSearchTermService = customSearchTermService;

            _b2bCheckoutService = new B2BCheckoutService(
                GetService<ITransactionService>(),
                CommerceContext, GetService<IShopsService>(),
                VisitorTrackingContext,
                GetService<ICurrencyService>(),
                ColonyContext);
        }

        [AllowAnonymous]
        public override ActionResult Browse()
        {
            if (ColonyContext.Response.UrlExtension == null)
            {
                if (ColonyContext.Response.UrlParts.Count > 1)
                {
                    if (ColonyContext.Response.UrlParts[1] == "paint")
                    {
                        if (Request.HttpMethod.ToUpper() == "POST")
                        {
                            var formCollection = new FormCollection(Request.Form);
                            return Paint(formCollection);
                        }
                        return Paint();
                    }
                    if (ColonyContext.Response.UrlParts[1] == "cushions" ||
                        ColonyContext.Response.UrlParts[1] == "cushion")
                    {
                        if (Request.HttpMethod.ToUpper() == "POST")
                        {
                            var formCollection = new FormCollection(Request.Form);
                            return Cushions(formCollection);
                        }
                        return Cushions();
                    }
                }
            }
            else if (ColonyContext.Response.UrlExtension == "new-collections")
            {
                return NewCollections();
            }
            else if (ColonyContext.Response.UrlExtension == "quick-order")
            {
                return QuickBuy();
            }

            return base.Browse();
        }

        public override ActionResult ListRootCategories()
        {
            var categories =
                _skuProductsService.ProductCatalogue.ProductsCategories.GetForFrontEndCategoryListing(
                    new {ShopID = CommerceContext.Shop.CurrentShop.Id, ParentID = 0}, null, null).ToList();
            var newCategory = _skuProductsService.ProductCatalogue.ProductsCategories.GetByUri("new-collections",
                ColonyContext.CurrentSite.Id);

            if (newCategory != null)
                categories.Add(newCategory);
            Response.AddHeader("Cache-Control", "Cache-Control:public, max-age=1800");
            return PartialView("ListRootCategories", categories.Select(c => GetCategoryViewModel(c, false)));
        }


        [AcceptVerbs("GET", "HEAD", "OPTIONS")]
        [AllowAnonymous]
        public ActionResult Cushions()
        {
            return Cushions(null);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Cushions(FormCollection formCollection = null)
        {
            var productSearchViewModel = new ProductSearchViewModel();
            productSearchViewModel.IsAjax = Request.IsAjaxRequest();
            
            if (formCollection != null)
                TryUpdateModel(productSearchViewModel, formCollection);

            var keywords = Request.QueryString["keywords"];

            if (!string.IsNullOrWhiteSpace(keywords))
                productSearchViewModel.Keywords = keywords;

            productSearchViewModel.ProductCategory = new List<string> {"2979"}; // Cushions Cat Id ;

            var searchCriteria = GetSearchCriteria(productSearchViewModel);

            //  var results = _skuProductsService.ProductCatalogue.Products.PerformAjaxSearch(searchCriteria);
            var CelebrosSiteKey = ConfigurationManager.AppSettings["CelebrosSiteKey"];
            var CelebrosSearchURL = ConfigurationManager.AppSettings["CelebrosSearchURL"];

            var currentSiteId = CommerceContext.ColonyContext.CurrentSite.Id.ToString(); //CommerceContext.Shop.CurrentShop.Id.ToString();
            var results = _skuProductsService.ProductCatalogue.Products.PerformAjaxCelebrosSearch(searchCriteria, CelebrosSiteKey, CelebrosSearchURL, currentSiteId);

            productSearchViewModel.IsCompositionFilterVisible = true;
            productSearchViewModel.IsPatternsFilterVisible = true;

            productSearchViewModel.ProductSearchResults = results.SearchResults.Select(t =>
            {
                if (t.Images.Any())
                {
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
                            DetailImageUri =Url.ImageUrl(otherImage.ImageAssetID, "ProductCatalogue", "ProductDetail")
                        });
                    }
                }

                var uri = t.Uri;

                if (uri.StartsWith("/shop")) {
                    if (uri.Contains("code=")) {
                        t.Uri = uri;
                    } else {
                        t.Uri = uri + "?code=" + t.ProductCode;
                    }
                } else {
                    t.Uri = "/shop/" + uri + "?code=" + t.ProductCode;
                }

                return t;

            }).ToList();

            productSearchViewModel.Attributes = _skuAttributeService.GetAll().Distinct().ToList();
            productSearchViewModel.CelebrosOptions = results.FilterOptions;
            productSearchViewModel.CelebrosLogHandle = results.CelebrosLogHandle;
            productSearchViewModel.CelebrosSearchSessionId = results.CelebrosSearchSessionId;
            productSearchViewModel.TotalResultCount = productSearchViewModel.ProductSearchResults.Count();
            productSearchViewModel.SearchHandle = results.SearchHandle;


            ColonyContext.Response.SetTemplate("Search");

            return PartialView("Cushions", productSearchViewModel);
        }


        [AcceptVerbs("GET", "HEAD", "OPTIONS")]
        [AllowAnonymous]
        public ActionResult Paint()
        {
            return Paint(null);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Paint(FormCollection formCollection = null)
        {
            var productSearchViewModel = new ProductSearchViewModel();
            productSearchViewModel.IsAjax = Request.IsAjaxRequest();

            if (formCollection != null)
                TryUpdateModel(productSearchViewModel, formCollection);

            var keywords = Request.QueryString["keywords"];

            if (!string.IsNullOrWhiteSpace(keywords))
                productSearchViewModel.Keywords = keywords;

            var pc =
                _productCategoriesService.GetForFrontEnd(
                    new {ShopId = CommerceContext.Shop.CurrentShop.Id, Uri = "paint"}).FirstOrDefault();
            if (pc != null)
            {
                productSearchViewModel.ProductCategory = new List<string>
                {
                    pc.Id.ToString()
                };

                var searchCriteria = GetSearchCriteria(productSearchViewModel);

                productSearchViewModel.ProductSearchResults =
                    _skuProductsService.ProductCatalogue.Products.PerformSearch(searchCriteria)
                        .Cast<ProductSearchResult>();
            }
            ColonyContext.Response.SetTemplate("Paint");
            return PartialView("Paint", productSearchViewModel);
        }

        [OutputCache(Duration = 1200)]
        [AllowAnonymous]
        public ActionResult NewCollections()
        {
            var tab = Request.QueryString["show"];

            var page = 1;
            var pageSize =
                AppSettingsHelper.GetSafeValue(
                    string.Format("MinCollectionSearchResults.{0}", ColonyContext.Current.CurrentSite.SiteKey), 6);
            var keywords = "";
            var brandKey = "";

            if (ColonyContext.Response.QueryParameters.ContainsKey("page"))
                page = ColonyContext.Response.QueryParameters["page"].AsInt(page);

            if (ColonyContext.Response.QueryParameters.ContainsKey("pagesize"))
                pageSize = ColonyContext.Response.QueryParameters["pagesize"].AsInt(pageSize);

            if (ColonyContext.Response.QueryParameters.ContainsKey("brandKey"))
                brandKey = ColonyContext.Response.QueryParameters["brandKey"];
            else
                brandKey = Request.Form["brandKey"] ?? "";

            if (ColonyContext.Response.QueryParameters.ContainsKey("keywords"))
                keywords = ColonyContext.Response.QueryParameters["keywords"];
            else
                keywords = Request.Form["keywords"] ?? "";

            //string cacheKeyCategory = string.Format("shop_{0}_uri_{1}_category", CurrentShop.Id, ColonyContext.Response.UrlExtension);
            //string cacheKeySubCategories = string.Format("shop_{0}_uri_{1}_subcategories", CurrentShop.Id, ColonyContext.Response.UrlExtension);

            var category =
                _productCategoriesService.GetForFrontEndCategoryListing(
                    new {Uri = ColonyContext.Response.UrlExtension, ShopId = CurrentShop.Id}, page, pageSize)
                    .FirstOrDefault();

            if (category == null)
                return HttpNotFound();

            bool? isB2b = null;

            if (IsB2BUserLoggedIn(HttpContext))
                isB2b = true;

            var parameters = new
            {
                ShopID = CurrentShop.Id,
                IsNew = true,
                CategoryKeywords = keywords,
                CategoryBrandKey = brandKey == "" ? null : brandKey,
                IsB2B = isB2b
            };

            var newCollections =
                _productCategoriesService.GetForFrontEndCategoryListing(parameters, page, pageSize)
                    .Where(t => t.ParentID.HasValue)
                    .ToList();

            var viewModel = new CategoryViewModel
            {
                IsParent = true,
                Category = category,
                CategoryId = category.Id,
                Name = category.Name,
                ImageAssetId = category.ImageAssetId,
                LongDescription = category.LongDescription,
                IsNew = category.IsNew,
                SearchKeywords = keywords
            };

            if (category.CategoryImages != null && category.CategoryImages.Any())
                viewModel.Images = category.CategoryImages.ToList();

            viewModel.SubCategories =
                newCollections.Select(
                    subCategory =>
                    {
                        return GetCategoryViewModel(subCategory, isB2b, false, 0, 0, page, pageSize,
                            viewModel.SubCategories.PageCount, viewModel.SubCategories.RecordCount);
                    })
                    .ToPagedCollection(page, pageSize);

            var minCollectionSearchResults =
                AppSettingsHelper.GetSafeValue(
                    string.Format("MinCollectionSearchResults.{0}", ColonyContext.Current.CurrentSite.SiteKey), 6);

            viewModel.ShouldShowSearch = viewModel.SubCategories.Count >= minCollectionSearchResults;

            if (!string.IsNullOrEmpty(keywords))
                viewModel.ShouldShowSearch = true;

            ViewBag.Title = "Products";

            ShopHelpers.SetBreadcrumbForProductCategory(category);
            return PartialView("Category", viewModel);
        }

        [AllowAnonymous]
        public override ActionResult Detail()
        {
            if (ColonyContext.Response.UrlExtension != null)
            {
                if ((ColonyContext.Response.UrlParts.Count > 1 && ColonyContext.Response.UrlParts[1] == "paint") ||
                    (ColonyContext.Response.UrlParts.Count == 1 &&
                     ColonyContext.Response.UrlExtensionParts[0] == "paint"))
                {
                    ViewBag.IsPaint = true;

                    var maxRelated = AppSettingsHelper.GetSafeValue<long>("MaxRelatedProducts", 50);
                    var maxRecentlyViewedProducts = AppSettingsHelper.GetSafeValue("MaxRecentlyViewedProducts", 10);

                    var viewModel = GetProductViewModelForProductDetail("paint/" + ColonyContext.Response.UrlExtension);

                    if (viewModel != null)
                    {
                        if (viewModel.SelectedSku.IsOptionProduct != null)
                        {
                            if (viewModel.SelectedSku.IsOptionProduct.Equals("Y",
                                StringComparison.OrdinalIgnoreCase))
                            {
                                var parentSku =
                                    viewModel.Skus.FirstOrDefault(x => x.Sku.Id == viewModel.SelectedSku.ParentSkuId);
                                if (parentSku != null)
                                {
                                    var redirectUrl = new UriBuilder(ColonyContext.Response.Uri.AbsoluteUri);
                                    var query = HttpUtility.ParseQueryString(ColonyContext.Response.Uri.Query);

                                    query.Remove("code");
                                    query.Add("code", parentSku.Sku.Code);
                                    redirectUrl.Query = query.ToString();

                                    return Redirect(redirectUrl.ToString());
                                }
                                return null;
                            }
                        }
                        //else return null;


                        var trackingEvent = ProductViewedTrackedEvent.Instance;
                        trackingEvent.TrackedEntity = viewModel.Product;
                        VisitorTrackingContext.TrackEvent(trackingEvent, Request.Url.AbsoluteUri);
                        _productsService.AddRecentlyViewedProduct(VisitorTrackingContext.CurrentVisitor.Id,
                            viewModel.Product);
                        var breadcrumbDisplay = "";
                        if(viewModel.SelectedSku.Attributes["Descriptive Colour"] != null) {
                            breadcrumbDisplay = viewModel.SelectedSku.Attributes["Descriptive Colour"];
                        } else {
                            breadcrumbDisplay = "Paint";
                        }
                        if (ViewBag.IsPaint) {
                            ShopHelpers.SetBreadcrumbForProduct(viewModel.Product, breadcrumbDisplay);
                        } else { 
                            ShopHelpers.SetBreadcrumbForProduct(viewModel.Product);
                        }
                        if (ColonyContext.Response.Breadcrumbs.Count >= 3) { 
                            ColonyContext.Response.Breadcrumbs.RemoveAt(ColonyContext.Response.Breadcrumbs.Count - 3);
                        }
                        Response.AddHeader("Cache-Control", "Cache-Control:public, max-age=1800");
                        return PartialView("Detail", viewModel);
                    }
                    return null;
                }
            }
            return base.Detail();
        }

        [AllowAnonymous]
        public ActionResult SearchPaint()
        {
            var model = new ProductSearchViewModel();
            var formCollection = new FormCollection(Request.Form);

            TryUpdateModel(model, formCollection);

            var keyword = Request.QueryString["keywords"];

            if (!string.IsNullOrWhiteSpace(keyword))
                model.Keywords = keyword;

            var selectedColours = Request.QueryString["SelectedColours"];
            if (!string.IsNullOrWhiteSpace(selectedColours))
            {
                model.SelectedColours = selectedColours.Split(',').ToList();
            }
            if (model.SelectedColours == null)
            {
                model.SelectedColours = new List<string>();
            }

            model.ProductCategories = _productCategoriesService.GetAll().ToList();
            model.Options = _skuAttributeOptionsService.GetAll().ToList();

            model.IsPatternsFilterVisible = model.Options.Any(x => x.SkuAttribute.Name == "Pattern");
            model.IsTypeFilterVisible = model.Options.Any(x => x.SkuAttribute.Name == "Type");
            model.IsFlameRetardantFilterVisible = model.Options.Any(x => x.SkuAttribute.Name == "Flame Retardant");
            model.IsMartindaleFilterVisible = model.Options.Any(x => x.SkuAttribute.Name == "Martindale");
            model.IsPriceFilterVisible = model.IsPatternsFilterVisible && model.IsEndUseFilterVisible &&
                                         model.IsTypeFilterVisible
                                         && model.IsFlameRetardantFilterVisible && model.IsMartindaleFilterVisible;
            model.IsProductCategoryFilterVisible = model.IsPatternsFilterVisible && model.IsEndUseFilterVisible &&
                                                   model.IsTypeFilterVisible
                                                   && model.IsFlameRetardantFilterVisible &&
                                                   model.IsMartindaleFilterVisible;
            model.IsFabricTypesVisible = model.Options.Any(x => x.SkuAttribute.Name == "Fabric Type");
            model.IsWallpaperTypesVisible = model.Options.Any(x => x.SkuAttribute.Name == "Wallpaper Type");
            model.IsTrimmingTypesVisible = model.Options.Any(x => x.SkuAttribute.Name == "Trimming Type");
            return PartialView("SearchPaint", model);
        }


        [AllowAnonymous]
        public ActionResult SearchForm()
        {
            var model = new ProductSearchViewModel();
            var formCollection = new FormCollection(Request.Form);

            TryUpdateModel(model, formCollection);

            var keywords = Request.QueryString["keywords"];

            if (!string.IsNullOrWhiteSpace(keywords))
                model.Keywords = keywords;

            var brands = Request.QueryString["brand"];
            if (!string.IsNullOrWhiteSpace(brands))
                model.Brand = brands.Split(',').ToList();

            var selectedColours = Request.QueryString["SelectedColours"];
            if (!string.IsNullOrWhiteSpace(selectedColours))
            {
                model.SelectedColours = selectedColours.Split(',').ToList();
            }

            if (formCollection.Has("PriceRange"))
            {
                var priceRange = formCollection["PriceRange"].Split(',').Select(x => x.AsDecimal(0)).ToArray();
                model.MinPrice = priceRange[0];
                model.MaxPrice = priceRange[1];
            }

            if (formCollection.Has("Martindale"))
            {
                model.Martindale = formCollection["Martindale"].AsInt(0);
            }

            model.ProductCategories = _productCategoriesService.GetAll().ToList();
            model.Options = _skuAttributeOptionsService.GetAll().ToList();

            if (B2BCheckoutService.IsB2BUserLoggedIn(HttpContext))
            {
                model.IsMartindaleFilterVisible = true;
                model.IsEndUseFilterVisible = true;
                model.IsTypeFilterVisible = true;
                model.IsFlameRetardantFilterVisible = true;
            }

            return PartialView(model);
        }

        [AcceptVerbs("GET", "HEAD", "OPTIONS")]
        [AllowAnonymous]
        public override ActionResult Search()
        {
            return Search(null);
        }

        [HttpPost]
        [AllowAnonymous]
        public override ActionResult Search(FormCollection formCollection = null)
        {
            Response.Cache.SetExpires(DateTime.Now.AddSeconds(-1));
            Response.Cache.SetCacheability(HttpCacheability.Public);
            Response.Cache.SetValidUntilExpires(false);
            Response.Cache.VaryByParams["*"] = true;

            var productSearchViewModel = new ProductSearchViewModel();
            productSearchViewModel.IsAjax = Request.IsAjaxRequest();

            if (formCollection != null)
            {
                TryUpdateModel(productSearchViewModel, formCollection);
            } else {
                List<string> URLParts = Request.Url.LocalPath
                    .Split('/')
                    .Where(x => !string.IsNullOrEmpty(x) && x.ToLower() != "search")
                    .ToList();
                //if (URLParts.Length > 0) {
                foreach (var URLPart in URLParts)
                {
                    var option = LookupCelebrosOption(URLPart.ToLower());
                    if (option.Count > 0) {
                        switch (option[0].Filter.ToLower()) {
                            case "selectedproductgroups":
                                productSearchViewModel.SelectedProductGroups.Add(option[0].CelebrosId.ToString());
                                break;
                            case "selectedcolours":
                                productSearchViewModel.SelectedColours.Add(option[0].CelebrosId.ToString());
                                break;
                            case "brand":
                            case "brands":
                                productSearchViewModel.SelectedBrands.Add(option[0].CelebrosId.ToString());
                                break;
                            case "selectedrooms":
                                productSearchViewModel.SelectedRooms.Add(option[0].CelebrosId.ToString());
                                break;
                            case "selectedpatterns":
                                productSearchViewModel.SelectedPatterns.Add(option[0].CelebrosId.ToString());
                                break;
                            case "selectedusage":
                                productSearchViewModel.SelectedUsage.Add(option[0].CelebrosId.ToString());
                                break;
                            case "selectedtrimmingtypes":
                                productSearchViewModel.SelectedTrimmingTypes.Add(option[0].CelebrosId.ToString());
                                break;
                        }
                    } else {
                        //free text search
                        productSearchViewModel.Keywords += URLPart.Replace('-', ' ');
                    }
                }
                //}
            }

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

            var searchCriteria = GetSearchCriteria(productSearchViewModel);
            if (searchCriteria.CustomCriteria.Where(t => t.Key != "CurrencyId" && t.Key != "ShopId").Count() == 0 &&
                searchCriteria.DiscreteTerms.Count() == 0)
                return PartialView("Search", productSearchViewModel);

            if (B2BCheckoutService.IsB2BUserLoggedIn(HttpContext))
            {
                productSearchViewModel.IsMartindaleFilterVisible = true;
                productSearchViewModel.IsEndUseFilterVisible = true;
                productSearchViewModel.IsTypeFilterVisible = true;
                productSearchViewModel.IsFlameRetardantFilterVisible = true;
            }

            return PartialView("Search", productSearchViewModel);
        }

        private List<CelebrosSearchFilters> LookupCelebrosOption(string URLPart)
        {
            List<CelebrosSearchFilters> Filters = _productsService.GetCelebrosSearchFilters().ToList();
            return Filters.Where(t => t.Term.ToLower() == URLPart.ToLower()).ToList();
//            return 0;
        }

        private string ToAttributeString(params IList<string>[] attributeLists)
        {
            var attributeString = string.Empty;

            foreach (var attributeList in attributeLists.Select(x => x).Where(y => y != null))
            {
                if (!attributeString.StartsWith("|"))
                    attributeString += "|";

                if (attributeList != null && attributeList.Any(x => !string.IsNullOrWhiteSpace(x)))
                {
                    attributeString += string.Join("|",
                        attributeList.Where(a => !string.IsNullOrWhiteSpace(a)).Select(x => x.Replace("-", ",")));

                    if (!attributeString.EndsWith("|"))
                        attributeString += "|";
                }
            }
            return attributeString;
        }

        private SearchCriteria GetSearchCriteria(ProductSearchViewModel productSearchViewModel = null)
        {
            var sortBy = Request.QueryString["SortBy"];
            if (string.IsNullOrEmpty(sortBy)) sortBy = "default"; // "alphaasc";
//            if (sortBy.ToLower() == "default")
//            {
//                sortBy = "alphaasc";
//            }
            var pageQS = Request.QueryString["Page"];
            var page = (string.IsNullOrEmpty(pageQS) ? "1" : pageQS.Split(',').FirstOrDefault()).AsInt(1);
            var perPage = AppSettingsHelper.GetSafeValue("ProductsPerPage", 120);

            var categoryId = Request["categoryId"];
            var categoryName = Request["categoryName"];
            var brand = Request["brand"];

            if (productSearchViewModel == null)
            {
                productSearchViewModel = new ProductSearchViewModel
                {
                    ResultsPerPage = perPage,
                    CurrentPage = page,
                    OrderBy = sortBy,
                    Keywords = Request.QueryString["keywords"]
                };
            }
            if (!string.IsNullOrEmpty(brand))
            {
                productSearchViewModel.Brand.Add(brand);
            }

            var searchCriteria = new SearchCriteria
            {
                OrderBy = productSearchViewModel.OrderBy ?? "default",
                ResultsPerPage = productSearchViewModel.ResultsPerPage,
                CurrentPage = productSearchViewModel.CurrentPage
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
            searchCriteria.CustomCriteria.Add("CurrencyId",
                CommerceContext.Currency.CurrentForPricing.CurrencyId.ToString());
            searchCriteria.CustomCriteria.Add("ShopId", CommerceContext.Shop.CurrentShop.Id.ToString());
            searchCriteria.CustomCriteria.Add("MinPrice", productSearchViewModel.MinPrice);
            searchCriteria.CustomCriteria.Add("MaxPrice", productSearchViewModel.MaxPrice);
            if (!string.IsNullOrEmpty(categoryId))
                searchCriteria.CustomCriteria.Add("ProductCategoryID", categoryId);
            else
                searchCriteria.CustomCriteria.Add("ProductCategoryID",
                    productSearchViewModel.ProductCategory.ToDelimitedString());
            if (!string.IsNullOrEmpty(categoryName))
                searchCriteria.CustomCriteria.Add("ProductCategoryName", categoryName);
            searchCriteria.CustomCriteria.Add("Martindale", productSearchViewModel.Martindale);


            var attributeOptions = ToAttributeString(productSearchViewModel.SelectedEndUses,
                productSearchViewModel.SelectedFlameRetardant,
                productSearchViewModel.SelectedType,
                productSearchViewModel.SelectedPatterns,
                productSearchViewModel.SelectedDimOuts,
                productSearchViewModel.SelectedProductGroups,
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
            var brandAttributeOptions = ToAttributeString(productSearchViewModel.Brand);
            if (attributeOptions.Length > 1)
                searchCriteria.CustomCriteria.Add("Attributes", attributeOptions);
            if (brandAttributeOptions.Length > 1)
                searchCriteria.CustomCriteria.Add("BrandAttributes", brandAttributeOptions);

            if (productSearchViewModel.SelectedColours != null && productSearchViewModel.SelectedColours.Any() &&
                productSearchViewModel.SelectedColours[0].IndexOf(",") > 0)
            {
                productSearchViewModel.SelectedColours = productSearchViewModel.SelectedColours[0].Split(',').ToList();
            }
            searchCriteria.CustomCriteria.Add("ColourCodes",
                string.Join(",", productSearchViewModel.SelectedColours.ToArray()));

            return searchCriteria;
        }

        [OutputCache(Duration = 1200, VaryByParam = "categoryId")]
        [AllowAnonymous]
        public ActionResult CollectionQuickView(long? categoryId)
        {
            if (categoryId.HasValue)
            {
                var category =
                    _productCategoriesService.GetForFrontEndCategoryListing(new {ProductCategoryID = categoryId.Value},
                        null, null).FirstOrDefault();

                return PartialView(GetCategoryViewModelForQuickView(category));
            }
            return HttpNotFound();
        }

        private CollectionQuickViewViewModel GetCategoryViewModelForQuickView(ProductCategory category)
        {
            CollectionQuickViewViewModel model = null;
            if (category.FeaturedProducts.Count() > 1)
            {
                model = new CollectionQuickViewViewModel
                {
                    ProductCategoryId = category.Id,
                    Name = category.Name,
                    Url = Url.ProductCategoryUrl(category),
                    LongDescription = category.LongDescription,
                    Products =
                        category.FeaturedProducts.Select(t => GetProductViewModelForQuickView(t))
                            .Where(t => t != null)
                            .ToList()
                };
            }
            else
            {
                model = new CollectionQuickViewViewModel
                {
                    ProductCategoryId = category.Id,
                    Name = category.Name,
                    Url = Url.ProductCategoryUrl(category),
                    LongDescription = category.LongDescription,
                    Products =
                        category.FeaturedProducts.First()
                            .SkuGroup.Skus.Select(
                                t => GetProductViewModelForQuickView(category.FeaturedProducts.First(), t))
                            .Where(t => t != null)
                            .ToList()
                };
            }

            return model;
        }

        private ProductListingViewModel GetProductViewModelForQuickView(Product product)
        {
            if (product.SelectedSku != null)
            {
                var model = new ProductListingViewModel
                {
                    Url = Url.ProductUrl(product),
                    Name = product.Name,
                    FullName = product.SelectedSku.Name,
                    ProductCode = product.SelectedSku.Code,
                    SkuId = product.SelectedSku.Id,
                    Attributes = product.SelectedSku.Attributes.ToDictionary(t => t.Key, t => t.Value),
                    IsNew = product.SelectedSku.IsNew
                };
                if (product.SelectedSku.Images.Any())
                    model.ImageAssetId = product.SelectedSku.Images.OrderBy(t => t.Order).FirstOrDefault().ImageAssetID;

                return model;
            }
            return null;
        }


        private ProductListingViewModel GetProductViewModelForQuickView(Product product, Sku sku)
        {
            if (sku != null)
            {
                var model = new ProductListingViewModel
                {
                    Url = Url.ProductUrl(product),
                    Name = product.Name,
                    FullName = sku.Name,
                    ProductCode = sku.Code,
                    SkuId = sku.Id,
                    Attributes = sku.Attributes.ToDictionary(t => t.Key, t => t.Value),
                    IsNew = sku.IsNew
                };
                if (sku.Images.Any())
                    model.ImageAssetId = sku.Images.OrderBy(t => t.Order).FirstOrDefault().ImageAssetID;

                return model;
            }
            return null;
        }

        private SkuDetailViewModel GetSkuViewModelForQuickView(Sku sku)
        {
            var model = new SkuDetailViewModel();
            return model;
        }

        [AllowAnonymous]
        public ActionResult PaintQuickView(long? productId, long? skuId = null)
        {
            if (productId.HasValue)
            {
                Sku sku = null;
                var product = _productsService.GetById(productId.Value);
                if (skuId != null)
                    sku = _skuProductsService.Skus.GetById(skuId.Value);

                return PartialView(GetProductViewModel(product, selectedSku: sku));
            }
            return HttpNotFound();
        }

        [OutputCache(Duration = 1200, VaryByParam = "skuId", Location = OutputCacheLocation.ServerAndClient)]
        [AllowAnonymous]
        public ActionResult ProductQuickView(long productId, long? skuId = null)
        {
            Sku sku = null;
            var product = _productsService.GetById(productId);
            if (skuId != null)
                sku = _skuProductsService.Skus.GetById(skuId.Value);

            return PartialView(GetProductViewModel(product, selectedSku: sku));
        }

        [AllowAnonymous]
        public ActionResult Trimmings()
        {
            return PartialView();
        }

        [AllowAnonymous]
        public ActionResult PredictiveSearchFrontend(string tag, string term)
        {
            tag = tag ?? term;

            var results = _productsService.PredictiveSearchFrontend(tag, CommerceContext.Currency.CurrentForPricing.Id,
                CommerceContext.Shop.CurrentShop.Id);

            var jsonResult = results.Select(x =>
            {
                var name = x.Name;
                var uri = "/shop/" + x.Uri;

                if (!string.IsNullOrWhiteSpace(x.SkuCode))
                {
                    uri += "?code=" + x.SkuCode;
                    name += " - " + x.SkuCode;
                }

                return new {key = x.Name, value = name, url = uri};
            });

            return Json(jsonResult, JsonRequestBehavior.AllowGet);
        }


        [AllowAnonymous]
        public ActionResult PredictiveSearchFrontendQuickPurchase(string term)
        {
            var searchCriteria = new SearchCriteria
            {
                OrderBy = "default",
                ResultsPerPage = 20,
                CurrentPage = 1
            };

            searchCriteria.DiscreteTerms = term;
            searchCriteria.CustomCriteria.Add("CurrencyId",
                CommerceContext.Currency.CurrentForPricing.CurrencyId.ToString());
            searchCriteria.CustomCriteria.Add("ShopId", CommerceContext.Shop.CurrentShop.Id.ToString());
            var results = _skuProductsService.ProductCatalogue.Products.PerformAjaxSearch(searchCriteria);

            var jsonResult = results.SearchResults.Select(x =>
            {
                var name = x.Name;
                var uri = "/shop/" + x.Uri;

                if (!string.IsNullOrWhiteSpace(x.Code))
                {
                    uri += "?code=" + x.Code;
                    name += " - " + x.Code;
                }

                return
                    new
                    {
                        key = x.Name,
                        value = name,
                        url = uri,
                        productcode = x.Code,
                        images =
                            x.Images.Select(
                                y =>
                                    new
                                    {
                                        ImageAssetId = y.ImageAssetID,
                                        y.Order,
                                        Url =
                                            Url.ImageUrl(y.ImageAssetID, "ProductCatalogue", "ProductThumbnail",
                                                "/_images/placeholders/article.jpg")
                                    })
                                .OrderBy(y => y.Order)
                                .FirstOrDefault(),
                        attributes = x.Attributes,
                        skuId = x.SkuId
                    };
            });

            return Json(jsonResult, JsonRequestBehavior.AllowGet);
        }

        private void UpdateSpecificTransactionFromTrialToLive(
            ITransactionService transactionService,
            ISerializer serializer,
            ISkuService skuService,
            services service,
            Transaction transaction)
        {
            var basket = serializer.GetFromXml<Basket>(transaction.PurchaseXml);
            var orderLines = new List<OrderLine>();
            foreach (var lineitem in basket.Lines)
            {
                var sku = skuService.GetById(lineitem.SkuId.Value);
                var line = new OrderLine
                {
                    ProductCode = sku.Code,
                    SampleIndicator = "Y",
                    OrderQuantity = lineitem.Quantity.GetValueOrDefault(0).ToString(),
                    Quantity = lineitem.Quantity.GetValueOrDefault(0).ToString(),
                    OrderLineNumber = "-1"
                };
                orderLines.Add(line);
            }
            var checkoutService = GetService<ICheckoutService>();
            var checkout = checkoutService.GetReadOnlyCheckoutFromXml(transaction.CheckOutXml);
            var deliveryAddress = checkout.GetAddress(AddressType.Delivery);
            var countryService = GetService<ICountryService>();
            var country = countryService.GetById(deliveryAddress.CountryId.Value);
            var order = new Order
            {
                DeliveryAddress = new Address
                {
                    Address1 = deliveryAddress.Line1,
                    Address2 = deliveryAddress.Line2,
                    Address3 = deliveryAddress.Town,
                    Address4 = deliveryAddress.County,
                    Postcode = deliveryAddress.Postcode,
                    CountryCode = country.ISO3166Alpha2,
                    DomesticTradeIndicator = "D",
                    Name =
                        (deliveryAddress.FirstName + " " + deliveryAddress.LastName + " " + deliveryAddress.Company ??
                         "").Trim()
                },
                PriorityOrderIndicator = "N",
                Email = checkout.Person.EmailAddress,
                CustomerOrderReference = transaction.OrderNumber
            };
            var customerRef = "119303";

            switch (ColonyContext.Current.CurrentSite.SiteKey.ToLowerInvariant())
            {
                case "harlequin":
                    customerRef = "119303";
                    break;
                case "sanderson":
                    customerRef = "102508";
                    break;
                case "zoffany":
                    customerRef = "129909";
                    break;
                case "scion":
                    customerRef = "122375";
                    break;
                case "morris":
                    customerRef = "129910";
                    break;
                case "wg":
                    customerRef = "129912";
                    break;
                case "anthology":
                    customerRef = "134512";
                    break;
            }
            transaction.SetValue("MertexResponse", service.B2CCreateBasket(customerRef, orderLines.ToArray(), order));
            transaction.SetValue("Mertex_UpdatedFromTrialToLive", true);
            transactionService.Update(transaction);
        }

        [AllowAnonymous]
        public ActionResult MoveTrialTransactionsToLiveAccountRA2014()
        {
            var service = new services();
            service.Url = ConfigurationManager.AppSettings["WebtexBaseUrl"] + "/redant/services.asmx";
            var serializer = GetService<ISerializer>();
            var skuService = GetService<ISkuService>();
            var transactionService = GetService<ITransactionService>();

            var transactions =
                transactionService.Get(new {AttachedToTrialAccount = true, ShopId = CommerceContext.Shop.CurrentShop.Id});

            foreach (var transaction in transactions)
            {
                UpdateSpecificTransactionFromTrialToLive(
                    transactionService,
                    serializer,
                    skuService,
                    service,
                    transaction
                    );
            }

            return View();
        }

        public ActionResult QuickBuy()
        {
            return PartialView("QuickBuy");
        }

        public override bool IsB2BUserLoggedIn(HttpContextBase context)
        {
            return B2BCheckoutService.IsB2BUserLoggedIn(HttpContext);
        }
         
    }
}