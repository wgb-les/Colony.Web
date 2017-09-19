using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Colony.Behaviours.ComponentTypes;

namespace Colony.Web.Models
{
	public class BehaviourTestViewModel
	{
		[Display(Name="Email Address")]
		[Required]
		[StringLength(255)]
		public EmailComponent EmailAddress { get; set; }
		
		[UIHint("DataTableComponent")]
		public DataTableComponent<Colony.Models.Core.Pages.Page> DataTable1 { get; set; }
	}
}