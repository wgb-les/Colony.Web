define([
	'backbone',
	'marionette',
	'controller',
	'backbone.queryparams'
], function(Backbone, Marionette, Controller, BackboneQueryParams) {
	ColonyRouter = Backbone.Marionette.AppRouter.extend({
		controller: Controller,
		appRoutes: {
			//"*uri?:params": "colonyRouteHandler",
			"(*url)": "colonyRouteHandler"
		}
	});
	
	return ColonyRouter;
});