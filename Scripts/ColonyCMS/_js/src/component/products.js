define([
	'backbone',
	'marionette',
	'componentbase',
	'fcbkcomplete'
], function (Backbone, Marionette, ColonyBase) {
    var Products = ColonyBase.extend({
        children: [],
        parent: null,
        template: 'tags',
        onRender: function () {
            console.log(this.model.get("value"));
            this.$el.addClass('field tagpicker');
            this.$('select').fcbkcomplete({
                json_url: '/product/getproductsforcms/',
                filter_case: false,
                addontab: true,
                maxitems: 15,
                height: 20,
                cache: true,
                newel: false
            });
        }
    });

    return Products;
});