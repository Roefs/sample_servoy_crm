/**
 * @properties={typeid:24,uuid:"ec74a9a9-ce2f-410e-9999-6de1907bf813"}
 */
function btn_add()
{
	/** @type Number*/
	var idx = elements.tabs_lists.tabIndex;
	var frm = elements.tabs_lists.getTabFormNameAt(idx);
	
	forms[frm].controller.newRecord(false)
	
	forms.frm_admin.doEdit()
	forms[frm].controller.setSelectedIndex(forms[frm].foundset.getSize())
}

/**
 * @properties={typeid:24,uuid:"b6923f6a-6dc1-4f16-b5c0-01bb722d3e45"}
 */
function btn_delete()
{
	//set the method to execute after closing the dialog
	globals.core_dlg_methodToExecute = 'forms.frm_admin_vl_choice.sub_doDelete()'
	
	//show the warning dialog
	globals.showWarningDialog('Are you sure you want to permanently delete this value list value?', globals.core_dlg_methodToExecute, 'Cancel', 'Delete', null, null);
}

/**
 * @properties={typeid:24,uuid:"9e17eab9-bf7a-404b-8269-80d85f4e6f64"}
 */
function evt_changeList()
{
	//elements.tabs_lists.tabIndex = globals.vl_editNum
}

/**
 * @properties={typeid:24,uuid:"85b5c151-3554-404b-9f1a-bf6a71df961c"}
 */
function evt_onLoad()
{
	//hide the little "go" button if not in web client
	if(application.getApplicationType() != APPLICATION_TYPES.WEB_CLIENT)
	{
		elements.btn_changeList.visible = false
	}
	else
	{
		elements.btn_changeList.visible = true
	}
}

/**
 * @properties={typeid:24,uuid:"f8fb5270-00bf-4fd1-b69e-62341091077a"}
 */
function sub_doDelete()
{
	if(globals.core_dlg_buttonPressed == 'Delete')
	{
		/** @type Number*/
		var idx = elements.tabs_lists.tabIndex;
		var frm = elements.tabs_lists.getTabFormNameAt(idx);
		
		forms[frm].controller.deleteRecord()
	}
}
