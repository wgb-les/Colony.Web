
$(document).ready(function () {
    //getMiniBasketPartial();
    initialiseWgBasket();
    //window.removeBasketItem();
    //window.updateBasketItemQuantity();
    //getMiniBasket();
    closeMinibasket();
    $(document).ready(function () {
        setTimeout(function () {
           window.miniclassSelector();
        }, 1);
    });
});

/*-------------------WG minibasket---------------------*/
function miniclassSelector() {
    $('.ui-spinner-button').each(function () {
        if (!$('.ui-spinner-button').hasClass('basketUpdater'))
        $(this).addClass('minibasketUpdater');
    });
}



function initialiseWgBasket() {

  
    $(".triggerBasket").click(function (e) {
        e.preventDefault();
       
        getWgMiniBasket(false);

        return false;
    });
}

function getWgMiniBasket(isUpdate) {
    $.ajax({
        url: "/actionuri/ShopPurchase/Basket/MiniBasket/",
        cache: false,
        success: function (response) {
            if (!isUpdate) {
                applyStyleLibraryData(response);
            }
            else if (isUpdate) {
                $(".miniBasket .sideInnerContainer").empty();
                $(".miniBasket .sideInnerContainer").append(response);
            }
            
        }
    });

}

function getWgMiniBasketJson() {
    $.ajax({
        url: "/actionuri/ShopPurchase/Basket/MiniBasket/?getBasketTotal=true",
        cache: false,
        dataType: 'json',
        success: function (response) {
            console.log(response);
            $('#totalValue').text("£" + response.basketTotal);
        }
    });

}


function applyStyleLibraryData(basketData) {
    $(".miniBasket .sideInnerContainer").empty();
    $(".miniBasket .sideInnerContainer").append(basketData);
    $(".darkenOverlay").fadeIn();
    $(".mainViewPort").animate({ left: "-350px" }, 300);
    $(".miniBasket").fadeIn();
    $(".mainViewPort, body, html").addClass("noScroll");
};

function closeMinibasket() {
    $(document).on("click", ".darkenOverlay, #closeBasket", function (e) {
        e.preventDefault();


        $(".mainViewPort").removeClass("active");
        $(".sideModal").fadeOut();
        $(".mainViewPort").animate({ left: "0" }, 300);
        $(".darkenOverlay").fadeOut();
        $(".mainViewPort, body, html").removeClass("noScroll");        
        $(".darkenLevel").fadeOut();

        return false;
    });
}

/*-------------------Update WG basketlines---------------------*/


function removeBasketItem() {
    $(document).on("click", ".removeBasketItem", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var skuId = $(this).attr('data-skuId');
        var jsonObject = { "SkuId": skuId, "UpdateType": "remove" };
        $.ajax({
            url: "/Basket/UpdateMiniBasket/",
            cache: false,
            type: "POST",
            data: jsonObject,
            success: function (response) {
                getWgMiniBasket(true);
            }
        });
        return false;
    });
}

function updateBasketItemQuantity() {
    $(document).on("click", ".minibasketUpdater", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $('.basketProductContainer').block({
            message: 'Updating...',
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                color: '#eee'
            }
        });
        var skuId = $(this).parents('div').attr('data-divId');
 
        var quantity = $(this).siblings('input').val();
        var jsonObject = { "SkuId": skuId, "UpdateType": "quantity", "Quantity": quantity };
        $.ajax({
            url: "/Basket/UpdateMiniBasket/",
            cache: false,
            type: "POST",
            data: jsonObject,
            success: function (response) {
                getWgMiniBasketJson();
                $('.basketProductContainer').unblock();
            }
        });
        return false;
    });
}

/*----------------------------------------------------*/
function getMiniBasketPartial() {
    /*-- Update basket quatity --*/
    $.ajax({
        url: "/basket/minibasketparital",
        cache: false,
        success: function (data) {
            $(".wgBasket-count").replaceWith(data);
            var siteKey = $("#SiteKey").val();
            if (siteKey !== "Wg") {
                initializeBasketHover();
            }
        }
    });
    /*--  Load side basket   --*/
    $.ajax({
        url: "/basket/MiniBasket",
        cache: false,
        success: function (data) {
            $(".global-utils-list li.basket").replaceWith(data);
            getWgMiniBasket(true);
        }
    });

}

function classSelector() {
    $('.ui-spinner-button').each(function () {
        $(this).addClass('basketUpdater').removeClass('minibasketUpdater');
    });
}


function updateBasketSummaryItemQuantity() {
    $(document).on("click", ".basketUpdater", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var skuId = $(this).parents('div').attr('data-divid');

        var trDiv = "[data-skuid=" + skuId + "]";

        $('tr' + trDiv).block({
            message: 'Updating...',
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                color: '#eee'
            }
        });

        var quantity = $(this).siblings('input').val();
        var jsonObject = { "SkuId": skuId, "UpdateType": "quantity", "Quantity": quantity };
        $.ajax({
            url: "/Basket/UpdateMiniBasket/",
            cache: false,
            type: "POST",
            data: jsonObject,
            success: function (response) {
                getWgMiniBasketJson();
                $('tr' + trDiv).unblock();
            }
        });
        return false;
    });
}