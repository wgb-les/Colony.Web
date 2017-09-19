{
    "behaviourId": "CmsEditPageSection",
    "page": {
        "label": "Edit Page Content",
        "back": "pagesections/index/?id=<%=App.QueryString['id']%>",
        "backdescription": "Page Content Sections",
        "messages": [{
            "message": "EditPageSection",
            "behaviourId": "CmsListPageSection",
            "trigger": "submit",
            "success": "redirect:/pagereviews/editfromedit/?pageId=<%=App.QueryString['pageId']%>"
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
                "source": "pagesection.moduleActionUri"
            }]
        }, {
            "label": "Publish these changes after saving",
            "type": "switch",
            "componentId": "Publish",
            "map": [{
                "friendlyName": "Value",
                "source": "pagesection.publish",
                "default": "true"
            }]
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
                "source": "pagesection.pageId"
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
    ],
    "data": {
        "execute": [{
            "name": "Pagesection",
            "ServiceType": "Colony.Services.Core.Abstract.Pages.IPageSectionService, Colony.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [{
                "Key": "id",
                "Value": 1
            }],
            "map": {
                "Name": "name",
                "PageID": "id"
            }
        }]
    }
}