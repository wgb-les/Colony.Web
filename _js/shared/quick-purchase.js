window.Wg = window.Wg || {};
Wg.QuickPurchase = Wg.QuickPurchase || function() {

    var table = $("table.quickPurchase");
    var autocompleteField = $("#QuickPurchaseKeywords");
    var placeOrderButton = $("#placeOrder");
    var autocompleteUrl = "/shops/WgShop/PredictiveSearchFrontendQuickPurchase/";

    var rowTemplate = null;
    var autocompleteTemplate = null;

    function loadTemplate(file) {
        return $.ajax({
            url: "/_js/template/" + file + ".html",
            type: "GET",
            dataType: "html"
        });
    }

    function getOrderDetails() {

    }

    return {
        orderHandlerDelegate: function(orderDetails) {

            var skus = [];

            $(".productCode").each(function(event) {
                skus.push($(this).data("skuid"));
            });

            if (skus.length > 0) {
                var url = "/basket/action/?command=add&sample=True&skuid=" + skus.join(",");
                $.get(url, function(data) {
                    $("body .notification").remove();
                    if (data.Status === "Successful") {
                        $('<div class="notification"><h2 class="icon-shopping-cart">&#160;Item(s) Added to Basket</h2></div>').prependTo("body");
                        table.find("tr:not(.autoCompleteRow)").remove();
                        window.location = "/basket/summary/";
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
            }

        },
        init: function() {
            var self = this;
            $(document).ready(function() {
                $.when(loadTemplate("quick-purchase-row"), loadTemplate("quick-purchase-autocomplete"))
                    .done(function(a1, a2) {
                        rowTemplate = _.template(a1[0]);
                        autocompleteTemplate = _.template(a2[0]);
                    });
                autocompleteField.autocomplete({
                        delay: 500,
                        minLength: 3,
                        source: autocompleteUrl,
                        focus: function(event, ui) {
                            event.preventDefault();
                        },
                        select: function(event, ui) {
                            event.preventDefault();
                            //console.log(ui.item);
                            autocompleteField.parents("tr").before(rowTemplate(ui.item));
                            autocompleteField.val("");
                            $(document).trigger("priceupdate");
                        }
                    })
                    .on("keydown", function(e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            return false;
                        }
                    })
                    .data("ui-autocomplete")._renderItem = function(ul, item) {
                        return $(autocompleteTemplate($.extend(item, { b2b: table.hasClass("b2b") })))
                            .data("item.autocomplete", $.extend(item, { b2b: table.hasClass("b2b") }))
                            .appendTo(ul); // return "li" element
                    };

                //table.on("click", ".cuttingType input[type='checkbox']", function () {
                //    $(this).parents('.cuttingType').find('label').removeClass('selected');
                //    $(this).parent().addClass('selected');
                //})
                table.not(".b2b").on("click", ".removeItem a", function(e) {
                    e.preventDefault();
                    $(this).parents("tr").remove();
                    return false;
                });

                placeOrderButton.on("click", function(e) {
                    e.preventDefault();
                    self.orderHandlerDelegate();
                    return false;
                });
            });
        }
    };
}();
Wg.QuickPurchase.init();