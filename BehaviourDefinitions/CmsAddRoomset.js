{
	"behaviourId": "CmsAddRoomset",
	"page": {
		"label": "Add Roomset - Step 1 - Select an image",
		"messages": [{
			"message": "AddRoomset",
			"behaviourId": "CmsListRoomset",
			"trigger": "submit",
			"success": "redirect:/roomsets/edit/?id=<%=data.data.addRoomset.id%>"
		}]
	},
	"componentContainer": [
		{
			"label": "Name",
			"type": "text",
			"componentId": "Name",
			"map": [{
				"friendlyName": "Value",
				"source": "roomset.name"
			}],
			"validation": {
				"required": true,
				"maxlength": 255
			}
		}, {
			"label": "Select an image",
			"type": "imagelibrary",
			"componentId": "ImageAssetId",
			"map": [{
				"friendlyName": "Value",
				"source": "roomset.imageAssetId"
			}],
			"validation": {
				"required": true,
				"maxlength": 255
			}
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}

	]
}