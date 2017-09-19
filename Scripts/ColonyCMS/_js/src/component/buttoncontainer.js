define([
	'backbone',
	'marionette',
	'componentbase'
], function (Backbone, Marionette, ColonyBase) {
    var model = Backbone.Model.extend({});
    var collection = Backbone.Collection.extend({ model: model });
    var ButtonContainerItemView = Backbone.Marionette.ItemView.extend({
        template: 'empty',
        tagName: 'input',
        className: 'button',
        onRender: function () {
            var that = this;
            that.$el.attr('type', 'submit');
            that.$el.attr('id', that.model.get('componentId'));
            that.$el.attr('value', that.model.get('label'));
        }
    });
    var ButtonContainer = ColonyBase.extend({
        tagName: 'div',
        className: 'field formControls',
        template: 'empty',
        itemView: ButtonContainerItemView,
        initialize: function () {
            this.collection = new collection(this.model.get('components'));
        },
        appendHtml: function (collectionView, itemView) {
            console.log(itemView.model);
            var className = itemView.model.get("className");
            if (className != null && className != undefined && className != '') {
                itemView.$el.addClass(className)
            }
            collectionView.$el.append(itemView.el);
        }
    });

    return ButtonContainer;
});