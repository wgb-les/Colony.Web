
//
// HOMEPAGE START
//


var doc = document,
	win = window,
	container = $('#container'),
	content = $('#content');

var homeCarousel = {
    el: {
        carousel: $('.brand-carousel'),
        nextArrow: $('.pageArrow.right'),
        prevArrow: $('.pageArrow.left'),
        brandList: $('.brand-list')
    },
    changeSlide: function (brand) {

        var self = this,
			brand = brand,
			$current = $('.brand-carousel-slide.active'),
			$next = $('.brand-carousel-slide[data-brand="' + brand + '"]');

        $('.brand-carousel-slide').removeClass('pending');
        $next.addClass('pending');

        $current.stop().animate({
            opacity: 0,
            avoidCSSTransitions: true
        }, 650, function () {

            $current.removeClass('active').css({ 'opacity': '' });
            $next.removeClass('pending').addClass('active');

        });

    },
    nextSlide: function (brand) {

        var $next = $('.brand-list li[data-brand="' + brand + '"').next().find('.brand-toggle');

        if ($next.length) {
            $next.trigger('click');
        } else {
            $('.brand-list li:first-child').find('.brand-toggle').trigger('click');
        }

    },
    prevSlide: function (brand) {

        var $prev = $('.brand-list li[data-brand="' + brand + '"').prev().find('.brand-toggle');

        if ($prev.length) {
            $prev.trigger('click');
        } else {
            $('.brand-list li:last-child').find('.brand-toggle').trigger('click');
        }

    },
    getCurrent: function () {

        var self = this,
			current = $('.brand-carousel-slide.active').data('brand');

        return current;

    },
    init: function () {

        var self = this;

        $(self.el.nextArrow).on('click', function (e) {
            e.preventDefault();
            self.nextSlide(self.getCurrent());
        });

        $(self.el.prevArrow).on('click', function (e) {
            e.preventDefault();
            self.prevSlide(self.getCurrent());
        });

        //Brand Toggle
        $('.brand-toggle').on('click', function (e) {
            var brand = $(this).parent().data('brand');

            e.preventDefault();

            $('.brand-toggle').removeClass('active');
            $('.brand-content').removeClass('active');

            $(this).addClass('active');
            $(this).next().addClass('active');

            self.changeSlide(brand);

        });

        $('.close', '.brand-content').on('click', function (e) {
            e.preventDefault();
            $(this).parent().removeClass('active');
        });

    }
};



$(document).ready(function () {


    $(".item").hover(function () {
        $(".quickViewProduct").hide();
    });

    //Homepage grid starts
    if (homeCarousel.el.carousel.length > 0) {
        homeCarousel.init();
    };

    if (!$.cookie('acceptCookieLawWG')) {
        $('#cookiePolicy').animate({
            right: '0px',
            avoidCSSTransitions: true
        }, 500, function () { });
        $.cookie('acceptCookieLawWG', true);
    }

    $('#cookieClose').click(function () {
        $('#cookiePolicy').animate({
            right: '-320px',
            avoidCSSTransitions: true
        }, 500, function () { });
        $.cookie('acceptCookieLawWG', true);
    });

    $(".searchSite").click(function () {
        var windowHeight = $(window).height();
        var colourPanel = $('.searchPanel .colours');

        if ($('.searchPanel').is(":visible")) {
            $('.searchPanel').fadeToggle(function () {
                $('.searchSite').animate({
                    bottom: '10px'
                }, 100, function () { });
            });

        } else {
            $(this).animate({
                bottom: '10px'
            }, 100, function () {
                $('.searchPanel').fadeIn();
            });
        }

        if (windowHeight <= 750) {
            colourPanel.addClass('col-2');
        } else {
            colourPanel.removeClass('col-2');
        }

        return false;
    });

    $('.colours a, .brands a, .colours label, .brands label').bind("click", function () {
        var el = $(this);

        if (el.parent().hasClass('toggleAll')) {
            $(this).parent().siblings('ul').children().children().toggleClass('selected');
            return false;
        }

        if (el.hasClass('selected')) {
            $(this).removeClass('selected');
            el.css('border-width', 'none');
            return false
        }

        $(this).addClass('selected');
        return false;
    });

    $('.scroller').each(function () {
        var resultSize = 0;
        $(this).find('.results > li').each(function () {

            resultSize = resultSize + parseInt($(this).width());
        });
        $(this).find('.results').width(resultSize + 12);

    });

    var RecentScroller;
    $('.toggleRecent').bind("click touch", function () {
        resetMenu();
        if (!$('#recentlyViewed').is(":visible")) {
            $('#recentlyViewed').slideDown();
        }
        if (!$('#recentlyViewed .scroller').hasClass('iScollInit')) {
            RecentScroller = new IScroll('#recentlyViewed .scroller', {
                eventPassthrough: false,
                scrollX: true,
                scrollY: false,
                wheelHorizontal: true
            });
        }
        $('#recentlyViewed .scroller').addClass('iScollInit');
        return false;
    });

    var DeepLinksScroller;
    var RecentScroller;
    $('.toggleInspire').click(function () {
        resetMenu();
        if (!$('#deepLinks').is(":visible")) {
            $('#deepLinks').slideDown();
        }
        if (!$('#deepLinks .scroller').hasClass('iScollInit')) {
            RecentScroller = new IScroll('#deepLinks .scroller', {
                eventPassthrough: false,
                scrollX: true,
                scrollY: false,
                wheelHorizontal: true
            });
        }
        $('#deepLinks .scroller').addClass('iScollInit');
        return false;
    });

    var FeaturedScroller;
    $('.toggleFeatured').bind("click touch", function () {
        resetMenu();
        if (!$('#featured').is(":visible")) {
            $('#featured').slideDown();
        }
        if (!$('#featured .scroller').hasClass('iScollInit')) {
            FeaturedScroller = new IScroll('#featured .scroller', {
                eventPassthrough: false,
                scrollX: true,
                scrollY: false,
                wheelHorizontal: true
            });
        }
        $('#featured .scroller').addClass('iScollInit');
        return false;
    });


    var WhereToBuyScroller;
    $('.toggleStockist').bind("click touch", function () {

        resetMenu();
        if (!$('#whereToBuy').is(":visible")) {

            $('#whereToBuyResults').css('bottom', '-300px');
            $('#whereToBuy').css('bottom', '-50px');
            $('#whereToBuy').css('display', 'block');

            $('#whereToBuy').removeClass('leftMenu');
            $('#whereToBuy').css('opacity', '1');
            $('#whereToBuy').css('bottom', '-50px');



            $('#whereToBuy').animate({
                bottom: '100px',
                avoidCSSTransitions: true
            }, 500, function () { });

        }
        if ($('#whereToBuyResults .scroller').hasClass('mapClosed')) {
            WhereToBuyScroller = new IScroll('#whereToBuyResults .scroller', {
                eventPassthrough: false,
                scrollX: true,
                scrollY: false,
                wheelHorizontal: true
            });
        }
        return false;
    });

    $('#whereToBuySearch form .formControls .button').bind("click touch", function () {

        $('#whereToBuyResults').css('bottom', '-300px');
        $('#whereToBuyResults').css('z-index', '-1');
        $('#whereToBuyResults').css('display', 'block');
        $('#whereToBuyResults').animate({
            bottom: '0px',
            avoidCSSTransitions: true
        }, 500, function () { });


        if (!$('#whereToBuyResults .scroller').hasClass('iScollInit')) {
            WhereToBuyScroller = new IScroll('#whereToBuyResults .scroller', {
                eventPassthrough: false,
                scrollX: true,
                scrollY: false,
                wheelHorizontal: true
            });
        }
        $('#whereToBuyResults .scroller').addClass('iScollInit');
        return false;
    });

    $(document.body).on('click', '.button.showOnMap', function (event) {

        if ($('#whereToBuyResults .scroller').hasClass('iScollInit')) {
            WhereToBuyScroller.destroy();
        }
        if ($('#whereToBuyResults .scroller').hasClass('mapClosed')) {
            WhereToBuyScroller.destroy();
        }
        $('#whereToBuyResults .scroller').removeClass('iScollInit');


        setTimeout(function () {
            $('#whereToBuyResults .scroller .results').css('transform', 'translate(0px, 0px)');
            $('#whereToBuyResults .scroller .results').css('-webkit-transform', 'translate(0px, 0px)');
            $('.bottomMenu').hide();
            $('.bottomMenu').css('bottom', '100px');
            $('#whereToBuy').addClass('leftMenu');
            $('.leftMenu .scroller').each(function () {
                var resultSize = 0;
                $(this).find('.results > li').each(function () {
                    resultSize = resultSize + parseInt($(this).height());
                });
                $(this).height(resultSize + 30);
            });
            $('.leftMenu').css('left', -420);
            $('.leftMenu').show();
            $('.leftMenu').animate({
                left: 0,
            }, 500, function () {
                $('#map_content').fadeIn(function () {
                    createMap();
                });
            });
            $('#whereToBuyResults').css('overflow', 'scroll');
        }, 500);
        return false;
    });

    $('.closeMaps').bind("click touch", function () {
        $('#map_content').fadeOut(function () {
            $('.leftMenu').animate({
                left: -420,
            }, 500, function () {
                $('.leftMenu').fadeOut(function () {
                    $('.leftMenu .scroller').css('height', 'auto');
                    $('.leftMenu').css('left', '0');
                    $('#whereToBuy').removeClass('leftMenu');
                });
            });
        });
        $('#whereToBuyResults .scroller').addClass('mapClosed');
        return false;
    });

    var StudioScroller;
    $('.toggleScrapbook').bind("click touch", function () {
        resetMenu();
        $('#studio').slideDown();
        if (!$('#studio .scroller').hasClass('iScollInit')) {
            StudioScroller = new IScroll('#studio .scroller', {
                eventPassthrough: false,
                scrollX: true,
                scrollY: false,
                wheelHorizontal: true
            });
        }
        $('#studio .scroller').addClass('iScollInit');
        return false;
    });
});


function createMap() {

    $("#whereToBuyResults").niceScroll({});

    if (!$('#map_content').hasClass('mapInit')) {
        var stores = [
		['Test Store',
		52.511467,
		13.447179,
		1,
		"<div style='width:500px'>\
		<img src='_images/placeholders/article.jpg' class='left' width='250' style='margin-right:20px' />\
		<div class='details'>\
		<h2>John Lewis</h2>\
		<p>Oxford Street<br/>London<br/>W1A 1EX</p>\
		<a style='line-height:24px';>020 769 771</span></a><br/>\
		<a style='line-height:24px';>ji_oxford_street@johnlewis.co.uk</span></a><br/>\
		<a style='line-height:24px';>www.johnlewis.co.uk</span></a>\
		</div>\
		</div>"
		],
		['Test Store',
		52.519564,
		13.428013,
		1,
		"<div style='width:500px'>\
		<img src='_images/placeholders/article.jpg' class='left' width='250' style='margin-right:20px' />\
		<div class='details'>\
		<h2>John Lewis</h2>\
		<p>Oxford Street<br/>London<br/>W1A 1EX</p>\
		<a style='line-height:24px';>020 769 771</span></a><br/>\
		<a style='line-height:24px';>ji_oxford_street@johnlewis.co.uk</span></a><br/>\
		<a style='line-height:24px';>www.johnlewis.co.uk</span></a>\
		</div>\
		</div>"
		],

		['Test Store',
		52.515072,
		13.375999,
		1,
		"<div style='width:500px'>\
		<img src='_images/placeholders/article.jpg' class='left' width='250' style='margin-right:20px' />\
		<div class='details'>\
		<h2>John Lewis</h2>\
		<p>Oxford Street<br/>London<br/>W1A 1EX</p>\
		<a style='line-height:24px';>020 769 771</span></a><br/>\
		<a style='line-height:24px';>ji_oxford_street@johnlewis.co.uk</span></a><br/>\
		<a style='line-height:24px';>www.johnlewis.co.uk</span></a>\
		</div>\
		</div>"
		]
        ];
        var markers = [];
        var iterator = 0;
        var myLatlng = new google.maps.LatLng(52.520816, 13.410186);
        var mapOptions = {
            zoom: 14,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

        function drop() {
            for (var i = 0; i < stores.length; i++) {
                setTimeout(function () {
                    addMarker();
                }, i * 200);
            }
        }

        function setMarkers(map, markers) {
            for (var i = 0; i < markers.length; i++) {
                var sites = markers[i];
                var siteLatLng = new google.maps.LatLng(sites[1], sites[2]);
                var marker = new google.maps.Marker({
                    position: siteLatLng,
                    map: map,
                    title: sites[0],
                    optimized: false,
                    zIndex: sites[3],
                    html: sites[4],
                    animation: google.maps.Animation.DROP
                });
                var contentString = "Some content";
                google.maps.event.addListener(marker, "click", function () {
                    infowindow.setContent(this.html);
                    infowindow.open(map, this);
                });
            }
        }
        google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
            setMarkers(map, stores);
        });
        infowindow = new google.maps.InfoWindow({
            content: "loading..."
        });
        $('#map_content').addClass('mapInit');
    }
}