{
    "behaviourId": "CmsEditInspirationCategory",
	"page": {
	    "label": "Edit Inspiration Category",
		"back": "#/inspirationcategories/index/?siteId=<%=App.QueryString['siteId']%>",
		"backdescription": "Inspiration Category",
		"messages": [{
		    "message": "EditInspirationCategory",
		    "behaviourId": "CmsListInspirationCategory",
		    "trigger": "submit",
		    "success": "redirect:/inspirationcategories/index/?siteId=<%=App.QueryString['siteId']%>"
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
				    "type": "dropdown",
				    "componentId": "Name",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "inspirationCategory.name"
				    }],			
				    "items": [
						{"id": "Style", "name": "By Style"},
						{"id": "Room", "name": "By Room"},
						{"id": "Colour", "name": "By Colour"}
				    ],
				    "validation": {
				        "required": true
				    }
				}, {
				    "label": "Long Description",
				    "type": "richtext",
				    "componentId": "LongDescription",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "inspirationCategory.longDescription"
				    }],
				    "validation": {
				        "required": true
				    }
				}, {
				    "label": "Image",
				    "type": "imagelibrary",
				    "componentId": "ImageAssetID",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "inspirationcategory.imageAssetId"
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
		        "label": "On which Sites should this inspiration category appear",
		        "type": "checkboxlist",
		        "componentId": "SiteIds",
		        "dataCollection": "sites",
		        "map": [{
		            "friendlyName": "Value",
		            "source": "inspirationCategory.siteIds",
		            "default": "1"
		        }]
		    }]
		}, {
		    "label": "Item ID",
		    "type": "hidden",
		    "componentId": "Id",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "inspirationCategory.id"
		    }]
		}, {
		    "label": "Save",
		    "type": "button",
		    "componentId": "SaveButton"
		}],
	"data": {
	    "execute": [{
	        "name": "InspirationCategory",
	        "ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationCategoriesService, WalkerGreenbank.Modules",
	        "ServiceMethod": "GetById",
	        "ServiceMethodParams": [
				{ "Key": "id", "Value": 1 }
	        ]
	    }, {
	        "name": "Sites",
	        "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
	        "ServiceMethod": "GetAll"
	    }]
	}
}
	