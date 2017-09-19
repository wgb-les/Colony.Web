{
    "behaviourId": "CmsListAddress",
    "messageHandlers": [{
        "Name": "AddAddress",
        "ServiceType": "Colony.Services.Core.Abstract.CRM.IAddressService, Colony.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "EditAddress",
        "ServiceType": "Colony.Services.Core.Abstract.CRM.IAddressService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteAddress",
        "ServiceType": "Colony.Services.Core.Abstract.CRM.IAddressService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            {"Key": "id", "Value": "" }
        ]
    }],
    "page": {
        "label": "Addresses" 
    },
    "componentContainer": [{
        "label": "",
        "type": "datatable",
        "componentId": "CmsUserList",
        "dataCollection": "cmsuser",
        "map": [{
            "friendlyName": "Last Name",
            "source": "lastName"
        }, {
            "friendlyName": "First Name",
            "source": "firstName"
        }, {
            "friendlyName": "Email",
            "source": "emailAddress"
        }],
        "actions": [{
            "icon": "pencil",
            "name": "Edit this Person",
            "url": "/edit/#/crm/edit/?id=<%=id%>"
        }, {
            "icon": "envelope",
            "name": "View this Person's Addresses",
            "url": "/edit/#/crm/edit/?id=<%=id%>"
        }, {
            "icon": "phone",
            "name": "View this Person's Telephone Numbers",
            "url": "/edit/#/crm/edit/?id=<%=id%>"
        }, {
            "icon": "remove",
            "name": "Delete this Person",
            "url": "/edit/#/crm/delete/?id=<%=id%>"
        }]
    }],
    "data": {
        "execute": [{
            "name": "Cmsuser",
            "ServiceType": "Colony.Services.Core.Abstract.CRM.IAddressService, Colony.Services",
            "ServiceMethod": "GetAddressesByPersonId",
            "ServiceMethodParams": [
                {"Key": "personId", "Value": 0 }
            ]
        }]
    }
}