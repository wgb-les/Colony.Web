var Scrapbook = function(el) {

    var Scrap = function(scrapbook, obj) {
        var exports = {
            scrapbook: scrapbook,
            scrapbookId: scrapbook.id,
            scrapbookItemId: obj.scrapbookItemId,
            name: obj.name,
            description: obj.description,
            skuId: obj.skuId,
            el: null,
            imageUrl: obj.imageUrl,
            imageAssetId: obj.imageAssetId,
            zIndex: obj.zIndex,
            rotation: obj.rotation,
            height: obj.height,
            width: obj.height,
            top: obj.top,
            left: obj.left,
            attributes: obj.attributes,
            isOnCanvas: obj.isOnCanvas,

            update: function() {
                var css = "z-index: " + this.zIndex + "; left: " + this.left + "px; top: " + this.top + "px; position: absolute; width: " + this.width + "px; height: " + this.height + "px;transform: rotate(" + this.rotation + "rad);-webkit-transform: rotate(" + this.rotation + "rad);";
                if (!this.el) {
                    this.el = $('<div id="scrap' + this.scrapbookItemId + '" data-id="' + this.scrapbookItemId + '" class="scrapbook-scrap"><img class="inner" src="' + this.imageUrl + '"/></div>');
                    $(this.scrapbook.el).append(this.el);
                }
                this.el.attr("style", css);
                if (!this.isOnCanvas) {
                    this.el.hide();
                } else {
                    this.el.show();
                }
            },

            toJSON: function() {
                var that = this;
                return {
                    scrapbookId: that.scrapbookId,
                    scrapbookItemId: that.scrapbookItemId,
                    skuId: that.skuId,
                    imageUrl: that.imageUrl,
                    imageAssetId: that.imageAssetId,
                    name: that.name,
                    description: that.description,
                    code: that.code,
                    zIndex: that.zIndex,
                    rotation: that.rotation,
                    height: that.height,
                    width: that.width,
                    top: that.top,
                    left: that.left
                };
            }
        };
        return exports;
    };
    var ajaxSaveReference = null;
    var exports = {
        el: el,
        id: 0,
        name: "",
        scraps: [],
        pinterestUrl: "",
        twitterUrl: "",
        facebookUrl: "",
        shareUrl: "",
        isReadOnly: false,
        studioListingTemplate: null,
        moodboardListingTemplate: null,
        previousState: null,

        toJSON: function(key, value) {
            var clone = {
                id: this.id,
                name: this.name,
                items: [],
                pinterestUrl: this.pinterestUrl,
                twitterUrl: this.twitterUrl,
                facebookUrl: this.facebookUrl,
                isReadOnly: this.isReadOnly,
                shareUrl: this.shareUrl
            };
            for (var i = 0; i < this.scraps.length; i++) {
                clone.items.push(this.scraps[i].toJSON());
            }
            return clone;
        },
        loadStudioListingTemplate: function() {
            return $.get("/_js/template/scrapbookItemsScrap.html");
        },
        loadMoodboardListingTemplate: function() {
            return $.get("/_js/template/moodboardItemsScrap.html");
        },
        loadFromServer: function(id) {
            var that = this;
            that.el.find(".scrapbook-scrap").remove();
            var deferred = $.Deferred();
            $.ajax({
                url: "/scrapbook/moodboards/scrapbookdata/",
                data: "scrapbookId=" + id,
                type: "GET",
                async: true,
                xhrFields: { withCredentials: true },
                success: function(json) {
                    if (json) {
                        that.id = json.id;
                        that.name = json.name;
                        that.pinterestUrl = json.pinterestUrl;
                        that.twitterUrl = json.twitterUrl;
                        that.facebookUrl = json.facebookUrl;
                        that.shareUrl = json.shareUrl;
                        that.scraps = [];
                        that.isReadOnly = json.isReadOnly;
                        if (json.items) {
                            for (var i = 0; i < json.items.length; i++) {
                                var scrap = new Scrap(that, json.items[i]);
                                if (scrap.zIndex === 0)
                                    scrap.zIndex = i;
                                that.scraps.push(scrap);
                            }
                        }
                        if (that.isReadOnly) {
                            $("#scrapbookName").replaceWith('<div id="scrapbookName">' + that.name + "</div>");
                        }
                        deferred.resolve();
                    }
                },
                error: function() {
                    deferred.reject();
                }
            });
            return deferred.promise();
        },
        loadStudioListing: function() {
            var that = this;
            var deferred = $.Deferred();
            $.ajax({
                url: "/actionuri/studio/studio/listajax/",
                type: "GET",
                async: true,
                xhrFields: { withCredentials: true },
                success: function(json) {
                    if (json) {
                        that.studio = json;
                        that.updateStudioListing();
                        deferred.resolve();
                    }
                },
                error: function() {
                    deferred.reject();
                }
            });
            return deferred.promise();
        },

        saveToServer: function() {
            var that = this;
            if (ajaxSaveReference != null)
                ajaxSaveReference.abort();
            $(".scrapbook-status").text("Saving moodboard.  Please wait...");
            if (this.id > 0) {

                ajaxSaveReference = $.ajax({
                    url: "/scrapbook/moodboards/updatescrapbookdata",
                    data: JSON.stringify(this),
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    async: true,
                    success: function(json) {
                        console.log(json);
                        that.id = json.id;
                        that.name = json.name || "";
                        that.pinterestUrl = json.pinterestUrl;
                        that.twitterUrl = json.twitterUrl;
                        that.facebookUrl = json.facebookUrl;
                        that.shareUrl = json.shareUrl;
                        $(".scrapbook-status").text("");
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        if (errorThrown !== "abort")
                            $(".scrapbook-status").text("Error saving moodboard.");
                        else
                            $(".scrapbook-status").text("");
                    }
                });
            } else {
                $(".scrapbook-status").text("Saving moodboard.  Please wait...");
                ajaxSaveReference = $.ajax({
                    url: "/scrapbook/moodboards/addscrapbook",
                    data: "scrapbookName=" + that.name || "",
                    type: "POST",
                    async: true,
                    success: function(json) {
                        that.id = json.id;
                        that.name = json.name || "";
                        that.pinterestUrl = json.pinterestUrl;
                        that.twitterUrl = json.twitterUrl;
                        that.facebookUrl = json.facebookUrl;
                        that.shareUrl = json.shareUrl;
                        $(".scrapbook-status").text("");
                        that.saveToServer();
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        if (errorThrown !== "abort")
                            $(".scrapbook-status").text("Error saving moodboard.");
                        else
                            $(".scrapbook-status").text("");
                    }
                });
                return ajaxSaveReference;
            }
        },
        findScrap: function(id) {
            return _.find(this.scraps, function(t) { return (t.scrapbookItemId === id); });
        },
        findScrapsAhead: function(scrap) {
            return _.sortBy(_.filter(this.scraps, function(t) { return (t.zIndex > scrap.zIndex); }), function(t) { return t.zIndex; });
        },
        findScrapsBehind: function(scrap) {
            return _.sortBy(_.filter(this.scraps, function(t) { return (t.zIndex < scrap.zIndex); }), function(t) { return t.zIndex; });
        },
        moveBackward: function(id) {
            var scrap = this.findScrap(id);
            var scrapsBehind = this.findScrapsBehind(scrap);
            if (scrapsBehind.length > 0) {
                scrapsBehind[scrapsBehind.length - 1].zIndex++;
                scrap.zIndex--;
                this.update();
            }
        },
        moveForward: function(id) {
            var scrap = this.findScrap(id);
            var scrapsAhead = this.findScrapsAhead(scrap);
            if (scrapsAhead.length > 0) {
                scrapsAhead[0].zIndex--;
                scrap.zIndex++;
                this.update();
            }
        },
        moveToBack: function(id) {
            var scrap = this.findScrap(id);
            var scrapsBehind = this.findScrapsBehind(scrap);
            if (scrapsBehind.length > 0) {
                scrap.zIndex = scrapsBehind[0].zIndex;
                for (var i = 0; i < scrapsBehind.length; i++)
                    scrapsBehind[i].zIndex++;
                this.update();
            }
        },
        moveToFront: function(id) {
            var scrap = this.findScrap(id);
            var scrapsAhead = this.findScrapsAhead(scrap);
            if (scrapsAhead.length > 0) {
                scrap.zIndex = scrapsAhead[scrapsAhead.length - 1].zIndex;
                for (var i = 0; i < scrapsAhead.length; i++)
                    scrapsAhead[i].zIndex--;
                this.update();
            }
        },
        addScrap: function(itm, left, top) {
            var that = this;
            if (that.id === 0) $.when(that.saveToServer()).done(function(t) { that.addScrapInner(that, itm, left, top); });
            else that.addScrapInner(that, itm, left, top);
        },
        addScrapInner: function(that, itm, left, top) {
            if (itm.data("scrapbookitemid")) {
                var scrap = that.findScrap(itm.data("scrapbookitemid"));
                scrap.rotation = 0;
                scrap.left = left;
                scrap.top = top;
                scrap.height = scrap.width = 120;
                scrap.isOnCanvas = true;
                that.update();
            } else {
                var scrap = new Scrap(that, { skuId: itm.data("skuid"), imageAssetId: itm.data("imageassetid"), imageUrl: itm.find("img").attr("src"), rotation: 0, left: left, top: top, height: 120, width: 120, isOnCanvas: true });
                $.ajax({
                    url: "/scrapbook/moodboards/additem",
                    data: JSON.stringify(scrap),
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    async: true,
                    success: function(json) {
                        $.extend(scrap, json);
                        that.scraps.push(scrap);
                        that.update();
                        $(".scrapbook-status").text();
                    },
                    error: function() {
                        console.log("Error saving moodboard");
                    }
                });
            }
        },
        removeScrap: function(id) {
            var that = this;
            var scrap = that.findScrap(id);
            scrap.el.fadeOut("fast", function() {
                scrap.isOnCanvas = false;
                scrap.left = scrap.top = null;
                that.update();
            });
        },
        update: function() {
            var that = this;
            var html = "";
            for (var i = 0; i < this.scraps.length; i++) {
                this.scraps[i].update();
                html += this.moodboardListingTemplate(this.scraps[i]);
            }

            $("#scrapbookName").val(that.name);
            if (!that.isReadOnly) {
                var newState = JSON.stringify(that);
                if (!that.previousState || that.previousState != newState) {
                    console.log("State has changed.  Saving to server");
                    that.saveToServer();

                }
            }
            that.previousState = newState;

            $("#moodboardItems").html(html);
            if (!that.isReadOnly) {
                this.setDraggable($("#moodboardItems"));
                $("#scrapbookInner").droppable({
                    accept: ".item.scrapAdd",
                    drop: function(e, ui) {
                        var itm = $(ui.draggable);
                        var parent = $("#scrapbookInner");
                        var left = ui.offset.left - parent.offset().left;
                        var top = ui.offset.top - parent.offset().top;
                        console.log(ui);

                        that.addScrap(itm, left, top);
                    }
                });
                $("#scrapbookName").on("keyup", function(e) {
                        that.name = $(this).val();
                    })
                    /*.on('blur', function(e) {
                        that.saveToServer();
                    })*/;
                $(".scrapbook-scrap")
                    .off("click")
                    .on("click", function(e) {
                        e.preventDefault();
                        $(".selected").removeClass("selected");
                        $(this).addClass("selected");
                        $(this)
                            .resizable({
                                aspectRatio: true,
                                helper: "ui-resizable-helper",
                                handles: "se",
                                stop: function(event, ui) {
                                    var size = ui.size;
                                    var scrap = that.findScrap($(event.target).data("id"));
                                    scrap.height = size.height;
                                    scrap.width = size.width;
                                    that.update();
                                }
                            })
                            .rotatable({
                                stop: function(event, ui) {
                                    var angle = ui.angle;
                                    var scrap = that.findScrap($(event.target).data("id"));
                                    scrap.rotation = angle.current;
                                    that.update();
                                }
                            });
                        return false;
                    })
                    .draggable({
                        containment: "#scrapbookInner",
                        //start: function (event, ui) {
                        //	$(this).data("startingScrollTop",window.pageYOffset);
                        //},
                        //drag: function(event,ui){
                        //	var st = parseInt($(this).data("startingScrollTop"));
                        //	ui.position.top -= st;
                        //},
                        stop: function(event, ui) {
                            var pos = ui.position;
                            var scrap = that.findScrap($(event.target).data("id"));
                            scrap.top = pos.top;
                            scrap.left = pos.left;
                            that.update();
                        }
                    })
                    .disableSelection();
            }
        },
        updateStudioListing: function() {
            var html = "";
            for (var i = 0; i < this.studio.Items.length; i++) {
                html += this.studioListingTemplate(this.studio.Items[i]);
            }
            $("#scrapbookItems").html(html);
            if (!this.isReadOnly)
                this.setDraggable($("#scrapbookItems"));

        },
        setDraggable: function(elParent) {
            $(".item", elParent).draggable({
                cancel: "a.plus,a.remove",
                revert: "invalid",
                //start: function (event, ui) {
                //	$(this).data("startingScrollTop",window.pageYOffset);
                //},
                //drag: function(event,ui){
                //	var st = parseInt($(this).data("startingScrollTop"));
                //	ui.position.top -= st;
                //},
                helper: function(event) {
                    var clone = $('<img src="' + $(this).find("img").attr("src") + '" height="120" width="120"/>');
                    return clone;
                },
                cursor: "move"
            });
        },
        init: function(id) {
            var that = this;
            if (typeof id != "undefined" && id != null && id != 0) {
                $.when(that.loadFromServer(id), that.loadStudioListingTemplate(), that.loadMoodboardListingTemplate()).done(function(p1, p2, p3) {
                    that.studioListingTemplate = _.template(p2[0]);
                    that.moodboardListingTemplate = _.template(p3[0]);
                    that.loadStudioListing();
                    that.initialised();
                });
            } else {
                $.when(that.loadStudioListingTemplate(), that.loadMoodboardListingTemplate()).done(function(p1, p2) {
                    that.studioListingTemplate = _.template(p1[0]);
                    that.moodboardListingTemplate = _.template(p2[0]);
                    that.loadStudioListing();
                    that.initialised();
                });
            }
        },
        initialised: function() {
            var that = this;
            that.update();

            if (that.isReadOnly) {
                $("#btnMoveToFront, #btnMoveToBack, #btnMoveForward, #btnMoveBackward, #btnRemove, #btnSave").remove();
            }

            $(document).on("click", ".scrapbook-button", function(e) {
                    e.preventDefault();
                    var id = $(".selected").data("id");
                    switch (e.currentTarget.id) {
                    case "btnMoveToFront":
                        that.moveToFront(id);
                        break;
                    case "btnMoveToBack":
                        that.moveToBack(id);
                        break;
                    case "btnMoveForward":
                        that.moveForward(id);
                        break;
                    case "btnMoveBackward":
                        that.moveBackward(id);
                        break;
                    case "btnRemove":
                        that.removeScrap(id);
                        break;
                    case "btnSave":
                        that.saveToServer();
                        break;
                    case "btnPrint":
                        window.print();
                        break;
                    case "btnShare":
                        $("#share").foundation("reveal", "open");
                        break;
                    case "btnOrder":
                        $("#scrapBookSamples").foundation("reveal", "open", { url: "/actionuri/scrapbook/scrapbook/products/?scrapbookId=" + that.id });
                        break;
                    }
                    return false;
                })
                .on("click", ".productList .item .remove", function(e) {
                    e.preventDefault();
                    that.removeScrap($(e.currentTarget).parents(".item").data("scrapbookitemid"));
                    return false;
                })
                .on("click", ".productList .item .plus", function(e) {
                    e.preventDefault();
                    var itm = $(e.currentTarget).parents(".item");
                    that.addScrap(itm, ((that.el.width() / 2) - 60), ((that.el.height() / 2) - 60));
                    return false;
                })
                .on("click", "#scrapBookSamples .productList .item", function(event) {
                    event.preventDefault();
                    if ($(this).hasClass("selected")) {
                        $(this).removeClass("selected");
                    } else {
                        $(this).addClass("selected");
                        $("#noItemsSelected").hide();
                    }
                    return false;
                })
                .on("click", "#scrapBookSamples #selectAllProducts", function(event) {

                    $("#scrapBookSamples .productList .item").each(function(event) {
                        if ($(this).hasClass("selected")) {
                            $(this).removeClass("selected");
                        } else {
                            $(this).addClass("selected");
                            $("#noItemsSelected").hide();
                        }
                    });
                })
                .on("click", "#scrapBookSamples .AddToBasket", function(event) {
                    var skus = [];

                    if ($("#scrapBookSamples .productList .item.selected").length == 0) {
                        $("#noItemsSelected").show();
                    }

                    $("#scrapBookSamples .productList .item.selected").each(function(event) {
                        skus.push($(this).data("skuid"));
                    });

                    if (skus.length > 0) {
                        var overlay = $('<div id="overlay" style="width: 100%;height: 100%;background-color: #666;opacity: 0.5;display: block;position: fixed;left: 0;top: 0;z-index: 9999;"></div>');
                        overlay.append(Redant.util.ajaxLoader());
                        $("body").append(overlay);
                        $("#noItemsSelected").hide();
                        var url = "/basket/action/?command=add&skuid=" + skus.join(",");
                        $.get(url, function(data) {
                            $("body .notification").remove();
                            $("#overlay").remove();
                            if (data.Status === "Successful") {
                                $('<div class="notification"><h2 class="icon-shopping-cart">&#160;Item(s) Added to Basket</h2></div>').prependTo("body");
                                $("#scrapBookSamples").foundation("reveal", "close");
                                that.update();
                                getMiniBasketPartial();
                            } else {
                                var errors = [];
                                $.each(data.BasketErrors, function(index, error) {
                                    errors.push(error.Message);
                                });
                                $("#basketErrors").html(errors.join("<br/><br/>"));
                                $("#basketErrors").show();
                            }
                            $(".notification").animate({ right: "0px", avoidCSSTransitions: true }, 500, function() {});
                            setTimeout(function() {
                                $(".notification").animate({ right: "-1000px", avoidCSSTransitions: true }, 500, function() {});
                            }, 6000);
                            jQuery.fx.interval = 20;
                        });
                    } else {
                        $("#noItemsSelected").show();
                    }
                    return false;
                });

            if (Redant.util.browser.isTablet() || Redant.util.browser.isMobile()) {
                $("#scrapbook").addClass("hover");

            } else {
                $(document).on("mouseover", "#scrapbook", function(e) {
                        $(this).addClass("hover");
                    })
                    .on("mouseout", "#scrapbook", function(e) {
                        $(this).removeClass("hover");
                    });
            }
        }
    };

    return exports;
};