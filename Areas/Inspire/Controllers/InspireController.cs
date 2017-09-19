using System;
using System.Linq;
using System.Web.Mvc;
using Colony.CMS;
using Colony.Commerce.Models.Inspire;
using Colony.Commerce.Services.Inspire;
using Colony.Web.Areas.Inspire.Models;

namespace Colony.Web.Areas.Inspire.Controllers
{
    public class InspireController : ColonyFrontendController
    {
        //
        // GET: /Inspire/Inspire/
        protected readonly IInspireService _inspireService;

        public InspireController(IInspireService inspireService)// : base(inspireService)
        {
            if (inspireService == null) throw new ArgumentNullException("inspireService");
            _inspireService = inspireService;
        }

        public ActionResult Index(string section, string keywords, string usecache)
        {
            bool cacheData = !!string.IsNullOrEmpty(usecache);
            InspireHomepageViewModel pageViewModel = new InspireHomepageViewModel();
            if (!string.IsNullOrEmpty(section))
            {
                InspireSearchFilters filters = new InspireSearchFilters();
                switch (section.ToLower())
                {
                    case "advice":
                        filters.isAdvice = true;
                        break;
                    case "theedit":
                        filters.isTheEdit = true;
                        break;
                    case "ugc":
                        filters.isUserContent = true;
                        break;
                    case "room":
                    case "rooms":
                        filters.isRooms = true;
                        break;
                    case "ourpicks":
                        filters.isOurPicks = true;
                        break;
                    case "video":
                    case "videos":
                        filters.isVideo = true;
                        break;
                    case "lookbook":
                        filters.isLookBook = true;
                        break;
                    case "clear":
                        filters.isClear = true;
                        break;
                    case "keyword":
                        filters.keywords = keywords;
                        break;
                }
                pageViewModel.InspireArticles = _inspireService.GetInspireArticles(filters);
                pageViewModel.InspireFilters = filters;
            }
            else
            {
                pageViewModel.InspireArticles = _inspireService.GetInspireHomePage(cacheData);
                pageViewModel.InspireFilters = new InspireSearchFilters();
            }
            // pageViewModel.NumberOfPages = pagein
            ColonyContext.Current.Response.CurrentTemplate = "inspire";
            return View("~/Areas/Inspire/Views/Inspire/Index.cshtml", pageViewModel);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult GetUGC()
        {
            return PartialView("~/Areas/inspire/Views/Inspire/_InspireUGC.cshtml");
        }
        public ActionResult ShowPost(string articleID) {
            var test = ColonyContext.Response.UrlParts;
           
            //TODO get article by URL above
            if (!string.IsNullOrEmpty(ColonyContext.Response.Url))
            {
                InspireArticleViewModel pageViewModel = new InspireArticleViewModel();
                pageViewModel.Article = _inspireService.GetInspireArticle(ColonyContext.Response.Url);
               
                if (pageViewModel.Article.Any())
                {
                    int ArticleId = pageViewModel.Article.FirstOrDefault().ArticleID;

                    pageViewModel.ArticleTypes = _inspireService.GetArchiveArticles(ArticleId).ToList();
                }
                
                ColonyContext.Current.Response.CurrentTemplate = "inspire";
                return View("~/Areas/Inspire/Views/Inspire/ShowArticle.cshtml", pageViewModel);
            }
            else
            {
                return null;
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult FilterArticles(string filter, string Keywords)
        {
            InspireHomepageViewModel FilteredArticles = new InspireHomepageViewModel();
            InspireSearchFilters filters = new InspireSearchFilters();
            filters.keywords = Keywords;
            switch (filter.ToLower()) {
                case "advice":
                    filters.isAdvice = true;
                    break;
                case "theedit":
                    filters.isTheEdit = true;
                    break;
                case "ugc":
                    filters.isUserContent = true;
                    break;
                case "room":
                case "rooms":
                    filters.isRooms = true;
                    break;
                case "ourpicks":
                    filters.isOurPicks = true;
                    break;
                case "video":
                case "videos":
                    filters.isVideo = true;
                    break;
                case "lookbook":
                    filters.isLookBook = true;
                    break;
                case "clear":
                    filters.isClear = true;
                    break;
                case "keyword":
                    filters.keywords = Keywords;
                    break;
            }
            FilteredArticles.InspireArticles = _inspireService.GetInspireArticles(filters);
            FilteredArticles.NumberOfPages = getPages(FilteredArticles.InspireArticles.Count());
            return PartialView("~/Areas/Inspire/Views/Inspire/_InspireSearchResults.cshtml", FilteredArticles.InspireArticles);
        }

        private int getPages(int numArticles)
        {
            //TODO - delayed until later
            return 1;
        }
    }
}
