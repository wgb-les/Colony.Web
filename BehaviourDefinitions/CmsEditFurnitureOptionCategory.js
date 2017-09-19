{
    "behaviourId": "CmsEditFurnitureOptionCategory",
        "page": {
            "label": "Edit Furniture Option Category",
            "back": "#/furnitureoptioncategories/index/",
            "backdescription": "Furniture Option Categories",
            "messages": [{
                "message": "EditFurnitureOptionCategory",
                "behaviourId": "CmsListFurnitureOptionCategory",
                "trigger": "submit",
                "success": "redirect:/furnitureoptioncategories/index/?siteId=<%=App.Colony.currentSiteId%>"
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
                        "source": "furnitureoptioncategory.name"
                    }],
                    "validation": {
                        "required": true,
                        "maxlength": 255
                    }
                }, {
                    "label": "Should this category be visible on the front-end",
                    "type": "switch",
                    "componentId": "IsVisible",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "furnitureoptioncategory.isVisible"
                    }]
                }, {
                    "label": "Shop",
                    "type": "dropdown",
                    "componentId": "ShopId",
                    "dataCollection": "shops",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "furnitureoptioncategory.shopId",
                        "default": 1
                    }],
                    "validation": {
                        "required": true
                    }
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
                    "source": "furnitureoptioncategory.longDescription"
                }]
            }]
        }, {
            "label": "FurnitureOptionCategory ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "furnitureoptioncategory.id"
            }]
        }, {
            "label": "Order",
            "type": "hidden",
            "componentId": "Order",
            "map": [{
                "friendlyName": "Value",
                "source": "furnitureoptioncategory.order"
            }]
        }, {
            "label": "Save",
            "type": "button",
            "componentId": "SaveButton"
        }],
    "data": {
        "execute": [{
            "name": "furnitureoptioncategory",
            "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureOptionCategoryService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "FurnitureoptionCategoryID": "id"
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