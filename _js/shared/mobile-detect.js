$.isIPhone = function() {
    return ((navigator.platform.toLowerCase().indexOf("iphone") != -1) || (navigator.platform.toLowerCase().indexOf("ipod") != -1));

};

$.isIPad = function() {
    return (navigator.platform.toLowerCase().indexOf("ipad") != -1);
};

$.isAndroidMobile = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("android") > -1 && ua.indexOf("mobile");
};

$.isAndroidTablet = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("android") > -1 && !(ua.indexOf("mobile"));
};

$.isWindowsPhone = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("windows phone") > -1;
};

$.isBlackberry = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("blackberry") > -1;
};
$.isTablet = function() {
    return $.isAndroidTablet() || $.isIPad();
};
$.isMobile = function() {
    return $.isAndroidMobile() || $.isIPhone() || $.isWindowsPhone() || $.isBlackberry();
};