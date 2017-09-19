define([
	'backbone',
	'marionette'
], function(Backbone, Marionette) {

	var LanguageModel = Backbone.Model.extend({});
	var LanguageCollection = Backbone.Collection.extend({ model: LanguageModel });
	
	var LanguageView = Backbone.Marionette.ItemView.extend({
		tagName: 'option',
		template: 'empty',
		onRender: function() {
			this.$el.attr('value', this.model.get('id'));
			this.$el.text(this.model.get('name'));
		}
	});
	
	var LanguageSwitcher = Backbone.Marionette.CompositeView.extend({
		itemView: LanguageView,
		tagName: 'label',
		template: 'siteswitcher',
		onRender: function () {
		    this.$('span').html('&#160;in language&#160;');
		},
		appendHtml: function (collectionView, itemView, index) {
		    collectionView.$el.find('select').append(itemView.el);
		}

	});
	
	return LanguageSwitcher;
});