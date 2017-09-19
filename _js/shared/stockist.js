window.Wg = window.Wg || {};
Wg.Stockists = Wg.Stockists || function() {
    var WhereToBuyScroller,
        pinTemplate = null;
    var googleLoaded = false;

    function setMarkers(map, stores, expandMapToMarkers) {
        $.when(loadTemplate("stockist-map-pin"))
            .done(function(template) {
                pinTemplate = template;
                var pin = _.template(template);
                var markers = [];
                for (var i = 0; i < stores.length; i++) {
                    var store = $(stores[i]),
                        details = store.find(".details"),
                        data = store.data(),
                        addressData = details.data(),
                        siteLatLng = new google.maps.LatLng(data.lat, data.lng),
                        shop = data.shop,
                        stockistId = data.stockistid,
                        stockistName = addressData.name,
                        stockistAddress1 = addressData.address1,
                        stockistAddress2 = addressData.address2,
                        stockistTown = addressData.town,
                        stockistCounty = addressData.county,
                        stockistPostcode = addressData.postcode,
                        stockistTelephoneNumber = addressData.telephonenumber,
                        stockistEmail = addressData.email,
                        stockistUrl = addressData.url,
                        brands = addressData.othershops,
                        brandArray = [];
                    if (brands != null)
                        brandArray = brands.split(",");

                    var html = pin({
                        stockistName: stockistName,
                        stockistAddress: _.reject([stockistAddress1, stockistAddress2, stockistTown, stockistCounty, stockistPostcode], function(itm) { return !itm; }).join("<br />"),
                        stockistTelephoneNumber: stockistTelephoneNumber,
                        stockistEmail: stockistEmail,
                        stockistUrl: stockistUrl,
                        stockistBrands: brandArray
                    });

                    var image = shop != null ? "/_images/brands/" + shop + "/map-icons/map-pin.png" : "";
                    var marker = new google.maps.Marker({
                        icon: image,
                        position: siteLatLng,
                        title: stockistName,
                        map: map,
                        zIndex: 9999 - i,
                        html: html,
                        animation: google.maps.Animation.DROP,
                        customInfo: stockistId
                    });
                    if (expandMapToMarkers) {
                        exports.bounds.extend(marker.position);
                    }
                    markers.push(marker);
                    exports.markers[store.attr("id")] = marker;
                    //extend the bounds to include each marker's position
                    //bounds.extend(marker.position);

                    google.maps.event.addListener(marker, "click", function() {
                        scrollResults("result_" + this.customInfo, true);
                    });
                }
                if (expandMapToMarkers) {
                    map.fitBounds(exports.bounds);
                    //exports.markerClusterer = new MarkerClusterer(map, markers);
                }
                //scrollResults(stores.first().attr('id'), false);
            });
    }

    function loadTemplate(file) {
        if (pinTemplate != null)
            return pinTemplate;
        return $.ajax({
            url: "/_js/template/" + file + ".html",
            type: "GET",
            dataType: "html"
        });
    }

    function scrollResults(id, zoomToPin) {
        var marker = exports.markers[id];
        if (marker) {
            var map = exports.map;
            if (!exports.infoWindow)
                exports.infoWindow = new google.maps.InfoWindow();
            var infowindow = exports.infoWindow;
            //setTimeout(function () {
            infowindow.close();
            infowindow.setContent(marker.html);
            infowindow.open(map, marker);
            map.panTo(marker.position);
            //if (zoomToPin)
            //{
            //    exports.map.setZoom(14);
            //}
            //}, 500);
            var offset = $("#whereToBuyResults ul.results > li").first().position().top;
            $("#whereToBuyResults").stop(true, true).animate({ scrollTop: $("#" + id).position().top - offset }, 500);
        }

    }

    function createMap(elemId) {
        var baseElem = $("#whereToBuyResults").find("ul.results");
        var expandMapToMarkers = baseElem.data("region") != "1";

        var stores = baseElem.children("li");

        if (stores.length > 0) {

            elemId = elemId || stores.first().attr("id");

            var elem = $("#" + elemId);
            exports.baseLatLng = new google.maps.LatLng(elem.data("lat"), elem.data("lng"));
            exports.bounds = new google.maps.LatLngBounds();

            exports.mapOptions = {
                zoom: 14,
                center: exports.baseLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            exports.map = new google.maps.Map(document.getElementById("map_canvas"), exports.mapOptions);
            google.maps.event.addListenerOnce(exports.map, "tilesloaded", function() {
                setMarkers(exports.map, stores, expandMapToMarkers);
            });
        }
    }

    function closeMaps() {
        $("#StockistSearchIsVisible").val("false");
        $("#collections, #container").show();
        $("#map_content").fadeOut(function() {
            $(".leftMenu").animate({
                'left': "-420",
                avoidCSSTransitions: true
            }, 500, function() {
                exports.map = null;
                exports.bounds = null;
                exports.infowindow = null;
                exports.mapOptions = {};
                exports.markers = {};
                exports.baseLatLng = null;
                exports.markerClusterer = null;
                cascadeRegionOptions();
                $("#StockistSearchIsVisible").val("true");
                $("#map_content").html('<a class="closeMaps button">Close Maps</a><div id="map_canvas"></div>');
                $("#whereToBuyResults").getNiceScroll().remove();
                $("#whereToBuyResults")
                    .empty()
                    .css("overflow", "auto");
                $(".leftMenu").removeClass("leftMenu").css({ 'height': "auto", 'top': "auto", 'left': "0px", 'bottom': "-100px" }).animate({ 'left': "0", 'bottom': "35", avoidCSSTransitions: true });
            });
        });
        return false;
    }


    function cascadeRegionOptions() {
        $(".error.alertInfo").hide();
        var siteKey = $("#SiteKey").val();
        $("#stockistSearch .large-8 ul li").hide();
        $("#whereToBuySearch, #stockistSearch").find(".stockistSearchTerms .field").hide();
        switch ($("#Region").val()) {
        case "1":
            //United Kingdom
            console.log('yes')
            $("#Postcode").parent(".fp-tableCell").parent(".fp-section").show();
            $("#Postcode").parent().show();

            $("#Postcode").attr("placeholder", "Enter Postcode, Town or City");
            $("#HasWallpaper").parents("li").show();
            $("#HasFabric").parents("li").show();
            $("#HasTrimmings").parents("li").show();
            $("#HasHomeAccessories").parents("li").show();
            $("#HasRugs").parents("li").show();

            if (siteKey == "Zoffany") {
                $("#HasPaint").parents("li").show();
                $("#HasFurniture").parents("li").show();
            } else if (siteKey == "Sanderson") {
                $("#HasPaint").parents("li").show();
            }

            break;
        case "2":
            //Europe
            $("#EuropeanCountryId").parent().show();

            $("#HasWallpaper").parents("li").show();
            $("#HasFabric").parents("li").show();
            $("#HasTrimmings").parents("li").show();
            $("#HasRugs").parents("li").show();

            if (siteKey == "Zoffany") {
                $("#HasPaint").parents("li").show();
                $("#HasFurniture").parents("li").show();
            } else if (siteKey == "Sanderson") {
                $("#HasPaint").parents("li").show();
            }

            break;
        case "3":
            //United States of America
            $("#StateId").parent().show();

            $("#HasWallpaper").parents("li").show();
            $("#HasFabric").parents("li").show();
            $("#HasTrimmings").parents("li").show();
            break;
        case "4":
            //Rest of World
            $("#WorldCountryId").parent().show();

            $("#HasWallpaper").parents("li").show();
            $("#HasFabric").parents("li").show();
            $("#HasTrimmings").parents("li").show();
            break;
        }
    }

    var exports = {
        map: null,
        bounds: null,
        infowindow: null,
        mapOptions: {},
        markers: {},
        markerClusterer: null,
        baseLatLng: null,

        GoogleMapsLoaded: function() {
            Redant.util.loadScript("/_js/vendor/markerclusterer_compiled.js", function() {
                setTimeout(function() {
                    var stores = $(".leftMenu .results > li");
                    var resultSize = 0;
                    for (var ix = 0; ix < stores.length; ix++) {
                        resultSize = resultSize + $(stores[ix]).outerHeight();
                    }
                    $(".leftMenu .scroller").height(Math.ceil(resultSize));
                    $("#map_content").fadeIn(function() {
                        createMap();
                    });
                    $("#collections, #container").hide();
                    $("#whereToBuyResults").niceScroll({});
                }, 500);
            });
        },

        hideStockists: function() {
            closeMaps();
        },

        setAjaxLocation: function() {
            var address = "";
            var geocoder = "";
            var latitude = "";
            var longitude = "";
            var selectedRegion = "";
            if ($("#Region").val() == "1" && $("#Postcode").val() == "") {

            } else {
                selectedRegion = $("#Region option:selected").text();
                switch ($("#Region").val()) {
                case "1":
                    address = $("#Region option:selected").text() + " " + $("#Postcode").val();
                    break;
                case "2":
                    address = $("#EuropeanCountryId option:selected").text();
                    break;
                case "3":
                    address = $("#StateId option:selected").text() + " " + " United States of America";
                    break;
                case "4":
                    address = $("#WorldCountryId option:selected").text();
                    break;
                }
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'address': address }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        latitude = results[0].geometry.location.A;
                        longitude = results[0].geometry.location.F;
                        $("#Latitude").val(latitude);
                        $("#Longitude").val(longitude);

                        var formControls = $("#whereToBuySearch .formControls");

                        formControls.find(".button").hide();

                        var loader = Redant.util.ajaxLoaderForButton().css("display", "inline-block");

                        loader.appendTo(formControls);
                        $.ajax({
                            type: "POST",
                            url: "/actionuri/stockist/stockist/footer",
                            data: $("#whereToBuySearch form").serialize(),
                            success: function(data) {
                                $("#whereToBuy").replaceWith(data);
                                $("#whereToBuy")
                                    .addClass("leftMenu")
                                    .css({ 'top': "50%" })
                                    .show()
                                    .animate({ 'left': "0", avoidCSSTransitions: true }, 500);
                                //                         if (Redant.util.loadScript("https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=Wg.Stockists.GoogleMapsLoaded"))
                                Wg.Stockists.GoogleMapsLoaded();
                            }
                        }).always(function() {
                            loader.remove();
                            formControls.find(".button").show();
                        });
                    } else {
//                alert("Geocode was not successful for the following reason: " + status);
                    }
                });
                //     }
            }
        },


        init: function() {
            $(document).ready(function() {
                $("body").on("submit", "#whereToBuySearch form", function(e) {
                        e.preventDefault();
                        $("#PostcodeError").hide();
                        if ($("#Region").val() == "1" && $("#Postcode").val() == "") {
                            $("#PostcodeError").show();
                            return false;
                        } else {
                            if (Redant.util.loadScript("https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=Wg.Stockists.setAjaxLocation"))
                                Wg.Stockists.setAjaxLocation();
                        }


                        return false;
                    })
                    .on("click", ".showOnMap", function(e) {
                        e.preventDefault();
                        mapElemId = $(this).parents("li").attr("id");
                        scrollResults(mapElemId, true);
                        return false;
                    })
                    .on("click", ".closeMaps", function(e) {
                        e.preventDefault();
                        closeMaps();
                        return false;
                    })
                    .on("click", ".toggleStockist", function(e) {
                        e.preventDefault();
                        resetMenu();
                        var whereToBuy = $("#whereToBuy");
                        if (!whereToBuy.is(":visible")) {
                            $("#StockistSearchIsVisible").val("true");

                            whereToBuy.css({
                                'bottom': "-50px",
                                'display': "block",
                                'opacity': "1"
                            });

                            $("#whereToBuyResults").getNiceScroll().remove();
                            $("#whereToBuyResults").css("overflow", "");
                            cascadeRegionOptions();
                            whereToBuy.animate({
                                bottom: "50%",
                                left: "50%",
                                avoidCSSTransitions: true
                            }, 500, function() {
                                if ($("#whereToBuyResults .scroller").hasClass("iScollInit")) {
                                    WhereToBuyScroller = new IScroll("#whereToBuyResults .scroller", { eventPassthrough: false, scrollX: true, scrollY: false, wheelHorizontal: true });
                                }
                            });
                        } else {
                            $(this).removeClass("highlightedMenu");
                            closeMaps();
                        }
                        return false;
                    })
                    .on("click", ".setDefaultStockist", function(e) {
                        e.preventDefault();

                        var that = $(this);
                        $.get(this.href, function(data) {
                            if (data.success == true) {
                                $(".setDefaultStockist").removeClass("selected").removeAttr("disabled");

                                that.addClass("selected");
                                that.attr("disabled", "disabled");
                            }
                        });
                    })
                    .on("change", "#Region", function(e) {
                        cascadeRegionOptions();
                    });
            });
        }
    };
    return exports;
}();
Wg.Stockists.init();