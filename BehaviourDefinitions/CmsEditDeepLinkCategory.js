﻿{
    "behaviourId": "CmsEditDeepLinkCategory",
	"page": {
	    "label": "Edit Deep Link Category",
		"back": "#/deeplinkcategories/index/",
		"backdescription": "Deep Link Categories",
		"messages": [{
		    "message": "EditDeepLinkCategory",
		    "behaviourId": "CmsListDeepLinkCategory",
		    "trigger": "submit",
		    "success": "redirect:/deeplinkcategories/index/"
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
				        "source": "deeplinkcategory.name"
				    }],
				    "validation": {
				        "required": true,
				        "maxlength": 255
				    }
				}, {
				    "label": "Should this category be visible on the front-end",
				    "type": "switch",
				    "componentId": "IsVisible",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "deeplinkcategory.isVisible"
				    }]
				}
		    ]
		}, {
		    "label": "Deep Link Category ID",
		    "type": "hidden",
		    "componentId": "Id",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "deeplinkcategory.id"
		    }]
		}, {
		    "label": "Moderation Status ID",
		    "type": "hidden",
		    "componentId": "ModerationStatusID",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "deeplinkcategory.moderationStatusId",
		        "default": "5"
		    }]
		}, {
		    "label": "Save",
		    "type": "button",
		    "componentId": "SaveButton"
		}],
	"data": {
	    "execute": [{
	        "name": "deeplinkcategory",
	        "ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkCategoryService, Colony.Services",
	        "ServiceMethod": "GetById",
	        "ServiceMethodParams": [
	            {"Key": "Id", "Value": "1"}
	        ]
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