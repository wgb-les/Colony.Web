{
    "behaviourId": "CmsAddFurnitureType",
    "page": {
        "label": "Add Furniture Type",
        "back": "#/furnituretypes/index/?siteId=<%=App.Colony.currentSiteId%>&furntiureCollectionId=<%=App.QueryString['furntiureCollectionId']%>",
        "backdescription": "types",
        "messages": [{
            "message": "AddFurnitureType",
            "behaviourId": "CmsListFurnitureType",
            "trigger": "submit",
            "success": "redirect:/furnituretypes/index/?siteId=<%=App.Colony.currentSiteId%>&furnitureCollectionId=<%=App.QueryString['furnitureCollectionId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "fieldset",
            "componentId": "BasicDetailsFieldset",
            "className": "half",
            "components": [
                {
                    "label": "Title",
                    "type": "text",
                    "componentId": "Name",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "furnituretype.name"
                    }],
                    "validation": {
                        "required": true,
                        "maxlength": 255
                    }
                }, {
                    "label": "Image",
                    "type": "imagelibrary",
                    "componentId": "ImageAssetID",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "furnituretype.imageAssetId"
                    }]
                }
            ]
        },
        {
            "label": "",
            "type": "fieldset",
            "componentId": "BasicDetailsFieldset2",
            "className": "half",
            "components": [{
                "label": "Height",
                "type": "text",
                "componentId": "Height",
                "map": [{
                    "friendlyName": "Value",
                    "source": "furnituretype.height"
                }],
                "validation": {
                    "required": true,
                    "numeric": true,
                    "maxlength": 50
                }
            }, {
                "label": "Width",
                "type": "text",
                "componentId": "Width",
                "map": [{
                    "friendlyName": "Value",
                    "source": "furnituretype.width"
                }],
                "validation": {
                    "required": true,
                    "numeric": true,
                    "maxlength": 50
                }
            }, {
                "label": "Depth",
                "type": "text",
                "componentId": "Depth",
                "map": [{
                    "friendlyName": "Value",
                    "source": "furnituretype.depth"
                }],
                "validation": {
                    "required": true,
                    "numeric": true,
                    "maxlength": 50
                }
            }, {
                "label": "Length",
                "type": "text",
                "componentId": "Length",
                "map": [{
                    "friendlyName": "Value",
                    "source": "furnituretype.length"
                }],
                "validation": {
                    "required": true,
                    "numeric": true,
                    "maxlength": 50
                }
            }, {
                "label": "Weight",
                "type": "text",
                "componentId": "Weight",
                "map": [{
                    "friendlyName": "Value",
                    "source": "furnituretype.weight"
                }],
                "validation": {
                    "required": true,
                    "numeric": true,
                    "maxlength": 50
                }
            },
            {
                "label": "Category",
                "type": "dropdown",
                "componentId": "Category",
                "items": [
                    {"id": "Sofas", "name": "Sofas" },
                    {"id": "Chairs", "name": "Chairs" },
                    {"id": "Stools", "name": "Stools" },
                    {"id": "CornerUnits", "name": "Corner Units" }
                ],
                "map": [{
                    "friendlyName": "Value",
                    "source": "furnituretype.category"
                }]
            }]
        }, {
            "label": "Furniture Type ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "furnituretype.id"
            }]
        }, {
            "label": "Furniture Collection ID",
            "type": "hidden",
            "componentId": "FurnitureCollectionID",
            "map": [{
                "friendlyName": "Value",
                "source": "querystring.furnitureCollectionId"
            }]
        }, {
            "label": "Order",
            "type": "hidden",
            "componentId": "Order",
            "map": [{
                "friendlyName": "Value",
                "source": "furnituretype.order",
                "default": 1
            }]
        }, {
            "label": "Save",
            "type": "button",
            "componentId": "SaveButton"
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
            "name": "furniturecollections",
            "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureCollectionService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetAll",
            "map": {
                "Name": "name",
                "FurnitureTypeID": "id"
            }
        }]
    }
}