define([
	'backbone',
	'marionette',
	'componentbase',
	'fcbkcomplete'
], function (Backbone, Marionette, ColonyBase) {
	var Tags = ColonyBase.extend({
		template: 'tags',
		onRender: function () {
		    this.$el.addClass('field tagpicker');
		    this.$('select').fcbkcomplete({
		        json_url: '/tags/gettagsforcms/',
		        addontab: true,
		        maxitems: 15,
		        height: 2,
		        cache: true,
		        newel: true
		    });
		}
	});

	return Tags;
});