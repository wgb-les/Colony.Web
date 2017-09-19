{
    "behaviourId": "CmsEditFurnitureCollection",
        "page": {
            "label": "Edit Furniture Collection",
            "back": "#/furniturecollections/index/?siteId=<%=App.Colony.currentSiteId%>",
            "backdescription": "Furniture Collections",
            "messages": [{
                "message": "EditFurnitureCollection",
                "behaviourId": "CmsListFurnitureCollection",
                "trigger": "submit",
                "success": "redirect:/furniturecollectionimages/edit/?furnitureCollectionId=<%=data.data.editFurnitureCollection.id%>&siteId=<%=App.Colony.currentSiteId%>"
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
                        "source": "furniturecollection.name"
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
                        "source": "furniturecollection.shortDescription"
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
                        "source": "furniturecollection.imageAssetId"
                    }]
                }, {
                    "label": "Should this collection be visible on the front-end",
                    "type": "switch",
                    "componentId": "IsVisible",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "furniturecollection.isVisible"
                    }]
                }, {
                    "label": "URI",
                    "type": "text",
                    "componentId": "URI",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "furniturecollection.uri"
                    }]
                }, {
                    "label": "Shop",
                    "type": "dropdown",
                    "componentId": "ShopId",
                    "dataCollection": "shops",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "furniturecollection.shopId",
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
                    "source": "furniturecollection.longDescription"
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
                    "source": "furniturecollection.analyticsCode"
                }],
                "validation": {
                    "maxlength": 512
                }
            }]
        }, {
            "label": "Which options are available for this collection",
            "type": "checkboxlist",
            "componentId": "OptionIds",
            "dataCollection": "options",
            "map": [{
                "friendlyName": "Value",
                "source": "furniturecollection.optionIds",
                "default": "1"
            }]
        }, {
            "label": "FurnitureCollection ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "furniturecollection.id"
            }]
        }, {
            "label": "Parent ID",
            "type": "hidden",
            "componentId": "ParentId",
            "map": [{
                "friendlyName": "Value",
                "source": "furniturecollection.parentId"
            }]
        }, {
            "label": "Order",
            "type": "hidden",
            "componentId": "Order",
            "map": [{
                "friendlyName": "Value",
                "source": "blog.order"
            }]
        }, {
            "label": "Next",
            "type": "button",
            "componentId": "SaveButton"
        }],
    "data": {
        "execute": [{
            "name": "furniturecollection",
            "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureCollectionService, WalkerGreenbank.Modules.Furniture",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "FurnitureCollectionID": "id"
            }
        }, {
            "name": "Shops",
            "ServiceType": "Colony.Commerce.Services.Shops.IShopsService, Colony.Commerce.Services",
            "ServiceMethod": "GetAll"
        }, {
            "name": "Options",
            "ServiceType": "WalkerGreenbank.Modules.Furniture.Services.IFurnitureOptionService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetForCms",
            "ServiceMethodParams": [{
                "Key": "siteId",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "FurnitureOptionID": "id"
            }
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