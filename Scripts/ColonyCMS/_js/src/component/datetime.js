define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var Text = ColonyBase.extend({
		children: [],
		parent: null,
		template: 'component',
		onRender: function() {
			this.$el.addClass('field text datepicker');
			this.$('input').attr('type','text');
			this.$('input').datepicker({ 
				dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true,
				showButtonPanel: true,
				showOn: "button",
				buttonImage: "/Images/ColonyCMS/icons/calendar.gif",
				buttonImageOnly: true
			});
		},
		bindings: {
		    "input": {
		        observe: "value",
                onGet: "formatDate"
		    }
		},
		formatDate: function (value, options) {
		    if (value.indexOf('T') > 0)
		        value = value.substring(0, value.indexOf('T'));
		    return $.datepicker.formatDate('dd/mm/yy', $.datepicker.parseDate('yy-mm-dd',value));
		}
	});
	
	return Text;
});