{
	"behaviourId": "CmsDeleteImageDownloadRequest",
	"page": {
		"label": "Delete Press Image Download Request",
		"back": "/pressimagedownloads/index/",
		 "backdescription": "Press Image Download Requests",
		 "messages": [{
			 "Message": "DeleteRequest",
			 "BehaviourId": "CmsListImageDownloadRequest",
			 "Trigger": "submit",
			 "success": "redirect:/pressimagedownloads/index/"
		 }]
	},
	"componentContainer": [
		{
			"label": "",
			"type": "content",
			"componentId": "DeleteBlogContent",
			"map": [{
				"friendlyName": "Value",
				"source": "<p>Are you sure you want to delete the request <strong><%=App.data.imagedownloadrequest.validityToken%></strong>?  This action cannot be undone.</p>"
			}]
		}, {
			"label": "Page ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "imagedownloadrequest.id"
			}]
		}, {
			"label": "Delete",
			"type": "button",
			"componentId": "DeleteButton"
		}
	],
	"data": {
		"execute": [{
		    "name": "imagedownloadrequest",
		    "ServiceType": "WalkerGreenbank.Modules.PressMembers.Areas.ImageDownloadService.Services.IDownloadRequestService, WalkerGreenbank.Modules",
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