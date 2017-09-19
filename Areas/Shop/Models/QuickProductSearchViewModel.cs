using System.Collections.Generic;
using Colony.Commerce.Models.ProductCatalogue;

namespace Colony.Web.Areas.Shop.Models
{
    public class QuickProductSearchViewModel
    {
        public bool IsAjax { get; set; }
        public bool IsB2B { get; set; }

        public IEnumerable<ProductSearchResult> ProductSearchResults { get; set; }

        public int LastPage { get; set; }

        public long TotalResultCount { get; set; }

        public string SortBy { get; set; }
    }
}