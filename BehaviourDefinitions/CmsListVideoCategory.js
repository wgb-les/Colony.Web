{
	"behaviourId": "CmsListVideoCategory",
	"messageHandlers": [{
	    "Name": "EditVideoCategory",
		"ServiceType": "Colony.Modules.Videos.Services.IVideoCategoriesService, Colony.Modules",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "AddVideoCategory",
		"ServiceType": "Colony.Modules.Videos.Services.IVideoCategoriesService, Colony.Modules",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "DeleteVideoCategory",
		"ServiceType": "Colony.Modules.Videos.Services.IVideoCategoriesService, Colony.Modules",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
	    "Name": "ListVideoCategory",
	    "ServiceType": "Colony.Modules.Videos.Services.IVideoCategoriesService, Colony.Modules",
	    "ServiceMethod": "GetAll"
	}],
	"page": {
		"label": "Video Categories"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "VideoTabs",
		"actions": [{
			"icon": "plus",
			"url": "/videocategories/add/",
			"name": "Add Video Category"
		}, {
		    "icon": "align-justify",
		    "url": "/videos/index/?siteId=<%=App.Colony.currentSiteId%>&videoCategoryId=0",
		    "name": "List Root Level Videos"
		}]
	}, {
		"label": "",
		"type": "treeview",
		"componentId": "VideoList",
		"dataCollection": "videocategories",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/videocategories/edit/?id=<%=id%>",
			"name": "Edit this Video Category"
		}, {
		    "icon": "align-justify",
		    "name": "View Videos for this Video Category",
		    "url": "/edit/#/videos/index/?siteId=<%=App.Colony.currentSiteId%>&videoCategoryId=<%=id%>"
		}, {
		    "icon": "plus",
		    "name": "Add a child Video Category beneath this Video Category",
		    "url": "/edit/#/videocategories/add/?parentId=<%=id%>"
		}, {
			"icon": "remove",
			"name": "Delete this Video Category",
			"url": "/edit/#/videocategories/delete/?id=<%=id%>"
		}]
	}],
	"data": {
		"execute": [{
			"name": "videocategories",
			"ServiceType": "Colony.Modules.Videos.Services.IVideoCategoriesService, Colony.Modules",
			"ServiceMethod": "GetAll",
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}