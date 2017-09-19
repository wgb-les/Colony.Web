{
	"behaviourId": "CmsAddVideo",
	"page": {
		"label": "Add Video",
		"back": "#/videos/index/?siteId=<%=App.QueryString['siteId']%>&videoCategoryId=<%=App.QueryString['videoCategoryId'] || 0%>",
		"backdescription": "videos",
		"messages": [{
			"message": "AddVideo",
			"behaviourId": "CmsListVideo",
			"trigger": "submit",
			"success": "redirect:/videos/index/?siteId=<%=App.QueryString['siteId']%>&videoCategoryId=<%=App.QueryString['videoCategoryId'] || 0%>"
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
						"source": "video.name"
					}]
				}, {
				    "label": "Video URL",
				    "type": "video",
				    "componentId": "VideoUri",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "video.videoUri"
				    }]
				}, {
					"label": "Short Description",
					"type": "textarea",
					"componentId": "ShortDescription",
					"map": [{
						"friendlyName": "Value",
						"source": "video.shortDescription"
					}]
				}, {
					"label": "Image",
					"type": "imagelibrary",
					"componentId": "ImageAssetID",
					"map": [{
						"friendlyName": "Value",
						"source": "video.imageAssetId"
					}]
				}, {
					"label": "Start Publishing",
					"type": "datetime",
					"componentId": "PublishStart",
					"map": [{
						"friendlyName": "Value",
						"source": "video.publishStart"
					}]
				}, {
					"label": "End Publishing",
					"type": "datetime",
					"componentId": "PublishEnd",
					"map": [{
						"friendlyName": "Value",
						"source": "video.publishEnd"
					}]
				}, {
					"label": "Are comments enabled for this post?",
					"type": "switch",
					"componentId": "CommentsEnabled",
					"map": [{
						"friendlyName": "Value",
						"source": "video.commentsEnabled",
						"default": "0"
					}]
				}, {
					"label": "Should this video be visible on the front-end",
					"type": "switch",
					"componentId": "IsVisible",
					"map": [{
						"friendlyName": "Value",
						"source": "video.isVisible",
						"default": "true"
					}]
				}, {
					"label": "URI",
					"type": "text",
					"componentId": "URI",
					"map": [{
						"friendlyName": "Value",
						"source": "video.uri"
					}]
				}, {
					"label": "Language",
					"type": "dropdown",
					"componentId": "LanguageId",
					"dataCollection": "languages",
					"map": [{
						"friendlyName": "Value",
						"source": "video.languageId",
						"default": 1
					}]
				}, {
					"label": "Tags",
					"type": "tags",
					"componentId": "Tags",
					"dataCollection": "tags",
					"map": [{
						"friendlyName": "Value",
						"source": "video.tags"
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
					"source": "video.longDescription"
				}]
			}, {
				"label": "Window Title",
				"type": "text",
				"componentId": "WindowTitle",
				"map": [{
					"friendlyName": "Value",
					"source": "video.windowTitle"
				}]
			}, {
				"label": "Meta Keywords",
				"type": "text",
				"componentId": "MetaKeywords",
				"map": [{
					"friendlyName": "Value",
					"source": "video.metaKeywords"
				}]
			}, {
				"label": "Meta Description",
				"type": "textarea",
				"componentId": "MetaDescription",
				"map": [{
					"friendlyName": "Value",
					"source": "video.metaDescription"
				}]
			}, {
				"label": "On which Sites should this video appear",
				"type": "checkboxlist",
				"componentId": "SiteIds",
				"dataCollection": "sites",
				"map": [{
					"friendlyName": "Value",
					"source": "video.siteIds",
					"default": "1"
				}]
			}, {
				"label": "Category",
				"type": "dropdown",
				"componentId": "VideoCategoryId",
				"dataCollection": "videocategories",
				"map": [{
					"friendlyName": "Value",
					"source": "querystring.videoCategoryId",
					"default": "querystring.videoCategoryId"
				}]
			}]
		}, {
			"label": "Blog ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "video.id"
			}]
		}, {
			"label": "Language ID",
			"type": "hidden",
			"componentId": "LanguageID",
			"map": [{
				"friendlyName": "Value",
				"source": "video.languageId",
				"default": "1"
			}]
		}, {
			"label": "Order",
			"type": "hidden",
			"componentId": "Order",
			"map": [{
				"friendlyName": "Value",
				"source": "video.order"
			}]
		}, {
			"label": "Moderation Status ID",
			"type": "hidden",
			"componentId": "ModerationStatusID",
			"map": [{
				"friendlyName": "Value",
				"source": "video.moderationStatusId",
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
			"name": "videocategories",
			"ServiceType": "Colony.Modules.Videos.Services.IVideoCategoriesService, Colony.Modules",
			"ServiceMethod": "GetAll",
			"map": {
				"Name": "name",
				"BlogID": "id"
			}
		}]
	}
}