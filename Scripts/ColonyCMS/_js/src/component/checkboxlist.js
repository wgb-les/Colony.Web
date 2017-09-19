define([
	'backbone',
	'marionette',
	'componentbase',
    'multiSelectToCheckboxes'
], function (Backbone, Marionette, ColonyBase) {
    var Dropdown = ColonyBase.extend({
        template: 'multiselect',
        tagName: 'fieldset',
        className: 'optionList',
        onRender: function () {
            //this.$el.addClass('field select');
            this.$('select').multiSelectToCheckboxes();
            //var sel = this.$('select');
            //_.each((this.model.get('value') || '').split(','), function (item) {
            //    console.log(sel);
            //    console.log(sel.find("option [value='" + item + "']"));
            //    sel.find("option [value='" + item + "']").attr('selected', 'selected');
            //});
        },
        bindings: {
            'select': {
                observe: 'value',
                onGet: function (val) {
                    // Return an array of the ids so that stickit can match them to select options.
                    return _.map(val.split(','), Number);
                },
                onSet: function (vals) {
                    // Format the array of ids into a dash-delimited String before setting.
                    return vals.join(',');
                },
                selectOptions: {
                    collection: function () {
                        var col = [];
                        if (!_.isUndefined(this.model.get('dataCollection')))
                            col = window.App.data[this.model.get('dataCollection')];
                        else
                            col = this.model.get('items');
                        return col;
                    },
                    labelPath: 'name',
                    valuePath: 'id'
                }
            }
        }
    });

    return Dropdown;
});