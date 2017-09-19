define([
	'backbone',
	'marionette',
	'componentbase'
], function (Backbone, Marionette, ColonyBase) {
	var SearchForm = ColonyBase.extend({
		template: 'searchform',
		tagName: 'fieldset',
		className: 'searchform',
		onRender: function () {
		    var that = this;
		    that.$el.validate({
		        ignore: ".ignore",
		        //highlight: function(element, errorClass) {
		        //	$(element).fadeOut(function() {
		        //		$(element).fadeIn();
		        //	});
		        //},
		        submitHandler: function (form) {
		            return false;
		        },
		        //onsubmit: true,
		        //onfocusout: function (element) { $(element).valid(); },
		        //onclick: true,
		        errorElement: 'div',
		        errorClass: 'alertInfo error',
		        errorPlacement: function (error, element) {
		            element.before(error);
		        }
		    });

			that.$el.append('<div class="field formControls" style="display: none;"><button class="button submitSearch">Search</button></div>');
			that.$('.header a').click(function (e) {
				that.$('.field,fieldset').slideToggle();
				$(this)
					.toggleClass('icon-plus')
					.toggleClass('icon-minus');
				$(this)
					.parents('.searchform')
					.find('fieldset.half:visible').css('display', 'inline-block');
				$(this).find('div.formControls').show();
				return false;
			});
			that.$('.submitSearch').click(function (e) {
				e.preventDefault();
				
				if (!that.$el.find('input,textarea,select').valid())
				    return false;

				var messages = that.model.get('messages');
				var currentMessage = messages[_.indexOf(_.pluck(messages, "trigger"), 'submitSearch')];
				if (typeof currentMessage !== 'undefined')
				{
				    var serializedData = $('.searchForm').find('input,select,textarea').serializeArray();
				    var query_str = '';

				    $.each(serializedData, function (i, data) {
				        if ($.trim(data['value'])) {
				            query_str += (query_str == '') ? data['name'] + '=' + data['value'] : '&' + data['name'] + '=' + data['value'];
				        }
				    });
					that.__sendMessage("submit", new Date().getTime(), currentMessage.behaviourId, that.componentId, currentMessage.message, query_str, that.searchCallback, currentMessage.success, that);
				}
				
				return false;
			});
		},
		searchCallback: function (trigger, data, onSuccess, that) {
			if (data.success == true) {
				for (var col in data.data) {
					App.setData(col, data.data[col]);
				}
			}
		}
	});

	return SearchForm;
});