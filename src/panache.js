(function (root, factory) {

    root.panache = root.$ = factory();

})(this, function () {

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
            tagMatch = (/^\w+$/),
            htmlMatch = (/^</);

        if (context) {
            if (idMatch.test(selector)) {
                return context.getElementById(selector.substr(1));
            } else if (classMatch.test(selector)) {
                return context.getElementsByClassName(selector.substr(1));
            } else if (tagMatch.test(selector)) {
                return context.getElementsByTagName(selector);
            } else if (htmlMatch.test(selector)) {
                return panache.createNode(selector);
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
            } else if (htmlMatch.test(selector)) {
                return panache.createNode(selector);
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
     * @todo: Insert content to multiple matched elements.
     */
    panache.after = function (element, content) {
        if (typeof content === 'string') {
            element.insertAdjacentHTML('afterend', content);
        } else if (content instanceof Node) {
            element.parentNode.insertBefore(content, element.nextSibling);
        }
    };

    /**
     * animate:
     * Animate on scroll with requestAnimationFrame.
     * @reference: http://www.html5rocks.com/en/tutorials/speed/animations/
     */
    panache.animate = function (callback) {
        var animate = window.requestAnimationFrame,
            ticking = false,
            lastTime = 0;

        function onScroll() {
            requestTick();
        };
        function requestTick() {
            if (!ticking) {
                animate(update);
            }
            ticking = true;
        };
        function update() {
            if (ticking) {
                callback();
            }
            // Reset the tick, so we can capture the next onScroll:
            ticking = false;
        };
        panache.on('scroll', window, onScroll);

        // Polyfill for requestAnimationFrame:
        // @reference: https://gist.github.com/paulirish/1579671
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback) {
                var currentTime = new Date().getTime(),
                    timeToCall = Math.max(0, 16 - (currentTime - lastTime));

                var id = window.setTimeout(function () {
                    callback(currentTime + timeToCall);
                }, timeToCall);
                lastTime = currentTime + timeToCall;
                return id;
            };
        };
    };

    /**
     * append:
     * Insert the matched element to the end of the matched target.
     * @todo: Insert content to multiple matched elements.
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
     * Get the value of an attribute from the matched element or set one attribute for matched element.
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
     * @todo: Insert content to multiple matched elements.
     */
    panache.before = function (element, content) {
        if (typeof content == 'string') {
            return element.insertAdjacentHTML('beforebegin', content);
        } else if (content instanceof Node) {
            return element.parentNode.insertBefore(content, element);
        }
    };

    /**
     * children:
     * Get the children of each element.
     */
    panache.children = function (element) {
        return element.children;
    };

    /**
     * clone:
     * Create a copy of the matched element.
     */
    panache.clone = function (element) {
        return element.cloneNode(true);
    };

    /**
     * data:
     * Get data associated with the matched element, or set data for the matched element.
     */
    panache.data = function (element, name, value) {
        return panache.attr(element, name, value);
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
    panache.fade = function (element, speed = 10) {
        var value = 1 + (-speed * panache.scrollValue() / panache.height());
        element.style.opacity = value;
        if (value <= 0) {
            element.style.visibility = "hidden";
        } else {
            element.style.visibility = "visible";
        }
    };

    /**
     * find:
     * Get the descendants of each matched element, filtered by a selector.
     */
    panache.find = function (element, selector) {
        return element.querySelectorAll(selector);
    };

    /**
     * first:
     * Get the first matched element.
     */
    panache.first = function (element) {
        return element[0];
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
     * height:
     * Get the height of the viewport.
     */
    panache.height = function () {
        if (typeof window.innerHeight !== undefined) {
            return window.innerHeight;
        } else if (typeof document.documentElement !== undefined) {
            return document.documentElement.clientHeight;
        } else {
            return document.body.clientHeight;
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
     * html:
     * Get the HTML content of the element or set the HTML content for each element in the collection.
     */
    panache.html = function (element, html) {
        if (typeof html !== 'string') {
            return element.innerHTML;
        }
        return panache.each(element, function (i) {
            element[i].innerHTML = html;
        });
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
     * Move the matched element up, down, right or left in viewport with set speed on scroll.
     * You can regulate the speed, number higher than 1 increase the speed. To decrease the speed use a number less than 1, for instance 0.5.
     * Define if the animation shall start direct on scroll or first when the element is inview.
     * @dependencies: You must use animate() to execute the scroll event.
     */
    panache.move = function (element, direction, speed, inview = false) {
        var value;

        if (inview == false) {
            switch (direction) {
                case 'up':
                    direction = -1;
                    value = "translate3d(0, " + (direction * panache.scrollValue() * speed) + "%, 0)";
                    break;
                case 'down':
                    direction = 1;
                    value = "translate3d(0, " + (direction * panache.scrollValue() * speed) + "%, 0)";
                    break;
                case 'right':
                    direction = 1;
                    value = "translate3d(" + (direction * panache.scrollValue() * speed) + "%, 0, 0)";
                    break;
                case 'left':
                    direction = -1;
                    value = "translate3d(" + (direction * panache.scrollValue() * speed) + "%, 0, 0)";
                    break;
            }
        } else if (inview == true) {
            if (panache.inview(element) == true) {
                switch (direction) {
                    case 'up':
                        direction = -1;
                        value = "translate3d(0, " + (direction * panache.scrollValue() * speed) + "%, 0)";
                        break;
                    case 'down':
                        direction = 1;
                        value = "translate3d(0, " + (direction * panache.scrollValue() * speed) + "%, 0)";
                        break;
                    case 'right':
                        direction = 1;
                        value = "translate3d(" + (direction * panache.scrollValue() * speed) + "%, 0, 0)";
                        break;
                    case 'left':
                        direction = -1;
                        value = "translate3d(" + (direction * panache.scrollValue() * speed) + "%, 0, 0)";
                        break;
                }
            }
        }
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
     * @todo: Insert content to multiple matched elements.
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
     * You can regulate the speed, number higher than 1 increase the speed. To decrease the speed use a number less than 1, for instance 0.5.
     * Negative speed number rotates the element anticlockwise. Positive speed number rotates the element clockwise.
     * @dependencies: You must use animate() to execute the scroll event.
     * @todo: Consider to implement alternative rotate on y-axle and x-axle.
     */
    panache.rotate = function (element, speed = 10) {
        var value = "rotate(" + (panache.scrollValue() * speed) + "deg)";
        element.style.transform = value;
    };

    /**
     * scale:
     * Scale the matched element on scroll. Negative zoom scales the element down. Positive zoom scales the element up.
     * @dependencies: You must use animate() to execute the scroll event.
     */
    panache.scale = function (element, zoom) {
        var value = "scale(" + (1 + (zoom * panache.scrollValue() / panache.height())) + ")";
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
            windowHeight = panache.height(),
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

    /**
     * width:
     * Get the width of the viewport.
     */
    panache.width = function () {
        if (typeof window.innerWidth !== undefined) {
            return window.innerWidth;
        } else if (typeof document.documentElement !== undefined) {
            return document.documentElement.clientWidth;
        } else {
            return document.body.clientWidth;
        }
    };

    // FOR INTERNAL USE ONLY:
    panache.createNode = function (html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        return div.firstChild;
    };

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
