var wallPaperWidthLabel = $('#roll-width-label');
var wallPaperHeightLabel = $('#roll-height-label');
var units = $('input[name=units]:checked').val();

$("#roll-pattern-match").val($("#loadedPatternMatch").val());

$(document).ready(function () {

    loadWall();
    UpdateUnits();
    CalculateRollsNeeded();
    AddWall();
    Reset();

    // $("#roll-pattern-match").val($("#loadedPatternMatch").val());

});


function loadWall() {

    $.ajax({
        //url: '/home/MeasurementSnippet/?viewName=' + units,
        url: '/calculator/MeasurementSnippet/?viewName=' + units,
        type: 'GET',
        dataType: 'html'
    })
 .success(function (result) {
     $("#wall-group").html(result);
     UpdateWallId();
 });
}

function UpdateUnits() {
    $('input[name=units]').change(function () {
        units = $('input[name=units]:checked').val();
        changeWall();
    });
}

function AddWall() {
    $('#add-row-btn').on('click', function (e) {
        e.preventDefault();

        $.ajax({
            //url: '/home/MeasurementSnippet/?viewName=' + units,
            url: '/calculator/MeasurementSnippet/?viewName=' + units,
            type: 'GET',
            dataType: 'html',
            success: function (result) {
                $('#wall-group').append(result);
                UpdateWallId();
            },
            error: function () {
                //todo 
                alert('failed');
            }
        });
        return false;
    });
}

function changeWall() {

    $.ajax({
        //url: '/home/MeasurementSnippet/?viewName=' + units,
        url: '/calculator/MeasurementSnippet/?viewName=' + units,
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            $('#wall-group').empty().append(result);
            UpdateWallId();
        },
        error: function () {
            //todo 
            alert('failed');
        }
    });
}

function WallCount() {
    return $("#wall-group div").length;
}

function UpdateWallId() {
    var count = $("#wall-group > div").length;
    var lastWall = $("#wall-group > div:last-child");
    var id = lastWall.attr('data-wall');
    var newId = id + count;
    $("#wall-group > div:last-child").attr('data-wall', newId);
}

function CalculateRollsNeeded(e) {
    $('#calculate-rolls-btn').on('click', function (e) {
        e.preventDefault();
        var check = ValidateInputs();
        var check2 = ValidateRolls();
        if (check >= $('input[name=measure]').length && check2 >= 2) {
            $('#error-message').empty().removeClass('message error');
            $('#error-message-2').empty().removeClass('message error');
            $('.container-flex').block({ message: null });
            var wallpaperObject = CreateJsonObject(units);

            $.ajax({
                url: '/calculator/CalculatePaper',
                type: 'POST',
                data: JSON.stringify(wallpaperObject),
                contentType: 'application/json',
                dataType: 'json',
                success: function (result) {
                    $('.container-flex').unblock();
                    
                    if (result.ActualTotal === result.RoundedTotal) {
                        $('actual').empty().append(result.ActualTotal + " rolls. " + result.AdditionalAdded);
                    } else {
                        $('actual').empty().append(result.ActualTotal + " rolls rounded up to " + result.RoundedTotal + " rolls. " + result.AdditionalAdded);
                    }

                    if (result.TotalPriceString !== null && result.TotalPriceString !== "£0.00") {
                        $('totalprice').empty().append(result.TotalPriceString);
                        $('#pricing-info').show();
                    }
                },
                error: function () {
                    //todo 
                    $('.container-flex').unblock();
                    alert('failed to talk to server');
                }
            });
        }
        else {
            if (check < $('input[name=measure]').length) {
                $('#error-message').text('Please enter numbers only').addClass('message error');
            }
            if (check2 < 2) {
                $('#error-message-2').text('Please enter numbers only for the paper measurements').addClass('message error');
            }
        }
    });
}


function ValidateInputs() {

    var int = 0;
    $('.widthInch').each(function () {
        if ($(this).val().length === 0) {
            $(this).val('0');
        }
    });
    $('.heightInch').each(function () {
        if ($(this).val().length === 0) {
            $(this).val('0');
        }
    });
    $('input[name=measure]').each(function () {
        if ($.isNumeric($(this).val())) {
            int++;
            $(this).removeClass('has-error');
        }
        else {
            int--;
            $(this).addClass('has-error');
        }
    });
    return int;
};

function ValidateRolls() {

    var int = 0;
    if ($.isNumeric($('#roll-width').val())) {
        int++;
        $('#roll-width').removeClass('has-error');
    }
    else {
        int--;
        $('#roll-width').addClass('has-error');
    }
    if ($.isNumeric($('#roll-height').val())) {
        int++;
        $('#roll-height').removeClass('has-error');
    }
    else {
        int--;
        $('#roll-height').addClass('has-error');
    }
    return int;

}

function Reset(e) {
    $('#reset-btn').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.roll').val('');
        $('#wall-group').empty();
        $('actual').empty().append("0 rolls");
        $('approx').empty().append("0 rolls");
        loadWall();
        //hides the price on reset
        $('#pricing-info').hide();
        return false;
    });
}

function CreateJsonObject() {
    var walls;

    if (units === "feet") {
        walls = feetWalls();
    }
    else if( units === "inches") {
        walls = getInchWalls();
    }
    else {
        walls = getWalls();
    }

    return {
        "Units": units,
        "SSp": $('#Ssp').val(),
        "RollDimensions": {
            "Width": ($('#roll-width').val()),
            "Height": $('#roll-height').val() * 100,
            "PatternMatch": $("#roll-pattern-match").val(),
            "PatternRepeat": $("#roll-repeat").val()
},
        "Walls": walls
    }
}

function getWalls() {
    var wallList = [];
    $('#wall-group > div').each(function () {
        var width = $(this).find('.width').val();
        var height = $(this).find('.height').val();
        var obj = { "Width": width * 100, "Height": height * 100 }
        wallList.push(obj);
    });
    return wallList;
}

function feetWalls() {
    var wallList = [];
    $('#wall-group > div').each(function () {
        var width = parseFloat(($(this).find('.widthFeet').val() * 12)) + parseFloat($(this).find('.widthInch').val());
        var height = parseFloat(($(this).find('.heightFeet').val() * 12)) + parseFloat($(this).find('.heightInch').val());
        var obj = { "Width": width, "Height": height }
        wallList.push(obj);
    });
    return wallList;
}

function getInchWalls() {
    var wallList = [];
    $('#wall-group > div').each(function () {
        var width = $(this).find('.width').val();
        var height = $(this).find('.height').val();
        var obj = { "Width": width, "Height": height}
        wallList.push(obj);
    });
    return wallList;
}


