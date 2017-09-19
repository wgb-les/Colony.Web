using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Colony.CMS.Areas.CRM.Models;

namespace Colony.Web.Areas.B2BMembers.Models
{
	public class B2BCheckoutPaymentViewModel
	{
		public IEnumerable<B2BCheckoutViewModel> Checkouts { get; set; }
		public AddressViewModel Address { get; set; }
	}
}