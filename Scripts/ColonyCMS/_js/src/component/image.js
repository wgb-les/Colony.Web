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
						{ title: "Image files", extensions: "jpg,gif,png,jpeg" }
					]
				});
				uploader.bind('FilesAdded', function (up, files) {
				    for (var i in files) {
				        var filenamewithoutextension = files[i].name.substr(0, files[i].name.lastIndexOf('.')) || files[i].name;
				        var s = '<div id="' + files[i].id + '" class="file">' + files[i].name + ' (' + plupload.formatSize(files[i].size) + ') <b></b><div class="upload-metadata text"><input type="text" name="Name" id="' + filenamewithoutextension + '_Name" placeholder="Enter Name" value="' + filenamewithoutextension + '" /><input type="text" name="Description" id="' + filenamewithoutextension + '_Description" placeholder="Enter Alternative Text" value="' + filenamewithoutextension + '"/><input type="text" name="Tags" id="' + files[i].name + '_Name" placeholder="Enter Tags" /></div>';
						$('#' + that.model.get('componentId') + '_filelist').append(s);
					}
				});
				uploader.bind('BeforeUpload', function (up, file) {
				    var name = $('#' + file.id + ' input[name="Name"]').val();
				    var description = $('#' + file.id + ' input[name="Description"]').val();
				    var tags = $('#' + file.id + ' input[name="Tags"]').val().replace(' ', '|');

				    up.settings.url = '/actionuri/assets/image/upload/' + '?name=' + name + '&description=' + description + '&tags=' + tags;
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