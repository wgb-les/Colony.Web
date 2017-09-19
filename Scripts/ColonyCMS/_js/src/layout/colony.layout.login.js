define([
	'backbone',
	'marionette',
	'formcomponent',
	'pageheading'
], function(Backbone, Marionette, FormComponent, PageHeading) {
	var ColonyApplicationLayout = Backbone.Marionette.Layout.extend({
		template: 'layout/login',
		events: {
			"submit": "login"
		},
		login: function (e) {
			e.preventDefault();
			;
			if (!App.Colony.login(this.$('form').serialize()))
			{
				this.$('#email').parent().children('.alertInfo').remove();
				this.$('#email').parent().prepend('<div class="alertInfo error"><span>Username or password are incorrect</span></div>');
			}
			return false;
		}
	});	
	
	return ColonyApplicationLayout;
});
