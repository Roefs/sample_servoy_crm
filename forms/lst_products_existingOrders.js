/**
 * @properties={typeid:24,uuid:"4351d5b0-2258-49b8-ba61-eb6c93a6428d"}
 */
function btn_goOrder()
{
	//load the record based on the current id
	forms.frm_orders.foundset.selectRecord(order_id)
	forms.lst_solution_navigation.controller.setSelectedIndex(3) //orders is 3

	//change tabs
	forms.lst_solution_navigation.btn_goForm();
}
