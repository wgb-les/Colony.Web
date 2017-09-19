
//
// HOMEPAGE START
//

var doc = document,
    win = window,
    container = $("#container"),
    content = $("#content");

var homeGrid = {
    el: {
        gridCont: $("#mainContent"),
        grid: $(".homeGrid"),
        loader: $(".loader", "#content"),
        overlay: $("#gridOverlay"),
        arrowL: $(".gridArrow.left"),
        arrowR: $(".gridArrow.right")
    },
    settings: {
        speed: 5
    },
    locked: false,
    loaded: false,
    homepageData: null,
    overlayTmpl: null,
    itemTmpl: null,
    moveRightId: null,
    moveLeftId: null,
    gridWidth: 0,
    // lastLeftLocation: 0,
    currentScrollPos: 0,
    totalSections: $("[data-section]").length,
    currentSection: 0,
    cloneL: null,
    cloneR: null,
    loadItemTemplate: function() {
        var self = this;

        $.ajax({
            url: "/_js/brands/wg/templates/homeGridItem.html",
            cache: true,
            type: "GET",
            success: function(html) {
                self.itemTmpl = _.template(html);
                self.loadOverlayTemplate();
            }
        });

    },
    loadOverlayTemplate: function() {
        var self = this;

        $.ajax({
            url: "/_js/brands/wg/templates/homeGridContent.html",
            type: "GET",
            cache: true,
            success: function(html) {
                self.overlayTmpl = _.template(html);
                self.getData();
            }
        });

    },
    getData: function() {
        var self = this;

        //$.getJSON('/_js/data/wg/homepage.js', function (json) {
        //	homepageData = json;
        //	self.renderItems();			
        //});

        $.getJSON("/homepages/homepage/data/", function(json) {
            homepageData = json;
            self.renderItems();
        });

    },
    getHomepageItem: function(itemId) {
        var index = 0;
        var found;
        var entry;
        for (index = 0; index < homepageData.length; ++index) {
            entry = homepageData[index];
            if (entry.Id == itemId) {
                found = entry;
                break;
            };
        };

        return found;
    },
    getScrollPos: function() {
        return parseInt(this.el.gridCont.scrollLeft());
    },
    scrollTracker: function() {
        var self = this;

        var update = function() {

            currentScrollPos = self.getScrollPos();

            if (currentScrollPos === 0) {
                self.el.gridCont.scrollLeft(self.gridWidth);
            };

            if ($(".homeGrid").last().offset().left < 0) {
                self.el.gridCont.scrollLeft(self.gridWidth);
            };
        };

        var onScroll = function() {
            win.requestAnimationFrame(update);
        };

        self.el.gridCont.on("scroll", onScroll);

    },
    renderItems: function() {

        var self = this;

        for (var i = 0; i < homepageData.length; i++) {
            var itm = $(".item:eq(" + i + ")");
            if (itm.length > 0) {
                itm.html(self.itemTmpl({ item: homepageData[i] }));
            } else {
                break;
            }
        };

        self.loaded = true;
        self.gridResize();
        if (!Redant.util.browser.isTablet()) {
            self.scrollTracker();
        };

    },
    gridResize: function() {

        var self = this;

        if (this.loaded === true) {

            var self = this,
                gridH = $("#mainContent").outerHeight(),
                itemW = parseInt(gridH / 2),
                homeGrid = $(".homeGrid");

            $(".gridRows").each(function(i) {
                $(this).width(($(this).hasClass("double")) ? (itemW * 2) : (itemW));
                //if ($(this).hasClass('double')){
                //	$(this).width(itemW*2);
                //} else {
                //	$(this).width(itemW);			
                //};
            });

            self.gridWidth = homeGrid.first().outerWidth();

            //First time setup
            if (homeGrid.length === 1) {

                if (!Redant.util.browser.isTablet()) {
                    var grid = self.el.grid,
                        gridCont = self.el.gridCont;

                    self.cloneL = grid.clone().addClass("clone-left");
                    self.cloneR = grid.clone().addClass("clone-right");

                    self.cloneL.prependTo(gridCont);
                    self.cloneR.appendTo(gridCont);
                };

                //Start at a random section
                self.currentSection = _.random(1, self.totalSections);

                var offset = $('[data-section="' + self.currentSection + '"]').offset().left;

                if (!Redant.util.browser.isTablet()) {
                    self.el.gridCont.scrollLeft(offset + self.gridWidth);
                } else {
                    self.el.gridCont.scrollLeft(offset);
                }

                self.el.loader.fadeOut(500);
            };

        };

    },
    renderOverlay: function(clickedEl) {
        var self = this,
            itemId = clickedEl.data("itemid"),
            jsonObject = this.getHomepageItem(itemId),
            $target = $("#gridOverlay"),
            overlay = self.el.overlay;

        if (clickedEl.data("orientation") === "portrait") {
            overlay.addClass("portrait");
        } else {
            overlay.addClass("landscape");
        };

        if (jsonObject != null) {
            $target.html(self.overlayTmpl({ item: jsonObject }));

            $target.fadeIn(300, function() {
                $(".gridContent-details", self.el.overlay).slideDown(450);
                self.el.gridCont.css("overflow", "hidden"); //Disable scrolling behind overlay
            });

        };

        self.locked = true;

    },
    closeOverlay: function() {
        var self = this;

        self.el.gridCont.removeAttr("style"); //Enable scrolling of grid

        this.el.overlay.fadeOut(300, function() {
            self.el.overlay.removeClass("portrait").removeClass("landscape");
        });

        self.locked = false;
    },
    toggleOverlayDetails: function(clickedEl) {

        var self = $(this),
            icon = $(".icon", clickedEl),
            label = $(".hide-label", clickedEl);

        if (label.html() === "Show") {
            $(".gridContent-details", "#gridOverlay").animate({
                bottom: 0,
                avoidCSSTransitions: true
            }, 400);
            icon.removeClass("icon-caret-up").addClass("icon-caret-down");
            label.html("Hide");
        } else {
            $(".gridContent-details", "#gridOverlay").animate({
                bottom: -($(".gridContent-details", "#gridOverlay").outerHeight() - 40),
                avoidCSSTransitions: true
            }, 400);
            icon.removeClass("icon-caret-down").addClass("icon-caret-up");
            label.html("Show");
        };

    },
    init: function() {
        var self = this;

        _.templateSettings.variable = "rc";

        //Loads Templates then get's JSON data
        this.loadItemTemplate();

        $(win).on("resize", _.debounce(function() {
            self.gridResize();
        }, 350));

        //Show grid content
        $(document).on("click", ".homeGrid .item-trigger", function(e) {
                e.preventDefault();
                self.renderOverlay($(this));
            })
            //Show/hide grid details
            .on("click", "#gridOverlay .hide-toggle", function(e) {
                e.preventDefault();
                self.toggleOverlayDetails($(this));
            })
            //Close grid content
            .on("click", "#gridOverlay .close", function(e) {
                e.preventDefault();
                self.closeOverlay();
            });

        // Arrows
        $(".gridArrow").on("click", function(e) { e.preventDefault() });

        function moveRight() {
            self.el.gridCont.scrollLeft(self.getScrollPos() + self.settings.speed);
            moveRightId = win.requestAnimationFrame(moveRight);
        };

        this.el.arrowR.on("mouseenter", function() {
            moveRightId = win.requestAnimationFrame(moveRight);
        }).on("mouseleave", function() {
            win.cancelAnimationFrame(moveRightId);
        });

        function moveLeft() {
            self.el.gridCont.scrollLeft(self.getScrollPos() - self.settings.speed);
            moveLeftId = win.requestAnimationFrame(moveLeft);
        };

        this.el.arrowL.on("mouseenter", function() {
            moveLeftId = win.requestAnimationFrame(moveLeft);
        }).on("mouseleave", function() {
            win.cancelAnimationFrame(moveLeftId);
        });

        // Mousewheel
        self.el.gridCont.on("mousewheel", function(event, delta) {
            if (!self.locked) {
                this.scrollLeft -= (delta * 30);
                event.preventDefault();
            }
        });

    }
};

$(document).ready(function () {

    if (!$.cookie("acceptCookieLawWG")) {
        $("#cookiePolicy").animate({
            right: "0px",
            avoidCSSTransitions: true
        }, 500, function () { });
        $.cookie("acceptCookieLawWG", true, { expires: 30, path: "/" });
    }
    $("#cookieClose").click(function () {
        $("#cookiePolicy").animate({
            right: "-320px",
            avoidCSSTransitions: true
        }, 500, function () { });
        $.cookie("acceptCookieLawWG", true, { expires: 30, path: "/" });
    });

    //Homepage grid starts
    if (homeGrid.el.grid.length > 0) {
        homeGrid.init();

        //Brand Toggle
        $(".brand-toggle").on("click", function(e) {
            e.preventDefault();
            var $elem = $(this);

            $(".brand-toggle").removeClass("active");
            $(".brand-content").removeClass("active");

            $elem.addClass("active");
            $elem.next().addClass("active");
        });

        $(".close", ".brand-content").on("click", function(e) {
            e.preventDefault();
            $(".brand-toggle").removeClass("active");
            $(this).parent().removeClass("active");
        });

    };
});