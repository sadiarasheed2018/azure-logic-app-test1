$(document).ready(function() {
  //console.log("document ready fired");
    
  getData();


}); // end of document ready scope

function getData() {  // Submit the query (REST 'Get' request) and display the result in a table.
  //console.log("getData fired");
//  $.getJSON(targetURL,function(data) {
  $.getJSON("json/siteData.json",function(data) {
	//setHeader = "header('Access-Control-Allow-Origin: *')";
    var result = "";
    
    var beginTable = "<table id=\"resultTable\" class=\"hover\">";
    var endTable = "</table>";
    var beginTableHead = "<thead>";
    var endTableHead = "</thead>";
    var beginHeading = "<th>";
    var endHeading = "</th>";
    var beginBody = "<tbody>";
    var endBody = "</tbody>";
    var beginRow = "<tr>";
    var endRow = "</tr>";
    var beginData = "<td>";
    var beginDataWide = "<td width=50>";
    var beginDataTdHyperlink = "<td class=\"tdHyperlink\">";
    var endData = "</td>";

    var firstHyperlinkColumn = 4;

//    $("#itemCount").append("<label id='itemCountLabel'>Results: </label>" +data.length) // This holds the number of items returned.

    result = beginTable + beginTableHead + beginRow + beginHeading + "Site Id" + endHeading + beginHeading + "Channel 1 Id" + endHeading + beginHeading + "Channel 2 Id" + endHeading + beginHeading + "Channel 3 Id" + endHeading + beginHeading + "Channel 4 Id" + endHeading + beginHeading + "Name" + endHeading + beginHeading + "Installation Date" + endHeading + beginHeading + "Serial Number" + endHeading + endRow + endTableHead + beginBody;
    //console.log("data.length = " +data.length);
     
    j = 0;    
    for(i=0; i<data.length; i++) {  // Iterate over the result, and build the output.
      //console.log("for fired");
      counter = 2;
      result = result + beginRow;
      $.each(data[j], function(key,val) {
    	//console.log("each fired");
        //console.log("j = " +j+ "key = " +key+ ", val = " +val);
      	if(counter > firstHyperlinkColumn) {
          result = result + beginDataTdHyperlink + val + endData;
      	} else {
          result = result + beginData + val + endData;
      	}
        counter++;
      });
      result = result + endRow;
      j++;
    }

    result = result + endBody + endTable;
      
    $("#result").append(result);

    $('#resultTable').DataTable();  // Using the 'DataTable' Jquery add-on.
    
  }); // end of getJSON
  
} // end of getData

