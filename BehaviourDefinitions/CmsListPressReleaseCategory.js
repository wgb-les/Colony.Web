{
	"behaviourId": "CmsListPressReleaseCategory",
	"messageHandlers": [{
	    "Name": "EditPressReleaseCategory",
		"ServiceType": "Colony.Modules.PressReleases.Services.IPressReleaseCategoriesService, Colony.Modules",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "AddPressReleaseCategory",
		"ServiceType": "Colony.Modules.PressReleases.Services.IPressReleaseCategoriesService, Colony.Modules",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "DeletePressReleaseCategory",
		"ServiceType": "Colony.Modules.PressReleases.Services.IPressReleaseCategoriesService, Colony.Modules",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
	    "Name": "ListPressReleaseCategory",
	    "ServiceType": "Colony.Modules.PressReleases.Services.IPressReleaseCategoriesService, Colony.Modules",
	    "ServiceMethod": "GetAll"
	}],
	"page": {
		"label": "Press Release Categories"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "PressReleaseTabs",
		"actions": [{
			"icon": "plus",
			"url": "/pressreleasecategories/add/",
			"name": "Add Press Release Category"
		}, {
		    "icon": "align-justify",
		    "url": "/pressreleases/index/?siteId=<%=App.Colony.currentSiteId%>&pressReleaseCategoryId=0",
		    "name": "List Root Level Press Releases"
		}]
	}, {
		"label": "",
		"type": "treeview",
		"componentId": "PressReleaseList",
		"dataCollection": "pressreleasecategories",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/pressreleasecategories/edit/?id=<%=id%>",
			"name": "Edit this Press Release Category"
		}, {
		    "icon": "align-justify",
		    "name": "View Press Releases for this Press Release Category",
		    "url": "/edit/#/pressreleases/index/?siteId=<%=App.Colony.currentSiteId%>&pressReleaseCategoryId=<%=id%>"
		}, {
		    "icon": "plus",
		    "name": "Add a child Press Release Category beneath this Press Release Category",
		    "url": "/edit/#/pressreleasecategories/add/?parentId=<%=id%>"
		}, {
			"icon": "remove",
			"name": "Delete this Press Release Category",
			"url": "/edit/#/pressreleasecategories/delete/?id=<%=id%>"
		}]
	}],
	"data": {
		"execute": [{
			"name": "pressreleasecategories",
			"ServiceType": "Colony.Modules.PressReleases.Services.IPressReleaseCategoriesService, Colony.Modules",
			"ServiceMethod": "GetAll",
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}