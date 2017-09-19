define([
    "jquery",
    "jqueryUi",
    "underscore",
    "backbone",
    "text!views/scrapbook/helpers/index.html",
], function($, jqueryui, _, Backbone, scrapbookTemplate) {

    /*var Scrap = Backbone.Model.extend({
        defaults:{
            id: null,
            description: 100,
            checked: false
        },
        toggle: function(){
            this.set('checked', !this.get('checked'));
        }
    });

    var ScrapList = Backbone.Collection.extend({
        model: Scrap,
        getChecked: function(){
            return this.where({checked:true});
        }
    });

    var scraps = new ScrapList([
        new Scrap({ id: 1, zIndex: 1, description: 'Example string', img: '/_images/brands/harlequin/bg/pattern001.jpg' }),
        new Scrap({ id: 2, zIndex: 2, description: 'Example string', img: '/_images/brands/harlequin/bg/pattern002.jpg' }),
        new Scrap({ id: 3, zIndex: 3, description: 'Example string', img: '/_images/brands/harlequin/bg/pattern003.jpg' }),
        new Scrap({ id: 4, zIndex: 4, description: 'Example string', img: '/_images/brands/harlequin/bg/pattern004.jpg' }),
        new Scrap({ id: 5, zIndex: 5, description: 'Example string', img: '/_images/brands/harlequin/bg/pattern005.jpg' })
    ]);


    var ScrapView = Backbone.View.extend({
        tagName: 'div',
        className: 'outDiv',
        events:{
            'click': 'toggleScrap'
        },
        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
        },
        render: function(){
            //this.$el.html('<div id="' + this.model.get('id') + '" class="scrap"><img width="50" src="'+ this.model.get('img') + '"/>'+ this.model.get('description') + '<br/><input type="checkbox" value="1" name="' + this.model.get('id') + '" /></div>');
            this.$el.html('<div id="' + this.model.get('id') + '" class="scrap scrapAdd" style="z-index:'+ this.model.get('zIndex') + ';" ><img height="150" src="'+ this.model.get('img') + '"/></div>');
            this.$('input').prop('checked', this.model.get('checked'));
            return this;
        },
        toggleScrap: function(){
            this.model.toggle();
        }
    });
    

    var indexView = Backbone.View.extend({
        el: $('#container'),
        scrapBook: $('#scrapBook'),
        scraps: $('#scraps'),
        initialize: function(){
            //$("#scrapBook").bind('click', this.unSelect);
            this.list = $('#scraps');
            this.listenTo(scraps, 'change', this.render);
            scraps.each(function(scrap){
                var view = new ScrapView({ model: scrap });
                this.list.append(view.render().el);

            }, this);	
            // FUNCTIONS FOR SCRAPBOOK UI
            $( ".scrap" ).draggable({ 
                //zIndex: 'auto',
                revert: true
            });
            this.scrapBook.droppable({
                accept: function(d) { 
                    if(d.hasClass("scrapAdd")||(d.attr("id")=="bar")){ 
                        return true;
                    }
                },
                drop: function( event, ui ) {
                    accept: ".scrapAdd"


                    ui.draggable.css('position','absolute');
                    var nextZIndex = $('#scrapBook .scrap').length;
                    ui.draggable.css('z-index', nextZIndex);
                    
                    var topDrop = ui.draggable.offset().top -230;
                    var leftDrop = ui.draggable.offset().left;
                    ui.draggable.css('top',topDrop+'px');
                    ui.draggable.css('left',leftDrop+'px');
                    $(scrapBook).append(ui.draggable);
                    ui.draggable.resizable({
                        aspectRatio:true, 
                        maxHeight: 401
                    });
                    $('.scrap').removeClass('selected');
                    ui.draggable.removeClass('scrapAdd');
                    ui.draggable.addClass('selected');
                    //$('.controller').fadeOut(300);
                    //ui.draggable.append('<div class="controller"><a href="#" id="top" class=" icon-double-angle-up"></a>&nbsp;<a href="#" id="zup" class=" icon-chevron-up"></a>&nbsp;<a href="#" id="zdown" class=" icon-chevron-down"></a>&nbsp;<a href="#" id="bottom" class=" icon-double-angle-down"></a>&nbsp;<a href="#" id="remove" class=" icon-trash"></a></div>');
                    //ui.draggable.find('.controller').fadeIn(300);
                    $('#scrapControls').fadeIn(300);
                    $('#scrapEditButtons').fadeIn(300);
                    ui.draggable.draggable({ 
                        revert: false,
                        containment: $('#scrapBook'),
                        //stack: ".scrap",
                        start: function(e, ui) { 
                            //$('#scrapEditButtons').fadeIn(300);
                            $('.scrap').removeClass('selected');
                            e.stopPropagation();
                            $(this).addClass('selected');
                            $('#scrapControls').fadeIn(300);
                            if ($(this).find('.controller').is(":hidden")) {
                                //$('.controller').fadeOut(300);
                                //$('#scrapEditButtons').fadeIn(300);
                                $('.scrap').removeClass('selected');
                                e.stopPropagation();
                                $(this).addClass('selected');
                                //$(this).find('.controller').fadeIn(300);
                            }
                        }
                    });
                    //ANIMATE DIV AND REMOVE EMPTY ELEMENT
                    $('.outDiv:empty').animate({height: 0, marginBottom: '0' }, 300, function() { $(this).remove(); });
                    //alert("ASdfasdf");
                    ui.draggable.rotatable();
                },
            });
        },

        events: {
         'click #scrapBook .scrap' : 'select',
         'click #scrapControls a' : 'changeZIndex',
         'mouseenter #scraps' : 'openScraps',
         'mouseleave #scraps' : 'closeScraps'
        },
        select: function(e){
            $('#scrapControls').fadeIn(300);
            //$('#scrapEditButtons').fadeIn(300);
            //$('.controller').fadeOut(300);
            //$('#scrapEditButtons').fadeIn(300);
               $('.scrap').removeClass('selected');
               
            $(e.currentTarget).addClass('selected');
            //$(e.currentTarget).find('.controller').fadeIn(300);
            e.stopPropagation();
        },

        changeZIndex: function(e){

            
            var $element = $('.selected');

            //alert(e.currentTarget().css('z-index'));

            //$element.remove();
            var $siblings = $element.siblings();
            var zIndexes = $siblings.map(function() {
                return $(e.currentTarget).css('z-index');
            });

            var zIndex = parseInt($element.css('z-index'));
            switch(e.currentTarget.id) {
                case 'top':
                    //alert($('.selected').css("z-index"));
                    //$('.selected').remove();
                    zIndex = $('#scrapBook .scrap').length-1;
                    break;
                case 'zup':
                     zIndex += 1;
                    break;
                case 'zdown':
                    zIndex -= 1;
                    break;
                case 'bottom':
                    
                    //zIndex = '0';
                    break;
                case 'remove':
                    $('.selected').fadeOut(300, function() {
                        $('.selected').remove();
                    });
                    break;
            }
            if (zIndex === -1) {
                zIndex = 0;
                $siblings.each(function() {
                    var z = parseInt($(this).css('z-index')) + 1;
                    $(this).css('z-index', z);
                    $(this).find('.zIndex').text(z);
                });
            }
            $element.css({zIndex:zIndex});

            e.stopPropagation();

            return false;
        },

        openScraps: function(e){
        //	$(e.currentTarget).stop().animate({ width: 157 }, 400);
        },
        closeScraps: function(e){
        //	$(e.currentTarget).stop().animate({ width: 15 }, 400);
        },

        unSelect: function(e) {
            $('#scrapControls').fadeOut(300);
            $('.scrap').removeClass('selected');
            //$('.controller').fadeOut(300);
            //$('#scrapEditButtons').fadeOut(300);
            return false;
        }
    });
    return new indexView();*/
});