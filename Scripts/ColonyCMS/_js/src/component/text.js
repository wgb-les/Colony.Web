define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var TextField = ColonyBase.extend({
		template: 'component',
		onRender: function() {
			this.$el.addClass('field text');
			if (this.model.attributes.validation && this.model.attributes.validation.maxlength)
			{

			    var charcount = this.model.attributes.value.length;

				this.$el.addClass('wordCount');
				this.$el.append('<p class="counter">Maximum characters <span>' + this.model.attributes.validation.maxlength + '</span>: <span id="' + this.model.attributes.componentId + 'Counter">' + charcount + '</span></p>');

				var id = this.model.attributes.componentId;

				this.model.on('change', function () {
				    var cc = $('#' + id).val().length;
				    $('#' + id + 'Counter').text(cc);
				});

			}
		},
		bindings: {
			"input": "value"
		}
	});
	
	return TextField;
});