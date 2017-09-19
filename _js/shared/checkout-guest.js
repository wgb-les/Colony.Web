$(document)
    .ready(function () {
                    if ($(this).is(':checked')) {
                        $('[data-password-visible]').show().attr('data-password-visible', 'true');
                    } else {
                        $('[data-password-visible]').hide().attr('data-password-visible', 'false');
                    }
        $('[data-delivery-display]').removeClass('hide');

        $('input[type=submit]')
            .on('click',
                function () {
                    if ($('#GuestRegister').is(':checked')) {
                        if (!validate()) {
                            return false;
                        }
                    }
                });
        $('#GuestRegister')
            .on('click',
                function () {
                    if ($(this).is(':checked')) {
                        $('[data-password-visible]').show().attr('data-password-visible', 'true');
                    } else {
                        $('[data-password-visible]').hide().attr('data-password-visible', 'false');
                    }
                });
        if ($('span[data-delivery-total]').text() === '0.00') {
            $('div[data-delivery-display]').addClass('hide');
            $('div[data-delivery-display-free]').removeClass('hide');
        }

        //$('[data-password]').on('blur', validate);
    });
