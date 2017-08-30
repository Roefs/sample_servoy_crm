/**
 * @properties={typeid:24,uuid:"398C2EC4-866F-403F-B7D5-E1DD22A47C3D"}
 */
function _dev()
{
	showError();
}

/**
 * @properties={typeid:24,uuid:"bf53acc4-b35b-486f-b8df-bd23bb8b5908"}
 */
function _devtemp()
{
	elements.tabs_nav.enabled = false
	plugins.dialogs.showErrorDialog( 'err',  'error','ok')
	elements.tabs_nav.enabled = true
}

/**
 * @properties={typeid:24,uuid:"2ff67bd0-c130-4563-bd6b-b2028eba469f"}
 */
function cmd_deleteRecord()
{
	forms.frm_nav_buttons.btn_delete();
}

/**
 * @properties={typeid:24,uuid:"a9784706-24d6-4c8f-ad9c-a7023f470484"}
 */
function cmd_newRecord()
{
	forms.frm_nav_buttons.btn_add();
}

/**
 * @properties={typeid:24,uuid:"03ae54ed-d3bd-496b-b84d-b7969ca35da1"}
 */
function cmd_printPreview()
{
	forms.frm_nav_buttons.btn_print();
}

/**
 * @properties={typeid:24,uuid:"8e2ca382-20f8-4309-b687-017765500cc4"}
 */
function cmd_search() {
	forms.frm_nav_main.elements.fld_search.requestFocus(false);
}

/**
 * @properties={typeid:24,uuid:"b7cc0511-6e09-4a15-a52c-5d926b24fab7"}
 */
function cmd_showAll()
{
	forms.frm_nav_buttons.btn_showAll();
}

/**
 * @properties={typeid:24,uuid:"3d77148d-e6ec-4a19-817d-a85cd92bdc19"}
 */
function evt_find()
{
	forms.frm_nav_main.elements.fld_search.requestFocus(false)
}

/**
 * @properties={typeid:24,uuid:"2d1862e4-d790-46ce-8ac6-ad098659bbd9"}
 */
function showDialog()
{
	globals.showDialog('Test', null, null, null, null, null, null, null, null, null);
}

/**
 * @properties={typeid:24,uuid:"3a129578-8eef-47d5-8d3e-73c7d3fb5dee"}
 */
function showError()
{
	globals.core_dlg_elementDisableEnable = new Array('forms.frm_nav_main.elements.tabs_recList','forms.frm_nav_main.elements.tabs_solNav')
	globals.core_showWcGenericDialog('Error', 'There has been a TERRIBLE error!!','error', null, null, null, null, null);	
}

/**
 * @properties={typeid:24,uuid:"bd41ba9a-8f1f-4ff3-aaca-c2c0b5fdccc1"}
 */
function showInfo()
{
//	globals.showIconDialog('Info', 'This message is just for your information only.','info');
}

/**
 * @properties={typeid:24,uuid:"6A052860-CBAE-479A-AD83-E276A6F563F8"}
 */
function btn_save()
{
	globals.saveEdits()
	hide_btn_reset_fields();
}

/**
 * @properties={typeid:24,uuid:"0A0C24BF-203D-43DE-BA9C-F5641182F63B"}
 */
function btn_cancel()
{
	globals.cancelEditing()
	hide_btn_reset_fields();
}

/**
 * @properties={typeid:24,uuid:"D4DEB01C-9591-489A-A2EC-90B916BF4635"}
 */
function doEdit()
{
	if(!globals.isEditing()) globals.startEditing()

	var allNames = elements.allnames

	for ( var i = 0 ; i < allNames.length ; i++ )
	{
		//work on fields only - starting with name "fld_"
		if(allNames[i].indexOf('fld_') >= 0)
		{
			//if it's a field - then change color and make editable
			elements[allNames[i]].bgcolor = '#feffe4'
			elements[allNames[i]]['readOnly'] = false
		}
		if(application.getApplicationType() != 5)
		{
			//not the web client so also do the "checkboxes" as well
			if(allNames[i].indexOf('chk_') >= 0)
			{
				//if it's a checkbox - then change color and make editable
				elements[allNames[i]].bgcolor = '#feffe4'
				elements[allNames[i]]['readOnly'] = false
			}
		}
	}

	elements.btn_save.visible = true
	elements.btn_cancel.visible = true
}

/**
 * @properties={typeid:24,uuid:"40C8318A-D5AB-4999-B29B-CB99F72A51C3"}
 */
function hide_btn_reset_fields()
{
	var allNames = elements.allnames

	for ( var i = 0 ; i < allNames.length ; i++ )
	{
		//work on fields only - starting with name "fld_"
		if(allNames[i].indexOf('fld_') >= 0)
		{
			//if it's a field - then change color and make not editable
			elements[allNames[i]].bgcolor = '#f0f0f0'
			elements[allNames[i]]['readOnly'] = true
		}

		if(application.getApplicationType() != 5)
		{
			//not the web client so also do the "checkboxes" as well
			if(allNames[i].indexOf('chk_') >= 0)
			{
				//if it's a checkbox - then change color and make editable
				elements[allNames[i]].bgcolor = '#f0f0f0'
				elements[allNames[i]]['readOnly'] = true
			}
		}
	}

	elements.btn_save.visible = false
	elements.btn_cancel.visible = false
}

/**
 * @properties={typeid:24,uuid:"82C889E6-4654-482A-9A3D-284EF517A56F"}
 */
function sub_doDelete()
{
	if(globals.core_dlg_buttonPressed == 'Delete')
	{
		controller.deleteRecord()

		//if there are no records showing - then show all
		if(controller.getMaxRecordIndex() == 0) forms.frm_nav_buttons.btn_showAll();
	}
}
