jQuery.fn.forceNumeric = function() {

    return this.each(function() {
        //$(document).on('keydown', this, function (e) {
        //    var key = e.which || e.keyCode;

        //    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
        //        // numbers   
        //        key >= 48 && key <= 57 ||
        //        // Numeric keypad
        //        key >= 96 && key <= 105 ||
        //       // // comma, period and minus, . on keypad
        //       //key == 190 || key == 188 || key == 109 || key == 110 ||
        //        // Backspace and Tab and Enter
        //       key == 8 || key == 9 || key == 13 ||
        //        // Home and End
        //       key == 35 || key == 36 ||
        ////        // left and right arrows
        //       key == 37 || key == 39 ||
        //       // // Del and Ins
        //        //key == 46 || key == 45)
        //       key == 45)
        //        return true;

        //    return false;
        //});
        console.log(this);
        $(this).on("keydown", function(e) {
            var key = e.charCode || e.keyCode;

            if (
                (key == 8) ||
                (key == 37) ||
                (key == 39) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105)
            )
                return true;
            return false;

        });
        $(this).on("change", function(e) {
            if (this.value != null) {
                this.value = this.value.replace(/[^0-9]+/g, "");
                if (this.value < 1) this.value = 0;
            }
        });
    });
}