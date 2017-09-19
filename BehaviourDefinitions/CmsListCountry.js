{
    "behaviourId": "CmsListCountry",
    "messageHandlers": [{
        "Name": "EditCountry",
        "ServiceType": "Colony.Services.Core.Abstract.Countries.ICountryService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }],
    "page": {
        "label": "Country Management"
    },
    "componentContainer": [{
        "label": "",
        "type": "datatable",
        "componentId": "CountryList",
        "dataCollection": "country",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }, {
            "friendlyName": "Region",
            "source": "region"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/countries/edit/?id=<%=id%>",
            "name": "Edit this Country"
        }]
    }],
    "data": {
        "execute": [{
            "name": "country",
            "ServiceType": "Colony.Services.Core.Abstract.Countries.ICountryService, Colony.Services",
            "ServiceMethod": "GetAll"
        }]
    }
}