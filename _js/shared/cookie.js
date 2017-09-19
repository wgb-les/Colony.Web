$cookie = (function() {
    function setCookie(name, value, exdays, path) {
        var exdate = new Date(),
            pathParam = ";path=";

        if (typeof exdays == "string") {
            path = exdays;
            exdays = undefined;
        }

        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());

        if (path == undefined) {
            path = "/";
        }

        document.cookie = name + "=" + c_value + pathParam + path;
    }

    function getCookie(name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == name) {
                return unescape(y);
            }
        }
    }

    function deleteCookie(name) {
        setCookie(name, "", -1);
    }

    function cookieExists(name) {
        if (getCookie(name) !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    return {
        get: getCookie,
        set: setCookie,
        remove: deleteCookie,
        exists: cookieExists
    };
})();