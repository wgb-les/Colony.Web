{
    "behaviourId": "CmsDeleteInspirationImage",
    "page": {
        "label": "Delete Inspiration Image",
        "back": "#/inspirationimages/index/?inspirationId=<%=App.data.inspirationimage['inspirationID']%>",
		"backdescription": "Inspiration Images",
		"messages": [{
		    "message": "DeleteInspirationImage",
		    "behaviourId": "CmsListInspiration",
		    "trigger": "submit",
		    "success": "redirect:/inspirationimages/index/?inspirationId=<%=App.data.inspirationimage['inspirationID']%>"
		}]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteInspirationContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the inspiration image <strong><%=App.data.inspirationimage.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "InspirationID",
            "map": [{
                "friendlyName": "Value",
                "source": "inspirationimage.inspirationID"
            }]
        }, {
            "label": "Image ID",
            "type": "hidden",
            "componentId": "ImageAssetID",
            "map": [{
                "friendlyName": "Value",
                "source": "inspirationimage.imageAssetID"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "Inspirationimage",
            "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationsService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetImageById",
            "ServiceMethodParams": [
				{ "Key": "inspirationId", "Value": 1 },
                { "Key": "imageAssetId", "Value": 1 }
            ]
        }]
    }
}