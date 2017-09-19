define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var Hidden = ColonyBase.extend({
		template: 'component',
		onRender: function() {
			this.$el.hide();
		},
		bindings: {
		    "input": "value"
		}
	});
	
	return Hidden;
});