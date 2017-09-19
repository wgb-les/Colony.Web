define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var Fieldset = ColonyBase.extend({
		children: [],
		parent: null,
		tagName: 'fieldset',
		template: 'fieldset',
		onRender: function() {
			this.$el.attr('id', this.model.get('componentId')).addClass(this.model.get('className'));
		}  
	});
	
	return Fieldset;
});