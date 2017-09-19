{
    "behaviourId": "CmsDeletePage",
    "page": {
        "label": "Delete Page",
        "back": "pages/index/?siteId=<%=App.data.page['siteId']%>",
        "backdescription": "Site Structure",
        "messages": [{
            "message": "DeletePage",
            "behaviourId": "CmsListPage",
            "trigger": "submit",
            "success": "redirect:/pages/index/?siteId=<%=App.data.page['siteId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeletePageContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the page <strong><%=App.data.page.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "page.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "Page",
            "ServiceType": "Colony.Services.Core.Abstract.Pages.IPageService, Colony.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "PageID": "id"
            }
        }]
    }
}