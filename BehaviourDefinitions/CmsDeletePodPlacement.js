{
    "behaviourId": "CmsDeletePodPlacement",
    "page": {
        "label": "Delete Pod Placement",
        "back": "podplacements/index/?id=<%=App.data.podplacement.podId%>",
        "backdescription": "Pod Placements",
        "messages": [{
            "message": "DeletePodPlacement",
            "behaviourId": "CmsListPodPlacement",
            "trigger": "submit",
            "success": "redirect:/podplacements/index/?id=<%=App.data.podplacement.podId%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeletePodContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the pod placement for <strong><%= _.where(App.data.podlocation, {id: App.data.podplacement.podLocationId})[0].name %></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Pod ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "podplacement.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "podplacement",
            "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodPlacementService, Colony.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }]
        }, {
                "name": "podlocation",
                "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodLocationService, Colony.Services",
                "ServiceMethod": "GetAll"
            }
        ]
    }
}