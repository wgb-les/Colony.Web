define([
	'backbone',
	'marionette',
	'formcomponent',
	'pageheading'
], function(Backbone, Marionette, FormComponent, PageHeading) {
	var ColonyApplicationLayout = Backbone.Marionette.Layout.extend({
		template: 'layout/error'
	});	
	
	return ColonyApplicationLayout;
});
