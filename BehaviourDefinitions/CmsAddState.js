{
    "behaviourId": "CmsAddState",
	"page": {
	    "label": "Add State",
		"back": "/states/index/",
		"backdescription": "US States and Territories",
		"messages": [{
		    "Message": "AddState", 
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
	]
}