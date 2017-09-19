{
    "behaviourId": "CmsApproveComment",
    "page": {
        "label": "View Comment Details",
        "back": "/blogs/comments/?dataObjectId=<%=App.data.comment.dataObjectId%>&blogPostCategoryId=<%=App.QueryString['blogPostCategoryId']%>",
        "backdescription": "Blog Comments",
        "messages": [{
            "message": "EditComment",
            "behaviourId": "CmsListBlogComment",
            "trigger": "submit",
            "success": "redirect:/blogs/comments/?dataObjectId=<%=App.data.comment.dataObjectId%>&blogPostCategoryId=<%=App.QueryString['blogPostCategoryId']%>"
        }]
    },
    "componentContainer": [
        {
            "label": "Author",
            "type": "hidden",
            "componentId": "Author",
            "map": [{
                "friendlyName": "Value",
                "source": "comment.author"
            }]
        },
        
        {
            "label": "Email",
            "type": "hidden",
            "componentId": "Email",
            "map": [{
                "friendlyName": "Value",
                "source": "comment.email"
            }]
        },
        
        {
            "label": "Data Type ID",
            "type": "hidden",
            "componentId": "DataTypeId",
            "map": [{
                "friendlyName": "Value",
                "source": "comment.dataTypeId"
            }]
        },
        
        {
            "label": "Data Object ID",
            "type": "hidden",
            "componentId": "DataObjectId",
            "map": [{
                "friendlyName": "Value",
                "source": "comment.dataObjectId"
            }]
        },
        
        {
            "label": "Source URL",
            "type": "hidden",
            "componentId": "sourceUrl",
            "map": [{
                "friendlyName": "Value",
                "source": "comment.sourceUrl"
            }]
        },
        
        {
            "label": "Status",
            "type": "dropdown",
            "componentId": "Approved",
            "items": [
                { "id": "true", "name": "Approved" },
                { "id": "false", "name": "Rejected" },
                { "id": "", "name": "Pending" }
            ],
            "map": [{
                "friendlyName": "Value",
                "source": "comment.approved"
            }]
        },

        {
            "label": "Comment Details",
            "type": "textarea",
            "componentId": "CommentText",
            "map": [{
                "friendlyName": "Value",
                "source": "comment.commentText"
            }]
        },
        {
            "label": "",
            "type": "content",
            "componentId": "ApproveCommentContentDetails",
            "map": [{
                "friendlyName": "Value",
                "source": "<p><strong>Comment posted by</strong> <%=App.data.comment.author%> (<a href='mailto:<%=App.data.comment.email%>'><%=App.data.comment.email%></a>)</p><p><a class='button icon-external-link' target='_blank' href='<%= App.data.comment.sourceUrl %>'><span></span>View original page</a>.</p>"
            }]
        }, 

        {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "comment.id"
            }]
        },
        {
            "label": "Save",
            "type": "button",
            "componentId": "SaveButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "comment",
            "ServiceType": "Colony.Services.Core.Abstract.Comments.ICommentsService, Colony.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }]
        }]
    }
}