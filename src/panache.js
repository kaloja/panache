(function (window, factory) {

	window.panache = window.$ = factory();

})(window, function () {

	'use strict';

	var panache = {};

	/**
	 * panache:
	 * Select the matched element from the document or context.
	 */
	panache = function (selector, context) {
		// Set select methods with RegExp:
		var idMatch = (/^\#[\w\-]+$/),
				classMatch = (/^\.[\w\-]+$/),
				tagMatch = (/^\w+$/);

		if (context) {
			if (idMatch.test(selector)) {
				return context.getElementById(selector.substr(1));
			} else if (classMatch.test(selector)) {
				return context.getElementsByClassName(selector.substr(1));
			} else if (tagMatch.test(selector)) {
				return context.getElementsByTagName(selector);
			} else {
				return context.querySelectorAll(selector);
			}
		} else {
			if (idMatch.test(selector)) {
				return document.getElementById(selector.substr(1));
			} else if (classMatch.test(selector)) {
				return document.getElementsByClassName(selector.substr(1));
			} else if (tagMatch.test(selector)) {
				return document.getElementsByTagName(selector);
			} else {
				return document.querySelectorAll(selector);
			}
		}
	};

	/**
	 * addClass:
	 * Add one or more classes to each element.
	 */
	panache.addClass = function (element, names) {
		panache.forEach(names, function (name) {
			if (document.documentElement.classList) {
				if (!panache.hasClass(element, name)) {
					element.classList.add(name);
				}
			} else {
				if (!panache.hasClass(element, name)) {
					element.className += (element.className ? ' ' : '') + name;
				}
			}
		});
	};

	/**
	 * after:
	 * Insert content after the matched element.
	 */
	panache.after = function (element, content) {
		if (typeof content === 'string') {
			element.insertAdjacentHTML('afterend', content);
		} else if (content instanceof Node) {
			element.parentNode.insertBefore(content, element.nextSibling);
		}
	};

	/**
	 * ajax:
	 * Perform an asynchronous HTTP request.
	 */
	panache.ajax = function (url, callback, method, async, data) {
		var method = method || 'GET', // Default to GET
				async = async || true, // Default to async mode
				request = null;

		if (XMLHttpRequest) {
			request = new XMLHttpRequest();
		} else {
			request = new ActiveXObject('Microsoft.XMLHTTP');
		}

		request.onreadystatechange = function () {
			if (request.readyState == 4 || request.readyState == 'complete') {
				if (request.status == 200) {
					callback(request);
				} else {
					console.log('Something went wrong with the server request.');
					return;
				}
			}
		};

		request.open(method, url, async);
		if (data) {
			request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		}
		request.send(data);
	};

	/**
	 * animate:
	 * Animate on scroll with requestAnimationFrame.
	 * @reference: http://www.html5rocks.com/en/tutorials/speed/animations/
	 */
	panache.animate = function (callback) {
		var animate = window.requestAnimationFrame,
				ticking = false;

		// Callback for our scroll event:
		function onScroll() {
			if (!ticking) {
				animate(update);
				ticking = true;
			}
		};

		// Our animation callback:
		function update() {
			if (ticking) {
				callback();
			}

			// Reset the tick, so we can capture the next scroll event:
			ticking = false;
		};

		// Listen for scroll events:
		panache.on('scroll', window, onScroll);

		// Polyfill for requestAnimationFrame:
		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = function (callback) {
				setTimeout(callback, 1000 / 60);
			};
		};
	};

	/**
	 * append:
	 * Insert the matched element to the end of the matched target.
	 */
	panache.append = function (target, element) {
		if (typeof element === 'string') {
			return target.insertAdjacentHTML('beforeend', element);
		} else if (element instanceof Node) {
			return target.appendChild(element);
		}
	};

	/**
	 * attr:
	 * Get the value of an attribute from the matched element or set one
	 * attribute for matched element.
	 */
	panache.attr = function(element, name, value) {
		if (typeof name === 'string' && typeof value === 'undefined') {
			return element.getAttribute(name);
		}
		if (element.length > 0) {
			return panache.each(element, function (i) {
				element[i].setAttribute(name, value);
			});
		} else {
			return element.setAttribute(name, value);
		}
	};

	/**
	 * before:
	 * Insert content before the matched element.
	 */
	panache.before = function (element, content) {
		if (typeof content == 'string') {
			return element.insertAdjacentHTML('beforebegin', content);
		} else if (content instanceof Node) {
			return element.parentNode.insertBefore(content, element);
		}
	};

	/**
	 * clone:
	 * Create a copy of the matched element.
	 */
	panache.clone = function (element) {
		return element.cloneNode(true);
	};

	/**
	 * each:
	 * Iterates over a collection with callback(index).
	 */
	panache.each = function (collection, callback) {
		for (var i = 0; i < collection.length; i++) {
			callback.call(collection[i], i);
		}
	};

	/**
	 * empty:
	 * Remove all child nodes from the DOM.
	 */
	panache.empty = function (element) {
		if (element.length > 0) {
			return panache.each(element, function (i) {
				return element[i].innerHTML = '';
			});
		} else {
			return element.innerHTML = '';
		}
	};

	/**
	 * fade:
	 * Fade element with opacity value set from current scroll value and speed.
	 * @dependencies: You must use animate() to execute the scroll event.
	 */
	panache.fade = function (element, speed) {
		var value = 1 + (-speed * panache.scrollPosition() / 100);
		element.style.opacity = value;
		if (value <= 0) {
			element.style.visibility = 'hidden';
		} else {
			element.style.visibility = 'visible';
		}
	};

	/**
	 * hasClass:
	 * Determine if the matched element has the given class.
	 */
	panache.hasClass = function (element, name) {
		if (document.documentElement.classList) {
			return element.classList.contains(name);
		} else {
			return element.className = element.className.replace(new RegExp('(^|\\s)*' + name + '(\\s|$)*', 'g'), '');
		}
	};

	/**
	 * hide:
	 * Hide the matched elements.
	 */
	panache.hide = function (element) {
		if (element.length > 0) {
			return panache.each(element, function (i) {
				element[i].style.display = 'none';
			});
		} else {
			return element.style.display = 'none';
		}
	};

	/**
	 * inview:
	 * Determine if an element is in viewport.
	 */
	panache.inview = function (element) {
		var distance = element.getBoundingClientRect();
		if (distance.top <= (window.innerHeight || document.documentElement.clientHeight) && distance.bottom >= 0) {
			return true;
		} else {
			return false;
		}
	};

	/**
	 * last:
	 * Get the last element.
	 */
	panache.last = function (element) {
		return element[element.length - 1];
	};

	/**
	 * move:
	 * Move the matched element with set speed on scroll.
	 * You can regulate the speed from -5 to 10, where -5 is very slow and 10 is
	 * very fast. The default speed value is -2 and the default center mode is false.
	 * @dependencies: You must use animate() to execute the scroll event.
	 */
	panache.move = function (element, speed, center) {
		var center = center || false, // Default to false
				speed = speed || -2, // Default speed is -2
				position = 0,
				positionY = 0,
				screenY = 0,
				blockTop = 0,
				blockHeight = 0,
				percentage = 0;

		// Limit the given number in the range [min, max]:
		var clamp = function(number, min, max) {
			return (number <= min) ? min : ((number >= max) ? max : number);
		};

		// If someone tries to crank the speed, limit them to -5/+10:
		speed = clamp(speed, -5, 10);

		// Set scroll position if the center mode is in use:
		if (center) {
			if (window.pageYOffset !== undefined) {
				positionY = window.pageYOffset;
			} else {
				positionY = panache.scrollPosition();
			}
		}

		// Measure the canvas and the matched element in it:
		blockTop = positionY + element.getBoundingClientRect().top;
		blockHeight = element.clientHeight || element.offsetHeight || element.scrollHeight;
		screenY = window.innerHeight;

		// The percentage is a part used in the calculation of the scroll position:
		if (center) {
			percentage = 0.5;
		} else {
			percentage = (positionY - blockTop + screenY) / (blockHeight + screenY);
		}

		// Return the latest position value, based on scroll position and speed:
		function updatePosition(percentage, speed) {
			var value = (speed * (100 * (1 - percentage)));
			return Math.round(value);
		};

		// Set the base position of the element:
		var base = updatePosition(percentage, speed);

		// Return the latest positionY value, if a scroll has occured:
		function setPosition() {
			var oldPositionY = positionY;
			if (window.pageYOffset !== undefined) {
				positionY = window.pageYOffset;
			} else {
				positionY = panache.scrollPosition();
			}
			if (oldPositionY !== positionY) {
				// The scroll has changed, return true:
				return true;
			}
			// The scroll did not changed, return false:
			return false;
		};

		// Run setPosition() to receive the latest positionY value:
		setPosition();

		// After the latest positionY value is generated, recalculate the percentage value:
		percentage = ((positionY - blockTop + screenY) / (blockHeight + screenY));

		// Generate the position value:
		position = updatePosition(percentage, speed) - base;

		// Move the element:
		var value = 'translate3d(0, ' + position + 'px' + ', 0)';
		element.style.transform = value;
	};

	/**
	 * on:
	 * Attach an event handler function for one or more events to the selected elements.
	 */
	panache.on = function (event, element, handler) {
		if (document.addEventListener) {
			element.addEventListener(event, handler, false);
		} else if (document.attachEvent) {
			element.attachEvent('on' + event, handler);
		}
	};

	/**
	 * parent:
	 * Get the parent of each element in the current set of matched elements.
	 */
	panache.parent = function (element) {
		if (element.length > 0) {
			return panache.each(element, function (i) {
				element[i].parentNode;
			});
		} else {
			return element.parentNode;
		}
	};

	/**
	 * prepend:
	 * Insert element to the beginning of the matched target.
	 */
	panache.prepend = function (target, element) {
		if (typeof element === 'string') {
			return target.insertAdjacentHTML('afterbegin', element);
		} else if (element instanceof Node) {
			return target.insertBefore(element, target.firstChild);
		}
	};

	/**
	 * ready:
	 * Wait until the DOM is ready before executing code.
	 */
	panache.ready = function (handler) {
		if (typeof handler !== 'function') {
			return;
		} else if (document.readyState === 'complete') {
			return handler();
		}
		document.addEventListener('DOMContentLoaded', handler, false);
	}

	/**
	 * remove:
	 * Remove the set of matched elements from the DOM.
	 */
	panache.remove = function (element) {
		if (element.length > 0) {
			return panache.each(element, function (i) {
				if (element[i].parentNode) {
					element[i].parentNode.removeChild(element[i]);
				}
			});
		} else {
			return element.parentNode.removeChild(element);
		}
	};

	/**
	 * removeClass:
	 * Remove one or more classes from each element.
	 */
	panache.removeClass = function (element, names) {
		panache.forEach(names, function (name) {
			if (document.documentElement.classList) {
				if (panache.hasClass(element, name)) {
					element.classList.remove(name);
				}
			} else {
				if (panache.hasClass(element, name)) {
					element.className = element.className.replace(new RegExp('(^|\\s)*' + name + '(\\s|$)*', 'g'), '');
				}
			}
		});
	};

	/**
	 * rotate:
	 * Rotate the matched element on scroll.
	 * You can regulate the speed, number higher than 1 increase the speed. To
	 * decrease the speed use a number less than 1, for instance 0.5. Negative
	 * speed number rotates the element anticlockwise. Positive speed number
	 * rotates the element clockwise.
	 * @dependencies: You must use animate() to execute the scroll event.
	 */
	panache.rotate = function (element, speed) {
		var value = 'rotate(' + (panache.scrollPosition() * speed) + 'deg)';
		element.style.transform = value;
	};

	/**
	 * scale:
	 * Scale the matched element on scroll. Negative zoom scales the element
	 * down. Positive zoom scales the element up.
	 * @dependencies: You must use animate() to execute the scroll event.
	 */
	panache.scale = function (element, zoom) {
		var value = 'scale(' + (1 + (zoom * panache.scrollPosition()) / 100) + ')';
		element.style.transform = value;
	};

	/**
	 * scrollPosition:
	 * Get the scroll top position.
	 */
	panache.scrollPosition = function () {
		if (document.documentElement.scrollTop == 0) {
			return document.body.scrollTop;
		} else {
			return document.documentElement.scrollTop;
		}
	};

	/**
	 * scrollValue:
	 * Get the scrolled part in percent.
	 */
	panache.scrollValue = function () {
		var scrollTop = window.pageYOffset,
				scrollHeight = document.body.scrollHeight,
				windowHeight = window.innerHeight,
				scrollValue = (scrollTop / (scrollHeight - windowHeight)) * 100;

		return scrollValue;
	}

	/**
	 * show:
	 * Show the matched elements.
	 */
	panache.show = function (element) {
		if (element.length > 0) {
			return panache.each(element, function (i) {
				element[i].style.display = '';
			});
		} else {
			return element.style.display = '';
		}
	};

	/**
	 * siblings:
	 * Get the siblings of the matched element.
	 */
	panache.siblings = function (element) {
		return Array.prototype.filter.call(element.parentNode.children, function(child) {
			return child !== element;
		});
	};

	/**
	 * toggleClass:
	 * Add or remove one or more classes from each element.
	 */
	panache.toggleClass = function (element, names) {
		panache.forEach(names, function (name) {
			if (document.documentElement.classList) {
				element.classList.toggle(name);
			} else {
				if (panache.hasClass(element, name)) {
					panache.removeClass(element, name);
				} else {
					panache.addClass(element, name);
				}
			}
		});
	};

	// FOR INTERNAL USE ONLY:
	panache.forEach = function (items, callback) {
		if (Object.prototype.toString.call(items) !== '[object Array]') {
			items = items.split(' ');
		}
		for (var i = 0; i < items.length; i++) {
			callback(items[i], i);
		}
	};

	return panache;

});
