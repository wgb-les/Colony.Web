using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Colony.Commerce;
using Colony.Commerce.Areas.ShopPurchase.Models;
using Colony.Commerce.Models.ShopPurchase;
using Colony.Commerce.Services.ShopPurchase;

namespace Colony.Web.Areas.B2BMembers
{
	public class B2COrderHandler
	{
		private readonly ICheckoutService _checkoutService;
		private readonly IBasketViewModelBuilder _basketViewModelBuilder;

		public B2COrderHandler(ICheckoutService checkoutService, IBasketViewModelBuilder basketViewModelBuilder)
		{
			_checkoutService = checkoutService;
			_basketViewModelBuilder = basketViewModelBuilder;
		}

		public bool HandleOrder(Transaction transaction, ColonyCommerceContext commerceContext)
		{
			var checkout = _checkoutService.GetReadOnlyCheckoutFromXml(transaction.CheckOutXml);
			if (checkout == null)
			{
				return false;
			}
			var basketViewModel = _basketViewModelBuilder.GetBasketViewModel(checkout.Basket, commerceContext);
			return true;
		}
	}
}