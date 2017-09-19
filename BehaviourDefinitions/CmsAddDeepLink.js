{
	"behaviourId": "CmsAddDeepLink",
	"page": {
		"label": "Add Deep Link",
		"back": "#/deeplinks/index/?siteId=<%=App.QueryString['siteId']%>&deepLinkCategoryId=<%=App.QueryString['deepLinkCategoryId'] || 0%>",
		"backdescription": "deep links",
		"messages": [{
			"message": "AddDeepLink",
			"behaviourId": "CmsListDeepLink",
			"trigger": "submit",
			"success": "redirect:/deeplinks/index/?siteId=<%=App.QueryString['siteId']%>&deepLinkCategoryId=<%=App.QueryString['deepLinkCategoryId'] || 0%>"
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
						"source": "deeplink.name"
					}],
					"validation": {
					    "required": true,
					    "maxlength": 255
					}
				}, {
					"label": "Target URL",
					"type": "text",
					"componentId": "TargetURI",
					"map": [{
						"friendlyName": "Value",
						"source": "deeplink.targetUri"
					}],
					"validation": {
					    "required": true,
					    "maxlength": 255
					}
				}, {
				    "label": "Should this deep link open in a new window",
				    "type": "switch",
				    "componentId": "NewWindow",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "deeplink.newWindow"
				    }]
				}, {
				    "label": "Should this deep link be visible on the front-end",
				    "type": "switch",
				    "componentId": "IsVisible",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "deeplink.isVisible",
				        "default": "true"
				    }]
				},
				{
			    "label": "On which Sites should this blog appear",
			    "type": "checkboxlist",
			    "componentId": "SiteIds",
			    "dataCollection": "sites",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "blog.siteIds",
			        "default": "1"
			    }]
			}, {
			    "label": "Category",
			    "type": "dropdown",
			    "componentId": "DeepLinkCategoryId",
			    "dataCollection": "deeplinkcategories",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "querystring.deepLinkCategoryId",
			        "default": "querystring.deepLinkCategoryId"
			    }]
			}]
		}, {
			"label": "Blog ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "deeplink.id"
			}]
		}, {
			"label": "Moderation Status ID",
			"type": "hidden",
			"componentId": "ModerationStatusID",
			"map": [{
				"friendlyName": "Value",
				"source": "blog.moderationStatusId",
				"default": "5"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
	"data": {
		"execute": [{
		    "name": "Sites",
		    "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
		    "ServiceMethod": "GetAll"
		},
		{
		    "name": "deeplinkcategories",
		    "ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkCategoryService, Colony.Services",
		    "ServiceMethod": "GetAll",
		    "map": {
		        "Name": "name",
		        "BlogID": "id"
		    }
		}]
	}
}