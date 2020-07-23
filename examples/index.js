var view = new ppView({
		el:"[pp-view='example1']",
		template:'<h1 data-algo="aa" pp-click="hi($el)" class="title is-1" pp-text="helloword" ></h1>',
		data:{
			helloword:"Hello Word !!!"
		},
		methods:{
			hi($el){

				var algo = $el.getAttribute("data-algo");

				console.log(algo);

			}
		},
		filters:{}
	});
