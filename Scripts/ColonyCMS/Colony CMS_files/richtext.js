define([
	'backbone',
	'marionette',
	'componentbase'
], function(Backbone, Marionette, ColonyBase) {
	var RichTextArea = ColonyBase.extend({
		template: 'textarea',
		bindings: {
			"textarea": "value"
		},
		onRender: function() {
			this.$el.addClass('field text');
			var self = this;
			require(['ckeditor'], function () {
				
				if (CKEDITOR.instances.ckeditor) {
					CKEDITOR.remove(CKEDITOR.instances.ckeditor);
				}
				CKEDITOR.config.entities_processNumerical = 'force';
				CKEDITOR.config.scayt_autoStartup = true;
				CKEDITOR.config.toolbar = 'Colony';
				CKEDITOR.config.autoUpdateElement = true;
				CKEDITOR.config.allowedContent = true

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
					{ name: 'links', items: ['Link', 'Unlink', 'Anchor','ColonyLink'] },
					{ name: 'insert', items: ['Image', 'Table', 'HorizontalRule'] },
					{ name: 'styles', items: ['Format'] },
					{ name: 'tools', items: ['Maximize', 'ShowBlocks'] }
				];

				var editor = CKEDITOR.replace(self.model.get('componentId'),
					{
						coreStyles_bold: { element: 'span', attributes: { 'class': 'Bold' } },
						coreStyles_italic: { element: 'span', attributes: { 'class': 'Italic' } }
					});
				editor.on('blur', function(e) {
					self.$('textarea').val(editor.getData());
				});
				editor.on('key', function (e) {
					self.$('textarea').val(editor.getData());
				});
				App.vent.on('colony:beforesubmit', function (e) {
				    console.log('should be replacing data in textarea with rich text content');
					self.$('textarea').val(editor.getData());
					self.$('textarea').hide();
				});
				var validation = self.model.get('validation');
				if (validation && validation.required && validation.required == true) {
					var t = self.$('textarea');
					t.rules("add", {
						required: function (textarea) {
							//CKEDITOR.instances[textarea.id].updateElement(); // update textarea
						    $(textarea).hide();
						    t.hide();
							var editorcontent = textarea.value.replace(/<[^>]*>/gi, ''); // strip tags
							return editorcontent.length === 0;
						}
					});
				}
				//self.$el.parents('form').on('submit', function (e) {
				//    self.$('textarea').val(editor.getData());
				//    console.log(editor.getData());
				//    for (var instanceName in CKEDITOR.instances)
				//    {
				//        CKEDITOR.instances[instanceName].updateElement();
				//    }
						
				//});
			});
		}
	});

	return RichTextArea;
});