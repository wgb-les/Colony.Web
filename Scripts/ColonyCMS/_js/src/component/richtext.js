define([
	'backbone',
	'marionette',
	'componentbase'
], function (Backbone, Marionette, ColonyBase) {
	var myTextArea = null;
	var RichTextArea = ColonyBase.extend({
		template: 'textarea',
		bindings: {
			"textarea": "value"
		},
		onRender: function () {
			this.$el.addClass('field text');
			var self = this;
			myTextArea = self.$('textarea');
			require(['ckeditor'], function () {

				if (CKEDITOR.instances.ckeditor) {
					CKEDITOR.remove(CKEDITOR.instances.ckeditor);
				}
				CKEDITOR.config.entities_processNumerical = 'force';
				CKEDITOR.config.scayt_autoStartup = true;
				CKEDITOR.config.toolbar = 'Colony';
				CKEDITOR.config.autoUpdateElement = true;
				CKEDITOR.config.allowedContent = true;
				CKEDITOR.config.filebrowserImageBrowseUrl = '/actionuri/assets/image/cmsimagebrowser/';
				CKEDITOR.config.filebrowserImageWindowWidth = '640';
				CKEDITOR.config.filebrowserImageWindowHeight = '480';
				CKEDITOR.config.toolbar_Colony =
				[
					{ name: 'document', items: ['Source', '-'] },
					{ name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
					{ name: 'editing', items: ['Find', 'Replace', '-', 'SpellChecker', 'Scayt'] },
					{ name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', '-', 'RemoveFormat'] },
					{
						name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote',
						'-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
					},
					{ name: 'links', items: ['Link', 'Unlink', 'Anchor', 'ColonyLink'] },
					{ name: 'insert', items: ['Image', 'Table', 'HorizontalRule'] },
					{ name: 'styles', items: ['Format'] },
					{ name: 'tools', items: ['Maximize', 'ShowBlocks'] }
				];

				var editor = CKEDITOR.replace(self.model.get('componentId'));
				App.vent.on('colony:beforesubmit', function (e) {
				    for (var instanceName in CKEDITOR.instances) {
				        CKEDITOR.instances[instanceName].updateElement();
				    }
				});
				var validation = self.model.get('validation');
				if (validation && validation.required && validation.required == true) {
					var t = self.$('textarea');
					t.rules("add", {
						required: function (textarea) {
							for (var i = 0; i < CKEDITOR.instances.length; i++) {
								CKEDITOR.instances[i].updateElement();
								console.log(CKEDITOR.instances[i]);
							}
							CKEDITOR.instances[textarea.id].updateElement();
							$(textarea).hide();
							t.hide();
							var editorcontent = textarea.value.replace(/<[^>]*>/gi, ''); // strip tags
							return editorcontent.length === 0;
						}
					});
				}
				if (validation && validation.maxlength && validation.maxlength > 0) {
					var t = self.$('textarea');
					t.rules("add", {
						required: function (textarea) {
							for (var i = 0; i < CKEDITOR.instances.length; i++) {
								CKEDITOR.instances[i].updateElement();
								console.log(CKEDITOR.instances[i]);
							}
							CKEDITOR.instances[textarea.id].updateElement();
							$(textarea).hide();
							t.hide();
							var editorcontent = textarea.value.replace(/<[^>]*>/gi, ''); // strip tags
							console.log(editorcontent);
							return (editorcontent.length > validation.maxlength);
						}
					});
				}
			});
		}
	});

	return RichTextArea;
});