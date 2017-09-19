{
	"area": "Content",
	"module": "news",
	"action": "index",
	"visibleInMenu": true,
	"name": "News",
	"behaviourId": "CmsListNews",
	"messageHandlers":
	[{
		"Name": "EditNews",
		"ServiceType": "Colony.Modules.News.Services.INewsArticlesService, Colony.Modules.News",
		"ServiceMethod": "Update",
		"BindEntityFromParameters": "true"
	}],
	"componentContainer": 
	[	
		{
			"schema": {
				"label":"News Articles",
				"type": "containers/page"
			},
			"componentId": "ListNewsArticlesPage",
			"components": [
				{
					"schema": {
						"label":"",
						"type": "containers/tablist"
					},
					"componentId": "NewsTabs",
					"actions": [
						{ "icon": "plus-sign", "url": "/edit/#/news/add/", "name": "Add News Article" }
					]
				},
				{
					"schema": {
						"label":"",
						"type": "containers/datatable"
					},
					"componentId": "NewsList",
					"dataCollection": "newsArticle",
					"map": [
						{"friendlyName": "Name", "source": "name" }
					],
					"actions": [
						{ "icon": "pencil", "url": "/edit/#/news/edit/?id=<%=id%>", "name": "Edit News Article" }                        
					]
				}
			]
		}
	],
	"data": 
	{
		"execute": [{
			"name": "blog",
			"ServiceType": "Colony.Modules.News.Services.INewsArticlesService, Colony.Modules.News",
			"ServiceMethod": "GetAll",
			"map": [{
				"Name" : "name",
				"NewsArticleID" : "id"
			}]
		}]
	}
}