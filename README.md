# pp-action

## Install

`npm install pp-action --save`

## Live Demo

Go <a href="https://ppaction.netlify.app" target="_blank" >Demo</a>

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

<p><strong>Example:</strong><code>&#60;h1 pp-text="myText" >&#60;/h1&#62;</code></p>
<p><strong>Structure:</strong><code>&#60;h1 pp-text="[expression]" >&#60;/h1&#62;</code></p>

<p><code>pp-text</code> update the innerText call var from data or expression javascript</p>

___
### <code>pp-show</code>

<p><strong>Example:</strong><code>&#60;div pp-show="show" >&#60;/div&#62;</code></p>
<p><strong>Structure:</strong><code>&#60;div pp-show="[expression]" >&#60;/div&#62;</code></p>
<p><code>pp-show</code> toggles property display if is true <code>display:block</code> else if false <code>display:none</code></p>

___
### <code>pp-html</code>

<strong>Example:</strong><code>&#60;div pp-html="MyHtml" >&#60;/div&#62;</code><br>
<strong>Structure:</strong><code>&#60;div pp-html="[expression]" >&#60;/div&#62;</code>

<p><code>pp-html</code> update the innerHTML call var from data or expression javascript, the children injection is render all directives, model and events</p>

___
### <code>pp-bind</code>

<strong>Example:</strong><code>&#60;div pp-bind="{'data-main':MyConditional ? 'data1':'data2','data-secondary':myValueStatic}" >&#60;/div&#62;</code><br>
<strong>Structure:</strong><code>&#60;div pp-bind="{'data-main':[expression],'data-secondary':[expression]}" >&#60;/div&#62;</code>
<p><code>pp-bind</code> manipue the attributes from elements toggled value the attribute</p>

___
### <code>pp-style</code>

<strong>Example:</strong><code>&#60;div pp-style="{'color':'red','background':MyBackground}" >&#60;/div&#62;</code><br>
<strong>Structure:</strong><code>&#60;div pp-style="{'color':[expression],'background':[expression]}" >&#60;/div&#62;</code>
<p><code>pp-style</code> This directive manipule the list property style from element</p>

___
### <code>pp-class</code>

<strong>Example:</strong><code>&#60;div pp-class="{'Myclass1':true,'MyClass2':show == true}" >&#60;/div&#62;</code><br>
<strong>Structure:</strong><code>&#60;div pp-class="{'Myclass1':[expression],'MyClass2':[expression]}" >&#60;/div&#62;</code>
<p><code>pp-class</code> add and remove class from element, depending if the expression resolve boolean expresion</p>

## Events

<strong>pp-[event]</strong>

| Event Mouse |
| ------ |
|click|
|dblclick|
|mousedown|
|mousemove|
|mouseout|
|mouseover|
|mouseup|
|wheel|

| Event Keyboard |
| ------ |
|keydown|
|keypress|
|keyup|

<strong>Example:</strong><code>&#60;div pp-click="myFunction()" pp-dblclick="myTextVar='newValue'" >&#60;/div&#62;</code><br>
<strong>Structure:</strong><code>&#60;div pp-click="[expression]" pp-dblclick="[expression]" >&#60;/div&#62;</code>
<p><code>pp-[events]</code>Directive lisen event from javascript</p>

##  Model

	

## Security

If you find a security vulnerability, please send an email to [c4rl0sill3sc4@gmail.com](mailto:c4rl0sill3sc4@gmail.com)

## License

Copyright © 2019-2020 Carlos Illesca and contributors

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.