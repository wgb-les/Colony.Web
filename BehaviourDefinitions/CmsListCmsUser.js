{
    "behaviourId": "CmsListCmsUser",
    "messageHandlers": [{
        "Name": "AddUser",
        "ServiceType": "Colony.Services.Security.Accounts.ICmsUserAccountService, Colony.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "EditUser",
        "ServiceType": "Colony.Services.Security.Accounts.ICmsUserAccountService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteUser",
        "ServiceType": "Colony.Services.Security.Accounts.ICmsUserAccountService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            {"Key": "id", "Value": "" }
        ]
    }],
    "page": {
        "label": "CMS Users" 
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "CmsUsersTabs",
        "actions": [{
            "icon": "plus",
            "url": "/users/add/",
            "name": "Add CMS User"
        }]
    }, {
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
            "source": "email"
        }],
        "actions": [{
            "icon": "pencil",
            "name": "Edit this CMS User",
            "url": "/edit/#/users/edit/?id=<%=id%>"
        }, {
            "icon": "remove",
            "name": "Delete this CMS User",
            "url": "/edit/#/users/delete/?id=<%=id%>"
        }]
    }],
    "data": {
        "execute": [{
            "name": "Cmsuser",
            "ServiceType": "Colony.Services.Security.Accounts.IUserAccountService, Colony.Services",
            "ServiceMethod": "GetAll",
            "ServiceMethodParams": [{
                "Key": "tenant",
                "Value": "ColonyCMSBackend"
            }],
            "map": [{
                "Name": "name",
                "PageID": "id"
            }]
        }]
    }
}