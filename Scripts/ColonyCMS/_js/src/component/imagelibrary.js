define([
	'backbone',
	'marionette',
	'componentbase',
	'src/component/image',
	'lib/requirejs/text!../../template/imagelibrary/imageassetforcontrolfull.html',
	'carouFredSel'
], function (Backbone, Marionette, ColonyBase, ImageComponent, ImageTemplate) {

	var model = Backbone.Model.extend({});
	
	var ImageLibrary = ColonyBase.extend({
		template: 'imagelibrary',
		className: 'field image',
		currentPage: 1,
		imageTemplate: null,
		imageComponent: null,
		getImages: function() {
			var that = this;
			$.ajax({
				url: '/actionuri/assets/image/getimagesforcms/',
				method: 'POST',
				data: 'keywords=' + (that.$('input[type="text"]').val() || '') + '&perPage=9&page=' + that.currentPage,
				success: function (data) {
					var html = '';
					for (var i = 0; i < data.image.length; i++)
					{
						html += that.imageTemplate(data.image[i]);
					}
					if (that.currentPage == 1)
					{
						that.$('.image-library-listing').trigger('removeItem', [that.$('.image-library-listing li')]);
						that.$('.image-library-listing').empty();
					}
					that.$('.image-library-listing')
						.trigger('insertItem', [html, 'end', true]);
					
				}
			});
		},
		initialize: function () {
			var that = this;
			that.imageTemplate = _.template(ImageTemplate);
			App.vent.on('colony:imageuploadcompleted', function () {
				that.currentPage = 1;
				that.getImages();
			});
			if (that.value == undefined || that.value == null)
				that.value = '';
			that.imageComponent = new ImageComponent({ model: that.model });
			if (!that.value)
			{
			    that.getImages();
			}
			that.render();
		},
		events: {
			'click .image-library-search-button': 'performSearch',
			'keypress .image-library-search input': 'searchkeyup'
		},
		searchkeyup: function (e) {
			if (e.which == 13)
			{
				$('.image-library-search-button').click();
				return false;
			}
		},
		performSearch: function (e) {
			e.preventDefault();
			e.stopPropagation();
			this.currentPage = 1;
			this.getImages();
			return false;
		},
		onRender: function () {
			var that = this;
			var value = that.model.get('value');
			if (!value || value == '')
			{
				that.$('.image-library-listing').carouFredSel({
					auto: false,
					items: {
						visible: 3,
						height: '250px',
						width: '150px'
					},
					scroll: {
						items: 3,
						onEnd: function (data) {
							that.currentPage += 1;
							that.getImages();
						}
					},
					prev: {
						button: that.$('.prev'),
						key: 'left'
					},
					next: {
						button: that.$('.next'),
						key: 'right'
					},
					infinite: false,
					circular: false,
					responsive: false,
					width: '100%',
					height: '250px'
				});

				that.imageComponent.render();
				that.$('.image-library-uploader').empty().append(that.imageComponent.el);
				
				that.$('.image-library-listing')
					.on('hover', 'li', function (e) {
						$(this).toggleClass('hover');
					})
					.on('click', 'li', function (e) {
						$(this).siblings('li').removeClass('selected');
						$(this).toggleClass('selected');
						if ($(this).hasClass('selected')) {
							//$('#' + that.model.get('componentId')).val($(this).attr('data-imageassetid'));
							that.model.set('value', $(this).attr('data-imageassetid'));
							that.render();
						}
						else {
							$('#' + that.model.get('componentId')).val('');
						}
					});
				that.$('.image-library-add-button').on('click', function (e) {
					var uploader = that.$('.image-library-uploader');
					if (uploader.hasClass('active')) {
						that.$('.image-library-uploader').animate({ 'top': '100%' }, 300).removeClass('active').fadeOut('slow');
						$(this).children('span').text('Add image(s)');
					}

					else {
						that.$('.image-library-uploader').fadeIn('slow').animate({ 'top': '30' }, 300).addClass('active');
						$(this).children('span').text('Done');
					}
					that.imageComponent.wireEvents();
				});
			}
			else
			{
				that.$('.changeImage').on('click', function (e) {
					e.preventDefault();
					that.model.set('value', null);
					that.getImages();
					that.render();
					return false;
				});
			}
			//var validation = that.model.get('validation');
			//if (validation && validation.required && validation.required == true) {
			//    var t = self.$('input[type=hidden]');
			//    t.rules("add", {
			//        required: true
			//    });
			//}
		},
		bindings: {
			"value": "input"
		}
	});
	
	return ImageLibrary;
});