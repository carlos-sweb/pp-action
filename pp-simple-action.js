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

    var isBooleanAttr = function(attrName) {
      // As per HTML spec table https://html.spec.whatwg.org/multipage/indices.html#attributes-3:boolean-attribute
      // Array roughly ordered by estimated usage
      const booleanAttributes = ['disabled', 'checked', 'required', 'readonly', 'hidden', 'open', 'selected', 'autofocus', 'itemscope', 'multiple', 'novalidate', 'allowfullscreen', 'allowpaymentrequest', 'formnovalidate', 'autoplay', 'controls', 'loop', 'muted', 'playsinline', 'default', 'ismap', 'reversed', 'async', 'defer', 'nomodule'];
      return booleanAttributes.includes(attrName);
    },
    /**
    *@var lisenEvent
    *@type Object[Array]
    *@description listado de eventos de javascript
    */
    lisenEvent = {
       'window':['afterprint','beforeprint','beforeunload','error','hashchange','load','message','offline','online','pagehide','pageshow','popstate','resize','storage','unload'],
       'mouse':['click','dblclick','mousedown','mousemove','mouseout','mouseover','mouseup','wheel'],
       'keyboard':['keydown','keypress','keyup'],
       'drag':['drag','dragend','dragenter','dragleave','dragover','dragstart','drop','scroll'],
       'clipboard':['copy','cut','paste'],
       'media':[],
       'form':['blur','change','contextmenu','focus','input','invalid','reset','search','select','submit']
    },
    rAttr = function( el, attr ){
      el.removeAttribute(attr);
    },
    /**
    *@var setAttr
    *@type Function
    *@description - Function que setea el valor de un attirbuto
    */
    setAttr = function( el , attr , vl ){
        el.setAttribute( attr , vl )
    },
    /*
    *@var hasAttr
    *@type Function
    *@description - Function que comprueba la existencia de un attributo
    */
    hasAttr = function( el , attr ){
        return el.hasAttribute(attr)
    },
    /*
    *@var getAttr
    *@type Function
    *@description - Function get attribute 
    *@params 
    *  el - > type ElementHtml
    *  attr -> string , name of attribute
    */
    getAttr = function( el , attr ){
        return hasAttr( el , attr ) ? el.getAttribute( attr ) : ''
    },
    qAll = function( el , selector ){
        return el.querySelectorAll( selector )
    },
   // ------------------------------------------------
    /*
    *@var debounce
    *@type Function
    *@description - Esta funcion crea un intervalo de tiempo para ser ejecutada
    * previniendo la sobre ejecutación de funciones 
    */
    debounce = function(func,wait){
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
    },
    /**
    *@var pick
    *@type Function
    *@description - Funcion que se encarga de devolver las keys dadas en un objeto
    */
    pick = function(){
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
    },
    /*
    *@var omit
    *@type Function
    *@description - Function que omite keys dadas para un objeto
    */
    omit = function(){
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
    },
    /*
    *@var getLisenEvent
    *@type Function
    *@
    */
    getLisenEvent = function(){         
         var result = []; 
         for( var i  in lisenEvent ){
             result = result.concat(lisenEvent[i]); 
         }
         return result;
    },
    isString = function( value ){
      return typeof value == 'string';
    },
    isFunction = function( value ){
      return typeof value == 'function';
    },
    isEmpty = function( value ){
      
      if( value == null ){
        return !0;
      }

      if( typeof value == 'string' ){
         return value.length == 0 ? !0:!1; 
      }

      if( typeof value == 'object' || typeof value == 'array' ){
          if( typeof value.length == 'undefined' ){
            return Object.values(value).length == 0 ? !0:!1; 
          }else{
            return value.length == 0 ? !0:!1; 
          }
      }
      
    }    
  // Main Function
	return function( options ){     
    
      
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
        if( isString(eventName) ){
          if( isFunction(callbacks) ){            
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
    /*===== FIN DE LA SECCION DE DEFINICION DE VARIABLES ======*/
    // DEFINIMOS EL innerHTML del elemento con el Template cargado
    this.el.innerHTML = this.template;
    /*
    *@var detectingChangeData
    *@type Function
    *@description - Funcion detecting Change detecta los cambios en un objeto de data para la vista
    *
    */

    // Hay que ordenar esta funcion y definir el ciclo de uso de esta funcion
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
      el.style.display =  output ? '':'none';
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

      // Aqui hay cualquier pega

    }




    // ---------------------------------------------------------------------    
    /**
    *
    *
    */
    this.initializeDirectives = function( el  ){

          var el = el || this.el;

          [
          'maxlength',
          'minlength',
          'max','min',
          'text','html','show',
          'disabled','readonly',
          'required'].forEach((attrCatch)=>{
                
                    qAll(el,'[pp-'+attrCatch+']').forEach( (attrEl)=>{
                      
                      const expression = getAttr( attrEl , 'pp-'+attrCatch );                                        

                      if( expression != "" && expression != null ){                        
                      // Detectando Filtros separados por |
                      const expressionArray = expression.split('|').map((value)=>{
                        return value.trim();
                      });
                      
                      // variable de salida 
                      var output = "";                      
                      // Pasando $formulario
                      var form = attrEl.getAttribute("pp-data-form");
                      var $form = void(0);
                      if( form != null ){
                        if( this.$form.hasOwnProperty(form) ){
                           $form = this.$form[form];
                        }
                      }                      
                      // Pasando $formulario
                      try{
                                                
                        output = this.saferEval(
                          expressionArray[0] ,
                          {...this.data,...{$form:$form}} ,
                          this.methods 
                        );

                        // Capturando Filtros                       
                        if( expressionArray.length > 1 ){

                            for( var iterator = 1 ; iterator < expressionArray.length ; iterator++ ){

                              const Filtro = expressionArray[iterator];

                              if( this.filters.hasOwnProperty(Filtro) ){
                                  
                                  if( isString(output) ){
                                    output =  this.filters[Filtro]( output )
                                  }
                              }
                            }                            
                        }
                        // Capturando Filtros    
                      }catch( messageError ){
                        console.warn(messageError);
                      }

                      if( attrCatch == "text"     ){ this.handleTextDirective( attrEl ,output )}
                      if( attrCatch == "show"     ){ this.handleShowDirective( attrEl , output )}                      
                      if( attrCatch == "html"     ){ this.handleHtmlDirective( attrEl , output)}

                    }//END IF
                    });                
            });
    }
    /*
    *@var HelperFunctionInitialize
    *@type Function
    *@description - Esta funcion ayuda ha inicializar los eventos 
    *Esta funcion esta dentro del ciclo de eventos
    */
    this.HelperFunctionInitialize = function( NativeEvent , stringAttribute ){

      var target = NativeEvent.target;
      var expression = getAttr(target,stringAttribute);
      var $data =  { ...this.data };
      var form  = getAttr(target,'pp-data-form');
      var $form = null;      
      if( this.$form.hasOwnProperty(form) ){$form = this.$form[form];}

      var $dataTemporal = Object.assign({...this.data},{
        $el    : target,
        $event : NativeEvent,
        $form  : $form
      });

      try{
        var safer = this.saferEval( expression , $dataTemporal , this.methods );        
      }catch( messageError ){
        console.log( messageError );
      }

      this.data = { ...omit( $dataTemporal , '$el' ,'$event' ) };
      this.detectingChangeData( $data , NativeEvent);

    }

    /**
    *
    *
    */
    var h = (function( root, attr , remove  ){
      return function hf( NativeEvent   ){              
           root.HelperFunctionInitialize( NativeEvent , attr );
          if( remove ){
            NativeEvent.target.removeEventListener(NativeEvent.type,hf);  
          }
      }
    });//* function que ayuda al this.initialize *//
    // ---------------------------------------------------------------------
    /*
    *@var initialize
    *@type Function
    *@description - Funcion que inicializa las caracteristicas reactivas de esta 
    * librearia
    *@param el - > Objecto  de del Dom a Inicializar
    */
    this.initialize = function( el ){

      var iTime = Date.now();      
      var el = el || this.el;
      // forEach
      getLisenEvent().forEach( ( lEvent ) => {               
        //if        
        qAll(el,'[pp-'+lEvent+']').forEach((ElEvent)=>{     
           const attrNameEvent = 'pp-'+lEvent,      
           expresion = getAttr(ElEvent,attrNameEvent);                           
           ElEvent.addEventListener(lEvent, h(this,attrNameEvent,false) );
        });
        //if        
        //if        
        qAll(el,'[pp-'+lEvent+'-once]').forEach((ElEventOnce)=>{
          const attrNameEventOnce = 'pp-'+lEvent+'-once';
          const expresionOnce = getAttr(ElEventOnce,attrNameEventOnce);    
          ElEventOnce.addEventListener( lEvent , h(this,attrNameEventOnce,true) );
        });        
        //if
      })
      this.initializeDirectivesAll( el );
      // Tiempo for initialize all 
      console.log(Date.now() - iTime);
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
  this.on('dataChange',()=>{    
    this.initializeDirectivesAll( this.el )
  });  
  // ---------------------------------------------------------------------
  this.initialize( this.el );
  this.emit('finished');
//----------------------------------------------------------------------------
	}
});