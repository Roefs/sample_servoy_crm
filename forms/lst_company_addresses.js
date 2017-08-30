/**
 * @properties={typeid:24,uuid:"8f995da8-f62a-44ce-beff-b044906b1b7b"}
 */
function btn_newAddress()
{
	//get current company ID
	var companyID = forms.frm_company.company_id

	//if there's no transaction, start one - so they can "cancel"
	if(!globals.isEditing()) globals.startEditing()

	//make a new record
	forms.dlg_address.controller.newRecord(true)

	forms.dlg_address.company_id = companyID

	databaseManager.saveData();

	//show the "fake" dialog
	globals.showDialog('New Address', null, null, null, null, null, null, null, null, null);

	//go first field
	forms.dlg_address.controller.focusFirstField()
}

/**
 * @properties={typeid:24,uuid:"1132d01a-740c-4c18-9423-09252fe7e3ab"}
 */
function btn_showAddress()
{
	//select the right row
	forms.dlg_address.foundset.selectRecord(address_id)

	//start a transaction
	if(!globals.isEditing()) globals.startEditing()

	//setup the method to execute when the dialog closes
	globals.dialog_performMethod = 'forms.lst_company_addresses.sub_deleteAddressItem()'

	//show the "fake" dialog
	globals.showDialog('Edit Address', 1, null, null, true, 'Delete Item', null, null, null, null);
}

/**
 * @properties={typeid:24,uuid:"f97c3543-e3cf-431c-9af6-0329daf3e489"}
 */
function sub_deleteAddressItem()
{
	if(globals.dialog_buttonPressed == 'Delete Item')
	{
		//check to make sure that the address in question isn't used on any orders
		var bAdrCnt = addresses_to_orders_billing.getSize()
		var sAdrCnt = addresses_to_orders_shipping.getSize()

		if(bAdrCnt == 0 && sAdrCnt == 0)
		{
			controller.deleteRecord()
		}
		else
		{
			//there are orders that use this address
			var msg = 'There are orders that use this address as a shipping or billing address.' +
			' Change the orders to a new address, then you can delete this address.'
			globals.showErrorDialog(msg,'forms.frm_company.sub_showCompanyOrders()','OK', null, null, null)
		}
	}
}
