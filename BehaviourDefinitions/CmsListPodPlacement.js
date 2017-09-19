{
    "behaviourId": "CmsListPodPlacement",
    "messageHandlers": [{
        "Name": "EditPodPlacement",
        "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodPlacementService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddPodPlacement",
        "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodPlacementService, Colony.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeletePodPlacement",
        "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodPlacementService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }],
    "page": {
        "label": "Pod Placements",
        "back": "#/pods/index/",
		"backdescription": "pods"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "PodTabs",
        "actions": [{
            "icon": "plus-sign",
            "url": "#/podplacements/add/?podId=<%=App.QueryString['id']%>",
            "name": "Add Pod Placement"
        }, {
            "icon": "pencil",
            "url": "#/pods/edit<% switch(App.data.pod.podTypeId) { case 1: print('html'); break; case 2: print('image'); break; case 3: print('dynamic'); break; } %>pod/?id=<%=App.QueryString['id']%>",
            "name": "Edit Pod Details"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "PodList",
        "dataCollection": "podplacement",
        "map": [{
            "friendlyName": "Location",
            "source": "<%= _.where(App.data.podlocation, { id: podLocationId })[0].name %>"
        }, {
            "friendlyName": "URIs",
            "source": "<%= _.map(podPlacementUris, function(itm) { return itm.uri }).join(',') %>"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/podplacements/edit/?id=<%=id%>",
            "name": "Edit Pod Placement"
        }, {
            "icon": "remove",
            "name": "Delete this Pod Placement",
            "url": "/edit/#/podplacements/delete/?id=<%=id%>"
        }]
    }],
    "data": {
        "execute": [{
            "name": "podplacement",
            "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodPlacementService, Colony.Services",
            "ServiceMethod": "GetForPod",
            "ServiceMethodParams": [
                {"Key": "id", "Value": 1 }
            ]
        }, {
            "name": "pod",
            "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodService, Colony.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }]
        }, {
            "name": "podlocation",
            "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodLocationService, Colony.Services",
            "ServiceMethod": "GetAll"
        }]
    }
}