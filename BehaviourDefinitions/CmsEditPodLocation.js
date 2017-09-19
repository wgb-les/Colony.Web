{
	"behaviourId": "CmsEditPodLocation",
	"page": {
		"label": "Edit Pod Location",
		"back": "#/podlocations/index/",
		"backdescription": "Pod Locations",
		"messages": [{
			"message": "EditPodLocation",
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
				},
                {
                    "label": "Pod Location ID",
                    "type": "hidden",
                    "componentId": "Id",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "podlocation.id"
                    }]
                }
			]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
    "data": {
        "execute": [
            {
                "name": "podlocation",
                "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodLocationService, Colony.Services",
                "ServiceMethod": "GetById",
                "ServiceMethodParams": [{
                    "Key": "id",
                    "Value": 1
                }]
            }
        ]
    }
}