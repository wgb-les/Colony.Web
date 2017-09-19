{
	"behaviourId": "CmsListVoucher",
	"page": { 
	    "label": "Vouchers",
        "back": "/vouchertypes/index/",
        "backdescription": "Voucher Types"
	},
	"componentContainer": [
        {
        "label": "",
        "type": "datatable",
        "componentId": "CmsListVoucher",
        "dataCollection": "vouchers",
        "map": [{
            "friendlyName": "Code",
            "source": "code"
        }, {
            "friendlyName": "Last Use",
            "source": "lastUse"
        },{
            "friendlyName": "Start Date",
            "source": "<%=$.datepicker.formatDate('dd/mm/yy', new Date(startTime))%>"
		},{
            "friendlyName": "end Date",
            "source": "<%=$.datepicker.formatDate('dd/mm/yy', new Date(endTime))%>"
		}],
        "csvMap": [{
            "friendlyName": "Code",
            "source": "code"
        }, {
            "friendlyName": "Last Use",
            "source": "lastUse"
        },{
            "friendlyName": "Start Date",
            "source": "<%=$.datepicker.formatDate('dd/mm/yy', new Date(startTime))%>"
		},{
            "friendlyName": "end Date",
            "source": "<%=$.datepicker.formatDate('dd/mm/yy', new Date(endTime))%>"
		}]

    }],
	"data": {
		"execute": [{
			"name": "vouchers",
			"ServiceType": "Colony.Commerce.Services.Vouchers.IVoucherService, Colony.Commerce.Services",
			"ServiceMethod": "GetByType",
            "ServiceMethodParams": [
               {
                   "Key": "voucherTypeID",
                   "Value": "<%=App.QueryString['voucherTypeID']%>"
               }
            ]

		}]
	}
}