/**
 * @properties={typeid:24,uuid:"222c04c2-4bd1-42dd-bfeb-5b2cf0fd6c2a"}
 */
function btn_openURL()
{
	if(company_url) 
	{
		var url = company_url

		//not empty - check for http
		if(url.indexOf('http://') < 0) url = 'http://' + url

		application.showURL( url, '_blank')
	}
}

/**
 * @properties={typeid:24,uuid:"97a89a42-cb31-4cc1-8ffa-c07a6c90d9f0"}
 */
function btn_save() {
	_super.btn_save()

	//do sort and hilight the newly added (edited) record
	var id = forms.lst_company.company_id
	forms.lst_company.btn_sortAsc()
	forms.lst_company.foundset.selectRecord(id)

	if(application.getApplicationType() == 5) onRecordSelect(); //for web client - to refresh buttons
}

/**
 * @properties={typeid:24,uuid:"c25916cb-e060-4424-9617-2ce8e4b0dfa7"}
 */
function btn_sendEmail()
{
	if(company_email) application.showURL( 'mailto:' + company_email, '_blank');
}

/**
 * @properties={typeid:24,uuid:"28658f60-89d3-4793-b052-93e94d8ef61c"}
 */
function btn_tabAddress()
{
	if(!globals.isEditing()) //if there is a transaction - we're editing something
	{
		tabs_dimAll()
		elements.lbl_tabAddr.bgcolor = '#666666'

		if(elements.tabs_mainPanel.tabIndex != 2)
		{
			elements.tabs_mainPanel.tabIndex = 2
		}
	}
}

/**
 * @properties={typeid:24,uuid:"2ed9d5be-a5e5-4bef-996a-5acb112ee27c"}
 */
function btn_tabContacts()
{
	if(!globals.isEditing()) //if there is a transaction - we're editing something
	{
		tabs_dimAll()
		elements.lbl_tabContacts.bgcolor = '#666666'

		if(elements.tabs_mainPanel.tabIndex != 1)
		{
			elements.tabs_mainPanel.tabIndex = 1
		}
	}
}

/**
 * @properties={typeid:24,uuid:"0f7ce0d8-cbb9-42a0-8509-08684a423837"}
 */
function btn_tabOrders()
{
	if(!globals.isEditing()) //if there is a transaction - we're editing something
	{
		tabs_dimAll()
		elements.lbl_tabOrders.bgcolor = '#666666'
		if(elements.tabs_mainPanel.tabIndex != 3)
		{
			elements.tabs_mainPanel.tabIndex = 3
		}
	}
}

/**
 * @properties={typeid:24,uuid:"dff5289b-4305-45cb-8d9f-c8af4f91bfc2"}
 */
function btn_tabTop5()
{
	if(!globals.isEditing()) //if there is a transaction - we're editing something
	{
		if(companies_to_orders.getSize() > 0)
		{
			//there are orders - so navigate to the tab
			tabs_dimAll()
			if(elements.tabs_mainPanel.tabIndex != 4)
			{
				elements.tabs_mainPanel.tabIndex = 4
				//elements.tab_top5.bgcolor = '#666666'
				elements.lbl_tabTop5.bgcolor = '#666666'
			}
		}
		else
		{
			//show dialog
			globals.showInfoDialog('There are no orders for this company.', null, null, null, null, null)
			btn_tabOrders();
		}
	}
}

/**
 * @properties={typeid:24,uuid:"d1a4d0c6-b6a7-4b08-b42a-aa281e23cb93"}
 */
function doEdit()
{
	_super.doEdit()

	//hide the non combobox fields
	elements.fld_companyCategory.visible = false
	elements.fld_companyIndustry.visible = false
	elements.fld_companyType.visible = false
	elements.fld_accountmanager.visible = false
	elements.fld_status.visible = false

	//show the comboboxes
	elements.fld_companyCategoryc.visible = true
	elements.fld_companyIndustryc.visible = true
	elements.fld_companyTypec.visible = true
	elements.fld_accountmanagerc.visible = true
	elements.fld_statusc.visible = true

	//hide the buttons that will mess things up
	elements.btn_openURL.visible = false
	elements.btn_sendEmail.visible = false

	//disable the navpanel at the bottom
	elements.tabs_mainPanel.enabled = false

	//for web client - disable the form showing in the tabpanel at the bottom
	if(application.getApplicationType() == 5)
	{
		/** @type Number*/
		var idx = elements.tabs_mainPanel.tabIndex;
		var frm =  elements.tabs_mainPanel.getTabFormNameAt(idx)
		forms[frm].controller.enabled = false
		forms[frm].controller.readOnly = true
	}
}

/**
 * @properties={typeid:24,uuid:"251dd3ab-8290-49ea-b0ef-5f1d09b31cb8"}
 */
function hide_btn_reset_fields()
{
	_super.hide_btn_reset_fields()

	//hide the comboboxes
	elements.fld_companyCategoryc.visible = false
	elements.fld_companyIndustryc.visible = false
	elements.fld_companyTypec.visible = false
	elements.fld_accountmanagerc.visible = false
	elements.fld_statusc.visible = false

	//show the non combobox fields
	elements.fld_companyCategory.visible = true
	elements.fld_companyIndustry.visible = true
	elements.fld_companyType.visible = true
	elements.fld_accountmanager.visible = true
	elements.fld_status.visible = true

	//show the buttons 
	elements.btn_openURL.visible = true
	elements.btn_sendEmail.visible = true

	//enable the navpanel at the bottom
	elements.tabs_mainPanel.enabled = true

	//for web client - enable the form showing in the tabpanel at the bottom
	if(application.getApplicationType() == 5)
	{
		/** @type Number*/
		var idx = elements.tabs_mainPanel.tabIndex;
		var frm =  elements.tabs_mainPanel.getTabFormNameAt(idx);
		forms[frm].controller.enabled = true
		forms[frm].controller.readOnly = false
	}
}

/**
 * @properties={typeid:24,uuid:"e1c32c49-7215-4ab9-9077-503ef9841425"}
 */
function onLoad()
{
	tabs_dimAll()
	//elements.tab_contacts.bgcolor = '#666666'
	elements.lbl_tabContacts.bgcolor = '#666666'
}

/**
 * @properties={typeid:24,uuid:"ea297b91-9c80-4622-a5dc-61cfa490aa1e"}
 */
function onRecordSelect()
{
	//setup the record status
	globals.setupRecordStatus();

	//set the global curID_company to the current company_id
	globals.curID_company = company_id

	//setup or dim the buttons on the form based on field contents
	if(company_url)
	{
		elements.btn_openURL.imageURL = 'media:///sm_earth.gif';
	}
	else
	{
		elements.btn_openURL.imageURL = 'media:///nav_right_grey_whiteBg.gif';
	}

	if(company_email)
	{
		elements.btn_sendEmail.imageURL = 'media:///sm_contract_whiteBg.gif';
	}
	else
	{
		elements.btn_sendEmail.imageURL = 'media:///nav_right_grey_whiteBg.gif';
	}
	
	//see if we're on the last tab and no orders - then jump to the orders tab
	if((companies_to_orders) && elements.tabs_mainPanel.tabIndex == 4)
	{
		btn_tabOrders();
	}
}

/**
 * @properties={typeid:24,uuid:"b6e24e35-ed78-4d22-a9f5-dedcb50b3d09"}
 */
function onShow()
{
	if(!globals.isEditing())
    {
        //make read only
        controller.readOnly = true

        //hide save/cancel btsn
        elements.btn_save.visible = false
        elements.btn_cancel.visible = false
    }

	//hide the comboboxes
	elements.fld_companyCategoryc.visible = false
	elements.fld_companyIndustryc.visible = false
	elements.fld_companyTypec.visible = false
	elements.fld_accountmanagerc.visible = false
	elements.fld_statusc.visible = false
}

/**
 * @properties={typeid:24,uuid:"ad66ee23-2587-4605-a526-b282a2e5021c"}
 */
function print_default()
{
	rpt_company_detail();
}

/**
 * @properties={typeid:24,uuid:"860337d3-4d8d-4cb9-b3dd-0a1e5344c938"}
 */
function rpt_company_detail()
{
	forms.rpt_company_detail.foundset.selectRecord(company_id)
	forms.rpt_company_detail.sub_buildReport();
	globals.printRoutine('rpt_company_detail', true);
}

/**
 * @properties={typeid:24,uuid:"3bc58b48-645c-4aac-bf28-51582e77f574"}
 * @AllowToRunInFind
 */
function rpt_company_list()
{
	forms.rpt_company_list.controller.loadAllRecords()

	forms.rpt_company_list.controller.sort('company_name asc')

	globals.printRoutine('rpt_company_list', null)
}

/**
 * @properties={typeid:24,uuid:"30b93e28-3d51-40c6-a970-31a602843091"}
 */
function sub_showCompanyContacts()
{
	//go to related order records with this contact on it
	forms.frm_contacts.controller.loadRecords(companies_to_contacts)
	forms.lst_contacts.controller.loadRecords(companies_to_contacts)

	//navigate to the orders tab
	forms.lst_solution_navigation.controller.setSelectedIndex(2) //contacts is 2

	//change tabs
	forms.lst_solution_navigation.btn_goForm()
}

/**
 * @properties={typeid:24,uuid:"41d051f9-c0c6-4282-bbf4-dc24dabc9799"}
 */
function sub_showCompanyOrders()
{
	//go to related order records with this contact on it
	forms.frm_orders.controller.loadRecords(companies_to_orders)
	forms.lst_orders.controller.loadRecords(companies_to_orders)

	//navigate to the orders tab
	forms.lst_solution_navigation.controller.setSelectedIndex(3) //orders is 3

	//change tabs
	forms.lst_solution_navigation.btn_goForm()
}

/**
 * @properties={typeid:24,uuid:"f1011c79-0c22-4676-aaaf-1916e2cb3d46"}
 */
function tabs_dimAll()
{
	elements.lbl_tabContacts.bgcolor = '#c8c8c8'
	elements.lbl_tabOrders.bgcolor = '#c8c8c8'
	elements.lbl_tabAddr.bgcolor = '#c8c8c8'
	elements.lbl_tabTop5.bgcolor = '#c8c8c8'
}

/**
 * @properties={typeid:24,uuid:"aee23f6c-c720-42d2-adca-36de4590a27e"}
 */
function validate_beforeDelete()
{
	var ord = companies_to_orders.getSize()
	var cont = companies_to_contacts.getSize()

	if(ord > 0 || cont > 0)
	{
		//there are contacts and/or orders - so don't allow the delete
		if(ord > 0)
		{
			//show dialog and return 1
			//show the tabpanel "dialog"
			globals.showErrorDialog("You can't delete a company that has orders.\n\nDelete all the orders first.", 'forms.frm_company.sub_showCompanyOrders()','OK', null, null, null);
			return 1
		}

		if(cont > 0)
		{
			//show dialog
			//show the tabpanel "dialog"
			globals.showErrorDialog("You can't delete a company that has contacts related to it.\n\nDelete all the related contacts first.", 'forms.frm_company.sub_showCompanyContacts()','OK', null, null, null);
			return 1
		}
	}
	else
	{
		return 0
	}
	return null;
}
