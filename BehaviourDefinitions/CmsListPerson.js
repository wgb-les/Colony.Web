{
    "behaviourId": "CmsListPerson",
    "messageHandlers": [{
        "Name": "AddPerson",
        "ServiceType": "Colony.Services.Core.Abstract.CRM.IPersonService, Colony.Services",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "EditPerson",
        "ServiceType": "Colony.Services.Core.Abstract.CRM.IPersonService, Colony.Services",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeletePerson",
        "ServiceType": "Colony.Services.Core.Abstract.CRM.IPersonService, Colony.Services",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            {"Key": "id", "Value": "" }
        ]
    }, {
        "Name": "SearchPerson",
        "ReturnName": "person",
        "ServiceType": "Colony.Services.Core.Abstract.CRM.IPersonService, Colony.Services",
        "ServiceMethod": "CmsSearch",
        "ServiceMethodParams": [
			{"Key": "searchCriteria", "Value": "", "IsDynamic": true }
        ]
    }],
    "page": {
        "label": "CRM" 
    },
    "componentContainer": [{
        "label": "Search",
        "type": "searchform",
        "components": [
			{
			    "label": "keywords",
			    "type": "fieldset",
			    "componentId": "keywordsFieldset",
			    "className": "half",
			    "components": [
					{
					    "label": "Enter keywords (partial name, email address, town, county or postcode)",
					    "componentId": "Keywords",
					    "type": "text",
					    "map": [
								{"friendlyName": "value", "source": "cache.keywords" }
					    ]
					}, {
                        "label": "Collected after",
                        "componentId": "CollectedAfter",
                        "type": "datetime",
                        "map": [
								{"friendlyName": "value", "source": "cache.collectedAfter" }
                        ]
					}, {
					    "label": "Collected before",
					    "componentId": "CollectedBefore",
					    "type": "datetime",
					    "map": [
								{"friendlyName": "value", "source": "cache.collectedBefore" }
					    ]
					}
			    ]
			}, {
			    "label": "Marketing preferences",
			    "type": "fieldset",
			    "componentId": "marketingFieldset",
			    "className": "half",
			    "components": [
					{
					    "label": "Allow Marketing",
					    "componentId": "AllowMarketing",
					    "type": "switch",
					    "map": [
								{"friendlyName": "value", "source": "cache.allowMarketing" }
					    ]
					}, {
					    "label": "Allow Third-party Marketing",
					    "componentId": "AllowThirdPartyMarketing",
					    "type": "switch",
					    "map": [
								{"friendlyName": "value", "source": "cache.allowThirdPartyMarketing" }
					    ]
					}, {
					    "label": "Min. age",
					    "componentId": "MinAge",
					    "type": "number",
					    "map": [
								{"friendlyName": "value", "source": "cache.minAge" }
					    ]
					}, {
					    "label": "Max. age",
					    "componentId": "MaxAge",
					    "type": "number",
					    "map": [
								{"friendlyName": "value", "source": "cache.maxAge" }
					    ]
					}
			    ]
			}
        ],
        "messages": [
            {
                "message": "SearchPerson",
                "behaviourId": "CmsListPerson",
                "Trigger": "submitSearch"
            }
        ]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "PersonList",
        "dataCollection": "person",
        "map": [{
            "friendlyName": "Last Name",
            "source": "lastName"
        }, {
            "friendlyName": "First Name",
            "source": "firstName"
        }, {
            "friendlyName": "Email",
            "source": "emailAddress"
        }],
        "actions": [{
            "icon": "pencil",
            "name": "Edit this Person",
            "url": "/edit/#/crm/edit/?id=<%=id%>"
        }, {
            "icon": "envelope",
            "name": "View this Person's Addresses",
            "url": "/edit/#/addresses/index/?personId=<%=id%>"
        }, {
            "icon": "phone",
            "name": "View this Person's Telephone Numbers",
            "url": "/edit/#/crm/edit/?id=<%=id%>"
        }, {
            "icon": "remove",
            "name": "Delete this Person",
            "url": "/edit/#/crm/delete/?id=<%=id%>"
        }]
    }],
    "data": {
      
    }
}