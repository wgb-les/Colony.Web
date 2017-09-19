define([
	'backbone',
	'marionette',
	'componentbase',
	'backbone.datagrid',
	'src/component/image',
    'lib/requirejs/text!../../template/paging.html'
], function (Backbone, Marionette, ColonyBase, DataGrid, ImageComponent, paginationTemplate) {
	var model = Backbone.Model.extend({});
	var ImageCollection = Backbone.Collection.extend({ model: model });

	var ImageLibraryItemView = Backbone.Marionette.ItemView.extend({
		template: 'imagelibrary/imageasset',
		className: 'image-library-image-container',
		tagName: 'li',
		onRender: function () {
			this.$el.attr('data-imageassetid', this.model.get('Id'));
		}
	});

	var ImageLibrary = ColonyBase.extend({
		template: 'imagelibrarygridview',
		itemView: ImageLibraryItemView,
        keywords: '',
		perPage: 30,
        pageCount: 0,
        page: 1,
        pageNumber: function (e) {
            e.preventDefault();
            this.setPage($(e.currentTarget).data('page'));
            return false;
        },
        nextPage: function (e) {
            e.preventDefault();
            if (!$(e.currentTarget).hasClass('disabled'))
                this.setPage(this.page + 1);
            return false;
        },
        prevPage: function (e) {
            e.preventDefault();
            if (!$(e.currentTarget).hasClass('disabled'))
                this.setPage(this.page - 1);
            return false;
        },
        firstPage: function (e) {
            e.preventDefault();
            if (!$(e.currentTarget).hasClass('disabled'))
                this.setPage(1);
            return false;
            
        },
        lastPage: function (e) {
            e.preventDefault();
            if (!$(e.currentTarget).hasClass('disabled'))
                this.setPage(this.pageCount);
            return false;
        },
        setPage: function(page) {
            if (page >= 1 && page <= this.pageCount) {
                this.page = page;
                this.getImages(this);
            }
        },
        getImages: function (that) {
            that.keywords = that.$('input[type="text"]').val() || '';
            $.ajax({
                url: '/actionuri/assets/image/getimagesforcms/',
                method: 'POST',
                data: 'perPage=' + that.perPage + '&page=' + that.page + '&keywords=' + that.keywords,
                async: false,
                success: function (data) {
                    that.pageCount = data.pageCount;
                    that.collection = new ImageCollection(data.image);
                }
            });
            that.render();
        },
		initialize: function () {
			var that = this;
			that.getImages(that);
			App.vent.on('colony:imageuploadcompleted', function () {
			    that.page = 1;
			    that.getImages(that);
			});
		},

		events: {
		    "click .image-library-search-button": "performSearch",
		    "click .pageNumber": "pageNumber",
		    "click .nextPage": "nextPage",
		    "click .prevPage": "prevPage",
		    "click .firstPage": "firstPage",
		    "click .lastPage": "lastPage"
		},
		performSearch: function (e) {
			e.preventDefault();
			var that = this;
			that.page = 1;
			that.getImages(that);
			return false;
		},
		onRender: function () {
			
			imageComponent = new ImageComponent({ model: this.model });
			imageComponent.render();
			var that = this;
			this.$('.image-library-uploader').empty().append(imageComponent.el);

			this.$('.image-library-listing li').hover(function (e) {
				$(this).toggleClass('hover');
				$(this).find('.imageOptions').fadeToggle();
			});

			that.$('input[type=text]').val(that.keywords);

			//this.$('.image-library-listing li').click(function (e) {
			//	App.Router.navigate( "images/edit/?id="+$(this).attr('data-imageassetid'),{ trigger: true });
			//});
			this.$('.image-library-add-button').on('click', function (e) {
				var uploader = that.$('.image-library-uploader');
				if (uploader.hasClass('active')) {
					that.$('.image-library-uploader').animate({ 'top': '100%' }, 300).removeClass('active').fadeOut('slow');
					$(this).children('span').text('Add image(s)');
				}

				else {
					that.$('.image-library-uploader').fadeIn('slow').animate({ 'top': '30' }, 300).addClass('active');
					$(this).children('span').text('Done');
				}
				imageComponent.wireEvents();
			});

			this.$('.image-library-delete-button').on('click', function (e) {
			    if (confirm("Are you sure you wish to delete these images, they CANNOT be undeleted?")) {
			        $('input:checked[name=SelectedImageIds]').each(function () {
			            var id = this.value;
			            that.__sendMessage("DeleteImage", new Date().getTime(), "CmsListImage", that.componentId, "DeleteImage", "id=" + id, that.deleteCallback, "", that);
			        });
			    }
			});

			that.renderPaging(that);
			
		},
		deleteCallback: function (trigger, data, onSuccess, that) {
		    if (data.success == true) {
		        location.reload();
		    }
		},
		appendHtml: function (collectionView, itemView) {
			collectionView.$('ul').append(itemView.el);
		},
		renderPaging: function (that) {
		    //var html = '<div><ul>';
		    //if (that.page > 1)
		    //{
		    //    html += '<li><a class="prevPage">Prev</a></li>';
		    //}
		    //for (var i = 1; i <= that.pageCount; i++)
		    //{
		    //    html += '<li><a class="pageNumber" data-page="' + i.toString() + '">' + i.toString() + '</a></li>';
		    //}
		    //if (that.page < that.pageCount) {
		    //    html += '<li><a class="nextPage">Next</a></li>';
		    //}
		    //html += '</ul></div>';

		    //console.log(that.pageCount);
		    //console.log(that.$el);

		    //that.$el.append(html);
		    var html = _.template(paginationTemplate, { page: that.page, pageCount: that.pageCount });
		    that.$el.append(html);
		}
	});

	return ImageLibrary;
});