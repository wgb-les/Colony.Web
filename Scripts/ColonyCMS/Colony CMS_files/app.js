define([
	'backbone',
	'marionette',
	'router',
	'lib/redant/consoleshim',
	'colony',
], 
function(Backbone, Marionette, Router, ConsoleShim, Colony) {
	/* =========================================================================
	* The following will make Marionette's template retrieval work with
	* in both development (templates found in html files) and production
	* environment (templates all compiled AS JST templates into the require.js
	* file. This will also use JST instead of the Marionette.TemplateCache.
	*/
	Backbone.Marionette.Renderer.render = function(templateId, data) {
		if (typeof(templateId) == "string")
		{
			var path = 'template/' + templateId + '.html';

			// Localize or create a new JavaScript Template object.
			var JST = window.JST = window.JST || {};

			// Make a blocking ajax call (does not reduce performance in production,
			// because templates will be contained by the require.js file).
			if (!JST[path]) {
			    if (localStorage.getItem(path) == null || localStorage.getItem(path).toString() == "undefined")
			    {
			        $.ajax({
			            url: App.root + path,
			            async: false
			        }).then(function (templateHtml) {
			            JST[path] = _.template(templateHtml);
			            localStorage.setItem(path, JSON.stringify(JST[path]));
			        });
			    }
			    else
			    {
			        JST[path] = JSON.parse(localStorage.getItem(path));
			        console.log(JST[path]);
			    }

				
			}

			if (!JST[path]) {
				var msg = 'Could not find "' + templateId + '"';
				var error = new Error(msg);
				error.name = 'NoTemplateError';
				throw error;
			}
			
			// Call the template function with the data.
			//console.log(data);
			
			return JST[path](data);
		}
		else
		{
			return templateId(data);
		}
	};
	/* ======================================================================== */
	
	 ////Mod to marionette to add effect to page load
	 //Backbone.Marionette.Region.prototype.open = function (view) {
	 //    this.$el.hide();
	 //    this.$el.html(view.el);
	 //    this.$el.fadeIn("fast");
	 //};

	//Backbone.Marionette.Region.prototype.open = function (view) {
	//    console.log(view.$el);
	//    console.log(this.$el);
	//    this.$el.empty().append(view.el);
	//}

	// Creates a new Marionette application. 
	var App = new Marionette.Application();

	// Add the main region, that will hold the page layout.
	App.addRegions({
		regionMain: 'body'
	});

	// Adds any methods to be run after the app was initialized.
	App.addInitializer(function() {
		this.initAppLayout();
	});

	// Start backbone's history for hash navigation after the app was initialized.
	App.on('initialize:after', function() {
		Backbone.history.start({
			pushState: false
		});
	});

	// The main initializing function sets up the basic layout and its regions.
	App.initAppLayout = function() {
		router = new Router();
		App.Router = router;
		// Set up basic paths.
		App.root = '/Scripts/ColonyCMS/_js/';
		App.vent = _.extend({}, Backbone.Events);
		
		// All links with the role attribute set to nav-main will navigate through
		// the application's router.
		$(document).on('click', 'a[role=nav-main]', function(e) {
			e.preventDefault();
			App.Router.navigate($(this).attr('href'), {
				trigger: true
			});
			return false;
		});
		App.vent.on('colony:loginevent', function (e) {
			window.location.reload();
		});
	}
	window.App = App;
	window.App.Colony = Colony;
	window.App.Colony.init();
	
	return App;
});


