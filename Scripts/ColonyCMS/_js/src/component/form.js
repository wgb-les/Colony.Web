define([
	'backbone',
	'marionette',
	'componentbase',
	'tooltipster'
], function(Backbone, Marionette, ColonyBase) {
	var Form = ColonyBase.extend({
		tagName: 'form',
		template: 'form',
		events: {
			"submit": "__behaviourEvent"
		},
		mapEventNames: function(EventName){
			EventDictionary = {
				"submit": "submit"
			}
			return EventDictionary[EventName];
		},
		onRender: function() {
		    var that = this;
		    that.$el.on('click', 'input[type=submit]', function (e) {
		        that.$el.data('submitter', $(this).attr('id'));
		    });
			that.$el.validate({
				ignore: ".ignore",
				//highlight: function(element, errorClass) {
				//	$(element).fadeOut(function() {
				//		$(element).fadeIn();
				//	});
				//},
				submitHandler: function(form){
					return false;
				},
				errorElement: 'div',
				errorClass: 'alertInfo error',
				errorPlacement: function(error, element) {
					element.before(error);
				}
			});
			$(document).on('keydown', function (e) {
				//Ctrl+S - Save/Submit Form
				if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
					e.preventDefault();
					that.$el.submit();
					return false;
				}
				//Escape - Cancel/Go Back
				if (e.keyCode == 27) {
					e.preventDefault();
					window.history.back();
					return false;
				}

				
			});
			
		},
		getMessageData: function () {
		    var data = this.$el.find('input,select,textarea').serialize();
		    console.log(data);
			return data;

		}
	});
	
	return Form;
});

