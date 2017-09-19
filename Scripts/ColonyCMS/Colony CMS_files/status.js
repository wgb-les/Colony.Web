define([
	'backbone',
	'marionette'
], function (Backbone, Marionette) {
    var model = Backbone.Model.extend({});
    var Status = Backbone.Marionette.ItemView.extend({
        template: 'status',
        className: 'alertInfo message',
        events: {
            'click .dismiss': 'clearMessage'
        },
        initialize: function () {
            var that = this;
            App.vent.on('colony:statusmessageupdated', function () {
                that.render();
            });
        },
        onRender: function () {
            if ((App.Colony.getStatusMessage() || '') == '') {
                this.$el.hide();
            }
        },
        clearMessage: function (e) {
            this.$el.fadeOut('slow');
            App.Colony.setStatusMessage('');
        }
    });

    return Status;
});