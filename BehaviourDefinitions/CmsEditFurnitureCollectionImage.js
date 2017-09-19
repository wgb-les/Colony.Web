{
    "behaviourId": "CmsEditFurnitureCollectionImage",
    "page": {
        "label": "Add Furniture Collection Images",
        "back": "#/furniturecollections/index/?siteId=<%=App.Colony.currentSiteId%>&furnitureCollectionId=<%=App.QueryString['furnitureCollectionId']%>",
        "backdescription": "furniture collection",
        "messages": [{
            "message": "AddImage",
            "behaviourId": "CmsListFurnitureCollection",
            "trigger": "submit",
            "success": "redirect:/furniturecollectionimages/edit/?siteId=<%=App.Colony.currentSiteId%>&furnitureCollectionId=<%=App.QueryString['furnitureCollectionId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "fieldset",
            "componentId": "BasicDetailsFieldset",
            "components": [
                {
                    "label": "Image",
                    "type": "imagelibrary",
                    "componentId": "ImageAssetID",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "furniturecollectionimage.imageAssetId"
                    }]
                }
            ]
        },
        {
            "label": "Furniture Collection Id",
            "type": "hidden",
            "componentId": "FurnitureCollectionId",
            "map": [{
                "friendlyName": "Value",
                "source": "querystring.furnitureCollectionId"
            }]
        }, {
            "label": "Type",
            "type": "hidden",
            "componentId": "Type",
            "map": [{
                "friendlyName": "Value",
                "source": "furniturecollectionimage.type",
                "default": "1"
            }]
        }, {
            "label": "Order",
            "type": "hidden",
            "componentId": "Order",
            "map": [{
                "friendlyName": "Value",
                "source": "furniturecollectionimage.order"
            }]
        }, {
            "label": "Save",
            "type": "button",
            "componentId": "SaveButton"
        },
        {
            "label": "",
            "type": "datatable",
            "dataCollection": "furniturecollectionimages",
            "map": [{
                "friendlyName": "Name",
                "source": "name"
            },
            {
                "friendlyName": "_ImageAssetID",
                "source": "imageAssetID"
            }],
            "actions": [
            {
                "icon": "remove",
                "name": "Delete this Furniture collection image",
                "url": "/edit/#/furniturecollectionimages/delete/?siteId=<%=App.Colony.currentSiteId%>&imageAssetId=<%=obj.attributes._ImageAssetID%>&furnitureCollectionId=<%=App.QueryString.furnitureCollectionId%>"
            }]
        }],
    "data": {
        "execute": [{
            "name": "Languages",
            "ServiceType": "Colony.Services.Core.Abstract.Language.ILanguageService, Colony.Services",
            "ServiceMethod": "GetAll"
        }, {
            "name": "Sites",
            "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
            "ServiceMethod": "GetAll"
        },
        {
            "name": "furniturecollectionimages",
            "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureCollectionService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetImagesById",
            "ServiceMethodParams": [
                { "Key": "furniturecollectionid", "Value": 1 }
            ],
            "map": {
                "Name": "name",
                "funiturecollectionId": "id"
            }
    }]
    }
}