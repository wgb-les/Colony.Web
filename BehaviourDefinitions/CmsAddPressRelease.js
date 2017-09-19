{
	"behaviourId": "CmsAddPressRelease",
	"page": {
		"label": "Add Press Release",
		"back": "#/pressreleases/index/?siteId=<%=App.QueryString['siteId']%>&pressReleaseCategoryId=<%=App.QueryString['pressReleaseCategoryId'] || 0%>",
		"backdescription": "press releases",
		"messages": [{
			"message": "AddPressRelease",
			"behaviourId": "CmsListPressRelease",
			"trigger": "submit",
			"success": "redirect:/pressreleases/index/?siteId=<%=App.QueryString['siteId']%>&pressReleaseCategoryId=<%=App.QueryString['pressReleaseCategoryId'] || 0%>"
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
						"source": "pressRelease.name"
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
						"source": "pressRelease.shortDescription"
					}],
					"validation": {
					    "required": true,
					    "maxlength": 500
					}
				}, {
					"label": "Image",
					"type": "imagelibrary",
					"componentId": "ImageAssetID",
					"map": [{
						"friendlyName": "Value",
						"source": "pressRelease.imageAssetId"
					}]
				}, {
					"label": "Start Publishing",
					"type": "datetime",
					"componentId": "PublishStart",
					"map": [{
						"friendlyName": "Value",
						"source": "pressRelease.publishStart"
					}]
				}, {
					"label": "End Publishing",
					"type": "datetime",
					"componentId": "PublishEnd",
					"map": [{
						"friendlyName": "Value",
						"source": "pressRelease.publishEnd"
					}]
				}, {
					"label": "Are comments enabled for this post?",
					"type": "switch",
					"componentId": "CommentsEnabled",
					"map": [{
						"friendlyName": "Value",
						"source": "pressRelease.commentsEnabled",
						"default": "0"
					}]
				}, {
					"label": "Should this blog be visible on the front-end",
					"type": "switch",
					"componentId": "IsVisible",
					"map": [{
						"friendlyName": "Value",
						"source": "pressRelease.isVisible",
						"default": "true"
					}]
				}, {
					"label": "URI",
					"type": "text",
					"componentId": "URI",
					"map": [{
						"friendlyName": "Value",
						"source": "pressRelease.uri"
					}]
				}, {
					"label": "Language",
					"type": "dropdown",
					"componentId": "LanguageId",
					"dataCollection": "languages",
					"map": [{
						"friendlyName": "Value",
						"source": "pressRelease.languageId",
						"default": 1
					}]
				}, {
					"label": "Tags",
					"type": "tags",
					"componentId": "Tags",
					"dataCollection": "languages",
					"map": [{
						"friendlyName": "Value",
						"source": "pressRelease.tags"
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
				"label": "Press Release Content",
				"type": "richtext",
				"componentId": "LongDescription",
				"map": [{
					"friendlyName": "Value",
					"source": "pressRelease.longDescription"
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
					"source": "pressRelease.metaTitle"
				}]
			}, {
				"label": "Meta Keywords",
				"type": "text",
				"componentId": "MetaKeywords",
				"map": [{
					"friendlyName": "Value",
					"source": "pressRelease.metaKeywords"
				}]
			}, {
				"label": "Meta Description",
				"type": "textarea",
				"componentId": "MetaDescription",
				"map": [{
					"friendlyName": "Value",
					"source": "pressRelease.metaDescription"
				}]
			}, {
				"label": "On which Sites should this blog appear",
				"type": "checkboxlist",
				"componentId": "SiteIds",
				"dataCollection": "sites",
				"map": [{
					"friendlyName": "Value",
					"source": "pressRelease.siteIds",
					"default": "1"
				}]
			}, {
				"label": "Category",
				"type": "dropdown",
				"componentId": "pressReleaseCategoryId",
				"dataCollection": "pressreleasecategories",
				"map": [{
					"friendlyName": "Value",
					"source": "querystring.pressReleaseCategoryId",
					"default": "querystring.pressReleaseCategoryId"
				}]
			}]
		}, {
			"label": "Blog ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "pressRelease.id"
			}]
		}, {
			"label": "Language ID",
			"type": "hidden",
			"componentId": "LanguageID",
			"map": [{
				"friendlyName": "Value",
				"source": "pressRelease.languageId",
				"default": "1"
			}]
		}, {
			"label": "Order",
			"type": "hidden",
			"componentId": "Order",
			"map": [{
				"friendlyName": "Value",
				"source": "pressRelease.order"
			}]
		}, {
			"label": "Moderation Status ID",
			"type": "hidden",
			"componentId": "ModerationStatusID",
			"map": [{
				"friendlyName": "Value",
				"source": "pressRelease.moderationStatusId",
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
		},
		{
			"name": "pressreleasecategories",
			"ServiceType": "Colony.Modules.PressReleases.Services.IPressReleaseCategoriesService, Colony.Modules",
			"ServiceMethod": "GetAll",
			"map": {
				"Name": "name",
				"BlogID": "id"
			}
		}]
	}
}