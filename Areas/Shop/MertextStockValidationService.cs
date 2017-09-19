using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Services.Protocols;
using Colony.CMS.Helpers;
using Colony.Commerce.Models.Stock;
using Colony.Commerce.Services.Stock;
using Colony.Commerce.Services.Stock.Abstract;
using Colony.Services;
using Colony.Services.Core.Abstract.Sites;
using Colony.Util.Configuration;
using Colony.Web.Integration.Mertex;


namespace Colony.Web.Areas.Shop
{
    public class MertextStockValidationService : IStockValidationService
    {
        private readonly ISitesService _sitesService;
        private readonly ISkuProductsService _skuProductsService;

        public MertextStockValidationService(ISkuProductsService skuProductsService,
            ISkuBundlesService skuBundlesService, ISitesService sitesService)
        {
            _skuProductsService = skuProductsService;
            _sitesService = sitesService;
        }

        private string GetCustomerNumberForSite(Commerce.Models.Shops.Shop shop)
        {
            switch (shop.ShopKey.ToLowerInvariant())
            {
                case "harlequin":
                    return "119303";
                case "sanderson":
                    return "102508";
                case "zoffany":
                    return "129909";
                case "scion":
                    return "122375";
                case "morris":
                    return "129910";
                case "wg":
                    return "129912";
            }

            return string.Empty;
        }

        #region IStockValidationService Members

        public ValidationResponse CheckSkuStockLevel(long skuId, int requiredQuantity, Commerce.Models.Shops.Shop shop)
        {
            var sku = _skuProductsService.Skus.GetById(skuId);

            return CheckSkuStockLevel(sku, requiredQuantity, shop);
        }

        public ValidationResponse CheckSkuStockLevel(Sku sku, int requiredQuantity, Commerce.Models.Shops.Shop shop)
        {
            if (sku == null) throw new ArgumentNullException("sku");
            if (shop == null) throw new ArgumentNullException("shop");

            var validationResponse = new ValidationResponse();
            var outOfStockThreshold = AppSettingsHelper.GetSafeValue(shop.Name + ".OutOfStockThreshold", 5);

            var _cache =
                (Dictionary<string, Tuple<DateTime, ValidationResponse>>)
                    HttpContext.Current.Session["RCStockLookupCache"];
            if (_cache == null) _cache = new Dictionary<string, Tuple<DateTime, ValidationResponse>>();

            // 10 minute stock cache       
            if (_cache.ContainsKey(sku.Code))
            {
                var tup = _cache[sku.Code];
                if (tup.Item1.AddMinutes(10) > DateTime.Now)
                {
                    return tup.Item2;
                }
            }

            try
            {
                var attributes =
                    _skuProductsService.Skus.GetAttributesForSku(sku)
                        .Select(t => new {t.Name, t.Value})
                        .Distinct()
                        .ToDictionary(t => t.Name, t => t.Value);
                var productGroup = attributes.GetValueOrNull("Product Group");

                //TODO:STOCKLEVEL
                if (productGroup == "Rugs" || productGroup == "Cushions" || productGroup == "Breakfast" ||
                    productGroup == "Bedding" || productGroup == "Paint")
                {
                    return new ValidationResponse();
                }

                var service = new services();
                service.Url = ConfigurationManager.AppSettings["WebtexBaseUrl"] + "/redant/services.asmx";
                //var mertexCode = attributes.GetValueOrNull("Design Code");
                var mertexCode = sku.Code;
                if (mertexCode != null)
                {
                    mertexCode += "/C"; // TODO: revisit to not hard code for samples
                    var customerNumber = GetCustomerNumberForSite(shop);

                    StockAvailable pd = null;

                    // There maybe instances where Mertex is not available for a live stock check, 
                    // therefore we need to wrap the stock lookup in a try...catch. If a SoapException is thrown,
                    // we catch it and set the stock level to configured threshold. 
                    try
                    {
                        pd = service.B2CStockLookup(customerNumber, mertexCode);
                    }
                    catch (SoapException ex)
                    {
                        System.Diagnostics.Debug.WriteLine(ex.Message);
                        pd = new StockAvailable
                        {
                            ProductCode = mertexCode,
                            Item_Level_Stock = outOfStockThreshold.ToString()
                        };
                    }
                    if (pd != null)
                    {
                        int stocklevel;
                        var mertexStockLevel = pd.Item_Level_Stock;
                        int.TryParse(mertexStockLevel, out stocklevel);

                        if (stocklevel < requiredQuantity)
                        {
                            var errorMsg =
                                string.Format(
                                    "The item {0} – {1} is temporarily out of stock.",
                                    mertexCode, sku.Name);
                            validationResponse.Errors.Add(new StockError {Message = errorMsg});
                        }
                    }
                    else
                    {
                        var errorMsg =
                            string.Format(
                                "The item {0} – {1} is temporarily out of stock.",
                                mertexCode, sku.Name);
                        validationResponse.Errors.Add(new StockError {Message = errorMsg});
                    }
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                validationResponse.Errors.Add(new StockError {Message = "There was an error checking stock levels."});
            }
            if (!_cache.ContainsKey(sku.Code))
                _cache.Add(sku.Code, new Tuple<DateTime, ValidationResponse>(DateTime.Now, validationResponse));
            HttpContext.Current.Session["RCStockLookupCache"] = _cache;
            return validationResponse;
        }

        public ValidationResponse CheckSkuBundleStockLevel(long skuBundleId, int requiredQuantity)
        {
            if (skuBundleId > 0)
            {
                throw new NotSupportedException("Mertex does not support sku bundles.");
            }
            var vr = new ValidationResponse();
            return vr;
        }

        public ValidationResponse CheckSkuBundleStockLevel(SkuBundle skuBundle, int requiredQuantity)
        {
            if (skuBundle != null)
            {
                throw new NotSupportedException("Mertex does not support sku bundles.");
            }
            return new ValidationResponse();
        }

        #endregion
    }
}