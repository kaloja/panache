# Panache
Panache is a JavaScript helper library.

## Install
Download Panache and add it to your project. Ensure you use the compiled file in the `dist` folder for better web performance. And that's it. You are ready to go! Start manipulate the DOM in an elegant and effective way, without throwing a bunch of prototype extensions into the DOM.


```html
<body>
    <!-- html above -->
    <script src="dist/panache.min.js"></script>
    <script src="app.js"></script>
</body>
```

## Use
Use this library with `panache` or `$`. The `$` is just an alias for panache.

## Panache API documentation

#### panache()
Select the matched element from the document or context. It use selector method based on type of inserted selector.

```js
panache(selector) // => collection, selected from root of the document
panache(selector, context) // => collection, selected from context
```

### A
#### addClass()
Add one or more classes to each element.

```js
panache.addClass(element, name) // => collection
```

#### after()
Insert content after the matched element.

```js
panache.after(element, content) // => collection
```

#### animate()
Animate on scroll with requestAnimationFrame.

```js
panache.animate(callback) // => collection
```

#### append()
Insert the matched element to the end of each target.

```js
panache.append(target, element) // => collection
```

#### attr()
Get the value of an attribute from the matched element or set one attribute for matched element.

```js
panache.attr(element, name) // => attribute name
panache.attr(element, name, value) // => collection
```

### B
#### before()
Insert content before the matched element.

```js
panache.before(element, content) // => collection
```

### C
#### children()
Get the children of each element.

```js
panache.children(element) // => collection
```

#### clone()
Create a copy of the matched element.

```js
panache.clone(element) // => collection
```

### D
#### data()
Get data associated with the matched element, or set data for the matched element.

```js
panache.data(element, name) // => data name
panache.data(element, name, value) // => collection
```

### E
#### each()
Iterates over a collection with callback(index).

```js
panache.each(collection, callback) // => collection
```

#### empty()
Remove all child nodes from the DOM.

```js
panache.empty(element) // => collection
```

### F
#### fade()
Fade element from opacity value set from current scroll position. You must use `animate()` to execute the scroll event.

```js
panache.fade(element) // => collection
```

#### find()
Get the descendants of each matched element, filtered by a selector.

```js
panache.find(element, selector) // => collection
```

#### first()
Get the first matched element.

```js
panache.first(element) // => collection
```

### H
#### hasClass()
Determine if the matched element has the given class.

```js
panache.hasClass(element, name) // => boolean
```

#### height()
Get the height of the viewport.

```js
panache.height() // => integer
```

#### hide()
Hide the matched elements.

```js
panache.hide(element) // => collection
```

#### html()
Get the HTML content of the element or set the HTML content for each element in the collection.

```js
panache.html(element) // => html text
panache.html(element, html) // => html text
```

### I
#### inview()
Determine if an element is in viewport.

```js
panache.inview(element) // => boolean
```

### L
#### last()
Get the last element.

```js
panache.last(element) // => collection
```

### M
#### move()
Move the matched element `up`, `down`, `right` or `left` in viewport with set `speed` on scroll. You can regulate the speed, higher number means lower speed on the movement. You must use `animate()` to execute the scroll event.

`element => string`
`direction => string`
`speed => integer`

```js
panache.move(element, direction, speed) // => collection
```

### O
#### on()
Attach an event handler function for one or more events to the selected elements.

```js
panache.on(event, element, handler) // => collection
```

### P
#### parent()
Get the parent of each element in the current set of matched elements.

```js
panache.parent(element) // => collection
```

#### prepend()
Insert element to the beginning of each target.

```js
panache.prepend(target, element) // => collection
```

### R
#### ready()
Wait until the DOM is ready before executing code.

```js
panache.ready(handler) // => collection
```

#### remove()
Remove the set of matched elements from the DOM.

```js
panache.remove(element) // => collection
```
#### removeClass()
Remove one or more classes from each element.

```js
panache.removeClass(element, name) // => collection
```

#### rotate()
Rotate the matched element on scroll. You can regulate the `speed`, higher number means lower speed on the rotate. Negative speed number rotates the element anticlockwise. Positive speed number rotates the element clockwise. You must use `animate()` to execute the scroll event.

```js
panache.rotate(element, speed) // => collection
```

### S
#### scale()
Scale the matched element on scroll. Negative zoom scales the element down. Positive zoom scales the element up. You must use `animate()` to execute the scroll event.

```js
panache.scale(element, zoom) // => collection
```

#### scrollPosition()
Get the scroll top position.

```js
panache.scrollPosition() // => integer
```

#### show()
Show the matched elements.

```js
panache.show(element) // => collection
```

#### siblings()
Get the siblings of the matched element.

```js
panache.siblings(element) // => collection
```

### T
#### toggleClass()
Add or remove one or more classes from each element.

```js
panache.toggleClass(element, name) // => collection
```

### W
#### width()
Get the width of the viewport.

```js
panache.width() // => integer
```

## License
The MIT License

Copyright (c) 2016 Mattias Haal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
