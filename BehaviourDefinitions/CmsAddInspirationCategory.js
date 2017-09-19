{
    "behaviourId": "CmsAddInspirationCategory",
	"page": {
	    "label": "Add Inspiration Category",
		"back": "#/inspirationcategories/index/?siteId=<%=App.QueryString['siteId']%>",
		"backdescription": "Inspiration Category",
		"messages": [{
		    "message": "AddInspirationCategory",
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
				    "type": "text",
				    "componentId": "Name",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "inspirationcategory.name"
				    }],
				    "validation": {
				        "required": true,
				        "maxlength": 255
				    }
				}, {
				    "label": "Long Description",
				    "type": "richtext",
				    "componentId": "LongDescription",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "inspirationcategory.longDescription"
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
		            "source": "inspirationcategory.siteIds",
		            "default": "1"
		        }]
		    }]
		}, {
		    "label": "Item ID",
		    "type": "hidden",
		    "componentId": "Id",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "inspirationcategory.id"
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
	    }]
	}
}
	