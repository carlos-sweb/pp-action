

var viewModel = new ppView({
	el:"[pp-view='models']",
	template:`
			<form novalidate="novalidate" pp-form name="form1" pp-submit-prevent  pp-submit="submit($form)" >
				<div class="field" >									
					<label><span pp-show="$form.username.$required" >&nbsp;*</span>&nbsp;Nombre</label>
					<div class="control">
						<input pp-maxlength="20" pp-minlength="10" required class="input" type="text" pp-model="username" />
						<p pp-text="!$form.username.$valid && $form.username.$dirty ? 'Este Campo es Obligatorio':'&nbsp;' " class="help is-danger"></p>
					</div>
					
					<div class="control">
						<label for="">Clave</label>
						<input pp-maxlength="20" pp-minlength="10" required class="input" type="password" pp-model="password" />
						<p pp-text="!$form.password.$valid && $form.password.$dirty ? 'Este Campo es Obligatorio':'&nbsp;' " class="help is-danger"></p>
					</div>

					<div class="control">
						<label for="" >Clave</label>
						<input required class="input" type="date" pp-model="cumple" />
						<p pp-text="!$form.cumple.$valid && $form.cumple.$dirty ? 'Este Campo es Obligatorio':'&nbsp;' " class="help is-danger"></p>
					</div>

					<div class="control">
						<label for="">Description ( Optional ) </label>
						<textarea class="textarea" pp-model="description" ></textarea>	
					</div>	

					<div class="control">
						<label for="">Description ( Optional ) </label>
						<textarea class="textarea" pp-model="description" ></textarea>	
					</div>	
				

				</div>
				<button pp-disabled="!$form.$valid" class="button is-link" type="submit" >Enviar</button>
				<button class="button" type="reset"  >AA</button>
			</form>`,
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

		username : '',

		password : '',

		iagree:true,

		cumple:'',

		description:'My description is : ',

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
	}

});
