{
    "behaviourId": "CmsEditHomeAccessoryCategory",
        "page": {
            "label": "Edit Home Accessory Category",
            "back": "#/homeaccessorycategories/index/?siteId=<%=App.Colony.currentSiteId%>",
            "backdescription": "Home Accessory Categories",
            "messages": [{
                "message": "EditHomeAccessoryCategory",
                "behaviourId": "CmsListHomeAccessoryCategories",
                "trigger": "submit",
                "success": "redirect:/homeaccessorycategoryimages/edit/?homeAccessoryCategoryId=<%=data.data.editHomeAccessoryCategory.id%>"
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
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, {
                    "label": "Image",
                    "type": "imagelibrary",
                    "componentId": "ImageAssetID",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "homeaccessorycategory.imageAssetID"
                    }]
                }, {
                    "label": "Should this collection be visible on the front-end",
                    "type": "switch",
                    "componentId": "IsVisible",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "homeaccessorycategory.isVisible"
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
                    "source": "homeaccessorycategory.longDescription"
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
                    "source": "homeaccessorycategory.analyticsCode"
                }],
                "validation": {
                    "maxlength": 512
                }
            }]
        }, {
            "label": "FurnitureCollection ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "homeaccessorycategory.id"
            }]
        }, {
            "label": "Parent ID",
            "type": "hidden",
            "componentId": "ParentId",
            "map": [{
                "friendlyName": "Value",
                "source": "homeaccessorycategory.parentId"
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
            "label": "Next",
            "type": "button",
            "componentId": "SaveButton"
        }],
    "data": {
        "execute": [{
            "name": "homeaccessorycategory",
            "ServiceType": "WalkerGreenbank.Modules.HomeAccessories.Services.IHomeAccessoryCategoriesService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "HomeAccessoryCategoryID": "id"
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