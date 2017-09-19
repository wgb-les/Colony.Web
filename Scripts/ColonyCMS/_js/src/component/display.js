define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var Display = ColonyBase.extend({
		template: 'component',
		onRender: function () {
		    this.$el.addClass('field text');
		    this.$('input').attr('type', 'text');
		    this.$('input').attr('readonly', 'readonly');
		    this.$('input').attr('placeholder', '');
		},
		bindings: {
		    "input": "value"
		}
	});
	
	return Display;
});