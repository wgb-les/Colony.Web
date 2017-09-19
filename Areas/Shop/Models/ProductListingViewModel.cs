using System;
using System.Collections.Generic;

namespace Colony.Web.Areas.Shop.Models
{
    [Serializable]
    public class ProductListingViewModel
    {
        public long ImageAssetId { get; set; }
        public string Url { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public string ProductCode { get; set; }
        public long SkuId { get; set; }
        public IDictionary<string, string> Attributes { get; set; }
        public bool IsNew { get; set; }
    }
}