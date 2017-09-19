define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
		var SwitchField = ColonyBase.extend({
			template: 'switch',
			className: 'field switchField'
		});

		return SwitchField;
});