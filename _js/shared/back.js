

function saveScrapbook() {
    console.log("Save");

    $(".scrapBoobWelcome").fadeOut(400, function() {
        $(this).remove();
    });
}

$(document).ready(function() {
    $(document).bind("touchmove", false);

    if (Redant.util.getQuerystring("newScrapbook") === "true") {
        $("#scrapbookName").focus();
    } else {
        $("#scrapbookName").val("SCRAPBOOK NAME");
    }

    $("#scrapbookName").keydown(function() {
        setTimeout(function() {
            saveScrapbook();
        }, 400);
    });

    $(document.body).on("mousedown", "#scrapBook .scrap", function(event) {
        $("#scrapBook .scrap").removeClass("selected");
        $(this).addClass("selected");
    });


    $("#scraps .scrap").draggable({
        revert: true,
        stop: function() {

        }
    });


    var drWr = $("#scrapBook .added"),
        rsWr = $("#scrapBook .added .scrapInner"),
        elem = $("#scrapBook .added .scrapInner img");

    elem.resizable({
        aspectRatio: true,
        handles: "ne, nw, se, sw",
        stop: function(e, ui) {
            saveScrapbook();
        }
    });


    drWr.draggable({
        revert: false,
        containment: $("#scrapBook"),
        stop: function(e, ui) {

            saveScrapbook();
        }
    });


    elem.parent().rotatable({
        stop: function() {
            //alert('test');
        }
    });

    $("#scrapBook").droppable({
        accept: function(d) {
            if (d.hasClass("scrapAdd") || (d.attr("id") == "bar")) {
                return true;
            }
        },
        drop: function(event, ui) {
            accept: ".scrapAdd";
            ui.draggable.removeClass("scrapAdd");

            var zIndex = $(scrapBook).find(".scrap").length;

            $(scrapBook).append('<div id="1" class="scrap added" style="z-index:' + zIndex + "; width: 100px; height: 100px; left: " + (ui.draggable.position().left - 70) + "px; top: " + (ui.draggable.offset().top - 164) + 'px; position: absolute;">\
        							<div class="scrapInner">' + ui.draggable.html() + "</div>\
							    </div>");
            $(ui.draggable.remove());


            var drWr = $("#scrapBook .added:last-child"),
                rsWr = $("#scrapBook .added:last-child .scrapInner"),
                elem = $("#scrapBook .added:last-child .scrapInner img");

            elem.resizable({
                aspectRatio: true,
                handles: "ne, nw, se, sw",
                stop: function(e, ui) {
                    saveScrapbook();
                }
            });


            drWr.draggable({
                revert: false,
                containment: $("#scrapBook"),
                stop: function(e, ui) {

                    saveScrapbook();
                }
            });


            elem.parent().rotatable({
                stop: function() {
                    //alert('test');
                }
            });


            $("#scrapControls").fadeIn(300);

            $("#scrapBook .added").removeClass("selected");
            $("#scrapBook .added:last-child").addClass("selected");

            saveScrapbook();


        }
    });


    $("#scrapControls .button").click(function(e) {

        var $element = $(".selected");

        var $siblings = $element.siblings();
        var zIndexes = $siblings.map(function() {
            return $(e.currentTarget).css("z-index");
        });

        var zIndex = parseInt($element.css("z-index"));
        switch (e.currentTarget.id) {
        case "top":
            zIndex = $("#scrapBook .scrap").length + 1;
            saveScrapbook();
            break;
        case "zup":
            zIndex += 1;
            saveScrapbook();
            break;
        case "zdown":
            zIndex -= 1;
            saveScrapbook();
            break;
        case "bottom":
            zIndex = 0;
            saveScrapbook();
            break;
        case "remove":
            $(".selected").fadeOut(300, function() {
                $(".selected").remove();
            });
            saveScrapbook();
            break;
        }

        if (zIndex === -1) {
            zIndex = 0;
            $siblings.each(function() {
                var z = parseInt($(this).css("z-index")) + 1;
                $(this).css("z-index", z);
                $(this).find(".zIndex").text(z);
            });
        }
        $element.css({ zIndex: zIndex });

        e.stopPropagation();

        return false;
    });


});