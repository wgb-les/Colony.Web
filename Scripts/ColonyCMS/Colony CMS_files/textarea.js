define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var TextArea = ColonyBase.extend({
		template: 'textarea',
		bindings: {
			"textarea": "value"
		},
		onRender: function() {
			this.$el.addClass('field text');
			if (this.model.attributes.validation && this.model.attributes.validation.maxlength)
			{
				this.$el.addClass('wordCount');
				this.$el.append('<p class="counter">Maximum characters <span>' + this.model.attributes.validation.maxlength + '</span></p>');
			}
		}
	});
	
	return TextArea;
});