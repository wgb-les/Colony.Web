{
	"behaviourId": "CmsAddPodLocation",
	"page": {
		"label": "Add Pod Location",
		"back": "#/podlocations/index/",
		"backdescription": "Pod Locations",
		"messages": [{
			"message": "AddPodLocation",
			"behaviourId": "CmsListPodLocation",
			"trigger": "submit",
			"success": "redirect:/podlocations/index/"
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
					"label": "Title",
					"type": "text",
					"componentId": "Name",
					"map": [{
						"friendlyName": "Value",
						"source": "podlocation.name"
					}],
					"validation": {
					    "required": true,
					    "maxlength": 255
					}
				}
			]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}]
}