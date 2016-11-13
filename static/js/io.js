function newFile () {
	$("#textarea").html("");
	$("#textarea").removeAttr("disabled");
	document.getElementById("fileName").style.display = "inline";
	document.getElementById("fileNameLabel").style.display = "inline";
	document.getElementById("fileNameBr1").style.display = "inline";
	document.getElementById("fileNameBr2").style.display = "inline";

	
	$("#home").removeAttr("class", "active");

	changeHappened();
}

function saveFile (username) {
	console.log(username);
}

function changeHappened () {
	/* var position = $("#textarea").position();
	$(".numberedtextarea-line-numbers").css({"top":position.top + "px"});

	var height = $("#myElement").height();
	$(".numberedtextarea-line-numbers").css('overflowY', height);  */
}
