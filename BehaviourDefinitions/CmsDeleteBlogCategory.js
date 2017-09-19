{
    "behaviourId": "CmsDeleteBlogCategory",
    "page": {
        "label": "Delete Blog Category",
        "back": "blogcategories/index/",
        "backdescription": "Blog Categories",
        "messages": [{
            "message": "DeleteBlogCategory",
            "behaviourId": "CmsListBlogCategory",
            "trigger": "submit",
            "success": "redirect:/blogcategories/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the blog category <strong><%=App.data.blogcategory.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "blogcategory.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "blogcategory",
            "ServiceType": "Colony.Modules.Blog.Services.IBlogPostsCategoriesService, Colony.Modules",
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