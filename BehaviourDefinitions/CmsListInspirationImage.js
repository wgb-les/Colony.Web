{
	"behaviourId": "CmsListInspirationImage",
	"page": {
		"label": "Inspiration Images",
		"back": "#/inspiration/index/",
		"backdescription": "Inspiration"
	},
    "messageHandlers": [{
        "Name": "DeleteImageBatch",
        "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationsService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteImageBatch",
        "ServiceMethodParams": [
           { "Key": "inspirationId", "Value": 0 },
           { "Key": "ids", "Value": 0 }
        ]
    }],
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "FeaturedTabs",
		"actions": [{
		    "icon": "plus",
		    "url": "/inspirationimages/add/?inspirationId=<%=App.QueryString['inspirationId']%>",
		    "name": "Add Inspiration Image"
		}, {
			"icon": "pencil",
			"url": "/inspiration/edit/?id=<%=App.QueryString['inspirationId']%>",
			"name": "Edit Inspiration Details"
		}]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "FeaturedItemList",
		"dataCollection": "inspirationimage",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}, {
			"friendlyName": "Image Type",
			"source": "<%= (type == 1) ? 'Carousel' : 'Gallery'%>"
		}, {
			"friendlyName": "_ImageAssetID",
			"source": "imageAssetID"
		}, {
			"friendlyName": "_InspirationID",
			"source": "inspirationID"
		},
		{
		    "friendlyName": "_Key",
		    "source": "<%='_InspirationID,_ImageAssetID'%>"
		}],
		"actions": [{
		    "icon": "pencil",
		    "name": "Edit this Inspiration Image",
		    "url": "/edit/#/inspirationimages/edit/?inspirationId=<%=obj.attributes._InspirationID%>&imageAssetId=<%=obj.attributes._ImageAssetID%>"
		}, {
			"icon": "remove",
			"name": "Delete this Inspiration Image",
			"url": "/edit/#/inspirationimages/delete/?inspirationId=<%=obj.attributes._InspirationID%>&imageAssetId=<%=obj.attributes._ImageAssetID%>"
		}],
		"batchactions": [{
		    "icon": "remove",
		    "name": "Delete",
		    "messages": [{
		        "message": "DeleteImageBatch",
		        "behaviourId": "CmsListInspirationImage"
		    }]
		}]
	}],
	"data": {
		"execute": [{
			"name": "inspirationimage",
			"ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationsService, WalkerGreenbank.Modules",
			"ServiceMethod": "GetImagesByInspirationId",
			"ServiceMethodParams": [
				{"Key": "inspirationId", "Value": 1 }
			]
		}]
	}
}