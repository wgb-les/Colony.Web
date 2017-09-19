{
    "behaviourId": "CmsDeleteBrandGuideline",
    "page": {
        "label": "Delete Brand Guideline",
        "back": "#/brandguidelines/index/?siteId=<%=App.Colony.currentSiteId%>",
        "backdescription": "brand guidelines",
        "messages": [{
            "message": "DeleteBrandGuideline",
            "behaviourId": "CmsListBrandGuideline",
            "trigger": "submit",
            "success": "redirect:/brandguidelines/index/?siteId=<%=App.Colony.currentSiteId%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteGuidelineContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the brand guideline <strong><%=App.data.brandguideline.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "brandguideline.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "Name": "brandguideline",
            "ServiceType": "WalkerGreenbank.Modules.PressMembers.Services.IBrandGuidelinesService, WalkerGreenbank.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [
                { "Key": "id", "Value": 0 }
            ]
        }]
    }
}