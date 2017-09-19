{
    "behaviourId": "CmsDeletePod",
    "page": {
        "label": "Delete Article",
        "back": "pods/index/",
        "backdescription": "Pods",
        "messages": [{
            "message": "DeletePod",
            "behaviourId": "CmsListPod",
            "trigger": "submit",
            "success": "redirect:/pods/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeletePodContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the pod <strong><%=App.data.pod.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Pod ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "pod.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "pod",
            "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodService, Colony.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }]
        }]
    }
}