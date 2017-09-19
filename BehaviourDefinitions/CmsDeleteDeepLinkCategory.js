{
    "behaviourId": "CmsDeleteDeepLinkCategory",
    "page": {
        "label": "Delete Deep Link Category",
        "back": "deeplinkcategories/index/",
        "backdescription": "Deep Link Categories",
        "messages": [{
            "message": "DeleteDeepLinkCategory",
            "behaviourId": "CmsListDeepLinkCategory",
            "trigger": "submit",
            "success": "redirect:/deeplinkcategories/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the deep link category <strong><%=App.data.deeplinkcategory.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "deeplinkcategory.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "deeplinkcategory",
            "ServiceType": "Colony.Services.Core.Abstract.DeepLinks.IDeepLinkCategoryService, Colony.Services",
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