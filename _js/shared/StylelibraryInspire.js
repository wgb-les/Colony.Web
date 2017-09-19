function filterArticles(filter) {
    var keyWords = $('#InspireWordSearch').val();
    var page = $('#pageNumber').val();
    var filtercontainer = $('#InspireFilterHolder');

    var _this = this;
    if ($('#' + filter + 'filter').hasClass('InspireButtonSelected')) {
        filtercontainer.find('*').removeClass('InspireButtonSelected');
        filter = '';
    } else {
        filtercontainer.find('*').removeClass('InspireButtonSelected');
        $('#InspireFilterHolder>button').removeClass('InspireButtonSelected');
        var $filter = $('#' + filter + 'filter');
        $filter.toggleClass('InspireButtonSelected');
    }

    var ajaxURL = '/inspire/FilterArticles/?filter=' + filter + '&Keywords=' + keyWords + '&page=' + page;

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
            $('#InspireSearchbar').show();
            _this.renderArticles(data);
        }
    });
    if (filter == 'clear') {
        $('#InspireWordSearch').val('');
    }

}

function getUGC() {
    var ajaxURL = '/inspire/GetUGC/';
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
            $('#InspireSearchbar').hide();
            _this.renderArticles(data);
        }
    });
    
}

function changePage(pageNo) {
    var elementfilter = $('#InspireSearchFilter').find('InspireButtonSelected');
    var filter = '';
    if (elementfilter != 'undefined') {
        filter = elementfilter.val();
    };
    var keyWords = $('#InspireWordSearch').val();
    var ajaxURL = '/inspire/FilterArticles/?filter=' + filter + '&Keywords=' + keyWords + '&page=' + pageNo;
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
            $('#InspireSearchbar').show();
            _this.renderArticles(data);
        }
    });

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

    $('#InspireWordSearch').keypress(function (e) {
        if (e.keyCode == 13) {  // detect the enter key
            e.preventDefault();
            filterArticles('keyword');
        }
    });


});