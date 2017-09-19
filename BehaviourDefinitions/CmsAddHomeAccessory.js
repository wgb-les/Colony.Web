{
    "behaviourId": "CmsAddHomeAccessory",
    "page": {
        "label": "Add Home Accessory",
        "back": "#/homeaccessories/index/?siteId=<%=App.Colony.currentSiteId%>&homeAccessoryCategoryId=<%=App.QueryString['homeAccessoryCategoryId']%>",
        "backdescription": "Home Accessories",
        "messages": [{
            "message": "AddHomeAccessory",
            "behaviourId": "CmsListHomeAccessories",
            "trigger": "submit",
            "success": "redirect:/homeaccessories/index/?siteId=<%=App.Colony.currentSiteId%>&homeAccessoryCategoryId=<%=App.QueryString['homeAccessoryCategoryId']%>"
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
                        "source": "homeaccessory.name"
                    }],
                    "validation": {
                        "required": true,
                        "maxlength": 255
                    }
                }, {
                    "label": "Subtitle",
                    "type": "text",
                    "componentId": "SubTitle",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "homeaccessory.subTitle"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, {
                    "label": "Short Description",
                    "type": "textarea",
                    "componentId": "ShortDescription",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "homeaccessory.shortDescription"
                    }],
                    "validation": {
                        "required": true,
                        "maxlength": 512
                    }
                }, {
                    "label": "Should this accessory be visible on the front-end",
                    "type": "switch",
                    "componentId": "IsVisible",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "homeaccessory.isVisible",
                        "default": "true"
                    }]
                }, {
                    "label": "URI",
                    "type": "text",
                    "componentId": "URI",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "homeaccessory.uri"
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
                    "source": "homeaccessory.longDescription"
                }],
                "validation": {
                    "required": true
                }
            }, {
                "label": "Analytics Code",
                "type": "textarea",
                "componentId": "AnalyticsCode",
                "map": [{
                    "friendlyName": "Value",
                    "source": "homeaccessory.analyticsCode"
                }],
                "validation": {
                    "maxlength": 512
                }
            }]
        }, {
            "label": "HomeAccessory ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "homeaccessory.id"
            }]
        }, {
            "label": "Order",
            "type": "hidden",
            "componentId": "Order",
            "map": [{
                "friendlyName": "Value",
                "source": "homeaccessory.order"
            }]
        }, {
            "label": "HomeAccessoryCategoery ID",
            "type": "hidden",
            "componentId": "HomeAccessoryCategoryId",
            "map": [{
                "friendlyName": "Value",
                "source": "querystring.homeAccessoryCategoryId"
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