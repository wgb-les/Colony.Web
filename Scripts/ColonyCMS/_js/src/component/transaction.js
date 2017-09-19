define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var Fieldset = ColonyBase.extend({
	    tagName: 'div',
        className: 'field content',
        template: 'transaction',
        transaction: null,
        initialize: function () {
            this.transaction = this.model.get('value');
        },
		onRender: function () {
		    console.log(this.transaction);
		}  
	});
	
	return Fieldset;
});