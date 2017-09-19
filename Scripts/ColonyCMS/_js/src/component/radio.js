define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var Text = ColonyBase.extend({
		children: [],
		parent: null,
		template: 'component',
		onRender: function() {
			this.$el.addClass('field text');
		},
		bindings: {
			"input": "value"
		}
	});
	
	return Text;
});