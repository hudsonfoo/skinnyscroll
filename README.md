# @hudsonfoo/skinnyscroll

[![npm (scoped)](https://img.shields.io/npm/v/@hudsonfoo/skinnyscroll.svg)](https://www.npmjs.com/package/@hudsonfoo/skinnyscroll)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@hudsonfoo/skinnyscroll.svg)](https://www.npmjs.com/package/@hudsonfoo/skinnyscroll)

Extra itty bitty scroll watcher.

## Install

```
$ npm install @hudsonfoo/skinnyscroll
```
or

```
$ yarn @hudsonfoo/skinnyscroll
```

## Usage

Use attribute `data-skinnyscroll` and pass options as JSON.

SkinnyScroll will query the DOM for nodes with that attribute after being loaded. You can re-query the DOM with the `update` method.

### Basic usage

```html
<div data-skinnyscroll='{ "name": "my-event-name" }'></div>
```

```js
const SkinnyScroll = require('@hudsonfoo/skinnyscroll');

SkinnyScroll.on('my-event-name', element => {
  // Do whatever you want, but as an example:
  element.addClass('slideInUp'); // animate.css
});
```

### With options

```html
<!-- This will call your event 200 pixels after entering the screen from below -->
<div data-skinnyscroll='{ "name": "my-event-name", "distance": 200 }'></div>
```

### Fire only once

```js
const SkinnyScroll = require('skinnyscroll');

function makeItSlide(element) {
  // Turn off event listener
  SkinnyScroll.off('my-event-name', makeItSlide);
  
  // Do whatever you want
}

SkinnyScroll.on('my-event-name', makeItSlide);
```

### Fire and turn off for a short amount of time

```js
const SkinnyScroll = require('skinnyscroll');

function makeItSlide(element) {
  // Turn off event listener
  SkinnyScroll.off('my-event-name', makeItSlide);
  
  setTimeout(() => {
    SkinnyScroll.on('my-event-name', makeItSlide);
  }, 500);
  
  // Do whatever you want
}

SkinnyScroll.on('my-event-name', makeItSlide);
```

### Methods list

| Method | Arguments                              | Description                                   |
|--------|----------------------------------------|-----------------------------------------------|
| on     | `name` {String}, `callback` {Function} | Will fire callback when event is called       |
| off    | `name` {String}, `callback` {Function} | Turns off callback for this event             |
| add    | {HTMLNode}                             | Adds new HTML node to the watch list          |
| update | {void}                                 | Re-queries DOM for skinnyscroll nodes         |
