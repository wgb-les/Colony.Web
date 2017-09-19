define([
	'backbone',
	'marionette',
	'src/model/colony.model.application',
	'src/layout/colony.layout.application',
	'src/layout/colony.layout.login',
	'src/layout/colony.layout.error',
	'jqueryUi',
	'backbone.queryparams'
], function(Backbone, Marionette, AppModel, AppLayout, LoginLayout, ErrorLayout, jqueryUI, BackboneQueryParams) {

	var loaderTimeout = null;

	var ColonyController = {
	
		colonyRouteHandler: function (uri, params) {
			App.QueryString = params;
			 if (!App.Colony.IsAuthenticated) {
				 var login = new LoginLayout();
				 App.regionMain.show(login);
			 }
			 else
			 {
				 if (params != undefined) {
					 if (params["siteId"] != undefined && params["siteId"] != null && params["siteId"] != '') {
						 var siteId = parseInt(params['siteId']);
						 if (parseInt(App.Colony.currentSiteId) != parseInt(siteId)) {
							 App.Colony.setCurrentSiteId(siteId);
						 }
					 }
				 }
				if (uri != null)
				{
					if (uri.substring(1) != '/')
						uri = '/' + uri;
					if (params != undefined)
					{
						uri += '?' + $.param(params);
					}
					clearTimeout(loaderTimeout);
					loaderTimeout = setTimeout(function () { $('<div class="loaderOverlay"></div>').appendTo('body').fadeIn('fast'); $('<div class="loaderContent"><h1>Loading. Please Wait...</h1><div id="fountainG"><div id="fountainG_1" class="fountainG"></div><div id="fountainG_2" class="fountainG"></div><div id="fountainG_3" class="fountainG"></div><div id="fountainG_4" class="fountainG"></div><div id="fountainG_5" class="fountainG"></div><div id="fountainG_6" class="fountainG"></div><div id="fountainG_7" class="fountainG"></div><div id="fountainG_8" class="fountainG"></div></div></div>').appendTo('body').fadeIn('slow'); }, 500);
					$.ajax({
						url: "/api/edit" + uri,
						cache: false,
						success: function (data) {
							if (App.regionMain._isRendered == undefined || App.regionMain._isRendered == false)
							{
							    try {
							        clearTimeout(loaderTimeout);
									delete App.regionMain.currentView;
									var layout = new AppLayout({ model: new AppModel(data) });
									App.regionMain.show(layout);
								}
								catch (ex) {
									console.error(ex);
									delete App.regionMain.currentView;
									var errorlayout = new ErrorLayout({ model: new AppModel(ex) });
									App.regionMain.show(errorlayout);
								}
								
								$('.loaderOverlay').fadeOut().remove('fast');
							}
							else
							{
							    try {
							        clearTimeout(loaderTimeout);
									App.regionMain.currentView.model = new AppModel(data);
									App.regionMain.currentView.onModelSet();
								}
								catch (ex) {
									console.log(ex);
									delete App.regionMain.currentView;
									var errorlayout = new ErrorLayout({ model: new AppModel(ex.message) });
									App.regionMain.show(errorlayout);
								}
								$('.loaderOverlay').fadeOut().remove('fast');
							}

						},
						error: function (data) {
						    clearTimeout(loaderTimeout);
							delete App.regionMain.currentView;
							var errorlayout = new ErrorLayout({ model: new AppModel(data) });
							App.regionMain.show(errorlayout);							
							$('.loaderOverlay').fadeOut().remove('fast');
						}
					});
				}
				else
				{
					App.Router.navigate('/sites/index/', { trigger: true });
				}
			}
		},
		launch: function(uri,p) {
			
		}
	};
	
	return ColonyController;
});