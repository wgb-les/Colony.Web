using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Colony.Commerce.Models.Collections;

namespace Colony.Web.Areas.Collections.Models
{
    public class CollectionsPageViewModel
    {
        public CollectionSearchResult Collections { get; set; }
        public CollectionSearchFilters filters { get; set; }
    }
}