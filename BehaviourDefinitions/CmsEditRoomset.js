{
	"behaviourId": "CmsEditRoomset",
	"page": {
		"label": "Add Roomset - Step 2 - Assign hotspots to your image",
		"messages": [{
			"message": "EditRoomset",
			"behaviourId": "CmsListRoomset",
			"trigger": "submit",
			"success": "redirect:/roomsets/index/"
		}]
	},
	"componentContainer": [
		{
			"label": "",
			"type": "imagehotspot",
			"componentId": "Hotspot",
			"map": [
				{
					"friendlyName": "Value",
					"source": "roomset.imageAssetId"
				}
			]
		}
	],
	"data": {
		"execute": [{
			"name": "roomset",
			"ServiceType": "WalkerGreenbank.Modules.Hotspots.Services.IRoomsetService, WalkerGreenbank.Modules",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [{
				"Key": "id",
				"Value": 1
			}]
		}]
	}
}
