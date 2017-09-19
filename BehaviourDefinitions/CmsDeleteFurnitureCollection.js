{
    "behaviourId": "CmsDeleteFurnitureCollection",
    "page": {
        "label": "Delete Furniture Collection",
        "back": "furniturecollections/index/",
        "backdescription": "Furnture Collections",
        "messages": [{
            "message": "DeleteFurnitureCollection",
            "behaviourId": "CmsListFurnitureCollection",
            "trigger": "submit",
            "success": "redirect:/furniturecollections/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the furniture collection <strong><%=App.data.furniturecollection.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "furniturecollection.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "furniturecollection",
            "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureCollectionService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "FurnitureCollectionID": "id"
            }
        }]
    }
}