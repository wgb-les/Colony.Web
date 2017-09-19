$(document)
    .ready(function() {
        $('[data-showaddress]')
            .on('click',
                function () {
                    $('[data-button]').val('Add address');
                    if ($(this).attr('data-showaddress') === 'true') {
                        $('div[data-newaddress]').show();
                        var title = $(this).attr('data-showaddress-title');
                        $('[data-editaddress-title]').text(title);
                        location.hash = "#addressbox";
                        return false;
                    } else {
                        $('div[data-newaddress]').hide();
                        location.hash = "";
                        return false;
                    }
                });
        $('[data-editaddressid]')
            .on('click',
                function() {
                    var id = $(this).attr('data-editaddressid');
                    $('input[name="Address.AddressId"]').val($(this).attr('data-editaddressid'));
                    $('[data-editaddressfield]', $(this).parent().parent())
                        .each(function() {
                            var name = $(this).attr('data-editaddressfield');
                            $('[name="' + name + '"]').val($(this).text());
                        });
                    $('[data-button]').val('Update address');
                    return false;
                });
        if ($('.validation-summary-errors').size() > 0) {
            $('div[data-newaddress]').show();
        }

        function calculatePrices() {
            var sum = 0;
            $('input[data-delivery-price]')
                .filter(':checked')
                .each(function() {
                    sum += Number($(this).attr('data-delivery-price'));
                });
            $('[data-delivery-total]').text(sum.toFixed(2));
            if (sum > 0) {
                $('[data-delivery-display-free]').addClass('hide');
                $('[data-delivery-display]').removeClass('hide');
            } else {
                $('[data-delivery-display-free]').removeClass('hide');
                $('[data-delivery-display]').addClass('hide');                
            }
            var grandTotal = Number($('[data-delivery-subtotal]').text()) + Number($('[data-delivery-total]').text());
            
            $('[data-delivery-grandtotal]')
                .text(grandTotal.toFixed(2));
        }

        calculatePrices();
        $('[data-delivery-price]')
            .on('click',
                function() {
                    calculatePrices();
                });
    });