function filterCollections(filter) {
    var keyWords = $('#collectionsWordSearch').val();
    var brandKey = $('#BrandKey').val();
    var category = $('#parentCategoryId').val();
    var sortOrder = $('#SortBy').val();
    var page = filter; //$('#pageNumber').val();
    var isNew = $('#isNew').is(":checked");
    if (isNaN(page)) {
        page = "1";
    }
    var ajaxURL = '/shop/collections/FilterCollections/?category=' + category + '&brandkey=' + brandKey + '&Keywords=' + keyWords + '&page=' + page + '&isNew=' + isNew + '&sortBy=' + sortOrder;
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?category=' + category + '&brandkey=' + brandKey + '&Keywords=' + keyWords + '&page=' + page + '&isNew=' + isNew + '&sortBy=' + sortOrder;
        window.history.pushState({ path: newurl }, '', newurl);
    }
    var _this = this;
    this.ajaxReference = $.ajax({
        url: ajaxURL,
        type: 'POST',
        data: this.query,
        responseType: 'json',
        complete: function () {
            _this.ajaxReference = null;
        },
        error: function (xhr) {
            alert(xhr.status);
        },
        success: function (data) {
            _this.renderArticles(data);
        }
    });
    if (filter == 'clear') {
        $('#InspireWordSearch').val('');
    }

}
function renderArticles(data) {
    if (data) {
        this.dataLastLoaded = data;
    } else {
        data = this.dataLastLoaded;
    }

    if (!data) {
        return;
    }
    var $ResultHolder = $('#SearchResults');
    $ResultHolder.replaceWith(data);
}
$(document).ready(function () {

    $('#collectionsWordSearch').keypress(function (e) {
        if (e.keyCode == 13) {  // detect the enter key
            e.preventDefault();
            filterCollections('keyword');
        }
    });


});