{
	"behaviourId": "CmsListDeepLinkCategory",
	"messageHandlers": [{
	    "Name": "EditDeepLinkCategory",
	    "ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkCategoryService, Colony.Services",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "AddDeepLinkCategory",
	    "ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkCategoryService, Colony.Services",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "DeleteDeepLinkCategory",
	    "ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkCategoryService, Colony.Services",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
	    "Name": "ListDeepLinkCategory",
	    "ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkCategoryService, Colony.Services",
	    "ServiceMethod": "GetAll"
	}, {
	     "Name": "UpdateOrder",
	     "ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkCategoryService, Colony.Services",
	     "ServiceMethod": "UpdateOrder",
	     "ServiceMethodParams": [
             { "Key": "entityId", "Value": 0 },
             { "Key": "insertBeforeEntityId", "Value": 0 }
	     ]
	 }],
	"page": {
		"label": "Deep Link Categories"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "BlogTabs",
		"actions": [{
			"icon": "plus",
			"url": "/deeplinkcategories/add/",
			"name": "Add Deep Link Category"
		}, {
		    "icon": "align-justify",
		    "url": "/deeplinks/index/?siteId=<%=App.Colony.currentSiteId%>&deepLinkCategoryId=0",
		    "name": "List Root Level Deep Links"
		}]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "BlogList",
		"dataCollection": "deeplinkcategories",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/deeplinkcategories/edit/?id=<%=id%>",
			"name": "Edit this Deep Link Category"
		}, {
		    "icon": "align-justify",
		    "name": "View Deep Links for this Deep Link Category",
		    "url": "/edit/#/deeplinks/index/?siteId=<%=App.Colony.currentSiteId%>&deepLinkCategoryId=<%=id%>"
		}, {
			"icon": "remove",
			"name": "Delete this Deep Link Category",
			"url": "/edit/#/deeplinkcategories/delete/?id=<%=id%>"
		}],
		"messages": [
            {
                "message": "UpdateOrder",
                "behaviourId": "CmsListDeepLinkCategory",
                "trigger": "UpdateOrder"
            }
		]
	}],
	"data": {
		"execute": [{
			"name": "deeplinkcategories",
			"ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkCategoryService, Colony.Services",
			"ServiceMethod": "GetAll",
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}