using System.Web.Mvc;
using Colony.CMS;

namespace Colony.Web.Areas.Sharing
{
    public class ShareAreaRegistration : ColonyAreaRegistration
    {
        public override string AreaName
        {
            get { return "Sharing"; }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Share_default",
                "Sharing/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional}
                );
        }
    }
}