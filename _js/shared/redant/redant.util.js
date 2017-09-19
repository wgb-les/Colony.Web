var Redant = Redant || {};
var win = window;
var doc = document;

Redant.util = {
    browser: {
        screenWidth: function() {
            return window.innerWidth;
        },
        isTouchDevice: function() {
            return true == ("ontouchstart" in win || win.DocumentTouch && doc instanceof DocumentTouch);
        },
        isIpad: function() {
            return (navigator.platform.toLowerCase().indexOf("ipad") != -1);
        },
        isAndroidMobile: function() {
            var ua = navigator.userAgent.toLowerCase();
            return ua.indexOf("android") > -1 && ua.indexOf("mobile");
        },
        isAndroidTablet: function() {
            var ua = navigator.userAgent.toLowerCase();
            return ua.indexOf("android") > -1 && !(ua.indexOf("mobile"));
        },
        isWindowsPhone: function() {
            var ua = navigator.userAgent.toLowerCase();
            return ua.indexOf("windows phone") > -1;
        },
        isBlackberry: function() {
            var ua = navigator.userAgent.toLowerCase();
            return ua.indexOf("blackberry") > -1;
        },
        isTablet: function() {
            return this.isAndroidTablet() || this.isIpad();
        },
        isMobile: function() {
            return this.isAndroidMobile() || this.isIphone() || this.isWindowsPhone() || this.isBlackberry();
        },
        isIOS: function() {
            return (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
        },
        isIphone: function() {
            return ((navigator.platform.toLowerCase().indexOf("iphone") != -1) || (navigator.platform.toLowerCase().indexOf("ipod") != -1));

        }
    },
    getQuerystring: function(key) {
        key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + key + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    setQuerystring: function(uri, key, value) {
        var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
        separator = uri.indexOf("?") !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, "$1" + key + "=" + value + "$2");
        } else {
            return uri + separator + key + "=" + value;
        }
    },
    ajaxLoader: function() {
        var siteKey = $("#SiteKey").val();
        var ajaxLoaderCss = "";
        if (siteKey == "Zoffany") {
            ajaxLoaderCss += "dark";
        }
        return $('<div class="actionLoader"><div class="ajaxLoader ' + ajaxLoaderCss + '"></div></div>');
    },
    ajaxLoaderForButton: function() {
        var siteKey = $("#SiteKey").val();
        var ajaxLoaderCss = "";
        if (siteKey == "Zoffany") {
            ajaxLoaderCss += "dark";
        }
        return $('<div class="ajaxLoader ' + ajaxLoaderCss + '"></div>');
    },
    loadScript: function(src, onScriptLoaded) {
        if (document.body.querySelector("script[src='" + src + "']") === null) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = src;
            document.body.appendChild(script);
            if (onScriptLoaded)
                onScriptLoaded();
            return false;
        }
        if (onScriptLoaded)
            onScriptLoaded();
        return true;
    },
    placeholderStart: function(img) {
        var src = img.src;
        $(img).data("src", src);
        img.src = "/_images/placeholders/categoryList.jpg";
        var imagePlaceholder = new Image();
        imagePlaceholder.src = src;
        imagePlaceholder.onload = function() {
            $(img).fadeOut("fast", function() {
                $(img).attr("src", $(img).data("src"));
                $(img).fadeIn("fast");
            });
        };
        imagePlaceholder.onerror = function() {
            $(img).fadeOut("fast", function() {
                $(img).attr("src", $(img).data("src"));
                $(img).fadeIn("fast");
            });
        };
    },
    onDomReady: [],
    onWindowLoad: [],
    onWindowResize: [],
    onOrientationChange: []
};

if (Redant.util.onDomReady.length > 0) {

}

if (Redant.util.onWindowLoad.length > 0) {

}

if (Redant.util.onWindowResize.length > 0) {

}

if (Redant.util.onOrientationChange.length > 0) {

}
// Updated requestAnimationFrame polyfill that uses new high-resolution timestamp
//
// References:
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// https://gist.github.com/1579671
// http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision
//
// Note: this is my initial stab at it, *requires additional testing*

(function() {
    var lastTime = 0,
        vendors = ["ms", "moz", "webkit", "o"],
        // Feature check for performance (high-resolution timers)
        hasPerformance = !!(window.performance && window.performance.now);

    for (var x = 0, max = vendors.length; x < max && !window.requestAnimationFrame; x += 1) {
        window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"]
            || window[vendors[x] + "CancelRequestAnimationFrame"];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }

    // Add new wrapper for browsers that don't have performance
    if (!hasPerformance) {
        // Store reference to existing rAF and initial startTime
        var rAF = window.requestAnimationFrame,
            startTime = +new Date;

        // Override window rAF to include wrapped callback
        window.requestAnimationFrame = function(callback, element) {
            // Wrap the given callback to pass in performance timestamp
            var wrapped = function(timestamp) {
                // Get performance-style timestamp
                var performanceTimestamp = (timestamp < 1e12) ? timestamp : timestamp - startTime;

                return callback(performanceTimestamp);
            };

            // Call original rAF with wrapped callback
            rAF(wrapped, element);
        };
    }
})();
/**
 * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
win.requestInterval = function(fn, delay) {
    if (!win.requestAnimationFrame &&
        !win.webkitRequestAnimationFrame &&
        !(win.mozRequestAnimationFrame && win.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
        !win.oRequestAnimationFrame &&
        !win.msRequestAnimationFrame)
        return win.setInterval(fn, delay);

    var start = new Date().getTime(),
        handle = new Object();

    function loop() {
        var current = new Date().getTime(),
            delta = current - start;

        if (delta >= delay) {
            fn.call();
            start = new Date().getTime();
        }

        handle.value = requestAnimationFrame(loop);
    };

    handle.value = requestAnimationFrame(loop);
    return handle;
};

/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
win.clearRequestInterval = function(handle) {
    win.cancelAnimationFrame ? win.cancelAnimationFrame(handle.value) :
        win.webkitCancelAnimationFrame ? win.webkitCancelAnimationFrame(handle.value) :
        win.webkitCancelRequestAnimationFrame ? win.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
        win.mozCancelRequestAnimationFrame ? win.mozCancelRequestAnimationFrame(handle.value) :
        win.oCancelRequestAnimationFrame ? win.oCancelRequestAnimationFrame(handle.value) :
        win.msCancelRequestAnimationFrame ? win.msCancelRequestAnimationFrame(handle.value) :
        win.clearInterval(handle);
};

/**
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */

win.requestTimeout = function(fn, delay) {
    if (!win.requestAnimationFrame &&
        !win.webkitRequestAnimationFrame &&
        !(win.mozRequestAnimationFrame && win.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
        !win.oRequestAnimationFrame &&
        !win.msRequestAnimationFrame)
        return win.setTimeout(fn, delay);

    var start = new Date().getTime(),
        handle = new Object();

    function loop() {
        var current = new Date().getTime(),
            delta = current - start;

        delta >= delay ? fn.call() : handle.value = requestAnimationFrame(loop);
    };

    handle.value = requestAnimationFrame(loop);
    return handle;
};

/**
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
win.clearRequestTimeout = function(handle) {
    if (handle != null && handle != undefined)
        win.cancelAnimationFrame ? win.cancelAnimationFrame(handle.value) :
            win.webkitCancelAnimationFrame ? win.webkitCancelAnimationFrame(handle.value) :
            win.webkitCancelRequestAnimationFrame ? win.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
            win.mozCancelRequestAnimationFrame ? win.mozCancelRequestAnimationFrame(handle.value) :
            win.oCancelRequestAnimationFrame ? win.oCancelRequestAnimationFrame(handle.value) :
            win.msCancelRequestAnimationFrame ? win.msCancelRequestAnimationFrame(handle.value) :
            win.clearTimeout(handle);
};

//Console polyfill for IE
(function() {
    var method;
    var noop = function() {};
    var methods = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn", "cdtest"];
    var length = methods.length;
    var console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
win.disableScroll = false;

//JQuery Plugin for showing images only when they're within the viewport
;
(function($, win, doc, undefined) {

    var pluginName = "showImageInViewport",
        defaults = {
            propertyName: "value"
        };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    var elems = [];
    Plugin.prototype.init = function() {
        var $e = this.element;
        $($e).addClass("RAHidden");
        elems.push($e);
        var isImage = ($($e).prop("tagName").toLowerCase() === "img");
        if (isImage) {
            (isElementInViewport($e)) ? showImageForImage($e) : hideImageForImage($e);
        } else {
            (isElementInViewport($e)) ? showImageForNonImage($e) : hideImageForNonImage($e);
        }
    };
    jQuery(win).on("scroll touchmove mousewheel", function() {
        if (!win.disableScroll) {
            win.disableScroll = true;
            $.each(elems, function(index, $e) {
                var isImage = ($($e).prop("tagName").toLowerCase() === "img");
                if (isImage) {
                    (isElementInViewport($e)) ? showImageForImage($e) : hideImageForImage($e);
                } else {
                    (isElementInViewport($e)) ? showImageForNonImage($e) : hideImageForNonImage($e);
                }
            });
            setTimeout(function() { win.disableScroll = false; }, 500);
        }
    });
    $.fn[pluginName] = function(options) {
        return this.filter("[data-original]").each(function() {
            if (!$.data(this, "plugin_" + pluginName) && this != undefined && this != null) {
                $.data(this, "plugin_" + pluginName,
                    new Plugin(this, options));
            }
        });
    };
    var isElementInViewport = function(element) {
        var coords = element.getBoundingClientRect();
        return ((coords.bottom >= (0 - (2 * coords.height)) && (coords.top) <= (win.innerHeight || doc.documentElement.clientHeight) + (2 * coords.height))
            && (coords.right >= (0 - (2 * coords.width)) && (coords.left) <= (win.innerWidth || doc.documentElement.clientWidth) + (2 * coords.width)));
    };
    var hideImageForImage = function(element) {
        $(element).attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
    };
    var showImageForImage = function(element) {
        $(element).attr("src", $(element).data("original"));
    };
    var hideImageForNonImage = function(element) {
        var $e = $(element);
        if ($e.hasClass("RAVisible")) {
            $(element).removeClass("RAVisible").addClass("RAHidden");
            $(element).css("background-image", "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)");
        }
    };
    var showImageForNonImage = function(element) {
        var $e = $(element);
        if ($e.hasClass("RAHidden")) {
            $e.removeClass("RAHidden").addClass("RAVisible");

            $e.css("background-image", "url('" + $e.data("original") + "')");
        }
    };
})(jQuery, win, doc);