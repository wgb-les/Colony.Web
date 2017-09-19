{
    "behaviourId": "CmsListFaq",
    "messageHandlers": [{
        "Name": "EditFaq",
        "ServiceType": "Colony.Modules.FAQs.Services.IFAQsService, Colony.Modules",
        "ServiceMethod": "Update",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "AddFaq",
        "ServiceType": "Colony.Modules.FAQs.Services.IFAQsService, Colony.Modules",
        "ServiceMethod": "Create",
        "BindEntityFromParameters": "true"
    }, {
        "Name": "DeleteFaq",
        "ServiceType": "Colony.Modules.FAQs.Services.IFAQsService, Colony.Modules",
        "ServiceMethod": "DeleteById",
        "ServiceMethodParams": [
            { "Key": "Id", "Value": 1 }
        ]
    }],
    "page": {
        "label": "FAQs",
        "back": "/faqcategories/index/",
        "backdescription": "FAQ Categories"
    },
    "componentContainer": [{
        "label": "",
        "type": "tablist",
        "componentId": "FaqTabs",
        "actions": [{
            "icon": "plus",
            "url": "#/faqs/add/?faqCategoryId=<%=App.QueryString['faqCategoryId']%>",
            "name": "Add FAQ"
        }]
    }, {
        "label": "",
        "type": "datatable",
        "componentId": "FaqList",
        "dataCollection": "faq",
        "map": [{
            "friendlyName": "Name",
            "source": "name"
        }],
        "actions": [{
            "icon": "pencil",
            "url": "/edit/#/faqs/edit/?id=<%=id%>",
            "name": "Edit FAQ"
        }, {
            "icon": "remove",
            "name": "Delete this FAQ",
            "url": "/edit/#/faqs/delete/?id=<%=id%>"
        }]
    }],
    "data": {
        "execute": [{
            "name": "faq",
            "ServiceType": "Colony.Modules.FAQs.Services.IFAQsService, Colony.Modules",
            "ServiceMethod": "GetForCms",
            "ServiceMethodParams": [
                {"Key": "siteId", "Value": "<%=App.Colony.currentSiteId%>" },
                {"Key": "faqCategoryId", "Value": "<%=App.QueryString['faqCategoryId']%>" }
 
            ],
            "map": [{
                "Name": "name",
                "BlogID": "id"
            }]
        }]
    }
}