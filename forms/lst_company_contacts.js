/**
 * @properties={typeid:24,uuid:"1a1c12ee-b4d8-481f-a55c-99ceadfc9864"}
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
 * @properties={typeid:24,uuid:"abfbbc69-fb3a-4b95-924c-6f113106826a"}
 */
function btn_newContact()
{
	//get current company ID
	var companyID = forms.frm_company.company_id

	//change the selected navigation record
	forms.lst_solution_navigation.controller.setSelectedIndex(2) //contacts is 2

	//change tabs
	forms.lst_solution_navigation.btn_goForm();

	//if there's no transaction, start one - so they can "cancel"
	if(!globals.isEditing()) globals.startEditing()

	//make a new record
	forms.frm_contacts.controller.newRecord(true)

	forms.frm_contacts.company_id = companyID

	databaseManager.saveData();

	//call the edit method so they can edit the record
	forms.frm_contacts.doEdit();

	forms.frm_contacts.controller.focusFirstField();
}

/**
 * @properties={typeid:24,uuid:"42787eed-cc19-457a-9940-c48b606e985c"}
 */
function btn_sendEmail()
{
	application.showURL('mailto:' + email)
}
