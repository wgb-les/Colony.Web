{
	"behaviourId": "CmsAddAsSeenIn",
	"page": {
		"label": "Add As Seen In Item",
		"back": "#/asseenin/index/?siteId=<%=App.QueryString['siteId']%>",
		"backdescription": "as seen in",
		"messages": [{
			"message": "AddAsSeenIn",
			"behaviourId": "CmsListAsSeenIn",
			"trigger": "submit",
			"success": "redirect:/asseenin/index/?siteId=<%=App.QueryString['siteId']%>"
		}]
	},
	"componentContainer": [
		{
			"label": "",
			"type": "fieldset",
			"componentId": "BasicDetailsFieldset",
			"className": "half",
			"components": [
				{
					"label": "Title",
					"type": "text",
					"componentId": "Name",
					"map": [{
						"friendlyName": "Value",
						"source": "asseenitem.name"
					}],
					"validation": {
						"required": true,
						"maxlength": 255
					}
				}, {
					"label": "Short Description",
					"type": "textarea",
					"componentId": "ShortDescription",
					"map": [{
						"friendlyName": "Value",
						"source": "asseenitem.shortDescription"
					}],
					"validation": {
						"required": true,
						"maxlength": 512
					}
				}, {
					"label": "Image",
					"type": "imagelibrary",
					"componentId": "ImageAssetID",
					"map": [{
						"friendlyName": "Value",
						"source": "asseenitem.imageAssetId"
					}]
				}, {
					"label": "URI",
					"type": "text",
					"componentId": "URI",
					"map": [{
						"friendlyName": "Value",
						"source": "asseenitem.uri"
					}]
				}, {
					"label": "Tags",
					"type": "tags",
					"componentId": "Tags",
					"map": [{
						"friendlyName": "Value",
						"source": "asseeninitem.tags"
					}]
				}, {
					"label": "Should this item be visible on the front end",
					"type": "switch",
					"componentId": "IsVisible",
					"map": [{
						"friendlyName": "Value",
						"source": "asseenitem.isVisible",
						"default": true
					}]
				}
			]
		},
		{
			"label": "",
			"type": "fieldset",
			"componentId": "BasicDetailsFieldset2",
			"className": "half",
			"components": [{
				"label": "Long Description",
				"type": "richtext",
				"componentId": "LongDescription",
				"map": [{
					"friendlyName": "Value",
					"source": "asseenitem.longDescription"
				}],
				"validation": {
					"required": true
				}
			}, {
				"label": "On which Sites should this item appear",
				"type": "checkboxlist",
				"componentId": "SiteIds",
				"dataCollection": "sites",
				"map": [{
					"friendlyName": "Value",
					"source": "asseenitem.siteIds",
					"default": "1"
				}]
			}, {
				"label": "Skus",
				"type": "skus",
				"componentId": "Skus",
				"map": [{
					"friendlyName": "Value",
					"source": "asseenitem.skus"
				}]
			}]
		}, {
			"label": "As Seen In Item ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "asseenitem.id"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
	 "data": {
		 "execute": [{
			 "name": "products",
			 "ServiceType": "Colony.Commerce.Services.Stock.Abstract.ISkuService, Colony.Commerce.Services",
			 "ServiceMethod": "GetAll"
		 }, {
			 "name": "Sites",
			 "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
			 "ServiceMethod": "GetAll"
		 }]
	 }

}