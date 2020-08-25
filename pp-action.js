/*!!
 * Power Panel View <https://github.com/carlos-sweb/pp-action>
 * @author Carlos Illesca
 * @version 1.0.0 (2020/01/01 03:18 PM)
 * Released under the MIT License
 */
 (function(factory){
  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
  // We use `self` instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global;
  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {  	
    define(['exports'], function(exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.ppView = factory(root, exports);
      module.exports = root.ppView;
    });
  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {  
    factory(root, exports);
  // Finally, as a browser global.
  } else {
    root.ppView = factory(root, {});
  }
})(function(root, ppView) { 
	return function( options ){
    // ------------------------------------------------
    /*
    *@var debounce
    *@type Function
    *@description - Esta funcion crea un intervalo de tiempo para ser ejecutada
    * previniendo la sobre ejecutación de funciones 
    */
    this.debounce = function(func,wait){
        var timeoutId;
        return function(){          
          if( timeoutId ){
            clearTimeout(timeoutId);
          }
          const context = this;
          const args = arguments;
          timeoutId = setTimeout(()=>{
              func.apply( context , args  );
          },wait);          
        }
    }
    /**
    *@var pick
    *@type Function
    *@description - Funcion que se encarga de devolver las keys dadas en un objeto
    */
    this.pick = function(){
      var args = [].slice.call(arguments);
      var result = {};
      if( args.length > 1 ){
       var theObject = args[0];     
       args.shift();      
       if( typeof theObject == 'object' ){
         args.forEach(( arg )=>{
           if( typeof arg == 'string' ){             
              if( theObject.hasOwnProperty(arg) ){
                  result[arg] = theObject[arg];
              };  
           };
         });
       }      
       return Object.assign({...result},{});
      }else{
        return result;
      };
    }
    /*
    *@var omit
    *@type Function
    *@description - Function que omite keys dadas para un objeto
    */
    this.omit = function(){
      var args = [].slice.call(arguments);     
      var result = {};
      if( args.length > 1 ){
       var theObject = args[0];     
       args.shift();            
       if( typeof theObject == 'object' ){
         result = {...theObject};
         args.forEach(( arg )=>{
           if( typeof arg == 'string' ){             
              if( theObject.hasOwnProperty(arg) ){
                  delete result[arg];
              };  
           };
         });
       }      
       return Object.assign({...result},{});
      }else{
        return result;
      };
    }
  // ------------------------------------------------
    /**
    @function saferEval
    @params
    */
    this.saferEval = function(expression , dataContext , additionalHelperVariables = {} ){           
        return new Function(['$data', ...Object.keys(additionalHelperVariables)], `var result; with($data) { result = ${expression} };return result`).bind(this)(dataContext, ...Object.values(additionalHelperVariables));      
    }
    /*=============================================
    =  DEFINICION DE EVENTOS Y FUNCIONES          =
    =============================================*/
    /**
    *@var events
    *@type Object
    *@descriptions - Objeto que contiene los eventos y sus callback functiones
    **/
    this.events = {};
    /**
    *@var on
    *@type Function     
    *@return void
    *@description - Esta es la funcion que deja en escucha el evento y su callback 
    *para ser ejecutados cuando se ejectute la funcion emit
    **/
    this.on = function( eventName , callbacks ){
        if( typeof eventName == 'string' ){
          if( typeof callbacks == 'function' ){            
            if( !this.events.hasOwnProperty(eventName) ){
              this.events[ eventName ] = [];
            }            
            this.events[ eventName ].push( callbacks );
          }
        }        
    }
    // No use
    this.removeListener = function( eventName , callbacks ){
        var idx; 
        if( typeof this.events[eventName] === 'object' ){
          //idx = indexOf(this.events[eventName],callbacks);
          //if( idx > -1 ){
            //this.events[eventName].splice(idx,1);
          //}
        }
    }
    /**
    *@var emit
    *@type Function
    *@return void
    *@description - Emite un evento y Ejecuta todas las funciones que estan al escucha 
    * de este evento
    */
    this.emit = function( eventName ){        
        var i, listeners, length, args = [].slice.call(arguments, 1);
        if (typeof this.events[eventName] === 'object') {
          listeners = this.events[eventName].slice();         
          length = listeners.length;
          for (i = 0; i < length; i++) {
              listeners[i].apply(this, args);
          }
        }
    }
    /*==  End of DEFINICION DE EVENTOS Y FUNCIONES  ==*/
    /*=============================================
    =   SECCION DEFINICION DE VARIABLES           =
    =============================================*/  
    /**
    *@var el
    *@description element html 
    **/
    this.el = document.querySelector( options.el || null );
    /**
    *@var watch
    *@type Object
    *@description - objeto que contiene los datos de las funciones que 
    *estan observando los valores de cambio 
    **/
    this.watch = options.watch || {};
    
    /**
    *@var form
    *@type Object
    *@description - objecto que contiene los formularios   
    **/
    this.form = options.form || {};

    this.$form = {};

    /**
    *@var data
    *@type Object
    *@description - objeto que contiene los datos a manipular 
    * en la vista
    **/
    this.data = options.data || {};    
    /**
    *@var methods
    *@type Object
    *@description - Objeto que contiene un listado de functiones 
    * que interactuan con la vista o con la data o model 
    */
    this.methods  = options.methods || {};
    /**
    *@var filters
    *@type Object
    *@description - Objeto que contiene funciones para filtros
    */    
    this.filters  = options.filters || {};
    /**
    *@var template
    *@type String
    *@description - Es el codigo html obtenidos desde una cadena 
    **/
    this.template =  options.template || null;
    /**
    *@var lisenEvent
    *@type Object[Array]
    *@description listado de eventos de javascript
    */
    this.lisenEvent = {
       'window':['afterprint','beforeprint','beforeunload','error','hashchange','load','message','offline','online','pagehide','pageshow','popstate','resize','storage','unload'],
       'mouse':['click','dblclick','mousedown','mousemove','mouseout','mouseover','mouseup','wheel'],
       'keyboard':['keydown','keypress','keyup'],
       'drag':['drag','dragend','dragenter','dragleave','dragover','dragstart','drop','scroll'],
       'clipboard':['copy','cut','paste'],
       'media':[],
       'form':['blur','change','contextmenu','focus','input','invalid','reset','search','select','submit']
    };

    this.isBooleanAttr = function(attrName) {
      // As per HTML spec table https://html.spec.whatwg.org/multipage/indices.html#attributes-3:boolean-attribute
      // Array roughly ordered by estimated usage
      const booleanAttributes = ['disabled', 'checked', 'required', 'readonly', 'hidden', 'open', 'selected', 'autofocus', 'itemscope', 'multiple', 'novalidate', 'allowfullscreen', 'allowpaymentrequest', 'formnovalidate', 'autoplay', 'controls', 'loop', 'muted', 'playsinline', 'default', 'ismap', 'reversed', 'async', 'defer', 'nomodule'];
      return booleanAttributes.includes(attrName);
    }
    /*===== FIN DE LA SECCION DE DEFINICION DE VARIABLES ======*/
    // DEFINIMOS EL innerHTML del elemento con el Template cargado
    this.el.innerHTML = this.template;
    /*
    *@var detectingChangeData
    *@type Function
    *@description - Funcion detecting Change detecta los cambios en un objeto de data para la vista
    *
    */
    this.detectingChangeData = function( data , NativeEvent ){

        const keys = Object.keys( data );

          for( var i = 0; i < keys.length ; i++ ){

              const key = keys[i];

              if( data.hasOwnProperty(key) ){
                 
                 if( data[key] != this.data[key] ){

                   // execute watch function
                   if( this.watch.hasOwnProperty(key) ){
                     if( typeof this.watch[key] == 'function' ){
                        this.watch[key](data[key],this.data[key],NativeEvent);
                     }  
                   }

                   this.emit('dataChange');

                   break;

                 };

              }else{

               // execute watch function 
               if( this.watch.hasOwnProperty(key) ){
                 if( typeof this.watch[key] == 'function' ){
                  // valor antiguo 
                  //  
                  this.watch[key](data[key],this.data[key],NativeEvent);
                 }  
               }

                this.emit('dataChange');

                break;

              }
          }
    }
    /*
    *@var
    *@type Function
    *@description -
    */
    this.handleFormDirective = function( el ){
      if( el.hasAttribute('name') ){
        var nameForm = el.getAttribute('name');
        if( typeof nameForm == 'string' && nameForm != '' ){
          // ------------------------------------------------------------
          if( !this.$form.hasOwnProperty(nameForm) ){              
              this.$form[nameForm] = {
                $valid:true,
                $dirty:false
              }
          };
          var othersDirectives = Object.values({ 
          ...Array.from(el.querySelectorAll("[pp-text]")),
          ...Array.from(el.querySelectorAll("[pp-]")),
          ...Array.from(el.querySelectorAll("[pp-model]"))
          });

          //console.log( othersDirectives );

          var inputs = [
          ...Array.from(el.querySelectorAll("input[pp-model]")),
          ...Array.from(el.querySelectorAll("select[pp-model]")),
          ...Array.from(el.querySelectorAll("textarea[pp-model]"))
          ];
          
          if( inputs.length > 0 ){            
            inputs.forEach(( input )=>{                
                // Agregamos esta información                
                if( input.hasAttribute('pp-model') ){
                  var model = input.getAttribute('pp-model');
                  if( typeof model == 'string' && model != '' ){
                      if( this.data.hasOwnProperty(model) ){
                          // aqui hay que crear un sistema de validacion
                          // Check format value
                          this.$form[nameForm][model] = {
                            $valid: input.hasAttribute("required") && input.value == '' ? false : true  ,
                            $dirty:false,
                            $value:input.value                            
                          }


                      }
                  }
                }
            });
          }
          // ------------------------------------------------------------
         //console.log("Form ...............");
         // console.log( this.$form[nameForm] );
         // console.log("Form ...............");





        } 
      }
    }
    /**
    *@var handleRequiredDirective
    *@type Function
    *@description - Esta directiva afecta la propiedad de required de un input
    */
    this.handleRequiredDirective = function( el, output ){
      if( typeof output == 'boolean' && ['INPUT','TEXTAREA'].indexOf(el.tagName) != -1 ){
            if( output ){
              el.setAttribute('required','');
            }else{
              el.removeAttribute('required');
            }                       
        }
    }
    /*
    *@var handleReadonlyDirective
    *@type Function
    *@description - Directive que afecta la propiedad solo lectura de los input y textareas
    */
    this.handleReadonlyDirective = function( el , output){
        if( typeof output == 'boolean' && ['INPUT','TEXTAREA'].indexOf(el.tagName) != -1 ){
            if( output ){
              el.setAttribute('readonly','');
            }else{
              el.removeAttribute('readonly');
            }                       
        }
    }
    /**
    *@var handleDisabledDirective
    *@type Function
    *@description - directive que manipula la propiedad disabled del elemento
    **/
    this.handleDisabledDirective = function( el , output ){
        if( typeof output == 'boolean' && ['INPUT','SELECT','BUTTON','TEXTAREA'].indexOf(el.tagName) != -1 ){          
          el.disabled = output;
        }
    }
    /*
    *@var  handleTextDirective
    *@type Function
    *@description - Directiva que se encarga de la modificación del innerText del emento
    **/
    this.handleTextDirective = function(el,output){
        const old_value = el.innerText;
        if( (typeof output == 'function' ? output() : output ) != old_value ){
          el.innerText = typeof output === 'function' ? output() : output;
        }
    }
    /*
    *@var   handleHtmlDirective
    *@type  Function
    *@description
    */
    this.handleHtmlDirective = function(el,output){
        const old_value = el.innerHTML;
        el.innerHTML = typeof output === 'function' ? output(): output;
        this.initialize( el );
    }
    // ---------------------------------------------------------------------
    /*
    *@var handleShowDirective
    *@type Function
    *@description - Directive que se encarga de mostrar y ocultar un elemento
    *a través de la propiedad "display" 
    */
    this.handleShowDirective = function( el , output ){
      el.style.display =  output ? 'block':'none';
    }
    /**
    *@var initializeModel
    *@type Function
    *@description - Directive que se encarga de manipular las entradas input y select, provenientes de 
    * una formulario si fuese necesario
    **/
    this.initializeModel = function( el ){

      var tagInputAccept = [ 'INPUT', 'SELECT', 'TEXTAREA' ];

      var el = el || this.el;

      var attrEls = el.querySelectorAll( '[pp-model]' );     

      if( attrEls.length > 0 ){
        
        attrEls.forEach(( attrEl )=>{

          if( tagInputAccept.indexOf( attrEl.tagName ) != -1 ){

            switch( attrEl.tagName ){
              case 'INPUT':                                   
                  this.modelInput( attrEl );
                  // execute model input
              break;
              case 'SELECT':
                  this.modelSelect( attrEl );                  
                  // execute model select

              break;
              case 'TEXTAREA':
                  
                  console.log("Textarea .......");
                  // execute model textarea

              break;

            }            
          }      
        });
      }
    }
    /**
    *@var modelSelect
    *@type Function
    *@description - model que 
    */
    this.modelSelect = function( input ){
        
        var model         = input.getAttribute("pp-model");        
        var debounce      = input.getAttribute("pp-model-debounce");        
        var debounceValue = debounce == null ? 0 : parseInt(debounce);

        var options = input.querySelectorAll("option");
        if( options.length > 0 ){
          options.forEach(( option )=>{              
              if( option.value == this.data[model].toString() ){
                  option.setAttribute("selected","");
              }else{
                  if( option.hasAttribute("selected") ){
                    option.removeAttribute("selected");
                  }                  
              }
          });
        }        
       var debounceFunction = this.debounce(( event )=>{        
        var format = event.target.getAttribute("pp-model-format");        
        switch( format ){
           case null:
              this.data[model] = event.target.value;
           break;
           case 'string':
              this.data[model] = event.target.value.toString(); 
           break; 
           case 'number':
              this.data[model] = parseInt(event.target.value);
           break;
        }                
        this.emit('dataChange');
       },debounceValue);

      input.addEventListener( "change" , debounceFunction );      
    }
    /**
    *@var modelInput
    *@type Function
    *@description - Function especifica que se le aplica al input tag
    **/    
    this.modelInput = function( input ){        
        var model         = input.getAttribute("pp-model");        
        var debounce      = input.getAttribute("pp-model-debounce");        
        var debounceValue = debounce == null ? 0 : parseInt(debounce);
        var type = input.type.toLowerCase();        
        //-------------------------------------------------------------------        
        if( this.data.hasOwnProperty(model) ){
          input.value = this.data[model].toString();
        }
        //-------------------------------------------------------------------
        // Funcion interna para el addEventList
        var debounceFunction = this.debounce(( event )=>{          
          if( this.data[model].toString() !== event.target.value  ){
            // Run watch
            if( this.watch.hasOwnProperty(model) ){
                if( typeof this.watch[model] == 'function' ){
                  try{
                    this.watch[model]( event.target.value ,this.data[model] , event);
                  }catch(errorWatch){
                    console.log(errorWatch);
                  }                  
                }
            }
            // Run watch
            switch( type ){
              case 'text':
                  this.data[model] = event.target.value;
              break;
            }                        
            this.emit('dataChange');
          }
        },debounceValue);
        // Funcion interna para el addEventList
        //-------------------------------------------------------------------
        this.lisenEvent.keyboard.forEach(( eventName )=>{
          input.addEventListener( eventName , debounceFunction );
        });
        //-------------------------------------------------------------------    
    }
    // ------------------------------------------------------------------------
    /**
    *@var modelSetValue
    *@type Function
    *@description - funcion que actualiza a los input su valor, según cambie la data
    */
    this.modelSetValue = function( el ){      
      var el = el || this.el;
      var m = Object.values(Array.from(this.el.querySelectorAll("[pp-model]")));
      if(m.length > 0){
      m.forEach((input)=>{
        var model = input.getAttribute("pp-model");
        if( [ 'INPUT', 'SELECT', 'TEXTAREA' ].indexOf(input.tagName) != -1 ){
          if( this.data.hasOwnProperty(model)){
            // no hacemos nada parece con esto por mientas
            input.value = this.data[model];
            // mientas efinimos a secas esoto
          }
        }       
      });
      }

    }
    // --------------------------------------------------------------------------
    /**
    *@var initializeDirectivesComplex
    *@type Function
    *@description - directive que se encarga de ejecutar el anailicis de las 
    *directivas multi paramatetros que son las directivas bind,style,class
    *@example - bind='attribute:expression , attribute:expression | filtros:parametros '
    *
    */
    this.initializeDirectivesComplex = function( el ){

      var el = el || this.el;

      var attributesCatch = [ 'bind' , 'style' , 'class' ];

      attributesCatch.forEach((attrCatch)=>{

        var attrEls = el.querySelectorAll( '[pp-'+attrCatch+']' );

        if( attrEls.length > 0 ){


          attrEls.forEach( (attrEl)=>{

            // variables de reconocimineto para bind directive

            var bind_expression , bind_attribute , expression;

            bind_attribute  = [];

            bind_expression = [];

            if( attrCatch == 'style' ){
              expression = attrEl.getAttribute( 'pp-'+attrCatch );
              var styleList = {};
              try{
                styleList = this.saferEval( expression , { ...this.data } , this.methods );
              }catch( messageError ){
                // console.log( messageError ); 
              }              
              var styleListKeys = Object.keys( styleList );
              for( var i = 0; i < styleListKeys.length ; i++ ){
                 const key = styleListKeys[i];
                 const value = styleList[key];
                 attrEl.style[key] = value;
              }                  
            }// End Style
            /*==============================================================
            =                         ATTRIBUTE CLASS                     =
            ================================================================*/
            // START PP-CLASS
            if( attrCatch == 'class' ){              
              expression = attrEl.getAttribute( 'pp-'+attrCatch );
              var classList = {};
               try{                
                 classList = this.saferEval( expression , {...this.data}, this.methods );
               }catch( messageError ){
                   // console.log( messageError ); 
               }              
              var classListKeys = Object.keys( classList );
              for( var i = 0; i < classListKeys.length ; i++  ){                 
                 const key = classListKeys[i];
                 if( typeof classList[key] == 'boolean'  ){
                    if( classList[key] ){
                       if( !attrEl.classList.contains(key) ){
                           attrEl.classList.add(key)
                       }
                    }else{
                       if( attrEl.classList.contains(key) ){
                          attrEl.classList.remove(key)
                       }
                    }
                 }
              }
            }
            // END TYPE CLASS PP-CLASS

            /*==============================================================
            =                         ATTRIBUTE BIND                       =
            ================================================================*/
            if( attrCatch == 'bind' ){

              expression      = attrEl.getAttribute( 'pp-'+attrCatch );

              const multiAttr =  expression.split( ";" );              

              multiAttr.forEach( ( sectionAttr  )=>{             

                  const regex = /^([a-z,A-Z,0-9,\$,\-,\'.\"]{0,}):([a-z,A-Z,\$,\:,\?,\s,\=,\',\",0-9,\!,\(,\)]{0,})/;

                  let m;

                  if ((m = regex.exec( sectionAttr )) !== null) {

                    if( m.length === 3 ){

                      bind_attribute.push(m[1])

                      bind_expression.push(m[2])

                    }                              

                  }

              } );
              // start for
              for( var iterator = 0; iterator < bind_attribute.length ; iterator++ ){

                  var output = "";

                  try{
                    
                    var output = this.saferEval( bind_expression[iterator], {...this.data} , this.methods );

                  }catch( messageError ){
                      // console.log(  );
                  }

                  const nameAttr  = bind_attribute[iterator];

                  if( [null,undefined,false].includes( output ) ){

                    attrEl.removeAttribute(nameAttr);

                  }else{

                    attrEl.setAttribute( nameAttr , this.isBooleanAttr(nameAttr) ? nameAttr : output );

                  };
              }// End For                                                
            }                                          
            /*=====          End of ATRIBUTE BIND    ======*/
            /**/

            

          } );

        };

      });
    }
    // ---------------------------------------------------------------------    
    /**
    *
    *
    */
    this.initializeDirectives = function( el  ){

        var el = el || this.el;

        var attributesCatch = [
                  'form','text' ,'html' ,
                  'show','disabled' ,'readonly',
                  'required'];

              attributesCatch.forEach((attrCatch)=>{

                var attrEls = el.querySelectorAll( '[pp-'+attrCatch+']' );

                if( attrEls.length > 0 ){

                    attrEls.forEach( (attrEl)=>{
                      
                      const expression = attrEl.getAttribute('pp-'+attrCatch);

                      // Detectando Filtros separados por |
                      const expressionArray = expression.split('|').map((value)=>{

                        return value.trim();

                      });

                      // variable de salida 
                      var output = "";                      
                      
                      try{
                                                
                        output = this.saferEval(
                          expressionArray[0] ,
                          {...this.data} ,
                          this.methods 
                        );

                        // Capturando Filtros                       
                        if( expressionArray.length > 1 ){

                            for( var iterator = 1 ; iterator < expressionArray.length ; iterator++ ){

                              const Filtro = expressionArray[iterator];

                              if( this.filters.hasOwnProperty(Filtro) ){
                                  
                                  if( typeof output == 'string'  ){
                                    output =  this.filters[Filtro]( output )
                                  }
                              }
                            }                            
                        }
                        // Capturando Filtros    
                      }catch( messageError ){
                        //console.error(messageError);
                      }
                      switch(attrCatch){
                         case 'text':
                          this.handleTextDirective( attrEl ,output );
                         break;
                         case 'show':
                          this.handleShowDirective( attrEl , output );                  
                         break;
                         case 'html':
                          this.handleHtmlDirective( attrEl , output);
                         break;
                         case 'disabled':
                          this.handleDisabledDirective( attrEl , output );
                         break;
                         case 'readonly':
                          this.handleReadonlyDirective( attrEl , output ); 
                         break;
                         case 'required':                           
                           this.handleRequiredDirective( attrEl , output );
                         break;
                         case 'form':
                           this.handleFormDirective( attrEl );
                         break;

                      }

                    });

                };

            });

    }
    /*
    *@var HelperFunctionInitialize
    *@type Function
    *@description - Esta funcion ayuda ha inicializar los eventos 
    */
    this.HelperFunctionInitialize = function( NativeEvent , stringAttribute ){     
      var type       = NativeEvent.type;
      var expression = NativeEvent.target.getAttribute(stringAttribute);
      var $data =  { ...this.data };
      var $dataTemporal = Object.assign({...this.data},{
        $el    : NativeEvent.target,
        $event : NativeEvent,
        $form  : null
      });
      try{
        var safer = this.saferEval( expression , $dataTemporal , this.methods );        
      }catch( messageError ){
        //console.log( messageError );
      }
      this.data = { ...this.omit( $dataTemporal , '$el' ,'$event' ) };
      this.detectingChangeData( $data , NativeEvent);
    }
    // ---------------------------------------------------------------------
    this.TT = function( el , expression , EventName , done ){              
          var $form = null;
          if( el.tagName == 'FORM' ){
            if( el.hasAttribute('name') ){              
              if( el.getAttribute('name') != '' ){
                if( this.$form.hasOwnProperty(el.getAttribute('name')) ){
                  $form = this.$form[el.getAttribute('name')]
                }
              }
            }   
          }else{
            //console.log( $el.tagname );
          }        
    }
    // ---------------------------------------------------------------------
    /*
    *@var initialize
    *@type Function
    *@description - Funcion que inicializa las caracteristicas reactivas de esta 
    * librearia
    *@param el - > Objecto  de del Dom a Inicializar
    */
    this.initialize = function( el ){
      var el = el || this.el;
      var eventsMaster = Object.values([
          ...this.lisenEvent['mouse'],
          ...this.lisenEvent['keyboard'],
          ...this.lisenEvent['drag'],
          ...this.lisenEvent['form']
      ]);
      // forEach
      eventsMaster.forEach( ( lEvent ) => {
        const ElementEvent = el.querySelectorAll('[pp-'+lEvent+']');
        //if
        if( ElementEvent.length > 0  ){
            ElementEvent.forEach((ElEvent)=>{
              const expresion = ElEvent.getAttribute('pp-'+lEvent);
              var handle = (function(root){
                return function handlef(NativeEvent){
                  root.HelperFunctionInitialize(NativeEvent,'pp-'+lEvent);
                }
              })(this)
              ElEvent.addEventListener(lEvent,handle);
            });
        }
        //if
        const ElementEventOnce = el.querySelectorAll('[pp-'+lEvent+'-once]');
        //if
        if( ElementEventOnce.length > 0  ){
            ElementEventOnce.forEach((ElEventOnce)=>{
              const expresionOnce = ElEventOnce.getAttribute('pp-'+lEvent+'-once');
              var handleOnce = (function(root){   
                  return function handlefunction(NativeEvent){                
                    root.HelperFunctionInitialize( NativeEvent ,'pp-'+lEvent+'-once');
                    NativeEvent.target.removeEventListener(NativeEvent.type,handlefunction);
                  }
              })( this )
              ElEventOnce.addEventListener( lEvent , handleOnce );
            });
        }
        //if
      })
      // forEach
      this.initializeModel( el );
      this.initializeDirectivesAll( el );
    }
  // ---------------------------------------------------------------------   
  /**
  *@var initializeDirevesAll
  *@type Function
  */
  this.initializeDirectivesAll = function( el ){
    this.initializeDirectivesComplex( el )
    this.initializeDirectives( el )
  }
  // ---------------------------------------------------------------------
  this.on('dataChange',()=> this.initializeDirectivesAll( this.el ) );
  
  this.on('dataChange',()=> this.modelSetValue(this.el) );

  this.initialize( this.el );
  this.emit('finished');
//----------------------------------------------------------------------------
	}
});