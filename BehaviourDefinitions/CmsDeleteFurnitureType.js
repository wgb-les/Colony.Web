{
    "behaviourId": "CmsDeleteFurnitureType",
    "page": {
        "label": "Delete Furniture Type",
        "back": "furnituretypes/index/?siteId=<%=App.Colony.currentSiteId%>&furnitureCollectionId=<%=App.data.furnituretype.furnitureCollectionID%>",
        "backdescription": "Furniture Types",
        "messages": [{
            "message": "DeleteFurnitureType",
            "behaviourId": "CmsListFurnitureType",
            "trigger": "submit",
            "success": "redirect:/furnituretypes/index/?siteId=<%=App.Colony.currentSiteId%>&furnitureCollectionId=<%=App.data.furnituretype.furnitureCollectionID%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteFurnitureTypeContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the furniture type <strong><%=App.data.furnituretype.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "furnituretype.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "furnituretype",
            "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureTypeService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "FurnitureTypeID": "id"
            }
        }]
    }
}