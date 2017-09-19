using System.Web.Mvc;

namespace Colony.Web.Areas.Inspire
{
    public class InspireAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Inspire";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Inspire_default",
                "Inspire/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
