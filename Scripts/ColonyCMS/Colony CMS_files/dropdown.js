define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var Dropdown = ColonyBase.extend({
		children: [],
		parent: null,
		template: 'dropdown',
		onRender: function() {
			this.$el.addClass('field select');
		},
		bindings: {
			'select' : {
				observe: 'value',
				selectOptions: {
				    collection: function () {
				        if (!_.isUndefined(this.model.get('dataCollection')))
				            return window.App.data[this.model.get('dataCollection')];
				        else
				            return this.model.get('items');
					},
					labelPath: 'name',
					valuePath: 'id',
					defaultOption: {label: 'Please select an option', value: '' }
				}
			}
		}
	});
	
	return Dropdown;
});