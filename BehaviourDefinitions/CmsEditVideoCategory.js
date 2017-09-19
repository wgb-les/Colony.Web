{
	"behaviourId": "CmsEditVideoCategory",
		"page": {
			"label": "Edit Video Category",
			"back": "#/videocategories/index/",
			"backdescription": "Video Categories",
			"messages": [{
				"message": "EditVideoCategory",
				"behaviourId": "CmsListVideoCategory",
				"trigger": "submit",
				"success": "redirect:/videocategories/index/"
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
						"source": "videocategory.name"
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
						"source": "videocategory.shortDescription"
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
						"source": "videocategory.imageAssetId"
					}]
				}, {
					"label": "Should this category be visible on the front-end",
					"type": "switch",
					"componentId": "IsVisible",
					"map": [{
						"friendlyName": "Value",
						"source": "videocategory.isVisible"
					}]
				}, {
					"label": "URI",
					"type": "text",
					"componentId": "URI",
					"map": [{
						"friendlyName": "Value",
						"source": "videocategory.uri"
					}]
				}, {
					"label": "Language",
					"type": "dropdown",
					"componentId": "LanguageId",
					"dataCollection": "languages",
					"map": [{
						"friendlyName": "Value",
						"source": "videocategory.languageId",
						"default": 1
					}],
					"validation": {
					    "required": true
					}
				}, {
					"label": "Tags",
					"type": "tags",
					"componentId": "TagIds",
					"dataCollection": "languages",
					"map": [{
						"friendlyName": "Value",
						"source": "videocategory.tagIds"
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
					"source": "videocategory.longDescription"
				}],
				"validation": {
				    "required": true
				}
			}, {
				"label": "Window Title",
				"type": "text",
				"componentId": "WindowTitle",
				"map": [{
					"friendlyName": "Value",
					"source": "videocategory.windowTitle"
				}],
				"validation": {
				    "maxlength": 255
				}
			}, {
				"label": "Meta Keywords",
				"type": "text",
				"componentId": "MetaKeywords",
				"map": [{
					"friendlyName": "Value",
					"source": "videocategory.metaKeywords"
				}],
				"validation": {
				    "maxlength": 255
				}
			}, {
				"label": "Meta Description",
				"type": "textarea",
				"componentId": "MetaDescription",
				"map": [{
					"friendlyName": "Value",
					"source": "videocategory.metaDescription"
				}],
				"validation": {
				    "maxlength": 255
				}
			}]
		}, {
			"label": "Blog Category ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "videocategory.id"
			}]
		}, {
			"label": "Order",
			"type": "hidden",
			"componentId": "Order",
			"map": [{
				"friendlyName": "Value",
				"source": "videocategory.order"
			}]
		}, {
			"label": "Moderation Status ID",
			"type": "hidden",
			"componentId": "ModerationStatusID",
			"map": [{
				"friendlyName": "Value",
				"source": "videocategory.moderationStatusId",
				"default": "5"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
	"data": {
		"execute": [{
		    "name": "videocategory",
			"ServiceType": "Colony.Modules.Videos.Services.IVideoCategoriesService, Colony.Modules",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [{
				"Key": "id",
				"Value": 1
			}],
			"map": {
				"Name": "name",
				"BlogID": "id"
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