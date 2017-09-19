{
	"behaviourId": "CmsEditConfiguration",
	"page": {
		"label": "Edit CMS Configuration",
		"back": "#/configuration/index/",
		"backdescription": "CMS Configuration",
		"messages": [{
			"message": "EditConfiguration",
			"behaviourId": "CmsListConfiguration",
			"trigger": "submit",
			"success": "redirect:/configuration/index/"
		}]
	},
	"componentContainer": [
		{
			"label": "Name",
			"type": "display",
			"componentId": "Name",
			"map": [{
				"friendlyName": "Value",
				"source": "configuration.name"
			}]
		}, {
			"label": "Default Value",
			"type": "display",
			"componentId": "DefaultValue",
			"map": [{
				"friendlyName": "Value",
				"source": "configuration.defaultValue"
			}]
		}, {
			"label": "Value",
			"type": "text",
			"componentId": "OverrideValue",
			"map": [{
				"friendlyName": "Value",
				"source": "<%= (App.data.configuration.overrideValue != '') ? App.data.configuration.overrideValue : App.data.configuration.defaultValue %>"
			}]
		}, {
			"label": "Configuration ID",
			"type": "hidden",
			"componentId": "Id",
			"map": [{
				"friendlyName": "Value",
				"source": "configuration.id"
			}]
		}, {
			"label": "Save",
			"type": "button",
			"componentId": "SaveButton"
		}],
	 "data": {
		 "execute": [{
			 "name": "configuration",
			 "ServiceType": "Colony.Services.Core.Abstract.CMSConfiguration.IConfigurationService, Colony.Services",
			 "ServiceMethod": "GetById",
			 "ServiceMethodParams": [
				 {"Key": "id", "Value": 0 }
			 ]
		 }]
	 }

}