# pp-action

## Install

`npm install pp-action --save`

## Use

```javascript

import View from 'pp-action.js';

var view = new View({
	el:"[pp-view]",
	data:{
		title:"hello Word",
		show:true
	},
	methods:{
		hello(){
			alert("Hello !!");
		}
	},
	template:`
		<div>
			<h1 pp-text='title' ></h1>
			<hr>
			<h2 pp-show='show' >Show Text<h2>
			<button pp-text='show ? \'Hide\':\'Show\'' pp-click='show=!show' ><button>
			<br>
			<button pp-click='hello()' >Hello</button>
		</div>`
});


```

## Directives

| Directive | Description |
| ------ | ------ |
| pp-text | This directive update the property <code><small>innerText</small></code> |
| pp-show | This directive change property <code><small>display</small></code> from element style |
| pp-html | This directive update the property <code><small>innerHTML</small></code> |
| pp-bind | This directive manipule the list attributes from element|
| pp-style| This directive manipule the list property style from element|
| pp-class| This directive manipule the list style class from element  |

___
### <code>pp-text</code>

<strong>Example:</strong><code><h1 pp-text="myText" ></h1></code>
<strong>Structure:</strong><code><h1 pp-text="[expression]" ></h1></code>
___
### <code>pp-show</code>

<strong>Example:</strong><code></code>
<strong>Structure:</strong><code></code>
___
### <code>pp-html</code>

<strong>Example:</strong><code></code>
<strong>Structure:</strong><code></code>
___
### <code>pp-bind</code>

<strong>Example:</strong><code></code>
<strong>Structure:</strong><code></code>
___
### <code>pp-style</code>

<strong>Example:</strong><code></code>
<strong>Structure:</strong><code></code>
___
### <code>pp-class</code>

<strong>Example:</strong><code></code>
<strong>Structure:</strong><code></code>

## Security

If you find a security vulnerability, please send an email to [c4rl0sill3sc4@gmail.com](mailto:c4rl0sill3sc4@gmail.com)

## License

Copyright © 2019-2020 Carlos Illesca and contributors

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.