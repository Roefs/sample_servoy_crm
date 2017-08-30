/**
 * @properties={typeid:24,uuid:"e089f750-4819-4532-8ff9-8013fc421101"}
 */
function btn_goRec()
{
	globals.curID_company = company_id
}

/**
 * @properties={typeid:24,uuid:"b8388198-425c-4294-9b0c-4159140724b1"}
 */
function btn_sortAsc()
{
	_super.btn_sortAsc()
	controller.sort("company_name asc")
}

/**
 * @properties={typeid:24,uuid:"d238fe2c-9849-471f-a795-82d6e4e1a6f7"}
 */
function btn_sortDesc()
{
	_super.btn_sortDesc()
	controller.sort('company_name desc')
}
