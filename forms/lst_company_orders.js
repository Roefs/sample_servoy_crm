/**
 * @properties={typeid:24,uuid:"17f4ef37-243c-4e07-a58d-d6af98274461"}
 */
function btn_goOrder()
{
	//load the record based on the current id
	forms.frm_orders.foundset.selectRecord(order_id)
	forms.lst_solution_navigation.controller.setSelectedIndex(3) //orders is 3

	//change tabs
	forms.lst_solution_navigation.btn_goForm();
}

/**
 * @properties={typeid:24,uuid:"a20bde9e-fa2d-42c4-a5ca-ea13f2b47d64"}
 */
function btn_newOrder()
{
	var mthd;
	//make sure the company has at least ONE address & ONE contact
	var addrCnt = forms.frm_company.companies_to_addresses.getSize()
	var contCnt = forms.frm_company.companies_to_contacts.getSize()
	
	if( addrCnt > 0 && contCnt > 0)
	{
	
		//get current company ID
		var companyID = forms.frm_company.company_id
		
		//change the selected navigation record
		forms.lst_solution_navigation.controller.setSelectedIndex(3) //orders is 3
		
		//change tabs
		forms.lst_solution_navigation.btn_goForm();
		
		//if there's no transaction, start one - so they can "cancel"
		if(!globals.isEditing()) globals.startEditing()
		
		//make a new record
		forms.frm_orders.controller.newRecord(true)
		
		//do the auto-enter stuff
		forms.frm_orders.validate_autoEnter()
		forms.frm_orders.company_id = companyID
		
		databaseManager.saveData();
		
		//call the edit method so they can edit the record
		forms.frm_orders.doEdit();
		
		forms.frm_orders.controller.focusFirstField();
	}
	else if(addrCnt == 0)
	{
		//show error
		mthd = 'forms.lst_company_orders.sub_continueCreateAddr()'
		globals.showErrorDialog('There needs to be at least one address defined for this customer before you can create an order.',mthd,'OK', null, null, null)
	}
	else if(contCnt == 0)
	{
		//show error
		mthd = 'forms.lst_company_orders.sub_continueCreateContact()'
		globals.showErrorDialog('There needs to be at least one contact defined for this customer before you can create an order.',mthd,'OK', null, null, null)
	}
}

/**
 * @properties={typeid:24,uuid:"e6fe85c4-641a-4fd3-831b-b79126b6babd"}
 */
function sub_continueCreateAddr()
{
	//show address tab
	forms.frm_company.btn_tabAddress();

	//perform the method to create a new address
	forms.lst_company_addresses.btn_newAddress();
}

/**
 * @properties={typeid:24,uuid:"d8d93ddf-f221-42d5-9c83-68e5b2904d09"}
 */
function sub_continueCreateContact()
{
	//show conacts tab
	forms.frm_company.btn_tabContacts();

	//perform the method to create a new address
	forms.lst_company_contacts.btn_newContact();
}
