(function ($) {
    'use strict';

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
        query: '',
        delay: null,
        form: null,
        hash: null,
        layoutOption: 'grid',
        renderFilters: function (data) {
            var self = this;
            var filters = self.searchFilterTemplate({ model: data });
            if ($('.leftCol').length > 0)
                $('.leftCol').replaceWith(filters);
            else
                $('#container').append(filters);

            $('.toggleFilters').click(function () {
                $('.filterAccordion, #productFilters').toggle();
            });
        },
        renderContents: function (data, itemTemplate) {
            var results = this.searchResultsTemplate({ model: data, itemTemplate: itemTemplate });
            $('#content').remove();
            return $(results).appendTo('#container');
        },
        renderBanner: function () {

            if (!this.lastBannerCategoryContentUsed || !this.lastBannerCategoryContentUsed.length) {
                return;
            }

            var listingOptions = $('.listing-options');

            if (!listingOptions.length) {
                return;
            }

            listingOptions.before(this.lastBannerCategoryContentUsed);
        },
        getItemMarkup: function (data, itemTemplate) {
            var markup = '';
            _.each(data.ProductSearchResults, function (item) {
                markup += itemTemplate(item);
            });
            return markup;
        },
        renderItems: function (data, itemTemplate) {
            $('.searchResults').append(this.getItemMarkup(data, itemTemplate));
        },
        reRenderItems: function (data, itemTemplate) {
            $('.searchResults').empty().append(this.getItemMarkup(data, itemTemplate));
        },
        render: function (data) {
            var itemTemplate;

            if (data) {
                this.dataLastLoaded = data;
            } else {
                data = this.dataLastLoaded;
            }

            if (!data) {
                return;
            }

            this.renderFilters(data);
            var layoutOption = this.getHash('layoutOption');
                        
            if(layoutOption === 'grid'){
                itemTemplate = this.searchResultGridTemplate;
            }

            if(layoutOption === 'list') {
                itemTemplate = this.searchResultListTemplate;
            }

            if (this.isNewSearch) {
                this.attachContentViewHandlers(this.renderContents(data, itemTemplate));
            } else {
                this.renderItems(data, itemTemplate);
            }
            this.postRender();
        },
        attachContentViewHandlers: function (contentView) {
            var self = this;
            var selectStandard = $('#selectStandard', contentView);
            
            this.setLayoutOptionGrid = $('#setLayoutOptionGrid', contentView);
            this.setLayoutOptionList = $('#setLayoutOptionList', contentView);

            self.setLayoutOptionGrid.click(function (e) {
                e.preventDefault();
                if (self.setLayoutOptionGrid.parent().hasClass('active')) {
                    return;
                }
                self.setLayoutOptionGrid.parent().addClass('active');
                self.setLayoutOptionList.parent().removeClass('active');
                self.layoutOption = 'grid';
                self.setHash('layoutOption',self.layoutOption);
                self.reRenderItems(self.dataLastLoaded, self.searchResultGridTemplate);
            });

            self.setLayoutOptionList.click(function (e) {
                e.preventDefault();
                if (self.setLayoutOptionList.parent().hasClass('active')) {
                    return;
                }
                self.setLayoutOptionList.parent().addClass('active');
                self.setLayoutOptionGrid.parent().removeClass('active');
                self.layoutOption = 'list';
                self.setHash('layoutOption',self.layoutOption);
                self.reRenderItems(self.dataLastLoaded, self.searchResultListTemplate);
            });
        },
        
        setHash: function(key, value){
            var expression = '&'+key+'=[a-zA-z]*';
            var result = search.hash.match(expression);
            if(result.length){
                this.hash = result.replace(result[0],'&'+key+'='+value);
                window.location.hash = search.hash;
            }
        },

        getHash: function(key){
            var expression = '&'+key+'=([a-zA-z]*)';
            var result = search.hash.match(expression)
            if(result.length === 2){
                return result[1];
            }else{
                return null;
            }
        },

        initializeShareDialog: function () {
            $('#share').detach().appendTo($('#content'));
        },
        postRender: function () {
            var self = this;

            var quickView = new QuickView($('.productList'), 'product', $('#header').outerHeight() + 20 + 'px', function () {
                if (!Redant.util.browser.isMobile() && !Redant.util.browser.isTablet()) {
                    initializeDraggables();
                }
                self.initializeShareDialog();
            }, Redant.util.ajaxLoader());

            setTimeout(function () {

                self.renderBanner();

                var filterAccordion = new $.accordion($('.filterAccordion'), {
                    accordionType: 'adv',
                    trigger: '.toggle-filterAccordion',
                    element: '.content-filterAccordion',
                    container: '.boxSection',
                    transitionSpeed: 0,
                    transitionEase: 'linear',
                    closeOthers: false,
                    openFirst: true,
                    onItemOpen: function (itm) {
                        openItems.push(itm[0].className);
                    },
                    onItemClose: function (itm) {
                        var itmClass = itm[0].className;
                        var index = openItems.indexOf(itmClass);
                        openItems.splice(index, 1);
                    },
                    onInit: function () {

                        if (openItems.length == 0)
                            openItems.push('accordion-always-open');
                        var open = openItems;
                        openItems = [];

                        for (var i = 0, l = open.length; i < l; i++) {
                            var classes = open[i].split(' ').join('.');
                            $('.' + classes).find(this.trigger).trigger('click');
                        }

                    }
                });
                $('.tagpickerSearch').each(function () {
                    var field = $(this);
                    var form = field.closest('form')[0];
                    var newel = true;
                    var rel = field.attr('rel');
                    if (rel == 'allownew=false') {
                        newel = false;
                    }
                    var options = {
                        width: '100%',
                        json_url: '/shops/WgShop/PredictiveSearchFrontend/',
                        complete_text: 'Enter keywords...',
                        bricket: false,
                        onselect: function () {
                            clearTimeout(self.delay);
                            self.delay = setTimeout(function () {
                                self.setSearchTabUrls();
                                self.execute(true);
                            }, 500);

                            if ($('.postbackSearch').length > 0) {
                                $(form).submit();
                            }
                        },
                        onremove: function (i) {
                            $('#' + i._id).prop('selected', false);
                            clearTimeout(self.delay);
                            self.delay = setTimeout(function () {
                                self.setSearchTabUrls();
                                self.execute(true);
                            }, 500);
                            if ($('.postbackSearch').length > 0) {
                                $(form).submit();
                            }
                        }
                    };
                    options.newel = newel;
                    $('select', field).fcbkcomplete(options);
                    $('input[type=text]', field).keydown(function () { clearTimeout(self.tagUpdateReference); });
                    self.slider = new FormElement({ type: 'SliderSingle', elements: $('.slider.single') });
                });

                var filterForm = $('form.filterAccordion');

                self.toggleClear('.filterColours');
//                self.toggleClearSlider('.filterMartindale');
                self.toggleClear('.filterMartindale');
                self.toggleClear('.filterBrands');
                self.toggleClear('.filterEndUse');
                self.toggleClear('.filterType');
                self.toggleClear('.filterPattern');
                self.toggleClear('.filterProductGroup');
                self.toggleClear('.filterFlameRetardant');
                self.toggleClear('.filterUsage');
                self.toggleClear('.filterComposition');
                if ($('#keywords').val() != null && $('#keywords').val().length > 0)
                    $('.filterTags .clearFilter').show();
                else
                    $('.filterTags .clearFilter').hide();
                filterForm.find('.brands label.all').off('click');
                filterForm.find('.brands label.all').on('click', function () {
                    var $el = $(this);
                    var elems = $el.parents('ul').children().children();
                    if ($el.hasClass('selectedAll')) {
                        elems.removeClass('selected');
                        elems.find('input[type="checkbox"]').prop('checked', false);
                        $el.removeClass('selectedAll');
                    } else {
                        elems.addClass('selected');
                        elems.find('input[type="checkbox"]').prop('checked', true);
                        $el.addClass('selectedAll');
                    }
                    clearTimeout(self.delay);
                    self.delay = setTimeout(function () {
                        self.execute(true);
                    }, 500);

                    toggleClear('.filterBrands');
                    return false;
                });

                filterForm.on('click', '.colours label, .brands label, .patterns label, .searchOptions .colours label', function () {
                    var el = $(this);
                    if (el.parent().hasClass('toggleAll')) {
                        if (el.hasClass('selectedAll')) {
                            el.parent().siblings('ul').children().children().removeClass('selected');
                            el.parent().siblings('ul').children().children().find('input[type="checkbox"]').prop('checked', false);
                            el.removeClass('selectedAll');
                        } else {
                            el.parent().siblings('ul').children().children().addClass('selected');
                            el.parent().siblings('ul').children().children().find('input[type="checkbox"]').prop('checked', true);
                            el.addClass('selectedAll');
                        }
                    } else {
                        el.toggleClass('selected');
                        var checkbox = el.find('input[type="checkbox"]');
                        toggleCheckbox(checkbox);
                    }
                    clearTimeout(self.delay);
                    self.delay = setTimeout(function () {
                        self.execute(true);
                    }, 500);
                    return false;
                });
                filterForm.on('change', '.optionList li input[type=checkbox],.optionList li input[type=radio]', function () {
                    clearTimeout(self.delay);
                    self.delay = setTimeout(function () {
                        self.execute(true);
                    }, 500);
                });
                $('#SortBy').on('change', function () {
                    clearTimeout(self.delay);
                    self.delay = setTimeout(function () {
                        self.execute(true);
                    }, 500);
                });
                filterForm.on('click', '.filterColours .clearFilter', function () { self.clearSelectedCheck('.filterColours'); self.execute(true); return false; });
                filterForm.on('click', '.filterBrands .clearFilter', function () { self.clearSelectedCheck('.filterBrands'); self.execute(true); return false; });
                filterForm.on('click', '.filterPattern .clearFilter', function () { self.clearSelectedCheck('.filterPattern'); self.execute(true); return false; });
                filterForm.on('click', '.filterEndUse .clearFilter', function () { self.clearSelectedCheck('.filterEndUse'); self.execute(true); return false; });
                filterForm.on('click', '.filterType .clearFilter', function () { self.clearSelectedCheck('.filterType'); self.execute(true); return false; });
                filterForm.on('click', '.filterProductGroup .clearFilter', function () { self.clearSelectedCheck('.filterProductGroup'); self.execute(true); return false; });
                filterForm.on('click', '.filterFlameRetardant .clearFilter', function () { self.clearSelectedCheck('.filterFlameRetardant'); self.execute(true); return false; });
//                filterForm.on('click', '.filterMartindale .clearFilter', function () { $('#martindale').val(0); self.toggleClear('.filterMartindale'); self.execute(true); return false; });
                filterForm.on("click", '.filterMartindale .clearFilter', function () { self.clearSelectedCheck('.filterMartindale'); self.execute(true); return false; });
                filterForm.on('click', '.filterUsage .clearFilter', function () { self.clearSelectedCheck('.filterUsage'); self.execute(true); return false; });
                filterForm.on('click', '.filterComposition .clearFilter', function () { self.clearSelectedCheck('.filterComposition'); self.execute(true); return false; });
                filterForm.on('click', '.filterTags .clearFilter', function () {
                    self.toggleClearText('input[name="keywords"]');
                    self.removeAllOptions('select[name="keywords"]'); //If 'fcbkcomplete' is attached. The text input is switched to a select. Remove all its childen.
                    self.setSearchTabUrls();
                    self.execute(true); return false;
                });


                filterForm.on('click', '.clearAllFilters', function () {
                    self.clearSelectedCheck('.filterColours,.filterBrands,.filterPattern,.filterEndUse,.filterType,.filterProductGroup,.filterFlameRetardant,.filterUsage,.filterComposition');
                    self.toggleClearText('input[name="keywords"]');
                    self.removeAllOptions('select[name="keywords"]'); //If 'fcbkcomplete' is attached. The text input is switched to a select. Remove all its childen.
                    self.setSearchTabUrls();
                    self.execute(true);
                    return false;
                });

                $("#martindale").parents('.field').on("click", function (event, ui) {
                    $(".filterMartindale .clearFilter").show();
                    self.execute(true);
                });

                if (!Redant.util.browser.isMobile() && !Redant.util.browser.isTablet()) {
                    initializeDraggables();
                }

            }, 10);
        },
        toggleClear: function (selector) {
            if ($(selector).find('input:checked').length > 0)
                $(selector).find('.clearFilter').show();
            else
                $(selector).find('.clearFilter').hide();
        },
        toggleClearText: function (selector) {
            $(selector).val('');
        },
        toggleClearSlider: function (selector) {
            if ($(selector).find('input').length > 0 && $(selector).find('input').val().length > 0)
                $(selector).find('.clearFilter').show();
            else
                $(selector).find('.clearFilter').hide();
        },

        removeAllOptions: function (selector) {
            $(selector).find('option').each(function () {
                $(this).remove();
            });

        },

        clearSelectedCheck: function (selector) {
            var self = this;
            $(selector).find('label.selected').each(function () { $(this).toggleClass('selected'); });
            $(selector).find('input:checked').each(function () { $(this).prop('checked', false); });
            $(selector).find('.selectedAll').removeClass('selectedAll');
            self.toggleClear(selector);
        },

        setSearchTabUrls: function () {
            var keywords = $('#keywords').val();
            $('.tabs ul li a').each(function () {
                var $tabLink = $(this);
                var url = $tabLink.attr('href');
                url = url.split('?')[0];
                if (keywords != null) {
                    url = url + '?keywords=' + keywords.join(' ');
                }
                $tabLink.attr('href', url);
            });
        },

        execute: function (newSearch) {

            if (this.ajaxReference) {
                this.ajaxReference.abort();
                $('.actionLoader').remove();
            }

            this.isNewSearch = newSearch;
            if (!this.isNewSearch) {
                this.page++;
            } else {
                this.disable = false;
                this.page = 1;
                this.getSearchQuery();
            }
            var loader = Redant.util.ajaxLoader().appendTo('body').css({ 'z-index': '9999', 'bottom': '40px' }).show();

            var categoryName = Redant.util.getQuerystring('categoryName');
            var categoryId = Redant.util.getQuerystring('categoryId');
            var productGroups = Redant.util.getQuerystring('SelectedProductGroups');
            var ajaxURL = '/shops/wgshopsearch/ajaxsearch/?page=' + this.page + '&perPage=120'; //if per page changes, change the if below.

            ajaxURL = ajaxURL + '&categoryName=' + categoryName;
            ajaxURL = ajaxURL + '&categoryId=' + categoryId;

            var selectedProductCategories = $(".filterProductGroup input:checked");
            var self = this;
            var removeBanner = function () {
                self.lastBannerCategoryIdUsed = null;
                var banner = $('.listing-options').prev();
                if (banner.hasClass('content-banner')) {
                    banner.remove();
                }
            };

            if (selectedProductCategories.length === 1) {
                var selectedProductCategoriesId = selectedProductCategories.first().val();

                if (!this.lastBannerCategoryIdUsed || this.lastBannerCategoryIdUsed !== selectedProductCategoriesId) {
                    // A new banner needs to be loaded...
                    this.lastBannerCategoryIdUsed = selectedProductCategoriesId;
                    this.lastBannerCategoryContentUsed = null;

                    if (this.ajaxBannerLoad) {
                        this.ajaxBannerLoad.abort();
                    }

                    var currentRequest = $.ajax({
                        url: '/shops/productcategories/GetBannerBySkuAttributeOption/',
                        type: 'GET',
                        data: {
                            skuAttributeOptionId: selectedProductCategoriesId
                        },
                        complete: function () {
                            if (self.ajaxBannerLoad === currentRequest) {
                                self.ajaxBannerLoad = null;
                            }
                        },
                        success: function (data) {
                            self.lastBannerCategoryContentUsed = data;
                            self.renderBanner();
                        }
                    });

                    this.ajaxBannerLoad = currentRequest;

                } else {
                    removeBanner();
                }

            } else {
                removeBanner();
            }


            this.ajaxReference = $.ajax({
                url: ajaxURL,
                type: 'POST',
                data: this.query,
                responseType: 'json',
                complete: function () {
                    self.ajaxReference = null;
                },
                success: function (data) {
                    loader.fadeOut({
                        complete: function () {
                            loader.remove();
                        }
                    });

                    window.location.hash = self.query;
                    if (data) {
                        if (data.ProductSearchResults === null || data.ProductSearchResults.length == 0 || data.ProductSearchResults.length < 120) {
                            self.disable = true;
                        }
                        self.render(data);
                    } else {
                        self.disable = true;
                    }

                    $('.scrapBookAdd').prependTo('#content');
                }
            });
        },
        arrayHasValues: function (arr) {
            var hasValue = false;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] !== null || arr[i] !== undefined && arr[i] !== '') {
                    hasValue = true;
                    break;
                }
            }
            return hasValue;
        },
        getSearchQuery: function () {
            var self = this;
            if (self.hash != null && self.hash.length > 0)
                self.query = self.hash;
            else {
                var q;
                if ($('#initializeSearch').length > 0)
                    q = $('#initializeSearch').serialize();
                else
                    q = $('#searchProducts').serialize() || '';

                q += '&SortBy=' + ($('#SortBy').val() || 'default');
                q += '&layoutOption=' + self.layoutOption;
                
                self.query = q;
            }

           

            $('#initializeSearch').remove();
            self.hash = null;
        },
        deserialize: function (data) {
            var self = this;
            var f = $(self.form), map = {};
            //Get map of values
            $.each(data.split('&'), function () {
                var nv = this.split('='),
                    n = decodeURIComponent(nv[0]),
                    v = nv.length > 1 ? decodeURIComponent(nv[1].replace(/\+/g, '%20')) : null;
                if (!(n in map)) {
                    map[n] = [];
                }
                map[n].push(v);
            });
            //Set values for all form elements in the data
            $.each(map, function (n, v) {
                var elem = f.find('[name="' + n + '"]');
                switch (elem.attr('type')) {
                    case 'radio':
                    case 'checkbox':
                        for (var i = 0; i < elem.length; i++) {
                            for (var ix = 0; ix < v.length; ix++) {
                                if (elem[i].value == v[ix]) {
                                    $(elem[i]).prop('checked', true);
                                    $('label[for="' + $(elem[i]).attr('id') + '"]').addClass('selected');
                                }
                            }
                        }
                        break;
                    default:
                        elem.val(v);
                        break;
                }
            });
            //Uncheck checkboxes and radio buttons not in the form data
            $('input:checkbox:checked,input:radio:checked').each(function () {
                if (!($(this).attr('name') in map)) {
                    this.checked = false;
                }
            });
        },
        loadTemplate: function (file) {
            return $.ajax({
                url: '/_js/template/' + file + '.html',
                type: 'GET',
                dataType: 'html'
            });
        },
        init: function (form) {
            var self = this;
            self.form = form;
            self.hash = window.location.hash.substring(1);

            $.when(self.loadTemplate('search-results'),
                self.loadTemplate('search-result-grid'),
                self.loadTemplate('search-filter'),
                self.loadTemplate('search-result-list'))
                .done(function (searchResults, searchResultGrid, searchFilter, searchResultList) {
                    self.searchResultsTemplate = _.template(searchResults[0]);
                    self.searchResultGridTemplate = _.template(searchResultGrid[0]);
                    self.searchFilterTemplate = _.template(searchFilter[0]);
                    self.searchResultListTemplate = _.template(searchResultList[0]);
                });

            $(window).on('scroll', function () {
                var scrollDir = self.getScrollDirection(this);
                if (scrollDir.Y === 'down' && !self.disableScroll && !self.disable && self.ajaxReference == null) {
                    var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
                    if ((wintop / (docheight - winheight)) > self.scrollTrigger) {
                        self.disableScroll = true;
                        self.execute(false);
                        self.disableScroll = false;
                    }
                }
            });

            return self;
        },
        getScrollDirection: function (scrollElem) {
            var self = this;
            var currentScrollTop = $(scrollElem).scrollTop();
            var currentScrollLeft = $(scrollElem).scrollLeft();
            var scrollDirectionX, scrollDirectionY;

            if (currentScrollTop > self.previousScrollY)
                scrollDirectionY = 'down';
            else if (currentScrollTop < self.previousScrollY)
                scrollDirectionY = 'up';
            if (currentScrollLeft > self.previousScrollX)
                self.scrollDirectionX = 'right';
            else if (currentScrollLeft < self.previousScrollX)
                scrollDirectionX = 'left';

            self.previousScrollY = currentScrollTop;
            self.previousScrollX = currentScrollLeft;

            return { X: scrollDirectionX, Y: scrollDirectionY };
        }
    };

    $(document).ready(function () {
        if ($('body').hasClass('searchTemplate')) {
            search.init('#searchProducts').execute(true);
        }
    });


})(jQuery);

