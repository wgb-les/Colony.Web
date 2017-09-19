define([
	'backbone',
	'marionette',
	'componentbase',
	'plupload',
	'plupload.html4',
	'plupload.html5'
], function (Backbone, Marionette, ColonyBase, plupload, pluploadhtml4, pluploadhtml5, DataTable) {

    var FileTableRow = Backbone.Marionette.ItemView.extend({
        template: 'filelibrarytablerow',
        tagName: 'tr',
        componentId: '',
        selectedIds: [],
        initialize: function (options) {
            this.componentId = options.componentId;
            this.model.set('componentId', options.componentId);
            this.selectedIds = options.selectedIds;
            this.model.set('selectedIds', options.selectedIds);
        }
    });
    var FileTable = Backbone.Marionette.CompositeView.extend({
        tagName: 'table',
        template: 'filelibrarytable',
        itemView: FileTableRow,
        currentPage: 1,
        componentId: '',
        selectedIds: [],
        initialize: function (options) {
            //this.model.set('componentId', options.componentId);
            this.componentId = options.componentId;
            this.selectedIds = options.selectedIds;
            this.getData(this);
        },
        itemViewOptions: function(model, index) {
            return {
                componentId: this.componentId,
                selectedIds: this.selectedIds
            }
        },
        templateHelpers: function() {
            var that = this;
            return {
                componentId: function() {
                    return that.options.componentId;
                },
                selectedIds: function () {
                    return that.options.selectedIds;
                }
            }
        },
        events: {
            "click a.nextpage": "nextpage",
            "click a.prevpage": "prevpage",
            "click a.search": "textchange",
            "change input[type=checkbox]": "checkchange"
        },
        textchange: function() {
            this.getData(this);
        },
        checkchange: function (e) {
            var chk = $(e.currentTarget);
            if (chk.is(':checked'))
                this.selectedIds.push(chk.val());
            else
            {
                for (var i = this.selectedIds.length; i--;) {
                    if (this.selectedIds[i] === chk.val()) {
                        this.selectedIds.splice(i, 1);
                    }
                }
            }
            this.$('#' + this.componentId + '_ids').val(this.selectedIds.join(','));
        },
        nextpage: function() {
            var that = this;
            that.currentPage++;
            that.getData(that);
        },
        prevpage: function () {
            var that = this;
            that.currentPage--;
            that.getData(that);
        },
        getData: function (that) {
            $.ajax({
                url: '/actionuri/assets/file/getfilesforcms/',
                method: 'POST',
                data: 'keywords=' + (that.$('input[type=text]').val() || '') + '&perPage=9&page=' + that.currentPage,
                success: function (data) {
                    that.collection = new FileCollection(data.file);
                    that.render();
                }
            });
        },
        appendHtml: function (collection, item) {
            collection.$('tbody').append(item.el);
        }

    });

    var File = Backbone.Model.extend({});
    var FileCollection = Backbone.Collection.extend({
        model: File
    });

    var FileField = ColonyBase.extend({
        template: 'filelibrary',
        table: null,
		onRender: function () {
			this.$el.addClass('field fileupload dataTable');
			var that = this;
			setTimeout(function () { that.wireEvents(); }, 500);
			that.table = new FileTable({ componentId: that.model.get('componentId'), maxfiles: that.model.get('maxfiles') || 10, minfiles: that.model.get('minfiles') || 0, selectedIds: (that.model.get('value') || '').split(',') });
			that.table.render();
			that.$el.append(that.table.$el);
		},

		wireEvents: function () {
			var that = this;
			if ($('#' + that.model.get('componentId') + '_uploadfiles').length > 0) {
				var uploader = new plupload.Uploader({
					runtimes: 'html5',
					browse_button: that.model.get('componentId') + '_pickfiles',
					container: that.model.get('componentId'),
					max_file_size: '10mb',
					filters: [
						{ title: "Allowed files", extensions: "txt,pdf,doc,xls,ppt,docx,xlsx,pptx,zip" }
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

					up.settings.url = '/actionuri/assets/file/upload/' + '?name=' + name + '&description=' + description;
				});
				uploader.bind('UploadProgress', function (up, file) {
					$('#' + file.id + ' b').html('<span>' + file.percent + "%</span>");
				});
				uploader.bind('FileUploaded', function (up, file) {
					$('#' + file.id).remove();
				});
				uploader.bind('UploadComplete', function (up, files) {
					App.vent.trigger('colony:fileuploadcompleted');
					that.table.getData(that.table);
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
	return FileField;
});