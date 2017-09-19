{
    "behaviourId": "CmsDeleteJobCategory",
    "page": {
        "label": "Delete Job Category",
        "back": "jobcategories/index/",
        "backdescription": "Job Categories",
        "messages": [{
            "message": "DeleteJobCategory",
            "behaviourId": "CmsListJobCategory",
            "trigger": "submit",
            "success": "redirect:/jobcategories/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the job category <strong><%=App.data.jobcategory.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "jobcategory.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "jobcategory",
            "ServiceType": "Colony.Modules.Careers.Services.IJobCategoriesService, Colony.Modules",
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