/**
 * @properties={typeid:24,uuid:"d3d6fab2-3de2-4ddb-a2aa-a4082de2b0d5"}
 */
function btn_add()
{
	//see what form is front-most
	var frm = currentcontroller.getName()

	//if there's no transaction, start one - so they can "cancel"
	if(!globals.isEditing()) globals.startEditing()

	//make a new record
	forms[frm].controller.newRecord(true)

	//see if there is an auto-enter method to be performed on that form
	if(forms[frm].validate_autoEnter != undefined) forms[frm].validate_autoEnter()

	//ALL forms must have a method "doEdit" for this to work
	forms[frm].doEdit()

	//tell the first field in the tab order to receive focus
	forms[frm].controller.focusFirstField()
}

/**
 * @properties={typeid:24,uuid:"1d2a4133-4be9-4f3b-a2ed-e645df77eab9"}
 */
function btn_delete()
{
	//see what form is front-most
	var frm = currentcontroller.getName()
	if(forms[frm].validate_beforeDelete() != 0) return;

	var msg = forms[frm].delete_text

	if(!msg) msg = 'Are you sure you want to delete this record?'

	//tell it what method to execute when dialog closes
	var methd = 'forms.' + frm + '.sub_doDelete()'

	//show the tabpanel "dialog"
	globals.showWarningDialog(msg, methd, 'Cancel', 'Delete', null, null);
}

/**
 * @properties={typeid:24,uuid:"cf01232d-9929-4efc-a65c-bc900874ddd7"}
 */
function btn_edit()
{
	//only do edit if there is no existing transaction
	if(!globals.isEditing())
	{
		//see what form is front-most
		var frm = currentcontroller.getName()

		//ALL forms must have a method "doEdit" for this to work
		forms[frm].doEdit()

		//tell the first field in the tab order to receive focus
		forms[frm].controller.focusFirstField()
	}
}

/**
 * @properties={typeid:24,uuid:"c8282890-992f-49f1-bd3f-91096804b32b"}
 */
function btn_print()
{
	//see what form is front-most
	var frm = currentcontroller.getName()

	//execute the "print_default" method on each form
	forms[frm].print_default()
}

/**
 * @properties={typeid:24,uuid:"108bc665-1370-4db2-bb62-de30e0fcfd80"}
 * @AllowToRunInFind
 */
function btn_showAll()
{
	//see what form is front-most
	var frm = currentcontroller.getName()
	var frm2 = utils.stringReplace(frm, 'frm', 'lst')

	//load all records
	forms[frm].controller.loadAllRecords()
	forms[frm2].controller.loadAllRecords()
	forms[frm2].btn_sortAsc()

	//hide the "show all" button
	sub_hideShowAll();
}

/**
 * @properties={typeid:24,uuid:"59d82235-78c2-4567-b3f3-ea732c1e7424"}
 */
function onShow()
{
	//see if the record status has as "(" in it - if so, it's a foundset
	if(globals.record_status.indexOf("(") > 0)
	{
		sub_showShowAll();
	}
	else
	{
		sub_hideShowAll();
	}
}

/**
 * @properties={typeid:24,uuid:"3f02e772-6ac4-4876-bd80-d726d4db42cd"}
 */
function sub_doDelete()
{
	//see what button text was pressed and then delete if necessary
	if(globals.core_dlg_buttonPressed == 'Delete')
	{
		var frm = currentcontroller.getName()
		forms[frm].controller.deleteRecord()

		//clear out global - so we don't accidentally delete something
		globals.core_dlg_buttonPressed = null
	}
}

/**
 * @properties={typeid:24,uuid:"6de17789-f4fa-457b-86d3-d33e5228b4c1"}
 */
function sub_hideShowAll()
{
	elements.btn_showAll.visible = false
	elements.lbl_showAll.visible = false
	elements.grc_divLine.visible = false
}

/**
 * @properties={typeid:24,uuid:"c9e82da8-d1b8-4fea-8c16-dec55532fe95"}
 */
function sub_showShowAll()
{
	elements.btn_showAll.visible = true
	elements.lbl_showAll.visible = true
	elements.grc_divLine.visible = true
}
