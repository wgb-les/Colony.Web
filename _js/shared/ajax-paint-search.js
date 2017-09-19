
var openItems = [];

var PaintSearch = {
    isNewSearch: false,
    searchResultsTemplate: null,
    searchResultTemplate: null,
    searchFilterTemplate: null,
    slider: null,
    ajaxReference: null,
    tagUpdateReference: null,
    previousScrollX: 0,
    previousScrollY: 0,
    disableScroll: false,
    disable: false,
    page: 1,
    scrollTrigger: 0.7,
    query: "",
    delay: null,
    renderFilters: function(data) {
        var self = this;
        var filters = self.searchFilterTemplate({ model: data });
        if ($(".leftCol").length > 0)
            $(".leftCol").replaceWith(filters);
        else
            $("#container").append(filters);

        //console.log("attaching filter toggle");
        $(".toggleFilters").click(function(e) {
            $(".filterAccordion, #productFilters").toggle();
        });
    },
    renderContents: function(data) {
        var self = this;
        var results = self.searchResultsTemplate({ model: data, itemTemplate: self.searchResultTemplate });
        $("#content").remove();
        $("#container").append(results);
    },
    renderItems: function(data) {
        var self = this;
        var markup = "";
        var tmp = self.searchResultTemplate;
        _.each(data.ProductSearchResults, function(item) {
            markup += tmp(item);
        });
        if (markup !== "")
            $(".searchResults").append(markup);
    },
    render: function(data) {
        var self = this;
        self.renderFilters(data);
        if (self.isNewSearch)
            self.renderContents(data);
        else
            self.renderItems(data);
        self.postRender();
    },
    postRender: function() {
        var self = this;
        var v = new QuickView($(".productList"), "product", $("#header").outerHeight() + 20 + "px", function() {
            if (!Redant.util.browser.isMobile() && !Redant.util.browser.isTablet()) {
                initializeDraggables();
            }
            initializeShareDialog();
        }, Redant.util.ajaxLoader());
        setTimeout(function() {
            var filterAccordion = new $.accordion($(".filterAccordion"), {
                accordionType: "adv",
                trigger: ".toggle-filterAccordion",
                element: ".content-filterAccordion",
                container: ".boxSection",
                transitionSpeed: 0,
                transitionEase: "linear",
                closeOthers: false,
                openFirst: true,
                onItemOpen: function(itm) {
                    //console.log(itm[0].className);
                    openItems.push(itm[0].className);
                    //$.cookie(cookieName, );
                },
                onItemClose: function(itm) {
                    var itmClass = itm[0].className;
                    var index = openItems.indexOf(itmClass);
                    openItems.splice(index, 1);
                },
                onInit: function() {

                    var open = openItems;
                    openItems = [];

                    for (var i = 0, l = open.length; i < l; i++) {
                        var classes = open[i].split(" ").join(".");
                        $("." + classes).find(this.trigger).trigger("click");
                    }

                }
                /*
                ,active : (parseInt($.cookie(cookieName)) || false),
                activate: function (event, ui) {
                    $.cookie(cookieName, parseInt($(this).accordion('option', 'active')));
                    alert('saving');
                }*/
            });
            $(".tagpickerSearch").each(function() {
                field = $(this);
                var form = field.closest("form")[0];
                var newel = true;
                var rel = field.attr("rel");
                if (rel == "allownew=false") {
                    newel = false;
                }
                var options = {
                    width: "100%",
                    json_url: "/shops/WgShop/PredictiveSearchFrontend/",
                    complete_text: "Enter keywords...",
                    bricket: false,
                    onselect: function() {
                        clearTimeout(self.delay);
                        self.delay = setTimeout(function() {
                            self.execute(true);
                        }, 500);


                        if ($(".postbackSearch").length > 0) {
                            $(form).submit();
                        }
                    },
                    onremove: function(i) {
                        $("#" + i._id).prop("selected", false);
                        clearTimeout(self.delay);
                        self.delay = setTimeout(function() {
                            self.execute(true);
                        }, 500);
                        if ($(".postbackSearch").length > 0) {
                            $(form).submit();
                        }
                    }
                };
                options.newel = newel;
                $("select", field).fcbkcomplete(options);
                $("input[type=text]", field).keydown(function(e) { clearTimeout(self.tagUpdateReference); });
                self.slider = new FormElement({ type: "SliderSingle", elements: $(".slider.single") });
            });

            var filterForm = $("form.filterAccordion");

            self.toggleClear(".filterColours");
            if ($("#keywords").val() != null && $("#keywords").val().length > 0)
                $(".filterTags .clearFilter").show();
            else
                $(".filterTags .clearFilter").hide();

            filterForm.on("click", ".colours label, .searchOptions .colours label", function() {
                var el = $(this);
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
                clearTimeout(self.delay);
                self.delay = setTimeout(function() {
                    self.execute(true);
                }, 500);
                return false;
            });
            filterForm.on("change", ".optionList li input[type=checkbox],.optionList li input[type=radio]", function(e) {
                clearTimeout(self.delay);
                self.delay = setTimeout(function() {
                    self.execute(true);
                }, 500);
            });
            filterForm.on("click", ".filterColours .clearFilter", function() {
                self.clearSelectedCheck(".filterColours");
                self.execute(true);
                return false;
            });
            filterForm.on("click", ".filterTags .clearFilter", function() {
                self.toggleClearText("input[name='keywords']");
                self.removeAllOptions("select[name='keywords']"); //If "fcbkcomplete" is attached. The text input is switched to a select. Remove all its childen.
                self.execute(true);
                return false;
            });

            if (!Redant.util.browser.isMobile() && !Redant.util.browser.isTablet()) {
                initializeDraggables();
            }
        }, 10);
    },
    toggleClear: function(selector) {
        var self = this;
        if ($(selector).find("input:checked").length > 0)
            $(selector).find(".clearFilter").show();
        else
            $(selector).find(".clearFilter").hide();
    },
    toggleClearText: function(selector) {
        var self = this;
        $(selector).val("");
    },
    toggleClearSlider: function(selector) {
        var self = this;
        if ($(selector).find("input").val().length > 0)
            $(selector).find(".clearFilter").show();
        else
            $(selector).find(".clearFilter").hide();
    },
    removeAllOptions: function(selector) {
        $(selector).find("option").each(function() {
            $(this).remove();
        });
    },
    clearSelectedCheck: function(selector) {
        var self = this;
        //console.log(selector);
        $(selector).find("label.selected").each(function() { $(this).toggleClass("selected"); });
        $(selector).find("input:checked").each(function() { $(this).prop("checked", false); });
        $(selector).find(".selectedAll").removeClass("selectedAll");
        self.toggleClear(selector);
    },
    execute: function(newSearch) {
        var self = this;

        if (self.ajaxReference) {
            self.ajaxReference.abort();
            $(".actionLoader").remove();
        }

        self.isNewSearch = newSearch;
        if (!self.isNewSearch)
            self.page++;
        else {
            self.disable = false;
            self.page = 1;
            self.getSearchQuery();
        }
        var loader = Redant.util.ajaxLoader();
        $("body").append(loader);
        loader.css({ 'z-index': "9999", 'bottom': "40px" });
        loader.show();
        console.log(self.query);
        self.ajaxReference = $.ajax({
            url: "/shops/wgshopsearch/ajaxpaint/?page=" + self.page + "&perPage=120",
            type: "POST",
            data: self.query,
            responseType: "json",
            success: function(data) {
                self.ajaxReference = null;
                loader.fadeOut();
                loader.remove();
                //window.location.hash = self.query;
                if (data !== null) {
                    if (data.ProductSearchResults === null || data.ProductSearchResults.length == 0)
                        self.disable = true;
                    self.render(data);
                } else
                    self.disable = true;

                $(".scrapBookAdd").prependTo("#content");
            }
        });
    },
    arrayHasValues: function(arr) {
        var hasValue = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== null || arr[i] !== undefined && arr[i] !== "") {
                hasValue = true;
                break;
            }
        }
        return hasValue;
    },
    getSearchQuery: function() {
        var self = this;

        self.query =
            //((window.location.hash != null && window.location.hash != undefined && window.location.hash != '' && self.arrayHasValues($.param(window.location.hash))) ? window.location.hash : null) ||
            (($("#initializeSearch").length > 0) ? $("#initializeSearch") : $("#searchPaint")).serialize() ||
            "";
        $("#initializeSearch").remove();
    },
    loadTemplate: function(file) {
        return $.ajax({
            url: "/_js/template/" + file + ".html",
            type: "GET",
            dataType: "html"
        });
    },
    init: function() {
        var self = this;
        $.when(self.loadTemplate("paint-results"),
                self.loadTemplate("paint-result"),
                self.loadTemplate("paint-filter"))
            .done(function(searchResults, searchResult, searchFilter) {
                self.searchResultsTemplate = _.template(searchResults[0]);
                self.searchResultTemplate = _.template(searchResult[0]);
                self.searchFilterTemplate = _.template(searchFilter[0]);
            });


        $(window).on("scroll", function(e) {
            var scrollDir = self.getScrollDirection(this);
            if (scrollDir.Y === "down" && !self.disableScroll && !self.disable && self.ajaxReference == null) {
                self.disableScroll = true;
                var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
                if ((wintop / (docheight - winheight)) > self.scrollTrigger) {
                    self.execute(false);
                }
                setTimeout(function() { self.disableScroll = false; }, 1000);
            }
        });

        return self;
    },
    getScrollDirection: function(scrollElem) {
        var self = this;
        var currentScrollTop = $(scrollElem).scrollTop();
        var currentScrollLeft = $(scrollElem).scrollLeft();
        var scrollDirectionX, scrollDirectionY;

        if (currentScrollTop > self.previousScrollY)
            scrollDirectionY = "down";
        else if (currentScrollTop < self.previousScrollY)
            scrollDirectionY = "up";
        if (currentScrollLeft > self.previousScrollX)
            self.scrollDirectionX = "right";
        else if (currentScrollLeft < self.previousScrollX)
            scrollDirectionX = "left";

        self.previousScrollY = currentScrollTop;
        self.previousScrollX = currentScrollLeft;

        return { X: scrollDirectionX, Y: scrollDirectionY };
    },
};

$(document).ready(function() {
    if ($("#paint-search-placeholder").length > 0)
        PaintSearch.init().execute(true);
});