{
    "behaviourId": "CmsDeleteFaq",
    "page": {
        "label": "Delete FAQ",
        "back": "faqs/index/?siteId=<%=App.Colony.currentSiteId%>&faqCategoryId=<%=App.data.faq.faqCategoryId || 0%>",
        "backdescription": "FAQs",
        "messages": [{
            "message": "DeleteFaq",
            "behaviourId": "CmsListFaq",
            "trigger": "submit",
            "success": "redirect:/faqs/index/?siteId=<%=App.Colony.currentSiteId%>&faqCategoryId=<%=App.data.faq.faqCategoryId || 0%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the FAQ <strong><%=App.data.faq.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "faq.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "faq",
            "ServiceType": "Colony.Modules.FAQs.Services.IFAQsService, Colony.Modules",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "BlogID": "id"
            }
        }]
    }
}