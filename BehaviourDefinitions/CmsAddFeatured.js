{
    "behaviourId": "CmsAddFeatured",
    "page": {
        "label": "Add Featured Item",
        "back": "#/featured/index/?siteId=<%=App.QueryString['siteId']%>",
        "backdescription": "featureditems",
        "messages": [{
            "message": "AddFeatured",
            "behaviourId": "CmsListFeatured",
            "trigger": "submit",
            "success": "redirect:/featured/index/?siteId=<%=App.QueryString['siteId']%>"
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
                        "required": true,
                        "maxlength": 512
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
                        "source": "featured.isVisible",
                        "default": "true"
                    }]
                },{
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
                },{
                    "label": "Should this featured item open in new a window",
                    "type": "switch",
                    "componentId": "NewWindow",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "featured.newWindow"
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
                "label": "On which Sites should this featured item to appear",
                "type": "checkboxlist",
                "componentId": "SiteIds",
                "dataCollection": "sites",
                "map": [{
                    "friendlyName": "Value",
                    "source": "featured.siteIds",
                    "default": "querystring.siteId"
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
        },{
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
            "name": "Sites",
            "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
            "ServiceMethod": "GetAll"
        }
        ]
    }
}