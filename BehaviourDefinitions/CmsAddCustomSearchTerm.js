{
	"behaviourId": "CmsAddCustomSearchTerm",
	"page": {
		"label": "Add Search Term",
		"back": "#/searchterms/index/?siteId=<%=App.QueryString['siteId']%>",
		"backdescription": "Search Terms",
		"messages": [{
			"message": "AddCustomSearchTerm",
			"behaviourId": "CmsListCustomSearchTerm",
			"trigger": "submit",
			"success": "redirect:/searchterms/index/?siteId=<%=App.QueryString['siteId']%>"
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
						"source": "searchterm.name"
					}],
					"validation": {
					    "required": true,
					    "maxlength": 255
					}
				}, {
				    "label": "Query",
				    "type": "text",
				    "componentId": "Query",
				    "map": [{
				        "friendlyName": "Value",
				        "source": "searchterm.query"
				    }],
				    "validation": {
				        "maxlength": 255
				    }
				}, {
			    "label": "On which Site should this term appear",
			    "type": "dropdown",
			    "componentId": "SiteId",
			    "dataCollection": "sites",
			    "map": [{
			        "friendlyName": "Value",
			        "source": "querystring.siteId",
			        "default": "querystring.siteId"
			    }]
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