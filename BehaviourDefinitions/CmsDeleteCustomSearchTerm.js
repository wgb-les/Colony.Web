{
    "behaviourId": "CmsDeleteCustomSearchTerm",
    "page": {
        "label": "Delete Search Term",
        "back": "/searchterm/index/?siteId=<%=App.data.searchterm.siteId%>",
        "backdescription": "Search Terms",
        "messages": [{
            "message": "DeleteCustomSearchTerm",
            "behaviourId": "CmsListCustomSearchTerm",
            "trigger": "submit",
            "success": "redirect:/searchterms/index/?siteId=<%=App.data.searchterm.siteId%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the search term <strong><%=App.data.searchterm.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "searchterm.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "searchterm",
            "ServiceType": "WalkerGreenbank.Modules.CustomSearch.Services.ICustomSearchTermService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "AsSeenInItemId": "id"
            }
        }]
    }
}