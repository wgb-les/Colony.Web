{
	"behaviourId": "CmsEditAsSeenInCategory",
		"page": {
			"label": "Edit As Seen In Category",
			"back": "#/asseenincategories/index/",
			"backdescription": "As Seen In Categories",
			"messages": [{
				"message": "EditAsSeenInCategory",
				"behaviourId": "CmsListAsSeenInCategory",
				"trigger": "submit",
				"success": "redirect:/asseenincategories/index/"
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
						"source": "aseenincategory.name"
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
						"source": "aseenincategory.shortDescription"
					}],
					"validation": {
					    "maxlength": 255
					}
				}, {
					"label": "Image",
					"type": "imagelibrary",
					"componentId": "ImageAssetID",
					"map": [{
						"friendlyName": "Value",
						"source": "aseenincategory.imageAssetId"
					}]
				}, {
					"label": "Should this category be visible on the front-end",
					"type": "switch",
					"componentId": "IsVisible",
					"map": [{
						"friendlyName": "Value",
						"source": "aseenincategory.isVisible"
					}]
				}, {
					"label": "URI",
					"type": "text",
					"componentId": "URI",
					"map": [{
						"friendlyName": "Value",
						"source": "aseenincategory.uri"
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
					"source": "aseenincategory.longDescription"
				}],
				"validation": {
				    "required": true
				}
			}]
		}, {
		    "label": "On which Sites should this item appear",
		    "type": "checkboxlist",
		    "componentId": "SiteIds",
		    "dataCollection": "sites",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "aseenincategory.siteIds",
		        "default": "1"
		    }]
		}, {
		    "label": "As Seen In Category ID",
		    "type": "hidden",
		    "componentId": "Id",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "aseenincategory.id"
		    }]
		}, {
			"label": "Order",
			"type": "hidden",
			"componentId": "Order",
			"map": [{
				"friendlyName": "Value",
				"source": "aseenincategory.order"
			}]
		}, {
		    "label": "Parent ID",
		    "type": "hidden",
		    "componentId": "ParentID",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "aseenincategory.parentID"
		    }]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
	"data": {
		"execute": [{
		    "name": "aseenincategory",
		    "ServiceType": "WalkerGreenbank.Modules.AsSeenIn.Services.IAsSeenInItemService, WalkerGreenbank.Modules",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [{
				"Key": "id",
				"Value": 1
			}],
			"map": {
				"Name": "name",
				"AsSeenInCategoryID": "id"
			}
		}, {
			"name": "Languages",
			"ServiceType": "Colony.Services.Core.Abstract.Language.ILanguageService, Colony.Services",
			"ServiceMethod": "GetAll"
		}, {
			"name": "Sites",
			"ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
			"ServiceMethod": "GetAll"
		}]
	}
}