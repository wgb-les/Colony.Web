function classSelector() {
    $('.ui-spinner-button').each(function () {
        $(this).addClass('basketUpdater').removeClass('minibasketUpdater');    });
}


function updateBasketSummaryItemQuantity() {
    $(document).on("click", ".basketUpdater", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var skuId = $(this).parents('div').attr('data-divid');

        var trDiv = "[data-skuid=" + skuId + "]";
        
        $('tr'+trDiv).block({
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