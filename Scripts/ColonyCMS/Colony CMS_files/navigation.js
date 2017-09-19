define([
	'backbone',
	'marionette'
], function(Backbone, Marionette) {

	var SubNavigation = Backbone.Marionette.CompositeView.extend({
		tagName: 'li',
		template: 'navigationmain',
		itemView: SubNavigation,
		initialize: function() {
			var col = this.model.get('SubItems');
			if (col != undefined && col.length > 0)
			{				
				var NavModel = Backbone.Model.extend({});
				var NavCollection = Backbone.Collection.extend({ model: NavModel });
				
				this.collection = new NavCollection(col);
			}
		},
		appendHtml: function(cv, iv){
			if (cv.$('ul').length == 0)
				cv.$el.append('<ul class="shadow"></ul>');
			cv.$('ul').append(iv.el);
			cv.$('ul').css({ 'height': $(window).height() - 58 + 'px', 'max-height': $(window).height() - 58 + 'px', 'overflow': 'auto' });
		},
		templateHelpers: {
			renderNavigationLink: function() {
				var uri = this.Uri;
				if (uri != null && uri != undefined)
					return _.template(uri)();
				return "#";
			}
		}
	});

	var Navigation = Backbone.Marionette.CollectionView.extend({
		tagName: 'ul',
		template: 'empty',
		itemView: SubNavigation,
		id: 'main-nav',
		events: {
			"mouseenter .primary": "showSubNavigation",
			"mouseleave .primary": "hideSubNavigation",
			"click a": "navigate"
		},
		onRender: function() {
			this.$el.append('<li class="fill"></li>');
		},
		appendHtml: function(collectionView, itemView){
			itemView.$el
				.addClass('primary')
				.children('span').remove();
			itemView.$el.children('a')
				.addClass('item')
				.prepend('<span id="'+itemView.model.get('Name')+'"></span>');
			collectionView.$el.append(itemView.el);
		},
		showSubNavigation: function(e){

			if(e.currentTarget.displayTimeout != null){
				clearTimeout(e.currentTarget.displayTimeout);
			}
			e.currentTarget.displayTimeout = null;

			this.hoverTimeout = setTimeout(function(){
				var target = e.currentTarget;
				$(target).find(".shadow").animate({ left: '89' }, 300);
			}, this.hoverTimoutDuration);
		},
		hideSubNavigation: function(e){
			clearTimeout(this.hoverTimeout);
			this.hoverTimeout = null;

			e.currentTarget.displayTimeout = setTimeout(function(){
				var target = e.currentTarget;
				$(target).find(".shadow").animate({ left: '-110' }, 150);
				e.currentTarget.displayTimeout = null
			}, 200);
		}
	});
	
	return Navigation;
});