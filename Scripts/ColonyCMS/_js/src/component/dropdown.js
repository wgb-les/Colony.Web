define([
	'backbone',
	'marionette',
	'componentbase'
], function (Backbone, Marionette, ColonyBase) {
    var self;
	var Dropdown = ColonyBase.extend({
		children: [],
		parent: null,
		template: 'dropdown',
		onRender: function() {
		    this.$el.addClass('field select');
		    if (!_.isUndefined(this.model.get('defaultOptionText')))
		        this.$("select option[value='']").text(this.model.get('defaultOptionText'));
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
		},
		getDefaultOptionText: function () {
		    return self.model.get('defaultOptionText') || 'Please select an option';
		}
	});
	
	return Dropdown;
});