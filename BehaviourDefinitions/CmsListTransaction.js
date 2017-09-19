{
    "behaviourId": "CmsListTransaction",
	"messageHandlers": [{
	    "Name": "GetTransactions",
	    "ReturnName": "transaction",
	    "ServiceType": "Colony.Commerce.Services.ShopPurchase.ITransactionService, Colony.Commerce.Services",
	    "ServiceMethod": "GetForCms",
	    "ServiceMethodParams": [
			{ "Key": "OrderNumber", "Value": "" },
            { "Key": "TransactionStatusIds", "Value": "" },
            { "Key": "TransactionTypeIds", "Value": "" },
            { "Key": "PaymentMethodIds", "Value": "" },
            { "Key": "ProductTypes", "Value": "" }
	    ]
	}, {
	    "Name": "EditTransaction",
	    "ServiceType": "Colony.Commerce.Services.ShopPurchase.ITransactionService, Colony.Commerce.Services",
	    "ServiceMethod": "Update",
	    "BindEntityFromParameters": "true"
	}, {
	    "Name": "DeleteTransaction",
	    "ServiceType": "Colony.Commerce.Services.ShopPurchase.ITransactionService, Colony.Commerce.Services",
	    "ServiceMethod": "DeleteById",
	    "ServiceMethodParams": [
			{ "Key": "Id", "Value": 1 }
	    ]
	}],
	"page": {
	    "label": "Online Payments",
		"messages": [{
		    "message": "GetTransactions",
		    "behaviourId": "CmsListTransaction",
		    "Trigger": "submit",
		    "success": "refresh"
		}]
	},
	"componentContainer": [{
	    "label": "Search",
	    "type": "searchform",
	    "components": [
			{
			    "label": "keywords",
			    "type": "fieldset",
			    "componentId": "keywordsFieldset",
			    "className": "half",
			    "components": [
					{
					    "label": "Order Number",
					    "componentId": "OrderNumber",
					    "type": "text",
					    "map": [
								{"friendlyName": "value", "source": "cache.orderNumber" }
					    ]
					},
                    {
                        "label": "Order Status",
                        "componentId": "TransactionStatusIds",
                        "type": "dropdown",
                        "items": [
                            {"id": "1", "name": "Awaiting Payment" },
                            {"id": "2", "name": "Card Refused" },
                            {"id": "3", "name": "Payment Complete" },
                            {"id": "4", "name": "Received" },
                            {"id": "5", "name": "On Hold" },
                            {"id": "6", "name": "Cancelled" },
                            {"id": "7", "name": "Being Picked" },
                            {"id": "8", "name": "Dispatched" },
                            {"id": "9", "name": "3D Secure Not Enrolled" }
                        ]
                    }
			    ]
			}, 
			{
			    "label": "lists",
			    "type": "fieldset",
			    "componentId": "listsFieldset",
			    "className": "half",
			    "components": [
			    {
			        "label": "Transaction Type",
			        "componentId": "TransactionTypeIds",
			        "type": "dropdown",
			        "items": [
					    {"id": "1", "name": "Shop Purchase" }
			        ]
			    },
			    {
			        "label": "Payment Method",
			        "componentId": "PaymentMethodIds",
			        "type": "dropdown",
			        "items": [
					    {"id": "1", "name": "Not Selected" },
					    {"id": "2", "name": "DataCash Card Payment" },
					    {"id": "3", "name": "DataCash PayPal Payment" },
					    {"id": "4", "name": "PayPal Payment" }
			        ]
			    },
			    {
			        "label": "Order contains product types",
			        "componentId": "ProductTypes",
			        "type": "dropdown",
			        "items": [
					    {"id": "Samples", "name": "Samples" },
					    {"id": "Cushions", "name": "Cushions" }
			        ]
			    }
			    ]
			}
	    ],
	    "messages": [
            {
                "message": "GetTransactions",
                "behaviourId": "CmsListTransaction",
                "Trigger": "submitSearch"
            }
	    ]
	}, {
	    "label": "",
	    "type": "datatable",
	    "componentId": "TransactionList",
	    "dataCollection": "transaction",
	    "map": [{
	        "friendlyName": "Order Number",
	        "source": "orderNumber"
	    }, {
	        "friendlyName": "Order Status",
	        "source": "<% if (transactionStatusId == 1) print('Awaiting Payment'); else if (transactionStatusId == 2) print('Card Refused'); else if (transactionStatusId == 3) print('Payment Complete'); else if (transactionStatusId == 4) print('Received'); else if (transactionStatusId == 5) print('On Hold'); else if (transactionStatusId == 6) print('Cancelled'); else if (transactionStatusId == 7) print('Being Picked'); else if (transactionStatusId == 8) print('Dispatched'); else if (transactionStatusId == 9) print('3D Secure Not Enrolled');%>"
	    }, {
	        "friendlyName": "Transaction Type",
	        "source": "<% if (transactionTypeId == 1) print('Shop Purchase'); else if (transactionTypeId == 2) print('Return'); %>"
	    }, {
	        "friendlyName": "Payment Method",
	        "source": "<% if (paymentMethodId == 1) print('Not Selected'); else if (paymentMethodId == 3) print('Datacash Card Payment'); else if (paymentMethodId == 5) print('Datacash PayPal payment'); else if (paymentMethodId == 7) print('PayPal Payment');%>"
	    }, {
	        "friendlyName": "Amount (Inc. VAT)",
	        "source": "<%= Number(amountInc).toFixed(2)%>"
	    }, {
	        "friendlyName": "Amount (Ex. VAT)",
	        "source": "<%=Number(amountEx).toFixed(2)%>"
	    }, {
	        "friendlyName": "VAT",
	        "source": "<%=Number(vat).toFixed(2)%>"
	    }, {
	        "friendlyName": "Date",
	        "source": "<%=new Date(lastModified).format('dd/MM/yyyy hh:mm')%>"
	    }],
	    "csvMap": [{
	        "friendlyName": "Order Number",
	        "source": "orderNumber"
	    }, {
	        "friendlyName": "Order Status",
	        "source": "<% if (transactionStatusId == 1) print('Awaiting Payment'); else if (transactionStatusId == 2) print('Card Refused'); else if (transactionStatusId == 3) print('Payment Complete'); else if (transactionStatusId == 4) print('Received'); else if (transactionStatusId == 5) print('On Hold'); else if (transactionStatusId == 6) print('Cancelled'); else if (transactionStatusId == 7) print('Being Picked'); else if (transactionStatusId == 8) print('Dispatched'); else if (transactionStatusId == 9) print('3D Secure Not Enrolled');%>"
	    }, {
	        "friendlyName": "Transaction Type",
	        "source": "<% if (transactionTypeId == 1) print('Shop Purchase'); else if (transactionTypeId == 2) print('Return'); %>"
	    }, {
	        "friendlyName": "Payment Method",
	        "source": "<% if (paymentMethodId == 1) print('Not Selected'); else if (paymentMethodId == 3) print('Datacash Card Payment'); else if (paymentMethodId == 5) print('Datacash PayPal payment'); else if (paymentMethodId == 7) print('PayPal Payment');%>"
	    }, {
	        "friendlyName": "Amount (Inc. VAT)",
	        "source": "<%= Number(amountInc).toFixed(2)%>"
	    }, {
	        "friendlyName": "Amount (Ex. VAT)",
	        "source": "<%=Number(amountEx).toFixed(2)%>"
	    }, {
	        "friendlyName": "VAT",
	        "source": "<%=Number(vat).toFixed(2)%>"
	    }, {
	        "friendlyName": "Date",
	        "source": "<%=new Date(lastModified).format('dd/MM/yyyy hh:mm')%>"
	    }],

	    "actions": [{
	        "icon": "search",
	        "url": "/edit/#/transactions/edit/?id=<%=id%>",
	        "name": "View this Transaction"
	    }]
	}],
    "data": {
        "execute": [{
            "name": "transaction",
            "ServiceType": "Colony.Commerce.Services.ShopPurchase.ITransactionService, Colony.Commerce.Services",
            "ServiceMethod": "GetForCms",
	        "ServiceMethodParams": [
			{ "Key": "OrderNumber", "Value": "-1" },
            { "Key": "TransactionStatusIds", "Value": "" },
            { "Key": "TransactionTypeIds", "Value": "" },
            { "Key": "PaymentMethodIds", "Value": "" },
            { "Key": "ProductTypes", "Value": "" }
            ]
        }
        ]
    }
}