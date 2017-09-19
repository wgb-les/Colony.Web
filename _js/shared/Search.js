var searchScroll; //force global?
var isSearching = false;
var searchPanelMarkup = null;
var filterForm = null;
$(document).ready(function() {
    //SEARCH *********************************************************

  

   if (Redant.util.browser.isMobile() || Redant.util.browser.isTablet()) {
        $(".searchSite .tooltip").remove();
        $(".quick-links").remove();
    }

    $(document).on("keydown", ".searchPanel input[type=text]", function(e) {
        if (e.keyCode == 13 && $(e.currentTarget).data("block") != "true")
            $(this).closest("form").submit();
    });

    requestTimeout(function() {
        var filterAccordion = new $.accordion($(".filterAccordion:not(.faqFilterAccordion)"), {
            accordionType: "adv",
            trigger: ".toggle-filterAccordion",
            element: ".content-filterAccordion",
            container: ".boxSection",
            transitionSpeed: 0,
            transitionEase: "linear",
            closeOthers: false,
            openFirst: true,
            onItemOpen: function(itm) {
            }
        });
    }, 10);

    filterForm = $("form.filterAccordion");
    $(".searchSite").on("click", function (e) {
        //$(this).children('.tooltip').hide();
        var windowHeight = $(window).height();
        var button = $(this);
        button.children("a.search-toggle").toggleClass("active");
        if (button.children("a.search-toggle").hasClass("active")) {
            button.find("a.search-toggle span").text("Close");
        } else {
            button.find("a.search-toggle span").text("Search");
        }


        if (searchPanelMarkup == null) {
            $.ajax({
                url: "/shops/wgshopsearch/searchpanel/",
                type: "GET",
                async: false,
                dataType: "html",
                success: function (data) {
                    searchPanelMarkup = $(data).filter(".searchPanel");
                    button.after(searchPanelMarkup);
                    //Autocomplete fields
                    $("#searchPanelKeywords").autocomplete({
                        source: "/shops/WgShop/PredictiveSearchFrontend/",
                        select: function (event, ui) {
                            if (ui.item.url) {
                                $(".searchPanel input[type=text]").data("block", "true");
                                event.preventDefault();
                                window.location = ui.item.url;
                            }
                        }
                    });

                    var colourPanel = $(".searchPanel .colours");
                    if (windowHeight <= 750) {
                        colourPanel.addClass("col-2");
                    } else {
                        colourPanel.removeClass("col-2");
                    }
                },
                error: function (a, b, c) {
                    console.log([a, b, c]);
                }
            });
        }

        if ($(".searchPanel").is(":visible")) {
            $(".searchPanel").fadeToggle(function () {
                $(".searchSite").stop(true).animate({ bottom: "10px", avoidCSSTransitions: true }, 100, function () { });
            });
        } else {
            $(this).stop(true).animate({
                bottom: "0px",
                avoidCSSTransitions: true
            }, 100, function () {
                $(".searchPanel").fadeIn(function () {
                    $(".searchPanel #searchPanelKeywords").focus();
                });
            });
        }

        return false;
    });

    $("#searchPanelKeywords").on("click", function (e) {
        var button = $(this);
        if (searchPanelMarkup == null) {
            $.ajax({
                url: "/shops/wgshopsearch/searchpanel/",
                type: "GET",
                async: false,
                dataType: "html",
                success: function(data) {
                    searchPanelMarkup = $(data).filter(".topNavItem searchNav");
                    button.after(searchPanelMarkup);
                    //Autocomplete fields
                    $("#searchPanelKeywords").autocomplete({
                        source: "/shops/WgShop/PredictiveSearchFrontend/",
                        select: function(event, ui) {
                            if (ui.item.url) {
                                $(".topNavItem searchNav input[type=text]").data("block", "true");
                                event.preventDefault();
                                window.location = ui.item.url;
                            }
                        }
                    });
                },
                error: function(a, b, c) {
                    console.log([a, b, c]);
                }
            });
        }



        if ($(".searchPanel").is(":visible")) {
            $(".searchPanel").fadeToggle(function() {
                $(".searchSite").stop(true).animate({ bottom: "10px", avoidCSSTransitions: true }, 100, function() {});
            });
        } else {
            $(this).stop(true).animate({
                bottom: "0px",
                avoidCSSTransitions: true
            }, 100, function() {
                $(".searchPanel").fadeIn(function() {
                    $(".searchPanel #searchPanelKeywords").focus();
                });
            });
        }

        return false;
    });

    $(".brands label.all").off("click");
    $(".brands label.all").on("click", function(event) {
        var $el = $(this);
        if ($el.hasClass("selectedAll")) {
            $el.parents("ul").children().children().removeClass("selected");
            $el.parents("ul").children().children().find('input[type="checkbox"]').prop("checked", false);
            $el.removeClass("selectedAll");
        } else {
            $el.parents("ul").children().children().addClass("selected");
            $el.parents("ul").children().children().find('input[type="checkbox"]').prop("checked", true);
            $el.addClass("selectedAll");
        }
        ajaxSearch();
        toggleClear(".filterBrands");
        return false;
    });

    filterForm.on("click", ".colours a, .patterns a, .searchOptions .colours label, .patterns label", function() {
        var el = $(this);
        var id = el.data("id");
        if (el.parent().hasClass("toggleAll")) {
            if (el.hasClass("selectedAll")) {
                el.parent().siblings("ul").children().children().removeClass("selected");
                el.parent().siblings("ul").children().children().find('input[type="checkbox"]').prop("checked", false);
                el.removeClass("selectedAll");
               
            } else {
                el.parent().siblings("ul").children().children().addClass("selected");
                el.parent().siblings("ul").children().children().find('input[type="checkbox"]').prop("checked", true);
                el.addClass("selectedAll");
               
            }
        } else {
            el.toggleClass("selected");
            var checkbox = el.find('input[type="checkbox"]');
            toggleCheckbox(checkbox);
        }
       
        return false;

    });

    $("body").on("click", ".searchPanel .colours label", function(e) {
        e.preventDefault();
        var el = $(this);
        var id;
        var checkBox = el.parent().siblings("ul").children().children().find('input[type="checkbox"]');
        
        if (el.parent().hasClass("toggleAll")) {
            if (el.hasClass("selectedAll")) {
                el.parent().siblings("ul").children().children().removeClass("selected");
                checkBox.prop("checked", false);
                el.removeClass("selectedAll");
                id = el.parent().siblings("ul").children().children().find('input[type="checkbox"]').data('id');
                $('[data-img=' + id + ']').css('display', 'none');
            } else {
                el.parent().siblings("ul").children().children().addClass("selected");
                checkBox.prop("checked", true);
                el.addClass("selectedAll");
                id = el.parent().siblings("ul").children().children().find('input[type="checkbox"]').data('id');
                $('[data-img=' + id + ']').css('display','inline-block');
            }
        } else {
            el.toggleClass("selected");
            var checkbox = el.find('input[type="checkbox"]');
            toggleCheckbox(checkbox);
            id = el.parent().siblings("ul").children().children().find('input[type="checkbox"]').data('id');
        }

        return false;
    });

    var validKeywords = /^([a-zA-Z0-9 \/_'-]+)$/i;

    $(document).on("submit", "form.siteSearch", function(e) {
        $("#searchPanelKeywordsError").hide();
        var isValid = true;
        var keywords = $("#searchPanelKeywords", $(this)).val();

        if (keywords == "" || keywords == null || !validKeywords.test(keywords)) {
            isValid = false;
        }

        if (!isValid) {
            $("#searchPanelKeywordsError").fadeIn(400, function(e) {
                var that = this;
                setTimeout(function() { $(that).fadeOut(400); }, 5000);
            });
            return false;
        }
    });

    $(document).on("submit", "form.colours", function(e) {
        $("#searchPanelColoursError").hide();
        var isValid = true;

        var selectedColours = $("input[name=SelectedColours]:checked");
        if (selectedColours.length == 0) {
            isValid = false;
        }

        if (!isValid) {
            $("#searchPanelColoursError").fadeIn(400, function(e) {
                var that = this;
                setTimeout(function() { $(that).fadeOut(400); }, 5000);
            });
            return false;
        }
    });

    //END SEARCH *********************************************************

    bindSearchCriteria('.brands label:not(".all")', ".filterBrands");
    bindSearchCriteria(".filterEndUse label", ".filterEndUse");
    bindSearchCriteria(".filterType label", ".filterType");
    bindSearchCriteria(".filterProductGroup label", ".filterProductGroup");
    bindSearchCriteria(".filterFlameRetardant label", ".filterFlameRetardant");

    filterForm.on("click", ".filterColours .clearFilter", function() { return clearSelectedCheck(".filterColours"); });
    filterForm.on("click", ".filterBrands .clearFilter", function() { return clearSelectedCheck(".filterBrands"); });
    filterForm.on("click", ".filterEndUse .clearFilter", function() { return clearSelectedCheck(".filterEndUse"); });
    filterForm.on("click", ".filterType .clearFilter", function() { return clearSelectedCheck(".filterType"); });
    filterForm.on("click", ".filterProductGroup .clearFilter", function() { return clearSelectedCheck(".filterProductGroup"); });
    filterForm.on("click", ".filterFlameRetardant .clearFilter", function() { return clearSelectedCheck(".filterFlameRetardant"); });
    //filterForm.on("click", '.filterMartindale .clearFilter', function () { $('#martindale').val(0); toggleClear('.filterMartindale'); return false; });
    filterForm.on("click", ".filterMartindale .clearFilter", function() { return clearSelectedCheck(".filterMartindale"); });

    toggleClear(".filterDimOut");
    bindSearchCriteria(".filterDimOut label", ".filterDimOut");
    $(".filterDimOut .clearFilter").bind("click", function() { return clearSelectedCheck(".filterDimOut"); });

    $(".filterTags .clearFilter").hide();
    $("input[name='keywords']").change(function() {
        if ($(this).val().length > 1) {
            $(".filterTags .clearFilter").show();
        }
        var isValid = true;
        var keywords = $(this).val();
        if (keywords == "" || keywords == null || !validKeywords.test(keywords) || keywords.length > 3) {
            isValid = false;
        }
        if (isValid) {
            ajaxSearch();
        }
    });
    filterForm.on("click", ".filterTags .clearFilter", function() { return toggleClearText("input[name='keywords']"); });

    //filterForm.on('click', '.filterMartindale .clearFilter', function () {
    //    $('input[name="martindale"]').attr('value', 0);
    //    $(".filterMartindale .sliderBar").slider('destroy');
    //    sliders.reinitialize('input[name="martindale"]');
    //    ajaxSearch();
    //    return false;
    //});

    filterForm.on("click", ".filterMartindale .clearFilter", function() {
        self.clearSelectedCheck(".filterMartindale");
        ajaxSearch();
        return false;
    });

    filterForm.on("click", ".filterPriceRange .clearFilter", function() {
        $(".filterPriceRange .sliderBar").slider("destroy");
        sliders.reinitialize('input[name="PriceRange"]');
        ajaxSearch();
        return false;
    });

    //$("#martindale, #priceRange_sliderRange").parents('.field').on("slidechange", function (event, ui) {
    //    $(".filterMartindale .clearFilter").show();
    //    ajaxSearch();
    //});

    $("#martindale").parents(".field").on("click", function(event, ui) {
        $(".filterMartindale .clearFilter").show();
        ajaxSearch();
    });

    $("#searchProducts, #searchPaint").on("click", ".colours label", function() {
        var el = $(this);
        if (el.parent().hasClass("toggleAll")) {
            var toSelect = el.parent().siblings("ul").children().children();
            if (el.hasClass("selectedAll")) {
                toSelect.find('input[type="checkbox"]').prop("checked", false);
                toSelect.removeClass("selected");
                el.removeClass("selectedAll");
            } else {
                toSelect.find('input[type="checkbox"]').prop("checked", true);
                toSelect.addClass("selected");
                el.addClass("selectedAll");
            }

            toggleClear(".filterColours");
            ajaxSearch();
            return false;
        } else {
            var colourCode = el.attr("data-colour-code");
            var colourCheck = $("#SelectedColours_" + colourCode + "");
            toggleCheckbox(colourCheck);
            $(this).toggleClass("selected");
            ajaxSearch();
            toggleClear(".filterColours");
            return false;
        }
    });

    var actionLoader = Redant.util.ajaxLoader();
    if ($("#searchPaint").length > 0)
        var paintInfiniteScroll = new InfiniteScroll($(".productList"), "/shops/paint/", 30, true, "html", actionLoader, function() { return $("#searchPaint").serialize(); });
    if ($("#searchProducts").length > 0)
        var productInfiniteScroll = new InfiniteScroll($(".productList"), "/shops/search/", 30, true, "html", actionLoader, function() { return $("#searchProducts").serialize(); });

       

  
}); //END DOM READY


function bindSearchCriteria(selector, clearButtonSelector) {
    filterForm.on("click", selector, function() {
        var labelFor = $(this).attr("for");
        var check = $("#" + labelFor);
        toggleCheckbox(check);
        $(this).toggleClass("selected");
        ajaxSearch();
        toggleClear(clearButtonSelector);

        return false;
    });
};


function toggleClear(selector) {
    if ($(selector + " input:checked").length > 0) {
        console.log($(selector + " input:checked"));
        $(selector + " .clearFilter").show();
    } else {
        $(selector + " .clearFilter").hide();
    }
};

function toggleClearText(selector) {
    $(selector).val("");
    ajaxSearch();
    return false;
};

function clearSelectedCheck(selector) {
    $(selector + " label.selected").each(function() { $(this).toggleClass("selected"); });
    $(selector + " input:checked").each(function() { $(this).prop("checked", false); });
    $(selector).find(".selectedAll").removeClass("selectedAll");
    toggleClear(selector);
    ajaxSearch();
    return false;
};

function ajaxSearch(page, iScroll) {
    if (page === undefined) {
        page = 1;
    }
    if (isSearching) return;

    var currentSearchForm = $("#searchProducts, #searchPaint");

    var actionLoader = Redant.util.ajaxLoader();
    if (currentSearchForm.length > 0) {
        var currentSearchFormId = currentSearchForm.attr("id");

        $("body").append(actionLoader);
        $(".actionLoader").animate({ bottom: "40px", avoidCSSTransitions: true }, 300);

        var searchUrl = "/shops/paint/?Page=" + page;
        if (currentSearchFormId == "searchProducts") {
            var searchUrl = "/shops/search/?Page=" + page;
        }

        $.ajax({
            type: "POST",
            url: searchUrl,
            data: $(currentSearchForm).serialize(),
            error: function(data) {
                isSearching = false;
                $(".actionLoader").animate({ bottom: "-12px", avoidCSSTransitions: true }, 300);
            },
            success: function(data) {

                $(".productList").siblings(".alertInfo").remove();
                if (data.length > 0) {

                    //if no page has been defined assume it's a new search and reset.
                    if (page == 1) {
                        if ($(data).hasClass("alertInfo")) {
                            $(".productList").empty().before(data);
                        } else {
                            $(".productList").empty().append(data);
                        }
                    } else {
                        if (!$(data).hasClass("alertInfo")) {
                            $(".productList").append(data);
                        }
                    }

                    var keywords = $('#searchProducts [name="keywords"]').val();
                    $(".tabs ul li a").each(function(index, item) {
                        var href = this.href;
                        this.href = Redant.util.setQuerystring(this.href, "keywords", keywords);
                    });

                    initializeDraggables();
                }

                toggleClear(".filterColours");
                toggleClear(".filterMartindale");
                toggleClear(".filterBrands");
                toggleClear(".filterEndUse");
                toggleClear(".filterType");
                toggleClear(".filterProductGroup");
                toggleClear(".filterFlameRetardant");

                isSearching = false;
                $(".actionLoader").animate({ bottom: "-20px", avoidCSSTransitions: true }, 300);

            }
        });
    }
}

function toggleCheckbox(el) {
    $(el).prop("checked", !$(el).prop("checked"));
}