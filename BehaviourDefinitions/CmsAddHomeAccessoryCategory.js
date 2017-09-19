{
    "behaviourId": "CmsAddHomeAccessoryCategory",
    "page": {
        "label": "Add Home Accessory Category",
        "back": "#/homeaccessorycategories/index/?siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "Home Accessory Categories",
        "messages": [{
            "message": "AddHomeAccessoryCategory",
            "behaviourId": "CmsListHomeAccessoryCategories",
            "trigger": "submit",
            "success": "redirect:/homeaccessorycategories/index/?siteId=<%=App.Colony.currentSiteId%>"
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
                        "source": "homeaccessorycategory.name"
                    }],
                    "validation": {
                        "required": true,
                        "maxlength": 255
                    }
                }, {
                    "label": "Short Description",
                    "type": "textarea",
                    "componentId": "ShortDescription",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "homeaccessorycategory.shortDescription"
                    }]
                }, {
                    "label": "Image",
                    "type": "imagelibrary",
                    "componentId": "ImageAssetID",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "homeaccessorycategory.imageAssetId"
                    }]
                }, {
                    "label": "Should this category be visible on the front-end",
                    "type": "switch",
                    "componentId": "IsVisible",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "homeaccessorycategory.isVisible",
                        "default": "true"
                    }]
                }, {
                    "label": "URI",
                    "type": "text",
                    "componentId": "URI",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "homeaccessorycategory.uri"
                    }]
                }, {
                    "label": "Shop",
                    "type": "dropdown",
                    "componentId": "ShopId",
                    "dataCollection": "shops",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "homeaccessorycategory.shopId",
                        "default": 1
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
                    "source": "homeaccessorycategory.longDescription"
                }],
                "validation": {
                    "required": true
                }
            }]
        }, {
            "label": "Analytics Code",
            "type": "textarea",
            "componentId": "AnalyticsCode",
            "map": [{
                "friendlyName": "Value",
                "source": "homeaccessorycategory.analyticsCode"
            }],
            "validation": {
                "maxlength": 512
            }
        }, {
            "label": "HomeAccessoryCategory ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "homeaccessorycategory.id"
            }]
        }, {
            "label": "Order",
            "type": "hidden",
            "componentId": "Order",
            "map": [{
                "friendlyName": "Value",
                "source": "homeaccessorycategory.order"
            }]
        }, {
            "label": "Parent ID",
            "type": "hidden",
            "componentId": "ParentId",
            "map": [{
                "friendlyName": "Value",
                "source": "querystring.parentId"
            }]
        }, {
            "label": "Save",
            "type": "button",
            "componentId": "SaveButton"
        }],
    "data": {
        "execute": [{
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