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

If you find a security vulnerability, please send an email to [c4rl0sill3sc4@gmail.com](mailto:c4rl0sill3sc4@gmail.com)

## License

Copyright © 2019-2020 Carlos Illesca and contributors

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.