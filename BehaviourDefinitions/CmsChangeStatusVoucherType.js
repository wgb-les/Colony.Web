{
    "behaviourId": "CmsChangeStatusVoucherType",
    "page": {
        "label": "Change Status",
        "back": "/vouchertypes/index/",
        "backdescription": "Voucher Types",
        "messages": [{
            "message": "ChangeStatusVoucherType",
            "behaviourId": "CmsListVoucherType",
            "trigger": "submit",
            "success": "redirect:/vouchertypes/index/"
        }]
    },
    "componentContainer": [
        {
            "label": "",
            "type": "content",
            "componentId": "Content",
            "map": [{
                "friendlyName": "Value",
                "source": "<p>Are you sure you want to change the status of this voucher type?</p>"
            }]
        }, {
            "label": "ID",
            "type": "hidden",
            "componentId": "Id",
            "map": [{
                "friendlyName": "Value",
                "source": "member.id"
            }]
        }, {
            "label": "Change Status",
            "type": "button",
            "componentId": "DeleteButton"
        }
    ],
    "data": {
        "execute":[{
            "name": "Member",
            "ServiceType": "Colony.Commerce.Services.Vouchers.IVoucherTypeService, Colony.Commerce.Services",
            "ServiceMethod": "GetById",
            "ServiceMethodParams": [
                {"Key": "id", "Value": "" }
            ]
        }]
    }
}