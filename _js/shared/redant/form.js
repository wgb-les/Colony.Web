;
(function($, window, document, undefined) {

    //Factory
    FormElement = Backbone.View.extend({
        initializedElements: [],
        initialize: function(options) {
            var ops = options.options || {};
            var that = this;
            options.elements.each(function(i) {
                if ($(options.elements[i]).data(options.type))
                    console.error(options.type + " has already been initiated on " + $(options.elements[i]));
                if (!$(options.elements[i]).data(options.type)) {
                    var v = new window[options.type]($(options.elements[i]), ops);
                    $(options.elements[i]).data(options.type, true);

                    that.initializedElements.push(v);
                }
            });
        },
        reinitialize: function(sliderSelector) {
            _.each(this.initializedElements, function(itm) {
                if (sliderSelector == null || $(sliderSelector, itm.$el).length > 0) {
                    if (itm.UIInit != undefined && itm.UIInit != null)
                        itm.UIInit();
                    itm.render();
                }
            });
        }

    });

    var ListCollection = Backbone.Collection.extend({});
    var ListCollectionView = Backbone.Marionette.CollectionView.extend({ tagName: "ul" });
    ListItem = Backbone.View.extend({
        template: "<%=value%><a href='#' class='remove'></a>",
        initialize: function(el, options) {
            var self = this;
            this.$el = el;
            this.template = options.template || self.template;

            this.collections();
        },
        collections: function() {
            var self = this;
            this.listItemView = Backbone.Marionette.CompositeView.extend({
                template: _.template(self.template),
                tagName: "li",
                initialize: function(options) {
                    this.collection = this.model;
                },
                onRender: function(e, a) {
                    var self = this;
                    e.$el.bind("click", function() {
                        self.collection.collection.remove(e.model);
                        return false;
                    });
                    e.$el.hide().fadeIn();
                }
            });
            this.listCollection = new ListCollection();
            this.listCollectionView = new ListCollectionView({ collection: this.listCollection, itemView: this.listItemView });
            this.listCollection.on("add remove", function() {
                $(".collectionValues", self.$el).val(this.pluck("value"));
            });
            $(".tagbuilderOutput ul", this.$el).html(this.listCollectionView.render().$el);
        },
        events: {
            "keypress": "submitItem",
            "click .tagbuilderInput .button": "submitItem",
            "click .remove": "removeItem"
        },
        submitItem: function(e) {
            var self = this;
            if ((e.keyCode && e.keyCode == 13) || !e.keyCode) {
                this.listCollection.add({ value: $(".tagbuilderInput input", this.$el).val() });
                $(".tagbuilderInput input", this.$el).val("");
                return false;
            }
        }
    });

    MaxLength = Backbone.View.extend({
        events: {
            "keypress": "valueHandler"
        },
        initialize: function(el, options) {
            var self = this;
            this.$el = el;
            this.input = this.GetInput();
            this.max = this.input.attr("maxlength") || this.input.attr("data-val-length-max");
        },
        valueHandler: function() {
            var remaining = this.max - this.input.val().length;
            $(".counter span", this.$el).html(remaining);
            countClass = "";
            if (remaining / this.max <= 0.2)
                countClass = "limitNear";
            if (remaining < 0)
                countClass = "limitExceeded";
            $(".counter", this.$el).attr("class", "counter" + " " + countClass);
        },
        GetInput: function() {
            var input = $("input", this.$el);
            if (input.length == 0)
                input = $("textarea", this.$el);
            return input;
        }
    });

    Spinner = Backbone.View.extend({
        initialize: function(el, options) {
            this.$el = el;
            this.min = $("input", this.$el).attr("data-min-value");
            this.max = $("input", this.$el).attr("data-max-value");
            $("input", this.$el).spinner({
                min: this.min,
                max: this.max
            });
        },
    });

    SliderSingle = Backbone.View.extend({
        uiConfig: {
            dateFormat: "dd/mm/yy",
            showOn: "both",
            buttonText: "Choose"
        },
        initialize: function(el, options) {
            this.$el = el;
            this.min = $("input", this.$el).attr("data-min-value");
            this.max = $("input", this.$el).attr("data-max-value");
            this.step = $("input", this.$el).attr("data-step");
            this.unit = $(".sliderBar", this.$el).attr("data-unit") || "units";
            this.unitPosition = $(".sliderBar", this.$el).attr("data-unit-pos") || "before";
            this.value = $("input", this.$el).val();
            //console.log('INIT SLIDER : ' + this.value);
            this.uiConfig = options.uiConfig || this.uiConfig;
            this.UIInit();
        },
        unit: "units",
        unitPosition: "before",
        sliderLabel: function(value) {
            var self = this;
            return (function() {
                if (self.unitPosition == "after")
                    return value + " " + self.unit;
                if (self.unitPosition == "before")
                    return self.unit + " " + value;
            })();
        },
        ariaValues: function(value) {
            return {
                "aria-valuemin": $(".sliderBar", this.$el).slider("option", "min"),
                "aria-valuemax": $(".sliderBar", this.$el).slider("option", "max"),
                "aria-valuestep": $(".sliderBar", this.$el).slider("option", "step"),
                "aria-valuenow": value,
                "aria-valuelabel": this.sliderLabel(value)
            };
        },
        PositionHandle: function(el) {
            var width = $(el).outerWidth() / 2;
            var handleWidth = $(el).parent().outerWidth() / 2;
            /*
            console.log($(el).parent());
            console.log(width);
            console.log(handleWidth);
            console.log(-width + handleWidth - 1);
            */
            $(el).css(
                "margin-left", -width + handleWidth - 1
            );
        },
        UIInit: function() {
            var self = this;

            //console.log("UI INIT : " + self.value);

            $(".sliderBar", self.$el).slider({
                min: self.min,
                max: self.max,
                step: self.step,
                value: self.value,
                slide: function(event, ui) {
                    $(".ui-slider-handle", this).first().attr(self.ariaValues($(this).slider("value")));
                    var label = self.sliderLabel(ui.value);
                    $("input", self.$el).attr("value", ui.value);
                    $(".ui-slider-handle", $(this)).first().children("span").html(label);
                    self.PositionHandle($(".ui-slider-handle .range-tooltip", this).first());
                },
                create: function() {
                    //console.log("UI create : " + $(this).slider("value"));
                    //console.log("UI create self.value : " + self.value);
                    var value = self.value; //$(this).slider("value");
                    $(".ui-slider-handle", this).append('<span class="range-tooltip"></span>');
                    $(".ui-slider-handle", self.$el).first().children("span").html(self.sliderLabel(value));
                    $(".ui-slider-handle", this).first().attr(self.ariaValues(value));
                    setTimeout(function() {
                        //console.log('setting position');
                        //console.log($('.ui-slider-handle .range-tooltip', self.$el).first());
                        self.PositionHandle($(".ui-slider-handle .range-tooltip", self.$el).first());
                    }, 50);
                }
            });
        }
    });

    SliderRange = SliderSingle.extend({
        sliderLabel: function(values) {
            var label = {};
            if (this.unitPosition == "after") {
                label.low = values[0] + " " + this.unit;
                label.high = values[1] + " " + this.unit;
            }
            if (this.unitPosition == "before") {
                label.low = this.unit + " " + values[0];
                label.high = this.unit + " " + values[1];
            }
            label.combined = label.low + " - " + label.high;
            return label;
        },
        ariaValues: function(value) {
            return {
                "aria-valuemin": $(".sliderBar", this.$el).slider("option", "min"),
                "aria-valuemax": $(".sliderBar", this.$el).slider("option", "max"),
                "aria-valuenow": value,
                "aria-valuelabel": this.sliderLabel(value).combined
            };
        },
        UIInit: function() {
            var self = this;
            $(".sliderBar", self.$el).slider({
                range: true,
                min: this.min,
                max: this.max,
                values: [this.max / 4, (this.max / 4) * 3],
                slide: function(event, ui) {
                    $(".ui-slider-handle", this).first().attr(self.ariaValues($(this).slider("values")));
                    var label = self.sliderLabel([ui.values[0], ui.values[1]]);
                    $("input", self.$el).attr("value", [ui.values[0], ui.values[1]]);
                    $(".ui-slider-handle", $(this)).first().children("span").html(label.low);
                    $(".ui-slider-handle", $(this)).last().children("span").html(label.high);
                    self.PositionHandle($(".ui-slider-handle .range-tooltip", this).first());
                    self.PositionHandle($(".ui-slider-handle .range-tooltip", this).last());
                },
                create: function() {
                    var value = $(this).slider("values");
                    $(".ui-slider-handle", this).append('<span class="range-tooltip"></span>');
                    var label = self.sliderLabel([value[0], value[1]]);
                    $("input", self.$el).attr("value", [value[0], value[1]]);
                    $(".ui-slider-handle", $(this)).first().children("span").html(label.low);
                    $(".ui-slider-handle", $(this)).last().children("span").html(label.high);
                    $(".ui-slider-handle", this).first().attr(self.ariaValues(value));
                    setTimeout(function() { self.PositionHandle($(".ui-slider-handle .range-tooltip", self.$el).first()) }, 0);
                    setTimeout(function() { self.PositionHandle($(".ui-slider-handle .range-tooltip", self.$el).last()) }, 0);
                }
            });
        }
    });


})(jQuery, window, document);