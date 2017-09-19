define([
	'backbone',
	'marionette',
	'componentbase',
	'src/component/image',
	'elastislide'
], function (Backbone, Marionette, ColonyBase, ImageComponent, Elastislide) {
	var model = Backbone.Model.extend({});
	var ImageCollection = Backbone.Collection.extend({ model: model });

	var ImageLibraryItemView = Backbone.Marionette.ItemView.extend({
		template: 'imagelibrary/imageassetforcontrol',
		className: 'image-library-image-container',
		tagName: 'li',
		onRender: function () {
			this.$el.attr('data-imageassetid', this.model.get('Id'));

		}
	});
	var ImageLibrary = ColonyBase.extend({
		template: 'imagelibrary',
		className: 'field image',
		itemView: ImageLibraryItemView,
		initialize: function () {
			var that = this;
			$.ajax({
				url: '/actionuri/assets/image/getimagesforcms/',
				method: 'POST',
				async: false,
				success: function (data) {
					that.collection = new ImageCollection(data.image);
				}
			});
			App.vent.on('colony:imageuploadcompleted', function () {
				$.ajax({
					url: '/actionuri/assets/image/getimagesforcms/',
					method: 'POST',
					async: false,
					success: function (data) {
						that.collection = new ImageCollection(data.image);
					}
				});
				that.render();
			});
			if (this.value == undefined || this.value == null)
				this.value = '';
		},
		events: {
			'click .image-library-search-button': 'performSearch',
			'keypress .image-library-search input': 'searchkeyup'
		},
		searchkeyup: function(e) {
			if (e.which == 13)
				$('.image-library-search-button').click();
		},
		performSearch: function (e) {
			e.preventDefault();
			var that = this;
			$.ajax({
				url: '/actionuri/assets/image/getimagesforcms/',
				method: 'POST',
				data: 'keywords=' + this.$('input[type="text"]').val(),
				async: false,
				success: function (data) {
					that.collection = new ImageCollection(data.image);
				}
			});
			this.render();
			return false;
		},
		onRender: function () {
			imageComponent = new ImageComponent({ model: this.model });
			imageComponent.render();
			this.$('.image-library-uploader').empty().append(imageComponent.el);

			var that = this;
			var val = this.model.get('value');
			if (val.indexOf(',') >= 0)
			{
				var vals = val.split(',');
				for (var i = 0; i < vals.length; i++) {
					this.$('li[data-imageassetid="'+vals[i]+'"]').addClass('selected');
				}
			}
			else {
				this.$('li[data-imageassetid="'+val+'"]').addClass('selected');
			}
			this.$('.image-library-listing li').hover(function (e) {
				$(this).toggleClass('hover');
			});
			this.$('.image-library-listing li').click(function (e) {
				$(this).siblings('li').removeClass('selected');
				$(this).toggleClass('selected');
				if ($(this).hasClass('selected'))
				{
				    $('#' + that.model.get('componentId')).val($(this).attr('data-imageassetid'));
				}
				else
				{
				    $('#' + that.model.get('componentId')).val('');
				}
				
			});
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

			//this.$('ul').elastislide();


		},
		appendHtml: function (collectionView, itemView) {
			collectionView.$('ul').append(itemView.el);
		},
		bindings: {
			"value": "input"
		}
	});
	
	return ImageLibrary;
});