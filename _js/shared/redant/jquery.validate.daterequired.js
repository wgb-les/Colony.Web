(function($) {

    $.fn.getDateFromTrippleDdls = function() {
        var year = this.children().children("select:nth(2)").val();
        var month = this.children().children("select:nth(1)").val();
        var day = this.children().children("select:nth(0)").val();
        if (year == "" || month == "" || day == "") {
            return NaN;
        }

        var y = parseInt(year, 10);
        var m = parseInt(month, 10);
        var d = parseInt(day, 10);

        var date = new Date(y, m - 1, d);
        var isValidDate = date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d;
        if (isValidDate) {
            return date;
        }

        return NaN;
    };

    $.validator.unobtrusive.adapters.add("daterequired", function(options) {
        options.rules["daterequired"] = options.params;
        if (options.message) {
            options.messages["daterequired"] = options.message;
        }
    });

    $.validator.addMethod("daterequired", function(value, element, params) {
        var parent = $(element).closest(".date");
        var date = parent.getDateFromTrippleDdls();
        console.log(date);
        return !isNaN(date);
    }, "");
})(jQuery);