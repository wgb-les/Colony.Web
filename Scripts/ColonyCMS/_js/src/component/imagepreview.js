define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var Image = ColonyBase.extend({
	    template: 'imagepreview',
		onRender: function() {
		    this.$el.addClass('field imagepreview');
		}
	});
	
	return Image;
});