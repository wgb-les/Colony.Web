{
	"behaviourId": "CmsListBlog",
	"messageHandlers": [{
		"Name": "EditBlog",
		"ServiceType": "Colony.Modules.Blog.Services.IBlogPostsService, Colony.Modules",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "AddBlog",
		"ServiceType": "Colony.Modules.Blog.Services.IBlogPostsService, Colony.Modules",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
		"Name": "DeleteBlog",
		"ServiceType": "Colony.Modules.Blog.Services.IBlogPostsService, Colony.Modules",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}],
	"page": {
	    "label": "Blog Posts",
        "back": "/blogcategories/index/",
        "backdescription": "Blog Post Categories"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "BlogTabs",
		"actions": [{
			"icon": "plus",
			"url": "/blogs/add/?siteId=<%=App.Colony.currentSiteId%>&blogPostCategoryId=<%=App.QueryString['blogPostCategoryId']%>",
			"name": "Add Blog Post"
		}]
	}, {
		"label": "",
		"type": "datatable",
		"componentId": "BlogList",
		"dataCollection": "blog",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/blogs/edit/?id=<%=id%>",
			"name": "Edit this Blog Post"
		}, {
		    "icon": "comment",
		    "name": "View comments for this Blog Post",
		    "url": "/edit/#/blogs/comments/?dataObjectId=<%=id%>&blogPostCategoryId=<%=App.QueryString['blogPostCategoryId']%>"
		}, {
			"icon": "remove",
			"name": "Delete this Blog Post",
			"url": "/edit/#/blogs/delete/?id=<%=id%>"
		}]
	}],
	"data": {
		"execute": [{
			"name": "blog",
			"ServiceType": "Colony.Modules.Blog.Services.IBlogPostsService, Colony.Modules",
			"ServiceMethod": "GetForCms",
			"ServiceMethodParams": [
                {"Key": "siteId", "Value": "<%=App.Colony.currentSiteId%>" },
                {"Key": "blogPostCategoryId", "Value": "<%=App.QueryString['blogPostCategoryId']%>" }
                
			],
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}