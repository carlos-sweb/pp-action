/*!!
 * Power Panel View <http://github.com/millermedeiros/hasher>
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
            this.events[ eventName ] = [];
            this.events[ eventName ].push( callbacks );
          }
        }        
    }

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

      this.setData = function( key , value ){


        var oldValue;

        if( this.data[key] ){

            oldValue = this.data[key];

            this.data[key] = value;

            this.emit('updateData',key);
            
            this.emit('change:'+key,oldValue,value);

            /***
            how use
            this.on('change:datakey',function( oldValue , newValue ){              
            });
            ***/

        }
    }
    /*=============================================
    =   SECCION DEFINICION DE VARIABLES           =
    =============================================*/  
    /**
    *@var el
    *@description element html 
    **/
    this.el = document.querySelector( options.el || null );                    
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
    this.detectingChangeData = function( data ){

        const keys = Object.keys( data );

          for( var i = 0; i < keys.length ; i++ ){

              const key = keys[i];

              if( data.hasOwnProperty(key) ){
                 
                 if( data[key] != this.data[key] ){
                   this.emit('dataChange');    
                   break;

                 };
              }else{

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
    this.handleTextDirective = function( el , output ){                

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
    this.handleHtmlDirective = function( el , output ){                

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
    // ---------------------------------------------------------------------
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

        var attributesCatch = [ 'text' , 'html' , 'show'];

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
                      }

                    });

                };

            });

    }
    // ---------------------------------------------------------------------
    this.HelperFunctionInitialize = function( el , EventName , done ){

        var expression =  el.getAttribute( 'pp-'+EventName );

        var handle = ( NativeEvent )=>{

          var $data = { ...this.data };                  

          var $dataTemporal = Object.assign({...this.data},{

            $el    : el,

            $event : NativeEvent

          });

          try{
            var safer = this.saferEval( expression , $dataTemporal , this.methods );
          }catch( messageError ){
            //console.log( messageError );
          }
          this.data = { ...this.omit( $dataTemporal , '$el' ,'$event' ) };
          this.detectingChangeData( $data ); 
          if( typeof done == 'function' ){
            done( handle );
          };
        }  
        el.addEventListener( EventName , handle );

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
      this.lisenEvent['mouse'].forEach(( lEvent )=>{
        const ElementEvent = el.querySelectorAll('[pp-'+lEvent+']'); 
        if( ElementEvent.length > 0 ){
            ElementEvent.forEach( ( ElEvent ) => {
              this.HelperFunctionInitialize( ElEvent , lEvent );
            } );
        };
      });

      this.lisenEvent['mouse'].forEach(( lEventOnce )=>{
        const ElementEvent = el.querySelectorAll('[pp-'+lEventOnce+'-once]'); 
        if( ElementEvent.length > 0 ){
            ElementEvent.forEach( ( ElEventOnce )=>{
               this.HelperFunctionInitialize( ElEventOnce , lEvent+'-once' , ( handle )=>{
                   ElEventOnce.removeEventListener(lEvent,handle);
               } );
            } );
        };
      });
       this.initializeDirectivesAll( el );
    }
  // ---------------------------------------------------------------------  
  /**
  *@var initializeDirevesAll
  *@type Function
  */
  this.initializeDirectivesAll = function( el ){

    this.initializeDirectives( el );
    this.initializeDirectivesComplex( el );

  }
  // ---------------------------------------------------------------------
  this.on('dataChange',()=> this.initializeDirectivesAll( this.el ) ); 
    
  this.initialize( this.el );

  this.emit('finished');
//----------------------------------------------------------------------------
	}
});