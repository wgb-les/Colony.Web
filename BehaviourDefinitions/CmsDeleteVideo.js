{
	"behaviourId": "CmsDeleteVideo",
	"page": {
		"label": "Delete Video",
		"back": "/videos/index/?siteId=<%=App.Colony.currentSiteId%>&videoCategoryId=<%=App.data.video.videoCategoryId || 0%>",
		 "backdescription": "videos",
		 "messages": [{
			 "Message": "DeleteVideo",
			 "BehaviourId": "CmsListVideo",
			 "Trigger": "submit",
			 "success": "redirect:/videos/index/?siteId=<%=App.Colony.currentSiteId%>&videoCategoryId=<%=App.data.video.videoCategoryId || 0%>"
		 }]
	},
	"componentContainer": [
		{
			"label": "",
			"type": "content",
			"componentId": "DeleteBlogContent",
			"map": [{
				"friendlyName": "Value",
				"source": "<p>Are you sure you want to delete the video <strong><%=App.data.video.name%></strong>?  This action cannot be undone.</p>"
			}]
		}, {
			"label": "Page ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "video.id"
			}]
		}, {
			"label": "Delete",
			"type": "button",
			"componentId": "DeleteButton"
		}
	],
	"data": {
		"execute": [{
			"name": "video",
			"ServiceType": "Colony.Modules.Videos.Services.IVideosService, Colony.Modules",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [{
				"Key": "id",
				"Value": 1
			}],
			"map": {
				"Name": "name",
				"BlogID": "id"
			}
		}]
	}
}