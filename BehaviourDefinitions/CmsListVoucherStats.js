{
	"behaviourId": "CmsListVoucherStats",
	"page": { 
	    "label": "Voucher Type Stats",
        "back": "/vouchertypes/index/",
        "backdescription": "Voucher Types"
	},
	"componentContainer": [{
        "label": "",
        "type": "datatable",
        "componentId": "VoucherStatsList",
        "dataCollection": "voucherstats",
		"map": [{
            "friendlyName": "Number of Vouchers",
            "source": "numberOfVouchers"
        }, {
            "friendlyName": "Number of Used Vouchers",
            "source": "numberOfUsedVouchers"
        }, {
            "friendlyName": "Transactional Value",
            "source": "transactionsValue"
        }]
    },{
		"label": "Transactions Title",
		"Type": "content",
		"componentId": "transactionsTitle",
		"map": [{
            "friendlyName": "Value",
            "source": "<h2>Transactions list</h2><%=App.data.voucherstats.id%>"
        }]
	},{
        "label": "Transactions",
        "type": "datatable",
        "componentId": "VoucherStatsTransactions",
        "dataCollection": "voucherstats[0].transactions",
		"map": [{
            "friendlyName": "First Name",
            "source": "customerFirstName"
        }, {
            "friendlyName": "Last Name",
            "source": "customerLastName"
        }, {
            "friendlyName": "Order Number",
            "source": "orderNumber"
        }]
		
	}],
	"data": {
		"execute": [{
			"name": "voucherstats",
			"ServiceType": "Colony.Commerce.Services.Vouchers.IVoucherStatsService, Colony.Commerce.Services",
			"ServiceMethod": "GetStatsByVoucherType",
			"ServiceMethodParams": [
                {"Key": "id", "Value": 1 }
            ]
		}]
	}
}