window.Wg = window.Wg || {};
Wg.Menus = Wg.Menus || function(win, doc, $, Redant, undefined) {

    var preventOpen = false,
        isHoverNav = false,
        scrapBookAddHover = false;

    function clearAllMenus() {
        if (preventOpen == false) {
            if ($("li a").hasClass("highlightedMenu") || $("li a").hasClass("selected")) {
                $(".footerToggles li a").removeClass("highlightedMenu").removeClass("selected");
                if (isHoverNav == false) {
                    resetMenu();
                }
            }
            if ($(".scrapBookAdd").length > 0) {
                if (!$(".scrapBookAdd:hover").length > 0 && $(".scrapBookAdd").is(":visible")) {
                    $(".scrapBookAdd").fadeOut("")(300, function() {}).slideToggle();
                }
            }

            if ($(".toggleExplore").hasClass("toggleExplore")) {
                $(".toggleExplore").removeClass("selected");
            } else {
            }
        }
    }

    function toggleStockists() {
        resetMenu();
        if (!$("#whereToBuy").is(":visible")) {
            $("#whereToBuy").fadeIn();
            $("#StockistSearchIsVisible").val("true");
        }
    }

    var exports = {
        init: function() {


            //if (Redant.util.browser.isMobile() || Redant.util.browser.isTablet() || $("body").hasClass("mobileStockistsResults"))
            //    Redant.util.loadScript("/_js/shared/stockist-mobile.min.js");
            //else
            ////            Redant.util.loadScript('/_js/shared/stockist.min.js');
            //    Redant.util.loadScript("/_js/shared/stockist.js?v=2");


            $(document).ready(function() {
                if ($("#deepLinks .section:not(.intro)").length == 0)
                //$('.toggleInspire').remove();
                    $(".bottomMenu, #map_content").mouseover(function() {
                        isHoverNav = true;
                    }).mouseleave(function() {
                        isHoverNav = false;
                    });

                $(".searchPanel, .bottomMenu").mouseenter(function() {
                    preventOpen = true;
                }).mouseleave(function() {
                    preventOpen = false;
                });

                var scrapBookAddHover = false;
                $(".scrapBookAdd").mouseover(function() {
                    scrapBookAddHover = true;
                }).mouseout(function() {
                    scrapBookAddHover = false;
                });

                var isCorp = false;
                $(".toggleMoreInfoMob").bind("click touchstart", function(event) {
                    $(".mobileCorporateMenu.mobMoreInfo").toggle();
                    if (!$(this).find("span b").hasClass("icon-caret-down")) {
                        $(this).find("span b").toggleClass("icon-caret-down").removeClass("icon-caret-up");
                    } else {
                        $(this).find("span b").toggleClass("icon-caret-up").removeClass("icon-caret-down");
                    }
                    event.preventDefault();
                    return false;
                });
                $(".toggleMoreInfo").click(function(e) {
                    e.preventDefault();
                    resetMenu();
                    preventOpen = true;
                    var corporateInfo = $("#corporateInfo");
                    var footer = $("#footer");
                    $("#corporateInfo").show();
                    isCorp = true;
                    if (footer.css("bottom") == "75px") {
                        footer.animate({ bottom: "0px", avoidCSSTransitions: true }, 500, function() {});
                        corporateInfo.animate({ bottom: "-75px", avoidCSSTransitions: true }, 500, function() {
                            corporateInfo.hide();
                        });
                        $(".corporateToggle").find(".icon-caret-down").removeClass("icon-caret-down").addClass("icon-caret-up");
                    } else {
                        footer.animate({ bottom: "75px", avoidCSSTransitions: true }, 500, function() {});
                        corporateInfo.animate({ bottom: "-10px", avoidCSSTransitions: true }, 500, function() {});
                        $(".corporateToggle").find(".icon-caret-up").removeClass("icon-caret-up").addClass("icon-caret-down");
                    }
                    requestTimeout(function() {
                        preventOpen = false;
                        isCorp = false;
                    }, 20);
                    return false;
                });

                $("body").on("change", "form#stockistSearch select", function(e) {
                    $(".error.alertInfo").hide();

                    var siteKey = $("#SiteKey").val();
                    $("#stockistSearch .large-8 ul li").hide();
                    switch ($(this).val()) {
                    case "1":
                        $("#Postcode").attr("placeholder", "Enter Postcode, Town or City");
                        $("#HasWallpaper").parents("li").show();
                        $("#HasFabric").parents("li").show();
                        $("#HasTrimmings").parents("li").show();
                        $("#HasHomeAccessories").parents("li").show();
                        $("#HasRugs").parents("li").show();

                        if (siteKey == "Zoffany") {
                            $("#HasPaint").parents("li").show();
                            $("#HasFurniture").parents("li").show();
                        } else if (siteKey == "Sanderson") {
                            $("#HasPaint").parents("li").show();
                        }

                        break;
                    case "2":
                        $("#Postcode").attr("placeholder", "Enter Postcode, Town or City");

                        $("#HasWallpaper").parents("li").show();
                        $("#HasFabric").parents("li").show();
                        $("#HasTrimmings").parents("li").show();
                        $("#HasRugs").parents("li").show();

                        if (siteKey == "Zoffany") {
                            $("#HasPaint").parents("li").show();
                            $("#HasFurniture").parents("li").show();
                        } else if (siteKey == "Sanderson") {
                            $("#HasPaint").parents("li").show();
                        }

                        break;
                    case "3":
                        $("#Postcode").attr("placeholder", "Enter Zip code or State");

                        $("#HasWallpaper").parents("li").show();
                        $("#HasFabric").parents("li").show();
                        $("#HasTrimmings").parents("li").show();
                        break;
                    case "4":
                        $("#Postcode").attr("placeholder", "Enter Postcode, Town or City");

                        $("#HasWallpaper").parents("li").show();
                        $("#HasFabric").parents("li").show();
                        $("#HasTrimmings").parents("li").show();
                        break;
                    }
                });

                //INITIATE SCROLLER WIDTHS
                $(".scroller").each(function() {
                    var resultSize = 0;
                    $(this).find(".results > li").each(function() {
                        resultSize = resultSize + parseInt($(this).outerWidth());
                    });
                    $(this).find(".results").width(resultSize + 12);
                    //highest now contains the div with the highest so lets highlight it

                });


                // RECENTLY VIEWED MENU *********************************************************
                var RecentScroller;
                $(".toggleRecent").bind("click touch", function() {
                    resetMenu();
                    if (!$("#recentlyViewed").is(":visible")) {
                        $("#recentlyViewed").slideDown();
                    }
                    if (Redant.util.browser.isMobile() || Redant.util.browser.isTablet()) {
                        $("#recentlyViewed .scroller").css("overflow-y", "hidden");
                        $("#recentlyViewed .scroller").css("overflow-x", "scroll");
                    } else {
                        if (!$("#recentlyViewed .scroller").hasClass("iScollInit")) {
                            RecentScroller = new IScroll("#recentlyViewed .scroller", { eventPassthrough: false, scrollX: true, scrollY: false, wheelHorizontal: true, preventDefaultException: { className: /(^|\s)addToBasket(\s|$)/ } });
                        }
                    }
                    $("#recentlyViewed .scroller").addClass("iScollInit");
                    return false;
                });


                // DEEP LINKS MENU *********************************************************
                var DeepLinksScroller;
                var RecentScroller;
                $(".toggleInspire").click(function() {
                    resetMenu();
                    if (!$("#deepLinks").is(":visible")) {
                        $("#deepLinks").slideDown();
                    }
                    if (Redant.util.browser.isMobile() || Redant.util.browser.isTablet()) {
                        $("#deepLinks .scroller").css("overflow-y", "hidden");
                        $("#deepLinks .scroller").css("overflow-x", "scroll");
                    } else {
                        if (!$("#deepLinks .scroller").hasClass("iScollInit")) {
                            RecentScroller = new IScroll("#deepLinks .scroller", { eventPassthrough: true, scrollX: true, scrollY: false, wheelHorizontal: true });
                        }
                    }
                    $("#deepLinks .scroller").addClass("iScollInit");
                    return false;
                });


                // FEATURED *********************************************************
                var FeaturedScroller;
                $(".toggleFeatured").bind("click touch", function() {
                    resetMenu();
                    if (!$("#featured").is(":visible")) {
                        $("#featured").slideDown();
                    }
                    if (Redant.util.browser.isMobile() || Redant.util.browser.isTablet()) {
                        $("#featured .scroller").css("overflow-y", "hidden");
                        $("#featured .scroller").css("overflow-x", "scroll");
                    } else {
                        if (!$("#featured .scroller").hasClass("iScollInit")) {
                            FeaturedScroller = new IScroll("#featured .scroller", { eventPassthrough: false, scrollX: true, scrollY: false, wheelHorizontal: true });
                        }
                    }
                    $("#featured .scroller").addClass("iScollInit");
                    return false;
                });

                // WHERE TO BY *********************************************************
                var StudioScroller;
                $(".toggleScrapbook").bind("click touch", function() {
                    resetMenu();
                    if (!$("#studio").is(":visible")) {
                        $("#studio").slideDown();
                    }

                    if (Redant.util.browser.isMobile() || Redant.util.browser.isTablet()) {
                        $("#studio .scroller").css("overflow-y", "hidden");
                        $("#studio .scroller").css("overflow-x", "scroll");
                    } else {
                        if (!$("#studio .scroller").hasClass("iScollInit")) {
                            StudioScroller = new IScroll("#studio .scroller", { eventPassthrough: false, scrollX: true, scrollY: false, wheelHorizontal: true });
                        }
                    }
                    $("#studio .scroller").addClass("iScollInit");
                    return false;
                });


                //Explore Footer
                var ExploreScroller;
                $(".toggleExplore").click(function() {

                    resetMenu();

                    if ($(this).find("span").hasClass("openExplore")) {
                        $(this).find("span").removeClass("openExplore");
                        $(this).removeClass("selected");
                    } else {
                        $(this).find("span").addClass("openExplore");
                    }


                    if (!$("#explore").is(":visible")) {
                        $("#explore").slideDown();
                    }

                    if (Redant.util.browser.isMobile() || Redant.util.browser.isTablet()) {
                        $("#explore .scroller").css("overflow-y", "hidden");
                        $("#explore .scroller").css("overflow-x", "scroll");
                    } else {
                        if (!$("#explore .scroller").hasClass("iScollInit")) {
                            ExploreScroller = new IScroll("#explore .scroller", { eventPassthrough: false, scrollX: true, scrollY: false, wheelHorizontal: true });
                        }
                    }
                    $("#explore .scroller").addClass("iScollInit");
                    return false;
                });

                $("body").on("click", function(e) {
                    clearAllMenus();
                });
                $("body").on("click", ".bottomMenu,.searchPanel", function(e) {
                    e.stopPropagation();
                });

            });
        }
    };

    return exports;

}(window, document, jQuery, Redant, undefined);

function resetMenu() {
    $(".searchPanel").fadeOut(function() {
        $(".searchSite").animate({ bottom: "10px" }, 100, function() {});
    });
    $(".bottomMenu").slideUp();
    $("#footer").animate({ bottom: "0px", avoidCSSTransitions: true }, 500, function() {});
    $("#corporateInfo").animate({ bottom: "-60px", avoidCSSTransitions: true }, 500, function() {});
    $(".corporateToggle").find(".icon-caret-down").removeClass("icon-caret-down").addClass("icon-caret-up");
    $("#collections, #container").show();
    if (Wg.Stockists)
        Wg.Stockists.hideStockists();
};