define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var Button = ColonyBase.extend({
	    template: 'button',
		onRender: function() {
			this.$el.addClass('field formControls');
		}
	});
	
	return Button;
});