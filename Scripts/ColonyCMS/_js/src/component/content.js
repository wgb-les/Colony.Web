define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var Fieldset = ColonyBase.extend({
	    tagName: 'div',
        className: 'field content',
		template: 'empty',
		onRender: function () {
			this.$el.html(this.model.get('value'));
		}  
	});
	
	return Fieldset;
});