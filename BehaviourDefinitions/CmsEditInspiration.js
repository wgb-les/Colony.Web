{
	"behaviourId": "CmsEditInspiration",
	"page": {
		"label": "Edit Inspiration",
		"back": "#/inspiration/index/",
		"backdescription": "Inspiration",
		"messages": [{
			"message": "EditInspiration",
			"behaviourId": "CmsListInspiration",
			"trigger": "submit",
			"success": "redirect:/inspiration/index/"
		}]
	},
	"componentContainer": [{ 
	    "label": "",
	    "type": "tablist",
	    "componentId": "FeaturedTabs",
	    "actions": [{
	        "icon": "pencil",
	        "url": "/inspirationimages/index/?inspirationId=<%=App.data.inspiration['id']%>",
	        "name": "Manage Inspiration Images"
	    }]
	}, {
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
						"source": "inspiration.name"
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
						"source": "inspiration.shortDescription"
					}],
					"validation": {
					    "maxlength": 255
					}
				}, {
					"label": "Category",
					"type": "dropdown",
					"componentId": "Category",
					"map": [{
						"friendlyName": "Value",
						"source": "inspiration.category"
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
					"label": "Image",
					"type": "imagelibrary",
					"componentId": "ImageAssetID",
					"map": [{
						"friendlyName": "Value",
						"source": "inspiration.imageAssetId"
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
				"label": "Tag",
				"type": "tags",
				"componentId": "Tags",
				"map": [{
					"friendlyName": "Value",
					"source": "inspiration.tags"
				}]
			}, {
				"label": "Should this item be marked as New",
				"type": "switch",
				"componentId": "IsNew",
				"map": [{
					"friendlyName": "Value",
					"source": "inspiration.isNew"
				}]
			}, {
				"label": "On which Sites should this inspiration appear",
				"type": "checkboxlist",
				"componentId": "SiteIds",
				"dataCollection": "sites",
				"map": [{
					"friendlyName": "Value",
					"source": "inspiration.siteIds",
					"default": "1"
				}]
			}]
		}, {
			"label": "Item ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "inspiration.id"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
	"data": {
		"execute": [{
			"name": "Inspiration",
			"ServiceType": "WalkerGreenbank.Modules.Inspirations.Services.IInspirationsService, WalkerGreenbank.Modules",
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
	