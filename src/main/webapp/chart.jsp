<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
 
<t:page title="Chart">

  <jsp:attribute name="head_area">    
    <style>
    	#restaurantChart{
    		margin: auto;
    	}
    </style>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript" src="js/chart-loader.js"></script>
  </jsp:attribute>
    
  <jsp:attribute name="body_area">
    <h1> Chart Data</h1>
    <div id="restaurantChart" class="info-card"></div>
  </jsp:attribute>

</t:page>
