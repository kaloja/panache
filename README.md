# Panache
Panache is a JavaScript helper library.

## Install
Download Panache and add it to your project. Ensure you use the compiled file in the `dist` folder for a better web performance. And that's it. You are ready to go! Start manipulate the DOM in an elegant and effective way, without throwing a bunch of prototype extensions into the DOM.


```html
<body>
    <!-- html above -->
    <script src="dist/panache.min.js"></script>
    <script src="app.js"></script>
</body>
```

## Use
Use this library with `panache` or `$`. The `$` is just an alias for panache.

## API documentation

#### panache()
Select the matched element from the document or context. It use selector method based on type of inserted selector.

```js
panache(selector) // => collection
panache(selector, context) // => collection
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

#### ajax()
Perform an asynchronous HTTP request.

`callback => function`

```js
panache.ajax(url, callback, method, async, data)
```

#### animate()
Animate on scroll with requestAnimationFrame.

`callback => function`

```js
panache.animate(callback) // => collection
```

#### append()
Insert the matched element to the end of the matched target.

```js
panache.append(target, element) // => collection
```

#### attr()
Get the value of an attribute from the matched element or set one attribute for matched element.

```js
panache.attr(element, name) // => attribute value
panache.attr(element, name, value) // => collection
```

### B
#### before()
Insert content before the matched element.

```js
panache.before(element, content) // => collection
```

### C
#### clone()
Create a copy of the matched element.

```js
panache.clone(element) // => collection
```

### E
#### each()
Iterates over a collection with callback(index).

`collection => array`
`callback => function`

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
Fade element with opacity value set from current scroll value and speed. You must use `animate()` to execute the scroll event.

`speed => integer`

```js
panache.fade(element, speed) // => collection
```

### H
#### hasClass()
Determine if the matched element has the given class.

```js
panache.hasClass(element, name) // => boolean
```

#### hide()
Hide the matched elements.

```js
panache.hide(element) // => collection
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
Move the matched element with set `speed` on scroll. You can regulate the speed from `-5` to `10`, where `-5` is very slow and `10` is very fast. The default speed value is `-2` and the default center mode is `false`. You must use `animate()` to execute the scroll event.

`speed => integer`
`center => boolean`

```js
panache.move(element, speed, center) // => collection
```

### O
#### on()
Attach an event handler function for one or more events to the selected elements.

`handler => function`

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
Insert element to the beginning of the matched target.

```js
panache.prepend(target, element) // => collection
```

### R
#### ready()
Wait until the DOM is ready before executing code.

`handler => function`

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
Rotate the matched element on scroll. You can regulate the `speed`, You can regulate the speed, number higher than `1` increase the speed. To decrease the speed use a number less than `1`, for instance `0.5`. Negative speed number rotates the element anticlockwise. Positive speed number rotates the element clockwise. You must use `animate()` to execute the scroll event.

`speed => integer`

```js
panache.rotate(element, speed) // => collection
```

### S
#### scale()
Scale the matched element on scroll. Negative zoom scales the element down. Positive zoom scales the element up. You must use `animate()` to execute the scroll event.

`zoom => integer`

```js
panache.scale(element, zoom) // => collection
```

#### scrollPosition()
Get the scroll top position.

```js
panache.scrollPosition() // => integer
```

#### scrollValue()
Get the scrolled part in percent.

```js
panache.scrollValue() // => integer
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

## Contribute
If you want to improve Panache, feel free to contribute. I will appreciate it, cooperation gives better results. 
You can do this by create a pull request.
