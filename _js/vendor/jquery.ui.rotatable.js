(function(c, d) {
    c.widget("ui.rotatable", c.ui.mouse, {
        options: { handle: !1, angle: !1, start: null, rotate: null, stop: null },
        handle: function(a) {
            if (a === d) return this.options.handle;
            this.options.handle = a
        },
        angle: function(a) {
            if (a === d) return this.options.angle;
            this.options.angle = a;
            this.performRotation(this.options.angle)
        },
        _create: function() {
            var a;
            this.options.handle ? a = this.options.handle : (a = c(document.createElement("div")), a.addClass("ui-rotatable-handle"));
            this.listeners = { rotateElement: c.proxy(this.rotateElement, this), startRotate: c.proxy(this.startRotate, this), stopRotate: c.proxy(this.stopRotate, this) };
            a.draggable({ helper: "clone", start: this.dragStart, handle: a });
            a.bind("mousedown", this.listeners.startRotate);
            a.appendTo(this.element);
            !1 != this.options.angle ? (this.elementCurrentAngle = this.options.angle, this.performRotation(this.elementCurrentAngle)) : this.elementCurrentAngle = 0
        },
        _destroy: function() {
            this.element.removeClass("ui-rotatable");
            this.element.find(".ui-rotatable-handle").remove()
        },
        performRotation: function(a) {
            this.element.css("transform", "rotate(" + a + "rad)");
            this.element.css("-moz-transform", "rotate(" + a + "rad)");
            this.element.css("-webkit-transform", "rotate(" + a + "rad)");
            this.element.css("-o-transform", "rotate(" + a + "rad)")
        },
        getElementOffset: function() {
            this.performRotation(0);
            var a = this.element.offset();
            this.performRotation(this.elementCurrentAngle);
            return a
        },
        getElementCenter: function() {
            var a = this.getElementOffset(), b = a.left + this.element.width() / 2, a = a.top + this.element.height() / 2;
            return [b, a]
        },
        dragStart: function(a) { if (this.element) return !1 },
        startRotate: function(a) {
            var b = this.getElementCenter();
            this.mouseStartAngle = Math.atan2(a.pageY - b[1], a.pageX - b[0]);
            this.elementStartAngle = this.elementCurrentAngle;
            this.hasRotated = !1;
            this._propagate("start", a);
            c(document).bind("mousemove", this.listeners.rotateElement);
            c(document).bind("mouseup", this.listeners.stopRotate);
            return !1
        },
        rotateElement: function(a) {
            if (!this.element) return !1;
            var b = this.getElementCenter(), b = Math.atan2(a.pageY - b[1], a.pageX - b[0]) - this.mouseStartAngle + this.elementStartAngle;
            this.performRotation(b);
            var c = this.elementCurrentAngle;
            this.elementCurrentAngle = b;
            this._propagate("rotate", a);
            c != b && (this._trigger("rotate", a, this.ui()), this.hasRotated = !0);
            return !1
        },
        stopRotate: function(a) { if (this.element) return c(document).unbind("mousemove", this.listeners.rotateElement), c(document).unbind("mouseup", this.listeners.stopRotate), this.elementStopAngle = this.elementCurrentAngle, this.hasRotated && this._propagate("stop", a), setTimeout(function() { this.element = !1 }, 10), !1 },
        _propagate: function(a, b) {
            c.ui.plugin.call(this, a, [b, this.ui()]);
            "rotate" !== a && this._trigger(a, b, this.ui())
        },
        plugins: {},
        ui: function() { return { element: this.element, angle: { start: this.elementStartAngle, current: this.elementCurrentAngle, stop: this.elementStopAngle } } }
    })
})(jQuery);