/**
 * Draws Chart with data from csv
 */
google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart(){
	//retrieve data from server
	fetch("/ChartServlet")
	.then((response) => {
		return response.json();
	})
	.then((restaurantJson) => {
		var restaurantData = new google.visualization.DataTable();
		//define columns for the DataTable instance
		restaurantData.addColumn('string', 'Restaurant');
		restaurantData.addColumn('number', 'Number of Guests');

		for (i = 0; i < restaurantJson.length; i++) {
			restaurantRow = [];
			var name = restaurantJson[i].name;
			var numGuests = restaurantJson[i].numGuests;
			restaurantRow.push(name, numGuests);

			restaurantData.addRow(restaurantRow);
		}
		//optimizations 
		var chartOptions = {
				title: "Top Restuarants in San Francisco this Week",
				colors : ["#b6d8a2"],
				width: 1000,
				height: 700,
				animation : {
					startup: true,
					duration: 2000,
					easing: "inAndOut"
				}
		};
		var restaurantChart = new google.visualization.BarChart(document.getElementById('restaurantChart'));
		restaurantChart.draw(restaurantData, chartOptions);
	})
}