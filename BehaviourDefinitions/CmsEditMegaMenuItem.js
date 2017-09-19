{
    "behaviourId": "CmsEditMegaMenuItem",
    "page": {
	    "label": "Edit Mega Menu Content Section",
	    "back": "menus/mega-menu-items/index/?menuId=<%= App.data.megaMenuItem.menuId %>&siteId=<%=App.QueryString['siteId']%>",
	    "backdescription": "Menu",
	    "messages": [{
		    "message": "EditMegaMenuItem",
		    "behaviourId": "CmsListMegaMenuItems",
		    "trigger": "submit",
		    "success": "redirect:/menus/mega-menu-items/index?menuId=<%= App.data.megaMenuItem.menuId %>&siteId=<%=App.QueryString['siteId']%>"
	    }]
    },
	"componentContainer": [{
		"label": "",
		"type": "fieldset",
		"componentId": "BasicDetailsFieldset",
		"className": "half",
		"components": [{
			"label": "Content",
			"type": "richtext",
			"componentId": "HtmlContent",
			"map": [{
				"friendlyName": "Value",
				"source": "megaMenuItem.htmlContent"
			}],
			"validation": {
				"required": true
			}
		}]
	}, {
		"label": "",
		"type": "fieldset",
		"componentId": "BasicDetailsFieldset2",
		"className": "half",
		"components": [{
		    "label": "Should this content be visible on the front-end",
			"type": "switch",
			"componentId": "IsVisible",
			"map": [{
				"friendlyName": "Value",
				"source": "megaMenuItem.isVisible",
				"default": "true"
			}]
		}]
	},
		{
			"label": "Menu ID",
			"type": "hidden",
			"componentId": "MenuId",
			"map": [{
				"friendlyName": "Value",
				"source": "megaMenuItem.menuId"
			}]
		}, {
		    "label": "Mega Menu Item ID",
		    "type": "hidden",
		    "componentId": "MegaMenuItemId",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "megaMenuItem.megaMenuItemId"
		    }]
		}, {
		    "label": "Order",
		    "type": "hidden",
		    "componentId": "Order",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "megaMenuItem.order"
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
				"source": "megaMenuItem.order"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}
	],
    "data": {
        "execute": [{
            "name": "megaMenuItem",
            "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMegaMenuItemService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "MenuId": "id"
            }
        }]
    }
}