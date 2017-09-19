var CategorySearch = {
    isNewSearch: false,
    ajaxReference: null,
    previousScrollX: 0,
    previousScrollY: 0,
    disableScroll: false,
    disable: false,
    page: 1,
    scrollTrigger: 0.7,
    query: "",
    delay: null,
    noResultsTemplate: $('<p id="noCollectionFoundMessage">No collections found</p>'),
    form: $("#formSearch"),
    isloadingPage: false,

    render: function(data) {


        var self = this;
        var $data = $(data).find("#subCategories");
        var $dataItems = $data.find("div.item");
        var container = $("#subCategories");

        if (self.isNewSearch) {

            $("#noCollectionFoundMessage").remove();

            if ($dataItems.length == 0) {
                container.empty();
                container.after(self.noResultsTemplate);
            } else {
                container.empty().append($dataItems);
            }
        } else {
            if ($dataItems.length > 0) {
                container.append($dataItems);
            }
        }

        var images = $data.find("img");
        for (var i = 0; i < images.length; i++) {
            if (!images[i].complete)
                Redant.util.placeholderStart(images[i]);
        }
        self.isloadingPage = false;
    },

    execute: function(newSearch) {


        var self = this;

        if (self.isloadingPage) {
            return;
        }

        self.isloadingPage = true;

        var loader = $(".loading-bar");
        self.isNewSearch = newSearch;

        if (!self.isNewSearch) {
            self.page++;
            loader.show();
        } else {
            if (self.ajaxReference) {
                self.ajaxReference.abort();
                $(".actionLoader").remove();
            }
            self.disable = false;
            self.page = 1;
            self.getSearchQuery();
        }

        var loader = Redant.util.ajaxLoader();
        $("body").append(loader);
        loader.css({ 'z-index': "9999", 'bottom': "40px" });
        loader.show();

        var ajaxURL = window.location.href.split("?")[0];
        ajaxURL = ajaxURL.split("#")[0];
        ajaxURL += "?page=" + self.page;

        self.ajaxReference = $.ajax({
            url: ajaxURL,
            type: "POST",
            data: self.query,
            responseType: "html",
            success: function(data) {
                loader.fadeOut();
                loader.remove();
                self.ajaxReference = null;
                // remove jump to top of new selection since 
                // there is a timing issue in certain browser DOMs that
                // causes this to jump to top.
                //window.location.hash = self.query;
                if (data != null && data != undefined && data.replace(/ +?/g, "") != "") {
                    self.disable = false;
                } else {
                    self.disable = true;
                }
                self.render(data);
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

        self.query = self.form.serialize();
    },

    deserialize: function(data) {
        var self = this;
        var f = self.form, map = {};
        //Get map of values
        var formValues = data.split("&");
        for (var i = 0; i < formValues.length; i++) {
            var nv = formValues[i].split("="),
                n = decodeURIComponent(nv[0]),
                v = nv.length > 1 ? decodeURIComponent(nv[1].replace(/\+/g, "%20")) : null;
            if (!(n in map)) {
                map[n] = [];
            }
            map[n].push(v);
        }

        //Set values for all form elements in the data
        for (var i = 0; i < Object.keys(map).length; i++) {
            f.find("[name='" + Object.keys(map)[i] + "']").val(map[Object.keys(map)[i]]);
        }
    },

    init: function() {
        var self = this;

        $("nav.pagination").remove();

        var query = window.location.hash.substring(1);
        if (query != null && query != undefined && query != "") {
            self.deserialize(query);
        } else {
            self.getSearchQuery();
        }

        $(document).on("submit", "#formSearch", function(e) {
            e.preventDefault();
            self.execute(true);
            return false;
        });

        $(window).on("scroll", function(e) {
            var scrollDir = self.getScrollDirection(this);
            if (scrollDir.Y === "down" && !self.disableScroll && !self.disable && self.ajaxReference == null) {
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

$(".input-postfix-reset").click(function(e) {
    $("#filterKeyword").val("").focus();
    $("#formSearch").submit();
    return false;
});

$("#selectStandard").change(function(e) {
    $("#formSearch").submit();
    return false;
});

$("#formSearch input").keypress(function(e) {
    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
        $("#formSearch").submit();
        return false;
    }
});

$(window).load(function() {
    var images = $("#subCategories").find("img");
    for (var i = 0; i < images.length; i++) {
        if (!images[i].complete)
            Redant.util.placeholderStart(images[i]);
    }
});

$(document).ready(function() {
    var search = CategorySearch.init();

    if (window.location.hash != "") {
        search.execute(true);
    }
});