define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
		var YesNoField = ColonyBase.extend({
			template: 'yesno',
			className: 'field switchField',
			bindings: {
				'radio': 'value'
			}
		});

		return YesNoField;
});