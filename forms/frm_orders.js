/**
 * @properties={typeid:24,uuid:"8ec0341c-d0d2-4de6-ba7e-5334f824b912"}
 */
function btn_goCompany()
{
	//load the record based on the current id
	forms.frm_company.foundset.selectRecord(company_id)
	forms.lst_solution_navigation.controller.setSelectedIndex(1) //companies is 1

	//change tabs
	forms.lst_solution_navigation.btn_goForm();
}

/**
 * @properties={typeid:24,uuid:"47bc5606-6326-4812-b30b-c4585b4d409e"}
 */
function btn_goContact()
{
	//load the record based on the current id
	forms.frm_contacts.foundset.selectRecord(contact_id)
	forms.lst_solution_navigation.controller.setSelectedIndex(2) //contacts is 2

	//change tabs
	forms.lst_solution_navigation.btn_goForm();
}

/**
 * @properties={typeid:24,uuid:"cf3b3c5f-c495-4dc3-a93d-c409f28f852a"}
 */
function btn_save()
{
	//check to make sure all the fields are filled out
	if(!bill_address_id){globals.showErrorDialog('You must choose a billing address.', null, null, null, null, null); return;}
	if(!ship_address_id) {globals.showErrorDialog('You must choose a shipping address.', null, null, null, null, null); return;}
	if(!contact_id) {globals.showErrorDialog('You must choose a contact.', null, null, null, null, null); return;}
	if(!company_id) {globals.showErrorDialog('You must choose a company.', null, null, null, null, null); return;}
	if(!order_number) {globals.showErrorDialog('There must be an order number.', null, null, null, null, null); return;}
	if(!order_date) {globals.showErrorDialog('There must be an order date.', null, null, null, null, null); return;}

	_super.btn_save()

	//do sort and hilight the newly added (edited) record
	var id = forms.lst_orders.order_id
	forms.lst_orders.btn_sortAsc()
	forms.lst_orders.foundset.selectRecord(id)

	if(application.getApplicationType() == 5) onRecordSelect(); //for web client - to refresh buttons
}

/**
 * @properties={typeid:24,uuid:"5e10a4b0-3efa-4903-98d3-151c8c80eec0"}
 */
function btn_showBillAddr()
{
	//set the dialog global to the text
	globals.dialog_text = orders_to_companies.company_name + '\n' + orders_billaddr_to_addresses.address_display_calc
	globals.dialog_instructions01 = null
	globals.dialog_instructions02 = 'You can select the text and copy it to the clipboard'
	globals.showDialog('Order ' + order_number + ' Bill Address', 2, true, 'Done', null, null, null, null, null, null);
}

/**
 * @properties={typeid:24,uuid:"ae55cbd6-2caf-4895-b698-9dd9312ed56f"}
 */
function btn_showShipAddr()
{
	//set the dialog global to the text
	globals.dialog_text = orders_to_companies.company_name + '\n' + orders_shipaddr_to_addresses.address_display_calc
	globals.dialog_instructions01 = null
	globals.dialog_instructions02 = 'You can select the text and copy it to the clipboard'
	globals.showDialog('Order ' + order_number + ' Ship Address', 2, true, 'Done', null, null, null, null, null, null);
}

/**
 * @properties={typeid:24,uuid:"1ed0b73a-183c-4fb9-b63c-b18db120a520"}
 */
function doEdit()
{
	_super.doEdit()

	//make sure that we set this to 0 or if they add an item - the dialog will commit the entire transaction
	globals.okToCommit = 0

	//disable the 'jump' buttons
	elements.btn_goCompany.visible = false
	elements.btn_goContact.visible = false
	elements.btn_showBillAddr.visible = false
	elements.btn_showShipAddr.visible = false

	//hide the non combobox fields
	elements.fld_status.visible = false
	elements.fld_companyContact.visible = false
	elements.fld_billingAddress.visible = false
	elements.fld_shippingAddress.visible = false
	elements.fld_shipVia.visible = false

	//show the comboboxes
	elements.fld_statusc.visible = true
	elements.fld_companyContactc.visible = true
	elements.fld_billingAddressc.visible = true
	elements.fld_shippingAddressc.visible = true
	elements.fld_shipViac.visible = true

	//make the items editable
	sub_slideLabels();

	//if web client - then don't allow them to change the company name
	if(application.getApplicationType() == 5)
	{
		elements.companyName.visible = true
		elements.fld_companyNamec.visible = false
	}
	else
	{
		elements.companyName.visible = false
		elements.fld_companyNamec.visible = true
	}
}

/**
 * @properties={typeid:24,uuid:"f62217ba-4041-4a58-9015-4fb94c6fda13"}
 */
function evt_companyChange()
{
	contact_id = null
	bill_address_id = null
	ship_address_id = null
}

/**
 * @properties={typeid:24,uuid:"252d0576-3d54-4591-866c-402dcf81df07"}
 */
function hide_btn_reset_fields()
{
	_super.hide_btn_reset_fields()

	//enable the 'jump' buttons
	elements.btn_goCompany.visible = true
	elements.btn_goContact.visible = true
	elements.btn_showBillAddr.visible = true
	elements.btn_showShipAddr.visible = true

	//hide the comboboxes
	elements.fld_statusc.visible = false
	elements.fld_companyContactc.visible = false
	elements.fld_companyNamec.visible = false
	elements.fld_billingAddressc.visible = false
	elements.fld_shippingAddressc.visible = false
	elements.fld_shipViac.visible = false

	//show the non combobox fields
	elements.fld_status.visible = true
	elements.fld_companyContact.visible = true
	elements.companyName.visible = true
	elements.fld_billingAddress.visible = true
	elements.fld_shippingAddress.visible = true
	elements.fld_shipVia.visible = true

	sub_slideLabels();

	//make sure that we set this to 1 so the next call to the dialog will commit the entire transaction
	globals.okToCommit = 1
}

/**
 * @properties={typeid:24,uuid:"9296d2ff-65b9-481e-8203-4e1aaa5c6f56"}
 */
function onLoad()
{
	//replace some valuelist "-" stuff if we're in the web client
	if(application.getApplicationType() == 5) {
		globals.setupWcValueList('order_shipVia');
	}
}

/**
 * @properties={typeid:24,uuid:"24776242-e28b-40e6-b0f7-34cc0289aa38"}
 */
function onRecordSelect()
{
	//setup the record status
	globals.setupRecordStatus();

	//set the global curID_order to the current order_id
	globals.curID_order = order_id

	//set the global curID_contact to the current contact_id
	globals.curID_contact = contact_id

	//set the global curID_company to the current company_id
	globals.curID_company = company_id

	//setup the special tooltips on the addresses
	var billTT = 'Click the EDIT button to set the billing address'
	var shipTT = 'Click the EDIT button to set the shipping address'

	if(bill_address_id)
	{
		billTT = orders_to_companies.company_name + '\n' + orders_billaddr_to_addresses.address_display_calc
		billTT = '<html>' + utils.stringReplace(billTT, '\n', '<br>') + '</html>'
	}
	if(ship_address_id)
	{
		shipTT = orders_to_companies.company_name + '\n' + orders_shipaddr_to_addresses.address_display_calc
		shipTT = '<html>' + utils.stringReplace(shipTT, '\n', '<br>') + '</html>'
	}

	elements.fld_billingAddress.toolTipText = billTT
	elements.fld_shippingAddress.toolTipText = shipTT

	sub_slideLabels();
}

/**
 * @properties={typeid:24,uuid:"d635d74f-6de3-4fa0-be6a-5c058b561a42"}
 */
function onShow()
{
	//if there is a DB transaction pending - we're trying to make a new company contact
	//so don't lock the controller and don't hide the save/cancel buttons
	if(!globals.isEditing())
	{
		//make read only
		controller.readOnly = true

		//hide save/cancel btsn
		elements.btn_save.visible = false
		elements.btn_cancel.visible = false

		//hide the comboboxes
		elements.fld_statusc.visible = false
		elements.fld_companyContactc.visible = false
		elements.fld_companyNamec.visible = false
		elements.fld_billingAddressc.visible = false
		elements.fld_shippingAddressc.visible = false
		elements.fld_shipViac.visible = false
	}
}

/**
 * @properties={typeid:24,uuid:"1cdbd766-02ba-4729-be71-f4645c429d6d"}
 */
function print_default()
{
	rpt_printThisOrder();
}

/**
 * @properties={typeid:24,uuid:"c51f7a81-8193-4f9f-9edb-b2c9274896cf"}
 */
function rpt_printOrderReport()
{
	//load the related items for this order
	forms.rpt_order_form.controller.loadRecords(orders_to_order_items)

	forms.rpt_order_month.controller.sort('order_month_year asc, orders_to_companies.company_name asc')

	globals.printRoutine('rpt_order_form', null);
}

/**
 * @properties={typeid:24,uuid:"6213972b-f0db-4996-8be5-b9aca7398efd"}
 */
function rpt_printThisOrder()
{
	//load the related items for this order
	forms.rpt_order_form.controller.loadRecords(orders_to_order_items)

	globals.printRoutine('rpt_order_form', null)
}

/**
 * @properties={typeid:24,uuid:"f5ccecee-acfb-40d0-8dac-9cc82511edb5"}
 */
function sub_setNewOrderNumber()
{
	//set the next order number
	if(databaseManager.getFoundSetCount(foundset) == 0)
	{
		//never been an order number
		order_number = 1000
	}
	else
	{
		//sql query to get the highest invoice number = then add 1
		var query = 'select order_number from orders order by order_number desc'
		var ds = controller.getDataSource().split('/');
		var dataset = databaseManager.getDataSetByQuery(ds[1], query, null, 1)
		order_number = dataset.getValue(1, 1) + 1
	}
}

/**
 * @properties={typeid:24,uuid:"ca2ec5ef-80b2-4512-88d7-6fc3db05b5c3"}
 */
function sub_slideLabels()
{
	var i, x, y;
	//if the order is closed (is_active == 1) - don't show the add or edit buttons
	if(!globals.isEditing() || is_active == 0)
	{
		forms.lst_order_items.elements.btn_add.visible = false

		//if not the WC then hide the column and move over the labels as well
		if(application.getApplicationType() != 5)
		{
			forms.lst_order_items.elements.btn_detail.visible = false

			if(forms.lst_order_items.elements.lbl_1.getLocationX() == 29)
			{
				//move all labels to the left by 25px
				for (i = 1 ; i <= 5 ; i++ )
				{
					x = forms.lst_order_items.elements['lbl_' + i].getLocationX()-25
					y = forms.lst_order_items.elements['lbl_' + i].getLocationY()
					forms.lst_order_items.elements['lbl_' + i].setLocation(x,y)
				}

				application.updateUI()
			}
		}

	}
	else
	{
		forms.lst_order_items.elements.btn_add.visible = true
		if(application.getApplicationType() != 5)
		{
			forms.lst_order_items.elements.btn_detail.visible = true

			if(forms.lst_order_items.elements.lbl_1.getLocationX() == 4)
			{
				//move all labels to the left by 25px
				for (i = 1 ; i <= 5 ; i++ )
				{
					x = forms.lst_order_items.elements['lbl_' + i].getLocationX()+25
					y = forms.lst_order_items.elements['lbl_' + i].getLocationY()
					forms.lst_order_items.elements['lbl_' + i].setLocation(x,y)
				}

				application.updateUI()
			}
		}
	}
}

/**
 * @properties={typeid:24,uuid:"18135df0-2a18-42ea-844f-e483c023e697"}
 */
function validate_autoEnter()
{
	sub_setNewOrderNumber();
	order_date = new Date();
}

/**
 * @properties={typeid:24,uuid:"fe82eb98-b3d7-4064-83e1-b499dd1a8d26"}
 */
function validate_beforeDelete()
{
	return '0'
}
