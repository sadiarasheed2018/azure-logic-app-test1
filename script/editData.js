verb = "empty";
url = "empty";
userKey = "empty";
customerHeader1Key = "empty";
customHeader1Value = "empty";
errorMessage = "";
responseHeader = "empty";

// For testing
// url = "https://api2.dot.state.mn.us/SnowIceMaterials/1/consumed/daterange/2021-07-01,2021-07-02"; // PROD
// url = "https://api2t.dot.state.mn.us/SnowIceMaterials/1/consumed/daterange/2021-07-01,2021-07-02"; // TEST
// userKey = "49c4734072e4734a36521c3cb86a725d"; // PROD
// userKey = "117f941e3bb872b9e463cd325c9df0c3"; // TEST

$(document).ready(function() {
	$("#getData").click(function() {
		$("#errorMessage").empty(); // Clear previous message.
		$("#resultsArea1").empty(); // Clear previous message.
		$("#resultsArea2").empty(); // Clear previous message.
		$("#resultsArea3").empty(); // Clear previous message.
		verb = $("#verb option:selected").val();
		url = $("#url").val();
		userKey = $("#userKey").val();
		// console.log("verb = " + verb + ", url = " + url + ", userKey = " + userKey + ", customerHeader1Key = " + customerHeader1Key + ", customHeader1Value = " + customHeader1Value);

		if((verb == "GET" || verb == "OPTIONS") && url != '' && userKey != '') {
			customerHeader1Key = "Accept";
			customHeader1Value = "application/json";
			getData();
		} else if(verb == "POST" && url != '' && userKey != '') {
			customerHeader1Key = "Content-Type";
			customHeader1Value = "application/json";
			getData();
		} else {
			errorMessage = "Error: Missing input data.";
			$("#errorMessage").html(errorMessage);
			$("#error").show().delay(10000).fadeOut(3000);
		}
	});
});

function getData() {
		console.log("verb = " + verb + ", url = " + url + ", userKey = " + userKey + ", customerHeader1Key = " + customerHeader1Key + ", customHeader1Value = " + customHeader1Value);
		$.ajax({
			url: url,
			type: verb,
			headers: {'Accept':customHeader1Value, 'user_key':userKey},
			datatype: 'json',
			success: function(response, textStatus, xhr) {
				// alert("success");
				console.log("Reponse Code = " + xhr.status);
				console.log("Response = " + response);
				console.log("length = " + response.length);
				for (let i = 0; i < response.length; i++) {
					console.log(i + " = " + JSON.stringify(response));
					//console.log(i + " = " + response[i]);
					$("#resultsArea3").html(xhr.status);
					$("#resultsArea2").html(JSON.stringify(response,null,'\t'));
				} 
			},
			error: function(jqXHR, response, textStatus, errorThrown) {
				console.log("Response = " + textStatus + ", " + jqXHR.status + ", " + errorThrown);
				errorMessage = textStatus + ": " + jqXHR.status + " " + errorThrown;
				$("#resultsArea3").html(errorMessage);
				$("#errorMessage").html(errorMessage);
				$("#error").show().delay(10000).fadeOut(3000);
				$("#resultsArea2").html(JSON.stringify(response,null,'\t'));
			},
			complete:function(jqXHR) {
				$("#label10").show();
				$("#label20").show();				  
				$("#label30").show();				  
				responseHeader = jqXHR.getAllResponseHeaders();
				console.log(jqXHR.getAllResponseHeaders());
				$("#resultsArea1").html(responseHeader);
			}   
		});
	}
