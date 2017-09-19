{
    "behaviourId": "CmsDeleteJob",
    "page": {
        "label": "Delete Job",
        "back": "jobs/index/?siteId=<%=App.Colony.currentSiteId%>&jobCategoryId=<%=App.data.job['jobCategoryId'] || 0%>",
        "backdescription": "jobs",
        "messages": [{
            "message": "DeleteJob",
            "behaviourId": "CmsListJob",
            "trigger": "submit",
            "success": "redirect:/jobs/index/?siteId=<%=App.Colony.currentSiteId%>&jobCategoryId=<%=App.data.job['jobCategoryId'] || 0%>"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "DeleteBlogContent",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to delete the job <strong><%=App.data.job.name%></strong>?  This action cannot be undone.</p>"
            }]
        }, {
            "label": "Page ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "job.id"
            }]
        }, {
            "label": "Delete",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute": [{
            "name": "job",
            "ServiceType": "Colony.Modules.Careers.Services.IJobsService, Colony.Modules",
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