using System;
using System.Collections.Generic;
using System.Linq;
using Colony.Commerce;
using Colony.Commerce.Models;
using Colony.Commerce.Models.Postage;
using Colony.Commerce.Models.ShopPurchase;
using Colony.Commerce.Services.Postage;
using Colony.Util;

namespace Colony.Web.Areas.Shop
{
    public class WgPostageCalculationService : IPostageCalculationService
    {
        #region IPostageCalculationService Members

        public decimal CalculatePostage(Basket basket, int? deliveryMethod, ICommerceContext commerceContext)
        {
            if (ColonyCommerceContext.Current.Shop.CurrentShop.FreeSamples) return 0;

            // TODO: remove hardcoded postage costs
            if (deliveryMethod == 2) return 0;

            decimal costForFirstFourItems = 3;
            var costPerAdditionalItem = 0.75M;

            var basketQuantity = basket.Lines.Sum(x => x.Quantity).AsDecimal(0);

            return costForFirstFourItems + (basketQuantity > 4 ? (basketQuantity - 4)*costPerAdditionalItem : 0);
        }

        public IEnumerable<DeliveryCharge> GetPostageCharges(Basket basket, ICommerceContext commerceContext)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}