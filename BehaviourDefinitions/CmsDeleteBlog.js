{
    "behaviourId": "CmsDeleteBlog",
    "page": {
        "label": "Delete Blog Post",
        "back": "/blogs/index/?siteId=<%=App.Colony.currentSiteId%>&blogPostCategoryId=<%=App.data.blog['blogPostCategoryId'] || 0%>",
        "backdescription": "Blog Posts",
        "messages": [{
            "message": "DeleteBlog",
            "behaviourId": "CmsListBlog",
            "trigger": "submit",
            "success": "redirect:/blogs/index/?siteId=<%=App.Colony.currentSiteId%>&blogPostCategoryId=<%=App.data.blog['blogPostCategoryId'] || 0%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the blog post <strong><%=App.data.blog.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "blog.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "blog",
            "ServiceType": "Colony.Modules.Blog.Services.IBlogPostsService, Colony.Modules",
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