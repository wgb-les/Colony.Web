{
	"behaviourId": "CmsAddPodPlacement",
	"page": {
		"label": "Add Pod Placement",
		"back": "#/podplacements/index/?id=<%=App.QueryString['podId']%>",
		"backdescription": "Pod Placements",
		"messages": [{
			"message": "AddPodPlacement",
			"behaviourId": "CmsListPodPlacement",
			"trigger": "submit",
			"success": "redirect:/podplacements/index/?id=<%=App.QueryString['podId']%>"
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
					"label": "Location",
					"type": "dropdown",
					"componentId": "PodLocationId",
                    "dataCollection": "podlocation",
					"map": [{
						"friendlyName": "Value",
						"source": "podplacement.podLocationId"
					}],
					"validation": {
					    "required": true
					}
				}
			]
		}, {
		    "label": "",
		    "type": "fieldset",
		    "componentId": "UriFieldset",
		    "className": "half",
		    "components": [
				{
				    "label": "URLs",
				    "type": "freetextlist",
				    "componentId": "Uris",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "podplacement.uris"
				    }],
				    "validation": {
				        "required": true
				    }
				}
		    ]
		}, {
		    "label": "PodId",
		    "type": "hidden",
		    "componentId": "PodId",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "querystring.podId"
		    }]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
    "data": {
        "execute": [{
            "name": "podlocation",
            "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodLocationService, Colony.Services",
            "ServiceMethod": "GetAll"
        }]
    }
}