define([
    "jquery",
    "jqueryUi",
    "underscore",
    "backbone",
    "text!views/scrapbook/helpers/index.html",
], function($, jqueryui, _, Backbone, scrapbookTemplate) {

    var Scrap = Backbone.Model.extend({
        defaults: {
            id: null,
            description: 100,
            checked: false
        },
        toggle: function() {
            this.set("checked", !this.get("checked"));
        }
    });

    var ScrapList = Backbone.Collection.extend({
        model: Scrap,
        getChecked: function() {
            return this.where({ checked: true });
        }
    });

    var scraps = new ScrapList([
        new Scrap({ id: 1, zIndex: 1, description: "Example strigng", img: "http://i.imgur.com/FjNpJ.png" }),
        new Scrap({ id: 2, zIndex: 2, description: "Example strigng", img: "http://icons.iconarchive.com/icons/artua/mac/512/Setting-icon.png" }),
        new Scrap({ id: 3, zIndex: 3, description: "Example strigng", img: "http://images2.wikia.nocookie.net/__cb20120827150123/mario/images/thumb/3/3a/Mega_Mushroom_Artwork_-_New_Super_Mario_Bros.png/907px-Mega_Mushroom_Artwork_-_New_Super_Mario_Bros.png" }),
        new Scrap({ id: 4, zIndex: 4, description: "Example strigng", img: "http://images.wikia.com/simpsons/images/1/11/Twitter_bird_icon.png" }),
        new Scrap({ id: 5, zIndex: 5, description: "Example strigng", img: "http://www.freegreatdesign.com/files/images/8/3533-crystal-rainbow-apple-icon-png-2.jpg" })
    ]);


    var ScrapView = Backbone.View.extend({
        tagName: "div",
        className: "outDiv",
        events: {
            'click': "toggleScrap"
        },
        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },
        render: function() {
            //this.$el.html('<div id="' + this.model.get('id') + '" class="scrap"><img width="50" src="'+ this.model.get('img') + '"/>'+ this.model.get('description') + '<br/><input type="checkbox" value="1" name="' + this.model.get('id') + '" /></div>');
            this.$el.html('<div id="' + this.model.get("id") + '" class="scrap scrapAdd" style="z-index:' + this.model.get("zIndex") + ';" ><img width="50" src="' + this.model.get("img") + '"/></div>');
            this.$("input").prop("checked", this.model.get("checked"));
            return this;
        },
        toggleScrap: function() {
            this.model.toggle();
        }
    });


    var indexView = Backbone.View.extend({
        el: $(".container"),
        scrapBook: $("#scrapBook"),
        scraps: $("#scraps"),
        initialize: function() {
            this.list = $("#scraps");
            this.listenTo(scraps, "change", this.render);
            scraps.each(function(scrap) {
                var view = new ScrapView({ model: scrap });
                this.list.append(view.render().el);

            }, this);
            // FUNCTIONS FOR SCRAPBOOK UI
            $(".scrap").draggable({
                //zIndex: 'auto',
                revert: true
            });
            $(scrapBook).droppable({
                accept: function(d) {
                    if (d.hasClass("scrapAdd") || (d.attr("id") == "bar")) {
                        return true;
                    }
                },
                drop: function(event, ui) {
                    accept: ".scrapAdd",
                        ui.draggable.css("position", "absolute");
                    var nextZIndex = $("#scrapBook .scrap").length;
                    ui.draggable.css("z-index", nextZIndex);
                    var topDrop = ui.draggable.offset().top - 21;
                    var leftDrop = ui.draggable.offset().left - 165;
                    ui.draggable.css("top", topDrop + "px");
                    ui.draggable.css("left", leftDrop + "px");
                    $(scrapBook).append(ui.draggable);
                    ui.draggable.resizable({ aspectRatio: 1 });
                    $(".scrap").removeClass("selected");
                    ui.draggable.removeClass("scrapAdd");
                    ui.draggable.addClass("selected");
                    $(".controller").fadeOut(300);
                    ui.draggable.append('<div class="controller"><a href="#" id="top" class=" icon-double-angle-up"></a>&nbsp;<a href="#" id="zup" class=" icon-chevron-up"></a>&nbsp;<a href="#" id="zdown" class=" icon-chevron-down"></a>&nbsp;<a href="#" id="bottom" class=" icon-double-angle-down"></a>&nbsp;<a href="#" id="remove" class=" icon-trash"></a></div>');
                    ui.draggable.find(".controller").fadeIn(300);
                    $("#scrapEditButtons").fadeIn(300);
                    ui.draggable.draggable({
                        revert: false,
                        containment: $("#scrapBook"),
                        //stack: ".scrap",
                        start: function(e, ui) {
                            //$('#scrapEditButtons').fadeIn(300);
                            $(".scrap").removeClass("selected");
                            e.stopPropagation();
                            $(this).addClass("selected");
                        }
                    });
                    //ANIMATE DIV AND REMOVE EMPTY ELEMENT
                    $(".outDiv:empty").animate({ height: 0, marginBottom: "0" }, 300, function() { $(this).remove(); });
                    ui.draggable.rotatable();
                },
            });
        },

        events: {
            'click #scrapBook .scrap': "select",
            'click .controller a': "changeZIndex",
            'mouseenter #scraps': "openScraps",
            'mouseleave #scraps': "closeScraps"
        },
        select: function(e) {
            $(".controller").fadeOut(300);
            $("#scrapEditButtons").fadeIn(300);
            $(".scrap").removeClass("selected");
            e.stopPropagation();
            $(e.currentTarget).addClass("selected");
            $(e.currentTarget).find(".controller").fadeIn(300);
        },

        changeZIndex: function(e) {
            e.stopPropagation();
            var $element = $(e.currentTarget).closest(".scrap");
            var $siblings = $element.siblings();
            var zIndexes = $siblings.map(function() {
                return $(e.currentTarget).css("z-index");
            });
            var zIndex = parseInt($element.css("z-index"));
            switch (e.currentTarget.id) {
            case "top":
                zIndex = $("#scrapBook .scrap").length;
                break;
            case "zup":
                zIndex += 1;
                break;
            case "zdown":
                zIndex -= 1;
                break;
            case "bottom":
                zIndex = "0";
                break;
            case "remove":
                $(".selected").fadeOut(300, function() {
                    $(e.currentTarget).remove();
                });
                break;
            }
            if (zIndex === -1) {
                zIndex = 0;
                $siblings.each(function() {
                    var z = parseInt($(this).css("z-index")) + 1;
                    $(this).css("z-index", z);
                    $(this).find(".zIndex").text(z);
                });
            }
            $element.css({ zIndex: zIndex });
            return false;
        },

        openScraps: function(e) {
            //	$(e.currentTarget).stop().animate({ width: 157 }, 400);
        },
        closeScraps: function(e) {
            //	$(e.currentTarget).stop().animate({ width: 15 }, 400);
        },
        render: function() {
            $('body, html > div:not(.scrap)"').on("click", this.unSelect);
            return this;
        },
        unSelect: function(e) {
            $(".scrap").removeClass("selected");
            $(".controller").fadeOut(300);
            $("#scrapEditButtons").fadeOut(300);

            return false;
        }
    });
    return new indexView;
});