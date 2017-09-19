{
	"behaviourId": "CmsListAsSeenInCategory",
	"messageHandlers": [{
	    "Name": "EditAsSeenInCategory",
	    "ServiceType": " WalkerGreenbank.Modules.AsSeenIn.Services.IAsSeenInCategoryService, WalkerGreenbank.Modules",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "AddAsSeenInCategory",
	    "ServiceType": " WalkerGreenbank.Modules.AsSeenIn.Services.IAsSeenInCategoryService, WalkerGreenbank.Modules",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "DeleteAsSeenInCategory",
	    "ServiceType": " WalkerGreenbank.Modules.AsSeenIn.Services.IAsSeenInCategoryService, WalkerGreenbank.Modules",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
	    "Name": "ListAsSeenInCategory",
	    "ServiceType": " WalkerGreenbank.Modules.AsSeenIn.Services.IAsSeenInCategoryService, WalkerGreenbank.Modules",
	    "ServiceMethod": "GetAll"
	}],
	"page": {
		"label": "As Seen In Categories"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "AsSeenInTabs",
		"actions": [{
			"icon": "plus",
			"url": "/asseenincategories/add/",
			"name": "Add As Seen In Category"
		}, {
		    "icon": "align-justify",
		    "url": "/asseenin/index/?siteId=<%=App.Colony.currentSiteId%>&asSeenInCategoryId=0",
		    "name": "List Root Level As Seen In Items"
		}]
	}, {
		"label": "",
		"type": "treeview",
		"componentId": "AsSeenInList",
		"dataCollection": "asseenincategories",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/asseenincategories/edit/?id=<%=id%>",
			"name": "Edit this As Seen In Category"
		}, {
		    "icon": "align-justify",
		    "name": "View Items for this As Seen In Category",
		    "url": "/edit/#/asseenin/index/?siteId=<%=App.Colony.currentSiteId%>&asSeenInCategoryId=<%=id%>"
		}, {
		    "icon": "plus",
		    "name": "Add a child As Seen In Category beneath this As Seen In Category",
		    "url": "/edit/#/asseenincategories/add/?parentId=<%=id%>"
		}, {
			"icon": "remove",
			"name": "Delete this As Seen In Category",
			"url": "/edit/#/asseenincategories/delete/?id=<%=id%>"
		}]
	}],
	"data": {
		"execute": [{
		    "name": "asseenincategories",
			"ServiceType": "WalkerGreenbank.Modules.AsSeenIn.Services.IAsSeenInCategoryService, WalkerGreenbank.Modules",
			"ServiceMethod": "GetAll",
			"map": [{
				"Name": "name",
				"AsSeenInCategoryID": "id"
			}]
		}]
	}
}