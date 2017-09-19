{
    "behaviourId": "CmsEditFurnitureOption",
        "page": {
            "label": "Edit Furniture Option",
            "back": "#/furnitureoptions/index/?siteId=<%=App.Colony.currentSiteId%>&furnitureOptionCategoryId=<%=App.QueryString['furnitureOptionCategoryId']%>",
            "backdescription": "Furniture Options",
            "messages": [{
                "message": "EditFurnitureOption",
                "behaviourId": "CmsListFurnitureOption",
                "trigger": "submit",
                "success": "redirect:/furnitureoptions/index/?siteId=<%=App.Colony.currentSiteId%>&furnitureOptionCategoryId=<%=App.QueryString['furnitureOptionCategoryId']%>"
            }]
        },
    "componentContainer": [{
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
                        "source": "furnitureoption.name"
                    }],
                    "validation": {
                        "required": true,
                        "maxlength": 255
                    }
                }, {
                    "label": "Should this option be visible on the front-end",
                    "type": "switch",
                    "componentId": "IsVisible",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "furnitureoption.isVisible"
                    }]
                }, {
                    "label": "Image",
                    "type": "imagelibrary",
                    "componentId": "ImageAssetID",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "furnitureoption.imageAssetId"
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
                "label": "Long Description",
                "type": "richtext",
                "componentId": "LongDescription",
                "map": [{
                    "friendlyName": "Value",
                    "source": "furnitureoption.longDescription"
                }]
            }]
        }, {
            "label": "FurnitureOption ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "furnitureoption.id"
            }]
        }, {
            "label": "FurnitureOptionCategory ID",
            "type": "hidden",
            "componentId": "FurnitureOptionCategoryId",
            "map": [{
                "friendlyName": "Value",
                "source": "furnitureoption.furnitureOptionCategoryId"
            }]
        }, {
            "label": "Order",
            "type": "hidden",
            "componentId": "Order",
            "map": [{
                "friendlyName": "Value",
                "source": "furnitureoption.order"
            }]
        }, {
            "label": "Save",
            "type": "button",
            "componentId": "SaveButton"
        }],
    "data": {
        "execute": [{
            "name": "furnitureoption",
            "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureOptionService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "FurnitureoptioID": "id"
            }
        }, {
            "name": "Shops",
            "ServiceType": "Colony.Commerce.Services.Shops.IShopsService, Colony.Commerce.Services",
            "ServiceMethod": "GetAll"
        }, {
            "name": "Languages",
            "ServiceType": "Colony.Services.Core.Abstract.Language.ILanguageService, Colony.Services",
            "ServiceMethod": "GetAll"
        }, {
            "name": "Sites",
            "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
            "ServiceMethod": "GetAll"
        }]
    }
}