using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Colony.CMS;
using Colony.Commerce.Models.Collections;
using Colony.Commerce.Services.Collections;
using Colony.Web.Areas.Collections.Models;

namespace Colony.Web.Areas.Collections.Controllers
{
    public class CollectionsController : ColonyFrontendController
    {
        //
        // GET: /Collections/Collections/
        protected readonly ICollectionService _collectionService;

        public CollectionsController(ICollectionService collectionService)// : base(collectionService)
        {
            if (collectionService == null) throw new ArgumentNullException("collectionService");
            _collectionService = collectionService;
        }
        public ActionResult Index(string section, string keywords, string category, string brandkey, string page, string isNew, string sortBy)
        {
            CollectionsPageViewModel pageViewModel = new CollectionsPageViewModel();
            CollectionSearchFilters filters = new CollectionSearchFilters();
            if (!string.IsNullOrEmpty(section) || !string.IsNullOrEmpty(keywords) || !string.IsNullOrEmpty(category) ||
                !string.IsNullOrEmpty(brandkey)) {
                filters.Brand = string.IsNullOrEmpty(brandkey) ? "ALL" : brandkey.ToUpper();
                filters.isNew = isNew == "true" ? true : false;
                filters.Keywords = string.IsNullOrEmpty(keywords) ? null : keywords.Trim() == "ALL" ? null : keywords;
                //                filters.Keywords = keywords.Trim() == "ALL" ? null : keywords;
                filters.sortOrder = !string.IsNullOrEmpty(sortBy) ? sortBy : "Date";

                filters.Page = string.IsNullOrEmpty(page) ? 0 : int.Parse(page);
                if (!string.IsNullOrEmpty(category)) { 
                    switch (category.ToLower()) {
                        case "wallpaper":
                            filters.ParentCategoryId = 19624;
                            break;
                        case "fabric":
                            filters.ParentCategoryId = 18496;
                            break;
                        default:
                            filters.ParentCategoryId = category.ToUpper() == "ALL" ? 0 : int.Parse(category);
                            break;
                    }
                }
                pageViewModel.Collections = _collectionService.GetFilteredCollections(filters);
            } else { 
                pageViewModel.Collections = _collectionService.GetCollectionsHomePage(true);
            }
            ColonyContext.Current.Response.CurrentTemplate = "collections";
            pageViewModel.filters = filters;
            return View("~/Areas/Collections/Views/Collections/Index.cshtml", pageViewModel);
        }
        
        public ActionResult FilterCollections(string Keywords, string brandKey, string category, string page, string isNew, string sortBy)
        {
            CollectionsPageViewModel pageViewModel = new CollectionsPageViewModel();
            CollectionSearchFilters filters = new CollectionSearchFilters();
            filters.Brand = brandKey;
            filters.isNew = isNew == "true" ? true :false;
            filters.Keywords = Keywords.Trim() == "ALL" ? null : Keywords;
            filters.Page = int.Parse(page);
            filters.ParentCategoryId = category.ToUpper() == "ALL" ? 0 : int.Parse(category);
            filters.sortOrder = sortBy;
            pageViewModel.Collections = _collectionService.GetFilteredCollections(filters);

            return PartialView("~/Areas/Collections/Views/Collections/_CollectionsSearchResults.cshtml", pageViewModel.Collections);
        }
    }
}
