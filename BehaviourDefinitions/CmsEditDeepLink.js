{
	"behaviourId": "CmsEditDeepLink",
	"page": {
		"label": "Edit Deep Link",
		"back": "#/deeplinks/index/?siteId=<%=App.Colony.currentSiteId%>&deepLinkCategoryId=<%=App.data.deeplink.deepLinkCategoryId || 0%>",
		"backdescription": "deep links",
		"messages": [{
			"message": "EditDeepLink",
			"behaviourId": "CmsListDeepLink",
			"trigger": "submit",
			"success": "redirect:/deeplinks/index/?siteId=<%=App.Colony.currentSiteId%>&deepLinkCategoryId=<%=App.data.deeplink.deepLinkCategoryId || 0%>"
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
						"source": "deeplink.isVisible"
					}]
				},
				{
					"label": "On which Sites should this deep link appear",
					"type": "checkboxlist",
					"componentId": "SiteIds",
					"dataCollection": "sites",
					"map": [{
						"friendlyName": "Value",
						"source": "deeplink.siteIds",
						"default": "1"
					}]
				}, {
					"label": "Category",
					"type": "dropdown",
					"componentId": "DeepLinkCategoryId",
					"dataCollection": "deeplinkcategories",
					"map": [{
						"friendlyName": "Value",
						"source": "deeplink.deepLinkCategoryId",
						"default": "querystring.deepLinkCategoryId"
					}],
					"validation": {
					    "required": true
					}
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
			"name": "deeplink",
			"ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkService, Colony.Services",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [
				{"Key": "Id", "Value": "1"}
			],
			"map": {
				"Name": "name",
				"BlogID": "id"
			}
		}, {
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