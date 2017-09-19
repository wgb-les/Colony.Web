{
	"behaviourId": "CmsEditCountry",
	"page": {
		"label": "Edit Country",
		"back": "/countries/index/",
		"backdescription": "Country management",
		"messages": [{
			"Message": "EditCountry", 
			"BehaviourId": "CmsListCountry",
			"Trigger": "submit",
			"success": "redirect:/countries/index/"
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
						"source": "country.name"
					}],
					"validation": {
						"required": true,
						"maxlength": 255
					}
				}, {
				    "label": "ISO 3166 Code",
				    "type": "text",
				    "componentId": "ISO3166",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "country.isO3166"
				    }],
				    "validation": {
				        "required": true,
				        "maxlength": 255
				    }
				}, {
				    "label": "ISO 3166 2 Character Code",
				    "type": "text",
				    "componentId": "ISO3166Alpha2",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "country.isO3166Alpha2"
				    }],
				    "validation": {
				        "required": true,
				        "maxlength": 255
				    }
				}, {
				    "label": "ISO 3166 Numeric Code",
				    "type": "text",
				    "componentId": "ISO3166NumericCode",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "country.isO3166NumericCode"
				    }],
				    "validation": {
				        "required": true,
				        "maxlength": 255
				    }
				}, {
				    "label": "Region",
				    "type": "dropdown",
				    "componentId": "Region",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "country.region"
				    }],
				    "items": [
                        {"id": "United Kingdom", "name": "United Kingdom"},
                        {"id": "Europe", "name": "Europe"},
                        {"id": "USA", "name": "USA"},
                        {"id": "Rest of World", "name": "Rest of World"}
				    ],
				    "validation": {
				        "required": true,
				        "maxlength": 255
				    }
				}
            ]
		},
		{
			"label": "Country ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "country.id"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}
	],
	"data": {
		"execute": [{
			"name": "country",
			"ServiceType": "Colony.Services.Core.Abstract.Countries.ICountryService, Colony.Services",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [{
				"Key": "id",
				"Value": 1
			}]
		}
	]
	}
}