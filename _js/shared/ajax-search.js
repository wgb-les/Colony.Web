(function($) {
    "use strict";

    /// ozz - 16-12-2016: Added default sort of "alphaasc" as the selected option in postRender function.
    //                    This is becuase the script is run and executed before the page has loaded. 
    //                    The deafult is also required at the server in the first instance.

    var openItems = [];

    var search = {
        isNewSearch: false,
        searchResultsTemplate: null,
        searchResultGridTemplate: null,
        searchResultListTemplate: null,
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
        searchHandle: "",
        searchTerms: "",
        totalPages: 0,
        delay: null,
        form: null,
        defaultLayoutOption: "grid",
        _layoutOption: null,
        lastBannerCategoryIdUsed: null,
        hash: window.location.search.substr(1),
        renderFilters: function(data) {
            var self = this;
            var filters = self.searchFilterTemplate({ model: data });
            if ($(".leftCol").length > 0)
                $(".leftCol").replaceWith(filters);
            else
                $("#container").append(filters);

            $(".toggleFilters").click(function() {
                $(".filterAccordion, #productFilters").toggle();
            });
        },

        renderContents: function (data, itemTemplate) {
            var results = this.searchResultsTemplate({ model: data, itemTemplate: itemTemplate });

            if (data.CelebrosCustomMessage || data.CelebrosCustomMessage.length) {
                this.lastBannerCategoryContentUsed = data.CelebrosCustomMessage;
            }
            $("#content").remove();

            return $(results).appendTo("#container");
        },

        renderBanner: function () {

            if (!this.lastBannerCategoryContentUsed || !this.lastBannerCategoryContentUsed.length ) {
                return;
            }

            var $listingOptions = $(".listing-options");

            if (!$listingOptions.length) {
                return;
            }

            $(".searchBanner").remove();

            $listingOptions.before(this.lastBannerCategoryContentUsed);
        },

        getItemMarkup: function(data, itemTemplate) {
            var markup = "", i = 0;
            _.each(data.ProductSearchResults, function(item) {
                markup += itemTemplate(item);
                i++;
            });
            return markup;
        },

        renderItems: function (data, itemTemplate) {
            $(".searchResults").append(this.getItemMarkup(data, itemTemplate));
        },

        reRenderItems: function(data, itemTemplate) {
            $(".searchResults").empty().append(this.getItemMarkup(data, itemTemplate));
        },

        render: function(data) {
            if (data) {
                this.dataLastLoaded = data;
            } else {
                data = this.dataLastLoaded;
            }

            if (!data) {
                return;
            }

            this.renderFilters(data);
            var itemTemplate = (this.layoutOption === "grid" ? this.searchResultGridTemplate : this.searchResultListTemplate);
            if (this.isNewSearch) {
                this.attachContentViewHandlers(this.renderContents(data, itemTemplate));
            } else {
                this.renderItems(data, itemTemplate);
            }
            this.postRender();
        },

        attachContentViewHandlers: function(contentView) {
            var self = this;
            var selectStandard = $("#selectStandard", contentView);
            var setLayoutOptionGrid = $("#setLayoutOptionGrid", contentView);
            var setLayoutOptionList = $("#setLayoutOptionList", contentView);

            setLayoutOptionGrid.click(function(e) {
                e.preventDefault();
                if (setLayoutOptionGrid.parent().hasClass("active")) {
                    return;
                }
                setLayoutOptionGrid.parent().addClass("active");
                setLayoutOptionList.parent().removeClass("active");
                self.layoutOption = "grid";
                self.reRenderItems(self.dataLastLoaded, self.searchResultGridTemplate);
            });

            setLayoutOptionList.click(function(e) {
                e.preventDefault();
                if (setLayoutOptionList.parent().hasClass("active")) {
                    return;
                }
                setLayoutOptionList.parent().addClass("active");
                setLayoutOptionGrid.parent().removeClass("active");
                self.layoutOption = "list";
                self.reRenderItems(self.dataLastLoaded, self.searchResultListTemplate);
            });

            if (this.layoutOption === "list") {
                setLayoutOptionList.click();
            }
        },

        initializeShareDialog: function() {
            $("#share").detach().appendTo($("#content"));
        },

        postRender: function() {
            var self = this;

            var quickView = new QuickView($(".productList"), "product", $("#header").outerHeight() + 20 + "px", function() {
                if (!Redant.util.browser.isMobile() && !Redant.util.browser.isTablet()) {
                    initializeDraggables();
                }
                self.initializeShareDialog();
            }, Redant.util.ajaxLoader());

            setTimeout(function() {

                self.renderBanner();

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
                        openItems.push(itm[0].className);
                    },
                    onItemClose: function(itm) {
                        var itmClass = itm[0].className;
                        var index = openItems.indexOf(itmClass);
                        openItems.splice(index, 1);
                    },
                    onInit: function() {

                        if (openItems.length == 0)
                            openItems.push("accordion-always-open");
                        var open = openItems;
                        openItems = [];

                        for (var i = 0, l = open.length; i < l; i++) {
                            var classes = open[i].split(" ").join(".");
                            $("." + classes).find(this.trigger).trigger("click");
                        }

                    }
                });

                $(".tagpickerSearch").each(function() {
                    var field = $(this);
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
                                self.setSearchTabUrls();
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
                                self.setSearchTabUrls();
                                self.execute(true);
                            }, 500);
                            if ($(".postbackSearch").length > 0) {
                                $(form).submit();
                            }
                        }
                    };
                    options.newel = newel;
                    $("select", field).fcbkcomplete(options);
                    $("input[type=text]", field).keydown(function() { clearTimeout(self.tagUpdateReference); });
                    self.slider = new FormElement({ type: "SliderSingle", elements: $(".slider.single") });
                });

                var filterForm = $("form.filterAccordion");

                self.toggleClear(".filterColours");
                self.toggleClear(".filterMartindale");
                self.toggleClear(".filterBrands");
                self.toggleClear(".filterEndUse");
                self.toggleClear(".filterType");
                self.toggleClear(".filterPattern");
                self.toggleClear(".filterProductGroup");
                self.toggleClear(".filterFlameRetardant");
                self.toggleClear(".filterUsage");
                self.toggleClear(".filterComposition");
                self.toggleClear(".filterFRTreatable");
                self.toggleClear(".filterFRTreated");
                self.toggleClear(".filterFRInherent");
                self.toggleClear(".filterWallpaperType");
                self.toggleClear(".filterTrimmingType");
                self.toggleClear(".filterFabricType");
                self.toggleClear(".filterRoom");

                if ($("#keywords").val() != null && $("#keywords").val().length > 0)
                    $(".filterTags .clearFilter").show();
                else
                    $(".filterTags .clearFilter").hide();

                filterForm.find(".brands label.all").off("click");
                filterForm.find(".brands label.all").on("click", function() {
                    var $el = $(this);
                    var elems = $el.parents("ul").children().children();
                    if ($el.hasClass("selectedAll")) {
                        elems.removeClass("selected");
                        elems.find('input[type="checkbox"]').prop("checked", false);
                        $el.removeClass("selectedAll");
                    } else {
                        elems.addClass("selected");
                        elems.find('input[type="checkbox"]').prop("checked", true);
                        $el.addClass("selectedAll");
                    }
                    clearTimeout(self.delay);
                    self.delay = setTimeout(function() {
                        self.execute(true);
                    }, 500);

                    toggleClear(".filterBrands");
                    return false;
                });

                filterForm.on("click", ".colours label, .brands label, .patterns label, .searchOptions .colours label", function() {
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

                filterForm.on("change", ".optionList li input[type=checkbox],.optionList li input[type=radio]", function() {
                    clearTimeout(self.delay);
                    self.delay = setTimeout(function() {
                        self.execute(true);
                    }, 500);
                });
                
                //Set Default sort to alpha asc if default or empty
         //       if ($("#SortBy").val() === "default" || $("#SortBy").val() === "") {
         //           $("#SortBy option[value='alphaasc']")
         //               .prop('selected', true);
         //       }

                $("#SortBy").on("change", function() {
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

                filterForm.on("click", ".filterBrands .clearFilter", function() {
                    self.clearSelectedCheck(".filterBrands");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterPattern .clearFilter", function() {
                    self.clearSelectedCheck(".filterPattern");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterEndUse .clearFilter", function() {
                    self.clearSelectedCheck(".filterEndUse");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterType .clearFilter", function() {
                    self.clearSelectedCheck(".filterType");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterProductGroup .clearFilter", function() {
                    self.clearSelectedCheck(".filterProductGroup");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterFlameRetardant .clearFilter", function() {
                    self.clearSelectedCheck(".filterFlameRetardant");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterMartindale .clearFilter", function() {
                    self.clearSelectedCheck(".filterMartindale");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterUsage .clearFilter", function() {
                    self.clearSelectedCheck(".filterUsage");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterFRTreated .clearFilter", function() {
                    self.clearSelectedCheck(".filterFRTreated");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterFRInherent .clearFilter", function() {
                    self.clearSelectedCheck(".filterFRInherent");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterFRTreatable .clearFilter", function() {
                    self.clearSelectedCheck(".filterFRTreatable");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterComposition .clearFilter", function() {
                    self.clearSelectedCheck(".filterComposition");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterWallpaperType .clearFilter", function() {
                    self.clearSelectedCheck(".filterWallpaperType");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterTrimmingType .clearFilter", function() {
                    self.clearSelectedCheck(".filterTrimmingType");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterFabricType .clearFilter", function() {
                    self.clearSelectedCheck(".filterFabricType");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterRoom .clearFilter", function () {
                    self.clearSelectedCheck(".filterRoom");
                    self.execute(true);
                    return false;
                });

                filterForm.on("click", ".filterTags .clearFilter", function() {
                    self.toggleClearText('input[name="keywords"]');
                    self.removeAllOptions('select[name="keywords"]'); //If 'fcbkcomplete' is attached. The text input is switched to a select. Remove all its childen.
                    self.setSearchTabUrls();
                    self.execute(true);
                    return false;
                });
                
                filterForm.on("click", ".clearAllFilters", function() {
                    self.clearSelectedCheck(".filterColours,.filterBrands,.filterPattern,.filterEndUse,.filterType,.filterProductGroup,.filterFlameRetardant,.filterUsage,.filterComposition,.filterFRTreated,.filterFRTreatable,.filterFRInherent,.filterWallpaperType,.filterTrimmingType,.filterFabricType");
                    self.toggleClearText('input[name="keywords"]');
                    self.removeAllOptions('select[name="keywords"]'); //If 'fcbkcomplete' is attached. The text input is switched to a select. Remove all its childen.
                    self.setSearchTabUrls();
                    self.execute(true);
                    return false;
                });

                $("#martindale").parents(".field").on("click", function(event, ui) {
                    $(".filterMartindale .clearFilter").show();
                    self.execute(true);
                });

                if (!Redant.util.browser.isMobile() && !Redant.util.browser.isTablet()) {
                    initializeDraggables();
                }

            }, 10);
        },

        toggleClear: function(selector) {
            if ($(selector).find("input:checked").length > 0)
                $(selector).find(".clearFilter").show();
            else
                $(selector).find(".clearFilter").hide();
        },

        toggleClearText: function(selector) {
            $(selector).val("");
        },

        toggleClearSlider: function(selector) {
            if ($(selector).find("input").length > 0 && $(selector).find("input").val().length > 0)
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
            $(selector).find("label.selected").each(function() { $(this).toggleClass("selected"); });
            $(selector).find("input:checked").each(function() { $(this).prop("checked", false); });
            $(selector).find(".selectedAll").removeClass("selectedAll");
            self.toggleClear(selector);
        },

        setSearchTabUrls: function() {
            var keywords = $("#keywords").val();
            $(".tabs ul li a").each(function() {
                var $tabLink = $(this);
                var url = $tabLink.attr("href");
                url = url.split("?")[0];
                if (keywords != null) {
                    url = url + "?keywords=" + keywords.join(" ");
                }
                $tabLink.attr("href", url);
            });
        },

        execute: function(newSearch, callback) {
            callback = callback || function() {};

            if (this.ajaxReference) {
                this.ajaxReference.abort();
                $(".actionLoader").remove();
            }

            this.isNewSearch = newSearch;
          //  var lastpage = this.getQueryString("SelectedProductGroups")
            if (!this.isNewSearch) {
                if (this.page > this.totalPages) {
                    return false;
                }
                this.page++;
                this.query = this.getSearchQuery();
            } else {

                this.disable = false;
                this.page = 1;
                this.query = this.getSearchQuery();
            }
            var loader = Redant.util.ajaxLoader().appendTo("body").css({ 'z-index': "9999", 'bottom': "40px" }).show();
            var LastPage = $("#LastSearchPage").val();
            var brands = this.getQueryString("brand");
            var searchHandle = $("#searchHandle").val();
            var ajaxURL = "/shops/wgshopsearch/ajaxsearch/?page=" + this.page + "&perPage=120"; //if per page changes, change the if below.

            ajaxURL = ajaxURL + "&searchHandle=" + searchHandle;
            ajaxURL = ajaxURL + "&brand=" + brands;
            var selectedProductCategories = $(".filterProductGroup input:checked");
            var _this = this;
            var removeBanner = function() {
                var banner = $(".listing-options").prev();
                if (banner.hasClass("content-banner")) {
                    banner.remove();
                }
            };

            var selectedProductCategoriesId;

            selectedProductCategoriesId = selectedProductCategories.first().val() || this.getQueryString("SelectedProductGroups");

            if (selectedProductCategoriesId && this.lastBannerCategoryIdUsed !== selectedProductCategoriesId) { // && (!this.lastBannerCategoryIdUsed || this.lastBannerCategoryIdUsed !== selectedProductCategoriesId)
                // A new banner needs to be loaded...
                this.lastBannerCategoryIdUsed = selectedProductCategoriesId;
                this.lastBannerCategoryContentUsed = null;

                if (this.ajaxBannerLoad) {
                    this.ajaxBannerLoad.abort();
                }

                var currentRequest = $.ajax({
                    url: "/shops/productcategories/GetBannerBySkuAttributeOption/",
                    type: "GET",
                    data: {
                        skuAttributeOptionId: selectedProductCategoriesId
                    },
                    complete: function() {
                        if (_this.ajaxBannerLoad === currentRequest) {
                            _this.ajaxBannerLoad = null;
                        }
                    },
                    success: function(data) {
                        _this.lastBannerCategoryContentUsed = data;
                        _this.renderBanner();
                    }
                });

                this.ajaxBannerLoad = currentRequest;

            } else {
                removeBanner();
            }

            this.query = this.query.replace("?", "");

            this.ajaxReference = $.ajax({
                url: ajaxURL,
                type: "POST",
                data: this.query,
                responseType: "json",
                complete: function() {
                    _this.ajaxReference = null;
                },
                success: function(data) {
                    loader.fadeOut({
                        complete: function() {
                            loader.remove();
                        }
                    });

                    if (_this.query.substr(0, 1) !== "?") {
                        _this.query = "?" + _this.query;
                    }
                    this.searchHandle = data.SearchHandle;
                    this.lastPage = data.LastPage;
                    this.totalPages = data.LastPage;
                    this.searchTerms = data.SearchSequence;
                    this.currentPage = data.CurrentPage;
                    search.totalPages = data.LastPage;
                    var url = window.location.protocol
                        + "//"
                        + window.location.host
                        + window.location.pathname
                        + _this.query;

                    if ((data.ProductSearchResults != null) && (data.ProductSearchResults.length > 0)) {
                        history.pushState({}, document.title, url);
                    }
                    if ((!_this.isNewSearch)) {
                        if (data.ProductSearchResults.length > 0) {
                            _this.render(data);
                        }
                    } else {
                        _this.render(data);
                    }
                    $(".scrapBookAdd").prependTo("#content");
                    callback(null, data);
                }
            });
        },

        getSearchQuery: function() {
            var q = "";

            if (this.hash != null && this.hash.length > 0) {

                q = this.hash;
                this.hash = null;

            } else {

                if ($("#initializeSearch").length > 0) {
                    q = $("#initializeSearch").serialize();
                } else {
                    q = $("#searchProducts").serialize() || "";
                }

                q += "&SortBy=" + ($("#SortBy").val() || "default");

                var layoutOptionExists = q.match("&layoutOption=[a-zA-z0-9]*");
                if (layoutOptionExists && layoutOptionExists.length) {
                    q = q.replace(layoutOptionExists[0], "&layoutOption=" + this.layoutOption);
                } else {
                    q += "&layoutOption=" + this.layoutOption;
                }
                q += "&searchHandle=" + $("#searchHandle").val();
                q += "&searchTerms=" + $("#searchTerm").val();
            }

            $("#initializeSearch").remove();

            return q;
        },

        setQueryString: function(key, value) {
            var expression = "(&|\\?)" + key + "=[a-zA-z0-9]*";
            var result = window.location.search.match(expression);
            if (result && result.length) {

                var url = window.location.protocol
                    + "//"
                    + window.location.host
                    + window.location.pathname
                    + result.input.replace(result[0], "&" + key + "=" + value);

                history.pushState({}, document.title, url);

            } else {

                var url = window.location.protocol
                    + "//"
                    + window.location.host
                    + window.location.pathname
                    + window.location.search + "&" + key + "=" + value;

                history.pushState({}, document.title, url);

            }
        },

        getQueryString: function(key) {
            var expression = "(&|\\?)" + key + "=([a-zA-z0-9]*)";
            var result = window.location.search.match(expression);
            if (result && result.length === 3) {
                return result[2];
            } else {
                return "";
            }
        },
        loadTemplate: function(file) {
            return $.ajax({
                url: "/_js/template/" + file + ".html?v=4",
                type: "GET",
                dataType: "html"
            });
        },
        init: function(formSelector) {
            var deferred = $.Deferred();

            var self = this;
            self.form = formSelector;

            $.when(self.loadTemplate("search-results"),
                    self.loadTemplate("search-result-grid"),
                    self.loadTemplate("search-filter"),
                    self.loadTemplate("search-result-list"))
                .done(function(searchResults, searchResultGrid, searchFilter, searchResultList) {
                    self.searchResultsTemplate = _.template(searchResults[0]);
                    self.searchResultGridTemplate = _.template(searchResultGrid[0]);
                    self.searchFilterTemplate = _.template(searchFilter[0]);
                    self.searchResultListTemplate = _.template(searchResultList[0]);

                    $(window).on("scroll", function() {
                        var scrollDir = self.getScrollDirection(this);

                        if (scrollDir.Y === "down" && !self.disableScroll) {

                            var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();

                            if ((wintop / (docheight - winheight)) > self.scrollTrigger) {
                                self.disableScroll = true;

                                self.execute(false, function() {
                                    self.disableScroll = false;
                                });
                            }
                        }
                    });

                    deferred.resolve(self);
                });

            Object.defineProperty(self, "layoutOption", {
                get: function() {

                    if (!self._layoutOption) {
                        self._layoutOption = self.getQueryString("layoutOption") || self.defaultLayoutOption;
                    }

                    return self._layoutOption;
                },
                set: function(value) {
                    self.setQueryString("layoutOption", value);
                    self._layoutOption = value;
                }
            });

            return deferred.promise();
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
        }
    };

    $(document).ready(function() {
        if ($("body").hasClass("searchTemplate")) {

            search.init("#searchProducts")
                .then(function(search) {
                    return search.execute(true);
                });
        }
    });


})(jQuery);