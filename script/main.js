$(document).ready(function() {
	
	$("#message").empty(); // Clear previous message.
	$("#errorMessage").empty(); // Clear previous message.

    $("#addCustomerButton").click(function() {
		clearAllFields();
    	addCustomer();
    });

	$("#gender").keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			clearAllFields();
			addCustomer();
		}
	  });

	  $("#getCustomerButton").click(function() {
		var customerLastNameSearch = $("#customerLastNameSearch").val();
		//console.log("customerLastNameSearch = " +customerLastNameSearch);
		clearAllFields();
		getCustomer(customerLastNameSearch, "singleItemSearch");
    });

	$('#customerLastNameSearch').keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			var customerLastNameSearch = $("#customerLastNameSearch").val();
			//console.log("customerId = " +customerId);
			clearAllFields();
			getCustomer(customerLastNameSearch, "singleItemSearch");
		}
	  });

	  $("#getAllCustomersButton").click(function() {
		clearAllFields();
		getCustomer("empty", "all");
    });

	$("#deleteCustomerByIdButton").click(function() {
		var customerDeleteById = $("#customerId").val();
		deleteCustomer(customerDeleteById);
    });
});

arrayLength = 0;

function addCustomer() { // Create a new customer record in the Db.
    //console.log("addCustomer");

	var customerFirstName = $("#firstName").val();
	var customerLastName = $("#lastName").val();
	var customerAge = $("#age").val();
	var customerGender = $("#gender").val();

	if(customerFirstName == '' || customerFirstName == null || customerLastName == '' || customerLastName == null || customerAge == '' || customerAge == null || customerGender == '' || customerGender == null) {
		$("#errorMessage").html("Error! Empty field").fadeIn().delay(5000).fadeOut(3000);
	} else {
		var customerId = Math.floor(Math.random() * Date.now()); // Generate a random unique number.
		//console.log("customerId = " + customerId);

		let data = "{\"id\": \"" + customerId + "\", \"firstName\": \""  + customerFirstName + "\", \"lastName\": \"" + customerLastName + "\", \"Age\": \"" + customerAge + "\", \"Gender\": \"" + customerGender + "\"}";
		//console.log("data = " + data);
		//let data = "{id: \"00000014\", firstName :\"Jojo\", lastName: \"Mud\", Age: 24, Gender: \"m\"}"; // For static testing.

		$.ajax({
			type: "POST",
			url: "https://prod-01.centralus.logic.azure.com:443/workflows/aeed347d57ab436285c8c606fe4587c1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZQuFIOmddTFbNgqobwsEJ0iy1asJZdHgR7xEFaknAGg",
			data: data,
			headers: { "Content-Type": "application/json" },
			dataType: 'json',
			success: function (data, status) {
				//alert("Record created. data = " + data + ", status = " + status);

				$("#message").html("Success! Record created.").fadeIn().delay(5000).fadeOut(3000);

				$("#resultAreaLabels").append("<div id=\"resultLabelsGroup\"></div>"); // Create this group to hold the results. Then we can remove this group with 'clearAllFields' function.

				$("#resultLabelsGroup").append("<label id=\"resultLabelCustomerId\" style=\"float:right;\">\"Customer Id:\"</label><div style=\"clear:both; height:5px;\"></div>");
				$("#resultLabelsGroup").append("<label id=\"resultLabelFirstName\" style=\"float:right;\">\"First Name:\"</label><div style=\"clear:both; height:5px;\"></div>");
				$("#resultLabelsGroup").append("<label id=\"resultLabelLastName\" style=\"float:right;\">\"Last Name:\"</label><div style=\"clear:both; height:5px;\"></div>");
				$("#resultLabelsGroup").append("<label id=\"resultLabelAge\" style=\"float:right;\">\"Age:\"</label><div style=\"clear:both; height:5px;\"></div>");
				$("#resultLabelsGroup").append("<label id=\"resultLabelGender\" style=\"float:right;\">\"Gender:\"</label><div style=\"clear:both; height:5px;\"></div>");

				$("#resultAreaData").append("<div id=\"resultDataGroup\"></div>"); // Create this group to hold the results. Then we can remove this group with 'clearAllFields' function.

				$("#resultDataGroup").append("<label id=\"resultDataCustomerId\" style=\"float:left;\">" + data[1].id + "</label><div style=\"clear:both; height:5px;\"></div>");
				$("#resultDataGroup").append("<label id=\"resultDataFirstName\" style=\"float:left;\">" + data[1].firstName + "</label><div style=\"clear:both; height:5px;\"></div>");
				$("#resultDataGroup").append("<label id=\"resultDataLastName\" style=\"float:left;\">" + data[1].lastName + "</label><div style=\"clear:both; height:5px;\"></div>");
				$("#resultDataGroup").append("<label id=\"resultDataAge\" style=\"float:left;\">" + data[1].Age + "</label><div style=\"clear:both; height:5px;\"></div>");
				$("#resultDataGroup").append("<label id=\"resultDataGender\" style=\"float:left;\">" + data[1].Gender + "</label><div style=\"clear:both; height:5px;\"></div>");

				// Clear the input text fields.
				$("#firstName").val('');
				$("#lastName").val('');
				$("#age").val('');
				$("#gender").val('');

				$( "#firstName" ).focus();
			},
			error: function (data, status) {
				alert("Record Creation Failed. data = " + data + ", status = " + status);        
				$("#errorMessage").html("Error! Record not added").fadeIn().delay(5000).fadeOut(3000);
			}	  
		});
	}		    
}

function getCustomer(customerLastNameSearch, option) { // Retreive a customer record from the Db.
    //console.log("customerLastNameSearch = " + customerLastNameSearch + ", option = " + option);

	if(customerLastNameSearch == '' || customerLastNameSearch == null) {
		$("#errorMessage").html("Error! Empty field").fadeIn().delay(5000).fadeOut(3000);
	} else {
		if(option == "singleItemSearch") {
			var baseURL = "https://prod-22.centralus.logic.azure.com/workflows/4365e8b3bd4242edb18274cdd8895fa0/triggers/manual/paths/invoke";
			var urlPath = "/id/";
			var urlPathParam = customerLastNameSearch;
			var urlQueryParam = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3j8IOMDx9Tambvzic7ywOmg_ndXC74F2xN-mnuhwxaY";
			var url = baseURL + urlPath + urlPathParam + urlQueryParam;
		} else {
			var url = "https://prod-15.centralus.logic.azure.com:443/workflows/9bb059bf2eb24c56bf330583aa7718f3/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=59yx3r_F3Cs5uRjbcIcaH02m3tU30cYURCvT4FexrdA";
		}

		$.ajax({
			type: "GET",
			url: url,
			//data: data,
			headers: { "Content-Type": "application/json" },
			dataType: 'json',
			success: function (data, status) {
				//alert("Record found. data = " + data + ", status = " + status);
				var dataArray = data[1]; // Get the array of items from the JSON.
				arrayLength = dataArray.length;
				dataArray.forEach(getItems); // Iterate over the array by running 'getItems' function as a loop.
				
				if( !$.isArray(dataArray) ||  !dataArray.length ) {
					$("#errorMessage").html("Error! Record not found").fadeIn().delay(5000).fadeOut(3000);
				} else {
					$("#customerLastNameSearch").val(''); // Clear the input text field.
				}
			},
			error: function (data, status) {
				$("#errorMessage").html("Error! Record not found").fadeIn().delay(5000).fadeOut(3000);
				//alert("Record not found. Failed. data = " + data + ", status = " + status);        
			}	  
		});
	}
}

function getItems(item) { // 'item' is each array item (object) sent in from the 'dataArray.forEach' function.
	$("#resultAreaLabels").append("<div id=\"resultLabelsGroup\"></div>"); // Create this group to hold the results. Then we can remove this group with 'clearAllFields' function.

	$("#resultLabelsGroup").append("<label id=\"resultLabelCustomerId\" style=\"float:right;\">\"Customer Id:\"</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultLabelsGroup").append("<label id=\"resultLabelFirstName\" style=\"float:right;\">\"First Name:\"</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultLabelsGroup").append("<label id=\"resultLabelLastName\" style=\"float:right;\">\"Last Name:\"</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultLabelsGroup").append("<label id=\"resultLabelAge\" style=\"float:right;\">\"Age:\"</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultLabelsGroup").append("<label id=\"resultLabelGender\" style=\"float:right;\">\"Gender:\"</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultLabelsGroup").append("<div id=\"resultLabelSeperator\" style=\"clear:both; height:20px;\"></div>");

	$("#resultAreaData").append("<div id=\"resultDataGroup\"></div>"); // Create this group to hold the results. Then we can remove this group with 'clearAllFields' function.

	if(arrayLength == 1) {
		$("#resultDataGroup").append("<label id=\"resultDataCustomerId\" style=\"float:left;\">" + item.id + "</label><img id=\"deleteCustomerRecord\" src=\"img/deleteIcon.png\" style=\"float:left; margin-left:40px;\" width=\"20\" height=\"20\"><div style=\"clear:both; height:0px;\"></div>");
	} else {
		$("#resultDataGroup").append("<label id=\"resultDataCustomerId\" style=\"float:left;\">" + item.id + "</label><div style=\"clear:both; height:5px;\"></div>");
	}
	$("#resultDataGroup").append("<label id=\"resultDataFirstName\" style=\"float:left;\">" + item.firstName + "</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultDataGroup").append("<label id=\"resultDataLastName\" style=\"float:left;\">" + item.lastName + "</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultDataGroup").append("<label id=\"resultDataAge\" style=\"float:left;\">" + item.Age + "</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultDataGroup").append("<label id=\"resultDataGender\" style=\"float:left;\">" + item.Gender + "</label><div style=\"clear:both; height:5px;\"></div>");
	$("#resultDataGroup").append("<div id=\"resultDataSeperator\" style=\"clear:both; height:20px;\"></div>");

	$("#deleteCustomerRecord").click(function() {
    	//console.log("deleteCustomerRecord" + item.id);
		var customerIdDelete = $("#resultDataCustomerId").text();
    	deleteCustomer(customerIdDelete);
    });

}
	
function deleteCustomer(customerIdDelete) { // Delete a customer record in the Db.
    //console.log("customerIdDelete = " + customerIdDelete);

	if(customerIdDelete == '' || customerIdDelete == null) {
		$("#errorMessage").html("Error! Missing customer Id").fadeIn().delay(5000).fadeOut(3000);
	} else {
		var baseURL = "https://prod-22.centralus.logic.azure.com/workflows/71bfba69fdf943f78622b6d693815d7b/triggers/manual/paths/invoke";
		var urlPath = "/delete/";
		var urlPathParam = customerIdDelete;
		var urlQueryParam = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=o4sHGSxHIZDM7c9W-pmMcJGMYbmUHMNPVMW4C0J-J68";
		var url = baseURL + urlPath + urlPathParam + urlQueryParam;
	

		$.ajax({
			type: "DELETE",
			url: url,
			//data: data,
			headers: { "Content-Type": "application/json" },
			dataType: 'json',
			success: function (data, status) {
				//alert("Record found. data = " + data + ", status = " + status);
				clearAllFields();
				$("#customerId").val(''); // Clear the input text field.
				
				$("#message").html("Success! Record deleted.").fadeIn().delay(5000).fadeOut(3000);

				$("#resultAreaLabels").append("<div id=\"resultLabelsGroup\"></div>"); // Create this group to hold the results. Then we can remove this group with 'clearAllFields' function.

				$("#resultLabelsGroup").append("<label id=\"resultLabelCustomerId\" style=\"float:right;\">\"Deleted Customer Id:\"</label><div style=\"clear:both; height:5px;\"></div>");
				
				$("#resultAreaData").append("<div id=\"resultDataGroup\"></div>"); // Create this group to hold the results. Then we can remove this group with 'clearAllFields' function.

				$("#resultDataGroup").append("<label id=\"resultDataCustomerId\" style=\"float:left;\">" + data[1].id + "</label><div style=\"clear:both; height:5px;\"></div>");
			},
			error: function (data, status) {
				$("#errorMessage").html("Error! Record not found").fadeIn().delay(5000).fadeOut(3000);
				//alert("Record not found. Failed. data = " + data + ", status = " + status);        
			}	  
		});
	}
}

function clearAllFields() { // Clear previous data fields.
	$("#resultLabelsGroup").remove();
	$("#resultDataGroup").remove();
}




// For reference only:
// Syntax to access 1st item within an array at the top layer of the JSON Object.
// $("#resultDataFirstName").html(data[1][0].firstName);
// $("#resultDataLastName").html(data[1][0].lastName);
// $("#resultDataAge").html(data[1][0].Age);
// $("#resultDataGender").html(data[1][0].Gender);

// Syntax to access 2nd item at the top layer of the JSON Object.
// $("#resultDataFirstName").html(data[1].firstName);
// $("#resultDataLastName").html(data[1].lastName);
// $("#resultDataAge").html(data[1].Age);
// $("#resultDataGender").html(data[1].Gender);
