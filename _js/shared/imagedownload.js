window.Wg = window.Wg || {};
Wg.ImageDownload = Wg.ImageDownload || function() {

    function setupImageResults() {
        $(document).on("click", "#imageResults .action .button", function(e) {
            e.preventDefault();
            console.log($(this));
            if ($(this).hasClass("remove")) {
                RemoveFromImageBasket($(this).attr("data-image-id"));
                $(this).removeClass("remove").text("Add to Basket");
                return false;
            } else {
                AddToImageBasket($(this).attr("data-image-id"));
                $(this).addClass("remove").text("Remove from Basket");
                return false;
            }
            return false;
        });

        //Inspiration Image Gallery - Magnific
        $("#imageListContainer .thumb").magnificPopup({
            delegate: "a",
            type: "image",
            tLoading: "Loading image...",
            mainClass: "mfp-img-mobile",
            gallery: {
                enabled: false /*,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            */
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr("title");
                }
            }
        });
    }

    function setupImageBasketToggle() {
        //Image Basket Toggle

        $(".imageMiniBasket .items").hide();

        $(".basketMessage a").off("click");
        $(".basketMessage a").on("click", function(e) {
            e.preventDefault();
            $(this).parents(".basketMessage").toggleClass("expanded");
            $(this).parents(".basketMessage").siblings(".items").toggle();
            return false;
        });

        $(".imageMiniBasket .remove").off("click");
        $(".imageMiniBasket .remove").on("click", function(e) {
            e.preventDefault();
            RemoveFromImageBasket($(this).attr("data-image-id"));
            return false;
        });

    }

    function AddToImageBasket(imageId) {
        //alert('adding');
        var basketUrl = "/imagedownload/imagedownload/AddToBasket/?imageid=" + imageId;
        ImageBasketAjax(basketUrl);
    }

    function RemoveFromImageBasket(imageId) {
        var basketUrl = "/imagedownload/imagedownload/RemoveFromBasket/?imageid=" + imageId;
        ImageBasketAjax(basketUrl, function() {
            var button = $(".imageList .remove[data-image-id='" + imageId + "']");
            if (button != null) {
                $(button).removeClass("remove").text("Add to Basket");
            }
        });
    }

    function ImageBasketAjax(basketUrl, successCallback) {

        var isExpanded = ($(".basketMessage").hasClass("expanded"));
        //alert('start:' + isExpanded);

        $.ajax({
            type: "GET",
            url: basketUrl,
            success: function(data) {
                if (data.length > 0) {
                    $(".imageMiniBasket").replaceWith(data);

                    if (successCallback) {
                        successCallback();
                    }
                    //auto expand the basket if it was before AJAX. TODO: Fix
                    /*
                    if (isExpanded) {
                        $('.basketMessage').toggleClass('expanded');
                        $('.basketMessage').siblings('.items').show();
                        alert('expended all');
                    };
                    */
                } else {
                    console.log("no data");
                }
                setupImageBasketToggle();
            }
        });
    }

    function ajaxSearchPressImages() {
        var currentSearchForm = $("#imageDownloadSearch");

        if (currentSearchForm.length > 0) {
            var currentSearchFormId = currentSearchForm.attr("id");
            var searchUrl = "/ImageDownload/ImageDownload/Index";
            var page = $(".pagination .pageNumbers .selected").first().data("page") || 1;
            var perPage = $("#PerPage").val();

            searchUrl = searchUrl + "/?page=" + page;
            searchUrl = searchUrl + "&perpage=" + perPage;

            $("#imageListContainer *").attr("disabled", "disabled").off("click");
            $("#imageListContainer").css("opacity", "0.2");

            $.ajax({
                type: "GET",
                url: searchUrl,
                data: $(currentSearchForm).serialize(),
                success: function(data) {
                    if (data.length > 0) {
                        $("#imageListContainer").html(data);
                    } else {
                        alert("no data");
                    }
                }
            }).done(function() {
                $("#imageListContainer *").removeAttr("disabled").on("click");
                $("#imageListContainer").css("opacity", "");
            });
        } else {
            //alert("NO FORM!");
        }
    }

    function toggleClearPress(selector) {
        if ($(selector + " input:checked").length > 0) {
            $(selector + " .clearFilter").show();
        } else {
            $(selector + " .clearFilter").hide();
        }
    }

    function clearSelectedCheckPress(selector) {
        $(selector + " label.selected").each(function() { $(this).toggleClass("selected"); });
        $(selector + " input:checked").each(function() { $(this).prop("checked", false); });
        ajaxSearch();
    }

    var exports = {
        init: function() {

            $(document).ready(function() {
                $(document).on("click", "ul.imageBasket li.item a.remove", function(e) {
                    e.preventDefault();
                    var elem = $(this);
                    $.post("./remove/", "imageId=" + $(this).data("imageid") + "&__RequestVerificationToken=" + $(this).parents("form").find('input[name="__RequestVerificationToken"]').val(), function(data) {
                        //No need to wait for response.            
                    });
                    elem.parents("li").fadeOut("slow").remove();
                    return false;
                });

                $(".imageResolution").on("change", function() {

                    var basketItem = $(this).closest("div.details");

                    $(".lowResMetaData", basketItem).hide();
                    $(".lowResSpoilerMetaData", basketItem).hide();
                    $(".highResMetaData", basketItem).hide();

                    var selectedValue = $(this).val();

                    if (selectedValue == "lo") {
                        $(".lowResMetaData", basketItem).show();
                    } else if (selectedValue == "lo-spoiler") {
                        $(".lowResSpoilerMetaData", basketItem).show();
                    } else {
                        $(".highResMetaData", basketItem).show();
                    }
                });

                $(document).on("click", ".imageresselector", function(e) {
                    e.preventDefault();
                    var type = $(this).data("imageres");
                    $("select[name^='Res_']").each(
                        function() {
                            $(this).val(type);
                        });
                    return false;
                });

                toggleClearPress(".filterImageType");
                $(".filterImageType .clearFilter").bind("click", function() { clearSelectedCheckPress(".filterImageType"); });


                $("input[name='imageType']").on("change", function(e) {
                    console.log("change imageType");
                    ajaxSearchPressImages();
                    toggleClearPress(".filterImageType");
                });

                toggleClearPress(".filterCategory");
                $(".filterCategory .clearFilter").bind("click", function() { clearSelectedCheckPress(".filterCategory"); });

                $("input[name='collectionNames']").on("change", function(e) {
                    ajaxSearchPressImages();
                    toggleClearPress(".filterCategory");
                });

                setupImageResults();
                setupImageBasketToggle();
                var infiniteScroll = new InfiniteScroll($("#imageListContainer"), "/ImageDownload/ImageDownload/Index", 30, true, "html", $('<div class="loading-container"><h2>Loading</h2><div class="ajaxLoader"></div></div>'), function() { return $("#imageDownloadSearch").serialize(); });
            });
        }
    };
    return exports;
}();

Wg.ImageDownload.init();