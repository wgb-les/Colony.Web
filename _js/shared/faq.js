window.Wg = window.Wg || {};
Wg.Faqs = Wg.Faqs || function() {
    var searchTemplate = null;

    function loadTemplate(file) {
        if (searchTemplate != null)
            return searchTemplate;
        return $.ajax({
            url: "/_js/template/" + file + ".html",
            type: "GET",
            dataType: "html"
        });
    }

    function search() {
        var faqs = $(".faqAccordion > li");
        var filters = $(".search-faqs").find("input[name=flameRetardant_filterCategory]:checked").map(function(i, elem) { return $(this).val(); });
        var countryFilters = $(".search-faqs").find("input[name=flameRetardant_filterCountry]:checked").map(function(i, elem) { return $(this).val(); });
        faqs.show();
        for (var i = 0; i < faqs.length; i++) {
            var elem = $(faqs[i]);

            if ((elem.text() || "").toLowerCase().indexOf((exports.searchParams.keywords || "").toLowerCase()) < 0)
                elem.hide();
            for (var ix = 0; ix < filters.length; ix++) {
                if (elem.find("article").data(filters[ix]) != true)
                    elem.hide();
            }
            for (var ix = 0; ix < countryFilters.length; ix++) {
                if (elem.find("article").data(countryFilters[ix]) != true)
                    elem.hide();
            }
        }
        renderFilters(false, filters, countryFilters);
    }

    function countFaqsWithAttribute(attributeName) {

    }

    function renderFilters(reRenderKeywords, filters, countryFilters) {
        loadTemplate("faq-filter")
            .done(function(template) {
                var filterTemplate = _.template(template);

                var expanded = $(".leftCol .filterAccordion.faqFilterAccordion .expanded").map(function(itm) { return "#" + this.id; });

                $(".leftCol .filterAccordion.faqFilterAccordion .toggle-filterAccordion").each(function(index, element) {
                    $(this).unbind("click");
                });

                var html = filterTemplate({ filters: filters || {}, countryFilters: countryFilters || {}, reRenderKeywords: reRenderKeywords, searchParams: exports.searchParams, faqs: $(".faqAccordion article:visible").map(function(itm) { return $(this).data(); }) });
                var searchbox = $("#faqSearchForm");

                var searchFieldWithFocusId = $(":focus").attr("id");

                searchbox.find(".faq-categories, .filterCountry").remove();
                if (reRenderKeywords) {
                    searchbox.find(".filterTags").remove();
                    searchbox.prepend(html);
                } else {
                    searchbox.find(".filterTags").after(html);
                }

                $("#" + searchFieldWithFocusId).focus();

                var filterAccordion = new $.accordion($(".leftCol .filterAccordion.faqFilterAccordion"), {
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
                var toExpand = $($.makeArray(expanded).join());
                toExpand.children("a").click();
                $("#byKeyword").addClass("expanded");
                $("#byKeyword").next(".content-filterAccordion").show();

                $("#byType").addClass("expanded");
                $("#byType").next(".content-filterAccordion").show();

                $("#byRegion").addClass("expanded");
                $("#byRegion").next(".content-filterAccordion").show();

            });
    }

    var exports = {
        searchParams: {},

        init: function() {
            $(document).ready(function() {
                //FAQ accordion
                var myplugin = new $.accordion($(".faqAccordion"), {
                    closeOthers: false,
                    openFirst: true,
                    onInit: function(plugin) {
                        // Expand All and Close All buttons on FAQ accordion
                        if ($(".button.expand-all").length && $(".button.close-all").length && $(".faqAccordion").length) {
                            $(".expand-all").click(function(e) {
                                e.preventDefault();
                                $(".faqAccordion .details").each(function(index, element) {
                                    $(this).closest("article").children(".details").stop().slideDown();
                                    $(this).parent().addClass(".expanded");
                                });
                                return false;
                            });
                            $(".close-all").click(function(e) {
                                e.preventDefault();
                                $(".faqAccordion .details").each(function(index, element) {
                                    $(this).closest("article").children(".details").stop().slideUp();
                                    $(this).parent().removeClass(".expanded");
                                });
                                return false;
                            });
                        }
                    }
                });
                $("body").on("keydown", "#faqFilterSearch", function(e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        return false;
                    }
                });
                $("body").on("keyup", "#faqFilterSearch", function() {
                    exports.searchParams["keywords"] = $(this).val();
                    search();
                });

                $("body").on("change", ".faq-categories input:checkbox,.filterCountry input:checkbox", function() {
                    search();
                });

                //$(".faq-contact-button")
                //    .on("click", ".button", function(e) {
                //        e.preventDefault();
                //        return false;
                //    })
                //    .hoverIntent(function(e) {
                //        $(this).find(".faq-contact-content").slideToggle();
                //    });
                renderFilters(true);
            });
        }
    };
    return exports;
}();
Wg.Faqs.init();