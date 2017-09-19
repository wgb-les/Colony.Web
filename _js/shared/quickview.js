var imageLoaderBlankState = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var QuickView = function(collectionJqueryObject, quickViewType, scrollOffset, after, ajaxLoader) {

    var internal = {
        init: function() {
            var self = this;
            self.scrollOffset = scrollOffset;
            self.collection = collectionJqueryObject;
            self.items = function() { return self.collection.children("." + self.itemClass); };
            self.quickViewType = quickViewType;
            self.after = after;
            self.ajaxLoader = ajaxLoader;
            self.url = (self.quickViewType == "collection") ? "/shops/wgshop/collectionquickview?categoryId=" : "/shops/wgshop/paintquickview?productId=";
            self.patternReplace = (self.quickViewType == "collection") ? "category_" : "product_";
            self.quickViewChildSelector = ".selectedItem";
            self.columns = Math.floor(self.collection.innerWidth() / self.items().first().outerWidth());
            self.rows = function() { return Math.ceil(self.items().length / self.columns); };
            collectionJqueryObject.off("click", ">." + self.itemClass + ">.quickViewLink, a.quickview-close");
            collectionJqueryObject.on(
                "click",
                ">." + self.itemClass + ">.quickViewLink, a.quickview-close",
                function(e) {
                    e.preventDefault();
                    self.clickHandler(e.currentTarget);
                    return false;
                });
        },
        ajaxTimeout: 30000,
        itemClass: "item",
        selectedClass: "selected",
        quickViewContainerTemplate: '<div class="selectedItemContainer"></div>',
        currentSelectedItem: null,
        selectedItemIndex: null,
        selectedItemRow: null,
        quickViewPlacement: null,
        ajaxReference: null,
        parentItem: null,

        collapse: function(jqueryObject, after) {
            jqueryObject.stop().animate({ height: 0 }, 400, function() {
                jqueryObject.remove();
                after(jqueryObject);
            });
        },

        scrollToElement: function(jqueryObject) {
            jqueryObject.ScrollTo({
                duration: 400,
                easing: "linear",
                offsetTop: this.scrollOffset
            });
        },

        expand: function(jqueryObject) {

        },

        clickHandler: function(anchor) {
            var self = this;
            self.items().filter("." + self.selectedClass).removeClass(self.selectedClass);
            var parentItem = $(anchor).closest("." + self.itemClass);
            if ($(anchor).hasClass("button-close")) {
                if (!$(anchor).parent().parent().hasClass("productCollections")) {
                    var selected = $("*[data-quick-view-id = " + $(this).parents("section").attr("id") + "]");
                    self.selectedItemRow = 9999;
                    $(".selectedItemContainer").stop().animate({ height: 0 }, 400, function() {
                        $(".selectedItemContainer").remove();
                        $("#share").remove();
                        $("#pinterestImages").remove();
                        selected.removeClass("selected");
                    });
                    return false;
                }
            } else {
                if (self.currentSelectedItem != null)
                    self.collapse(self.currentSelectedItem, function() {
                        self.currentSelectedItem = null;
                        $("#share").remove();
                        $("#pinterestImages").remove();
                        self.clickHandlerAfter(parentItem);
                    });
                else
                    self.clickHandlerAfter(parentItem);
            }
        },

        clickHandlerAfter: function(parentItem) {
            var self = this;
            var selectedItemIndex = self.items().index(parentItem) + 1;
            if (self.selectedItemIndex === selectedItemIndex) {
                self.selectedItemIndex = null;
                return;
            }

            self.selectedItemIndex = selectedItemIndex;

            self.parentItem = parentItem;

            self.selectedItemRow = Math.ceil(self.selectedItemIndex / self.columns);
            self.quickViewPlacement = (self.selectedItemRow * self.columns) - 1;

            var quickViewId = parentItem.data("quick-view-id");
            if (quickViewId != null) {
                var ajaxId = quickViewId.toString().replace(self.patternReplace, "");

                var skuCode = parentItem.data("productcode");
                var skuId = parentItem.data("skuid");
                var url = self.url + ajaxId;
                if (skuCode != null)
                    url = Redant.util.setQuerystring(url, "code", skuCode);

                if (skuId != null)
                    url = Redant.util.setQuerystring(url, "skuId", skuId);

                self.triggerAjax(url);
            }
        },

        placeholderStart: function(img) {
            var src = img.src;
            $(img).data("src", src);
            img.src = "/_images/placeholders/img-loader.gif";
            var imagePlaceholder = new Image();
            imagePlaceholder.src = src;
            imagePlaceholder.onload = function() {
                $(img).fadeOut("fast", function() {
                    $(img).attr("src", $(img).data("src"));
                    $(img).fadeIn("fast");
                });
            };
            imagePlaceholder.onerror = function() {
                $(img).fadeOut("fast", function() {
                    $(img).attr("src", $(img).data("src"));
                    $(img).fadeIn("fast");
                });
            };
        },
        triggerAjax: function(url) {
            var self = this;
            if (self.ajaxReference != null)
                self.ajaxReference.abort();
            var container = $(self.quickViewContainerTemplate);

            var loader = setTimeout(function() {
                self.parentItem.addClass(self.selectedClass);
                var ajaxLoaderTemplate = self.ajaxLoader.clone();
                var ajaxLoader = container.append(ajaxLoaderTemplate);
                self.currentSelectedItem = ajaxLoader;
                if (self.selectedItemRow == self.rows()) {
                    self.collection.append(ajaxLoader);
                } else {
                    self.items().eq(self.quickViewPlacement).after(ajaxLoader);
                }
                $(ajaxLoader).animate({ height: 110 }, 400);
            }, 1000);

            this.ajaxReference = $.ajax({
                url: url,
                timeout: self.ajaxTimeout,
                success: function(data) {
                    clearTimeout(loader);

                    self.currentSelectedItem = container.append(data);
                    self.currentSelectedItem.children(self.quickViewChildSelector).hide();

                    var images = self.currentSelectedItem.find("img");
                    for (var i = 0; i < images.length; i++) {
                        self.placeholderStart(images[i]);
                    }

                    if (Number(self.selectedItemRow) == Number(self.rows())) {
                        self.collection.append(self.currentSelectedItem);
                    } else {
                        self.items().eq(self.quickViewPlacement).after(self.currentSelectedItem);
                    }
                    $(".loading-container", self.currentSelectedItem).remove();
                    self.parentItem.addClass(self.selectedClass);

                    if (self.quickViewChildSelector != "") {
                        self.currentSelectedItem.children(self.quickViewChildSelector).show();
                        //self.currentSelectedItem.animate({ height: self.currentSelectedItem.children(self.quickViewChildSelector).outerHeight() }, 400, function () { self.after(); self.scrollToElement(self.currentSelectedItem); $(document).trigger("quickview:expanded"); });

                        if ($(".quickview-image").length) {
                            $(".quickview-image").height($(".quickview-image").width());
                        };

                        if ($(".related-images img").length) {
                            $(".related-images img").height($(".related-images img").width());
                        };
                        self.currentSelectedItem.animate({ height: self.currentSelectedItem.children(self.quickViewChildSelector).outerHeight() }, 400, function() {
                            self.after();
                            self.scrollToElement(self.currentSelectedItem);
                            $(document).trigger("quickview:expanded");
                        });
                    } else {
                        self.currentSelectedItem.children().show();
                        self.currentSelectedItem.animate({ height: self.currentSelectedItem.children().first().outerHeight() }, 400, function() {
                            self.after();
                            self.scrollToElement(self.currentSelectedItem);
                            $(document).trigger("quickview:expanded");
                        });
                    }
                    self.ajaxReference = null;

                }
            });
        }
    };
    internal.init();
};