{
	"behaviourId": "CmsAddEventCategory",
	"page": {
		"label": "Add Event Category",
		"back": "#/eventcategories/index/",
		"backdescription": "Event Categories",
		"messages": [{
			"message": "AddEventCategory",
			"behaviourId": "CmsListEventCategory",
			"trigger": "submit",
			"success": "redirect:/eventcategories/index/"
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
						"source": "eventcategory.name"
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
						"source": "eventcategory.shortDescription"
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
						"source": "eventcategory.imageAssetId"
					}]
				}, {
					"label": "Should this category be visible on the front-end",
					"type": "switch",
					"componentId": "IsVisible",
					"map": [{
						"friendlyName": "Value",
						"source": "eventcategory.isVisible",
						"default": "true"
					}]
				}, {
					"label": "URI",
					"type": "text",
					"componentId": "URI",
					"map": [{
						"friendlyName": "Value",
						"source": "eventcategory.uri"
					}]
				}, {
					"label": "Language",
					"type": "dropdown",
					"componentId": "LanguageId",
					"dataCollection": "languages",
					"map": [{
						"friendlyName": "Value",
						"source": "eventcategory.languageId",
						"default": 1
					}]
				}, {
					"label": "Tags",
					"type": "tags",
					"componentId": "TagIds",
					"dataCollection": "languages",
					"map": [{
						"friendlyName": "Value",
						"source": "eventcategory.tagIds"
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
					"source": "eventcategory.longDescription"
				}],
				"validation": {
					"required": true
				}
			}, {
				"label": "Window Title",
				"type": "text",
				"componentId": "MetaTitle",
				"map": [{
					"friendlyName": "Value",
					"source": "eventcategory.windowTitle"
				}]
			}, {
				"label": "Meta Keywords",
				"type": "text",
				"componentId": "MetaKeywords",
				"map": [{
					"friendlyName": "Value",
					"source": "eventcategory.metaKeywords"
				}]
			}, {
				"label": "Meta Description",
				"type": "textarea",
				"componentId": "MetaDescription",
				"map": [{
					"friendlyName": "Value",
					"source": "eventcategory.metaDescription"
				}]
			}]
		}, {
			"label": "Blog Category ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "eventcategory.id"
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
			"label": "Language ID",
			"type": "hidden",
			"componentId": "LanguageID",
			"map": [{
				"friendlyName": "Value",
				"source": "eventcategory.languageId",
				"default": "1"
			}]
		}, {
			"label": "Moderation Status ID",
			"type": "hidden",
			"componentId": "ModerationStatusID",
			"map": [{
				"friendlyName": "Value",
				"source": "eventcategory.moderationStatusId",
				"default": "5"
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