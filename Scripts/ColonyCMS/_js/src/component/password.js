define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var Password = ColonyBase.extend({
		template: 'component',
		onRender: function() {
			this.$el.addClass('field text');
		}
	});
	
	return Password;
});