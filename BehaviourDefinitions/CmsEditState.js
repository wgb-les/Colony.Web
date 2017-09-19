{
	"behaviourId": "CmsEditState",
	"page": {
		"label": "Edit State",
		"back": "/states/index/",
		"backdescription": "US States and Territories",
		"messages": [{
			"Message": "EditState", 
			"BehaviourId": "CmsListState",
			"Trigger": "submit",
			"success": "redirect:/states/index/"
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
						"source": "state.name"
					}],
					"validation": {
						"required": true,
						"maxlength": 255
					}
				}
            ]
		},
		{
			"label": "Shop ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "state.id"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}
	],
	"data": {
		"execute": [{
			"name": "state",
			"ServiceType": "Colony.Commerce.Services.Stockists.Abstract.IStateService, Colony.Commerce.Services",
			"ServiceMethod": "GetById",
			"ServiceMethodParams": [{
				"Key": "id",
				"Value": 1
			}]
		}
	]
	}
}