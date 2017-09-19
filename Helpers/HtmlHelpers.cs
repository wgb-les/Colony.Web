using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Routing;
using System.Web.WebPages;
using Colony.CMS;
using Colony.CMS.Areas.CRM.Models;
using Colony.CMS.Models;
using Colony.Commerce.Areas.ShopPurchase.Models;
using Colony.Models;
using Colony.Util;
using Colony.Util.Web;
using Newtonsoft.Json;

namespace Colony.Web.Helpers
{
    public static class HtmlHelpers
    {
        public enum FormatAddressStyle
        {
            SingleLine,
            MultiLine
        }


        public static IHtmlString CreateBasketProductsJson(this HtmlHelper htmlHelper, IList<BasketLineViewModel> basketLines)
        {
            var products = JsonConvert.SerializeObject(basketLines.Select(item => new
            {
                name = item.Name,
                id = item.Sku.Code,
                price = item.TotalInc.ToString("0.00"),
                brand = (item.Attributes["Brand"]).Replace("&amp;", "&"),
                category = item.Attributes.ContainsKey("Product Group") ? item.Attributes["Product Group"] : "",
                variant = item.IsSample ? "Sample" : "Product",
                quantity = item.Quantity,
                dimension2 = item.Attributes.ContainsKey("Descriptive Colour") ? item.Attributes["Descriptive Colour"] : "",
                dimension3 = item.Category.Name,
                dimension4 = item.Attributes.ContainsKey("Pattern Match Description") ? item.Attributes["Pattern Match Description"] : "",
                dimension5 = (item.Sku.Width ?? 0).ToString("0.0")
            }));

            return new HtmlString(products);
        }

    }
}