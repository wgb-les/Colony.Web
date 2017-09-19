{
    "behaviourId": "CmsListBlogComment",
	"messageHandlers": [{
	    "Name": "ApproveComment",
	    "ServiceType": "Colony.Services.Core.Abstract.Comments.ICommentsService, Colony.Services",
	    "ServiceMethod": "Approve",
	    "ServiceMethodParams": [
            { "Key": "id", "Value": 0 }
	    ]
	}, {
	    "Name": "RejectComment",
	    "ServiceType": "Colony.Services.Core.Abstract.Comments.ICommentsService, Colony.Services",
	    "ServiceMethod": "Reject",
	    "ServiceMethodParams": [
           { "Key": "id", "Value": 0 }
	    ]
	}, {
	    "Name": "ApproveBatch",
	    "ServiceType": "Colony.Services.Core.Abstract.Comments.ICommentsService, Colony.Services",
	    "ServiceMethod": "ApproveBatch",
	    "ServiceMethodParams": [
           { "Key": "ids", "Value": 0 }
	    ]
	}, {
	    "Name": "RejectBatch",
	    "ServiceType": "Colony.Services.Core.Abstract.Comments.ICommentsService, Colony.Services",
	    "ServiceMethod": "RejectBatch",
	    "ServiceMethodParams": [
           { "Key": "ids", "Value": 0 }
	    ]
	}, {
	    "Name": "EditComment",
	    "ServiceType": "Colony.Services.Core.Abstract.Comments.ICommentsService, Colony.Services",
	    "ServiceMethod": "Update",
	    "BindEntityFromParameters": "true"
	}, {
	    "Name": "SearchComment",
	    "ReturnName": "blogcomments",
	    "ServiceType": "Colony.Services.Core.Abstract.Comments.ICommentsService, Colony.Services",
	    "ServiceMethod": "CmsSearch",
	    "ServiceMethodParams": [
            {"Key": "searchCriteria", "Value": "", "IsDynamic": true }
	    ]
	}],
	"page": {
	    "label": "Blog Comments",
        "back": "/blogs/index/?siteId=<%=App.Colony.currentSiteId%>&blogPostCategoryId=<%=App.QueryString['blogPostCategoryId']%>",
        "backdescription": "Blog Posts"
	},
	"componentContainer": [
        {
            "label": "Search",
            "type": "searchform",
            "components": [
                {
                    "label": "Data Type Name",
                    "type": "hidden",
                    "componentId": "DataTypeName",
                    "map": [
                        { "friendlyName": "value", "source": "<%='Colony.Modules.Blog.Models.BlogPost'%>" }
                    ]
                },
                {
                    "label": "Data Type Name",
                    "type": "hidden",
                    "componentId": "DataObjectId",
                    "map": [
                        { "friendlyName": "value", "source": "<%=App.QueryString['dataObjectId']%>" }
                    ]
                },
                {
                    "label": "keywords",
                    "type": "fieldset",
                    "componentId": "keywordsFieldset",
                    "className": "half",
                    "components": [
                        {
                            "label": "Enter keywords",
                            "componentId": "Keywords",
                            "type": "text",
                            "map": [
                                    {"friendlyName": "value", "source": "cache.keywords" }
                            ]
                        },
                        {
                            "label": "Comment Status",
                            "componentId": "Status",
                            "type": "dropdown",
                            "items": [
                                {"id": "", "name": "Pending" },
                                {"id": "1", "name": "Approved" },
                                {"id": "0", "name": "Rejected" }                                
                            ],
                            "map": [
                                    {"friendlyName": "value", "source": "cache.commentStatus" }
                            ]
                        }
                    ]
                }
            ],
            "messages": [
                {
                    "message": "SearchComment",
                    "behaviourId": "CmsListBlogComment",
                    "Trigger": "submitSearch"
                }
            ]
        },
        {
	    "label": "",
	    "type": "datatable",
	    "componentId": "BlogCommentsList",
	    "dataCollection": "blogcomments",
	    "map": [{
	        "friendlyName": "Date",
	        "source": "<%=$.datepicker.formatDate('dd/mm/yy', new Date(obj.commentDate)) + ' ' + obj.commentDate.substring(obj.commentDate.indexOf('T') + 1, obj.commentDate.indexOf('T') + 6)%>"
	    },{
	        "friendlyName": "Email",
	        "source": "email"
	    },{
	        "friendlyName": "Comment",
	        "source": "commentText"
	    }],
	    "actions": [{
	        "icon": "pencil",
	        "url":  "/edit/#/comments/view/?id=<%=id%>&blogPostCategoryId=<%=App.QueryString['blogPostCategoryId']%>",
	        "name": "View comment details"
	    }],
	    "batchactions": [{
	        "icon": "ok",
	        "name": "Approve",
	        "messages": [{
	            "message": "ApproveBatch",
	            "behaviourId": "CmsListBlogComment"
	        }]
	    }, {
	            "icon": "remove",
	            "name": "Reject",
	            "messages": [{
	                "message": "RejectBatch",
	                "behaviourId": "CmsListBlogComment"
	            }]
	        }]
	    }],
	    "data": {
	        "execute": [{
	            "name": "blogcomments",
	            "ServiceType": "Colony.Services.Core.Abstract.Comments.ICommentsService, Colony.Services",
	            "ServiceMethod": "GetForCms",
	            "ServiceMethodParams": [
                    {"Key": "dataTypeName", "Value": "Colony.Modules.Blog.Models.BlogPost" },
                    {"Key": "dataObjectId", "Value": 0 }
	            ],
	            "map": [{
	                "Name": "name",
	                "CommentID": "id"
	            }]
	        }]
	    }
	}