{
	"behaviourId": "CmsEditTransaction",
	"page": {
	    "label": "View Transaction",
        "back": "#/transactions/index/",
		"backdescription": "Online Payments",
		"messages": [{
			"message": "EditTransaction",
			"behaviourId": "CmsListTransaction",
			"trigger": "submit",
			"success": "redirect:/transactions/index/"
		}]
	},
	"componentContainer": [
		{
			"label": "",
			"type": "fieldset",
			"componentId": "fieldset1",
			"components": [
				{
					"label": "Status",
					"type": "dropdown",
					"componentId": "TransactionStatusId",
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
					],
					"map": [
						{
							"friendlyName": "Value",
							"source": "transaction.transactionStatusId"
						}
					]
				}, {
					"label": "Update",
					"type": "button",
					"componentId": "SaveButton"
				}
			]
		}, {
			"label": "",
			"type": "transaction",
			"componentId": "Transaction",
			"map": [
				{
					"friendlyName": "Value",
					"source": "transaction"
				}
			]
		}
	],
	"data": {
		"execute": [{
			"name": "transaction",
			"ServiceType": "Colony.Commerce.Services.ShopPurchase.ITransactionService, Colony.Commerce.Services",
			"ServiceMethod": "GetByIdForCms",
			"ServiceMethodParams": [
				{ "Key": "id", "Value": 0 }
			]
		}]
	}
}
