using System.Web.Mvc;
using Colony.CMS;
using Colony.Util.Web;

namespace Colony.Web.Areas.Members
{
    public class MembersAreaRegistration : ColonyAreaRegistration
    {
        public override string AreaName
        {
            get { return "SSOMembers"; }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapTidyRoute("ssomembers",
                "sso/{controller}/{action}", new {controller = "SSOLogin", action = "Callback"},
                new[] {"Colony.Web.Areas.Members.Controllers"});
        }
    }
}