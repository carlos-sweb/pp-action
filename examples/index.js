

var viewModel = new ppView({

	el:"[pp-view='models']",

	template:`
			<input type="text" pp-click=" myVar = clickone(myVar)"  />
			<h1 pp-text="myVar"></h1>
			<button pp-click="algo = !algo" pp-disabled="myVar == 'hola' " >AAA</button>
			<input class="input" pp-readonly="algo" pp-model="myVar" type="text" pp-model-debounce="150"/>
			<div pp-for="list" >
				<div pp-for-template >
					<h3 pp-for-text="list.name" ></h3>
					<p pp-for-text="list.description" ></p>
				</div>
			</div>

			<form novalidate="novalidate" pp-form name="form1"  pp-submit="$event.preventDefault(),submit(this.$form[$el.getAttribute('name')])" >
				<input required pp-model="username" autocomplete="off" type="text" name="enviar"  />
				<label pp-text="$form.$valid ? 'es Valido' : 'no es valido' "  ></label>
				<p pp-text="contry == 0 ? 'Malo':'Bueno' " ></p>				
				<select pp-model="contry" pp-model-format="number" >
					<option value="0">No Defined</option>
					<option value="1">Chile</option>
					<option value="2">Francia</option>
					<option value="3">Estados unidos</option>
				</select>	
				<button type="submit" >Enviar</button>	
			</form>


			`,


	methods:{
		hello(){
			console.log("Hellow");
		},
		clickone(data){				
			return data+" | poto";
		},
		submit( form  ){
			console.log(form);
		}
	},

	data:{
		myVar:'Text in Input',

		algo:true,

		username : 'CarlosIllesca',

		contry:3,

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
				console.log("Watch escuchando el cambio");
		}
	}

});
