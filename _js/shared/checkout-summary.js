$(document)
    .ready(function() {
        $('[data-summarytab]')
            .on('click',
                function() {
                    var value = $(this).attr('data-summarytab');
                    $('[data-summarypanel]').removeClass('is-active').attr('aria-hidden', 'true');
                    $('[data-summarypanel=' + value + ']').addClass('is-active').attr('aria-hidden', 'false');
                    $('li').removeClass('is-active');
                    $(this).parent().addClass('is-active');
                    $('a[data-summarytab]').attr('aria-selected', 'false');
                    $(this).attr('aria-selected', 'true');
                    return false;
                });
    });