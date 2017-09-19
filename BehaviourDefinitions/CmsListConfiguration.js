{
    "behaviourId": "CmsListConfiguration",
    "messageHandlers": [{
        "Name": "EditConfiguration",
        "ServiceType": "Colony.Services.Core.Abstract.CMSConfiguration.IConfigurationService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }],
    "page": {
        "label": "CMS Configuration"
    },
    "componentContainer": [{
        "label": "",
        "type": "datatable",
        "componentId": "AsSeenInList",
        "dataCollection": "configuration",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }, {
            "friendlyName": "Value",
            "source": "<%= (overrideValue != '') ? overrideValue : defaultValue%>"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/configuration/edit/?id=<%=id%>",
            "name": "Edit this Configuration item"
        }]
    }],
    "data": {
        "execute": [{
            "name": "configuration",
            "ServiceType": "Colony.Services.Core.Abstract.CMSConfiguration.IConfigurationService, Colony.Services",
            "ServiceMethod": "GetAll"
        }]
    }
}