{
	"behaviourId": "CmsAddAsSeenInCategory",
	"page": {
		"label": "Add As Seen In Category",
		"back": "#/asseenincategories/index/",
		"backdescription": "As Seen In Categories",
		"messages": [{
			"message": "AddAsSeenInCategory",
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
						"source": "asseenincategory.name"
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
						"source": "asseenincategory.shortDescription"
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
						"source": "asseenincategory.imageAssetId"
					}]
				}, {
					"label": "Should this category be visible on the front-end",
					"type": "switch",
					"componentId": "IsVisible",
					"map": [{
						"friendlyName": "Value",
						"source": "asseenincategory.isVisible",
						"default": "true"
					}]
				}, {
					"label": "URI",
					"type": "text",
					"componentId": "URI",
					"map": [{
						"friendlyName": "Value",
						"source": "asseenincategory.uri"
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
					"source": "asseenincategory.longDescription"
				}],
				"validation": {
					"required": true
				}
			}]
		},  {
		    "label": "On which Sites should this item appear",
		    "type": "checkboxlist",
		    "componentId": "SiteIds",
		    "dataCollection": "sites",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "asseenincategory.siteIds",
		        "default": "1"
		    }]
		}, {
			"label": "As Seen InCategory ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "asseenincategory.id"
			}]
		}, {
			"label": "Parent ID",
			"type": "hidden",
			"componentId": "ParentId",
			"map": [{
				"friendlyName": "Value",
				"source": "querystring.parentId"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
	"data": {
		"execute": [{
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