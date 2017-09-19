{
    "behaviourId": "CmsEditBlog",
    "page": {
        "label": "Edit Blog Post",
        "back": "/blogs/index/?siteId=<%=App.Colony.currentSiteId%>&blogPostCategoryId=<%=App.data.blog.blogPostCategoryId || 0%>",
        "backdescription": "Blog Posts",
        "messages": [{
            "Message": "EditBlog",
            "BehaviourId": "CmsListBlog",
            "Trigger": "submit",
            "success": "redirect:/blogs/index/?siteId=<%=App.Colony.currentSiteId%>&blogPostCategoryId=<%=App.data.blog.blogPostCategoryId || 0%>"
        }]
    },    
    "componentContainer": [
        {
            "label": "",
            "type": "fieldset",
            "componentId": "BasicDetailsFieldset",
            "className": "half",
            "components": [
                {
                    "label": "Title",
                    "type": "text",
                    "componentId": "Name",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "blog.name"
                    }],
                    "validation": {
                        "required": true,
                        "maxlength": 255
                    }
                }, {
                    "label": "Author",
                    "type": "text",
                    "componentId": "Author",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "blog.author"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, {
                    "label": "Short Description",
                    "type": "textarea",
                    "componentId": "ShortDescription",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "blog.shortDescription"
                    }],
                    "validation": {
                        "maxlength": 255
                    }
                }, {
                    "label": "Image",
                    "type": "imagelibrary",
                    "componentId": "ImageAssetID",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "blog.imageAssetId"
                    }]
                }, {
                    "label": "Start Publishing",
                    "type": "datetime",
                    "componentId": "PublishStart",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "blog.publishStart"
                    }],
                    "validation": {
                        "required": true
                    }
                }, {
                    "label": "End Publishing",
                    "type": "datetime",
                    "componentId": "PublishEnd",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "blog.publishEnd"
                    }]
                }, {
                    "label": "Are comments enabled for this post?",
                    "type": "switch",
                    "componentId": "CommentsEnabled",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "blog.commentsEnabled",
                        "default": "0"
                    }]
                }, {
                    "label": "Should this blog be visible on the front-end",
                    "type": "switch",
                    "componentId": "IsVisible",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "blog.isVisible"
                    }]
                }, {
                    "label": "URI",
                    "type": "text",
                    "componentId": "URI",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "blog.uri"
                    }]
                }, {
                    "label": "Tags",
                    "type": "tags",
                    "componentId": "Tags",
                    "map": [{
                        "friendlyName": "Value",
                        "source": "blog.tags"
                    }]
                }
            ]
        },
        {
        "label": "",
        "type": "fieldset",
        "componentId": "BasicDetailsFieldset2",
        "className": "half",
        "components": [{
            "label": "Blog Content",
            "type": "richtext",
            "componentId": "LongDescription",
            "map": [{
                "friendlyName": "Value",
                "source": "blog.longDescription"
            }],
            "validation": {
                "required": true
            }
        }, {
            "label": "Window Title",
            "type": "text",
            "componentId": "WindowTitle",
            "map": [{
                "friendlyName": "Value",
                "source": "blog.windowTitle"
            }],
            "validation": {
                "maxlength": 255
            }
        }, {
            "label": "Meta Keywords",
            "type": "text",
            "componentId": "MetaKeywords",
            "map": [{
                "friendlyName": "Value",
                "source": "blog.metaKeywords"
            }],
            "validation": {
                "maxlength": 255
            }
        }, {
            "label": "Meta Description",
            "type": "textarea",
            "componentId": "MetaDescription",
            "map": [{
                "friendlyName": "Value",
                "source": "blog.metaDescription"
            }],
            "validation": {
                "maxlength": 255
            }
        }, {
            "label": "On which Sites should this blog appear",
            "type": "checkboxlist",
            "componentId": "SiteIds",
            "dataCollection": "sites",
            "map": [{
                "friendlyName": "Value",
                "source": "blog.siteIds",
                "default": "1"
            }]
        }, {
            "label": "Category",
            "type": "dropdown",
            "componentId": "BlogPostCategoryId",
            "dataCollection": "blogcategories",
            "defaultOptionText": "Root Category",
            "map": [{
                "friendlyName": "Value",
                "source": "blog.blogPostCategoryId",
                "default": "querystring.blogPostCategoryId"
            }]
        }]
    }, {
        "label": "Blog ID",
        "type": "hidden",
        "componentId": "Id",
        "map": [{
            "friendlyName": "Value",
            "source": "blog.id"
        }]
    }, {
        "label": "Language ID",
        "type": "hidden",
        "componentId": "LanguageID",
        "map": [{
            "friendlyName": "Value",
            "source": "blog.languageId",
            "default": "1"
        }]
    }, {
        "label": "Order",
        "type": "hidden",
        "componentId": "Order",
        "map": [{
            "friendlyName": "Value",
            "source": "blog.order"
        }]
    }, {
        "label": "Moderation Status ID",
        "type": "hidden",
        "componentId": "ModerationStatusID",
        "map": [{
            "friendlyName": "Value",
            "source": "blog.moderationStatusId",
            "default": "5"
        }]
    }, {
        "label": "Save",
        "type": "button",
        "componentId": "SaveButton"
    }],
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
        }, {
            "name": "Languages",
            "ServiceType": "Colony.Services.Core.Abstract.Language.ILanguageService, Colony.Services",
            "ServiceMethod": "GetAll"
        }, {
            "name": "Sites",
            "ServiceType": "Colony.Services.Core.Abstract.Sites.ISitesService, Colony.Services",
            "ServiceMethod": "GetAll"
        },
		{
		    "name": "blogcategories",
		    "ServiceType": "Colony.Modules.Blog.Services.IBlogPostsCategoriesService, Colony.Modules",
		    "ServiceMethod": "GetAll",
		    "map": {
		        "Name": "name",
		        "BlogID": "id"
		    }
		}]
    }
}