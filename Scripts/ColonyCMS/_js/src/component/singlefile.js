define([
	'backbone',
	'marionette',
	'componentbase',
	'plupload',
	'plupload.html4',
	'plupload.html5'
], function (Backbone, Marionette, ColonyBase) {
	var SingleFile = ColonyBase.extend({
		children: [],
		parent: null,
		template: 'singlefile',
		onRender: function () {
			//this.$el.addClass('field text');
			// this.$('input').spinner();
			var that = this;
			setTimeout(function () { that.wireEvents(); }, 500);
		},
		wireEvents: function () {
			var that = this;
			if ($('#' + that.model.get('componentId') + '_uploadfiles').length > 0) {
				var uploader = new plupload.Uploader({
					runtimes: 'html5',
					browse_button: that.model.get('componentId') + '_pickfiles',
					container: that.model.get('componentId'),
					max_file_size: '10mb',
					multi_selection: 'false',
					filters: [
						{ title: "Allowed files", extensions: "csv" }
					]
				});
				uploader.bind('FilesAdded', function (up, files) {
					for (var i in files) {
						var s = '<div id="' + files[i].id + '" class="file">' + files[i].name + ' (' + plupload.formatSize(files[i].size) + ') <b></b></div>';
						$('#' + that.model.get('componentId') + '_filelist').append(s);
					}
				});
				uploader.bind('BeforeUpload', function (up, file) {
					var name = $('#' + file.id + ' input[name="Name"]').val();
					var description = $('#' + file.id + ' input[name="Description"]').val();;

					up.settings.url = '/actionuri/imagedownload/cmsimageupload/upload/';
				});
				uploader.bind('UploadProgress', function (up, file) {
					$('#' + file.id + ' b').html('<span>' + file.percent + "%</span>");
				});
				uploader.bind('FileUploaded', function (up, file) {
					$('#' + file.id).remove();
				});
				uploader.bind('UploadComplete', function (up, files) {
					App.vent.trigger('colony:fileuploadcompleted');
					window.location.reload();
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

	return SingleFile;
});