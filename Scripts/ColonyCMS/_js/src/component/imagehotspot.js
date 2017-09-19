define([
	'backbone',
	'marionette',
	'componentbase',
	'fcbkcomplete'
], function (Backbone, Marionette, ColonyBase) {
	var count = 0;

	var ImageHotspotModel = Backbone.Model.extend({});
	var ImageHotspotCollection = Backbone.Collection.extend({ model: ImageHotspotModel });

	var ImageHotspot = ColonyBase.extend({
		template: 'imagehotspot',
		hotspots: [],
		events: {
			"click img" : "imageClick"
		},
		initialize: function () {
			var that = this;
			$.ajax({
				type: 'POST',
				data: "roomsetId=" + App.data.roomset.id,
				url: '/hotspots/cmshotspots/gethotspotsforroomset/',
				async: false,
				success: function (data) {
					that.hotspots = data;
				}
			});
		},
		onRender: function () {
			var self = this;
			this.$('img').load(function () {
			    self.$('.contain').width(self.$('img').width());
			    self.$('.contain').css('cursor', 'crosshair');
			});
			var tbody = this.$('.itemsList tbody');
			var container = this.$('.contain');
			container.children('div').remove();
			tbody.children('tr').remove();
			_.each(this.hotspots, function (hotspot, count) {
				container.append('<div data-hotspotid="' + hotspot.id + '" data-skuid="'+ hotspot.skuId + '" data-top="' + hotspot.top + '" data-left="' + hotspot.left + '" style=" cursor: move; background-color: #fff; border: 1px solid #cecece;position: absolute; display: block; width: 20px; height: 20px; border-radius: 20px; line-height: 18px; font-weight: bold; font-size: 14px; text-align: center; top: ' + hotspot.top.toString().replace('%', '') + '%; left: ' + hotspot.left.toString().replace('%', '') + '%;">' + (count + 1).toString() + '</div>');
				var row = $('<tr data-item="' + (count + 1).toString() + '"><td><div style="position: relative;" data-hotspotid="' + hotspot.id + '" data-skuid="' + hotspot.skuId + '" data-top="' + hotspot.top + '" data-left="' + hotspot.left + '"><span style="font-weight: bold;margin: 5px 12px 5px 5px;border: 1px solid #cecece;border-radius: 20px;width: 20px;height: 20px;display: inline-block;text-align: center;line-height: 18px;">' + (count + 1).toString() + '</span>' + hotspot.name + '<a class="icon-remove" href="#" style="position: absolute;right: 0;top: 50%;margin-top: -8px;">&#160;</a><a class="icon-pencil" href="#" style="position: absolute;right: 25px;top: 50%;margin-top: -8px;">&#160;</a></div></td><td style="display: none;">' + hotspot.top + '</td><td style="display: none;">' + hotspot.left + '</td></tr>');
				tbody.append(row);
			});
			tbody.on('click', '.icon-remove', function (e) {
				e.preventDefault();
				
				self.removeHotspot($(this).parent().data('hotspotid'), self);
				$(this).parent().fadeOut().remove();
				return false;
			});
			tbody.on('click', '.icon-pencil', function (e) {
			    e.preventDefault();

			    self.editHotspot($(this).parent().data('hotspotid'), $(this).parent().data('skuid'), $(this).parent().data('top'), $(this).parent().data('left'), self);
			    $(this).parent().fadeOut().remove();
			    return false;
			});
			container.children('div').draggable({
				cursor: 'move',
				containment: '.contain img',
				stop: function (event, ui) {
					var posX = ui.position.left,
						posY = ui.position.top,
						width = self.$('img').width(),
						height = self.$('img').height();

					var pos = { left: (posX / width * 100).toString() + '%', top: (posY / height * 100).toString() + '%' };
					self.updateHotspot($(ui.helper).data('hotspotid'), $(ui.helper).data('skuid'), pos, self);
				}
			});
			
		},
		editHotspot: function (hotspotId, skuId, top, left) {

		    var that = this;
		    var dialogContent = $('<div style="width: 100%; height: 100%; background-color: #fff; position: absolute; top: 0; left: 0;"><div class="field tagpicker"><div class="tagPickerSearch"><label for="tagpicker">Start typing a product name or code</label><select name="tagpicker" id="tagpicker"></select></div></div><div class="formControls"><button class="button" id="cancelButton"><span>Cancel</span></button></div></div>');
		    this.$('.contain').append(dialogContent);
		    dialogContent.find('#cancelButton').click(function (e) {
		        e.preventDefault();
		        dialogContent.fadeOut(500);
		        dialogContent.remove();
		        that.render();
		        return false;
		    });
		    var tbody = this.$('.itemsList tbody');

		    dialogContent.find('select').fcbkcomplete({
		        json_url: '/actionuri/stock/stock/getskusforcms/',
		        addontab: true,
		        maxitems: 1,
		        height: 20,
		        cache: true,
		        newel: false,
		        width: 500,
		        onselect: function (item) {
		            $.ajax({
		                type: 'POST',
		                url: '/hotspots/cmshotspots/removehotspot/',
		                data: 'RoomsetID=' + App.data.roomset.id + '&HotspotId=' + hotspotId,
		                success: function (data) {
		                    that.hotspots = $.grep(that.hotspots, function (val) {
		                        return (val.id != hotspotId);
		                    });
		                    $.ajax({
		                        type: 'POST',
		                        url: '/hotspots/cmshotspots/addhotspot/',
		                        data: 'RoomsetID=' + App.data.roomset.id + '&ImageAssetID=' + App.data.roomset.imageAssetID + '&SkuId=' + item._value + '&top=' + top + '&left=' + left + '&name=' + $('#' + item._id).text(),
		                        success: function (data) {
		                            that.hotspots.push(data);
		                            dialogContent.fadeOut(500);
		                            dialogContent.remove();
		                            that.render();
		                        }
		                    });

		                    self.render();
		                }
		            });
		            
		        }
		    });
		},
		imageClick: function (e) {
			var that = this;
			var pos = this.getRelativePositionForElement(e.currentTarget, e, true);
			var dialogContent = $('<div style="width: 100%; height: 100%; background-color: #fff; position: absolute; top: 0; left: 0;"><div class="field tagpicker"><div class="tagPickerSearch"><label for="tagpicker">Start typing a product name or code</label><select name="tagpicker" id="tagpicker"></select></div></div><div class="formControls"><button class="button" id="cancelButton"><span>Cancel</span></button></div></div>');
			this.$('.contain').append(dialogContent);
			dialogContent.find('#cancelButton').click(function (e) {
				e.preventDefault();
				dialogContent.fadeOut(500);
				dialogContent.remove();
				that.render();
				return false;
			});
			var tbody = this.$('.itemsList tbody');

			dialogContent.find('select').fcbkcomplete({
				json_url: '/actionuri/stock/stock/getskusforcms/',
				addontab: true,
				maxitems: 1,
				height: 20,
				cache: true,
				newel: false,
				width: 500,
				onselect: function (item) {

					$.ajax({
						type: 'POST',
						url: '/hotspots/cmshotspots/addhotspot/',
						data: 'RoomsetID=' + App.data.roomset.id  + '&ImageAssetID=' + App.data.roomset.imageAssetID + '&SkuId=' + item._value + '&top=' + pos.top + '&left=' + pos.left + '&name=' + $('#' + item._id).text(),
						success: function (data) {
							that.hotspots.push(data);
							dialogContent.fadeOut(500);
							dialogContent.remove();
							that.render();
						}
					});

				}
			});
		},
		updateHotspot: function(hotspotId, skuId, pos, self) {
			$.ajax({
				type: 'POST',
				url: '/hotspots/cmshotspots/updatehotspot/',
				data: 'RoomsetID=' + App.data.roomset.id + '&HotspotId=' + hotspotId + '&SkuId=' + skuId + '&top=' + pos.top + '&left=' + pos.left,
				success: function (data) {
					_.each(self.hotspots, function(item) {
					    if (item.id == data.id)
						{
							item.top = pos.top;
							item.left = pos.left;
						}
					});
					self.render();
				}
			});
		},
		removeHotspot: function(hotspotId, self) {
			$.ajax({
				type: 'POST',
				url: '/hotspots/cmshotspots/removehotspot/',
				data: 'RoomsetID=' + App.data.roomset.id + '&HotspotId=' + hotspotId,
				success: function (data) {
					self.hotspots = $.grep(self.hotspots, function (val) {
					    return (val.id != hotspotId);
					});
					self.render();
				}
			});
		},
		getRelativePositionForElement: function (elem, event, usePercentage) {
			var width = $(elem).width(), height = $(elem).height();
			var posX, posY;

			if (event.offsetX == undefined) // this works for Firefox
			{
				posX = event.pageX - $(elem).offset().left;
				posY = event.pageY - $(elem).offset().top;
			}
			else                     // works in Google Chrome
			{
				posX = event.offsetX;
				posY = event.offsetY;
			}

			console.log(posX, width);
			console.log(posY, height);
			if (usePercentage)
				return { left: (posX / width * 100).toString() + '%', top: (posY / height * 100).toString() + '%' };
			else
				return { left: posX.toString() + 'px', top: posY.toString() + 'px' };
		}
	});

	return ImageHotspot;
});