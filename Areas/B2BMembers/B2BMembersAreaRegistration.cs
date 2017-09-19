using System.Web.Mvc;
using Colony.CMS;
using Colony.Util.Web;

namespace Colony.Web.Areas.B2BMembers
{
	public class B2BMembersAreaRegistration : ColonyAreaRegistration
	{
		public override string AreaName
		{
			get
			{
				return "B2BMembers";
			}
		}

		public override void RegisterArea(AreaRegistrationContext context)
		{
			context.MapTidyRoute(
				"B2BMembers_default",
				"B2BMembers/{controller}/{action}/{id}",
				new { action = "Index", id = UrlParameter.Optional },
				namespaces: new[] { "Colony.Web.Areas.B2BMembers.Controllers" });
		}
	}
}
