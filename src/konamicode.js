/**

	Author: Stefan Baumgartner (@ddprrt)
	File: konamicode.js

	Description: Adds the konamicode to any element on your website. You can add a multitude
	of callbacks.
	
**/

/*Hello GitHub*/

!function (window, undefined) {

	'use strict';

	var keyCodes = [38,38,40,40,37,39,37,39,66,65],
		elems = {};

	window.konamicode = function(elem, callback) {
		if(!elems[elem]) {
			elems[elem] = new KonamiCode(elem);
		}

		elems[elem].addCallback(callback);
	}

	function KonamiCode(elem) {
		var that = this;
		that.elem = elem;
		if (that.elem.addEventListener) {  
			that.elem.addEventListener('keyup', check, false);   
		} else if (that.elem.attachEvent)  {  
			that.elem.attachEvent('onkeyup', check);  
		} 

		function check(ev) {
			that.checkPosition(ev);
		}
	}

	KonamiCode.prototype = {
		position: 0,
		callbacks: [],
		addCallback: function(callback) {
			this.callbacks.push(callback);
		},
		executeCallbacks: function() {
			var i = 0,
				len = this.callbacks.length;

			for(i; i < len; i = i + 1) {
				if(this.callbacks[i]) {
					this.callbacks[i]();
				}
			}

			this.position = 0;
		},
		checkPosition: function(ev) {
			if(keyCodes[this.position] === ev.keyCode) {
				if(this.position+1 < keyCodes.length) {
					this.position = this.position + 1;
				} else {
					this.executeCallbacks();
				}
			} else {
				this.position = 0;
			}
		}
	}

}(window)