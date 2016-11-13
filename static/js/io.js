function newFile () {
	$("#textarea").html("");
	$("#textarea").removeAttr("disabled");
	document.getElementById("fileName").style.display = "inline";
	document.getElementById("fileNameLabel").style.display = "inline";
	document.getElementById("fileNameBr1").style.display = "inline";
	document.getElementById("fileNameBr2").style.display = "inline";

	
	$("#home").removeAttr("class", "active");
}

function saveFile (sessid, crypted, file_name) { // crypted = md5(username, sessid);
	file_name = document.getElementById("fileName").value;
	var textareaValue = encodeURIComponent(document.getElementById("textarea").value);

	var data = {sessid: sessid, crypted: crypted, fileName: file_name, value: textareaValue};

	$.ajax({
		type: "POST",
		url: "/api/saveFile",
		data: data,
		success: "true",
		dataType: "binary"
	});
}