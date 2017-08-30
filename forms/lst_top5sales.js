/**
 * @properties={typeid:24,uuid:"dec02a9e-53e3-4e11-8408-22e63d0bbd26"}
 */
function draw_chart()
{
	var i;
	var HTML = '<html><body>'

	var maxReturedRows = 5;
	var query = "select oi.description , SUM(oi.price_each*oi.quantity) " +
	"from order_items oi, orders o "+
	"where oi.order_id = o.order_id "+
	"and o.company_id = " + company_id +
	" group by oi.description "+
	"order by 2 desc"

	//clear pieChart
	for(i =1 ; i<=5 ; i++)
	{
		if(elements['chart_pie'] != null)
		{
			elements.chart_pie.setLegends(i-1,"")// set legends of chart
			elements.chart_pie.setValues(i-1, 0, 0)
		}
	}
	var ds = controller.getDataSource().split('/');
	var dataset = databaseManager.getDataSetByQuery(ds[1], query, null, maxReturedRows);
	var maxRows = dataset.getMaxRowIndex()

	if(maxRows == 0)
	{
		//nothing sold to this customer
		HTML += '<div align="center"><b class="largeRed">No orders for this company.</b></div>';  //</html>
		html_sales = HTML
		elements.chart_pie.visible = false;
	}
	else
	{
//		HTML += '<table width=145 border=0 cellpadding=1 bgcolor="#ffffff" width=100%>\n'
		HTML += '<table width=145 border=0 cellpadding=1 bgcolor="#ffffff">\n'
		HTML += '<tr bgcolor="#cccccc"><td colspan=2 class="body"><b>Top 5 Products</b></td></tr>'

//		Condition for NGClient - case SVY-7254
//		if (elements['chart_pie'] != null) {
		
			elements.chart_pie.visible = true;
	
			for( i = 1 ; i <= maxRows ; i++ )
			{
				dataset.rowIndex = i;
				if(dataset[1] != null && dataset[2] != null)
				{
					if(elements['chart_pie'] != null)
					{
						elements.chart_pie.setLegends(i-1,dataset[1])// set legends of chart
						elements.chart_pie.setValues(i-1, 0, dataset[2])
					}
					HTML += '<tr><td nowrap class="body">'+ dataset[1]+
					'</td><td nowrap align="right" class="body">'+ utils.numberFormat(dataset[2], '$###,###,###.00')+'</td></tr>';
				}
			}
	
			//put total line at bottom
			/** @type String */
			var totalLine = dataset.getColumnAsArray(2)
			totalLine = totalLine.join('+')
			totalLine = eval(totalLine);
			HTML += '<tr><td nowrap colspan=2 align="right" class="body"><b>Total: '+
			utils.numberFormat(totalLine, '$###,###,###.00') + "</b></td></tr>";
	
			HTML += '</table>\n'+'</body>\n' //+'</html>'
	
			html_sales = HTML
//		}
	}
}
