{
    "behaviourId": "CmsEditHomepageItem",
    "page": {
        "label": "Edit Homepage Item",
        "back": "homepageitems/index/?siteId=<%=App.QueryString['siteId']%>",
        "backdescription": "Homepage Items",
        "messages": [{
            "message": "EditHomepageItem",
            "behaviourId": "CmsListHomepageItem",
            "trigger": "submit",
            "success": "redirect:/homepageitems/index/?siteId=<%=App.QueryString['siteId']%>"
        }]
    },
	"componentContainer": [{
	    "label": "",
	    "type": "tablist",
	    "componentId": "FeaturedItemTabs",
	    "actions": [{
	        "icon": "pencil",
	        "url": "/homepageitemproducts/edit/?siteId=<%=App.QueryString['siteId']%>&featuredItemId=<%=App.QueryString['id']%>",
	        "name": "Edit Products"
	    }, {
	        "icon": "pencil",
	        "url": "/homepageitemimages/edit/?siteId=<%=App.QueryString['siteId']%>&featuredItemId=<%=App.QueryString['id']%>",
	        "name": "Edit Images"
	    }]
	}, {
	    "label": "",
	    "type": "fieldset",
	    "componentId": "BasicDetailsFieldset",
	    
	    "components": [{
	        "label": "Name",
	        "type": "text",
	        "componentId": "Name",
	        "map": [{
	            "friendlyName": "Value",
	            "source": "homepageitem.name"
	        }],
	        "validation": {
	            "required": true,
	            "maxlength": 255
	        }
	    }, {
	        "label": "Content",
	        "type": "richtext",
	        "componentId": "LongDescription",
	        "map": [{
	            "friendlyName": "Value",
	            "source": "homepageitem.longDescription"
	        }],
	        "validation": {
	            "required": true
	        }
	    }, {
	        "label": "Era",
	        "type": "text",
	        "componentId": "Era",
	        "map": [{
	            "friendlyName": "Value",
	            "source": "homepageitem.era"
	        }],
	        "validation": {
	            "maxlength": 100
	        }
	    }, {
	        "label": "Url",
	        "type": "text",
	        "componentId": "Uri",
	        "map": [{
	            "friendlyName": "Value",
	            "source": "homepageitem.uri"
	        }],
	        "validation": {
	            "maxlength": 255
	        }
	    }, {
	        "label": "Should this page be visible on the front-end",
	        "type": "switch",
	        "componentId": "IsVisible",
	        "map": [{
	            "friendlyName": "Value",
	            "source": "homepageitem.isVisible",
	            "default": "true"
	        }]
	    }, {
	        "label": "Mobile Content",
	        "type": "richtext",
	        "componentId": "MobileContent",
	        "map": [{
	            "friendlyName": "Value",
	            "source": "homepageitem.mobileContent"
	        }]
	    }, {
	        "label": "Orientation",
	        "type": "dropdown",
	        "helptext": "Used for Style Library Only",
	        "componentId": "Orientation",
	        "map": [{
	            "friendlyName": "Value",
	            "source": "homepageitem.orientation",
                "default": "landscape"
	        }],
	        "items": [
                {"id": "portrait", "name": "Portrait" },
                {"id": "landscape", "name": "Landscape" }
	        ]
	    }, {
	        "label": "Brand",
	        "type": "dropdown",
	        "helptext": "Used for Style Library Only",
	        "componentId": "Brand",
	        "map": [{
	            "friendlyName": "Value",
	            "source": "homepageitem.brand"
	        }],
	        "items": [
                {"id": "Harlequin", "name": "Harlequin" },
                {"id": "Morris & Co.", "name": "Morris & Co." },
                {"id": "Sanderson", "name": "Sanderson" },
                {"id": "Scion", "name": "Scion" },
                {"id": "Zoffany", "name": "Zoffany" },
                {"id": "Style Library", "name": "Style Library" }
	        ]
	    }, {
	        "label": "Position",
	        "type": "text",
	        "helptext": "Used to position elements within the Sanderson and Zoffany homepages",
	        "componentId": "Position",
	        "map": [{
	            "friendlyName": "Value",
                "source": "homepageitem.position"
	        }]
	    }]
	},
             {
                 "label": "Featured Item ID",
                 "type": "hidden",
                 "componentId": "Id",
                 "map": [{
                     "friendlyName": "Value",
                     "source": "homepageitem.id"
                 }]
             }, {
                 "label": "Site ID",
                 "type": "hidden",
                 "componentId": "SiteId",
                 "map": [{
                     "friendlyName": "Value",
                     "source": "querystring.siteId"
                 }]
             }, {
                 "label": "Order",
                 "type": "hidden",
                 "componentId": "Order",
                 "map": [{
                     "friendlyName": "Value",
                     "source": "homepageitem.order"
                 }]
             }, {
                 "label": "Save",
                 "type": "button",
                 "componentId": "SaveButton"
             }
	],
	"data": {
	    "execute": [{
	        "name": "homepageitem",
	        "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IFeaturedItemService, WalkerGreenbank.Modules",
	        "ServiceMethod": "GetById",
	        "ServiceMethodParams": [{
	            "Key": "id",
	            "Value": 1
	        }],
	        "map": {
	            "Name": "name",
	            "FeaturedItemID": "id"
	        }
	    }, {
	        "name": "Site",
	        "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
	        "ServiceMethod": "GetById",
	        "ServiceMethodParams": [{
	            "Key": "id",
	            "Value": 1
	        }],
	        "map": {
	            "Name": "name",
	            "SiteID": "id"
	        }
	    }]
	}
}