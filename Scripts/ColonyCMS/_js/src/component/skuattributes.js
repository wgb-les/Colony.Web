define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var Button = ColonyBase.extend({
		template: 'skuattributes',
		onRender: function () {
		    var self = this;
			this.$el.css({ "padding": "0 0 0 0", "margin": "0 0 0 0" });
			this.$('#SaveButton').on('click', function () {
				console.log($(this).parents('form').serialize());
				$.ajax({
					url: '/Stock/SaveSkuAttributesForSku?skuId=' + $(this).siblings('#skuId').val(),
					type: 'POST',
					data: $(this).parents('form').serialize(),
					success: function (data) {
					    self.__messageResponse("submit", {success: true}, 'redirect:/stock/index');
					}
				});
				return false;
			});
		}
	});
	
	return Button;
});