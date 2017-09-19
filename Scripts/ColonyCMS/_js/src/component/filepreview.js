define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var FilePreview = ColonyBase.extend({
	    template: 'filepreview',
	    onRender: function () {
	        this.$el.addClass('field text');
	    }
	});
	
	return FilePreview;
});