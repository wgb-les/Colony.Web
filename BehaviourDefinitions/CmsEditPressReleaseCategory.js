{
	"behaviourId": "CmsEditPressReleaseCategory",
		"page": {
			"label": "Edit Press Release Category",
			"back": "#/pressreleasecategories/index/",
			"backdescription": "Press Release Categories",
			"messages": [{
				"message": "EditPressReleaseCategory",
				"behaviourId": "CmsListPressReleaseCategory",
				"trigger": "submit",
				"success": "redirect:/pressreleasecategories/index/"
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
						"source": "pressreleasecategory.name"
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
						"source": "pressreleasecategory.shortDescription"
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
						"source": "pressreleasecategory.imageAssetId"
					}]
				}, {
					"label": "Should this category be visible on the front-end",
					"type": "switch",
					"componentId": "IsVisible",
					"map": [{
						"friendlyName": "Value",
						"source": "pressreleasecategory.isVisible"
					}]
				}, {
					"label": "URI",
					"type": "text",
					"componentId": "URI",
					"map": [{
						"friendlyName": "Value",
						"source": "pressreleasecategory.uri"
					}]
				}, {
					"label": "Language",
					"type": "dropdown",
					"componentId": "LanguageId",
					"dataCollection": "languages",
					"map": [{
						"friendlyName": "Value",
						"source": "pressreleasecategory.languageId",
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
						"source": "pressreleasecategory.tagIds"
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
					"source": "pressreleasecategory.longDescription"
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
					"source": "pressreleasecategory.windowTitle"
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
					"source": "pressreleasecategory.metaKeywords"
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
					"source": "pressreleasecategory.metaDescription"
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
				"source": "pressreleasecategory.id"
			}]
		}, {
			"label": "Order",
			"type": "hidden",
			"componentId": "Order",
			"map": [{
				"friendlyName": "Value",
				"source": "pressreleasecategory.order"
			}]
		}, {
			"label": "Moderation Status ID",
			"type": "hidden",
			"componentId": "ModerationStatusID",
			"map": [{
				"friendlyName": "Value",
				"source": "pressreleasecategory.moderationStatusId",
				"default": "5"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
	"data": {
		"execute": [{
		    "name": "pressreleasecategory",
			"ServiceType": "Colony.Modules.PressReleases.Services.IPressReleaseCategoriesService, Colony.Modules",
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