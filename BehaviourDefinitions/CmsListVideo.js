{
	"behaviourId": "CmsListVideo",
	"messageHandlers": [{
		"Name": "EditVideo",
		"ServiceType": "Colony.Modules.Videos.Services.IVideosService, Colony.Modules",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "AddVideo",
		"ServiceType": "Colony.Modules.Videos.Services.IVideosService, Colony.Modules",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "DeleteVideo",
		"ServiceType": "Colony.Modules.Videos.Services.IVideosService, Colony.Modules",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}],
	"page": {
		"label": "Videos",
		"back": "/videocategories/index/",
		"backdescription": "Video Categories"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "VideoTabs",
		"actions": [{
			"icon": "plus",
			"url": "/videos/add/?siteId=<%=App.Colony.currentSiteId%>&videoCategoryId=<%=App.QueryString['videoCategoryId']%>",
			"name": "Add Video"
		}]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "VideoList",
		"dataCollection": "video",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/videos/edit/?id=<%=id%>",
			"name": "Edit this Video"
		}, {
			"icon": "remove",
			"name": "Delete this Video",
			"url": "/edit/#/videos/delete/?id=<%=id%>"
		},
		{
		    "id": "videoIds",
		    "type": "checkbox"
		}],
		"multiactions": [{
		    "icon": "remove",
		    "name": "Delete videos",
		    "messageHandler": "DeleteVideo",
		    "confirmMessage" : "Are you sure you want to delete these videos?",
		    "checkId": "videoIds",
            "behaviourId": "CmsListVideo"
		}]
	}],
	"data": {
		"execute": [{
			"name": "video",
			"ServiceType": "Colony.Modules.Videos.Services.IVideosService, Colony.Modules",
			"ServiceMethod": "GetForCms",
			"ServiceMethodParams": [
				{"Key": "siteId", "Value": "<%=App.Colony.currentSiteId%>" },
				{"Key": "videoCategoryId", "Value": "<%=App.QueryString['videoCategoryId']%>" }
				
			],
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}