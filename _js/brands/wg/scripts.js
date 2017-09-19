$(document).ready(function() {
    $('.sl-share-modal').hide();

    $('.toggleOptions').click(function() {
      var text = $(this).text();
      $(".furniture-option").toggle();
      $(this).toggleClass('fa-angle-down');
      $(this).toggleClass('fa-angle-up');
      $(this).text(text == "Show Less options" ? "Show More options" : "Show Less options");
    });

    
    //Toggle selected paint chart
    $('.sl-modal-image-option').click(function() {
      $(this).toggleClass("selected");
    });


    // var test = $('.sl-items-container[data-value="otherColours"] .sl-item').length;
    if ($('.sl-items-container[data-value="otherColours"] .sl-item').length < 10) {
      $(".toggleColours").hide();
    }

    
    // Get the modal
    var modal = document.getElementById('sl-modal');

    // When the user clicks on the button, open the modal
	$('.sl-trigger-modal').click(function() {
		$('#sl-modal').show();
	});

    // When the user clicks on <span> (x), close the modal
	$('.sl-close').click(function() {
		$('#sl-modal').hide();
		$('#WallpaperCalculatorModal').hide();
        $('#PaintCalculatorModal').hide();
        $('.sl-paintchart-modal').hide();
        $('.sl-share-modal').hide();
	});

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // PPSQM Calcs
    var sqm = $('.sl-calc-price').text() / ($('.sl-calc-width').text() * ($('.sl-calc-length').text() / 100));
    var sqmPanel = $('.sl-calc-price').text() / (($('.sl-calc-width').text() / 100) * ($('.sl-calc-length').text() / 100));

    var total = sqm.toFixed(2);
    var totalPanel = sqmPanel.toFixed(2);

    $('.sl-calc-total').text(total);
    $('.sl-calc-total-panel').text(totalPanel);


	// Share Modal
	$('.sl-trigger-share').click(function() {
		$('.sl-modal-popup').hide();
		$('.sl-share-modal').show();
	});

	// Paint Chart Modal
	$('.sl-trigger-paintchart').click(function() {
		//$('.sl-modal-popup').hide();
		$('.sl-paintchart-modal').show();
	});

    //Wallpaper Calculator Modal
	$('#WallpaperCalculatorLink').click(function () {
	    $('#sl-modal').show();
	    $('#WallpaperCalculatorModal').show();
    });
	
    //PaintCaclulator Modal
	$('#PaintCalculatorLink').click(function () {
        $('#sl-modal').show();
        $('#PaintCalculatorModal').show();
	});


    var width = $(window).width();

    // Slider Product Images
    $('.sl-product-images').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        asNavFor: '.slider-thumbs'
    });

    if ((width <= 768)) {
        //Slider Thumbs
        $('.slider-thumbs').slick({
            slidesToShow: 4,
            asNavFor: '.sl-product-images',
            focusOnSelect: true
        });
        //Slider Items
        $('.slider-items').slick({
            slidesToShow: 3,
            slidesToScroll: 1
        });
        //Recent Viewed Items
        $('.slider-recents').slick({
            slidesToShow: 3,
            slidesToScroll: 1
        });
        //You May Also LIke
        $('.slider-youMayAlsoLike').slick({
            slidesToShow: 3,
            slidesToScroll: 1
        });
    } else {
        //Slider Thumbs
        $('.slider-thumbs').slick({
            slidesToShow: 7,
            asNavFor: '.sl-product-images',
            focusOnSelect: true
        });
        //Slider Items
        $('.slider-items').slick({
            slidesToShow: 4,
            slidesToScroll: 1
        });
        //Recent Viewed Items
        $('.slider-recents').slick({
            slidesToShow: 8,
            slidesToScroll: 1
        });
        //You May Also LIke
        $('.slider-youMayAlsoLike').slick({
            slidesToShow: 5,
            slidesToScroll: 1
        });
    }

    if ((width <= 414)) {
        // Toggle Other Colours
        $('.sl-items-container[data-value="otherColours"] .sl-item').removeClass('sl-wide-10');
        $('.sl-items-container[data-value="otherColours"] .sl-item').addClass('sl-wide-6');
        $('.toggleColours').click(function() {
            $('.sl-items-container[data-value="otherColours"] .sl-item:nth-child(n+7)').toggle();
            $(this).text($(this).text() == 'Show more avaliable colours.' ? 'Show less avaliable colours.' : 'Show more avaliable colours.');
            $(this).toggleClass('fa-angle-down');
            $(this).toggleClass('fa-angle-up');
        });
    } else {
        // Toggle Other Colours
        $('.toggleColours').click(function() {
            $('.sl-items-container[data-value="otherColours"] .sl-item:nth-child(n+11)').toggle();
            $(this).text($(this).text() == 'Show more avaliable colours.' ? 'Show less avaliable colours.' : 'Show more avaliable colours.');
            $(this).toggleClass('fa-angle-down');
            $(this).toggleClass('fa-angle-up');
        });
    }

    // Tab Section
    $('.sl-tab[data-value=productDetails]').click(function() {
        $('.sl-tab').removeClass('active');
        $(this).addClass('active');
        $('.sl-content').hide();
        $('.sl-content[data-value=productDetails]').fadeIn();
    });
    $('.sl-tab[data-value=productTechSpecs]').click(function() {
        $('.sl-tab').removeClass('active');
        $(this).addClass('active');
        $('.sl-content').hide();
        $('.sl-content[data-value=productTechSpecs]').fadeIn();
    });
    $('.sl-tab[data-value=productCare]').click(function() {
        $('.sl-tab').removeClass('active');
        $(this).addClass('active');
        $('.sl-content').hide();
        $('.sl-content[data-value=productCare]').fadeIn();
    });
    $('.sl-tab[data-value=productDelivery]').click(function() {
        $('.sl-tab').removeClass('active');
        $(this).addClass('active');
        $('.sl-content').hide();
        $('.sl-content[data-value=productDelivery]').fadeIn();
    });
    $('.sl-tab[data-value=productTrade]').click(function () {
        $('.sl-tab').removeClass('active');
        $(this).addClass('active');
        $('.sl-content').hide();
        $('.sl-content[data-value=productTrade]').fadeIn();
    });

});









$(window).load(function() {
    // Animate loader off screen
    $(".loader").fadeOut("slow");
    $(".darken").fadeOut("slow");
});
$(document).ready(function() {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $(".menuItemAnchor").attr("href", "#");
    }


    //$("img, div").removeClass("draggable");
    //$("img, div").removeClass("ui-draggable");

    //pdpZoom();
    NewsletterRegistration();
    closeSideModal();


    $(".productTitle:contains(Paint)").parent(".product").parent("a").hide();

    $(".caption h1:has(br)").css("line-height", "35px");

    $(".promoCaptionInner p:empty").hide();


    $('.megaMenuGroupContainer').each(function() {
        if ($(this).children().length > 5) {
            $(this).addClass('sixGroups');
        }
    });

    $(".triggerSearch").click(function() {
        $(this).fadeOut();
        $(".topNavItem").not(".closeSearch").hide();
        $(".searchNav").fadeIn();
        $(".closeSearch").fadeIn();
    });

    $(".closeSearch").click(function() {
        $(".topNavItem").not(".closeSearch").fadeIn();
        $(".searchNav").hide();
        $(".closeSearch").hide();
    });





    // if ($('.megaMenuGroup').length > 5) {
    // 	$(this).parent(".megaMenuGroupContainer").addClass("sixGroups");
    // 	console.log($(this))
    // }

    // ------------ Recently Viewed Limit (8) ------------

    $(".recentlyViewedContainer .productItem").slice(8).hide();

    // ------------ More Info Sliders ------------

    $(".moreInfoTitle").click(function() {
        $(this).siblings(".toggleContent").slideToggle();
        $(this).children("p").toggleClass("fa-angle-down");
        $(this).children("p").toggleClass("fa-angle-up");
    });

    // ------------ Initialize Sliders ------------



    $('.slider.prod').slick({
        dots: true,
        autoplay: false,
        autoplaySpeed: 3000,
        adaptiveHeight: true
    });

    $('.slider.home').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        adaptiveHeight: true,
        arrows: true
    });


    $('.slider.brand').slick({
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        adaptiveHeight: true
    });

    // ------------ Product Lifestyle Image Thumbs ------------

    $('.detailImageContainer .sliderContainer .slider .slick-dots li:nth-of-type(1)').html($('.sliderSlide:nth-of-type(2) .zoom').html());
    $('.detailImageContainer .sliderContainer .slider .slick-dots li:nth-of-type(2)').html($('.sliderSlide:nth-of-type(3) .zoom').html());
    $('.detailImageContainer .sliderContainer .slider .slick-dots li:nth-of-type(3)').html($('.sliderSlide:nth-of-type(4) .zoom').html());
    $('.detailImageContainer .sliderContainer .slider .slick-dots li:nth-of-type(4)').html($('.sliderSlide:nth-of-type(5) .zoom').html());

    // ------------ Side Modals ------------

    $(document).on("click", ".triggerMenu", function(event) {
        event.preventDefault();
        $(".darkenOverlay").fadeIn();
        $(".mainViewPort").animate({
            left: "350px"
        }, 300);
        $(".sideModal").hide();
        $(".sideMenu").fadeIn();
        $(".mainViewPort, body, html").addClass("noScroll");
        return false;
    });

    $(document).on("click", ".triggerAccount", function(event) {
        event.preventDefault();
        $(".darkenOverlay").fadeIn();
        $(".mainViewPort").animate({
            left: "-350px"
        }, 300);
        $(".sideModal").hide();
        $(".accountPanel").fadeIn();
        $(".mainViewPort, body, html").addClass("noScroll");
        return false;
    });

    $('.hasChildren').click(function(event) {
        event.preventDefault();
        $(this).siblings(".mobileMenuLevel").delay(100).animate({
            left: "0px"
        }, 300);
        $(this).parent(".mobileMenuItem").parent(".megaMenuGroup").siblings(".darkenLevel").fadeIn();
    });

    $('.backUp').click(function(event) {
        event.preventDefault();
        $(this).parent(".mobileMenuItem").parent(".mobileMenuLevel").animate({
            left: "-350px"
        }, 300);
        $(".darkenLevel").fadeOut();
    });

});

if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $(document).ready(function() {
        $(".homeButtons .homeButtonContainer .secondaryButton, .homeButtons .homeButtonContainer .primaryButton").removeClass("alternate");
        $(".searchResults .product").removeClass("fourWide").addClass("twoWide");
        $(".gridOption2").addClass("active");
    });

}
/*-----------------close side modal----------------------------------------*/

function closeSideModal() {
    $(document).on("click", ".darkenOverlay, #closeAccountModal, #closeMenuModal, .back-out", function(e) {
        e.preventDefault();

        $(".mainViewPort").removeClass("active");
        $(".sideModal").fadeOut();
        $(".mainViewPort").animate({
            left: "0"
        }, 300);
        $(".darkenOverlay").fadeOut();
        $(".mainViewPort, body, html").removeClass("noScroll");
        //$(".subLevel").animate({ left: "-350px" }, 300);
        $(".darkenLevel").fadeOut();

        return false;
    });
}

$("#card-tab").click(function() {
    $(this).addClass("active");
    $(this).siblings(".tab").removeClass("active");
    $("#paypal-content").hide();
    $("#card-content").addClass("active");
    $("#card-content").fadeIn();
});

$("#paypal-tab").click(function() {
    $(this).addClass("active");
    $(this).siblings(".tab").removeClass("active");
    $("#card-content").hide();
    $("#paypal-content").addClass("active");
    $("#paypal-content").fadeIn();
});

/*-----------------register for newsletter - footer input -----------------*/

function NewsletterRegistration() {
    $('#submitNewsletter').click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var email = $('#emailForNewsletter').val();
        var newsletterRegistration = {
            "EmailAddress": email,
            "Site": "Style Library"
        }
        var ack = "";
        if (validateEmail(email)) {
            $.ajax({
                type: 'POST',
                data: JSON.stringify(newsletterRegistration),
                contentType: "application/json",
                url: '/members/register/NewsLetterRegistration',
                success: function(result) {
                    if (result) {
                        ack = "<p>Thanks!</p>";
                        $('#newsletterSubmissionFooter').empty();
                        $('#newsletterSubmissionFooter').append(ack);
                        //todo pop up to acknowledge successful registration
                    } else {
                        //todo email didn't save or Modelstate invalid
                    }
                },
                error: function() {
                    //todo ajax didn't work
                    ack = "<p>Whoops, something went wrong...</p>";
                    $('#newsletterSubmissionFooter').append(ack);
                }
            });
        } else {
            //todo pop up to say email address wasn't valid
        };

    });
}

function validateEmail(sEmail) {
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (filter.test(sEmail)) {
        return true;
    } else {
        return false;
    };
}
/*---------------zoom on pdp---------------------*/

function pdpZoom() {
    $('.mainZoom').elevateZoom({

        cursor: "crosshair",
        zoomType: "lens",
        lensShape: "round",
        lensSize: 200,
        responsive: true,
        borderColour: '#fff'

    });

    // function browserSupportsCSSProperty(propertyName) {
    //   var elm = document.createElement('div');
    //   propertyName = propertyName.toLowerCase();
    //
    //   if (elm.style[propertyName] != undefined)
    //     return true;
    //
    //   var propertyNameCapital = propertyName.charAt(0).toUpperCase() + propertyName.substr(1),
    //     domPrefixes = 'Webkit Moz ms O'.split(' ');
    //
    //   for (var i = 0; i < domPrefixes.length; i++) {
    //     if (elm.style[domPrefixes[i] + propertyNameCapital] != undefined)
    //       return true;
    //   }
    //
    //   return false;
    // }
    //
    // if (!browserSupportsCSSProperty('animation')) {
    //   $(".spinner").text('Loading...'');
    // }
};
