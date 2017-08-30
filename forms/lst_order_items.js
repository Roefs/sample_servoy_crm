/**
 * @properties={typeid:24,uuid:"4bc65d62-51c2-4769-a7f1-01a2a879f551"}
 */
function btn_newOrderItem()
{
	//start a transaction
	if(!globals.isEditing()) globals.startEditing()

	//create a new record
	forms.dlg_orderItem.controller.newRecord()

	//add the PK of the current order to the new row
	forms.dlg_orderItem.order_id = forms.frm_orders.order_id

	//show the "fake" dialog
	globals.showDialog('Edit Order Item', 3, null, null, null, null, null, null, null, null);
}

/**
 * @properties={typeid:24,uuid:"06668a63-4a0a-46fc-85a6-0a22842a8f80"}
 */
function btn_showProductDetails()
{
	if(globals.isEditing()) //we're editing - so show the editable dialog
	{
		//select the right row
		forms.dlg_orderItem.foundset.selectRecord(orderitem_id)

		//start a transaction
		if(!globals.isEditing()) globals.startEditing()

		//setup the method to execute when the dialog closes
		globals.dialog_performMethod = 'forms.lst_order_items.sub_deleteOrderItem()'

		//show the "fake" dialog
		globals.showDialog('Edit Order Item', 3, null, null, true, 'Delete Item', null, null, null, null);

	}
	else if(application.getApplicationType() == 5) //web client
	{
		//show a dialog to tell them what's going on
		globals.showForbiddenDialog('You can\'t edit order items without editing the entire order.\n\nClick the "Edit" button in the upper right to edit this order.', null, 'OK', null, null, null)
	}
}

/**
 * @properties={typeid:24,uuid:"00cefcb6-f865-42f8-9f45-dba705018eba"}
 */
function sub_deleteOrderItem()
{
	if(globals.dialog_buttonPressed == 'Delete Item')
	{
		controller.deleteRecord()
	}
}
