using System;
using System.IO;
using System.Web.Mvc;

namespace Colony.Web.Areas.Email.Controllers
{
    public static class RazorViewToString
    {
        public static string ConvertView(this Controller controller, string viewName, object model)
        {
            if (controller == null)
            {
                throw new ArgumentNullException("controller", "Extension method called on a null controller");
            }

            if (controller.ControllerContext == null)
            {
                return string.Empty;
            }

            controller.ViewData.Model = model;

            using (var stringWriter = new StringWriter())
            {
                ViewEngineResult viewEngineResult = ViewEngines.Engines.FindPartialView(controller.ControllerContext, viewName);
                ViewContext viewContext = new ViewContext(controller.ControllerContext, viewEngineResult.View, controller.ViewData, controller.TempData, stringWriter);

                viewEngineResult.View.Render(viewContext, stringWriter);
                viewEngineResult.ViewEngine.ReleaseView(controller.ControllerContext, viewEngineResult.View);

                string viewString = stringWriter.GetStringBuilder().ToString();

                return viewString;
            }
        }
    }
}