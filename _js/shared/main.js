function WalkerGreenbank(win, doc, $, Redant, undefined) {
    var tagbuilders;
    var wordcounters;
    var spinners;
    var sliders;
    var rangesliders;
    var backtotoplock = false;
    var isTurning = false;

    Redant.util.loadScript("/_js/shared/faq.js");

    if (Redant.util.browser.isIOS()) {
        $(document).ready(function() {
            $("input[type=checkbox]").on("change", function(e) {
                $("label[for='" + $(this).attr("id") + "']").removeClass("selected");
                if ($(this).prop("checked") == true)
                    $("label[for='" + $(this).attr("id") + "']").addClass("selected");
            });
            $("html").addClass("mac-ios");
        });
    } else if (navigator.userAgent.toLowerCase().indexOf("webkit") != -1 && navigator.vendor.toLowerCase().indexOf("apple") >= 0) {
        $("input[type=checkbox]").on("change", function(e) {
            $("label[for='" + $(this).attr("id") + "']").removeClass("selected");
            if ($(this).prop("checked") == true)
                $("label[for='" + $(this).attr("id") + "']").addClass("selected");
        });
    }
    if (!Redant.util.browser.isMobile()) {
        if (window.addEventListener)
            window.addEventListener("orientationchange", function doOnOrientationChange() {
                var toHide = $("#siteLinks ul, #nav ul, .footerToggles.long");
                if (orientation === 0 || orientation === 180) {
                    $(".productList").show();
                    var height = $(".selectedItemContainer").height();
                    $(".selectedItemContainer").css("height", height + 200);
                    if (toHide.is(":visible")) {
                        toHide.hide();
                    }
                } else {
                    $(".selectedItemContainer").css("height", "auto!important");
                    if (!toHide.is(":visible")) {
                        toHide.show();
                    }
                }
                if ($(".canvas_container").length > 0) {
                    requestTimeout(function() {
                        var contHeight = $(".canvas_container").width();
                        $(".canvas_container, .caroufredsel_wrapper").height(contHeight);
                    }, 100);
                }
            });
    }

    $(window).load(function() {
        var collectionImages = $(".productCollections").find(" > .item img");
        collectionImages.css("height", collectionImages.outerWidth() * 0.6714286);

        var inspirationImages = $("#inspirationalImages").find(".inspirationCategories .category img.thumb");
        inspirationImages.css("height", inspirationImages.outerWidth() * 0.6714286);

        setCarousels();

    });

    //
    // Thumb Swap Gallery
    //

    (function thumbSwap() {

        var container = ".js-imageswap",
            main = ".js-imageswap-main",
            thumbImgSrc,
            currentImgSrc;

        $(document).on("click", ".js-imageswap-gallery a", function(e) {
            e.preventDefault();

            thumbImgSrc = $("img", this).attr("src");
            currentImg = $(this).closest($(container)).find($(main));
            currentImgSrc = currentImg.attr("src");

            $("img", this).attr("src", currentImgSrc);
            currentImg.attr("src", thumbImgSrc);

        });

    })();

    function fixedOnScroll(el) {
        var el = $(el);
        el.each(function() {

            var $this = $(this),
                win = $(window),
                offset = $this.offset().top;
            naturalHeight = $this.outerHeight(true),
                headerHeight = $("#header").outerHeight();


            function init() {
                $this.wrap('<div class="fixed-element-wrap" />').parent().css("height", naturalHeight);
            };

            function reLayout() {
                naturalHeight = $this.outerHeight(true);
                $this.parent().css("height", naturalHeight);
            };

            init();

            win.on("resize", function() {
                reLayout();
            });

            win.scroll(function() {
                if (win.scrollTop() > offset) {
                    $this.addClass("fixed");
                } else {
                    $this.removeClass("fixed");
                    reLayout();
                }
            });

        });
    };

    $(document).ready(function() {

        //$(".ui-draggable").hover(function (e) {
        //    $(this).children(".quickViewLink").children(".quickViewProduct").fadeToggle();
        //});

        fixedOnScroll(".fixed-on-scroll");

        $(".more-care-info").click(function() {
            $(".care-info").toggle();
            var label = $(this);
            if ($(".care-info").is(":visible")) {
                label.html('<span class="icon icon-angle-up"></span>Hide Key');
            } else {
                label.html('<span class="icon icon-angle-down"></span>Show Key');
            }

            return false;
        });
        $(".toggle-categories").click(function() {
            $("#category-tabs").toggle();
            $(".toggle-categories-space").toggle();
        });

        if (Redant.util.browser.isMobile() || Redant.util.browser.isTablet()) {
            $(".imageCarousel .items").trigger("stop", true);
        } else {
            // desktop
            $(".scroll-pane").remove();
        }

        if (Redant.util.browser.isIOS()) {
            iOSFixedForm();
            if (Redant.util.browser.isIpad) {
                $("#nav .toggle").addClass("ipad_hover");
            } else {
                $(".searchSite").mouseover(function() {
                    if (!$(".searchPanel").is(":visible")) {
                        $(this).find(".tooltip, .arrow").fadeIn();
                    }
                }).mouseout(function() {
                    $(this).find(".tooltip, .arrow").fadeOut();
                });
            }
        }

        jQuery.fn.extend({
            toggleText: function(a, b) {
                var isClicked = false;
                var that = this;
                this.click(function() {
                    if (isClicked) {
                        that.text(a);
                        isClicked = false;
                    } else {
                        that.text(b);
                        isClicked = true;
                    }
                });
                return this;
            }
        });
        $(document.body).on("click", ".more-info", function(event) {
            event.preventDefault();
            $(".eatra-info").toggle();
            return false;
        });
        $(".more-info").toggleText("More Information", "Less Information");

        jQuery(window).scroll(function() {
            if (!backtotoplock) {
                backtotoplock = true;
                if (jQuery(this).scrollTop() > 500) {
                    jQuery(".back-to-top").css("bottom", "42px");
                } else {
                    jQuery(".back-to-top").css("bottom", "0px");
                }
                if (jQuery(this).scrollTop() > 100) {
                    $(".scrollDownAnt").hide();
                }
                requestTimeout(function() { backtotoplock = false; }, 500);
            }
        });
        $(".back-to-top").click(function() {
            $(document).animate({ scrollTop: 0 }, 600);
            return false;
        });

        if (Redant.util.browser.isMobile() || Redant.util.browser.isTablet()) {
            $(".tap-to-zoom").show();
        }

        $(document.body).on("click touchstart", ".tap-to-zoom", function(e) {
            var carousel = $(".imageCarousel");
            var carouselItems = carousel.find(".items");
            if ($(this).text() == "Enable Zoom") {
                $(".zoom-helper").fadeIn(500);
                requestTimeout(function() {
                    $(".zoom-helper").fadeOut(500);
                }, 2000);
                $(this).text("Disable Zoom");
                $(".scroll-pane").remove();
                carouselItems.trigger("stop", false);
            } else {
                $(this).text("Enable Zoom");
                carousel.prepend('<div class="scroll-pane" style="display:none;"></div>');
                $(".imageCarousel .scroll-pane").show();
                carouselItems.trigger("play", true);
            }
        });

        $(document.body).on("click", ".carousel-play-pause", function(event) {
            if (isTurning === true) {
                $(this).html('<span class="icon icon-play"></span>');
                pauseCollection();
                isTurning = false;
            } else {
                $(this).html('<span class="icon icon-pause"></span>');
                collectionRotate();
                isTurning = true;
            }
        });

        $(document.body).on("click touchstart", ".imageCarousel .bullets .icon-play", function(e) {
            e.preventDefault();
            var button = $(e.currentTarget);
            if (!button.hasClass("icon-pause")) {
                $(".imageCarousel .items").trigger("play", true);
                button.addClass("icon-pause");
            } else {
                $(".imageCarousel .items").trigger("pause", false);
                button.removeClass("icon-pause");
            }
            return false;
        });

        $(".searchPanel, .bottomMenu").mouseenter(function() {
            preventOpen = true;
        }).mouseleave(function() {
            preventOpen = false;
        });

        fieldsInView();

        $(".miniBasket .items, .scrapBookAdd .inner").niceScroll({});

        $("input, textarea").placeholder();

        $(".content-furnitureAccordion .dimensionsSpecifications .item").hover(function() {
                $("#dimensionsSpecificationsImage img").attr("src", $(this).data("large-image"));
            }, function() {
            }
        );

        // INSPIRATION LOAD
        if (document.location.hash.indexOf("by") > 0) {
            var selected = $('.inspirationCategories.productCollections.collectionsPreview a.item[href="' + document.location.hash + '"]');

            displayInspirationCategory(selected);
        }

        //INSPIRATION CLICK
        $(document.body).on("click", ".inspirationCategories.productCollections.collectionsPreview a.item", function(event) {
            document.location.hash = "by" + $(this).find(".itemTitle").text();
            displayInspirationCategory(this);
            return false;
        });

        tagbuilders = new FormElement({ type: "ListItem", elements: $(".tagbuilder") });
        wordcounters = new FormElement({ type: "MaxLength", elements: $(".wordCount") });
        spinners = new FormElement({ type: "Spinner", elements: $(".spinner") });
        sliders = new FormElement({ type: "SliderSingle", elements: $(".slider.single") });
        rangesliders = new FormElement({ type: "SliderRange", elements: $(".slider.range") });

        //Date Pickers
        $(".datepicker input").each(function() {
            $(this).datepicker({
                dateFormat: "dd/mm/yy",
                showOn: "both",
                buttonText: "Choose"
            });
        });

        $(".dateRange").each(function() {
            $(".from input").datepicker({
                dateFormat: "dd/mm/yy",
                showOn: "both",
                buttonText: "Choose",
                onClose: function(selectedDate) {
                    $(".to input").datepicker("option", "minDate", selectedDate);
                }
            });
            $(".to input").datepicker({
                dateFormat: "dd/mm/yy",
                showOn: "both",
                buttonText: "Choose",
                onClose: function(selectedDate) {
                    $(".from input").datepicker("option", "maxDate", selectedDate);
                }
            });
        });

        //Autocomplete fields
        $(".autocomplete input").autocomplete({
            source: "/shops/WgShop/PredictiveSearchFrontend/",
            select: function(event, ui) {
                if (ui.item.url) {
                    event.preventDefault();
                    window.location = ui.item.url;
                }
            }
        });

        $(".footerToggles.long li a").bind("click", function() {
            $(".footerToggles.long li a.highlightedMenu").removeClass("highlightedMenu");
            $(this).addClass("highlightedMenu");
        });

        $(".short li a").bind("click", function() {
            $(".short li a").removeClass("selected");
            $(this).addClass("selected");
            $(".footerToggles.long").hide();
            if ($(window).width() < 769) {
                $(".footerToggles.short").hide();
            }
            return false;
        });

        // tagpicker
        $(".tagpickerSearch").each(function() {
            field = $(this);
            var form = $(this).closest("form")[0];
            var newel = true;
            var rel = field.attr("rel");
            if (rel == "allownew=false") {
                newel = false;
            }
            var options = {
                width: "100%",
                json_url: "/shops/WgShop/PredictiveSearchFrontend/",
                complete_text: "Search for tags or enter your own...",
                bricket: false, //switches off appending [] to the imput name
                onselect: function() {
                    //alert("SELECTED");
                    ajaxSearch();

                    if ($(".postbackSearch").length > 0) {
                        $(form).submit();
                    }
                },
                oncreate: function() {
                },
                onremove: function(i) {

                    $("#" + i._id).prop("selected", false);

                    ajaxSearch();

                    if ($(".postbackSearch").length > 0) {
                        $(form).submit();
                    }
                } /**/
            };
            if (newel) {
                options.newel = true;
            }
            $("select", field).fcbkcomplete(options);
        });


        //nav toggles
        $("#nav .toggle").bind("click", function() {

            $("#nav ul").toggle();
            $("#siteLinks ul").hide();
            $("#footer ul").hide();
            return false;
        });
        $("#siteLinks .toggle").bind("click", function() {
            $("#siteLinks ul").toggle();
            $("#nav ul").hide();
            $("#footer ul").hide();
            return false;
        });
        $("#footer .toggle").bind("click", function() {
            $("#footer ul").toggle();
            $("#nav ul").hide();
            $("#siteLinks ul").hide();
            $(".long").hide();
            return false;
        });

        var filterAccordion = new $.accordion($(".furnitureAccordion"), {
            openFirst: true,
            closeOthers: false,
            accordionType: "adv",
            trigger: ".toggle-furnitureAccordion",
            element: ".content-furnitureAccordion",
            container: ".boxSection"

        });


        $(".content-furnitureAccordion").show();

        //Brochure (Turn.JS)
        if ($("#brochure").length > 0) {

            function brochureHeight() {
                return ($(window).outerHeight() - ($("#header").outerHeight() + $("#footer").outerHeight()));
            };

            document.ontouchmove = function(e) {
                e.preventDefault();
            };

            $("#brochure").turn({
                display: "double",
                acceleration: true,
                gradients: true,
                elevation: 50,
                height: brochureHeight(),
                when: {
                    turned: function(e, page) {
                    }
                }
            });

            $(window).resize(function(e) {
                $("#brochure").turn("size", $(window).width(), brochureHeight());
            });

            $(window).bind("keydown", function(e) {
                if (e.keyCode == 37)
                    $("#brochure").turn("previous");
                else if (e.keyCode == 39)
                    $("#brochure").turn("next");
            });

        };

        //Test Brochure

        if ($("#externalSiteContainer").length > 0) {

            function externalIframe() {
                var header = $("#header").outerHeight();
                var footer = $("#footer").outerHeight();
                $("#externalSiteContainer").css({ "height": $(document).height() - (header + footer) + "px" });
            };

            $(window).resize(function(e) {
                externalIframe();
            });

            externalIframe();

        };

        //B2B Quick Purchase
        $(".quickPurchase .cuttingType input[type='radio']").click(function() {
            $(this).parents(".cuttingType").find("label").removeClass("selected");
            $(this).parent().addClass("selected");
        });

        //Filter toggle for small screen sizes
        $(".toggleFilters").click(function(e) {
            $(".filterAccordion").toggle();
        });

        $(".filterUpdate .button").click(function(e) {
            $("#productFilters").foundation("reveal", "close");
            e.preventDefault();
        });

        //Image Basket Toggle
        $(".imageMiniBasket .items").hide();
        $(".basketMessage a").click(function(e) {
            $(this).parents(".basketMessage").toggleClass("expanded");
            $(this).parents(".basketMessage").siblings(".items").toggle();
            e.preventDefault();
        });


        //Image Basket Toggle
        $(".inspirationHeader .infoContainer").hide();
        $(".inspirationHeader .toggle").click(function(e) {
            $(this).toggleClass("expanded");
            $(this).parents(".inspirationHeader").find(".infoContainer").slideToggle();
            e.preventDefault();
        });

        //Inspiration Image Gallery - Magnific
        $(".inspirationImages").magnificPopup({
            delegate: "a",
            type: "inline",
            tLoading: "Loading image...",
            mainClass: "mfp-img-mobile",
            gallery: {
                enabled: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            callbacks: {
                open: function() {
                    var magnificPopup = $.magnificPopup.instance;
                    magnificPopup.contentContainer.addClass("hotspot-popup-content");
                    var image = magnificPopup.contentContainer.find(".hotspot-image");
                    setPopupImageHeight(image);
                },
                change: function() {
                    var image = this.content.find(".hotspot-image");
                    setPopupImageHeight(image);
                }
            }
        });

        function setPopupImageHeight(image) {
            var win = $(window),
                winH = win.outerHeight();
            image.css({ 'max-height': (winH - 100) });
            win.resize(function() {
                var winH = win.outerHeight();
                image.css({ 'max-height': (winH - 100) });
            });
        }

        $(".inspirationProducts .productList .item a").click(function(event) {
            event.preventDefault();
            $(".imageCarousel .items").trigger("slideTo", $("#zoom" + $(this).data("imageassetid")).parent());
            $(this).parents(".items").children(".item").removeClass("selected");
            $(this).parent().addClass("selected");
            return false;
        });

        //if (Redant.util.browser.isMobile() || Redant.util.browser.isTablet()) {
        //	$('.galleryContainer').find('.imageCarousel .items li img').hide();
        //}

        //setCarousels();

        //Site Message
        $(".siteMessage [data-message-no]").click(function(e) {
            $.cookie("siteMessageRedirect", false, { expires: 30, path: "/" });
            el = $(this).parents(".siteMessage");
            el.animate({ "bottom": "-" + (el.outerHeight() + 30) }, 500, "easeInBack");
            e.preventDefault();
        });


        requestTimeout(function() {
            $(".zoomContainer").hide();
            $(".zoomContainer").first().show();

        }, 10);

    });

    //Reflows page for fixed elements when navigating with "Prev"/"Next"
    function iOSFixedForm() {
        el = $("#container input, #container select, #container textarea");

        el.focus(function() {
            $("#header").css({ "position": "absolute", "top": "0px" });
            $("#footer").css({ "position": "absolute", "bottom": "0px" });
            $("#corporateInfo").css({ "display": "none" });
        });
        el.blur(function() {
            $("#header").css({ "position": "", "top": "" });
            $("#footer, #corporateInfo").css({ "position": "", "bottom": "", "display": "" });
        });
    };

    function fieldsInView() {

        var padding = $("#footer").outerHeight() + 60;

        $("#container").find("input, select, textarea").focus(function() {

            var elementBottom = $(this).offset().top + $(this).height();
            var windowScroll = $(window).scrollTop();
            var windowBottom = windowScroll + $(window).height();

            if (elementBottom + padding > windowBottom) {
                $("html, body").animate({
                    scrollTop: windowScroll + padding
                }, 300);
            }
        });

    };

    function displayInspirationCategory(element) {
        var $element = $(element);

        $(".inspirationCategories .item").removeClass("selected");
        $element.parent().addClass("selected");
        if ($element.parent().hasClass("category")) {
            event.preventDefault();
        }

        if ($element.find(".itemTitle").text() == "Style") {
            $("#byRoom").animate({ height: 0, avoidCSSTransitions: true }, 400, function() {});
            $("#byColour").animate({ height: 0, avoidCSSTransitions: true }, 400, function() {});
            $("#byStyle").animate({ height: $("#byStyle").find("section").outerHeight() }, 400, function() {});
        }
        if ($element.find(".itemTitle").text() == "Room") {
            $("#byStyle").animate({ height: 0, avoidCSSTransitions: true }, 400, function() {});
            $("#byColour").animate({ height: 0, avoidCSSTransitions: true }, 400, function() {});
            $("#byRoom").animate({ height: $("#byRoom").find("section").outerHeight() }, 400, function() {});
        }
        if ($element.find(".itemTitle").text() == "Colour") {
            $("#byStyle").animate({ height: 0, avoidCSSTransitions: true }, 400, function() {});
            $("#byRoom").animate({ height: 0, avoidCSSTransitions: true }, 400, function() {});
            $("#byColour").animate({ height: $("#byColour").find("section").outerHeight() }, 400, function() {});
        }
    }
};

WalkerGreenbank(window, document, jQuery, Redant);

function clearCanvasGrid(canvasID) {

    setTimeout(function() {
        var context = null;
        var canvas = null;
        context = currentCanvas.context;
        if (context == null) {
            canvas = document.getElementById(canvasID);
            context = canvas.getContext("2d");
        }
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context = null;
        canvas = null;
    }, 500);
}

var currentCanvas = null;

function highlight(items) {

    if (items.find(".hotspots").length > 0) {
        $(".info-text span").fadeIn();
    } else {
        $(".info-text span").fadeOut();
    }
    if (!Redant.util.browser.isMobile() && !Redant.util.browser.isTablet()) {
        $(".currentSlide").find(".canvas_container").remove();
        return;
    }
    items.addClass("currentSlide");
    setTimeout(function() {
        if ($(".canvasZoom").length > 0) {
            $(".canvasZoom").css({ 'z-index': "7" });
            //$('.canvasZoom').css({'z-index': '9999','margin-top': '-512px'});
            var el = $(".currentSlide").find(".canvasZoom");
            var img = $(".currentSlide").find(".canvas_container").data("img");
            //$('.currentSlide').find('.canvas_container').css('position', 'relative');
            //el.css({'top':'0px','left':'0px'});
            currentCanvas = new ImgTouchCanvas({
                canvas: el[0],
                path: img
            });
            if (Redant.util.browser.isMobile() || Redant.util.browser.isTablet()) {
                $(".mainZoom").hide();
            }
        }
    }, 100);
}

function unhighlight(items) {
    items.css("opacity", "1");
    if ($(".currentSlide").length == 0) return;
    if (!Redant.util.browser.isMobile() && !Redant.util.browser.isTablet()) return;
    var elId = $(".currentSlide").find(".canvasZoom").attr("id");
    clearCanvasGrid(elId);
    $(".currentSlide").removeClass("currentSlide");
}

function setCarousels() {
    $(".hotspotTarget").each(function() {
        $(this).qtip({
            position: {
                my: "left center",
                at: "right center",
                viewport: true,
                adjust: {
                    method: "flipinvert", //Keep me within viewport
                    x: 5
                }
            },
            style: {
                classes: "hotspotProduct",
                tip: {
                    width: 10,
                    height: 8
                }
            },
            show: {
                event: "mouseenter",
                solo: true,
                delay: 0,
                effect: function() {
                    $(this).fadeTo(200, 1);
                }
            },
            hide: {
                event: "mouseleave",
                delay: 300,
                fixed: true,
                effect: function() {
                    $(this).fadeTo(400, 0, function() {
                        $(this).hide();
                    });
                }
            },
            content: {
                text: $(this).next(".hotspotItem")
            },
            events: {
                visible: function() {
                    $.setDisabledByDefault(true); //Disable jquery animate plugin - breaks tooltip positioning on scroll
                },
                hidden: function() {
                    $.setDisabledByDefault(false); //Finished! So let's re-enable jquery animate plugin
                }
            }
        });
    });
    if ($(".imageCarousel .items li:first-child").find(".hotspots").length > 0) {
        $(".info-text span").fadeIn();
    }
    $(".collectionShots .imageCarousel").find("ul.items").find(" > li > img").css({ 'height': ($(".collectionShots .imageCarousel").width() * 0.67133).toString() + "px", 'width': $(".collectionShots .imageCarousel").width() + "px" });
    $(".inspirationCarousel .imageCarousel").find("ul.items").find(" > li > img").css({ 'height': ($(".inspirationCarousel .imageCarousel").width() * 0.67133).toString() + "px", 'width': $(".inspirationCarousel .imageCarousel").width() + "px" });
    $(".imageCarousel:not(.productDetailsCarousel) .items").carouFredSel({
            responsive: "true",
            width: "715px",
            height: "480px",
            items: 1,
            queue: true,
            scroll: {
                easing: "easeInOutSine",
                onBefore: function(data) {
                    unhighlight(data.items.old);

                    $(this).trigger("currentPosition", function(pos) {
                        var indexSelect = pos++;
                        indexSelect = pos++;
                        if ($(".galleryToggles li a").length > 0) {
                            $(".zoomContainer").hide();
                            $(".zoomContainer:nth-child(" + parseInt(indexSelect) + ")").show();
                        }
                        if ($(".inspirationProducts .productList .item").length > 0) {
                            $(".inspirationProducts .productList .item").removeClass("selected");
                            $(".inspirationProducts .productList .item:nth-child(" + parseInt(indexSelect) + ")").addClass("selected");
                        }
                    });
                    $.setDisabledByDefault(true);
                },
                onAfter: function(data) {
                    highlight(data.items.visible);
                    $.setDisabledByDefault(false);
                }
            },
            auto: true,
            prev: {
                button: ".imageCarousel .prev",
                key: "left"
            },
            next: {
                button: ".imageCarousel .next",
                key: "right"
            },
            items: {
                height: "480px"
            },
            pagination: {
                container: ".imageCarousel .bullets ul",
                anchorBuilder: function(nr, item) {
                    return '<li><a href="#' + nr + '"><span>Slide ' + nr + "</span></a></li>";
                }
            },
            onCreate: function() {
                $(this).parents(".carousel").find(".bullets").show();
                if (!$(this).parents(".carousel").hasClass("furnitureCarousel")) {
                    var contHeight = $(".canvas_container").width();
                    $(".canvas_container, .caroufredsel_wrapper").height(contHeight);
                } else {
                    $(".canvas_container, .caroufredsel_wrapper, .zoomWindow").height((439).toString() + "px");
                }
                if (!Redant.util.browser.isMobile() && !Redant.util.browser.isTablet()) return;
                highlight($(".items li").first());
            }
        }).mouseover(function() {
            $(".imageCarousel .items").trigger("stop", false);
            $(".icon-pause").removeClass("icon-pause");
        }).mouseout(function() {
            $(".imageCarousel .items").trigger("play", true);
            $(".icon-play").removeClass("icon-pause").addClass("icon-pause");
        })
        .click(function(e) {
            e.preventDefault();
            return false;
        });

    $(".imageCarousel.productDetailsCarousel .items").carouFredSel({
            responsive: "true",
            width: "715px",
            height: "480px",
            items: 1,
            queue: true,
            scroll: {
                easing: "easeInOutSine",
                onBefore: function(data) {
                    unhighlight(data.items.old);

                    $(this).trigger("currentPosition", function(pos) {
                        var indexSelect = pos++;
                        indexSelect = pos++;
                        console.log(pos, indexSelect);
                        if ($(".galleryToggles li a").length > 0) {
                            $(".zoomWindow").hide();
                            $(".zoomWindow:eq(" + parseInt(indexSelect) + ")").show();
                        }
                        if ($(".inspirationProducts .productList .item").length > 0) {
                            $(".inspirationProducts .productList .item").removeClass("selected");
                            $(".inspirationProducts .productList .item:nth-child(" + parseInt(indexSelect) + ")").addClass("selected");
                        }
                    });
                    //Image Zoom - elevateZoom
                    /*var zoomWH = $('#zoom').height()-200;
                    var zoomWW = $('#zoom').width()-200;*/
                    $.removeData(data.items.old.children("img"), "elevateZoom"); //remove zoom instance from image

                    $(".zoomContainer").remove();

                    $.setDisabledByDefault(true);
                },
                onAfter: function(data) {
                    highlight(data.items.visible);

                    var zoomWH = 604;
                    var zoomWW = 557;
                    var carouselImages = $(".carousel img");
                    if (carouselImages.length > 0 && (!Redant.util.browser.isTablet() && !Redant.util.browser.isMobile())) {
                        setTimeout(function() {
                            var ratio = carouselImages.height() / carouselImages.width();
                            if (matchMedia("only screen and (max-width: 48em)").matches) {
                                data.items.visible.children("img").elevateZoom({
                                    responsive: true,
                                    gallery: "galleryToggles",
                                    galleryActiveClass: "selected",
                                    zoomType: "inner"
                                });
                            } else {
                                data.items.visible.children("img").elevateZoom({
                                    responsive: true,
                                    gallery: "galleryToggles",
                                    galleryActiveClass: "selected",
                                    borderSize: 0,
                                    lensOpacity: 0.2,
                                    zoomWindowOffetx: 1,
                                    zoomWindowWidth: zoomWW,
                                    zoomWindowHeight: carouselImages.height()
                                });
                            };
                        }, 500);
                    }
                    $.setDisabledByDefault(false);
                }
            },
            auto: false,
            prev: {
                button: ".imageCarousel .prev",
                key: "left"
            },
            next: {
                button: ".imageCarousel .next",
                key: "right"
            },
            items: {
                height: "480px"
            },
            pagination: {
                container: ".imageCarousel .bullets ul",
                anchorBuilder: function(nr, item) {
                    return '<li><a href="#' + nr + '"><span>Slide ' + nr + "</span></a></li>";
                }
            },
            onCreate: function() {
                $(this).parents(".carousel").find(".bullets").show();
                if (!$(this).parents(".carousel").hasClass("furnitureCarousel")) {
                    var contHeight = $(".canvas_container").width();
                    $(".canvas_container, .caroufredsel_wrapper").height(contHeight);
                } else {
                    $(".canvas_container, .caroufredsel_wrapper, .zoomWindow").height((439).toString() + "px");
                }
                if (!Redant.util.browser.isMobile() && !Redant.util.browser.isTablet()) {
                    $(".canvas_container").remove();

                    var zoomWH = 604;
                    var zoomWW = 557;
                    var carouselImages = $(".carousel img");
                    if (carouselImages.length > 0 && (!Redant.util.browser.isTablet() && !Redant.util.browser.isMobile())) {
                        setTimeout(function() {
                            var ratio = carouselImages.height() / carouselImages.width();
                            if (matchMedia("only screen and (max-width: 48em)").matches) {
                                $(".items li").first().children("img").elevateZoom({
                                    responsive: true,
                                    gallery: "galleryToggles",
                                    galleryActiveClass: "selected",
                                    zoomType: "inner"
                                });
                            } else {
                                $(".items li").first().children("img").elevateZoom({
                                    responsive: true,
                                    gallery: "galleryToggles",
                                    galleryActiveClass: "selected",
                                    borderSize: 0,
                                    lensOpacity: 0.2,
                                    zoomWindowOffetx: 1,
                                    zoomWindowWidth: zoomWW,
                                    zoomWindowHeight: carouselImages.height()
                                });
                            };
                        }, 500);
                    }
                    return;
                } else {
                    highlight($(".items li").first());
                }

            }
        }) /*.mouseover(function () {
		$(".imageCarousel .items").trigger('stop', false);
		$('.icon-pause').removeClass('icon-pause');
	}).mouseout(function () {
		$(".imageCarousel .items").trigger('play', true);
		$('.icon-play').removeClass('icon-pause').addClass('icon-pause');
	})*/
        .click(function(e) {
            e.preventDefault();
            return false;
        });

    //Product Carousel
    $(".productCarousel .items").carouFredSel({
        infinite: false,
        circular: false,
        align: "left",
        width: "100%",
        height: "206px",
        queue: true,
        scroll: {
            easing: "easeInOutSine",
            onBefore: function() {
                var carouselContainer = $(this).parents(".carousel");
                carouselContainer.parents(".shopExtraProducts").find(".prev.right.icon-angle-left").removeClass("disabled");
                carouselContainer.parents(".shopExtraProducts").find(".next.right.icon-angle-right").removeClass("disabled");
                var carouLength = carouselContainer.find(".bullets li").length;
                var carouPos = null;
                $(this).trigger("currentPage", function(pos) {
                    carouPos = pos;
                });
                if (carouPos == 0) {
                    carouselContainer.parents(".shopExtraProducts").find(".prev.right.icon-angle-left").addClass("disabled");
                }
                if ((carouPos + 1) == carouLength || carouselContainer.find(".item").length < 3) {
                    carouselContainer.parents(".shopExtraProducts").find(".next.right.icon-angle-right").addClass("disabled");
                }
                $.setDisabledByDefault(true);
            },
            onAfter: function() {
                $.setDisabledByDefault(false);
            }
        },
        auto: false,
        prev: {
            button: function() {
                return $(this).parent().siblings(".prev");
            }
        },
        next: {
            button: function() {
                return $(this).parent().siblings(".next");
            }
        },
        pagination: {
            container: function() {
                return $(this).parent().siblings(".bullets").children("ul");
            },
            anchorBuilder: function(nr, item) {
                return '<li><a href="#' + nr + '"><span>Slide ' + nr + "</span></a></li>";
            }
        },
        swipe: true,
        onCreate: function() {
            $(this).parents(".carousel").find(".bullets").show();
            var carouPos = null;
            var carouselContainer = $(this).parents(".carousel");
            var carouLength = carouselContainer.find(".bullets li").length;
            $(this).trigger("currentPage", function(pos) {
                carouPos = pos;
            });
            if (carouPos == 0) {
                carouselContainer.parents(".shopExtraProducts").find(".prev.right.icon-angle-left").addClass("disabled");
            }
            if ((carouPos + 1) == carouLength || carouselContainer.find(".item").length <= 3) {
                carouselContainer.parents(".shopExtraProducts").find(".next.right.icon-angle-right").addClass("disabled");
            }
        }
    });

    if (Redant.util.browser.isMobile()) {
        $(".imageCarousel .items").trigger("stop", true);
    }

    $(".next.right.icon-angle-right").click(function(e) {
        e.preventDefault();
        $(this).parent().parent().find(".items").trigger("next");
        return false;
    });
    $(".prev.right.icon-angle-left").click(function(e) {
        e.preventDefault();
        $(this).parent().parent().find(".items").trigger("prev");
        return false;
    });
    $(".globalNavItem").not(".active").click(function(e) {
        $(this).children(".leavingSite").fadeIn();
        $(".leavingSite-bg").fadeIn();
    });
    $(".closeLeavingBox, .closeBox").click(function(e) {
        $(".leavingSite").fadeOut();
        $(".leavingSite-bg").fadeOut();
        return false;
    });


    // Not needed for now
    //$(".stock").text(function() {
    //    return $(this).text().replace("null", "");
    //});
}