_.templateSettings.variable = "rc";
var selectedItem;
var saveTimer;
var disableAjaxCall;
var isMoving;
var touch;

var Scrapbook = function(data) {
    this.id = 0;
    this.name = "";
    this.items = data != null ? new ScrapCollection(data.items) : new ScrapCollection();

    for (var prop in data) this[prop] = data[prop];
};
var ScrapCollection = function(items) {
    var collection = [];
    for (var item in items) {
        collection.push(new Scrap(items[item]));
    }

    return collection;
};
var Scrap = function(item) {
    this.scrapbookItemId = null,
        this.zIndex = 0,
        this.name = "",
        this.description = "",
        this.imageUrl = "",
        this.top = 0,
        this.left = 0,
        this.height = 0,
        this.width = 0,
        this.rotation = 0,
        this.scrapbookId = null,
        this.skuId = null,
        this.imageAssetId = null,
        this.isOnCanvas = false;
    for (var prop in item) this[prop] = item[prop];
};
var ScrapList = function(data) {
    this.items = new ScrapCollection(data);
};
var scraps;
var scrapbook = new Scrapbook();

function setScrapbookItem(element, scrapbookItem) {
    scrapbookItem.scrapbookItemId = parseInt(element.data("scrapbookitemid"));

    var skuId = parseInt(element.data("skuid") || scrapbookItem.skuId);
    scrapbookItem.skuId = skuId;

    scrapbookItem.description = element.data("description") || scrapbookItem.description;

    var imageAssetId = parseInt(element.data("imageassetid") || parseInt(element.attr("data-imageassetid")) || scrapbookItem.imageAssetId);
    scrapbookItem.imageAssetId = imageAssetId;

    var zIndex = parseInt(element.css("z-index"));
    scrapbookItem.zIndex = zIndex;

    var top;
    var left;
    var height;
    var width;

    if (!element.hasClass("deleted")) {
        top = parseInt(element.css("top"));
        left = parseInt(element.css("left"));
        height = parseInt($(".ui-wrapper", element).height());
        width = parseInt($(".ui-wrapper", element).width());
        scrapbookItem.isOnCanvas = true;
    } else {
        top = null;
        left = null;
        height = null;
        width = null;
        scrapbookItem.isOnCanvas = false;
    }
    scrapbookItem.top = top;
    scrapbookItem.left = left;
    scrapbookItem.height = height;
    scrapbookItem.width = width;

    var rotation = getAngle($(".ui-wrapper", element));
    scrapbookItem.rotation = rotation;

    scrapbookItem.scrapbookId = $("#ScrapbookId").val();

    var img = $("#scrapBook .added .scrapInner img");
    scrapbookItem.img = img.attr("src");

    return scrapbookItem;
}

function pushToServer(url, data, async, callback) {
    var loader = Redant.util.ajaxLoader();
    $("body").append(loader);
    loader.css({ 'z-index': "9999", 'bottom': "40px" });
    loader.show();
    $(".save-scrapbook").text("Saving!");
    //if (scrapbookSaveXhr)
    //    scrapbookSaveXhr.abort();
    scrapbookSaveXhr = $.ajax({
        url: url,
        data: data,
        type: "POST",
        async: async,
        contentType: "application/json",
        success: function(json) {
            if (callback) {
                callback(json);
            }
            requestTimeout(function() {
                $(".save-scrapbook").text("Saved!");
            }, 1300);

            requestTimeout(function() {
                $(".save-scrapbook").text("Save");
            }, 3000);
            loader.fadeOut();
            loader.remove();
        }
    });
}

function createScrapbook() {
    var data = JSON.stringify(scrapbook);
    pushToServer("/scrapbook/moodboards/createscrapbookdata", data, false, function(json) {
        refreshFields(json);
    });
}

function updateScrapbook() {
    var data = JSON.stringify(scrapbook);
    pushToServer("/scrapbook/moodboards/updatescrapbookdata", data, false, function(json) {
        refreshFields(json);
    });
}

function refreshFields(json) {
    $("#ScrapbookId").val(json.id);
    scrapbook.id = json.id;
    scrapbook.name = json.name;

    document.title = "Moodboard - " + (scrapbook.name || "New Moodboard");
    $(".breadcrumb li").last().text(scrapbook.name || "New Moodboard");

    $("#share form").attr("action", "/Sharing/Share/SendToAFriend?shareUrl=" + encodeURIComponent(json.shareUrl));
    $(".shareOptions .twitter").attr("href", json.twitterUrl);
    $(".shareOptions .facebook").attr("href", json.facebookUrl);
    $(".shareOptions .pinterest, .scrapControls #pinterestShare").attr("href", json.pinterestUrl);

    $("#shareButton").show().css("display", "");
}

function addScrapbookItem(scrapElement, callback) {
    if (scrapbook.id == 0) {
        createScrapbook();
    }

    scrapbookItem = new Scrap();
    setScrapbookItem(scrapElement, scrapbookItem);

    var viewModel = JSON.stringify(scrapbookItem);
    var url = "/scrapbook/moodboards/additem";

    pushToServer(url, viewModel, true, function(json) {
        scrapbook.items.push(new Scrap(json));

        var scrapbookItemId = json.scrapbookItemId;
        scrapElement.data("scrapbookitemid", scrapbookItemId).attr("id", "scrapbookItem_" + scrapbookItemId);
        scrapElement.attr("data-scrapbookitemid", scrapbookItemId);
        $('div[id^="scrapbookItemInner_"]', scrapElement).attr("id", "scrapbookItemInner_" + scrapbookItemId);

        if (callback) {
            callback();
        }
        refreshScrapbookList();
        getProducts();
    });
}

var scrapbookSaveXhr;

function saveScrapbookItem(scrapElement, callback) {
    var scrapbookItemId = $(scrapElement).data("scrapbookitemid");

    if (scrapbookItemId == "" || scrapbookItemId == null || scrapbookItemId == "undefined") {
        return addScrapbookItem(scrapElement, callback);
    }
    var scrapbookItem = getScapbookItem(scrapbookItemId);
    if (scrapbookItem != null) {
        setScrapbookItem(scrapElement, scrapbookItem);

        var viewModel = JSON.stringify(scrapbookItem);
        var url = "/scrapbook/moodboards/updateitem";

        scrapbookSaveXhr = pushToServer(url, viewModel, true, function(json) {
            if (callback) {
                callback();
            }

            for (var i in scrapbook.items) {
                if (scrapbook.items[i].scrapbookItemId == json.scrapbookItemId) {
                    scrapbook.items[i] = json;
                    break; //Stop this loop, we found it!
                }
            }
            refreshScrapbookList();
            getProducts();
        });
    }
}

function getScapbookItem(scrapbookItemId) {
    var itemId = scrapbookItemId;
    if (itemId == null) {
        var element = $("#scrapBook .scrap.selected");
        itemId = element.data("scrapbookitemid");
    }

    itemId = parseInt(itemId);
    var result = scrapbook.items.filter(function(e) {
        return e.scrapbookItemId == itemId;
    });

    return result.length == 0 ? null : result[0];
}

function initialize() {
    if (!isMoving) {
        if (scrapbook.items.length > 0) {
            var template = _.template(
                $("script.scrapbookTemplate").html()
            );

            $("#scrapBook").html(
                template({ scrapbookItems: scrapbook.items })
            );

            $(selectedItem).trigger("mousedown");
            $.each(scrapbook.items, function() {
                if (this.isOnCanvas) {
                    $("#scrapControls").fadeIn(300);
                }
            });
        }

        initializeScrapbookDraggables();

        $("#scrapBook .scrap").each(function() {
            var drWr = $(this),
                rsWr = $(this).find(".scrapInner"),
                elem = $(this).find(".scrapInner img");
            var scrapbookItemId = drWr.data("scrapbookitemid");
            var scrapbokItem = getScapbookItem(scrapbookItemId);
            var rotation = scrapbokItem != null ? scrapbokItem.rotation : 0;
            elem.resizable({
                aspectRatio: true,
                handles: "se",
                minHeight: 120,
                minWidth: 120,
                resize: function(event, ui) {
                    if (touch == false) {
                        $(this).css({
                            'top': parseInt(ui.position.top, 10) + ((ui.originalSize.height - ui.size.height)) / 2,
                            'left': parseInt(ui.position.left, 10) + ((ui.originalSize.width - ui.size.width)) / 2
                        });
                    }
                },
                stop: function(e, ui) {
                    saveScrapbookItem($(ui.helper).closest("div.scrap"));
                }
            });
            drWr.draggable({
                revert: false,
                containment: $("#scrapBook"),
                start: function() {
                    console.log("dragging");
                    $("body").bind("touchmove", function(e) { e.preventDefault() });
                },
                stop: function(e, ui) {
                    saveScrapbookItem(ui.helper);
                    $("body").unbind("touchmove");
                }
            });
            elem.parent().rotatable({
                mtx: getMatrix(-rotation)
            });

        });

        $("#scrapBook").droppable({
            accept: function(d) {
                if (d.hasClass("scrapAdd") || (d.attr("id") == "bar")) {
                    return true;
                }
            },
            drop: handleMoodboardDrop
        });

        $(".scrap:not('.added')").draggable("disable");
        $(".productList.scrapBookList .item.greyOut").draggable("disable");

        if (selectedItem)
            setSelectedScrap(selectedItem);
    }
}

function initializeScrapbookDraggables() {
    if ($("#draggables").length == 0) {
        $("body").prepend('<div id="draggables"></div>');
    }
    $(".scrapBookList.scrapBookList .item").draggable({
        appendTo: "#draggables",
        helper: function() {
            $copy = $(this).clone();
            return $copy;
        },
        cursor: "move",
        revert: "invalid",
        zIndex: 999999999,
        start: function(event, ui) {
            ui.helper.css("width", "200px");
            ui.helper.css("height", "200px");
            ui.helper.find("ul").remove();
            ui.helper.find("h3").remove();
            ui.helper.find("div.actions").remove();
        }
    });
}

function handleMoodboardDrop(event, ui) {
    var clone = ui.draggable.clone();

    var scrapBook = $("#scrapBook");
    var zIndex = $(scrapBook).find(".scrap").length;

    var scrapbookItemId = clone.data("scrapbookitemid");
    var skuId = clone.data("skuid");
    var imageAssetId = clone.data("imageassetid");
    var description = clone.find("h3").text();

    clone.find("ul").remove();
    clone.find("h3").remove();
    clone.removeClass("scrapAdd");
    // remove the existing item
    $("#scrapbookItem_" + scrapbookItemId).remove();

    var image = clone.find("img").css({ height: 200, width: 200, margin: 0, resize: "none", position: "static", zoom: 1, display: "block" });
    var imgSrc = $(image).data("image-zoom");
    if (imgSrc != null) {
        image.attr("src", imgSrc);
    }
    image.addClass("ui-resizable");

    var template = _.template(
        $("script.scrapbookTemplate").html()
    );

    var scrapbookItems = [];
    var scrapbookItem = new Scrap();
    scrapbookItem.height = 200;
    scrapbookItem.width = 200;
    scrapbookItem.left = (ui.offset.left - 70);
    scrapbookItem.top = (ui.offset.top - 164);
    scrapbookItem.scrapbookItemId = scrapbookItemId;
    scrapbookItem.skuId = skuId;
    scrapbookItem.imageAssetId = imageAssetId;
    scrapbookItem.zIndex = zIndex;
    scrapbookItem.imageUrl = image.attr("src");
    scrapbookItem.description = description;

    scrapbookItems.push(scrapbookItem);

    var newItem = $(template({ scrapbookItems: scrapbookItems }));

    var drWr = newItem,
        rsWr = $(".scrapInner", newItem),
        elem = $(".scrapInner img, .scrapInner span, .scrapInner a", newItem);

    elem.resizable({
        aspectRatio: true,
        handles: "se",
        minHeight: 120,
        minWidth: 120,
        resize: function(event, ui) {
            if (touch == false) {
                $(this).css({
                    'top': parseInt(ui.position.top, 10) + ((ui.originalSize.height - ui.size.height)) / 2,
                    'left': parseInt(ui.position.left, 10) + ((ui.originalSize.width - ui.size.width)) / 2
                });
            }
        },
        stop: function(e, ui) {
            saveScrapbookItem($(ui.helper).closest("div.scrap"));
        }
    });

    drWr.draggable({
        revert: false,
        containment: $("#scrapBook")
    });

    elem.parent().rotatable();

    saveScrapbookItem(newItem, function() {
        $("#scrapBook").append(newItem);
        $("#scrapControls").fadeIn(300);

        setSelectedScrap(newItem);

        $(".scrapBoobWelcome").fadeOut(400, function() {
            $(this).remove();
        });
    });
}

function getProducts() {
    var url = "/scrapbook/moodboards/products";

    var scrapbookId = $("#ScrapbookId").val();

    if (scrapbookId == null)
        scrapbookId = 0;

    return $.ajax({
        url: url,
        data: { scrapbookId: scrapbookId },
        cache: false,
        success: function(data) {
            $("#productsListContainer").html(data);
            if (data != null && data != "") {
                $("a.sample").show();
            }
        }
    });
}

function getScrapbook() {
    var url = "/scrapbook/moodboards/scrapbookdata";
    var scrapbookId = $("#ScrapbookId").val() || 0;
    if (scrapbookId != null && scrapbookId != 0) {
        return $.ajax({
            url: url,
            data: { scrapbookId: scrapbookId },
            cache: false,
            success: function(data) {
                scrapbook = new Scrapbook(data);
                initialize();
            }
        });
    }
}

function refreshScrapbookList() {
    var url = "/scrapbook/moodboards/scrapbookitemslist";
    var scrapbookId = $("#ScrapbookId").val() || 0;
    if (scrapbookId != null && scrapbookId != 0) {
        return $.ajax({
            url: url,
            data: { scrapbookId: scrapbookId },
            cache: false,
            success: function(data) {
                $("#itemsInScrapbook").replaceWith(data);
                setCarousels();
                initializeScrapbookDraggables();
            }
        });
    }
}

function getAngle(el) {
    var tr = el.css("-webkit-transform") ||
        el.css("-moz-transform") ||
        el.css("-ms-transform") ||
        el.css("-o-transform") ||
        el.css("transform") ||
        null;

    // With rotate(30deg)...
    // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
    //console.log('Matrix: ' + tr);

    // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix
    if (tr) {
        var values = tr.split("(")[1].split(")")[0].split(",");

        var a = values[0],
            b = values[1],
            c = values[2],
            d = values[3];

        var scale = Math.sqrt(a * a + b * b);

        // arc sin, convert from radians to degrees, round
        var sin = b / scale;
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

        // works!
        //console.log('Rotate: ' + angle + 'deg');
        return angle;
    }
    return 0;

}

// Convert from Degrees to Radians
function degToRad(d) {
    return (d * (Math.PI / 180));
};

// Convert from Radians to Degrees
function radToDeg(r) {
    return (r * (180 / Math.PI));
};

// get the matrix from a given angle
function getMatrix(degree) {
    var cos = Math.cos(degToRad(-degree)),
        sin = Math.sin(degToRad(-degree)),
        mtx = [cos, sin, (-sin), cos];

    return mtx;
}

function setSelectedScrap(element) {
    $("#scrapBook .scrap").removeClass("selected");
    var scrapbookItemId = $(element).data("scrapbookitemid");
    selectedItem = $('.scrap[data-scrapbookitemid="' + scrapbookItemId + '"]');
    $(selectedItem).addClass("selected");

    $(selectedItem).addClass("border-dashed");
    $(".selected .ui-resizable-handle, .selected .rotatable-handle").fadeIn();
}

$(document).ready(function() {
    touch = Redant.util.browser.isTouchDevice();

    $(document.body).on("click", ".item .actions a.plus", function(e) {
        e.preventDefault();
        e.stopPropagation();

        var item = $(this).closest(".item");

        if (item != null) {
            var $scrapBook = $("#scrapBook");
            var tempItem = $(item).clone();
            var $tempItem = $(tempItem);

            $tempItem.css({ 'z-index': -1, 'top': 200, 'left': 200, 'position': "absolute" });

            $tempItem.appendTo("body");
            handleMoodboardDrop({}, { draggable: $tempItem, offset: $tempItem.offset() });

            $("html, body").animate({ scrollTop: $scrapBook.position().top - $("#header").outerHeight() }, 1000);
        }

        return false;
    });

    $(".save-scrapbook").click(function() {
        scrapbook.name = $("#scrapbookName").val();
        $(this).text("Saving");
        if (scrapbook.id == 0) {
            createScrapbook();
        } else {
            updateScrapbook();
        }
        requestTimeout(function() {
            $(".save-scrapbook").text("Saved!");
        }, 1300);

        requestTimeout(function() {
            $(".save-scrapbook").text("Save");
        }, 3000);
        return false;
    });


    $(document.body).on("mousedown", "#scrapBook .scrap", function(event) {
        setSelectedScrap(this);
        event.stopPropagation();
    });

    setTimeout(function() {
        $("#scrapBookContainer").animate({ height: 480 }, 400, function() {
            $(".loading-scrapbook").fadeOut();
        });
    }, 3000);

    if (touch == false) {
        $("#scrapBookContainer").mouseenter(function() {
            $("#scrapControls, .selected .ui-resizable-handle, .selected .rotatable-handle").fadeIn();
            $(".scrap.selected").addClass("border-dashed");
        }).mouseleave(function() {
            $("#scrapControls, .selected .ui-resizable-handle, .selected .rotatable-handle").fadeOut();
            $(".scrap.selected").removeClass("border-dashed");
        });
    } else {
        //alert('test');
        $("#scrapControls").show();
    }

    $(document.body).on("click", "#scrapBookSamples .productList .item", function(event) {
        event.preventDefault();
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
        } else {
            $(this).addClass("selected");
            $("#noItemsSelected").hide();
        }
        return false;
    });

    $(document.body).on("click", "#scrapBookSamples #selectAllProducts", function(event) {

        $("#scrapBookSamples .productList .item").each(function(event) {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                $(this).addClass("selected");
                $("#noItemsSelected").hide();
            }
        });
    });

    $(document.body).on("click", "#printButton", function(event) {
        event.preventDefault();

        $("#print-info").foundation("reveal", "open");
    });

    $(document.body).on("click", "#shareButton", function(event) {
        event.preventDefault();

        $("#share").foundation("reveal", "open");
    });

    $(document.body).on("click", "a.button.sample", function(event) {
        event.preventDefault();

        $("#scrapBookSamples").foundation("reveal", "open");
    });

    $(document.body).on("click", "#scrapBookSamples .AddToBasket", function(event) {
        var skus = [];

        if ($("#scrapBookSamples .productList .item.selected").length == 0) {
            $("#noItemsSelected").show();
        }

        $("#scrapBookSamples .productList .item.selected").each(function(event) {
            skus.push($(this).data("skuid"));
        });

        if (skus.length > 0) {
            $("#noItemsSelected").hide();
            var url = "/basket/action/?command=add&skuid=" + skus.join(",");
            $.get(url, function(data) {
                $("body .notification").remove();
                if (data.Status === "Successful") {
                    $('<div class="notification"><h2 class="icon-shopping-cart">&#160;Item(s) Added to Basket</h2></div>').prependTo("body");
                    $("#scrapBookSamples").foundation("reveal", "close");
                    getProducts();
                    getMiniBasketPartial();
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
                }, 6000);
                jQuery.fx.interval = 20;
            });
        } else {
            $("#noItemsSelected").show();
        }
        return false;
    });

    $.when(getScrapbook()).done(function() {
        initialize();
    });

    $("#scrapbookName").keyup(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) { //Enter keycode
            scrapbook.name = $(this).val();
            if (scrapbook.id == 0) {
                createScrapbook();
            } else {
                updateScrapbook();
            }

            $("#scrapbookName").blur();
        }
    });

    $(document.body).on("click", "#scrapControls .button", function(e) {

        var $element = $(".scrap.selected");

        var $siblings = $element.siblings(".scrap.added");
        var zIndexes = $siblings.map(function() {
            return $(e.currentTarget).css("z-index");
        });

        var zIndex = parseInt($element.css("z-index"));
        switch (e.currentTarget.id) {
        case "top":
            zIndex = $("#scrapBook .scrap").length + 1;
            break;
        case "zup":
            zIndex += 1;
            break;
        case "zdown":
            zIndex -= 1;
            break;
        case "bottom":
            zIndex = 0;
            break;
        case "remove":
            $(".selected").addClass("deleted");
            $(".deleted").fadeOut(300, function() {
                //$('.deleted').remove();
            });
            break;
        }

        if (zIndex === -1) {
            zIndex = 0;
            $siblings.each(function() {
                var z = parseInt($(this).css("z-index")) + 1;
                $(this).css("z-index", z);
                $(this).find(".zIndex").text(z);
            });
        }
        $element.css({ zIndex: zIndex });

        //var elemsToSort = _.sortBy($siblings.andSelf(), function (el) { $(el).css('z-index'); });
        //for (var i = 0; i < elemsToSort.length; i++) {
        //    //console.log(i, $(elemsToSort[i]).css('z-index'));
        //    $(elemsToSort[i]).css('z-index', i + 1);
        //}

        saveScrapbookItem($element);

        e.stopPropagation();
        return false;
    });

    $(document.body).on("click", "div.item div.actions a.remove", function(e) {
        e.preventDefault();
        var $element = $(this);
        var $scrap = $element.closest("div.item");

        pushToServer($element.attr("href"), null, true, function(json) {
            if (json.Success) {
                var scrapbookItemId = $scrap.data("scrapbookitemid");
                if (scrapbookItemId == null || scrapbookItemId == "undefined") {
                    $scrap.fadeOut(300);
                } else {
                    $("#scrapBook div#scrapbookItem_" + scrapbookItemId).fadeOut(300);
                    getProducts();
                    refreshScrapbookList();
                }
            }
        });
    });
});