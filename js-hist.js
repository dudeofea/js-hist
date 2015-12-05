function jsHist(elem_id, fn){
	lines = fn.toString().split('\n');
	var incLine = function(line_no){
		console.log('Line #', line_no);
	}
	//add line increments to function and add to source viewer
	var code_viewer = document.getElementById(elem_id);
	var code_line = document.createElement("div");
	code_line.appendChild(document.createTextNode(lines[0]));
	code_line.className = "code-line";
	code_viewer.appendChild(code_line);
	lines[0] = lines[0] + "incLine(0);";
	for (var i = 1; i < lines.length; i++) {
		code_line = document.createElement("div");
		code_line.appendChild(document.createTextNode(lines[i]));
		code_line.className = "code-line";
		code_viewer.appendChild(code_line);
		lines[i] = 'incLine('+i+');'+lines[i];
	}
	new_fn = lines.join('\n');
	eval("var f = "+new_fn+"; f()");
}
