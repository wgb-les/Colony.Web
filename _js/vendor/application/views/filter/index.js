define([
    "jquery",
    /*'jqueryUi',
    'jqueryRotate',
    'jqueryTouchPunch',
    'html2Canvas',*/
    "underscore",
    "backbone",
    "text!views/filter/helpers/index.html",
], function($, _, Backbone, filterTemplate) {

    var filterTemplate = Backbone.View.extend({
        el: $(".container"),
        render: function() {
            var data = {};
            var compiledTemplate = _.template(filterTemplate, data);
            this.$el.append(compiledTemplate);
        }
    });


    return filterTemplate;
});