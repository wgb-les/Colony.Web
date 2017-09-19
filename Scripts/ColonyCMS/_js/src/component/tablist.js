define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var model = Backbone.Model.extend({});
	var collection = Backbone.Collection.extend({ model: model });
	var TabListItemView = Backbone.Marionette.ItemView.extend({
	    template: 'tablist/tab',
        tagName: 'li'
	});
	var TabList = ColonyBase.extend({
	    tagName: 'ul',
        className: 'tablist',
		template: 'empty',
		itemView: TabListItemView,
		initialize: function () {
		    this.collection = new collection(this.model.get('actions'));
		},
		onRender: function() {
		    this.$el.append('<div class="clear"></div>');
		},
		appendHtml: function (collectionView, itemView, index) {
		    if (index > 0)
		        itemView.$el.find('.button').addClass('secondary');
		    collectionView.$el.append(itemView.el);

		}
	});
	
	return TabList;
});