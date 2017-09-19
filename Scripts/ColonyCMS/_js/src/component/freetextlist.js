define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var FreeTextList = ColonyBase.extend({
	    template: 'freetextlist',
	    items: [],
	    onRender: function () {
	        this.items = _.without(this.model.get('value').split(','), '');

		    this.renderItems();
		},
		events: {
		    "keypress .colony-freetext-multi-input": "keypress",
            "click .addItem": "addItem",
            "click .removeItem": "removeItem"
		},
		keypress: function(e) {
		    if (e.keyCode == 13)
		    {
		        this.addItemInner($(e.currentTarget).val());
		        $(e.currentTarget).val('');
		        return false;
		    }		        
		},
		addItem: function(e) {
		    e.preventDefault();
		    this.addItemInner($(e.currentTarget).prevAll('input[type=text]').val());
		    $(e.currentTarget).prevAll('input[type=text]').val('');
		    return false;
		},
		addItemInner: function (text) {
		    this.items.push($.trim(text));
		    this.renderItems();
		},
		removeItem: function (e) {
		    e.preventDefault();
		    this.items = _.without(this.items, $(e.currentTarget).parents('li').text());
		    this.renderItems();
		    return false;
		},
		renderItems: function () {
		    this.$el.find('input[type=hidden]').val(this.items.join(','));
		    var html = '';
		    for (var i = 0; i < this.items.length; i++)
		    {
		        html += '<li><a class="removeItem"><span>' + this.items[i] + '</span><span class="icon-remove"></span></a></li>';
		    }
		    this.$el.find('.colony-freetext-multi-list').empty().append(html);
		}
	});
	
	return FreeTextList;
});