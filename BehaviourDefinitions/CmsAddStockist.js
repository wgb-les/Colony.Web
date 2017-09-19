{
    "behaviourId": "CmsAddStockist",
	"page": {
	    "label": "Add Stockist",
		"back": "/stockists/index/",
		"backdescription": "Stockist Management",
		"messages": [{
		    "Message": "AddStockist",
		    "BehaviourId": "CmsListStockist",
		    "Trigger": "submit",
		    "success": "redirect:/stockists/index/"
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
				        "source": "stockist.name"
				    }],
				    "validation": {
				        "required": true,
				        "maxlength": 255
				    }
				}, {
				    "label": "Telephone number",
				    "type": "text",
				    "componentId": "TelephoneNumber",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "stockist.telephoneNumber"
				    }],
				    "validation": {
				        "maxlength": 255
				    }
				}, {
				    "label": "Email Address",
				    "type": "text",
				    "componentId": "Email",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "stockist.email"
				    }],
				    "validation": {
				        "maxlength": 255
				    }
				}, {
				    "label": "Website",
				    "type": "text",
				    "componentId": "Website",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "stockist.website"
				    }],
				    "validation": {
				        "maxlength": 255
				    }
				}, {
				    "label": "Latitude",
				    "type": "text",
				    "componentId": "Latitude",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "stockist.latitude"
				    }],
				    "validation": {
				        "maxlength": 255
				    }
				}, {
				    "label": "Longitude",
				    "type": "text",
				    "componentId": "Longitude",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "stockist.longitude"
				    }],
				    "validation": {
				        "maxlength": 255
				    }
				}, {
				    "label": "Address line 1",
				    "type": "text",
				    "componentId": "Address1",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "stockist.address1"
				    }],
				    "validation": {
				        "maxlength": 255
				    }
				}, {
				    "label": "Address line 2",
				    "type": "text",
				    "componentId": "Address2",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "stockist.address2"
				    }],
				    "validation": {
				        "maxlength": 255
				    }
				}, {
				    "label": "Address line 3",
				    "type": "text",
				    "componentId": "Address3",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "stockist.address3"
				    }],
				    "validation": {
				        "maxlength": 255
				    }
				}, {
				    "label": "Address line 4",
				    "type": "text",
				    "componentId": "Address4",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "stockist.address4"
				    }],
				    "validation": {
				        "maxlength": 255
				    }
				}, {
				    "label": "Town",
				    "type": "text",
				    "componentId": "Town",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "stockist.town"
				    }],
				    "validation": {
				        "maxlength": 255
				    }
				}, {
				    "label": "County",
				    "type": "text",
				    "componentId": "County",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "stockist.county"
				    }],
				    "validation": {
				        "maxlength": 255
				    }
				}, {
				    "label": "Postcode",
				    "type": "text",
				    "componentId": "Postcode",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "stockist.postcode"
				    }],
				    "validation": {
				        "maxlength": 255
				    }
				}, {
				    "label": "State",
				    "type": "dropdown",                    
				    "componentId": "StateId",
				    "dataCollection": "state",
				    "map": [
                        {
                            "friendlyName": "Value",
                            "source": "stockist.stateId"
                        }
				    ]
				}, {
				    "label": "Country",
				    "type": "dropdown",                    
				    "componentId": "CountryId",
				    "dataCollection": "country",
				    "map": [
                        {
                            "friendlyName": "Value",
                            "source": "stockist.countryId"
                        }
				    ]
				}, {
				    "label": "Should this stockist be visible on the front-end",
				    "type": "switch",
				    "componentId": "IsVisible",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "stockist.isVisible"
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
		        "label": "Which brands are sold by this stockist",
		        "type": "checkboxlist",
		        "componentId": "ShopIds",
		        "dataCollection": "shop",
		        "map": [{
		            "friendlyName": "Value",
		            "source": "stockist.shopIds",
		            "default": "1"
		        }]
		    },
            {
                "label": "Does this stockist sell fabrics",
                "type": "switch",
                "componentId": "SellsFabric",
                "map": [{
                    "friendlyName": "Value",
                    "source": "stockist.sellsFabric"
                }]
            },
            {
                "label": "Does this stockist sell wallpaper",
                "type": "switch",
                "componentId": "SellsWallpaper",
                "map": [{
                    "friendlyName": "Value",
                    "source": "stockist.sellsWallpaper"
                }]
            },
            {
                "label": "Does this stockist sell paint",
                "type": "switch",
                "componentId": "SellsPaint",
                "map": [{
                    "friendlyName": "Value",
                    "source": "stockist.sellsPaint"
                }]
            },
            {
                "label": "Does this stockist sell trimmings",
                "type": "switch",
                "componentId": "SellsTrimmings",
                "map": [{
                    "friendlyName": "Value",
                    "source": "stockist.sellsTrimmings"
                }]
            },
            {
                "label": "Does this stockist sell rugs",
                "type": "switch",
                "componentId": "SellsRugs",
                "map": [{
                    "friendlyName": "Value",
                    "source": "stockist.sellsRugs"
                }]
            },
            {
                "label": "Does this stockist sell home accessories",
                "type": "switch",
                "componentId": "SellsHomeAccessories",
                "map": [{
                    "friendlyName": "Value",
                    "source": "stockist.sellsHomeAccessories"
                }]
            },
            {
                "label": "Does this stockist sell furniture",
                "type": "switch",
                "componentId": "SellsFurniture",
                "map": [{
                    "friendlyName": "Value",
                    "source": "stockist.sellsFurniture"
                }]
            }]
		}, {
		    "label": "ID",
		    "type": "hidden",
		    "componentId": "Id",
		    "map": [{
		        "friendlyName": "Value",
		        "source": "stockist.id"
		    }]
		}, {
		    "label": "Save",
		    "type": "button",
		    "componentId": "SaveButton"
		}],
	"data": {
	    "execute": [{
	        "name": "country",
	        "ServiceType": "Colony.Services.Core.Abstract.Countries.ICountryService, Colony.Services",
	        "ServiceMethod": "GetAll"
	    }, {
	        "name": "state",
	        "ServiceType": "Colony.Commerce.Services.Stockists.Abstract.IStateService, Colony.Commerce.Services",
	        "ServiceMethod": "GetAll"
	    }]
	}
}