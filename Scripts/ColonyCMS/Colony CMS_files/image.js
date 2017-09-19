define([
	'backbone',
	'marionette',
	'componentbase',
	'plupload',
	'plupload.html4',
	'plupload.html5'
], function(Backbone, Marionette, ColonyBase, plupload, pluploadhtml4, pluploadhtml5) {
	var ImageField = ColonyBase.extend({
		template: 'file',
		onRender: function() {
			this.$el.addClass('field imageupload');
		},
		wireEvents: function () {
			var that = this;
			if ($('#' + that.model.get('componentId') + '_uploadfiles').length > 0) {
				var uploader = new plupload.Uploader({
					runtimes: 'html5',
					browse_button: that.model.get('componentId') + '_pickfiles',
					container: that.model.get('componentId'),
					max_file_size: '100mb',
					filters: [
						{ title: "Image files", extensions: "jpg,gif,png" }
					]
				});
				uploader.bind('FilesAdded', function (up, files) {
					for (var i in files) {
					    var s = '<div id="' + files[i].id + '" class="file">' + files[i].name + ' (' + plupload.formatSize(files[i].size) + ') <b></b><div class="upload-metadata text"><input type="text" name="Name" id="' + files[i].name + '_Name" placeholder="Enter Name" /><input type="text" name="Description" id="' + files[i].name + '_Description" placeholder="Enter Description" /><input type="text" name="Tags" id="' + files[i].name + '_Name" placeholder="Enter Tags" /></div>';
						$('#' + that.model.get('componentId') + '_filelist').append(s);
					}
				});
				uploader.bind('BeforeUpload', function (up, file) {
				    var name = $('#' + file.id + ' input[name="Name"]').val();
				    var description = $('#' + file.id + ' input[name="Description"]').val();;

				    up.settings.url = '/actionuri/assets/image/upload/' + '?name=' + name + '&description=' + description;
				});
				uploader.bind('UploadProgress', function (up, file) {
					$('#' + file.id + ' b').html('<span>' + file.percent + "%</span>");
				});
				uploader.bind('FileUploaded', function (up, file) {
				    $('#' + file.id).remove();
				});
				uploader.bind('UploadComplete', function(up, files) {
				    App.vent.trigger('colony:imageuploadcompleted');
				});
				$('#' + that.model.get('componentId') + '_uploadfiles').click(function (e) {
					e.preventDefault();
					uploader.start();
					return false;
				});
				uploader.init();
			}
		}
		
	});
	return ImageField;
});