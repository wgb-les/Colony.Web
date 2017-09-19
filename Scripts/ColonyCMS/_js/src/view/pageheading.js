define([
	'backbone',
	'marionette'
], function(Backbone, Marionette) {
	var PageHeading = Backbone.Marionette.ItemView.extend({
	    template: 'pageheading',
	    initialize: function() {
	        if (!this.model.get('label'))
	            this.model.set('label','');
	    },
		templateHelpers: {
		    backlink: function () {
		        if (this.back && this.backdescription)
		        {
		            var link = '<a href="' + _.template(this.back)() + '" role="nav-main">&lt; Back to ' + _.template(this.backdescription)() + '</a>';
		            return link;
		        }
		        return '';
			}
		}
		
	});
	
	
	return PageHeading;
});