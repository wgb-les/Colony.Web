/*
 * imagesLoaded PACKAGED v3.0.2
 * JavaScript is all like "You images are done yet or what?"
 */
(function(d) {
    function b() {}

    function f(h, g) {
        if (c) {
            return g.indexOf(h)
        }
        for (var i = g.length; i--;) {
            if (g[i] === h) {
                return i
            }
        }
        return -1
    }

    var a = b.prototype, c = Array.prototype.indexOf ? !0 : !1;
    a._getEvents = function() { return this._events || (this._events = {}) }, a.getListeners = function(j) {
        var h, k, g = this._getEvents();
        if ("object" == typeof j) {
            h = {};
            for (k in g) {
                g.hasOwnProperty(k) && j.test(k) && (h[k] = g[k])
            }
        } else {
            h = g[j] || (g[j] = [])
        }
        return h
    }, a.getListenersAsObject = function(h) {
        var g, i = this.getListeners(h);
        return i instanceof Array && (g = {}, g[h] = i), g || i
    }, a.addListener = function(k, h) {
        var g, j = this.getListenersAsObject(k);
        for (g in j) {
            j.hasOwnProperty(g) && -1 === f(h, j[g]) && j[g].push(h)
        }
        return this
    }, a.on = a.addListener, a.defineEvent = function(g) { return this.getListeners(g), this }, a.defineEvents = function(h) {
        for (var g = 0; h.length > g; g += 1) {
            this.defineEvent(h[g])
        }
        return this
    }, a.removeListener = function(l, h) {
        var g, k, j = this.getListenersAsObject(l);
        for (k in j) {
            j.hasOwnProperty(k) && (g = f(h, j[k]), -1 !== g && j[k].splice(g, 1))
        }
        return this
    }, a.off = a.removeListener, a.addListeners = function(h, g) { return this.manipulateListeners(!1, h, g) }, a.removeListeners = function(h, g) { return this.manipulateListeners(!0, h, g) }, a.manipulateListeners = function(l, h, p) {
        var g, k, j = l ? this.removeListener : this.addListener, m = l ? this.removeListeners : this.addListeners;
        if ("object" != typeof h || h instanceof RegExp) {
            for (g = p.length; g--;) {
                j.call(this, h, p[g])
            }
        } else {
            for (g in h) {
                h.hasOwnProperty(g) && (k = h[g]) && ("function" == typeof k ? j.call(this, g, k) : m.call(this, g, k))
            }
        }
        return this
    }, a.removeEvent = function(j) {
        var h, k = typeof j, g = this._getEvents();
        if ("string" === k) {
            delete g[j]
        } else {
            if ("object" === k) {
                for (h in g) {
                    g.hasOwnProperty(h) && j.test(h) && delete g[h]
                }
            } else {
                delete this._events
            }
        }
        return this
    }, a.emitEvent = function(l, h) {
        var m, g, k, j = this.getListenersAsObject(l);
        for (g in j) {
            if (j.hasOwnProperty(g)) {
                for (m = j[g].length; m--;) {
                    k = h ? j[g][m].apply(null, h) : j[g][m](), k === !0 && this.removeListener(l, j[g][m])
                }
            }
        }
        return this
    }, a.trigger = a.emitEvent, a.emit = function(h) {
        var g = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(h, g)
    }, "function" == typeof define && define.amd ? define(function() { return b }) : d.EventEmitter = b
})(this), function(d) {
    var b = document.documentElement, f = function() {};
    b.addEventListener ? f = function(h, g, i) { h.addEventListener(g, i, !1) } : b.attachEvent && (f = function(g, h, e) {
        g[h + e] = e.handleEvent ? function() {
            var i = d.event;
            i.target = i.target || i.srcElement, e.handleEvent.call(e, i)
        } : function() {
            var i = d.event;
            i.target = i.target || i.srcElement, e.call(g, i)
        }, g.attachEvent("on" + h, g[h + e])
    });
    var a = function() {};
    b.removeEventListener ? a = function(h, g, i) { h.removeEventListener(g, i, !1) } : b.detachEvent && (a = function(j, h, k) {
        j.detachEvent("on" + h, j[h + k]);
        try {
            delete j[h + k]
        } catch (g) {
            j[h + k] = void 0
        }
    });
    var c = { bind: f, unbind: a };
    "function" == typeof define && define.amd ? define(c) : d.eventie = c
}(this), function(j) {
    function l(h, a) {
        for (var i in a) {
            h[i] = a[i]
        }
        return h
    }

    function d(a) { return"[object Array]" === k.call(a) }

    function f(o) {
        var h = [];
        if (d(o)) {
            h = o
        } else {
            if ("number" == typeof o.length) {
                for (var a = 0, n = o.length; n > a; a++) {
                    h.push(o[a])
                }
            } else {
                h.push(o)
            }
        }
        return h
    }

    function b(p, q) {
        function i(r, t, s) {
            if (!(this instanceof i)) {
                return new i(r, t)
            }
            "string" == typeof r && (r = document.querySelectorAll(r)), this.elements = f(r), this.options = l({}, this.options), "function" == typeof t ? s = t : l(this.options, t), s && this.on("always", s), this.getImages(), m && (this.jqDeferred = new m.Deferred);
            var a = this;
            setTimeout(function() { a.check() })
        }

        function h(a) { this.img = a }

        i.prototype = new p, i.prototype.options = {}, i.prototype.getImages = function() {
            this.images = [];
            for (var x = 0, u = this.elements.length; u > x; x++) {
                var z = this.elements[x];
                "IMG" === z.nodeName && this.addImage(z);
                for (var a = z.querySelectorAll("img"), w = 0, v = a.length; v > w; w++) {
                    var y = a[w];
                    this.addImage(y)
                }
            }
        }, i.prototype.addImage = function(n) {
            var a = new h(n);
            this.images.push(a)
        }, i.prototype.check = function() {
            function x(s, n) { return u.options.debug && g && c.log("confirm", s, n), u.progress(s), y++, y === a && u.complete(), !0 }

            var u = this, y = 0, a = this.images.length;
            if (this.hasAnyBroken = !1, !a) {
                return this.complete(), void 0
            }
            for (var w = 0; a > w; w++) {
                var v = this.images[w];
                v.on("confirm", x), v.check()
            }
        }, i.prototype.progress = function(a) { this.hasAnyBroken = this.hasAnyBroken || !a.isLoaded, this.emit("progress", this, a), this.jqDeferred && this.jqDeferred.notify(this, a) }, i.prototype.complete = function() {
            var n = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emit(n, this), this.emit("always", this), this.jqDeferred) {
                var a = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[a](this)
            }
        }, m && (m.fn.imagesLoaded = function(r, a) {
            var s = new i(this, r, a);
            return s.jqDeferred.promise(m(this))
        });
        var o = {};
        return h.prototype = new p, h.prototype.check = function() {
            var n = o[this.img.src];
            if (n) {
                return this.useCached(n), void 0
            }
            if (o[this.img.src] = this, this.img.complete && void 0 !== this.img.naturalWidth) {
                return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0
            }
            var a = this.proxyImage = new Image;
            q.bind(a, "load", this), q.bind(a, "error", this), a.src = this.img.src
        }, h.prototype.useCached = function(n) {
            if (n.isConfirmed) {
                this.confirm(n.isLoaded, "cached was confirmed")
            } else {
                var a = this;
                n.on("confirm", function(r) { return a.confirm(r.isLoaded, "cache emitted confirmed"), !0 })
            }
        }, h.prototype.confirm = function(n, a) { this.isConfirmed = !0, this.isLoaded = n, this.emit("confirm", this, a) }, h.prototype.handleEvent = function(n) {
            var a = "on" + n.type;
            this[a] && this[a](n)
        }, h.prototype.onload = function() { this.confirm(!0, "onload"), this.unbindProxyEvents() }, h.prototype.onerror = function() { this.confirm(!1, "onerror"), this.unbindProxyEvents() }, h.prototype.unbindProxyEvents = function() { q.unbind(this.proxyImage, "load", this), q.unbind(this.proxyImage, "error", this) }, i
    }

    var m = j.jQuery, c = j.console, g = c !== void 0, k = Object.prototype.toString;
    "function" == typeof define && define.amd ? define(["eventEmitter", "eventie"], b) : j.imagesLoaded = b(j.EventEmitter, j.eventie)
}(window);