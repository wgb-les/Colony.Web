using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Colony.Web.Areas.B2BMembers.Models
{
	public class B2BCheckoutResultViewModel
	{
		public string CustomerName { get; set; }
		public string CustomerReference { get; set; }
		public string Result { get; set; }
		public string OrderNumber { get; set; }
	}
}