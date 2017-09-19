using System.Collections.Generic;
using Colony.Commerce.Models.Inspire;

namespace Colony.Web.Areas.Inspire.Models
{
    public class InspireHomepageViewModel
    {
        public IEnumerable<InspireSearch> InspireArticles { get; set; }

        public InspireSearchFilters InspireFilters { get; set; }
        public int NumberOfPages { get; set; }
    }

    public class InspireArticleViewModel
    {
        public InspireArticleViewModel()
        {
            ArticleTypes = new List<InspireArticleType>();
        }

        public IEnumerable<InspireArticleDetails> Article { get; set; }
        public List<InspireArticleType> ArticleTypes { get; set; } 
    }
}