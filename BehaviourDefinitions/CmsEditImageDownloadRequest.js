{
	"behaviourId": "CmsEditImageDownloadRequest",
		"page": {
			"label": "View Press Image Download Request",
			"back": "#/pressimagedownloads/index/",
			"backdescription": "Press Image Download Requests",
			"messages": [{
				"message": "ApproveRequest",
				"behaviourId": "CmsListImageDownloadRequest",
				"trigger": "submit",
				"success": "redirect:/pressimagedownloads/index/"
			},{
			    "message": "ApproveRequestWithGuidelines",
			    "behaviourId": "CmsListImageDownloadRequest",
			    "trigger": "ApproveWithGuidelinesButton",
			    "success": "redirect:/pressimagedownloads/index/"
			},
			{
				"message": "RejectRequest",
				"behaviourId": "CmsListImageDownloadRequest",
				"trigger": "RejectButton",
				"success": "redirect:/pressimagedownloads/index/"
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
					"label": "Usage",
					"type": "display",
					"componentId": "Usage",
					"map": [{
						"friendlyName": "Value",
						"source": "imagedownloadrequest.usage"
					}]
				}, {
					"label": "Publication Name",
					"type": "display",
					"componentId": "PublicationName",
					"map": [{
						"friendlyName": "Value",
						"source": "imagedownloadrequest.publicationName"
					}]
				}, {
					"label": "Captions/Prices Requested",
					"type": "display",
					"componentId": "RequestCaptionsAndPrices",
					"map": [{
						"friendlyName": "Value",
						"source": "imagedownloadrequest.requestCaptionsAndPrices"
					}]
				}, {
					"label": "Publication Date",
					"type": "display",
					"componentId": "PublicationDate",
					"map": [{
						"friendlyName": "Value",
						"source": "imagedownloadrequest.publicationDate"
					}]
				}, {
					"label": "Reason",
					"type": "content",
					"componentId": "Reason",
					"map": [{
						"friendlyName": "Value",
						"source": "<p style='font-weight: bold; color: #000;'>Reason</p><p><%=App.data.imagedownloadrequest.reason%></p>"
					}]
				}
			]
		}, {
			"label": "",
			"type": "fieldset",
			"componentId": "ImageDetailsFieldset",
			"className": "half",
			"components": [
				{
					"label": "",
					"type": "datatable",
					"componentId": "ImagesTable",
					"dataCollection": "image",
					"map": [{
						"friendlyName": "Thumbnail",
						"source": "<img style='height: 100px' src='http://69445235844b78bbd4c8-40765e7850b487e7db6d0b1ca2adcee0.r24.cf3.rackcdn.com/<%=image.lowResSpoiler%>'/>"
					}, {
						"friendlyName": "Resolution",
						"source": "resolution"
					}, {
						"friendlyName": "id",
						"source": "imageId"
					}]
				}
			]
		}, {
			"label": "ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "imagedownloadrequest.id"
			}]
		}, {
			"label": "",
			"type": "buttoncontainer",
			"componentId": "buttoncontainer",
			"components": [
				{
					"label": "Approve this request",
					"type": "button",
					"componentId": "ApproveButton"
				}, {
				    "label": "Approve this request with brand guidelines",
				    "type": "button",
				    "componentId": "ApproveWithGuidelinesButton"
				}, {
					"label": "Reject this request",
					"type": "button",
					"componentId": "RejectButton"
				}
			]
		}],
	"data": {
		"execute": [{
			"name": "imagedownloadrequest",
			"ServiceType": "WalkerGreenbank.Modules.PressMembers.Areas.ImageDownloadService.Services.IDownloadRequestService, WalkerGreenbank.Modules",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [
				{"Key": "id", "Value": 1 }
			]
		}, {
			"name": "image",
			"ServiceType": "WalkerGreenbank.Modules.PressMembers.Areas.ImageDownloadService.Services.IDownloadRequestService, WalkerGreenbank.Modules",
			"ServiceMethod": "GetImagesByRequestId",
			"ServiceMethodParams": [
				{"Key": "id", "Value": 1 }
			]
		}]
	}
}