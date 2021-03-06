﻿using System.Web.Optimization;

namespace Colony.Web
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/_js/b2bbundle")
                .Include("~/_js/shared/b2b.js?v=2")
            );

            bundles.Add(new ScriptBundle("~/_js/bundle")
                .Include("~/_js/vendor/custom.modernizr.min.js")
                .Include("~/_js/shared/all-stockist.js")
                .Include("~/_js/shared/fastclick.js")
                .Include("~/_js/shared/initfastclick.js")
                .Include("~/_js/shared/redant/redant.util.js")
                .Include("~/_js/shared/eventShim.js")
                .Include("~/_js/vendor/jquery.validate.min.js")
                .Include("~/_js/vendor/jquery.validate.unobtrusive.js")
                .Include("~/_js/vendor/underscore.js")
                .Include("~/_js/vendor/backbone.min.js")
                .Include("~/_js/vendor/jquery.form.js")
                .Include("~/_js/vendor/jquery.ui.touch-punch.min.js")
                .Include("~/_js/vendor/fcbkcomplete.js")
                .Include("~/_js/vendor/jquery.elevateZoom-3.0.3.js")
                .Include("~/_js/shared/redant/form.js")
                .Include("~/_js/shared/redant/jquery.accordion.redant.js")
                .Include("~/_js/shared/iScroll.js")
                .Include("~/_js/shared/iScroll.ipad.js")
                .Include("~/_js/vendor/jquery.qtip.min.js")
                .Include("~/_js/vendor/magnific.js")
                .Include("~/_js/shared/jquery.placeholder.js")
                .Include("~/_js/vendor/jquery.kinetic.js")
                .Include("~/_js/vendor/libs/jquery/jquery.mousewheel.js")
                .Include("~/_js/shared/nice.scroll.min.js")
                .Include("~/_js/shared/jquery.lettering.js")
                .Include("~/_js/shared/jquery.animate.js")
                .Include("~/_js/vendor/jquery.touchSwipe.min.js")
                .Include("~/_js/vendor/jquery.easing.1.3.js")
                .Include("~/_js/vendor/jquery.carouFredSel-6.2.1-packed.js")
                .Include("~/_js/vendor/jquery.tmpl.min.js")
                .Include("~/_js/vendor/libs/jquery.ui.rotatable.js")
                //.Include("~/_js/shared/turnjs.js")
                .Include("~/_js/shared/img-touch-canvas.js")
                .Include("~/_js/shared/jquery.lazyload.js")
                .Include("~/_js/vendor/globalize.min.js")
                .Include("~/_js/vendor/globalize.culture.en-GB.js")
                .Include("~/_js/shared/main.min.js")
                .Include("~/_js/shared/menus.js")
                .Include("~/_js/shared/search.js")
                .Include("~/_js/shared/cookie.js")
                .Include("~/_js/shared/dev.min.js")
                .Include("~/_js/shared/ShopTheLook.js")
                //.Include("~/_js/shared/redant/jquery.validate.daterequired.js")
                .Include("~/_js/shared/jquery.cookie.js")
                .Include("~/_js/shared/jquery-scrollto.js")
                .Include("~/_js/shared/quickview.js")
                .Include("~/_js/shared/jquery.hoverIntent.minified.js")
                .Include("~/_js/vendor/jquery.ui.rotatable.js")
                .Include("~/_js/shared/infinitescroll.js")
                .Include("~/_js/shared/forceNumeric.js")
                .Include("~/_js/foundation/foundation.js")
                .Include("~/_js/foundation/foundation.alerts.js")
                .Include("~/_js/foundation/foundation.clearing.js")
                .Include("~/_js/foundation/foundation.cookie.js")
                .Include("~/_js/foundation/foundation.dropdown.js")
                //.Include("~/_js/foundation/foundation.joyride.js")
                .Include("~/_js/foundation/foundation.magellan.js")
                .Include("~/_js/foundation/foundation.orbit.js")
                .Include("~/_js/foundation/foundation.placeholder.js")
                .Include("~/_js/foundation/foundation.reveal.js")
                .Include("~/_js/foundation/foundation.section.js")
                .Include("~/_js/foundation/foundation.tooltips.js")
                .Include("~/_js/foundation/foundation.topbar.js")
                .Include("~/_plugins/uitotop/js/easing.js")
                .Include("~/_plugins/uitotop/js/jquery.ui.totop.min.js")
                .Include("~/_js/smoothscroll.js")
            );

            bundles.Add(new ScriptBundle("~/_js/Collectionsbundle")
                // moved from Inspire view
                .Include("~/_js/vendor/custom.modernizr.min.js")
                .Include("~/_js/vendor/jquery-ui-ra-edit.min.js")
                .Include("~/_js/shared/all-stockist.js")
                .Include("~/_js/shared/redant/redant.util.js")
                .Include("~/_js/vendor/jquery.validate.min.js")
                .Include("~/_js/vendor/jquery.validate.unobtrusive.js")
                .Include("~/_js/vendor/underscore.js")
                .Include("~/_js/vendor/backbone.min.js")
                .Include("~/_js/vendor/jquery.ui.touch-punch.min.js")
                .Include("~/_js/shared/redant/form.js")
                .Include("~/_js/shared/redant/jquery.accordion.redant.js")
                .Include("~/_js/shared/iScroll.js")
                .Include("~/_js/shared/iScroll.ipad.js")
                .Include("~/_js/vendor/jquery.qtip.min.js")
                .Include("~/_js/vendor/magnific.js")
                .Include("~/_js/shared/jquery.placeholder.js")
                .Include("~/_js/vendor/jquery.kinetic.js")
                .Include("~/_js/vendor/libs/jquery/jquery.mousewheel.js")
                .Include("~/_js/shared/nice.scroll.min.js")
                .Include("~/_js/shared/jquery.lettering.js")
                .Include("~/_js/shared/jquery.animate.js")
                .Include("~/_js/vendor/jquery.touchSwipe.min.js")
                .Include("~/_js/vendor/jquery.easing.1.3.js")
                .Include("~/_js/vendor/jquery.carouFredSel-6.2.1-packed.js")
                .Include("~/_js/vendor/jquery.tmpl.min.js")
                .Include("~/_js/vendor/libs/jquery.ui.rotatable.js")
                //.Include("~/_js/shared/turnjs.js")
                .Include("~/_js/shared/img-touch-canvas.js")
                .Include("~/_js/shared/jquery.lazyload.js")
                .Include("~/_js/vendor/globalize.min.js")
                .Include("~/_js/vendor/globalize.culture.en-GB.js")
                .Include("~/_js/shared/main.min.js")
                .Include("~/_js/shared/menus.js")
                .Include("~/_js/shared/search.js")
                .Include("~/_js/shared/cookie.js")
                .Include("~/_js/shared/dev.min.js")
                .Include("~/_js/shared/ShopTheLook.js")
                .Include("~/_js/shared/jquery.cookie.js")
                .Include("~/_js/shared/jquery-scrollto.js")
                .Include("~/_js/shared/quickview.js")
                .Include("~/_js/shared/jquery.hoverIntent.minified.js")
                .Include("~/_js/vendor/jquery.ui.rotatable.js")
                .Include("~/_js/shared/infinitescroll.js")
                .Include("~/_js/shared/forceNumeric.js")
                .Include("~/_js/foundation/foundation.js")
                .Include("~/_js/foundation/foundation.alerts.js")
                .Include("~/_js/foundation/foundation.clearing.js")
                .Include("~/_js/foundation/foundation.cookie.js")
                .Include("~/_js/foundation/foundation.dropdown.js")
                //.Include("~/_js/foundation/foundation.joyride.js")
                .Include("~/_js/foundation/foundation.magellan.js")
                .Include("~/_js/foundation/foundation.orbit.js")
                .Include("~/_js/foundation/foundation.placeholder.js")
                .Include("~/_js/foundation/foundation.reveal.js")
                .Include("~/_js/foundation/foundation.section.js")
                .Include("~/_js/foundation/foundation.tooltips.js")
                .Include("~/_js/foundation/foundation.topbar.js")
                .Include("~/_plugins/uitotop/js/easing.js")
                .Include("~/_plugins/uitotop/js/jquery.ui.totop.min.js")
                .Include("~/_js/smoothscroll.js")
                .Include("~/_js/brands/wg/scripts.js")
                .Include("~/_js/brands/wg/slick.min.js")
                .Include("~/_js/brands/wg/WgMinBasket.js")
                .Include("~/_js/shared/jquery.twbsPagination.min.js")
                );

            bundles.Add(new ScriptBundle("~/_js/Inspirebundle")

                // moved from Inspire view
                .Include("~/_js/vendor/custom.modernizr.min.js")
                .Include("~/_js/vendor/jquery-ui-ra-edit.min.js")

                ///////////////////////////
                //                 .Include("~/_js/shared/all-stockist.js")
                //.Include("~/_js/shared/redant/redant.util.js")
                //.Include("~/_js/shared/nice.scroll.min.js")
                //.Include("~/_js/shared/menus.js")
                //.Include("~/_js/foundation/foundation.js")
                //.Include("~/_js/foundation/foundation.alerts.js")
                //.Include("~/_js/foundation/foundation.clearing.js")
                //.Include("~/_js/foundation/foundation.cookie.js")
                //.Include("~/_js/foundation/foundation.dropdown.js")
                //.Include("~/_js/shared/dev.js")
                ////////////////////////////////////////////////
                .Include("~/_js/shared/all-stockist.js")
                //                .Include("~/_js/shared/fastclick.js")
                //                .Include("~/_js/shared/initfastclick.js")
                .Include("~/_js/shared/redant/redant.util.js")
                //                .Include("~/_js/shared/eventShim.js")
                .Include("~/_js/vendor/jquery.validate.min.js")
                .Include("~/_js/vendor/jquery.validate.unobtrusive.js")
                .Include("~/_js/vendor/underscore.js")
                .Include("~/_js/vendor/backbone.min.js")
                //                .Include("~/_js/vendor/jquery.form.js")
                .Include("~/_js/vendor/jquery.ui.touch-punch.min.js")
                //                .Include("~/_js/vendor/fcbkcomplete.js")
                //                .Include("~/_js/vendor/jquery.elevateZoom-3.0.3.js")
                .Include("~/_js/shared/redant/form.js")
                .Include("~/_js/shared/redant/jquery.accordion.redant.js")
                .Include("~/_js/shared/iScroll.js")
                .Include("~/_js/shared/iScroll.ipad.js")
                .Include("~/_js/vendor/jquery.qtip.min.js")
                .Include("~/_js/vendor/magnific.js")
                .Include("~/_js/shared/jquery.placeholder.js")
                .Include("~/_js/vendor/jquery.kinetic.js")
                .Include("~/_js/vendor/libs/jquery/jquery.mousewheel.js")
                .Include("~/_js/shared/nice.scroll.min.js")
                .Include("~/_js/shared/jquery.lettering.js")
                .Include("~/_js/shared/jquery.animate.js")
                .Include("~/_js/vendor/jquery.touchSwipe.min.js")
                .Include("~/_js/vendor/jquery.easing.1.3.js")
                .Include("~/_js/vendor/jquery.carouFredSel-6.2.1-packed.js")
                .Include("~/_js/vendor/jquery.tmpl.min.js")
                .Include("~/_js/vendor/libs/jquery.ui.rotatable.js")
                //.Include("~/_js/shared/turnjs.js")
                .Include("~/_js/shared/img-touch-canvas.js")
                .Include("~/_js/shared/jquery.lazyload.js")
                .Include("~/_js/vendor/globalize.min.js")
                .Include("~/_js/vendor/globalize.culture.en-GB.js")
                .Include("~/_js/shared/main.min.js")
                .Include("~/_js/shared/menus.js")
                .Include("~/_js/shared/search.js")
                .Include("~/_js/shared/cookie.js")
                .Include("~/_js/shared/dev.min.js")
                .Include("~/_js/shared/ShopTheLook.js")
                //.Include("~/_js/shared/redant/jquery.validate.daterequired.js")
                .Include("~/_js/shared/jquery.cookie.js")
                .Include("~/_js/shared/jquery-scrollto.js")
                .Include("~/_js/shared/quickview.js")
                .Include("~/_js/shared/jquery.hoverIntent.minified.js")
                .Include("~/_js/vendor/jquery.ui.rotatable.js")
                .Include("~/_js/shared/infinitescroll.js")
                .Include("~/_js/shared/forceNumeric.js")
                .Include("~/_js/foundation/foundation.js")
                .Include("~/_js/foundation/foundation.alerts.js")
                .Include("~/_js/foundation/foundation.clearing.js")
                .Include("~/_js/foundation/foundation.cookie.js")
                .Include("~/_js/foundation/foundation.dropdown.js")
                //.Include("~/_js/foundation/foundation.joyride.js")
                .Include("~/_js/foundation/foundation.magellan.js")
                .Include("~/_js/foundation/foundation.orbit.js")
                .Include("~/_js/foundation/foundation.placeholder.js")
                .Include("~/_js/foundation/foundation.reveal.js")
                .Include("~/_js/foundation/foundation.section.js")
                .Include("~/_js/foundation/foundation.tooltips.js")
                .Include("~/_js/foundation/foundation.topbar.js")
                .Include("~/_plugins/uitotop/js/easing.js")
                .Include("~/_plugins/uitotop/js/jquery.ui.totop.min.js")
                .Include("~/_js/smoothscroll.js")

                // moved from Inspire view
                .Include("~/_js/brands/wg/scripts.js")
                .Include("~/_js/brands/wg/slick.min.js")
                .Include("~/_js/brands/wg/WgMinBasket.js")

            );

            bundles.Add(new StyleBundle("~/_css/common")
                    .Include("~/_css/normalize.min.css")
                    .Include("~/_css/jquery-ui-1.10.3.custom.min.css")

            );

            bundles.Add(new StyleBundle("~/_css/inspire")
                    .Include("~/_css/normalize.min.css")
                    .Include("~/_css/brands/wg/dist/foundation.min.css")
                    .Include("~/_css/css/wg.css")
                    .Include("~/_fonts/MyFontsWebfontsKit/MyFontsWebfontsKit.css")
                    .Include("~/_css/brands/wg/flag-icon.min.css")
                    .Include("~/_css/brands/wg/font-awesome.min.css")
                    .Include("~/_plugins/uitotop/css/ui.totop.css")
            );
            bundles.Add(new StyleBundle("~/_css/collections")
                .Include("~/_css/normalize.min.css")
                .Include("~/_css/brands/wg/dist/foundation.min.css")
                .Include("~/_css/css/wg.css")
                .Include("~/_fonts/MyFontsWebfontsKit/MyFontsWebfontsKit.css")
                .Include("~/_css/brands/wg/flag-icon.min.css")
                .Include("~/_css/brands/wg/font-awesome.min.css")
                .Include("~/_plugins/uitotop/css/ui.totop.css")
                .Include("~/_css/css/wg.css")
            );

            bundles.Add(new StyleBundle("~/_css/wg")
                    .Include("~/_css/normalize.min.css")
                    .Include("~/_css/brands/wg/jquery-ui-1.10.3.custom.min.css")
                    .Include("~/_css/brands/wg/dist/foundation.min.css")
                    .Include("~/_css/brands/wg/module.css?v=1")
                    .Include("~/_css/brands/wg/slick.css")
                    .Include("~/_css/brands/wg/slick-theme.css")
                    .Include("~/_css/brands/wg/flag-icon.css")
                    .Include("~/_fonts/MyFontsWebfontsKit/MyFontsWebfontsKit.css")
                    .Include("~/_css/brands/wg/font-awesome.min.css")
                    .Include("~/_plugins/uitotop/css/ui.totop.css")
                    .Include("~/_css/css/wg.css")            

            );

            bundles.Add(new StyleBundle("~/_css/contracts")
                .Include("~/_css/normalize.min.css")
                .Include("~/_css/jquery-ui-1.10.3.custom.min.css")
                .Include("~/_css/brands/contracts/dist/foundation.min.css")
                .Include("~/_css/brands/contracts/dist/styles-blessed1.css")
                .Include("~/_css/brands/contracts/dist/styles.css")         //test
                .Include("~/_css/dev.css")
                .Include("~/_css/css/contract.css")
            ); 

            //TODO: Fix minification issues.
            BundleTable.EnableOptimizations = false;
        }
    }
}