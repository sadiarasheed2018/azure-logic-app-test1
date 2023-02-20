childRows = "empty";

// Function creates the data table for the child rows.
function getChildRow(data) { // `data` is the data object for the row

	hour = 0;
	
	// Styles for the <td> tag.
	var td_style_1 = '<td style=\"width:30px; padding-left:30px;\">';
	var td_style_2 = '<td style=\"width:85px;\">';
	var td_style_3 = '<td style=\"padding-left:10;\">';
	var td_style_4 = '<td style=\"width:45px;\">';
	var td_style_5 = '<td style=\"width:80px;\">';
	var td_style_6 = '<td style=\"width:0px;\">';
	var th_style_1 = '<th style=\"width:100px;\">';
			
	var tableStart = '<table cellpadding="5" cellspacing="0" style="padding-left:60px;">'
//	var tableHead = '<thead><tr><th>Hour</th>' + th_style_1 + 'Channel 1 Count / Flags</th>' + th_style_1 + 'Channel 2 Count / Flags</th>' + th_style_1 + 'Channel 3 Count / Flags</th>' + th_style_1 + 'Channel 4 Count / Flags</th>' + th_style_1 + 'Channel 5 Count / Flags</th>' + '</tr></thead>';
	var tableHeadStart = '<thead><tr><th>Hour</th>';
	var tableHeadEnd = '</tr></thead>';
  var trStartTag = '<tr>';
  var trEndTag = '</tr>';
  var tdStartTag = '<td>';
  var tdEndTag = '</td>';
  var tableEndTag = '</table>';
  
  childRows = tableStart + tableHeadStart;
  
  // Create the table header based on the number of channels.
  if (data.numberOfChannels == 1) {
  	childRows = childRows + th_style_1 + data.channel1Id + ' Count / Flags</th>';
  } else if (data.numberOfChannels == 2) {
  	childRows = childRows + th_style_1 + data.channel1Id + ' Count / Flags</th>' + th_style_1 + data.channel2Id + ' Count / Flags</th>';
  }  else if (data.numberOfChannels == 3) {
  	childRows = childRows + th_style_1 + data.channel1Id + ' Count / Flags</th>' + th_style_1 + data.channel2Id + ' Count / Flags</th>' + th_style_1 + data.channel3Id + ' Count / Flags</th>';
  }  else if (data.numberOfChannels == 4) {
  	childRows = childRows + th_style_1 + data.channel1Id + ' Count / Flags</th>' + th_style_1 + data.channel2Id + ' Count / Flags</th>' + th_style_1 + data.channel3Id + ' Count / Flags</th>' + th_style_1 + data.channel4Id + ' Count / Flags</th>';
  }
  
  // Create the table body based on the number of channels.
  for (let j = 0; j < 24; j++) {
  	childRows = childRows + trStartTag + td_style_3 + hour + j  + tdEndTag; 
  	for (let i = 0; i < data.numberOfChannels; i++) {
  		if (j == 7 || j == 8 || j == 9) {
    		childRows = childRows + td_style_1 + data.badData + ' / ' + data.badLabel + tdEndTag;
      	for (let k = 0; k < data.numberOfChannels-1; k++) {
      		childRows = childRows + td_style_1 + data.goodData + ' / ' + data.goodLabel + tdEndTag; 
      	} break;
  		} else {
  			childRows = childRows + td_style_1 + data.goodData + ' / ' + data.goodLabel + tdEndTag; 
  		}
  	}
  	childRows = childRows + trEndTag;
  }
  childRows = childRows + tableEndTag;
  
	return childRows;
}


$(document).ready(function () {
  
  /* Initialization of datatables */
var table = $('#tableID').DataTable({
  "ajax": "json/flagData.json",
  "columns": [{
    "className": 'details-control',
    "orderable": true,
    "data": null,
    "defaultContent": ''
  },
    { "data": "siteId" },
    { "data": "siteName" },
    { "data": "flagsDay" },
    { "data": "countDate" },
    { "data": "count" },
    { "data": "impute" },
    { "data": "imputed" },
    { "data": "verified" },
    { "data": "verifiedDate" }
  ],
  "order": [[1, 'asc']]
});

// Click events for expanding and closing using up/down arrows
$('#tableID tbody').on('click',
'td.details-control', function () {

  var tr = $(this).closest('tr');
  var row = table.row(tr);

  if (row.child.isShown()) {
    row.child.hide(); // Closing the already opened rows.   
    tr.removeClass('shown'); // Removing class to hide.
  }
  else {
    row.child(getChildRow(row.data())).show(); // Show the child rows.
    tr.addClass('shown'); // To show the child rows, add the below class
    }
  });
});   
