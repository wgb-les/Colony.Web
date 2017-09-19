using System.Collections.Generic;
using System.Web.Mvc;
using Colony.CMS;
using Colony.Models.Core.WGModels.Calculator;
using Colony.Models.Core.WGModels.WgViewModels.Calculator;
using Colony.Services.WGServices.Concrete.Calculator;

//HAMA111061
namespace Colony.Web.Areas.Shop.Controllers
{
    public class WgCalculatorController :  ColonyBaseController
    {
        [AcceptVerbs("GET", "HEAD", "OPTIONS")]
        public ActionResult WallpaperCalculator()
        {
            WallPaperViewModel vm = new WallPaperViewModel();
            vm.RollDimensions = new RollViewModel { Height = 10.05M, Width = 52, DefaultsUsed = true, PatternMatch = "", PatternRepeat = 0};

            ViewBag.IsPaint = false;
            return View("~/Views/Wg/Calculator/WallpaperCalculator.cshtml", vm);
        }

        [AcceptVerbs("GET", "HEAD", "OPTIONS")]
        public ActionResult WallpaperCalculatorModal(decimal rollPrice = 0, decimal height = 0, decimal width = 0, string patternmatch = "", decimal repeat = 0)
        {
            repeat = repeat / 10;

             WallPaperViewModel vm = new WallPaperViewModel{
                Ssp = rollPrice,
                RollDimensions = new RollViewModel
                 {
                     Height = height, 
                     Width = width,
                     PatternMatch = patternmatch,
                     PatternRepeat = repeat
                }
             };

             ViewBag.IsPaint = false;
             return PartialView("~/Views/Wg/Calculator/_wallpaperCalulatorModal.cshtml", vm);
         }
        
        [HttpGet]
        public ActionResult PaintCalculator()
        {
            var vm = new PaintCalculatorViewModel
            {
                Surfaces = PaintSelectorHandler.SurfaceSelectList(),
                Finishes = PaintSelectorHandler.FinishSelectList(),
                Coats = PaintSelectorHandler.CoatsSelectList(),
            };
            ViewBag.IsPaint = true;
            return View("~/Views/Wg/Calculator/PaintCalculator.cshtml", vm);
        }

        [HttpGet]
        public ActionResult PaintCalculatorModal()
        {
            var vm = new PaintCalculatorViewModel
            {
                Surfaces = PaintSelectorHandler.SurfaceSelectList(),
                Finishes = PaintSelectorHandler.FinishSelectList(),
                Coats = PaintSelectorHandler.CoatsSelectList(),
            };
            ViewBag.IsPaint = true;
            return PartialView("~/Views/Wg/Calculator/_PaintCalculatorModal.cshtml", vm);
        }

        [HttpGet]
        public ActionResult MeasurementSnippet(string viewName)
        {     
            string view = "_metresInput";
            switch (viewName.ToLower())
            {
                case "metres":
                    view = "~/Views/Wg/Calculator/_metresInput.cshtml";
                    break;
                case "feet":
                    view = "~/Views/Wg/Calculator/_feetInput.cshtml";
                    break;
                case "inches":
                    view = "~/Views/Wg/Calculator/_inchesInput.cshtml";
                    break;
            }

            return PartialView(view);
        }
       
        [HttpPost]
        public JsonResult CalculatePaint(SelectedPaintViewModel vm)
        {            
            if (!ModelState.IsValid || vm.SelectedFinish == null || vm.SelectedCoats == null ||
                 vm.SelectedSurface == null || vm.Walls == null || vm.Units == null)

                return Json(new { success = false });

             var result = PaintCoverageCalculator.GetNumberOfRollsNeededForWall(vm);
             return Json(result, JsonRequestBehavior.AllowGet);
        }
        
        [HttpPost]
        public JsonResult CalculatePaper(WallPaperViewModel vm)
         {
             if (vm.Units == null || vm.Walls == null || vm.RollDimensions == null || !ModelState.IsValid)

             return Json(new { success = false });

             var wallsModelList = AutoMapper.Mapper.Map<List<Wall>>(vm.Walls);
             var paperDimensions = AutoMapper.Mapper.Map<Roll>(vm.RollDimensions);

             var result = WallPaperCalculatorHandler.GetTotalNumberOfRollsOfWallpaper(vm.Units, vm.Ssp,  wallsModelList, paperDimensions);
            

             return Json(result, JsonRequestBehavior.AllowGet);
         }       
    }
}
