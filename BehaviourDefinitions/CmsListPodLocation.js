{
    "behaviourId": "CmsListPodLocation",
    "messageHandlers": [{
        "Name": "EditPodLocation",
        "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodLocationService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddPodLocation",
        "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodLocationService, Colony.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeletePodLocation",
        "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodLocationService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }],
    "page": {
        "label": "Pod Locations"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "PodTabs",
        "actions": [{
            "icon": "plus-sign",
            "url": "#/podlocations/add/",
            "name": "Add Pod Location"
        }, {
            "icon": "list",
            "url": "#/pods/index/",
            "name": "Manage Pods"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "PodList",
        "dataCollection": "podlocation",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/podlocations/edit/?id=<%=id%>",
            "name": "Edit Pod Location"
        }, {
            "icon": "remove",
            "name": "Delete this Pod Location",
            "url": "/edit/#/podlocations/delete/?id=<%=id%>"
        }]
    }],
    "data": {
        "execute": [{
            "name": "podlocation",
            "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodLocationService, Colony.Services",
            "ServiceMethod": "GetAll"
        }]
    }
}