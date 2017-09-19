{
    "behaviourId": "CmsListInspirationCategory",
    "messageHandlers": [{
        "Name": "EditInspirationCategory",
        "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationCategoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddInspirationCategory",
        "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationCategoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteInspirationCategory",
        "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationCategoriesService, WalkerGreenbank.Modules",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }],
    "page": {
        "label": "Inspiration Categories",
        "back": "#/inspiration/index/?siteId=<%=App.QueryString['siteId']%>",
		"backdescription": "Inspirations"
    },
    "componentContainer": [{
        "label": "",
        "type": "datatable",
        "componentId": "InspirationCategoryList",
        "dataCollection": "inspirationcategories",
        "map": [{
            "friendlyName": "Name",
            "source": "title"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/inspirationcategories/edit/?id=<%=id%>&siteId=<%=App.Colony.currentSiteId%>",
            "name": "Edit this Inspiration Category"
        }]
    }],
    "data": {
        "execute": [{
            "name": "inspirationcategories",
            "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationCategoriesService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetForCms",
            "ServiceMethodParams": [
                {"Key": "siteId", "Value": 0 }
            ]
        }]
    }
}