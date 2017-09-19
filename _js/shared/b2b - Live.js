window.Wg = window.Wg || {};
Wg.b2b = Wg.b2b || function () {


    var webtexBaseAccount = "WG01.WEB";
    var webtexBaseAccount2 = "WG09.WEB";
    var webtexAccountToUse = "WG01.WEB";

    var webtexBaseUrl = "https://online.walkergreenbank.com/raintegration";
    var webtexBaseAccount = "WG01.WEB";
    var webtexBaseAccount2 = "WG09.WEB";
    var webtexAccountToUse = "WG01.WEB";

    // Commented for dev only
    if (window.location.href.indexOf("uat") || window.location.href.indexOf("staging") || window.location.href.indexOf("colonynext")) {
        //webtexBaseUrl = "https://online.walkergreenbank.com/raintegrationtrial";
        //webtexBaseAccount = 'TRIAL2WG01.WEB';
        //webtexBaseAccount2 = 'TRIAL2WG09.WEB';
        //webtexAccountToUse = 'TRIAL2WG01.WEB';
    }

    var clickEvent = (Redant.util.browser.isMobile() || Redant.util.browser.isTablet()) ? "touchstart" : "click";
    //function(document, $, window) {
    //Switch mini-basket to B2B Mini-basket
    window.getMiniBasket = getB2BMiniBasket;
    if (Wg.QuickPurchase) {
        $("table.quickPurchase").addClass("b2b");
        Wg.QuickPurchase.orderHandlerDelegate = b2bQuickPurchaseHandler;
    }
    window.selectedCustomerRef = "";

    //To remove an error from webtex popup
    var oModal = { returnValue: "" };

    //Setup popup variable.
    var popup = false;

    function b2bQuickPurchaseHandler(orderDetails) {
        var productCodes = $.map($(".productCode input.referenceProductCode"), function (elem) {
            return elem.value || "";
        }).join("|");
        var webAccounts = $.map($(".productCode input.webAccount"), function (elem) {
            return elem.value || "";
        }).join("|");
        var originalSearchTerms = $.map($(".productCode input.searchTerm"), function (elem) {
            return elem.value || "";
        }).join("|");
        var cuttings = $.map($(".cuttingType"), function (elem) {
            if ($(elem).find("label").has("input[value='C']").hasClass("selected"))
                return "1";
            else
                return "";
        }).join("|");
        var shorts = $.map($(".cuttingType"), function (elem) {
            if ($(elem).find("label").has("input[value='S']").hasClass("selected"))
                return "1";
            else
                return "";
        }).join("|");
        var longs = $.map($(".cuttingType"), function (elem) {
            if ($(elem).find("label").has("input[value='L']").hasClass("selected"))
                return "1";
            else
                return "";
        }).join("|");
        var returnables = $.map($(".cuttingType"), function (elem) {
            if ($(elem).find("label").has("input[value='R']").hasClass("selected"))
                return "1";
            else
                return "";
        }).join("|");

        var orderReference = $("#OrderReference").val();
        var specialInstructions = $("#SpecialInstructions").val();

        sessionAwareAjax(
            webtexBaseUrl + "/redant/quickbuyorder.aspx",
            function (data) {
                var orderInfo = data.split("\n")[0];
                if (orderInfo && orderInfo.length > 2 && orderInfo.toLowerCase().indexOf("<order") >= 0) {
                    orderInfo = orderInfo.substring(1, orderInfo.length - 1);
                    var order = $(orderInfo).find("order");
                    showModalPopup("Thank you for your order", "medium", "", "<h2>Customer " + window.selectedCustomerRef + "</h2><h2>Your order was successful</h2><h3>Thank you for your order " + order.attr("number") + "</h3><p><strong>" + order.attr("type") + "</strong> order<br /><strong>Brand</strong> " + order.attr("brand") + '</p><p>Your order has been received and is being processed.  Please feel free to <a href="/contact-us/" title="contact us">contact us</a> if you have any questions.</p><p>Your order is accepted at the discretion of the Seller. Payment does not indicate order acceptance and your payment will be refunded if your offer is refused.</p>');
                    $(".quickPurchase tbody tr").not(".autoCompleteRow").remove();
                } else {
                    showModalPopup("There was a problem placing your order", "medium", "", "<h2>Customer " + window.selectedCustomerRef + '</h2><h2>There was a problem placing your order</h2><p>Your order was unsuccessful.  Please feel free to <a href="/contact-us/" title="Contact Us">contact us</a> if you have any questions.</p>');
                }
            }, "productCodes=" + productCodes + "&cuttings=" + cuttings + "&shorts=" + shorts + "&longs=" + longs + "&returnables=" + returnables + "&accounts=" + webAccounts + "&OrderReference=" + orderReference + "&SpecialInstructions=" + specialInstructions);
    }


    //Launch a styled modal popup
    function showModalPopup(title, size, cssClass, content) {
        if (size === "") size = "medium";
        var b = $('<div id="popup" class="reveal-modal ' + size + " " + cssClass + '"><header class="header-reveal-modal"><h2>' + title + '</h2><a class="close-reveal-modal icon-remove"><span>Close</span></a></header><div class="bd-reveal-modal"></div>');
        b.children("div.bd-reveal-modal").append(content);
        $("body #popup").remove();
        $("body").append(b);
        $("#popup").foundation("reveal", "open", { close: function () { popup = false; widgetHide(); } });
        //showWidget();
        popup = true;
    }

    function showWidgetShow() {
        $(".ui-widget-content").hover(function () {
            $(this).show();
        });
    }
    function widgetHide() {
        $(".ui-widget-content").hover(function () {
            $(this).hide();
        });
    }

    function redirectToLogin() {
        if (window.location.href.toLowerCase().indexOf("/trade-members/login") < 0) window.location = "/trade-members/login/?returnUrl=%2Fb2b-members%2Fwebtex%2F";
    }

    function sessionAwareAjax(url, onSuccess, data, method, dataType, async) {
        if (method === "" || method === null || method === undefined) method = "POST";
        if (dataType === "" || dataType === null || dataType === undefined) dataType = "json";
        if (data === undefined) data = null;
        if (async === undefined) async = true;

        $.support.cors = true;
        $.ajax({ url: url, type: method, cache: false, crossDomain: true, data: data, dataType: dataType, async: async, xhrFields: { withCredentials: true }, success: onSuccess });
    }

    /*function showChatWindow() {
        window.$zopim || (function (d, s) {
            var z = $zopim = function (c) { z._.push(c) },
                $ = z.s =
                    d.createElement(s),
                e = d.getElementsByTagName(s)[0];
            z.set = function (o) {
                z.set.
                    _.push(o);
            };
            z._ = [];
            z.set._ = [];
            $.async = !0;
            $.setAttribute("charset", "utf-8");
            $.src = "//v2.zopim.com/?28GknwDR6q7FM6sMVnnptC2GKCIupEhr";
            z.t = +new Date;
            $.
                type = "text/javascript";
            e.parentNode.insertBefore($, e);
        })(document, "script");
    }*/



    function setChangeCustomerButtonText(customerName) {
        var customerNameForDisplay;

        if (customerName.length > 10)
            customerNameForDisplay = customerName.substring(0, 10) + "...";
        else
            customerNameForDisplay = customerName;

        $("#customerName a span.global-util-label")
            .html(customerNameForDisplay + '<span class="hide"> (Change Customer)</span>')
            .attr("title", customerName + " (Change Customer)");
        $("#customerNameModal a span.global-util-label")
            .html(customerName + '<span class="hide"> (Change Customer)</span>')
            .attr("title", customerName + " (Change Customer)");

    }

    function ensureCustomerSelected() {
        sessionAwareAjax(
            webtexBaseUrl + "/redant/getassignedcustomer.aspx",
            function (data) {
                if (data.UserType === "C") {
                    $("#customer a").remove();
                    setChangeCustomerButtonText(data.CustomerName);
                    window.selectedCustomerRef = data.CustomerRef;
                } else {
                    if (data.Valid === true && data.CustomerRef !== "" && data.CustomerRef.indexOf(",") < 1) {
                        window.selectedCustomerRef = data.CustomerRef;
                        setChangeCustomerButtonText(data.CustomerName);
                    } else if (data.CustomerRef === "" || data.CustomerRef.indexOf(",") > 0) {
                        b2bCustomerSelection();
                    }
                }
            });
    }

    function b2bLogout() {
        sessionAwareAjax(
            webtexBaseUrl + "/redant/ssologout.aspx",
            function (data) {
            }, null, "POST", "json", false);
        sessionAwareAjax(
            "/b2b-members/logout/",
            function (data) {
                redirectToLogin();
            });
    }

    function b2bPing() {
        sessionAwareAjax(
            webtexBaseUrl + "/redant/ping.aspx",
            function (data) {
                if (data.Valid !== true) {
                    //redirectToLogin();
                    b2bLogout();
                }
            });
    }

    function b2bPurchaseDialogSetup() {
        $(document.body).off("click", ".addToBasket");
        $(document.body)
            .off("click", "a.addToBasket")
            .off("click", "a.b2baddtobasket")
            .off("click", "a.b2baddsampletobasket")
            .on("click", "a.b2bdisabled", function (e) {
                e.preventDefault();
                return false;
            })
            .on("click", '.b2baddtobasket:not(".b2bdisabled")', function (e) {
                e.preventDefault();
                if (window.selectedCustomerRef === "") {
                    ensureCustomerSelected();
                } else {
                    var code = $(this).parents(".productDetails, .details").attr("data-productcode") || $(this).parent().attr("data-productcode");
                    if (sitekey.toLowerCase() === "wg") {
                        code = $(this).parents(".b2bhelper").attr("data-productcode") || $(this).parent().attr("data-productcode");
                    }
                    if (code.indexOf("UZGC") > -1) {
                        webtexAccountToUse = webtexBaseAccount2;
                    } else {
                        webtexAccountToUse = webtexBaseAccount;
                    }
                    var url = webtexBaseUrl + "/Content/OrderEntryLineExt/Default.aspx?RETURN_URL=" + window.location.origin + "/closepopup.html&ITEM_ID=" + code + "&CAIF_ACCOUNT=" + webtexAccountToUse + "&LINE_NO=*&RELOAD=Y&ORDER_TYPE=N&FRMWRK=N&CUSREF=" + window.selectedCustomerRef + "&THEME=" + sitekey.toUpperCase();
                    showModalPopup("Add to Basket", "large", "", '<iframe src="' + url + '" style="border: none; width: 625px!important;height: 470px!important;"></iframe>');
                }
                return false;
            })
            .on("click", '.b2baddsampletobasket:not(".b2bdisabled")', function (e) {
                e.preventDefault();
                if (window.selectedCustomerRef === "") {
                    ensureCustomerSelected();
                } else {
                    var code = $(this).parents(".productDetails, .details").attr("data-productcode") || $(this).parent().attr("data-productcode");
                    if (sitekey.toLowerCase() === "wg") {
                        code = $(this).parents(".b2bhelper").attr("data-productcode") || $(this).parent().attr("data-productcode");
                    }
                    if (code.indexOf("UZGC") > -1) {
                        webtexAccountToUse = webtexBaseAccount2;
                    } else {
                        webtexAccountToUse = webtexBaseAccount;
                    }
                    var url = webtexBaseUrl + "/Content/OrderEntryLineExt/Default.aspx?RETURN_URL=" + window.location.origin + "/closepopup.html&ITEM_ID=" + code + "&CAIF_ACCOUNT=" + webtexAccountToUse + "&LINE_NO=*&RELOAD=Y&ORDER_TYPE=Y&FRMWRK=N&CUSREF=" + window.selectedCustomerRef + "&THEME=" + sitekey.toUpperCase();
                    showModalPopup("Add Sample to Basket", "large", "", '<iframe src="' + url + '" style="border: none; width: 625px!important;height: 470px!important;"></iframe>');
                }
                return false;
            })
            .on("click", '.b2beditbasket:not(".b2bdisabled")', function (e) {
                e.preventDefault();
                if (window.selectedCustomerRef === "") {
                    ensureCustomerSelected();
                } else {
                    var code = $(this).attr("data-productcode");
                    if (sitekey.toLowerCase() === "wg") {
                        code = $(this).parents(".b2bhelper").attr("data-productcode") || $(this).attr("data-productcode");
                    }
                    if (code.indexOf("UZGC") > -1) {
                        webtexAccountToUse = webtexBaseAccount2;
                    } else {
                        webtexAccountToUse = webtexBaseAccount;
                    }
                    var lineNumber = $(this).attr("data-linenumber");
                    var cusRef = $(this).attr("data-customerref") || window.selectedCustomerRef;
                    var url = webtexBaseUrl + "/Content/OrderEntryLineExt/Default.aspx?RETURN_URL=" + window.location.origin + "/closepopup.html&CAIF_ACCOUNT=" + webtexAccountToUse + "&LINE_NO=" + lineNumber + "&RELOAD=Y&ORDER_TYPE=N&FRMWRK=N&CUSREF=" + cusRef + "&THEME=" + sitekey.toUpperCase();
                    showModalPopup("Edit Item", "large", "", '<iframe src="' + url + '" style="border: none; width: 625px!important;height: 470px!important;"></iframe>');
                }
                return false;
            })
            .on("click", '.b2beditsamplebasket:not(".b2bdisabled")', function (e) {
                e.preventDefault();
                if (window.selectedCustomerRef === "") {
                    ensureCustomerSelected();
                } else {
                    var code = $(this).attr("data-productcode");
                    if (code.indexOf("UZGC") > -1) {
                        webtexAccountToUse = webtexBaseAccount2;
                    } else {
                        webtexAccountToUse = webtexBaseAccount;
                    }
                    var lineNumber = $(this).attr("data-linenumber");
                    var cusRef = $(this).attr("data-customerref") || window.selectedCustomerRef;
                    var url = webtexBaseUrl + "/Content/OrderEntryLineExt/Default.aspx?RETURN_URL=" + window.location.origin + "/closepopup.html&CAIF_ACCOUNT=" + webtexAccountToUse + "&LINE_NO=" + lineNumber + "&RELOAD=Y&ORDER_TYPE=Y&FRMWRK=N&CUSREF=" + cusRef + "&THEME=" + sitekey.toUpperCase();
                    showModalPopup("Edit Sample", "large", "", '<iframe src="' + url + '" style="border: none; width: 625px!important;height: 470px!important;"></iframe>');
                }
                return false;
            });
    }

    function b2bPriceUpdate() {

        var productCodes = $("*[data-productcode][data-b2bfetch='true']");
        //var productCodeElemList = $("#ProductCodes");
        var productCodesString = "";
        if (productCodes.length > 0) {
            productCodesString += productCodes.map(function () { return $(this).attr("data-productcode"); }).get().join(",");
        }
        //if (productCodeElemList.length > 0) {
        //    productCodesString += productCodeElemList.val();
        //}
        if (productCodesString.length > 0) {
            productCodes.find(".b2baddtobasket, .b2baddsampletobasket, .b2beditbasket, .b2beditsamplebasket").addClass("b2bdisabled");
            //productCodes.find('a.b2baddtobasket,a.b2baddsampletobasket,a.b2beditbasket,a.b2beditsamplebasket').parents('.large-6').hide();
            sessionAwareAjax(
                webtexBaseUrl + "/redant/pricelist.aspx",
                function (data) {
                    if (data && data.Items.length > 0) {
                        var currency = data.Currency || "GBP";
                        for (var i = 0; i < data.Items.length; i++) {
                            if (data.Items[i].Price != null && data.Items[i].Price != undefined && data.Items[i].Price != "-.--") {
                                var price = currency + " " + data.Items[i].Price;
                                if (($('*[data-productcode="' + data.Items[i].Product_Code + '"][data-b2bfetch="true"] .price').not('[data-noprice="true"]').length > 0) && $("#webcontractuser").length == 0)
                                    $('*[data-productcode="' + data.Items[i].Product_Code + '"][data-b2bfetch="true"] .price').not('[data-noprice="true"]').text(price);
                                else if ($("#webcontractuser").length == 0) {
                                //    $('*[data-productcode="' + data.Items[i].Product_Code + '"][data-b2bfetch="true"]').not('[data-noprice="true"]').append('<div class="detailPriceContainer"><p class="priceValue">*Your Trade Price:</p><p class="priceValue"><span class="price">' + price + "</span></p></div>");
                                //}
                                if ($('*[data-productcode="' + data.Items[i].Product_Code + '"][data-b2bfetch="true"] .stock') && $("#webcontractuser").length == 0) {
                                    if (data.Items[i].StockLevel > 0) {
                                        if (($('*[data-productcode="' + data.Items[i].Product_Code + '"][data-b2bfetch="true"] .stock').not('[data-noprice="true"]').length > 0) && $("#webcontractuser").length == 0) {
                                            //if (($('*[data-productcode="' + data.Items[i].Product_Code + '"] .price').not('[data-noprice="true"]').length > 0) && $("#webcontractuser").length == 0)
                                            //$('*[data-productcode="' + data.Items[i].Product_Code + '"]').not('[data-noprice="true"]').append('<span class="stock">' + data.Items[i].StockLevel + data.Items[i].StockLevelUnitOfMeasurement + "</span><br/>");
                                            $('*[data-productcode="' + data.Items[i].Product_Code + '"][data-b2bfetch="true"] .stock').text("Stock Level: " + data.Items[i].StockLevel + data.Items[i].StockLevelUnitOfMeasurement);
                                        } else {
                                            if ($("#webcontractuser").length == 0) {
                                                $('*[data-productcode="' + data.Items[i].Product_Code + '"][data-b2bfetch="true"]').not('[data-noprice="true"]').append('<div class="detailPriceContainer"><p class="priceValue"></p><p class="priceValue"><span class="stock">' + data.Items[i].StockLevel + data.Items[i].StockLevelUnitOfMeasurement + "</span></p></div>");
                                            }
                                        }
                                    } else {
                                        $('*[data-productcode="' + data.Items[i].Product_Code + '"][data-b2bfetch="true"] .stock').html("Stock Level: " + data.Items[i].StockLevel + data.Items[i].StockLevelUnitOfMeasurement + "<br/>Stock Due: " + data.Items[i].DueIn);
                                    }
                                }
                                $('*[data-productcode="' + data.Items[i].Product_Code + '"]').find(".b2baddtobasket, .b2baddsampletobasket, .b2beditbasket, .b2beditsamplebasket").removeClass("b2bdisabled");
                                //$('*[data-productcode="' + data.Items[i].Product_Code + '"]').find('a.b2baddtobasket,a.b2baddsampletobasket,a.b2beditbasket,a.b2beditsamplebasket').parents('.large-6').show();
                            }
                            $('*[data-productcode="' + data.Items[i].Product_Code + '"][data-b2bfetch="true"]').attr("data-b2bfetch", "complete");
                        }

                    };
                    $('*[data-productcode][data-b2bfetch="true"] .accessMessage').show();

                }, "ProductCodes=" + productCodesString);
        }
    }

    function searchB2BCustomers(request, response) {
        sessionAwareAjax(
            webtexBaseUrl + "/redant/GetCustomers.aspx?term=" + request.term,
            function (data) {
                var ret = $.map(data, function (item) {
                    return {
                        label: item.CUSName + " (" + item.CUSREF + " - " + item.SELLCO + ")",
                        value: item.CUSREF,
                        name: item.CUSName
                    };
                });
                response(ret);
            });
    }

    function b2bCustomerSelection() {
        var input = $('<div class="contentForm"><div class="field text autocomplete"><label for="b2bcustomerselection">Start typing a customer name and select an option from the list</label><input type="text" id="b2bcustomerselection" name="b2bcustomerselection" placeholder="Start typing a customer name..." /></div></div>');

        input.find("input").autocomplete({
            source: searchB2BCustomers,
            minLength: 3,
            select: function (event, ui) {
                if (ui.item) {
                    sessionAwareAjax(
                        webtexBaseUrl + "/redant/setcustomer.aspx?CUSREF=" + ui.item.value + "&CUSName=" + ui.item.name,
                        function (data) {
                            window.selectedCustomerRef = ui.item.value;
                            setChangeCustomerButtonText(ui.item.name.trim());
                            closeIframeWindow();
                            $(document).trigger("priceupdate");
                        });
                }
            },
            create: function (event, ui) {
                setTimeout(function () { $("#b2bcustomerselection").focus(); }, 500);
            }
        });


        showModalPopup("Select Customer", "small", "", input);
    }


    function getB2BMiniBasket(callback) {
        //if (!miniBasketLoaded) {

        var deferred = $.Deferred();

        sessionAwareAjax(
            webtexBaseUrl + "/redant/minibasket.aspx",
            function (data) {
                $("li.basket .miniBasket").remove();
                $.get("/_js/template/b2b-minibasket.html").done(function (templatedata) {
                    //$('li.basket').append(_.template($('script#b2bminibaskettemplate').html(), data, { variable: "basket" }));
                    $("li.basket").append(_.template(templatedata, data, { variable: "basket" }));
                    var itemCount = data.AvailableBaskets.length;
                    //$('li.basket>a>span.global-util-icon icon-basket-grey').text('Basket (' + itemCount + ')');
                    $("li.basket > a > span.global-util-count").text("(" + itemCount + ")");
                    $("div.topNavItem > a").text("BASKET (" + itemCount + ")");
                    $("li.basket input#switch").autocomplete({
                        source: searchB2BCustomers,
                        minLength: 3,
                        select: function (event, ui) {
                            if (ui.item) {
                                $.support.cors = true;
                                $.ajax({
                                    url: webtexBaseUrl + "/redant/setcustomer.aspx?CUSREF=" + ui.item.value + "&CUSName=" + encodeURIComponent(ui.item.label),
                                    crossDomain: true,
                                    dataType: "json",
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    success: function (data) {
                                    }
                                });
                            }
                        }
                    });
                    //miniBasketLoaded = true;
                    deferred.resolve(data);
                });
            }, null, "POST", "json");

        return deferred.promise();
        //}
    }

    function b2bBasketSubmit(e) {
        $(this).find(".alertInfo").remove();
        if ($(this).find("input[type='checkbox']:checked").length == 0) {
            $(this).prepend('<div class="alertInfo error"><span>You must select a basket to continue to the secure checkout</span></div>');
            return false;
        }
        return true;
    }

    function b2bCheckoutScroll() {
        if (window.location.href.toLowerCase().indexOf("b2bcheckout/payment") > 0) {
            $("html, body").animate({ scrollTop: $("#b2bPaymentSection").position().top - $("#header").outerHeight() }, 1000);
        }
    }

    var exports = {
        init: function () {


            if (!window.location.origin) {
                window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
            }

            $(window).load(function () {
               // showChatWindow();
                var productCodes = $("*[data-productcode]");
                productCodes.find("a.b2baddtobasket, a.b2baddsampletobasket, a.b2beditbasket, a.b2beditsamplebasket").addClass("b2bdisabled");

                //Session keep-alive?????
                b2bPing();
                setInterval(b2bPing, 30000);

                //Check whether customer is selected
                ensureCustomerSelected();

                //Bespoke pricing
                b2bPriceUpdate();

                $(document).on("quickview:expanded productdragstop", function () {
                    //Bespoke pricing
                    $(document).trigger("priceupdate");
                });
                b2bPurchaseDialogSetup();
            });

            $(document).ready(function () {

                b2bCheckoutScroll();
                getB2BMiniBasket();

                $(".scrapControls .sample").remove();
                $(document).on("keydown", ".field.orderreference input", function (e) {
                    var key = e.which || e.keyCode;

                    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
                        // numbers
                        (key >= 48 && key <= 57) ||
                        // Numeric keypad
                        (key >= 96 && key <= 105) ||
                        // minus
                        (key == 189 || key == 109) ||
                        //alpha characters
                        (key >= 65 && key <= 90) ||
                        // // comma, period and minus, . on keypad
                        //key == 190 || key == 188 || key == 109 || key == 110 ||
                        // Backspace and Tab and Enter
                        key == 8 || key == 9 || key == 13 ||
                        // Home and End
                        key == 35 || key == 36 ||
                        // left and right arrows
                        key == 37 || key == 39 ||
                        // // Del and Ins
                        //key == 46 || key == 45)
                        key == 45)
                        return true;

                    return false;
                });

                $(document).on(clickEvent, "#b2bLogout,.b2bLogout", function (e) {
                    b2bLogout();
                    return false;
                });
                $(document).on(clickEvent, "#b2bChangeCustomer,#customer a", function (e) {
                    b2bCustomerSelection();
                    return false;
                });
                $(document).on(clickEvent, "#b2bGoToBasket", function (e) {
                    e.preventDefault();
                    window.location = "/b2b-members/webtex/basketsummary/";
                    return false;
                });
                $("#siteLinks ul li.basket a").attr("href", "/b2b-members/webtex/basketsummary/");

                _.each($("select.savedAddresses"), function (t) {
                    if ($(t).children("option:selected").val().length > 0) {
                        $(t).parents("fieldset").children(".addressDetails").hide();
                    } else {
                        $(t).parents("fieldset").children(".addressDetails").show();
                    }
                });
                $("select.savedAddresses").change(function (e) {
                    if ($(this).children("option:selected").val().length > 0) {
                        $(this).parents("fieldset").children(".addressDetails").hide();
                    } else {
                        $(this).parents("fieldset").children(".addressDetails").show();
                    }
                });

                $(".b2bDelivery .addNewAddress").on("click", function (e) {
                    e.preventDefault();
                    var that = this;

                    var custRef = $(that).data("custref");
                    var custName = $(that).data("custname");
                    var isCfa = $(that).data("iscfa") || false;

                    var modal = $("#addressDetails");
                    $.get("/b2b-members/b2bcheckout/AddDeliveryAddress?CustomerReference=" + custRef + "&CustomerName=" + custName + "&isCfaAddress=" + isCfa, function (data) {
                        modal
                            .empty()
                            .html(data)
                            .append("")
                            .foundation("reveal", "open");

                        _.each($("select.savedAddresses"), function (t) {
                            if ($(t).children("option:selected").val().length > 0) {
                                $(t).parents("fieldset").children(".addressDetails").hide();
                            } else {
                                $(t).parents("fieldset").children(".addressDetails").show();
                            }
                        });
                        $("select.savedAddresses").change(function (e) {
                            if ($(this).children("option:selected").val().length > 0) {
                                $(this).parents("fieldset").children(".addressDetails").hide();
                            } else {
                                $(this).parents("fieldset").children(".addressDetails").show();
                            }
                        });

                        $("#addressDetails form").on("submit", function (e1) {
                            e1.preventDefault();
                            var form = $(this);

                            $.validator.unobtrusive.parse(form);

                            if ($(form).valid()) {

                                $.ajax({
                                    type: "POST",
                                    url: form.attr("action"),
                                    data: form.serialize(),
                                    success: function (formdata) {
                                        var cfaSelector = isCfa ? ".cfa " : " ";
                                        var listSelector = isCfa ? ".deliveryAddress.cfa ul" : ".deliveryAddress:not(.cfa) ul";
                                        if (formdata.success && formdata.success === true) {
                                            var addressParts = formdata.address.split("|");
                                            var list = $("#" + custRef).find(listSelector);
                                            if (list.length == 0)
                                                list = $("<ul>").prependTo("#" + custRef + " " + listSelector);
                                            list.empty().append("<li><strong>" + addressParts[0] + "</strong></li>");
                                            for (var i = 1; i < addressParts.length; i++) {
                                                if (addressParts[i] !== "Y" && addressParts[i] !== "D" && addressParts[i] !== "T")
                                                    list.append("<li>" + addressParts[i] + "</li>");
                                            }
                                            $("#" + custRef + " .b2bDeliveryAddressHeader" + cfaSelector).text("Selected" + ((isCfa) ? " CFA " : " ") + " Delivery Address");
                                            modal.foundation("reveal", "close");
                                        }
                                    }
                                });
                            }
                            return false;
                        });
                    });
                    return false;
                });

                $("form.basketTotals").submit(b2bBasketSubmit);

                $("#b2bAcceptTermsAndConditions").on("change", function () {
                    var tandcsAccepted = $(this).prop("checked");
                    if (!tandcsAccepted) {
                        $("#termsAndConditionsError").show();
                    } else {
                        $("#termsAndConditionsError").hide();
                    }
                });

                $("form#b2bMakePayment").submit(function (e) {
                    var tandcsAccepted = $("#b2bAcceptTermsAndConditions").prop("checked");

                    if (!tandcsAccepted) {
                        $("#termsAndConditionsError").show();
                    } else {
                        $("#termsAndConditionsError").hide();
                    }
                    return tandcsAccepted;
                });
                $('input[type="radio"][name="paymentType"]').on("change", function () {
                    var selectedMethod = $(this).val();

                    $("#billingAddress").hide();

                    if (selectedMethod == "card") {
                        $("#billingAddress").show();
                    }
                });
                $(document).on("priceupdate", function () { b2bPriceUpdate(); });
            });


        },



        b2bNavigation: function () {
            sessionAwareAjax(
                webtexBaseUrl + "/redant/clientinfo.aspx",
                function (data) {
                    if (data == "Not logged in") {
                        b2bLogout();
                        return;
                    }

                    var items = data.nav.Nav.menu.menuitem;
                    var navBar = $('<header class="pageHeader"><nav class="top-bar" role="navigation"><ul class="title-area"><li class="name"><a href="#"><h1>B2B Menu</h1></a></li><li class="toggle-topbar menu-icon"><a href="#"><span></span></a></li></ul><section class="top-bar-section"><ul><li><a href="/b2b-members/webtex/?webtexUrl=%2F">Home</a></li></ul></section></nav></header>');
                    var template = '<li><a href="/b2b-members/webtex/?webtexUrl=<%=item.link%>"><%=(item.title || "")%></a></li>';
                    var navBarUl = navBar.find(".top-bar-section ul");

                    _.each(items, function (item) {
                        var $item = $(_.template(template, item, { variable: "item" }));
                        if (item.menu && (item.menu.menuitem.length > 0 || item.menu.menuitem != null)) {
                            $item.addClass("has-dropdown");
                            var submenu = $('<ul class="dropdown"></ul>');

                            if (Array.isArray(item.menu.menuitem)) {
                                _.each(item.menu.menuitem,
                                    function (subitem) {
                                        submenu.append(_.template(template, subitem, { variable: "item" }));
                                    });
                            } else {
                                submenu.append(_.template(template, item.menu.menuitem, { variable: "item" }))
                            }
                            $item.append(submenu);
                            navBarUl.append($item);

                        }
                    });
                    //navBarUl.append('<li><a href="/shop/quick-purchase/">Quick Purchase</a></li><li><a class="b2bLogout" href="#">Log Off</a></li>');
                    //navBarUl.append('<li><a href="/shop/quick-order/">Quick Order</a></li><li><a class="b2bLogout" href="#">Log Off</a></li>');

                    if (!Redant.util.browser.isMobile()) {
                        if (sitekey.toLowerCase() === "wg") {
                            $('.pageContainerInner').prepend(navBar);
                        }
                        else {
                            $("#container").prepend(navBar);
                        }
                    }

                    $(document).foundation("off").foundation();

                });
        }


    };
    return exports;
}();
Wg.b2b.init();

function closeIframeWindow() {
    $("#popup").foundation("reveal", "close");
    popup = false;
}
//}(document, $, window);
