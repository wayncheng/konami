// Konami Code -- up up down down left right left right b a enter
$(document).ready(function(){ 
	var ko = {
		'master' : [38,38,40,40,37,39,37,39,66,65,13],
		'n' : 3,
		fx: function(){
				////////////////////////////
				//  Code to Execute Here  //
				////////////////////////////
			},
		go: function(){
				reset = ko.reset;
				fx = ko.fx;
				// e stores charcode for button pressed	
				var e = event.which;

				// Add last press to end of array, then remove first press from array
				readframe.push(e);
				readframe.shift();
				
				// Comparing values in readframe with keyframe. Returns boolean.
				var match = readframe.equals(keyframe);

				// If frames match, send confirmation to check the rest of the sequence.
				if ( match === true && (n < master.length) ) {
					handoff = true;
					return;
				} 
				// If you want to check entire sequence every time.
				else if ( match===true && (n === master.length) ) {
					fx();
					reset();
				}

				// If confirmed above, check each input with the sequence.  
				if (handoff === true) {
					var k = seq[count]; // value from the key at current index
					if( e === k ) {
						count += 1;
						if (count === seq.length) {
							fx();
							reset();
						}
					} 
					else reset();
				}
			},
		reset: function(){
					// Reset if wrong sequence or completely finished
					count = 0;
					handoff = false;
				},
	}
	var n = ko.n;
	var master = ko.master;
	var fx = ko.fx;
	var handoff = false;
	var count = 0;
	var keyframe = master.slice(0, n);
	var seq = master.slice(n, master.length);
	var readframe = [];
	readframe.length = n; // Set the readframe to desired length

// Array comparison method	
	// Warn if overriding existing method
	if(Array.prototype.equals) console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a readframework conflict or you've got double inclusions in your code.");

	Array.prototype.equals = function (array) {
	    // if the other array is a falsy value, return
	    if (!array)
	        return false;
	    // compare lengths - can save a lot of time 
	    if (this.length != array.length)
	        return false;

	    for (var i = 0, l=this.length; i < l; i++) {
	        // Check if we have nested arrays
	        if (this[i] instanceof Array && array[i] instanceof Array) {
	            // recurse into the nested arrays
	            if (!this[i].equals(array[i]))
	                return false;       
	        }           
	        else if (this[i] != array[i]) { 
	            // Warning - two different object instances will never be equal: {x:20} != {x:20}
	            return false;   
	        }           
	    }       
	    return true;
	}
	// Hide method from for-in loops
	Object.defineProperty(Array.prototype, "equals", {enumerable: false});

// Attach object to window
	window.konami = ko;

// init
$(document).on('keyup', konami.go);
}); //end document ready