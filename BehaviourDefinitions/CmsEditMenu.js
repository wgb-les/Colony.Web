﻿{
    "behaviourId": "CmsEditMenu",
    "page": {
	    "label": "Edit Menu",
	    "back": "menus/index/?siteId=<%=App.data.menu.siteId %>",
	    "backdescription": "Menus",
	    "messages": [{
		    "message": "EditMenu",
		    "behaviourId": "CmsListMenu",
		    "trigger": "submit",
		    "success": "redirect:/menus/index/?siteId=<%=App.data.menu.siteId %>"
	    }]
    },
	"componentContainer": [{
	    "label": "",
	    "type": "tablist",
	    "componentId": "MenusTabs",
	    "actions": [{
	        "icon": "pencil",
	        "url": "/menus/mega-menu/edit/?menuId=<%=App.QueryString['id']%>&siteId=<%= App.data.menu.siteId %>",
	        "name": "Edit Mega Menu Details"
	    }]
	},{
		"label": "",
		"type": "fieldset",
		"componentId": "BasicDetailsFieldset",
		"className": "half",
		"components": [{
			"label": "Menu Name",
			"type": "text",
			"componentId": "Name",
			"map": [{
				"friendlyName": "Value",
				"source": "menu.name"
			}],
			"validation": {
				"required": true,
				"maxlength": 255
			}
		}, {
		    "label": "Menu URL",
		    "type": "text",
		    "componentId": "Uri",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "menu.uri"
		    }],
		    "validation": {
		        "required": true,
		        "maxlength": 500
		    }
		}]
	}, {
		"label": "",
		"type": "fieldset",
		"componentId": "BasicDetailsFieldset2",
		"className": "half",
		"components": [{
		    "label": "Should this menu be visible on the front-end",
			"type": "switch",
			"componentId": "IsVisible",
			"map": [{
				"friendlyName": "Value",
				"source": "menu.isVisible",
				"default": "true"
			}]
		}]
	},
		{
			"label": "Menu ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "menu.id"
			}]
		}, {
			"label": "Site ID",
			"type": "hidden",
			"componentId": "SiteId",
			"map": [{
				"friendlyName": "Value",
				"source": "menu.siteId"
			}]
		}, {
			"label": "Order",
			"type": "hidden",
			"componentId": "Order",
			"map": [{
				"friendlyName": "Value",
				"source": "menu.order"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}
	],
	"data": {
		"execute": [{
		    "name": "menu",
		    "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMenuService, WalkerGreenbank.Modules",
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