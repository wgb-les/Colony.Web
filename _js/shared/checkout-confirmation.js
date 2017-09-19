$(document)
    .ready(function () {
        $('[data-password=submit]').on('click', validate);
        //$('[data-password]').on('blur', validate);
    });

function validate() {
    var $passwordInput = $('[data-password=password]');
    var $passwordConfirmInput = $('[data-password=confirm]');
    var error = false;
    if (!$passwordInput.val()) {
        $('[data-errormessage="password"]').removeClass('hide');
        $('[data-errormessage="match"]').addClass('hide');
        error = true;
    } else {
        $('[data-errormessage="password"]').addClass('hide');
    }
    if (!$passwordConfirmInput.val()) {
        $('[data-errormessage="confirm"]').removeClass('hide');
        $('[data-errormessage="match"]').addClass('hide');
        error = true;
    } else {
        $('[data-errormessage="confirm"]').addClass('hide');
    }
    if ($passwordConfirmInput.val() !== $passwordInput.val() && error === false) {
        $('[data-errormessage="match"]').removeClass('hide');
        error = true;
    } else {
        $('[data-errormessage="match"]').addClass('hide');
    }

    return !error;
}