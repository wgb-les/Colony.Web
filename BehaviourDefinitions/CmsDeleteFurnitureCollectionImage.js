{
    "behaviourId": "CmsDeleteFurnitureCollectionImage",
    "page": {
        "label": "Delete Furniture Collection Image",
        "back": "/furniturecollectionimages/edit/?furnitureCollectionId=<%=App.QueryString['furnitureCollectionId']%>",
        "backdescription": "collection images",
        "messages": [{
            "message": "DeleteImage",
            "behaviourId": "CmsListFurnitureCollection",
            "trigger": "submit",
            "success": "redirect:/furniturecollectionimages/edit/?furnitureCollectionId=<%=App.QueryString['furnitureCollectionId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteFurnitureCollectionImage",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the image <strong><%=App.data.furniturecollectionimage.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Furniture Collection ID",
            "type": "hidden",
            "componentId": "FurnitureCollectionId",
            "map": [{
                "friendlyName": "Value",
                "source": "furniturecollectionimage.furnitureCollectionId"
            }]
        }, {
            "label": "Image Asset ID",
            "type": "hidden",
            "componentId": "ImageAssetId",
            "map": [{
                "friendlyName": "Value",
                "source": "furniturecollectionimage.furnitureCollectionId"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "furniturecollectionimage",
            "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureCollectionService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetImageById",
            "ServiceMethodParams": [{
                "Key": "furnitureCollectionId",
                "Value": 1
            },
            {
                "Key": "imageAssetId",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "BlogID": "id"
            }
        }]
    }
}