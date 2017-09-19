{
    "behaviourId": "CmsDeletePageSection",
    "page": {
        "label": "Delete Page Content Section",
        "back": "pagesections/index/?pageId=<%=App.data.pagesection['pageId']%>",
        "backdescription": "Page Sections",
        "messages": [{
            "message": "DeletePageSection",
            "behaviourId": "CmsListPageSection",
            "trigger": "submit",
            "success": "redirect:/pagesections/index/?pageId=<%=App.data.pagesection['pageId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeletePageContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete this page content section?  This action cannot be undone.<% console.log(App.data.pagesection.id); %></p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "pagesection.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "Pagesection",
            "ServiceType": "Colony.Services.Core.Abstract.Pages.IPageSectionService, Colony.Services",
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