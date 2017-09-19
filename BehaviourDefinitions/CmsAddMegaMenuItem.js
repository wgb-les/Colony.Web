{
    "behaviourId": "CmsAddMegaMenuItem",
    "page": {
	    "label": "Add Mega Menu Content Section",
	    "back": "menus/mega-menu-items/index/?menuId=<%=App.QueryString['menuId']%>&siteId=<%=App.QueryString['siteId']%>",
	    "backdescription": "Menu",
	    "messages": [{
		    "message": "AddMegaMenuItem",
		    "behaviourId": "CmsListMegaMenuItems",
		    "trigger": "submit",
		    "success": "redirect:/menus/mega-menu-items/index?menuId=<%=App.QueryString['menuId']%>&siteId=<%=App.QueryString['siteId']%>"
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
				"source": "querystring.menuId"
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
				"source": "menu.order"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}
	]
}