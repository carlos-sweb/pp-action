

var viewModel = new ppView({

	el:"[pp-view='models']",

	template:`
			

			<button pp-disabled="username=='AAAAA'" class="button is-link" pp-click=" username='AAAAA', hello() ">click</button>
		
			<form novalidate="novalidate" pp-form name="form1"  pp-submit="$event.preventDefault(),submit($form)" >
				<div class="field" >									
					<label><span pp-show="$form.username.$required" >&nbsp;*</span>&nbsp;Nombre</label>
					<div class="control">
						<input pp-required="true" class="input" type="text" pp-model="username" />
					</div>					 
					 <p pp-text="!$form.username.$valid ? 'Este Campo es Obligatorio':'&nbsp;' " class="help is-danger"></p>
				</div>			
				<button pp-disabled="!$form.$valid" class="button is-link" type="submit" >Enviar</button>
				<button class="button" pp-click="console.log('click')" type="reset"  >AA</button>	
			</form>						

			`,


	methods:{
		hello(){
			//alert("aaaa");
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
		username:function( newValue , oldValue , event){
				console.log("Watch escuchando el cambio");
		}
	}

});
