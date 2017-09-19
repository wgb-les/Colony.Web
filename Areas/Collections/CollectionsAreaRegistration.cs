using System.Web.Mvc;

namespace Colony.Web.Areas.Collections
{
    public class CollectionsAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Collections";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Collections_default",
                "shop/collections/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
