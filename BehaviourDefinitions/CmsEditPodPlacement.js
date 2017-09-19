{
    "behaviourId": "CmsEditPodPlacement",
	"page": {
		"label": "Edit Pod Placement",
		"back": "#/podplacements/index/?podId=<%=App.data.podplacement['podId']%>",
		"backdescription": "Pod Placements",
		"messages": [{
			"message": "EditPodPlacement",
			"behaviourId": "CmsListPodPlacement",
			"trigger": "submit",
			"success": "redirect:/podplacements/index/?podId=<%=App.data.podplacement['podId']%>"
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
				    "label": "URIs",
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
		    "label": "Id",
		    "type": "hidden",
		    "componentId": "Id",
		    "map": [{
		        "friendlyName": "Value",
                "source": "podplacement.id"
		    }]
		}, {
		    "label": "PodId",
		    "type": "hidden",
		    "componentId": "PodId",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "podplacement.podId"
		    }]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
    "data": {
        "execute": [{
            "name": "podplacement",
            "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodPlacementService, Colony.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [
                { "Key": "Id", "Value": 1 }
            ]
        }, {
            "name": "podlocation",
            "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodLocationService, Colony.Services",
            "ServiceMethod": "GetAll"
        }]
    }
}