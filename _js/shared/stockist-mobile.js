window.Wg = window.Wg || {};
Wg.Stockists = Wg.Stockists || function() {

    function cascadeRegionOptions() {
        $(".error.alertInfo").hide();
        var siteKey = $("#SiteKey").val();
        $("#stockistSearch .large-8 ul li").hide();
        $("#whereToBuySearch, #stockistSearch").find(".stockistSearchTerms .field").hide();
        switch ($("#Region").val()) {
        case "1":
            //United Kingdom
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
        hideStockists: function() {

        },

        init: function() {
            $(document).ready(function() {
                $(".toggleStockist").click(function(e) {
                    e.preventDefault();
                    window.location = this.href;
                });
                cascadeRegionOptions();
                $("body").on("change", "#Region", function(e) {
                    cascadeRegionOptions();
                });
            });
        }
    };
    return exports;
}();
Wg.Stockists.init();