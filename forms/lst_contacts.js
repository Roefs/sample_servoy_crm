/**
 * @properties={typeid:24,uuid:"f2582919-526d-4a35-a040-598b9aa29f35"}
 */
function btn_goRec()
{
	globals.curID_contact = contact_id
}

/**
 * @properties={typeid:24,uuid:"3b3acbb8-a5e5-4cae-9e05-d098df498c4d"}
 */
function btn_sortAsc()
{
	_super.btn_sortAsc();
	controller.sort('name_last asc, name_first asc')
}

/**
 * @properties={typeid:24,uuid:"126281d0-3234-46d0-bacf-7e6c986acb97"}
 */
function btn_sortDesc()
{
	_super.btn_sortDesc()
	controller.sort('name_last desc, name_first desc')
}
