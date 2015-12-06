function jsHist(elem_id, fn){
	//split code into lines
	lines = fn.toString().split('\n');
	//create array of zeroes
	var counts = Array.apply(null, Array(lines.length)).map(Number.prototype.valueOf, 0);
	// -- function to increment lines numbers
	var max = 0;
	var incLine = function(line_no){
		//increment the counts
		counts[line_no]++;
		if(counts[line_no] > max){
			max = counts[line_no]
		}
		//console.log('Line #', counts, sum);

		//TODO: you could include 2 backgrounds and have one
		//be overlay the other so you can just change the counts[i]
		//and the sum and that's it

		//edit the background colors of the code
		var all = document.getElementById(elem_id);
		for (var i = 0; i < counts.length; i++) {
			all.childNodes[i+1].childNodes[1].setAttribute("style", "opacity: "+(counts[i]/max));
		}
	}
	// -- add line increments to function and add to source viewer
	var code_viewer = document.getElementById(elem_id);
	var add_line = function(text){
		var code_line = document.createElement("div");
		var code_back = document.createElement("div");
		var code_text = document.createElement("span");
		code_line.className = "code-line";
		code_back.className = "back";
		code_text.appendChild(document.createTextNode(text));
		code_line.appendChild(code_text);
		code_line.appendChild(code_back);
		code_viewer.appendChild(code_line);
	};
	//add the first element to the code list
	add_line(lines[0]);
	//add line incrementer
	lines[0] = lines[0] + "incLine(0);";
	for (var i = 1; i < lines.length; i++) {
		//create the element
		add_line(lines[i]);
		//add line incrementer
		lines[i] = 'incLine('+i+');'+lines[i];
	}
	new_fn = lines.join('\n');
	// -- convert back to function and return
	var funcReg = /function *\(([^()]*)\)[ \n\t]*{([\s\S]*)}/gmi;
	var match = funcReg.exec(new_fn);
	var args = match[1].split(',')
	args.push('incLine');
	var ret_fn = Function(args, match[2]);
	var wrapper_fn = function(){
		var args = Array.prototype.slice.call(arguments);
		args.push(incLine);
		ret_fn.apply(this, args)
	}
	return wrapper_fn;
}
