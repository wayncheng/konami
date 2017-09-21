// Konami Code -- up up down down left right left right b a enter
var ko = {
	'master' : [38,38,40,40,37,39,37,39,66,65,13],
	'n' : 3,
	fx: function(){
			////////////////////////////
			//  Code to Execute Here  //
			////////////////////////////

			$('body').text('KONAMI!')
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
			var match = ko.checkReadFrame(readframe)

			// If frames match, send confirmation to check the rest of the sequence.
			if ( match && (n < master.length) ) {
				return handoff = true;
			} 
			// If you want to check entire sequence every time.
			else if ( match && (n === master.length) ) {
				fx();
				reset();
			}

			// If confirmed above, check each input with the sequence.  
			if (handoff) {
				var k = seq[count]; // value from the key at current index
				if( e === k ) {
					count += 1;
					if (count === seq.length) {
						console.log('konami!');
						fx();
						reset();
					}
				} 
				else reset();
			}
		},
	checkReadFrame: function(readframe){
		for(var i=0; i<readframe.length; i++) {
			// if any character is not equal, return false and end the loop.
			if ( keyframe[i] !== readframe[i]){
				return false;
			}
		}
		return true; // default return if not returned in loop
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

// Attach object to window
window.konami = ko;

// Listener
document.addEventListener('keyup', konami.go);
