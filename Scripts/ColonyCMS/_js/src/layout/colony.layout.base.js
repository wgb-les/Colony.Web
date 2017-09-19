define([
	'backbone',
	'marionette'
], function(Backbone, Marionette) {
	Colony.Layout.Base = Backbone.Marionette.Layout.extend({
		currentView: 'list',
		regions: {		
			navigation: '',
			search: '',
			content: '',
			info: ''
		}
	});
	return Colony.Layout.Base;
});