{
    "behaviourId": "CmsListCustomSearchTerm",
    "messageHandlers": [{
        "Name": "AddCustomSearchTerm",
        "ServiceType": "WalkerGreenbank.Modules.CustomSearch.Services.ICustomSearchTermService, WalkerGreenbank.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "EditCustomSearchTerm",
        "ServiceType": "WalkerGreenbank.Modules.CustomSearch.Services.ICustomSearchTermService, WalkerGreenbank.Modules",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteCustomSearchTerm",
        "ServiceType": "WalkerGreenbank.Modules.CustomSearch.Services.ICustomSearchTermService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            {"Key": "id", "Value": "" }
        ]
    }],
    "page": {
        "label": "Search Terms" 
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "BlogTabs",
        "actions": [{
            "icon": "plus",
            "url": "/searchterms/add/?siteId=<%=App.Colony.currentSiteId%>",
            "name": "Add Search Term"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "CmsUserList",
        "dataCollection": "searchterm",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }],
        "actions": [{
            "icon": "remove",
            "name": "Delete this Search Term",
            "url": "/edit/#/searchterms/delete/?id=<%=id%>"
        }]
    }],
    "data": {
        "execute": [{
            "name": "searchterm",
            "ServiceType": "WalkerGreenbank.Modules.CustomSearch.Services.ICustomSearchTermService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetBySite",
            "ServiceMethodParams": [
                { "Key": "siteId", "Value": 1 }
            ]
        }]
    }
}