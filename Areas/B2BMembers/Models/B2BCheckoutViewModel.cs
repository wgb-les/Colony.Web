using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Colony.CMS.Areas.CRM.Models;
using Colony.Web.Integration.Mertex;

namespace Colony.Web.Areas.B2BMembers.Models
{
	public class B2BCheckoutViewModel
	{
		public BasketViewModel Basket { get; set; }
		public string CustomerReference { get; set; }
		public string BasketGuid { get; set; }
		public AddressViewModel Address { get; set; }
		[Display(Name="Order Reference")]
		[Required]
		public string OrderReference { get; set; }
		[Display(Name="Confirmation Email Address")]
		public string ConfirmationEmailAddress { get; set; }
		[Display(Name="Delivery Instructions")]
		[DataType(DataType.MultilineText)]
		public string SpecialInstructions { get; set; }
		[Display(Name="Is this a priority order?")]
		[UIHint("Checkbox")]
		public bool IsPriorityOrder { get; set; }
	}
}