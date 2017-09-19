{
    "behaviourId": "CmsDeleteFeatured",
    "page": {
        "label": "Delete Featured Item",
        "back": "featured/index/",
        "backdescription": "Site Structure",
        "messages": [{
            "message": "DeleteFeatured",
            "behaviourId": "CmsListFeatured",
            "trigger": "submit",
            "success": "redirect:/featured/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteFeaturedContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the featured item <strong><%=App.data.featured.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "featured.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "blog",
            "ServiceType": "WalkerGreenbank.Modules.Featured.Services.IFeaturedItemService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "FeaturedItemID": "id"
            }
        }]
    }
}