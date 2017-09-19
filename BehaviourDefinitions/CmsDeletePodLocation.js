{
    "behaviourId": "CmsDeletePodLocation",
    "page": {
        "label": "Delete Pod Location",
        "back": "podlocations/index/",
        "backdescription": "Pod Locations",
        "messages": [{
            "message": "DeletePodLocation",
            "behaviourId": "CmsListPodLocation",
            "trigger": "submit",
            "success": "redirect:/podlocations/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteArticleContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the pod location <strong><%=App.data.podlocation.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Article ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "podlocation.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "podlocation",
            "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodLocationService, Colony.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }]
        }]
    }
}