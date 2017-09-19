/*
 RequireJS text 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/requirejs/text for details
*/
define(["module"], function(n) {
    var o = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], q = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, r = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, k = typeof location !== "undefined" && location.href, s = k && location.protocol && location.protocol.replace(/\:/, ""), t = k && location.hostname, u = k && (location.port || undefined), l = [], j = n.config && n.config() || {}, f, p;
    f = {
        version: "2.0.1",
        strip: function(a) {
            if (a) {
                a = a.replace(q, "");
                var c = a.match(r);
                if (c)a = c[1]
            } else a = "";
            return a
        },
        jsEscape: function(a) { return a.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029") },
        createXhr: j.createXhr || function() {
            var a, c, b;
            if (typeof XMLHttpRequest !== "undefined")return new XMLHttpRequest;
            else if (typeof ActiveXObject !== "undefined")
                for (c = 0; c < 3; c += 1) {
                    b = o[c];
                    try {
                        a = new ActiveXObject(b)
                    } catch (e) {
                    }
                    if (a) {
                        o = [b];
                        break
                    }
                }
            return a
        },
        parseName: function(a) {
            var c =
                    false,
                b = a.indexOf("."),
                e = a.substring(0, b);
            a = a.substring(b + 1, a.length);
            b = a.indexOf("!");
            if (b !== -1) {
                c = a.substring(b + 1, a.length);
                c = c === "strip";
                a = a.substring(0, b)
            }
            return{ moduleName: e, ext: a, strip: c }
        },
        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
        useXhr: function(a, c, b, e) {
            var d = f.xdRegExp.exec(a), g;
            if (!d)return true;
            a = d[2];
            d = d[3];
            d = d.split(":");
            g = d[1];
            d = d[0];
            return(!a || a === c) && (!d || d.toLowerCase() === b.toLowerCase()) && (!g && !d || g === e)
        },
        finishLoad: function(a, c, b, e) {
            b = c ? f.strip(b) : b;
            if (j.isBuild)l[a] = b;
            e(b)
        },
        load: function(a,
            c, b, e) {
            if (e.isBuild && !e.inlineText)b();
            else {
                j.isBuild = e.isBuild;
                var d = f.parseName(a);
                e = d.moduleName + "." + d.ext;
                var g = c.toUrl(e), i = j.useXhr || f.useXhr;
                !k || i(g, s, t, u) ? f.get(g, function(h) { f.finishLoad(a, d.strip, h, b) }, function(h) { b.error && b.error(h) }) : c([e], function(h) { f.finishLoad(d.moduleName + "." + d.ext, d.strip, h, b) })
            }
        },
        write: function(a, c, b) {
            if (l.hasOwnProperty(c)) {
                var e = f.jsEscape(l[c]);
                b.asModule(a + "!" + c, "define(function () { return '" + e + "';});\n")
            }
        },
        writeFile: function(a, c, b, e, d) {
            c = f.parseName(c);
            var g =
                    c.moduleName + "." + c.ext,
                i = b.toUrl(c.moduleName + "." + c.ext) + ".js";
            f.load(g, b, function() {
                var h = function(m) { return e(i, m) };
                h.asModule = function(m, v) { return e.asModule(m, i, v) };
                f.write(a, g, h, d)
            }, d)
        }
    };
    if (typeof process !== "undefined" && process.versions && process.versions.node) {
        p = require.nodeRequire("fs");
        f.get = function(a, c) {
            var b = p.readFileSync(a, "utf8");
            if (b.indexOf("\ufeff") === 0)b = b.substring(1);
            c(b)
        }
    } else if (f.createXhr())
        f.get = function(a, c, b) {
            var e = f.createXhr();
            e.open("GET", a, true);
            if (j.onXhr)
                j.onXhr(e,
                    a);
            e.onreadystatechange = function() {
                var d;
                if (e.readyState === 4) {
                    d = e.status;
                    if (d > 399 && d < 600) {
                        d = Error(a + " HTTP status: " + d);
                        d.xhr = e;
                        b(d)
                    } else c(e.responseText)
                }
            };
            e.send(null)
        };
    else if (typeof Packages !== "undefined")
        f.get = function(a, c) {
            var b = new java.io.File(a), e = java.lang.System.getProperty("line.separator");
            b = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(b), "utf-8"));
            var d, g, i = "";
            try {
                d = new java.lang.StringBuffer;
                if ((g = b.readLine()) && g.length() && g.charAt(0) === 65279)
                    g =
                        g.substring(1);
                for (d.append(g); (g = b.readLine()) !== null;) {
                    d.append(e);
                    d.append(g)
                }
                i = String(d.toString())
            } finally {
                b.close()
            }
            c(i)
        };
    return f
});