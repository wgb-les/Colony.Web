{
    "behaviourId": "CmsAddRedirect",
    "page": {
        "label": "Add Redirect",
        "back": "/redirects/index/?siteId=<%=App.QueryString['siteId']%>",
        "backdescription": "Redirects",
        "messages": [{
            "message": "AddRedirect",
            "behaviourId": "CmsListRedirect",
            "trigger": "submit",
            "success": "redirect:/redirects/index/?siteId=<%=App.QueryString['siteId']%>"
        }]
    },
    "componentContainer": [{
        "label": "Old URL",
        "type": "text",
        "componentId": "OldUrl",
        "map": [{
            "friendlyName": "Value",
            "source": "redirect.oldUrl"
        }],
        "validation": {
            "required": true,
            "maxlength": 255
        }
    }, {
        "label": "New URL",
        "type": "text",
        "componentId": "NewUrl",
        "map": [{
            "friendlyName": "Value",
            "source": "redirect.newUrl"
        }],
        "validation": {
            "required": true,
            "maxlength": 255
        }
    }, {
        "label": "What type of redirect is this",
        "type": "dropdown",
        "componentId": "Type",
        "map": [{
            "friendlyName": "Value",
            "source": "redirect.type"
        }],
        "items": [
            {"id": "1", "name": "Permanent" },
            {"id": "2", "name": "Temporary" }
        ],
        "validation": {
            "required": true
        }
    }, {
        "label": "Site ID",
        "type": "hidden",
        "componentId": "SiteId",
        "map": [{
            "friendlyName": "Value",
            "source": "querystring.siteId"
        }]
    }, {
        "label": "Redirect ID",
        "type": "hidden",
        "componentId": "Id",
        "map": [{
            "friendlyName": "Value",
            "source": "redirect.id"
        }]
    }, {
        "label": "Save",
        "type": "button",
        "componentId": "SaveButton"
    }
    ]
}