{
    "behaviourId": "CmsEditFeatured",
    "page": {
        "label": "Edit Featured Item",
        "back": "/featured/index/?siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "Featured Items",
        "messages": [{
            "Message": "EditFeatured",
            "BehaviourId": "CmsListFeatured",
            "Trigger": "submit",
            "success": "redirect:/featured/index/?siteId=<%=App.Colony.currentSiteId%>"
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
                        "source": "featured.name"
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
                        "source": "featured.shortDescription"
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
                        "source": "featured.imageAssetId"
                    }]
                }, {
                    "label": "Start Publishing",
                    "type": "datetime",
                    "componentId": "PublishStart",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "featured.publishStart"
                    }]
                }, {
                    "label": "End Publishing",
                    "type": "datetime",
                    "componentId": "PublishEnd",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "featured.publishEnd"
                    }]
                }, {
                    "label": "Should this featured item be visible on the front-end",
                    "type": "switch",
                    "componentId": "IsVisible",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "featured.isVisible"
                    }]
                }, {
                    "label": "Target URI",
                    "type": "text",
                    "componentId": "TargetURI",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "featured.targetURI"
                    }],
                    "validation": {
                        "required": true,
                        "maxlength": 255
                    }
                }, {
                    "label": "Should this featured item open in new a window",
                    "type": "switch",
                    "componentId": "NewWindow",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "featured.newWindow"
                    }]
                }, {
                    "label": "Tags",
                    "type": "tags",
                    "componentId": "Tags",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "featured.tags"
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
                "source": "featured.longDescription"
            }],
            "validation": {
                "required": true
            }
        }, {
            "label": "On which Sites should this featured item appear",
            "type": "checkboxlist",
            "componentId": "SiteIds",
            "dataCollection": "sites",
            "map": [{
                "friendlyName": "Value",
                "source": "featured.siteIds",
                "default": "1"
            }]
        }]
    }, {
        "label": "Featured Item ID",
        "type": "hidden",
        "componentId": "Id",
        "map": [{
            "friendlyName": "Value",
            "source": "featured.id"
        }]
    }, {
        "label": "Order",
        "type": "hidden",
        "componentId": "Order",
        "map": [{
            "friendlyName": "Value",
            "source": "featured.order"
        }]
    }, {
        "label": "Save",
        "type": "button",
        "componentId": "SaveButton"
    }],
    "data": {
        "execute": [{
            "name": "featured",
            "ServiceType": "WalkerGreenbank.Modules.Featured.Services.IFeaturedItemService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "FeaturedItemId": "id"
            }
        }, {
            "name": "Sites",
            "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
            "ServiceMethod": "GetAll"
        }]
    }
}