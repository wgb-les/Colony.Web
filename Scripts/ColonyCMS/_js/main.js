
require.config({
	waitSeconds: 200,

	paths: {
		'jquery': 					'//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min',
		'jqueryUi': 				'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min',
		'jqueryValidate': 			'//ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min',
		'jqueryValidateExtensions':	'//ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/additional-methods.min',
		'underscore': 				'//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min',
		'backbone': 				'//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
		'backbone.babysitter': 		'lib/backbone/backbone.babysitter.min',
		'backbone.wreqr': 			'//cdnjs.cloudflare.com/ajax/libs/backbone.wreqr/0.1.0/backbone.wreqr.min',
		'backbone.stickit': 		'lib/backbone/backbone.stickit.min',
		'backbone.datagrid':        'lib/backbone/backbone.datagrid.min',
		'backbone.queryparams':     'lib/backbone/backbone-query-parameters-master/backbone.queryparams',
		'marionette': 				'//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/1.0.4-bundled/backbone.marionette.min',
		'modernizr': 				'//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min',
		'form': 					'lib/redant/form',
		'ckeditor': 				'lib/ckeditor/ckeditor',
		'plupload':					'lib/plupload/js/plupload',
		'plupload.html4':			'lib/plupload/js/plupload.html4',
		'plupload.html5':			'lib/plupload/js/plupload.html5',
		'componentmodel':			'src/model/component',
		'componentbase':            'src/component/colony.component.base',
		'datatable':                'src/component/datatable',
		'formcomponent': 			'src/component/form',
		'pageheading': 				'src/view/pageheading',
		'siteswitcher': 			'src/view/siteswitcher',
		'languageswitcher': 		'src/view/languageswitcher',
		'navigation':               'src/view/navigation',
		'tooltipster':              'lib/tooltipster-master/js/jquery.tooltipster.min',
		'fcbkcomplete':             'lib/fcbkcomplete/jquery.fcbkcomplete',
		'multiSelectToCheckboxes':  'lib/redant/jquery.multiSelectToCheckboxes',
		'nestedSortable':           'lib/redant/ui.nestedSortable',
		'elastislide':              'lib/redant/jquery.elastislide',
		'jqueryplusplus':           'lib/redant/jquerypp.custom',
		'modernizr':                'lib/redant/modernizr.custom.17475',
        'carouFredSel':             'lib/carouFredSel-6.2.1/jquery.carouFredSel-6.2.1-packed'
	},

	shim: {
		
		'jquery' : {
		  exports : 'jquery'
		},

		'jqueryUi' : {
		  deps : ['jquery']
		},
		
		'jqueryValidate' : {
			deps : ['jquery']
		},
		
		'jqueryValidateExtensions' : {
			deps : ['jquery', 'jqueryValidate']
		},

		'jqueryplusplus' : {
			deps : ['jquery']
		},

		'elastislide' : {
			deps : ['jqueryplusplus', 'modernizr']
		},

		'carouFredSel' : {
            deps: ['jquery']
		},
		
		'underscore' : {
			exports: '_'
		},
		
		'backbone' : {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		
		'backbone.babysitter' : {
			deps: ['backbone']
		},
		
		'backbone.wreqr' : {
			deps: ['backbone']
		},
		
		'backbone.stickit' : {
			deps: ['backbone']
		},

		'backbone.queryparams' : {
			deps: ['backbone']
		},
		
		'marionette' : {
			deps: ['backbone', 'backbone.babysitter', 'backbone.wreqr', 'backbone.stickit', 'jqueryValidate', 'jqueryValidateExtensions'],
			exports: 'Backbone.Marionette'
		},		

		'backbone.datagrid' : {
			deps: ['backbone', 'marionette']
		},

		'form' : {
			deps : ['jquery', 'jqueryUi', 'backbone', 'marionette']
		},
		
		'ckeditor': {
			deps: ['jquery']
		},

		'tooltipster': {
			deps: ['jquery']
		},

		'fcbkcomplete': {
			deps: ['jquery']
		},
		
		'plupload' : {
			exports: 'plupload'
		},
		
		'plupload.html4' : {
			deps: ['plupload']
		},
		
		'plupload.html5' : {
			deps: ['plupload']
		},

		'componentmodel' : {
			deps: ['backbone','marionette']
		},

		'componentbase' : {
			deps: ['componentmodel']
		},
		
		'formcomponent' : {
			deps: ['componentbase']
		},

		'pageheading': {
			deps: ['backbone','marionette']
		},

		'siteswitcher': {
			deps: ['backbone','marionette']
		},

		'languageswitcher': {
			deps: ['backbone','marionette']
		},

		'navigation': {
			deps: ['backbone','marionette']
		}

	}
});

require(['app'], function(App) {
	App.start();
});