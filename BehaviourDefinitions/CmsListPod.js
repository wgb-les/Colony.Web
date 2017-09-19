{
    "behaviourId": "CmsListPod",
    "messageHandlers": [{
        "Name": "EditPod",
        "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddPod",
        "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodService, Colony.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeletePod",
        "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }, {
        "Name": "SearchPod",
        "ReturnName": "pod",
        "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodService, Colony.Services",
        "ServiceMethod": "CmsSearch",
        "ServiceMethodParams": [
			{"Key": "searchCriteria", "Value": "", "IsDynamic": true }
        ]
    }],
    "page": {
        "label": "Pods"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "PodTabs",
        "actions": [{
            "icon": "plus-sign",
            "url": "#/pods/add/",
            "name": "Add Pod"
        }, {
            "icon": "list",
            "url": "#/podlocations/index/",
            "name": "Manage Pod Locations"
        }]
    }, {
        "label": "Search",
        "type": "searchform",
        "components": [
			{
			    "label": "keywords",
			    "type": "fieldset",
			    "componentId": "keywordsFieldset",
			    "className": "half",
			    "components": [
					{
					    "label": "Enter keywords",
					    "componentId": "Keywords",
					    "type": "text",
					    "map": [
								{"friendlyName": "value", "source": "cache.keywords" }
					    ]
					},
                    {
                        "label": "URL to test",
                        "componentId": "URIMatch",
                        "type": "text",
                        "helptext": "e.g. /page-1/page-2/detail/",
                        "map": [
								{"friendlyName": "value", "source": "cache.urimatch" }
                        ]
                    },
                    {
                        "label": "Filter by Pod Location",
                        "componentId": "PodLocationID",
                        "type": "dropdown",
                        "dataCollection": "podlocation"
                    }
			    ]
			}
        ],
        "messages": [
			{
			    "message": "SearchPod",
			    "behaviourId": "CmsListPod",
			    "Trigger": "submitSearch"
			}
        ]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "PodList",
        "dataCollection": "pod",
        "map": [{
            "friendlyName": "Pod Type",
            "source": "<% switch(obj.podTypeId) { case 1: print('HTML'); break; case 2: print('Image'); break; case 3: print('Dynamic'); break; } %>"
        }, {
            "friendlyName": "Name",
            "source": "name"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/pods/edit<%=obj.get('Pod Type').toLowerCase()%>pod/?id=<%=id%>",
            "name": "Edit Pod"
        }, {
            "icon": "th",
            "url": "/edit/#/podplacements/index/?id=<%=id%>",
            "name": "Edit Pod Placements for this Pod"
        }, {
            "icon": "remove",
            "name": "Delete this Pod",
            "url": "/edit/#/pods/delete/?id=<%=id%>"
        }]
    }],
    "data": {
        "execute": [{
            "name": "pod",
            "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodService, Colony.Services",
            "ServiceMethod": "GetAll"
        }, {
            "name": "podlocation",
            "ServiceType": "Colony.Services.Core.Abstract.Pods.IPodLocationService, Colony.Services",
            "ServiceMethod": "GetAll"
        }]
    }
}