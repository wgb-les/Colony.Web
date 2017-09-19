{
    "behaviourId": "CmsEditMegaMenu",
    "page": {
	    "label": "Edit Mega Menu Details",
	    "back": "menus/edit/?id=<%=App.QueryString['menuId']%>",
	    "backdescription": "Menu",
	    "messages": [{
		    "message": "EditMegaMenu",
		    "behaviourId": "CmsListMenu",
		    "trigger": "submit",
		    "success": "redirect:/menus/edit/?id=<%=App.data.megaMenu.menuId %>&siteId=<%=App.QueryString['siteId']%>"
	    }]
    },
	"componentContainer": [{
	    "label": "",
	    "type": "tablist",
	    "componentId": "MenusTabs",
	    "actions": [{
	        "icon": "pencil",
	        "url": "/menus/mega-menu-items/index/?menuId=<%=App.QueryString['menuId']%>&siteId=<%=App.QueryString['siteId']%>",
	        "name": "Edit Mega Menu Content Sections"
	    }]
	},{
		"label": "",
		"type": "fieldset",
		"componentId": "BasicDetailsFieldset",
		"className": "half",
		"components": [{
		    "label": "Button Text",
			"type": "text",
			"componentId": "ButtonText",
			"map": [{
				"friendlyName": "Value",
				"source": "megaMenu.buttonText"
			}],
			"validation": {
				"maxlength": 255
			}
		}, {
		    "label": "Button Icon Class",
		    "type": "text",
		    "componentId": "ButtonIconClass",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "megaMenu.buttonIconClass"
		    }],
		    "validation": {
		        "maxlength": 255
		    }
		}, {
		    "label": "Button Url",
		    "type": "text",
		    "componentId": "ButtonUrl",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "megaMenu.buttonUrl"
		    }],
		    "validation": {
		        "maxlength": 500
		    }
		}]
	}, {
		"label": "",
		"type": "fieldset",
		"componentId": "BasicDetailsFieldset2",
		"className": "half",
		"components": [{
		    "label": "Promo Image",
		    "type": "imagelibrary",
			"componentId": "ImageAssetId",
			"map": [{
				"friendlyName": "Value",
				"source": "megaMenu.imageAssetId",
				"default": "true"
			}]
		}, {
		    "label": "Promo Url",
		    "type": "text",
		    "componentId": "PromoUrl",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "megaMenu.promoUrl"
		    }],
		    "validation": {
		        "maxlength": 500
		    }
		}, {
		    "label": "Promo Name",
		    "type": "text",
		    "componentId": "PromoName",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "megaMenu.promoName"
		    }],
		    "validation": {
		        "maxlength": 255
		    }
		},
		{
		    "label": "Promo SubTitle",
		    "type": "text",
		    "componentId": "PromoSubTitle",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "megaMenu.promoSubTitle"
		    }],
		    "validation": {
		        "maxlength": 255
		    }
		}
		]
	},
		{
			"label": "Menu ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "<%= App.QueryString['menuId'] %>"
			}]
		}, {
			"label": "Site ID",
			"type": "hidden",
			"componentId": "SiteId",
			"map": [{
				"friendlyName": "Value",
				"source": "<%= App.QueryString['siteId'] %>"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}
	],
	"data": {
		"execute": [{
		    "name": "megaMenu",
		    "ServiceType": "WalkerGreenbank.Modules.Homepage.Services.IMegaMenuService, WalkerGreenbank.Modules",
		    "ServiceMethod": "GetMegaMenuForMemu",
			"ServiceMethodParams": [{
				"Key": "menuId",
				"Value": 1
			}],
			"map": {
				"Name": "name",
				"MenuId": "id"
			}
		}]
	}
}