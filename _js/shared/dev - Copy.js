_.templateSettings.variable = "rc";

window.Wg = window.Wg || {};

Wg.Common = Wg.Common || function() {
    var miniBasketLoaded = false;

    var disableDraggingFor = function(element) {
        // this works for FireFox and WebKit in future according to http://help.dottoro.com/lhqsqbtn.php
        element.draggable = false;
        // this works for older web layout engines
        element.onmousedown = function(event) {
            event.preventDefault();
            return false;
        };

        element.ondragstart = function(event) {
            event.preventDefault();
            return false;
        };
    };

    var enableDraggingFor = function(element) {
        // this works for FireFox and WebKit in future according to http://help.dottoro.com/lhqsqbtn.php
        element.draggable = true;
        // this works for older web layout engines
        element.onmousedown = null;
        element.ondragstart = null;
    };

    var refreshMiniBasket = function(isSuccessful) {
        var notification = $(".notification");
        getB2CMiniBasket({ force: true }).then(function(data) {
            $(".miniBasket").hide();
            notification.remove();
            if (data.Successful) {
                var warnings = "";
                if (data.BasketWarnings != undefined && data.BasketWarnings != null && data.BasketWarnings.length > 0) {

                    warnings = "<p>";
                    $.each(data.BasketWarnings, function(index, item) {
                        warnings += item.Message + "<br><br>";
                    });
                    warnings += "</p>";
                }
                notification = $('<div class="notification"><h2 class="icon-shopping-cart">&#160;Item Added to Basket</h2>' + warnings + "</div>").prependTo("body");
            } else {
                var errors = [];
                $.each(data.BasketErrors, function(index, error) {
                    errors.push(error.Message);
                });
                notification = $('<div class="notification"><h2 class="icon-shopping-cart">&#160;' + errors.join("<br/><br/>") + "</h2></div>").prependTo("body");
            }
            if (isSuccessful) {
                notification.stop(true, true).animate({ right: "0px", avoidCSSTransitions: true }, 500, function() {});
                setTimeout(function() {
                    notification.stop(true, true).animate({ right: "-520px", avoidCSSTransitions: true }, 500, function() {});
                }, 10000);
            }

            jQuery.fx.interval = 20;
            miniBasketLoaded = false;
        });
    };

    var checkoutScroll = function() {
        if (window.location.href.toLowerCase().indexOf("checkout") > 0 && window.location.href.toLowerCase().indexOf("b2bcheckout") == -1) {
            if ($(".alertInfo.error:visible").length > 0) {
                $("html, body").animate({ scrollTop: $(".alertInfo.error").first().position().top - $("#header").outerHeight() }, 1000);
            } else {

                var checkoutSection = Redant.util.getQuerystring("edit");
                if (checkoutSection === null || checkoutSection === "" || checkoutSection === undefined) {
                    if ($(".loginRegister").length > 0) {
                        checkoutSection = "loginRegister";
                    } else {
                        checkoutSection = "aboutYou";
                    }
                }

                $("html, body").animate({ scrollTop: $("#" + checkoutSection).position().top - $("#header").outerHeight() }, 1000);

                if (checkoutSection == "delivery") {
                    var deliveryMethod = $("#delivery fieldset.optionList input[name=DeliveryMethod]:radio:checked");
                    var checkedValue = $(deliveryMethod).val();
                    if (checkedValue == 2) {
                        setTimeout(toggleStockists(), 1000);
                    }
                }
            }
        }
    };

    var collectionScroll = function() {
        if (window.location.href.toLowerCase().indexOf("shop") > 0 && window.location.href.toLowerCase().indexOf("?show") > 0) {
            $("html, body").stop(true, true).animate({ scrollTop: $("#productsViewTab").position().top - $("#header").outerHeight() }, 1000);
        }
    };

    var displayAddToScrapbookNotification = function() {
        var notification = $("body .notification");
        notification.remove();

        notification = $('<div class="notification"><h2>Item Added to Scrapbook</h2></div>').prependTo("body");

        notification.animate({ right: "0px", avoidCSSTransitions: true }, 500, function() {});
        setTimeout(function() {
            notification.animate({ right: "-1000px", avoidCSSTransitions: true }, 500, function() {});
        }, 10000);

        jQuery.fx.interval = 20;
    };

    var showMoodboardPopup = function() {
        if ($(document).width() <= 768) {
            $(".scrapBookAdd").css("left", "20%");
        }
        $(".fader").fadeTo("fast", 0.5, function() {
            $(".scrapBookAdd").fadeIn("fast", function() {
                $(".scrapBookAdd").css("overflow", "visible");
            });
        });
        return false;
    };

    var showMoodboardPaintPopup = function(target) {
        $(".scrapBookAdd").css("margin-top", ($(target).offset().top - 120) + "px");
        $(".scrapBookAdd").css("left", $(target).offset().left - 60 + "px");
        $(".fader").fadeTo("fast", 0.5, function() {
            $(".scrapBookAdd").fadeIn(300, function() {
                $(".scrapBookAdd").css("overflow", "visible");
            });
        });
        return false;
    };

    var bindForm = function(dialog) {
        $("form", dialog).submit(function() {
            $.ajax({
                url: this.action,
                type: this.method,
                data: $(this).serialize(),
                success: function(result) {
                    if (result.success) {
                        $("#" + dialog.id + "'").foundation("reveal", "close");
                    } else {
                        $("#" + dialog.id + "'").html(result);
                        bindForm();
                    }
                }
            });
            return false;
        });
    };

    var getB2CMiniBasketAjaxRequest = null;
    var getB2CMiniBasketAjaxResponse = null;
    var getB2CMiniBasket = window.getMiniBasket = function(options) {
        var siteKey = $("#SiteKey").val();

        if (miniBasketLoaded && (!options || !options.force)) {
            return getB2CMiniBasketAjaxResponse;
        }

        if (getB2CMiniBasketAjaxRequest) {
            // Previous request still working, let it continue.
            return getB2CMiniBasketAjaxRequest;
        }

        // for style library
        var applyStyleLibraryData = function (basketData) {
            $(".miniBasket .sideInnerContainer").empty();
            $(".miniBasket .sideInnerContainer").append(basketData);
            $(".darkenOverlay").fadeIn();
            $(".mainViewPort").animate({ left: "-350px" }, 300);
            $(".miniBasket").fadeIn();
            $(".mainViewPort, body, html").addClass("noScroll");
        };

        var applyData = function(basketData) {
            $("li.basket .miniBasket").remove();
            $("li.basket").append(basketData);
            var formElement = new FormElement({ type: "Spinner", elements: $("li.basket .spinner") });
            miniBasketLoaded = true;
            $(".miniBasket .items").niceScroll({});
            $(".more-info").toggleText("More Information", "Less Information");
        };

        var currentRequest = $.ajax({
            url: "/actionuri/ShopPurchase/Basket/MiniBasket/",
            cache: false,
            success: function(data) {
                getB2CMiniBasketAjaxResponse = data;
                if (getB2CMiniBasketAjaxRequest === currentRequest) {
                    getB2CMiniBasketAjaxRequest = null;
                }

                //Check site name
                // for style library
                if (siteKey === 'Wg') {
                    applyStyleLibraryData(data);
                } else {
                    applyData(data);
                }
            }
        });


        getB2CMiniBasketAjaxRequest = currentRequest;

        return currentRequest;
    };

    var productDetailAjax = null;

    var configureExpandProductDetail = function() {
        var siteKey = $("#SiteKey").val();
        var ajaxLoaderCss = "";
        if (siteKey == "Zoffany") {
            ajaxLoaderCss += " dark";
        }

        var ajaxLoaderTemplate = '<div class="loading-container">\
	 <h2>Loading</h2>\
	 <div class="ajaxLoader ' + ajaxLoaderCss + '"></div>\
	</div>';

        var t = new QuickView($(document.body).not(".shopPaint").find(".productCollections:not(.no-quick-view)"), "collection", $("#header").outerHeight() + 20 + "px", function() {
            initializeDraggables();
            initializeShareDialog();
        }, Redant.util.ajaxLoader());

        var v = new QuickView($(document.body).not(".searchTemplate, .productPage, .scrapBook").find(".productList:not(.no-quick-view)"), "product", $("#header").outerHeight() + 20 + "px", function() {
            initializeDraggables();
            initializeShareDialog();
        }, Redant.util.ajaxLoader());

    };

    var handleDrop = function(event, ui) {

        event.stopPropagation();

        var productCode = ui.draggable.data("productcode");
        //var designCode = ui.draggable.data("designcode");
        //var productGroup = ui.draggable.data("productgroup");
        var skuId = ui.draggable.data("skuid");
        //var imageUrl = ui.draggable.data("productimage");
        var imageAssetId = ui.draggable.data("imageassetid");
        var name = ui.draggable.data("productname");
        //var url = ui.draggable.data("url");
        //var isB2B = ui.draggable.data('isb2b');
        //var price = ui.draggable.find('span.price').text();

        var dropTarget = $("#studio ul");
        ////making sure the draggable div doesn't move on its own until we're finished moving it
        ui.draggable.draggable("option", "revert", false);
        ////getting current div old absolute position
        var oldPosition = ui.draggable.offset();
        ////assigning div to new parent
        var details = dropTarget.find("li div.details").not("*[data-productcode], *[data-imageassetid]").first();
        //getting current div new absolute position
        var newPosition = ui.draggable.offset();
        //calculate correct position offset
        var leftOffset = null;
        var topOffset = null;
        if (oldPosition.left > newPosition.left) {
            leftOffset = (oldPosition.left - newPosition.left);
        } else {
            leftOffset = -(newPosition.left - oldPosition.left);
        }
        if (oldPosition.top > newPosition.top) {
            topOffset = (oldPosition.top - newPosition.top);
        } else {
            topOffset = -(newPosition.top - oldPosition.top);
        }
        //instantly offsetting the div to it current position
        ui.draggable.animate({
            left: "+=" + leftOffset,
            top: "+=" + topOffset
        }, 0);

        //allowing the draggable to revert to it's proper position in the new column
        ui.draggable.draggable("option", "revert", true);

        $.post("/scrapbook/scraps/savescrap",
            { productCode: productCode, imageAssetId: imageAssetId, name: name },
            function(data) {
                details.replaceWith(data);
                displayAddToScrapbookNotification();
                $(".scroller img, .scroller .scrapItem a").each(function(index, item) {
                    disableDraggingFor(this);
                });

                $(document).trigger("productdragstop");
            });
        return false;
    };
    var initializeMoodboardButtons = function() {
        $(document.body).on("click touchstart", ".fader,.scrapBookAdd .close-reveal-modal", function(event) {
            event.preventDefault();
            $(".scrapBookAdd").fadeOut("fast", function() {
                $(".fader").fadeOut();
            });
            return false;
        });
        //ADD TO SCARPBOOK POPUP
        $(document.body).on("click", ".addToScrapbookPopup", function(event) {
            return showMoodboardPopup();
        });

        $(document.body).on("click", ".addToScrapbookPopupPaint", function(event) {
            return showMoodboardPaintPopup($(this));
        });

        $(document.body).on("click", ".scrapBookAdd .inner ul li a", function(event) {
            if ($(this).not(".block")) {
                event.preventDefault();
                var that = this;

                saveToScrapbook($("a.scrapbook"), $(this).data("scrapbook-id"), function(data) {

                    $(".scrapBookAdd .inner").fadeOut(200, function() {
                        if (data.success) {
                            $(".scrapBookAdd").append("<p style='display:none;'>Added to your moodboard</p>");
                        } else {
                            $(".scrapBookAdd").append("<p style='display:none;'>Sorry, we have been unable to add this item to your moodboard</p>");
                        }
                        $(".scrapBookAdd p").fadeIn();
                        setTimeout(function() {
                            $(".scrapBookAdd p").fadeOut(200, function() {
                                $(".scrapBookAdd p").remove();
                                $(".scrapBookAdd .inner").fadeIn();
                            });
                        }, 1000);
                    });

                });
                return false;
            }
        });

        $(".addSrapbookButton").click(function(e) {
            e.preventDefault();

            var scrapbookName = $(".scrapBookAdd .inner #Name").val().trim();
            $(".scrapBookAdd .inner .error").remove();
            if (scrapbookName != null && scrapbookName != "") {
                $.post("/scrapbook/moodboards/addscrapbook", { scrapbookName: scrapbookName }, function(data) {
                    if (data.success) {
                        $(".scrapBookAdd .inner #Name").val("");
                        $('<li><a href="#" data-scrapbook-id="' + data.id + '">' + data.name + "</a></li>").prependTo($(".scrapBookAdd .inner ul"));
                    }
                });
            } else {
                $('<div class="alertInfo error">Please enter a name.</div>').prependTo(".scrapBookAdd .inner").fadeIn();
            }
        });

        $(".scrapBookAdd .inner #Name").on("keydown", function() {
            $(".scrapBookAdd .inner .alertInfo").fadeOut().remove();
        });
    };
    var saveToScrapbook = function(element, scrapbookId, callback) {
        var that = element;

        var productCode = $(that).data("productcode");
        var skuId = $(that).data("skuid");
        var imageUrl = $(that).data("productimage");
        var name = $(that).data("productname");
        var imageAssetId = $(that).data("imageassetid");

        var dropTarget = $("#studio ul");
        //assigning div to new parent
        var details = dropTarget.find("li div.details").not("*[data-productcode], *[data-imageassetid]").first();

        $.post("/scrapbook/moodboards/savetoscrapbook", { productCodes: productCode, scrapbookId: scrapbookId, imageAssetId: imageAssetId, name: name }, function(data) {

            if (data.success && data.studioItemId != 0) {
                $.get("/scrapbook/scraps/getstudioitem", { studioItemId: data.studioItemId }, function(newHtml) {
                    details.replaceWith(newHtml);
                });
            }
            if (callback)
                callback(data);

        });
    };

    /*------------------------basket hover----------------------------*/
    var initializeBasketHover = function() {
        if (Redant.util.browser.isMobile() || Redant.util.browser.isTablet()) {
            return;
        }
        var siteKey = $("#SiteKey").val();
        if (window.location.href.indexOf("checkout") < 0) {

                $(".basket").hoverIntent({
                    over: function (e) {

                        if (miniBasketLoaded) {
                            $(".miniBasket").stop().fadeIn("fast");
                            return;
                        }


                        var ajaxLoaderCss = "";
                        if (siteKey === "Zoffany") {
                            ajaxLoaderCss += " dark";
                        }

                        $('<div class="miniBasket b2c"><div class="ajaxLoader' + ajaxLoaderCss + '"></div></div>').appendTo($("li.basket"));
                        getMiniBasket().then(function () {
                            $(".miniBasket").stop().fadeIn("fast");
                            $(".field.spinner").forceNumeric();
                        });
                    },
                    timeout: 500,
                    out: function (e) {

                        //$('li.basket .miniBasket').remove();
                        //$('li.basket').append(data);

                        var miniBasket = $(".miniBasket");

                        miniBasket.stop().fadeOut("fast", function () {
                            if (!miniBasketLoaded) {
                                miniBasket.remove();
                            }
                        });

                        //miniBasketLoaded = false;
                    }
                });
        }
    };
/*-------------------WG basket---------------------*/

var initialiseWgBasket = function() {
    $(".triggerBasket").click(function (e) {
        e.preventDefault();

        getMiniBasket();

        return false;
    });

    $(".darkenOverlay, .hideModal").click(function (e) {
        e.preventDefault();

        $(".mainViewPort").removeClass("active");
        $(".sideModal").fadeOut();
        $(".mainViewPort").animate({ left: "0" }, 300);
        $(".darkenOverlay").fadeOut();
        $(".mainViewPort, body, html").removeClass("noScroll");
        //$(".subLevel").animate({ left: "-350px" }, 300);
        $(".darkenLevel").fadeOut();

        return false;
    });
}

    /*----------------------------------------------------*/
    var getMiniBasketPartial = function() {
        $.ajax({
            url: "/basket/minibasketparital",
            cache: false,
            success: function(data) {
                $(".global-utils-list li.basket").replaceWith(data);
                var siteKey = $("#SiteKey").val();
                if (siteKey !== "Wg") {
                    initializeBasketHover();
                }
                else {
                    initialiseWgBasket();
                }
            }
        });
    };

    /*----------------------------------------------------*/

    var exports = {
        init: function() {

            $(window).load(function() {
                $(document).on("quickview:expanded productdragstop", function() {
                    setTimeout(function() {
                        var height = $(".selectedItemContainer .selectedItem").outerHeight();
                        $(".selectedItemContainer").css("height", height);
                    }, 1000);
                });
                var a1 = $.ajax({
                    url: "/actionuri/customshops/wgshop/recentlyviewedproducts/",
                    cache: false
                });
                var a2 = $.ajax({
                    url: "/actionuri/studio/studio/list/",
                    cache: false
                });
                $.when(a1, a2).done(function(t1, t2) {
                    $("#recentlyViewed").replaceWith(t1[0]);
                    $("#studio").html('<div class="scroller">' + t2[0] + "</div>");
                    $(document).trigger("priceupdate");
                    Wg.Menus.init();

                });
            });

            $(document).ready(function() {

                //$(".item").hover(function () {
                //    $(".quickViewProduct").hide();
                //});

                if ($("#paintSurface").length > 0) {
                    var $finishOptions = $("#paintFinish").children();

                    $("#paintSurface").on("change", function(e) {
                        var $this = $(this);
                        var selectedValue = $this.val();
                        var $paintFinishWrapper = $(".paintFinishWrapper");
                        var $paintFinish = $("#paintFinish");

                        $paintFinish.val("");
                        $paintFinishWrapper.addClass("hide");

                        resetProductOptions();

                        $(".product-option").hide();

                        if (selectedValue != "") {
                            $paintFinish.children().remove();
                            var selectedFinishOptions = selectedValue.split("-");

                            $.each($finishOptions, function() {
                                var val = $(this).attr("value");

                                if (val == "" || $.inArray(val, selectedFinishOptions)) {
                                    $paintFinish.append(this);
                                }
                            });
                            $paintFinish.val("");
                            $paintFinishWrapper.removeClass("hide");
                        }
                        calculateProductOptionTotals();
                    });

                    $("#paintFinish").on("change", function() {
                        $(".product-option").hide();
                        var $this = $(this);
                        var selectedValue = $this.val();

                        resetProductOptions();

                        if (selectedValue != "") {
                            var options = $(".product-option[data-product-option=" + selectedValue + "]");
                            var $productSummary = $(".product-summary");

                            if (options.length > 0) {
                                if (options.length == 1) {
                                    $(options[0]).find(".js-spinner-split").val("1");
                                    $(".products-summary-action .button").removeClass("disabled");
                                }
                                options.show();
                                $productSummary.removeClass("hide");
                            } else {
                                $(".product-option.no-products").show();
                            }
                        }
                        calculateProductOptionTotals();
                    });
                }

                if ($(".product-option").length > 0) {

                    $(".ui-spinner-button").on("click", function() {
                        var $spinnerParent = $(this).parent(),
                            $spinner = $(".ui-spinner-input", $spinnerParent),
                            inputValue = $spinner.val();

                        calculateProductOptionTotals(inputValue);
                        toggleActiveState($spinner[0]);
                    });
                    //$('.js-spinner-split').on('change', function (event, ui) {
                    //    calculateProductOptionTotals();
                    //    toggleActiveState(event.target);
                    //});

                    toggleActiveState = function(target) {
                        var qty = target.value;
                        var $target = $(target);
                        if (qty > 0) {
                            $target.parents(".product-option").addClass("active");
                        } else {
                            $target.parents(".product-option").removeClass("active");
                        }

                        if ($(".product-option.active").length == 0) {
                            $(".products-summary-action .button").addClass("disabled");
                        } else {
                            $(".products-summary-action .button").removeClass("disabled");
                        }
                    };
                    resetProductOptions = function() {
                        $(".js-spinner-split").spinner("value", 0);
                        $(".products-summary-action .button").addClass("disabled");
                        $(".product-option").removeClass("active");
                        $(".product-summary").addClass("hide");
                    };
                    calculateProductOptionTotals = function() {
                        var totalPrice = 0;
                        var totalQty = 0;
                        var options = $('.product-option:visible:not(".product-option-heading")');
                        var baseBasketUrl = "/basket/action/?command=addmultiple&redirectUrl=" + escape(window.location.href);
                        var basketSkus = "";

                        $.each(options, function() {
                            var option = this;
                            var $option = $(this);
                            var productOptionSkuId = $option.data("producti-option-skuid");
                            var optionPrice = parseFloat($option.data("product-option-price") || 0);
                            var qty = parseFloat($(".js-spinner-split", $option).val() || 0);

                            if (qty > 0) {
                                basketSkus = basketSkus + productOptionSkuId + ":" + qty + ",";
                            }

                            totalQty += qty;
                            totalPrice += (qty * optionPrice);
                        });

                        basketSkus = basketSkus.substring(0, basketSkus.length - 1);
                        baseBasketUrl = Redant.util.setQuerystring(baseBasketUrl, "itemsToAdd", basketSkus);

                        var selectedItemText = totalQty + (totalQty == 1 ? " item" : " items") + " selected";
                        $(".product-totals-count").text(selectedItemText);
                        $("#totalProductOptionsCost").text(totalPrice.toFixed(2));
                        $(".products-summary-action .button").attr("href", baseBasketUrl);
                    };
                }

                classToggle.toggleOnEvent("click", ".js-mobile-nav-toggle", "href", "mobile-nav-open", true, true);

                // TODO: uncomment when implemented
                //fixedScroll('.js-fixed-scroll');
                globalBrands.init();

                if ($(".has-mega-dropdown").length) {
                    megaDropdown();
                };

                // fix to mark the mark the checkbox as selected on iOS.
                $("#RememberMe").on("click", function() {
                    var checked = $(this).prop("checked");

                    $(this).siblings('input[type="hidden"]').val(checked);
                });

                $.validator.methods.date = function(value, element) {
                    return true;
                    //Globalize.culture("en-GB");
                    // you can alternatively pass the culture to parseDate instead of
                    // setting the culture above, like so:
                    // parseDate(value, null, "en-AU")
                    //return this.optional(element) || Globalize.parseDate(value) !== null;
                };
                $(".lazy").showImageInViewport();

                $("#timeTravelNotice").animate({ right: "0px", avoidCSSTransitions: true }, 500, function() {});

                $("#timeTravelNoticeClose").click(function() {
                    $("#timeTravelNotice").animate({ right: "-320px", avoidCSSTransitions: true }, 500, function() {});
                });

                $(".field.spinner input").forceNumeric();

                jQuery.fx.interval = 20;

                configureExpandProductDetail();
                var siteKey = $("#SiteKey").val();
                if (siteKey !== "Wg") {
                    initializeBasketHover();
                }
                else {
                    initialiseWgBasket();
                }

                $(document.body).on("click", "#miniBasketUpdate, #miniBasketCheckout", function(e) {
                    var that = this;
                    var form = $(".miniBasket.b2c form");
                    var totalQuantity = 0;
                    $(".items .spinner", form).each(function() {
                        var $input = $("input", $(this));
                        var $hiddenField = $('input[type="hidden"]', $(this));
                        var inputValue = parseInt($input.val());
                        $hiddenField.val(inputValue);
                        totalQuantity += inputValue;
                    });
                    $(".global-util-count").text("(" + totalQuantity + ")");

                    if (form.length > 0) {
                        var url = $(form)[0].action;
                        url += "&command=" + $(that).val();

                        $.post(url, $(form).serialize(), function(json) {
                            if (window.location.href.indexOf("basket") > -1) {
                                location.reload();
                            } else {
                                $("nav#siteLinks li.basket a").html("<span>Basket (" + json.basketQuantity + ")</span>");
                                miniBasketLoaded = false;
                                //window.getMiniBasket(function () {
                                var basketMessage = $("#basketMessage");
                                basketMessage.removeClass("confirmation");
                                basketMessage.removeClass("error");
                                $(".miniBasket").fadeIn("fast", function() {
                                    if (json.success == true) {
                                        basketMessage.addClass("confirmation");
                                        basketMessage.text("Your basket has been updated");
                                        if ($(that).val() == "GoToCheckout") {
                                            window.location.replace(json.url);
                                            return;
                                        }
                                    } else {
                                        basketMessage.addClass("error");
                                        var errors = [];
                                        $.each(json.errors, function(index, error) {
                                            errors.push(error.Message);
                                        });
                                        basketMessage.html(errors.join("<br/><br/>"));
                                    }
                                    basketMessage.fadeIn("slow", function() {
                                        setTimeout(function() {
                                            basketMessage.fadeOut("slow");
                                        }, 5000);
                                    });
                                });
                                //});
                            }
                        });
                    }
                    return false;
                });

                $(".furnitureItemImages").magnificPopup({
                    delegate: "a",
                    type: "image",
                    tLoading: "Loading image #%curr%...",
                    mainClass: "mfp-img-mobile",
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        titleSrc: function(item) {
                            return item.el.attr("title");
                        }
                    }
                });

                $(".collectionCategory > .item a.furnitureType").click(function(e) {
                    e.preventDefault();

                    $(".collectionCategory > .item a.furnitureType").parent().removeClass("selected");

                    $(this).parent().addClass("selected");
                    var type = $(this).data("furniture-type");

                    $.get("/furniture/furniture/collections/?type=" + type, function(data) {
                        $("#collectionListWrapper").html(data);
                        $("#collectionListWrapper .greyOut a").attr("href", "javascript:void(0)");
                    });


                    return false;
                });

                $("#footer, .bottomMenu#studio").droppable({
                    accept: "*[data-productcode], *[data-imageassetid], *[data-imageurl]",
                    hoverClass: "add-to-scrapbook-hover",
                    drop: handleDrop,
                    tolerance: "touch",
                    greedy: true
                });

                initializeDraggables();

                $("a[data-attribute-name]").on("click", function(e) {
                    e.preventDefault();
                    var clickedPattern = $(this);
                    var attributeOptionName = clickedPattern.attr("data-attribute-name");
                    var attributeId = clickedPattern.attr("data-attribute-id");
                    var attributeOptionId = clickedPattern.attr("data-attribute-option-id");

                    $("#" + attributeOptionName + "_" + attributeOptionId).val(attributeId + "-" + attributeOptionId);

                    return false;
                });

                $("a[data-colour-code]").on("click", function(e) {
                    e.preventDefault();
                    var clickedColour = this;

                    var selectedColours = [];
                    $("a[data-colour-code]").each(function(i, obj) {
                        var colour = $(obj);
                        if (colour.hasClass("selected"))
                            selectedColours.push(colour.attr("data-colour-code"));
                    });

                    $("#SelectedColours").val(selectedColours.join(","));

                    return false;
                });

                $(document.body).on("click", ".addToBasket", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if ($(this).hasClass("disabled")) {
                        return false;
                    }
                    var loader = Redant.util.ajaxLoader();
                    $("body").append(loader);
                    loader.css({ 'z-index': "9999", 'bottom': "40px" });
                    loader.show();
                    var scrollParent = $(this).parents(".scroller");
                    if (scrollParent.length > 0) {
                        scrollParent.click();
                    }
                    $.ajax({
                        url: $(this).attr("href").replace(/quantity=[0-9]*/, "quantity=" + $(".ui-spinner-input", ".product-option").val()),
                        method: "GET",
                        cache: false,
                        success: function(data) {
                            if (window.location.href.indexOf("basket") > -1 || window.location.href.indexOf("checkout") > -1) {
                                location.reload();
                            } else {
                                var notification = $("body .notification");
                                notification.remove();
                                loader.fadeOut();
                                loader.remove();
                                if (data.Status === "Successful") {
                                    var warnings = "";
                                    if (data.BasketWarnings.length > 0) {

                                        warnings = "<p>";
                                        $.each(data.BasketWarnings, function(index, item) {
                                            warnings += item.Message + "<br><br>";
                                        });
                                        warnings += "</p>";
                                    }
                                    notification = $('<div class="notification"><h2 class="icon-shopping-cart">&#160;Item(s) Added to Basket</h2>' + warnings + "</div>").prependTo("body");

                                    getMiniBasketPartial();
                                } else {
                                    var errors = [];
                                    $.each(data.BasketErrors, function(index, error) {
                                        errors.push(error.Message);
                                    });
                                    notification = $('<div class="notification"><h2 class="icon-shopping-cart">&#160;' + errors.join("<br/><br/>") + "</h2></div>").prependTo("body");
                                }
                                notification.animate({ right: "0px", avoidCSSTransitions: true }, 500, function() {});
                                setTimeout(function() {
                                    notification.animate({ right: "-1000px", avoidCSSTransitions: true }, 500, function() {});
                                }, 10000);

                                jQuery.fx.interval = 20;
                            }
                        }
                    });
                    return false;
                });

                $(document.body).on("click", ".miniBasket.b2c a.remove", function(e) {
                    e.preventDefault();


                    var $this = $(this);

                    var lineItem = $this.parent();

                    var productName = lineItem.children("legend").text();

                    if (lineItem.hasClass("delete-inprogress")) {
                        return;
                    }

                    var selectedQuantity = lineItem.find("input.ui-spinner-input").val() * 1;

                    var totalQuantity = $(".global-util-count").text();
                    totalQuantity = totalQuantity.substring(1, totalQuantity.length - 1) * 1;

                    totalQuantity = totalQuantity - selectedQuantity;

                    if (totalQuantity < 0) {
                        totalQuantity = 0;
                    }

                    $(".global-util-count").text("(" + totalQuantity + ")");

                    lineItem.addClass("delete-inprogress");

                    $.get(this.href, function(removedItemData) {
                        if (window.location.href.indexOf("basket") > -1 || window.location.href.indexOf("checkout") > -1) {
                            location.reload();
                        } else {
                            miniBasketLoaded = false;
                            getB2CMiniBasket().then(function() {
                                $(".miniBasket").fadeIn("fast", function() {
                                    if (removedItemData.Status == "Successful") {
                                        $("#basketMessage").addClass("confirmation");
                                        $("#basketMessage").text(productName + " has been removed from the basket.");
                                    }
                                });
                            });
                        }
                    });
                });

                $(document.body).on("click", ".deleteScrap", function(e) {
                    e.preventDefault();
                    var element = $(this);
                    var scrap = element.parent();

                    $.post(element.attr("href"), function(data) {
                        if (data.Success) {
                            scrap.closest(".scrapItem").fadeOut(300);
                        }
                    });

                    return false;
                });

                $("a[data-tab-content-id]").on("click", function(e) {
                    e.preventDefault();

                    var previousTab = $("a[data-tab-content-id].selected");
                    var previoudTabContentId = previousTab.data("tab-content-id");
                    var previousTabContent = $("#" + previoudTabContentId);
                    previousTab.removeClass("selected");
                    previousTabContent.removeClass("active");

                    var selectedTab = $(this);
                    var selectedTabContentId = selectedTab.data("tab-content-id");
                    var selectedTabContent = $("#" + selectedTabContentId);

                    selectedTab.addClass("selected");
                    selectedTabContent.addClass("active");

                    return false;
                });

                $("#postNewComment").submit(function(e) {
                    e.preventDefault();
                    var that = this;
                    $("#postCommentError, #postCommentSuccess").hide();
                    $("#recaptchaError").remove();

                    $.post(this.action, $(this).serialize(), function(data) {
                        if (data.success === true) {
                            $(that).find("input[type=text], textarea").val("");
                            $("#postCommentSuccess").fadeIn(1000);
                            setTimeout(function() {
                                $("#postCommentSuccess").fadeOut(400);
                            }, 6000);
                        } else {

                            if (data.modelState[""] && data.modelState[""][0] === "incorrect-captcha-sol")
                                $("#recaptcha_area").before('<div id="recaptchaError" class="alertInfo error"> Please ensure you enter the characters exactly as they appear in the box below</div>');
                            $("#postCommentError").fadeIn(1000);
                            Recaptcha.reload();
                        }
                    });

                    return false;
                });

                $(document.body).on("click", "#comments .pagination .pageNumbers li a", function(e) {
                    e.preventDefault();
                    var that = this;

                    $.get(this.href, function(data) {
                        $(that).find("input[type=text], textarea").val("");

                        $("#articleComments").replaceWith(data);
                    });

                    return false;
                });

                $("#enquiryForm form").submit(function(e) {
                    $.validator.unobtrusive.parse($(this));

                    e.preventDefault();
                    if ($(this).valid()) {
                        var formData = $(this).serialize();

                        $(this).parent().slideUp("fast", function() {
                            $("html, body").animate({ scrollTop: $(".ajaxLoader").position().top - $("#header").outerHeight() }, 1000);
                            $(".ajaxLoader").parent().slideDown("fast");
                        });

                        var that = this;

                        $.post(this.action, $(this).serialize(), function(data) {
                            $(that).find("input[type=text], textarea").val("");
                            $(that).find("select").find("option:first-child").prop("selectedIndex", 0);
                            $("#enquiryFormThankYou").foundation("reveal", "open");
                            setTimeout(function() {
                                $(".ajaxLoader").parent().hide();
                                $(that).parent().show();
                            }, 1000);
                        }).error(function() {
                            setTimeout(function() {
                                $(".ajaxLoader").parent().hide();
                                $(that).parent().show();
                            }, 1000);
                        });

                        return false;
                    }
                });

                $(document.body).on("submit", "#sendToAFriend", function(e) {
                    $.validator.unobtrusive.parse($("#sendToAFriend"));

                    e.preventDefault();

                    if ($(this).valid()) {
                        var formData = $(this).serialize();

                        $(this).parent().slideUp("fast", function() {
                            $(".ajaxLoader").parent().slideDown("fast");
                        });

                        $("#sendToAFriend *").attr("disabled", "disabled");
                        $("#sendToAFriend").css("opacity", "0.2");

                        var that = this;
                        $.post(this.action, formData, function(data) {
                            $("body #sendToAFriendSubmitted").remove();

                            var secondModal = $('<section id="sendToAFriendSubmitted" class="reveal-modal medium">\
								 <div class="bd-reveal-modal">\
									<h2>Thank you</h2>\
									<p>Your email has been sent.</p>\
									<a class="close-reveal-modal icon-remove"><span>Close</span></a>\
								</div>\
							</section>').prependTo("body");
                        }).done(function() {
                            $("#sendToAFriend").css("opacity", "");
                            $("#sendToAFriend *").removeAttr("disabled");
                            $(that).find("input[type=text], textarea").val("");
                            $("#sendToAFriendSubmitted").foundation("reveal", "open");
                            setTimeout(function() {
                                $(".ajaxLoader").parent().hide();
                                $(that).parent().show();
                            }, 1000);
                        }).error(function() {
                            $("#sendToAFriend").css("opacity", "");
                            $("#sendToAFriend *").removeAttr("disabled");

                            setTimeout(function() {
                                $(".ajaxLoader").parent().hide();
                                $(that).parent().show();
                            }, 1000);
                        });

                        return false;
                    }
                });

                $(document.body).on("click", "#asSeenInSamples .productList .item, #inspirationSamples .productList .item", function(event) {
                    event.preventDefault();
                    if ($(this).hasClass("selected")) {
                        $(this).removeClass("selected");
                    } else {
                        $(this).addClass("selected");
                        $("#noItemsSelected").hide();
                    }
                    return false;
                });

                $(document.body).on("click", "#asSeenInSamples #selectAllProducts", function(event) {

                    $("#asSeenInSamples .productList .item").each(function(event) {
                        if ($(this).hasClass("selected")) {
                            $(this).removeClass("selected");
                        } else {
                            $(this).addClass("selected");
                            $("#basketErrors").hide();
                        }
                    });
                });

                $("#asSeenInSamples .productList .item.selected").each(function(event) {
                    skus.push($(this).data("skuid"));
                });

                $(document.body).on("click", "#asSeenInSamples .AddToBasket", function(event) {
                    var skus = [];

                    if ($("#asSeenInSamples .productList .item.selected").length == 0) {
                        $("#basketErrors").text("Please select 1 or more products to add to the basket.");
                        $("#basketErrors").show();
                    }

                    $("#asSeenInSamples .productList .item.selected").each(function(event) {
                        skus.push($(this).data("skuid"));
                    });

                    if (skus.length > 0) {
                        var url = "/basket/action/?command=add&skuid=" + skus.join(",");
                        $.get(url, function(data) {
                            $("body .notification").remove();
                            if (data.Status === "Successful") {

                                var warnings = "";
                                if (data.BasketWarnings.length > 0) {

                                    warnings = "<p>";
                                    $.each(data.BasketWarnings, function(index, item) {
                                        warnings += item.Message + "<br><br>";
                                    });
                                    warnings += "</p>";
                                }
                                $("#asSeenInSamples").foundation("reveal", "close");

                                $('<div class="notification"><h2 class="icon-shopping-cart">&#160;Item(s) Added to Baskets</h2>' + warnings + "</div>").prependTo("body");

                                $.get("/asseenin/asseenin/relatedproducts/", { itemId: $("#AsSeenInItemId").val() }, function(data) {
                                    $("#productsListContainer").html(data);
                                });
                            } else {
                                var errors = [];
                                $.each(data.BasketErrors, function(index, error) {
                                    errors.push(error.Message);
                                });
                                //$('<div class="notification"><h2 class="icon-shopping-cart">&#160;' + errors.join('<br/><br/>') + '</h2></div>').prependTo('body');
                                $("#basketErrors").html(errors.join("<br/><br/>"));
                                $("#basketErrors").show();
                            }
                            $(".notification").animate({ right: "0px", avoidCSSTransitions: true }, 500, function() {});
                            setTimeout(function() {
                                $(".notification").animate({ right: "-1000px", avoidCSSTransitions: true }, 500, function() {});
                            }, 10000);

                            jQuery.fx.interval = 20;
                        });
                    }
                    return false;
                });

                $(document.body).on("click", "a.button.sample", function(event) {
                    event.preventDefault();

                    $("#inspirationSamples").foundation("reveal", "open");
                });

                $(document.body).on("click", "#inspirationSamples #selectAllProducts", function(event) {

                    $("#inspirationSamples .productList .item").each(function(event) {
                        if ($(this).hasClass("selected")) {
                            $(this).removeClass("selected");
                        } else {
                            $(this).addClass("selected");
                            $("#noItemsSelected").hide();
                        }
                    });
                });

                $(document.body).on("click", "#inspirationSamples .AddToBasket", function(event) {
                    var skus = [];
                    $("#basketErrors").hide();

                    if ($("#inspirationSamples .productList .item.selected").length == 0) {
                        $("#basketErrors").text("Please select 1 or more products to add to the basket.");
                        $("#basketErrors").show();
                    }

                    $("#inspirationSamples .productList .item.selected").each(function(event) {
                        skus.push($(this).data("skuid"));
                    });

                    if (skus.length > 0) {
                        var url = "/basket/action/?command=add&skuid=" + skus.join(",");
                        $.get(url, function(data) {
                            $("body .notification").remove();
                            if (data.Status === "Successful") {

                                var warnings = "";
                                if (data.BasketWarnings.length > 0) {

                                    warnings = "<p>";
                                    $.each(data.BasketWarnings, function(index, item) {
                                        warnings += item.Message + "<br><br>";
                                    });
                                    warnings += "</p>";
                                }
                                $('<div class="notification"><h2 class="icon-shopping-cart">&#160;Item(s) Added to Baskets</h2>' + warnings + "</div>").prependTo("body");

                                $("#inspirationSamples").foundation("reveal", "close");

                                $.get("/inspirations/relatedproducts/", { inspirationId: $("#InspirationID").val() }, function(data) {
                                    $("#productsListContainer").html(data);
                                });
                            } else {
                                var errors = [];
                                $.each(data.BasketErrors, function(index, error) {
                                    errors.push(error.Message);
                                });
                                //$('<div class="notification"><h2 class="icon-shopping-cart">&#160;' + errors.join('<br/><br/>') + '</h2></div>').prependTo('body');
                                $("#basketErrors").html(errors.join("<br/><br/>"));
                                $("#basketErrors").show();
                            }
                            $(".notification").animate({ right: "0px", avoidCSSTransitions: true }, 500, function() {});
                            setTimeout(function() {
                                $(".notification").animate({ right: "-1000px", avoidCSSTransitions: true }, 500, function() {});
                            }, 10000);

                            jQuery.fx.interval = 20;
                        });
                    }
                    return false;
                });

                initializeMoodboardButtons();

                $(document.body).on("click", ".print", function(e) {
                    $(".reveal-modal").foundation("reveal", "close");
                    e.preventDefault();
                    window.print();
                });

                $("#delivery fieldset.optionList input[name=DeliveryMethod]:radio").click(function(e) {
                    var checkedValue = $(this).val();

                    if (checkedValue == 1) {
                        $("#delivery fieldset#stockist").fadeOut(300, function() {
                            if ($("#whereToBuy").is(":visible")) {
                                toggleStockists();
                            }
                            $("#delivery fieldset#address").fadeIn(300);

                        });
                    } else if (checkedValue == 2) {
                        $("#delivery fieldset#address").fadeOut(300, function() {
                            $("#delivery fieldset#stockist").fadeIn(300);
                            if ($("#SelectedStockistId").val() == "") {
                                toggleStockists();
                            }
                        });
                    }
                });

                $("#orderHistorySearch").submit(function(e) {
                    var siteKey = $("#SiteKey").val();
                    var ajaxLoaderCss = "";
                    if (siteKey == "Zoffany") {
                        ajaxLoaderCss += " dark";
                    }
                    var loading = $('<div class="loading-container"><h2>Searching, please wait...</h2><div class="ajaxLoader' + ajaxLoaderCss + '"></div></div>').html();

                    $("#orderListWrapper").html(loading);

                    $.get("/account/manage/orderlist", $(this).serialize(), function(data) {
                        $("#orderListWrapper").html(data);
                    });

                    return false;
                });

                checkoutScroll();

                collectionScroll();

                $(".scroller img, .scroller .scrapItem a, .scroller img, .scroller .details a").each(function(index, item) {
                    disableDraggingFor(this);
                });

                $("#PerPage").on("change", function(event) {
                    var url = window.location.href;
                    url = Redant.util.setQuerystring(url, "page", "1");
                    url = Redant.util.setQuerystring(url, "perpage", $(this).val());
                    window.location.replace(url);
                });

                $("#loginRegister form, #aboutYouForm, #deliveryForm, form#checkoutpayment").on("submit", function(e) {
                    var acceptTermsAndConditions = $("#AboutYou_AcceptTermsAndConditions").prop("checked");
                    $("<input />").attr("type", "hidden")
                        .attr("name", "AboutYou_AcceptTermsAndConditions")
                        .attr("value", acceptTermsAndConditions)
                        .appendTo($(this));
                });

                $(document.body)
                    .on("click", ".button.pinterest, a.pinterest", function(e) {
                        if ($("#pinterestImages").length > 0) {
                            $("#pinterestImages img").each(function() {
                                $(this).attr("src", $(this).data("src"));
                                $(this).fadeIn("fast");
                            });

                            $("#pinterestImages").foundation("reveal", "open");
                            return false;
                        }
                    })
                    .on("click", ".button.scrapbook", function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        var $element = $(this),
                            productCode = $element.data("productcode"),
                            skuId = $element.data("skuid"),
                            imageAssetId = $element.data("imageassetid"),
                            name = $element.data("productname"),
                            dropTarget = $("#studio ul"),
                            details = dropTarget.find("li div.details")
                                .not("*[data-productcode], *[data-imageassetid]")
                                .first();

                        $.post("/scrapbook/scraps/savescrap",
                            { productCode: productCode, imageAssetId: imageAssetId, name: name },
                            function(data) {
                                details.replaceWith(data);

                                $(".scroller img, .scroller .scrapItem a").each(function(index, item) {
                                    disableDraggingFor(this);
                                });

                                $(document).trigger("productdragstop");

                                displayAddToScrapbookNotification();
                            });


                        return false;
                    });

                $(document.body).on("click", "#selectCountry .country-list a", function(e) {
                    var $element = $(this);

                    var url = $.ajax({
                        cache: false,
                        url: $element.attr("href"),
                        success: function(data) {
                            if (window.location.href.indexOf("shop") > -1 || window.location.href.indexOf("basket") > -1 || window.location.href.indexOf("checkout") > -1) {
                                $cookie.set("changedCountry", JSON.stringify(data));
                                window.location.href = data.returnUrl;
                            } else {
                                if (data.currencyRegion) {
                                    $("a[data-reveal-id=selectCountry] img").attr("src", data.currencyRegion.FlagImageUrl).attr("alt", data.currencyRegion.Name);

                                    var notification = $("body .notification");
                                    notification.remove();

                                    if (data.currencyRegion.Name != "United Kingdom") {
                                        notification = $('<div class="notification"><h2 class="icon-shopping-cart">&#160;Country changed</h2><p>All deliveries to ' + data.currencyRegion.Name + " will be billed in " + data.currencyRegion.Currency.Name + "</p><p>We currently do not deliver to this region.</p></div>").prependTo("body");
                                    } else {
                                        notification = $('<div class="notification"><h2 class="icon-shopping-cart">&#160;Country changed</h2><p>All deliveries to ' + data.currencyRegion.Name + " will be billed in " + data.currencyRegion.Currency.Name + "</p></div>").prependTo("body");
                                    }

                                    notification.stop(true, true).animate({ right: "0px", avoidCSSTransitions: true }, 500, function() {});
                                    setTimeout(function() {
                                        notification.stop(true, true).animate({ right: "-520px", avoidCSSTransitions: true }, 500, function() {});
                                    }, 10000);

                                    jQuery.fx.interval = 20;

                                }
                            }
                            //if (data.currencyRegion.Name == "United Kingdom") {
                            //    $(".hideMe").hide();
                            //}
                            $("#selectCountry").foundation("reveal", "close");
                        }
                    });

                    return false;
                });
            });

            if ($cookie.get("changedCountry")) {
                var data = JSON.parse($cookie.get("changedCountry"));
                $cookie.remove("changedCountry");
                var notification = $("body .notification");
                notification.remove();
                if (Model.RegionInfo.ThreeLetterISORegionName != "GBR") {
                    notification = $('<div class="notification"><h2 class="icon-shopping-cart">&#160;Country changed</h2><p>All deliveries to ' + data.currencyRegion.Name + " will be billed in " + data.currencyRegion.Currency.Name + "</p></div>").prependTo("body");
                }
                notification.stop(true, true).animate({ right: "0px", avoidCSSTransitions: true }, 500, function() {});
                setTimeout(function() {
                    notification.stop(true, true).animate({ right: "-520px", avoidCSSTransitions: true }, 500, function() {});
                }, 10000);
                jQuery.fx.interval = 20;
            }

        }
    };
    return exports;
}();
Wg.Common.init();

// Keep in a visible namespace
function initializeDraggables() {
    if ($("#draggables").length == 0) {
        $("body").prepend('<div id="draggables"></div>');
    }
    if (Redant.util.browser.isMobile()) return;
    $("*[data-productcode], *[data-imageassetid], *[data-imageurl]").not(".no-drag, .scrapAdd").draggable({
        cursor: "move",
        revert: "invalid",
        helper: function() {
            $copy = $(this).clone();
            return $copy;
        },
        appendTo: "#draggables",
        //delay: 1000,
        scroll: false,
        distance: 30,
        zIndex: 999999,
        start: function(event, ui) {
            ui.helper.css("width", "123px");
            ui.helper.css("height", "123px");
        }
    }).disableSelection();
}

function initializeShareDialog() {
    $("#share").detach().appendTo($("#content"));
}


// Class Toggle
//--------------------

var classToggle = {};

classToggle = {
    toggleOnEvent: function(event, trigger, target, toggleClass, toggleSelf, closeOffElement) {
        if ($(trigger).length > 0) {

            var toggleArguments = {},
                targetEl;

            $(trigger).on(event, function(e) {
                e.preventDefault();

                //Get target
                if (target === "href") {
                    targetEl = $($(this).attr("href"));
                } else {
                    targetEl = $(target);
                }

                //Toggle classes on target and self if required
                targetEl.toggleClass(toggleClass);
                if (toggleSelf) {
                    $(this).toggleClass(toggleClass);
                }

                //Create document event listener to close target when clicking on anything else
                //offTriggerListener() will remove this event handler when triggered
                if (event === "click" && closeOffElement == true) {
                    toggleArguments = {
                        trigger: trigger,
                        targetEl: targetEl,
                        newclass: toggleClass
                    };
                    $(document).on("click", toggleArguments, classToggle.offTriggerListener);
                };

            });

        }
    },
    offTriggerListener: function(event) {
        //Checks the current target isn't the trigger or target (or has a parent of).
        if (!$(event.target).closest(event.data.trigger).length && !$(event.target).closest(event.data.targetEl).length) {
            var toggleClass = event.data.newclass;
            $(event.data.trigger).removeClass(toggleClass);
            $(event.data.targetEl).removeClass(toggleClass);
            $(document).off("click", classToggle.offTriggerListener);
        };
    }
};


// Mega Dropdown
//--------------------
function megaDropdown() {
    var $el = $(".has-mega-dropdown"),
        dropdownDelay = 0;
    $el.each(function() {
        var self = this,
            $self = $(this),
            $body = $("body"),
            $dropdown = $(".mega-dropdown", $self),
            overlay = '<div class="mega-dropdown-overlay"></div>';
        activeClass = "mega-dropdown-active";
        self.toggleOverlay = function(state) {
            var overlayClass = ".mega-dropdown-overlay";
            if (state === "show") {
                $(overlayClass).addClass(activeClass);
            } else if (state === "hide") {
                $(overlayClass).removeClass(activeClass);
            }
        };
        self.addOverlay = function() {
            if ($(".mega-dropdown-overlay").length === 0) {
                $body.append(overlay);
            };
        };
        self.bindUI = function() {
            function clearDelay() {
                if (dropdownDelay != 0) {
                    clearTimeout(dropdownDelay);
                };
            }

            if (!Modernizr.touch) {

                $self.on("mouseenter", function() {
                    var $this = $(this);
                    clearDelay();

                    dropdownDelay = setTimeout(function() {
                        $el.removeClass(activeClass);
                        $this.addClass(activeClass);
                        self.toggleOverlay("show");
                    }, 150);
                });
                $self.on("mouseleave", function() {
                    clearDelay();
                    dropdownDelay = setTimeout(function() {
                        dropdownDelay = 0;
                        $el.removeClass(activeClass);
                        self.toggleOverlay("hide");
                    }, 350);
                });
            } else {
                $("a", $self).first().on("click", function(e) {

                    if (!$(this).parent().hasClass(activeClass)) {
                        e.preventDefault();
                        $el.removeClass(activeClass);
                        $(this).parent().addClass(activeClass);
                        self.toggleOverlay("show");
                        return false;
                    }

                });

                var hideContainer = function(e) {
                    var $container = $(".mega-dropdown-active .mega-dropdown");
                    if (!$container.is(e.target) && $container.has(e.target).length === 0) {
                        $container.parent().removeClass(activeClass);
                        self.toggleOverlay("hide");
                    }
                };

                $("body").on("click", hideContainer);

                $(".mega-dropdown-overlay").on("click", hideContainer);
            }
        };
        self.init = function() {
            self.bindUI();
            self.addOverlay();
        };
        self.init();
    });
};

// Global Brands
//--------------------

//has-dropdown two click behaviour for touch devices.
(function($, Modernizr) {
    $(function() {
        if (Modernizr.touch) {
            $("body").on("click", ".has-dropdown>a", function(e) {
                var $el = $(this).parent();
                if (!$el.hasClass("touch-hover")) {
                    $el.addClass("touch-hover");
                    $(".global-nav-dropdown", $el).show();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                } else {
                    $el.removeClass("touch-hover");
                    $(".global-nav-dropdown", $el).hide();
                    e.stopImmediatePropagation();
                }
            });
            var hideContainer = function(e) {
                var $container = $(".global-nav-dropdown");
                var $button = $(".has-dropdown > a");
                if (!$container.is(e.target) && $container.has(e.target).length === 0
                    || !$button.is(e.target) && $button.has(e.target).length === 0) {
                    $container.parent().removeClass("touch-hover");
                    $container.hide();
                }
            };

            $("body").on("click", hideContainer);
        }
    });
})(jQuery, Modernizr);

var globalBrands = {
    el: {
        container: $(".global-brands"),
        showBrands: $(".js-global-brands-show"),
        hideBrands: $(".js-global-brands-hide"),
        items: $("li", ".global-brands-list"),
        openClass: "brands-open"

    },
    toggleState: function(state) {
        var self = this,
            el = self.el;

        $(el.items).not(".active").stop().animate({
            width: "toggle",
            opacity: "toggle",
            avoidCSSTransitions: true
        }, {
            duration: 500
        });

        if (state === "hide") {
            el.showBrands.show();
            el.hideBrands.hide();
            el.container.removeClass(el.openClass);
        } else if (state === "show") {
            el.showBrands.hide();
            el.hideBrands.show();
            el.container.addClass(el.openClass);
        };

    },
    bindUI: function() {
        var self = this,
            el = self.el;

        el.showBrands.on("click", function(e) {
            e.preventDefault();
            self.toggleState("show");
        });

        el.hideBrands.on("click", function(e) {
            e.preventDefault();
            self.toggleState("hide");
        });

    },
    init: function() {
        this.bindUI();
    }
};

$.ui.autocomplete.prototype._renderItem = function(ul, item) {
    var term = this.term.split(" ").join("|");
    var re = new RegExp("(" + term + ")", "gi");
    var t = item.label.replace(re, "<strong>$1</strong>");
    return $("<li></li>")
        .data("item.autocomplete", item)
        .append("<a>" + t + "</a>")
        .appendTo(ul);
};

jQuery.validator.unobtrusive.adapters.add("brequired", function(options) {
    if (options.element.tagName.toUpperCase() == "INPUT" && options.element.type.toUpperCase() == "CHECKBOX") {
        options.rules["required"] = true;
        if (options.message) {
            options.messages["required"] = options.message;
        }
    }
});

jQuery.validator.addMethod("mustbetrue", function(value, element, param) {
    return element.checked;
});
jQuery.validator.unobtrusive.adapters.addBool("mustbetrue");
