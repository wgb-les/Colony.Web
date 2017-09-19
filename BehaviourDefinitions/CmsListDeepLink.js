{
	"behaviourId": "CmsListDeepLink",
	"messageHandlers": [{
		"Name": "EditDeepLink",
		"ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkService, Colony.Services",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "AddDeepLink",
		"ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkService, Colony.Services",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "DeleteDeepLink",
		"ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkService, Colony.Services",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
	    "Name": "UpdateOrder",
	    "ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkService, Colony.Services",
	    "ServiceMethod": "UpdateOrder",
	    "ServiceMethodParams": [
            { "Key": "entityId", "Value": 0 },
            { "Key": "insertBeforeEntityId", "Value": 0 }
	    ]
	}],
	"page": {
		"label": "Deep Links",
		"back": "/deeplinkcategories/index/",
		"backdescription": "Deep Link Categories"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "BlogTabs",
		"actions": [{
			"icon": "plus",
			"url": "/deeplinks/add/?siteId=<%=App.Colony.currentSiteId%>&deepLinkCategoryId=<%=App.QueryString['deepLinkCategoryId']%>",
			"name": "Add Deep Link"
		}]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "BlogList",
		"dataCollection": "deeplink",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/deeplinks/edit/?id=<%=id%>",
			"name": "Edit this Deep Link"
		}, {
			"icon": "remove",
			"name": "Delete this Deep Link",
			"url": "/edit/#/deeplinks/delete/?id=<%=id%>"
		}],
		"messages": [
            {
                "message": "UpdateOrder",
                "behaviourId": "CmsListDeepLink",
                "trigger": "UpdateOrder"
            }
		]
	}],
	"data": {
		"execute": [{
			"name": "deeplink",
			"ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkService, Colony.Services",
			"ServiceMethod": "GetForCms",
			"ServiceMethodParams": [
                {"Key": "siteId", "Value": "<%=App.Colony.currentSiteId%>" },
				{"Key": "deepLinkCategoryId", "Value": "<%=App.QueryString['deepLinkCategoryId']%>" }

			],
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}