function newFile (boolean) {
	$("#textarea").html("");
	$("#textarea").removeAttr("disabled");
	document.getElementById("textarea").value = "";
	document.getElementById("fileName").style.display = "inline";
	document.getElementById("fileName").value = "";
	document.getElementById("fileNameLabel").style.display = "inline";
	document.getElementById("fileNameBr1").style.display = "inline";
	document.getElementById("fileNameBr2").style.display = "inline";
	
	$("#home").removeAttr("class", "active");

	if (boolean == "true") {
		history.replaceState("object or string", "title", "/home");
	}
}

function saveFile (sessid, crypted, file_name) { // crypted = md5(username);
	file_name = document.getElementById("fileName").value;

	if (file_name == "" || file_name == ".") {
		window.location.href = "/error?error=313";
	}

	var textareaValue = encodeURIComponent(document.getElementById("textarea").value);
	textareaValue = textareaValue.replace("'", "\\'")
	var data = {sessid: sessid, crypted: crypted, fileName: file_name, value: textareaValue};

	$.ajax({
		type: "POST",
		url: "/api/saveFile",
		data: data,
		dataType: "binary",
		error: function (data) {
			console.log("ERROR", data);
			window.location.href = "/home?file=" + data["responseText"];
		}
	});
}

function openFile (unique_id) {
	window.location.href = "/home?file=" + unique_id;
}

var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	sURLVariables = sPageURL.split('&'),
	sParameterName,
	i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};