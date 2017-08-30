/**
 * @properties={typeid:24,uuid:"39cf7a78-fb86-46b1-88cf-d49438f6eaeb"}
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
 * @properties={typeid:24,uuid:"cba9beed-ea11-4da5-ad27-c45096e545ad"}
 */
function btn_save()
{
	_super.btn_save()

	//do sort and hilight the newly added (edited) record
	var id = forms.lst_contacts.contact_id
	forms.lst_contacts.btn_sortAsc()
	forms.lst_contacts.foundset.selectRecord(id)

	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) onRecordSelect(); //for web client - to refresh buttons
}

/**
 * @properties={typeid:24,uuid:"b1ea07de-bbde-4aaf-a0bc-2a393b93db9b"}
 */
function btn_sendEmail()
{
	if(email) application.showURL( 'mailto:' + email, '_blank')
	
}

/**
 * @properties={typeid:24,uuid:"2b1603b3-87cc-42c4-9d0d-0316d703b665"}
 */
function doEdit()
{
	_super.doEdit()

	//enable the list of addresses so it can be changed
	elements.tabs_addressList.enabled = true

	//hide the non combobox fields
	elements.fld_status.visible = false
	elements.fld_contactType.visible = false

	//show the comboboxes
	elements.fld_statusc.visible = true
	elements.fld_contactTypec.visible = true

	//if the LAN then show the popup menu when editing
//	if(application.getApplicationType() < 5) - not needed anymore
	{
		elements.fld_title.visible = false
		elements.fld_titlec.visible = true //lan only
	}

	//hide the buttons that will screw things up
	elements.btn_sendEmail.visible = false
	elements.btn_goCompany.visible = false
}

/**
 * @properties={typeid:24,uuid:"fef3c255-4da3-42c9-a38f-0b300080bb95"}
 */
function hide_btn_reset_fields()
{
	_super.hide_btn_reset_fields()

	//disable the list of addresses
	elements.tabs_addressList.enabled = false

	//hide the comboboxes
	elements.fld_statusc.visible = false
	elements.fld_contactTypec.visible = false
	elements.fld_titlec.visible = false

	//show the non combobox fields
	elements.fld_status.visible = true
	elements.fld_contactType.visible = true
	elements.fld_title.visible = true

	//show the buttons
	elements.btn_sendEmail.visible = true
	elements.btn_goCompany.visible = true
}

/**
 * @properties={typeid:24,uuid:"3cd4326f-42f6-42d4-a898-33ee38d2ba26"}
 */
function onRecordSelect()
{
	//setup the record status
	globals.setupRecordStatus();

	//set the global curID_contact to the current contact_id
	globals.curID_contact = contact_id

	//set the global curID_company to the current company_id
	globals.curID_company = company_id

	//setup or dim the buttons on the form based on field contents
	if(email)
	{
		elements.btn_sendEmail.imageURL = 'media:///sm_contract_whiteBg.gif';
	}
	else
	{
		elements.btn_sendEmail.imageURL = 'media:///nav_right_grey_whiteBg.gif';
	}
}

/**
 * @properties={typeid:24,uuid:"5c5c95ff-bf03-4adf-b42e-dbcc9e522085"}
 */
function onShow()
{
	//if there is a DB transaction pending - we're trying to make a new company contact
	//so don't lock the controller and don't hide the save/cancel buttons
	if(!globals.isEditing())
	{
		//make read only
		controller.readOnly = true

		//make the tab for changing addresses readonly
		elements.tabs_addressList.enabled = false

		//hide save/cancel btsn
		elements.btn_save.visible = false
		elements.btn_cancel.visible = false
	}

	//hide the comboboxes
	elements.fld_statusc.visible = false
	elements.fld_contactTypec.visible = false
	elements.fld_titlec.visible = false
}

/**
 * @properties={typeid:24,uuid:"214167a6-aa46-44a7-a57c-e13ff033d365"}
 */
function print_default()
{
	rpt_contacts_list();
}

/**
 * @properties={typeid:24,uuid:"b2f85ad0-9e20-4157-abf0-c663b97914f6"}
 * @AllowToRunInFind
 */
function rpt_contacts_list()
{
	forms.rpt_contacts_list.controller.loadAllRecords()

	forms.rpt_contacts_list.controller.sort('contacts_to_companies.company_name asc, name_last asc, name_first asc')

	globals.printRoutine('rpt_contacts_list', null)
}

/**
 * @properties={typeid:24,uuid:"8bca077c-ef60-4834-ad86-085be7d00ca1"}
 */
function sub_showContactOrders()
{
	//go to related order records with this contact on it
	forms.frm_orders.controller.loadRecords(contacts_to_orders)
	forms.lst_orders.controller.loadRecords(contacts_to_orders)

	//navigate to the orders tab
	forms.lst_solution_navigation.controller.setSelectedIndex(3) //orders is 3

	//change tabs
	forms.lst_solution_navigation.btn_goForm();


	//do the show all button routine
	forms.frm_nav_buttons.sub_showShowAll();
}

/**
 * @properties={typeid:24,uuid:"96e23855-8d69-47e0-94e1-c9868c436131"}
 */
function validate_beforeDelete()
{
	var ord = contacts_to_orders.getSize()

	if(ord > 0)
	{
		//show dialog and return 1
		//show the tabpanel "dialog"
		globals.showErrorDialog("You can't delete a contact is referenced on one or more orders.\n\nChange the contact on the orders first.", 'forms.frm_contacts.sub_showContactOrders()','OK', null, null, null);
		return 1
	}
	else
	{
		return 0
	}
}
