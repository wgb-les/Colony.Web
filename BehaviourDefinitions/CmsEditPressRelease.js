{
	"behaviourId": "CmsEditPressRelease",
	"page": {
		"label": "Edit Press Release",
		"back": "/pressreleases/index/?siteId=<%=App.Colony.currentSiteId%>&blogPostCategoryId=<%=App.data.pressRelease.pressReleaseCategoryId || 0%>",
		"backdescription": "press releases",
		"messages": [{
			"Message": "EditPressRelease",
			"BehaviourId": "CmsListPressRelease",
			"Trigger": "submit",
			"success": "redirect:/pressreleases/index/?siteId=<%=App.Colony.currentSiteId%>&pressReleaseCategoryId=<%=App.data.pressRelease.pressReleaseCategoryId || 0%>"
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
					"label": "PDF File",
					"type": "filelibrary",
					"dataCollection": "file",
					"componentId": "FileAssetId",
					"map": [{
						"friendlyName": "Value",
						"source": "pressRelease.name"
					}],
					"validation": {
						"required": true,
						"maxlength": 255
					}
				}, {
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
					"label": "Should this press release be visible on the front-end",
					"type": "switch",
					"componentId": "IsVisible",
					"map": [{
						"friendlyName": "Value",
						"source": "pressRelease.isVisible"
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
					"label": "Tags",
					"type": "tags",
					"componentId": "Tags",
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
			"componentId": "WindowTitle",
			"map": [{
				"friendlyName": "Value",
				"source": "pressRelease.windowTitle"
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
				"source": "pressRelease.metaKeywords"
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
				"source": "pressRelease.metaDescription"
			}],
			"validation": {
				"maxlength": 255
			}
		}, {
			"label": "On which Sites should this press release appear",
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
			"componentId": "PressReleaseCategoryId",
			"dataCollection": "pressreleasecategories",
			"map": [{
				"friendlyName": "Value",
				"source": "pressRelease.pressReleaseCategoryId",
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
			"name": "pressRelease",
			"ServiceType": "Colony.Modules.PressReleases.Services.IPressReleasesService, Colony.Modules",
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
		},
		{
			"name": "pressreleasecategories",
			"ServiceType": "Colony.Modules.PressReleases.Services.IPressReleaseCategoriesService, Colony.Modules",
			"ServiceMethod": "GetAll",
			"map": {
				"Name": "name",
				"BlogID": "id"
			}
		}, {
			"name": "file",
			"ServiceType": "Colony.Services.Core.Abstract.AssetLibrary.IFileAssetService, Colony.Services",
			"ServiceMethod": "GetAll"
		}]
	}
}