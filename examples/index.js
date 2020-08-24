var view = new ppView({
		el:"[pp-view='example1']",
		template:'<h1 data-algo="aa" pp-click="hi($el)" class="title is-1" pp-text="helloword|helloFilter|addText" ></h1>',
		data:{
			helloword:"Hello Word !!!"
		},
		methods:{
			hi($el){

				var algo = $el.getAttribute("data-algo");

				console.log(algo);

			}
		},
		filters:{
			helloFilter( text ){

				const result =  text+" Text Add ";

				return result;
			},
			addText( text ){

				return text+" * Add more test";

			}
		}
});

var viewModel = new ppView({

	el:"[pp-view='models']",

	template:`
			

			<input type="text" pp-click="console.log('click ')" vaue="keypress" />

			<h1 pp-text="myVar"></h1>
			<button pp-click="algo = !algo" pp-disabled="myVar == 'hola' " >AAA</button>
			<input class="input" pp-readonly="algo" pp-model="myVar" type="text" pp-model-debounce="150"/>
			<div pp-for="list" >
				<div pp-for-template >
					<h3 pp-for-text="list.name" ></h3>
					<p pp-for-text="list.description" ></p>
				</div>
			</div>

			<form pp-form name="form1"  pp-submit="submit($form),$event.preventDefault()" >
				<input autocomplete="off" type="text" name="enviar"  />	
				<button type="submit" >Enviar</button>	
			</form>

			`,


	methods:{

		hello(){

			console.log("Hellow");

		},

		submit( form ){

			console.log(form);
			

		}

	},

	data:{
		myVar:'Text in Input',

		algo:true,

		username : 'CarlosIllesca',

		list:[{
			name : "Productos 1",
			price : 3000,
			description:"UAhahqhsuhuwhsw ijswijsiw"
		},{
			name : "Productos 2",
			price : 5000,
			description: "AOKAAOKAOAKOAKOAKOA"
		}]
	},

	watch:{
		myVar:function( newValue , oldValue , event){
				
		}
	}

});
