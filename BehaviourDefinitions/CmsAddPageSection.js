{
    "behaviourId": "CmsAddPageSection",
    "page": {
        "label": "Add Page Content",
        "back": "pagesections/index/?pageId=<%=App.QueryString['pageId']%>",
        "backdescription": "Page Content Sections",
        "messages": [{
            "message": "AddPageSection",
            "behaviourId": "CmsListPageSection",
            "trigger": "submit",
            "success": "redirect:/pagesections/index/?pageId=<%=App.QueryString['pageId']%>"
        }]
    },
    "componentContainer": [{
        "label": "",
        "type": "fieldset",
        "componentId": "BasicDetailsFieldset",
        "components": [{
            "label": "Please enter the content as you would wish to see it on the page.",
            "type": "richtext",
            "componentId": "HtmlContent",
            "map": [{
                "friendlyName": "Value",
                "source": "pagesection.htmlContent"
            }]
        },{
            "label": "or enter the action URI",
            "type": "text",
            "componentId": "ModuleActionURI",
            "map": [{
                "friendlyName": "Value",
                "source": "pagesection.moduleActionURI"
            }]
        }]
    },
     {
         "label": "Publish these changes after saving",
         "type": "switch",
         "componentId": "Publish",
         "map": [{
             "friendlyName": "Value",
             "source": "pagesection.publish",
             "default": "true"
         }]
     },
        {
            "label": "Page Section ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "pagesection.id"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "PageId",
            "map": [{
                "friendlyName": "Value",
                "source": "querystring.pageId"
            }]
        }, {
            "label": "Order",
            "type": "hidden",
            "componentId": "Order",
            "map": [{
                "friendlyName": "Value",
                "source": "pagesection.order"
            }]
        }, {
            "label": "Save",
            "type": "button",
            "componentId": "SaveButton"
        }
    ]
}