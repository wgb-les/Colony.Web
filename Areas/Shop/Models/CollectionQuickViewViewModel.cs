using System;
using System.Collections.Generic;

namespace Colony.Web.Areas.Shop.Models
{
    [Serializable]
    public class CollectionQuickViewViewModel
    {
        public long ProductCategoryId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string LongDescription { get; set; }
        public IList<ProductListingViewModel> Products { get; set; }
    }
}