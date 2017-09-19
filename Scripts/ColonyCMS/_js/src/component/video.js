define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var TextField = ColonyBase.extend({
		template: 'video',
		onRender: function() {
			this.$el.addClass('field text');
		},
		bindings: {
			"input": "value"
		},
		events: {
			"change input": "updateIframe"
		},
		updateIframe: function () {
			this.$('iframe').attr('src', this.$('input').val());
		}
	});
	
	return TextField;
});