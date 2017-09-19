var selectedFinish = "Matt";
var selectedCoats = "Two";
var selectedSurface = "InteriorWalls";
var units = $('input[name=units]:checked').val();

$(document).ready(function () {
    loadWall();
    UpdateUnits();
    CalculatePaintNeeded();
    AddWall();
    GetFinish();
    GetCoats();
    GetSurface();
    Reset();
});
function loadWall() {

    $.ajax({
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
            url: '/Calculator/MeasurementSnippet/?viewName=' + units,
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
        url: '/Calculator/MeasurementSnippet/?viewName=' + units,
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

function CalculatePaintNeeded(e) {
    $('#calculate-paint-btn').on('click', function (e) {
        e.preventDefault();
        var check = ValidateInputs();
        if (check >= $('input[name=measure]').length) {
            $('#error-message').empty().removeClass('message error');
            $('.container-flex').block({ message: null });
            var wallpaperObject = CreateJsonObject(units);
            console.log(wallpaperObject);

            $.ajax({
                url: '/Calculator/CalculatePaint',
                type: 'POST',
                data: JSON.stringify(wallpaperObject),
                contentType: 'application/json',
                dataType: 'json',
                success: function (result) {
                    $('.container-flex').unblock();
                    $('actual').empty().append(result.ActualLitres + " litres");
                    $('approx').empty().append(result.RoundedLitres + " litres");
                },
                error: function () {
                    //todo 
                    $('.container-flex').unblock();
                    alert('failed to talk to server');
                }
            });
        }
        else {
            $('.container-flex').unblock();
            $('#error-message').text('Please enter numbers only').addClass('message error');;

        }
    });
}
function GetSurface() {
    $("#surface-selector-id").change(function () {
        selectedSurface = $(this).val();
    });
}
function GetFinish() {
    $("#finish-selector-id").change(function () {
        selectedFinish = $(this).val();
    });
}
function GetCoats() {
    $("#coats-selector-id").change(function () {
        selectedCoats = $(this).val();
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

function Reset(e) {
    $('#reset-btn').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.roll').val('');
        $('#wall-group').empty();
        $('actual').empty().append("0 litres");
        $('approx').empty().append("0 litres");
        loadWall();
        return false;
    });
}
function CreateJsonObject() {
    var walls;
    if (units === "feet") {
        walls = feetWalls();
    }
    else {
        walls = getWalls();
    }
    return {
        "SelectedSurface": selectedSurface,
        "SelectedFinish": selectedFinish,
        "SelectedCoats": selectedCoats,
        "Units": units,
        "Walls": walls
    }
}

function getWalls() {
    var wallList = [];
    $('#wall-group > div').each(function () {
        var width = $(this).find('.width').val();
        var height = $(this).find('.height').val();
        var obj = { "Width": width, "Height": height }
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