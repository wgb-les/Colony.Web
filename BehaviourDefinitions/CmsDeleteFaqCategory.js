{
    "behaviourId": "CmsDeleteFaqCategory",
    "page": {
        "label": "Delete FAQ Category",
        "back": "faqcategories/index/",
        "backdescription": "FAQ Categories",
        "messages": [{
            "message": "DeleteFaqCategory",
            "behaviourId": "CmsListFaqCategory",
            "trigger": "submit",
            "success": "redirect:/faqcategories/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteFaqContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the FAQ category <strong><%=App.data.faqcategory.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "faqcategory.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "faqcategory",
            "ServiceType": "Colony.Modules.FAQs.Services.IFAQCategoriesService, Colony.Modules",
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