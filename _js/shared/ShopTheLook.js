_.templateSettings.variable = "rc";
function getQuickShop(productCodes) {
    var ajaxURL = '/shops/wgshopsearch/ShopTheLook/?products=' + productCodes;
    var _this = this;
    this.ajaxReference = $.ajax({
        url: ajaxURL,
        type: 'POST',
        data: this.query,
        responseType: 'json',
        complete: function () {
            _this.ajaxReference = null;
        },
        error: function(xhr) {
            //alert(xhr.status);
        },
        success: function (data) {
            _this.renderQuickShop(data);
        }
    });
}

function renderQuickShop(data) {
    if (data) {
        this.dataLastLoaded = data;
    } else {
        data = this.dataLastLoaded;
    }

    if (!data) {
        return;
    }
    var $ModelHolder = $('#ModalHolder');
    $ModelHolder.replaceWith(data);

    // Get the modal
    var modal = document.getElementById('sl-modal');
    $('#sl-modal').show();
    // When the user clicks on the button, open the modal
    $('.sl-trigger-modal').click(function () {
        $('#sl-modal').show();
     //   $('#sl-modal').css('display', 'block');
        $('.sl-modal-popup').show();
    });
    // When the user clicks on <span> (x), close the modal
    $('.sl-close').click(function () {
        $('#sl-modal').hide();
    });
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    // Share Modal
    $('.sl-trigger-ShopTheLook').click(function () {
        $('.sl-modal-popup').hide();
        $('.sl-ShopTheLook-modal').show();
    });
}