{
    "behaviourId": "CmsListTag",
	"messageHandlers": [{
	    "Name": "GetTags",
	    "ReturnName": "tag",
	    "ServiceType": "Colony.Services.Core.Abstract.Tags.ITagService, Colony.Services",
	    "ServiceMethod": "searchTags",
	    "ServiceMethodParams": [
			{ "Key": "keywords", "Value": "" }
	    ]
	}],
	"page": {
	    "label": "Tags",
		"messages": [{
		    "message": "GetTags",
		    "behaviourId": "CmsListTag",
		    "Trigger": "submit",
		    "success": "refresh"
		}]
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
					    "label": "Tag (Sku)",
					    "componentId": "keywords",
					    "type": "text",
					    "map": [
								{"friendlyName": "value", "source": "cache.keywords" }
					    ]
					}
			    ]
			}
	    ],
	    "messages": [
            {
                "message": "GetTags",
                "behaviourId": "CmsListTag",
                "Trigger": "submitSearch",
                "success" : "<a href='/edit/#tags/index/' style='float: right;'>Back to tag search</a>"
            }
	    ]
	}, {
	    "label": "",
	    "type": "datatable",
	    "componentId": "TagList",
	    "dataCollection": "tag",
	    "map": [{
	        "friendlyName": "Name",
	        "source": "name"
	    }, {
	        "friendlyName": "Type",
	        "source": "type"
	    }, {
	        "friendlyName": "_editAction",
	        "source": "editAction"
	    }, {
	        "friendlyName": "_dataObjectId",
	        "source": "dataObjectId"
	    }
	    
	    ],
	    "csvMap": [{
	        "friendlyName": "Name",
	        "source": "name"
	    }, {
	        "friendlyName": "Type",
	        "source": "type"
	    }],
	    "actions": [{
	        "icon": "edit",
	        "url": "<%=obj.get('_editAction')%><%=obj.get('_dataObjectId')%>",
	        "name": "Edit"
	    }]
	}],
    "data": {
        "execute": [{
            "Name": "GetTags",
            "ReturnName": "tag",
            "ServiceType": "Colony.Services.Core.Abstract.Tags.ITagService, Colony.Services",
            "ServiceMethod": "searchTags",
            "ServiceMethodParams": [
                { "Key": "keywords", "Value": "" }
            ]
        }]
    }
}