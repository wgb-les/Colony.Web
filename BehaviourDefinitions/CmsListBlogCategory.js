{
	"behaviourId": "CmsListBlogCategory",
	"messageHandlers": [{
	    "Name": "EditBlogCategory",
		"ServiceType": "Colony.Modules.Blog.Services.IBlogPostsCategoriesService, Colony.Modules",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "AddBlogCategory",
		"ServiceType": "Colony.Modules.Blog.Services.IBlogPostsCategoriesService, Colony.Modules",
		"ServiceMethod": "Create",
		"BindEntityFromParameters": "true"
	}, {
	    "Name": "DeleteBlogCategory",
		"ServiceType": "Colony.Modules.Blog.Services.IBlogPostsCategoriesService, Colony.Modules",
		"ServiceMethod": "DeleteById",
		"ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
		]
	}, {
	    "Name": "ListBlogCategory",
	    "ServiceType": "Colony.Modules.Blog.Services.IBlogPostsCategoriesService, Colony.Modules",
	    "ServiceMethod": "GetAll"
	}],
	"page": {
		"label": "Blog Categories"
	},
	"componentContainer": [{
		"label": "",
		"type": "tablist",
		"componentId": "BlogTabs",
		"actions": [{
			"icon": "plus",
			"url": "/blogcategories/add/",
			"name": "Add Blog Post Category"
		}, {
		    "icon": "align-justify",
		    "url": "/blogs/index/?siteId=<%=App.Colony.currentSiteId%>&blogPostCategoryId=0",
		    "name": "List Root Level Blog Posts"
		}]
	}, {
		"label": "",
		"type": "treeview",
		"componentId": "BlogList",
		"dataCollection": "blogcategories",
		"map": [{
			"friendlyName": "Name",
			"source": "name"
		}],
		"actions": [{
			"icon": "pencil",
			"url": "/edit/#/blogcategories/edit/?id=<%=id%>",
			"name": "Edit this Blog Post Category"
		}, {
		    "icon": "align-justify",
		    "name": "View Blog Posts for this Blog Post Category",
		    "url": "/edit/#/blogs/index/?siteId=<%=App.Colony.currentSiteId%>&blogPostCategoryId=<%=id%>"
		}, {
		    "icon": "plus",
		    "name": "Add a child Blog Post Category beneath this Blog Post Category",
		    "url": "/edit/#/blogcategories/add/?parentId=<%=id%>"
		}, {
			"icon": "remove",
			"name": "Delete this Blog Post Category",
			"url": "/edit/#/blogcategories/delete/?id=<%=id%>"
		}]
	}],
	"data": {
		"execute": [{
			"name": "blogcategories",
			"ServiceType": "Colony.Modules.Blog.Services.IBlogPostsCategoriesService, Colony.Modules",
			"ServiceMethod": "GetAll",
			"map": [{
				"Name": "name",
				"BlogID": "id"
			}]
		}]
	}
}