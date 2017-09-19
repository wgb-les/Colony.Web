$(document)
    .ready(function () {
        if ($('[data-delivery-total]').text() > 0) {
            $('[data-delivery-display-free]').addClass('hide');
            $('[data-delivery-display]').removeClass('hide');
        } else {
            $('[data-delivery-display-free]').removeClass('hide');
            $('[data-delivery-display]').addClass('hide');                
        }

        $('[data-input=address]')
            .on('click',
                function () {
                    if ($(this).val() === 'same') {
                        $('fieldset', $('div[data-content=billing-address]')).addClass('hide');
                    } else {
                        $('fieldset', $('div[data-content=billing-address]')).removeClass('hide');
                    }
                });
        $('li[data-tab]')
            .on('click',
                function() {
                    var value = $(this).attr('data-tab');
                    $('li[data-tab]').removeClass('is-active');
                    $(this).addClass('is-active');
                    $('a[data-tab]').attr('aria-selected', 'false');
                    $('a', $(this)).attr('aria-selected', 'true');

                    $('[data-panel]').removeClass('is-active').attr('aria-hidden', 'true');
                    $('[data-panel=' + value + ']').addClass('is-active').attr('aria-hidden', 'false');

                    return false;
                });
    });