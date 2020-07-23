"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!!
 * Power Panel View <http://github.com/millermedeiros/hasher>
 * @author Carlos Illesca
 * @version 1.0.0 (2020/01/01 03:18 PM)
 * Released under the MIT License
 */
(function (factory) {
  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
  // We use `self` instead of `window` for `WebWorker` support.
  var root = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self.self === self && self || (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global.global === global && global; // Set up Backbone appropriately for the environment. Start with AMD.

  if (typeof define === 'function' && define.amd) {
    define(['exports'], function (exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.ppView = factory(root, exports);
      module.exports = root.ppView;
    }); // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    factory(root, exports); // Finally, as a browser global.
  } else {
    root.ppView = factory(root, {});
  }
})(function (root, ppView) {
  return function (options) {
    var _this5 = this;

    // ------------------------------------------------

    /*
    *@var debounce
    *@type Function
    *@description - Esta funcion crea un intervalo de tiempo para ser ejecutada
    * previniendo la sobre ejecutación de funciones 
    */
    this.debounce = function (func, wait) {
      var timeoutId;
      return function () {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        var context = this;
        var args = arguments;
        timeoutId = setTimeout(function () {
          func.apply(context, args);
        }, wait);
      };
    };
    /**
    *@var pick
    *@type Function
    *@description - Funcion que se encarga de devolver las keys dadas en un objeto
    */


    this.pick = function () {
      var args = [].slice.call(arguments);
      var result = {};

      if (args.length > 1) {
        var theObject = args[0];
        args.shift();

        if (_typeof(theObject) == 'object') {
          args.forEach(function (arg) {
            if (typeof arg == 'string') {
              if (theObject.hasOwnProperty(arg)) {
                result[arg] = theObject[arg];
              }

              ;
            }

            ;
          });
        }

        return Object.assign(_objectSpread({}, result), {});
      } else {
        return result;
      }

      ;
    };
    /*
    *@var omit
    *@type Function
    *@description - Function que omite keys dadas para un objeto
    */


    this.omit = function () {
      var args = [].slice.call(arguments);
      var result = {};

      if (args.length > 1) {
        var theObject = args[0];
        args.shift();

        if (_typeof(theObject) == 'object') {
          result = _objectSpread({}, theObject);
          args.forEach(function (arg) {
            if (typeof arg == 'string') {
              if (theObject.hasOwnProperty(arg)) {
                delete result[arg];
              }

              ;
            }

            ;
          });
        }

        return Object.assign(_objectSpread({}, result), {});
      } else {
        return result;
      }

      ;
    }; // ------------------------------------------------

    /**
    @function saferEval
    @params
    */


    this.saferEval = function (expression, dataContext) {
      var additionalHelperVariables = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return new Function(['$data'].concat(_toConsumableArray(Object.keys(additionalHelperVariables))), "var result; with($data) { result = ".concat(expression, " };return result")).bind(this).apply(void 0, [dataContext].concat(_toConsumableArray(Object.values(additionalHelperVariables))));
    };
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

    this.on = function (eventName, callbacks) {
      if (typeof eventName == 'string') {
        if (typeof callbacks == 'function') {
          this.events[eventName] = [];
          this.events[eventName].push(callbacks);
        }
      }
    };

    this.removeListener = function (eventName, callbacks) {
      var idx;

      if (_typeof(this.events[eventName]) === 'object') {//idx = indexOf(this.events[eventName],callbacks);
        //if( idx > -1 ){
        //this.events[eventName].splice(idx,1);
        //}
      }
    };
    /**
    *@var emit
    *@type Function
    *@return void
    *@description - Emite un evento y Ejecuta todas las funciones que estan al escucha 
    * de este evento
    */


    this.emit = function (eventName) {
      var i,
          listeners,
          length,
          args = [].slice.call(arguments, 1);

      if (_typeof(this.events[eventName]) === 'object') {
        listeners = this.events[eventName].slice();
        length = listeners.length;

        for (i = 0; i < length; i++) {
          listeners[i].apply(this, args);
        }
      }
    };
    /*==  End of DEFINICION DE EVENTOS Y FUNCIONES  ==*/


    this.setData = function (key, value) {
      var oldValue;

      if (this.data[key]) {
        oldValue = this.data[key];
        this.data[key] = value;
        this.emit('updateData', key);
        this.emit('change:' + key, oldValue, value);
        /***
        how use
        this.on('change:datakey',function( oldValue , newValue ){              
        });
        ***/
      }
    };
    /*=============================================
    =   SECCION DEFINICION DE VARIABLES           =
    =============================================*/

    /**
    *@var el
    *@description element html 
    **/


    this.el = document.querySelector(options.el || null);
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

    this.methods = options.methods || {};
    /**
    *@var filters
    *@type Object
    *@description - Objeto que contiene funciones para filtros
    */

    this.filters = options.filters || {};
    /**
    *@var template
    *@type String
    *@description - Es el codigo html obtenidos desde una cadena 
    **/

    this.template = options.template || null;
    /**
    *@var lisenEvent
    *@type Object[Array]
    *@description listado de eventos de javascript
    */

    this.lisenEvent = {
      'window': ['afterprint', 'beforeprint', 'beforeunload', 'error', 'hashchange', 'load', 'message', 'offline', 'online', 'pagehide', 'pageshow', 'popstate', 'resize', 'storage', 'unload'],
      'mouse': ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'wheel'],
      'keyboard': ['keydown', 'keypress', 'keyup'],
      'drag': ['drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'scroll'],
      'clipboard': ['copy', 'cut', 'paste'],
      'media': [],
      'form': ['blur', 'change', 'contextmenu', 'focus', 'input', 'invalid', 'reset', 'search', 'select', 'submit']
    };

    this.isBooleanAttr = function (attrName) {
      // As per HTML spec table https://html.spec.whatwg.org/multipage/indices.html#attributes-3:boolean-attribute
      // Array roughly ordered by estimated usage
      var booleanAttributes = ['disabled', 'checked', 'required', 'readonly', 'hidden', 'open', 'selected', 'autofocus', 'itemscope', 'multiple', 'novalidate', 'allowfullscreen', 'allowpaymentrequest', 'formnovalidate', 'autoplay', 'controls', 'loop', 'muted', 'playsinline', 'default', 'ismap', 'reversed', 'async', 'defer', 'nomodule'];
      return booleanAttributes.includes(attrName);
    };
    /*===== FIN DE LA SECCION DE DEFINICION DE VARIABLES ======*/
    // DEFINIMOS EL innerHTML del elemento con el Template cargado


    this.el.innerHTML = this.template;
    /*
    *@var detectingChangeData
    *@type Function
    *@description - Funcion detecting Change detecta los cambios en un objeto de data para la vista
    *
    */

    this.detectingChangeData = function (data) {
      var keys = Object.keys(data);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (data.hasOwnProperty(key)) {
          if (data[key] != this.data[key]) {
            this.emit('dataChange');
            break;
          }

          ;
        } else {
          this.emit('dataChange');
          break;
        }
      }
    };
    /*
    *@var  handleTextDirective
    *@type Function
    *@description - Directiva que se encarga de la modificación del innerText del emento
    **/


    this.handleTextDirective = function (el, output) {
      var old_value = el.innerText;

      if ((typeof output == 'function' ? output() : output) != old_value) {
        el.innerText = typeof output === 'function' ? output() : output;
      }
    };
    /*
    *@var   handleHtmlDirective
    *@type  Function
    *@description
    */


    this.handleHtmlDirective = function (el, output) {
      var old_value = el.innerHTML;
      el.innerHTML = typeof output === 'function' ? output() : output;
      this.initialize(el);
    }; // ---------------------------------------------------------------------

    /*
    *@var handleShowDirective
    *@type Function
    *@description - Directive que se encarga de mostrar y ocultar un elemento
    *a través de la propiedad "display" 
    */


    this.handleShowDirective = function (el, output) {
      el.style.display = output ? 'block' : 'none';
    }; // ---------------------------------------------------------------------

    /**
    *@var initializeDirectivesComplex
    *@type Function
    *@description - directive que se encarga de ejecutar el anailicis de las 
    *directivas multi paramatetros que son las directivas bind,style,class
    *@example - bind='attribute:expression , attribute:expression | filtros:parametros '
    *
    */


    this.initializeDirectivesComplex = function (el) {
      var _this = this;

      var el = el || this.el;
      var attributesCatch = ['bind', 'style', 'class'];
      attributesCatch.forEach(function (attrCatch) {
        var attrEls = el.querySelectorAll('[pp-' + attrCatch + ']');

        if (attrEls.length > 0) {
          attrEls.forEach(function (attrEl) {
            // variables de reconocimineto para bind directive
            var bind_expression, bind_attribute, expression;
            bind_attribute = [];
            bind_expression = [];

            if (attrCatch == 'style') {
              expression = attrEl.getAttribute('pp-' + attrCatch);
              var styleList = {};

              try {
                styleList = _this.saferEval(expression, _objectSpread({}, _this.data), _this.methods);
              } catch (messageError) {// console.log( messageError ); 
              }

              var styleListKeys = Object.keys(styleList);

              for (var i = 0; i < styleListKeys.length; i++) {
                var key = styleListKeys[i];
                var value = styleList[key];
                attrEl.style[key] = value;
              }
            } // End Style

            /*==============================================================
            =                         ATTRIBUTE CLASS                     =
            ================================================================*/
            // START PP-CLASS


            if (attrCatch == 'class') {
              expression = attrEl.getAttribute('pp-' + attrCatch);
              var classList = {};

              try {
                classList = _this.saferEval(expression, _objectSpread({}, _this.data), _this.methods);
              } catch (messageError) {// console.log( messageError ); 
              }

              var classListKeys = Object.keys(classList);

              for (var i = 0; i < classListKeys.length; i++) {
                var _key = classListKeys[i];

                if (typeof classList[_key] == 'boolean') {
                  if (classList[_key]) {
                    if (!attrEl.classList.contains(_key)) {
                      attrEl.classList.add(_key);
                    }
                  } else {
                    if (attrEl.classList.contains(_key)) {
                      attrEl.classList.remove(_key);
                    }
                  }
                }
              }
            } // END TYPE CLASS PP-CLASS

            /*==============================================================
            =                         ATTRIBUTE BIND                       =
            ================================================================*/


            if (attrCatch == 'bind') {
              expression = attrEl.getAttribute('pp-' + attrCatch);
              var multiAttr = expression.split(";");
              multiAttr.forEach(function (sectionAttr) {
                var regex = /^([a-z,A-Z,0-9,\$,\-,\'.\"]{0,}):([a-z,A-Z,\$,\:,\?,\s,\=,\',\",0-9,\!,\(,\)]{0,})/;
                var m;

                if ((m = regex.exec(sectionAttr)) !== null) {
                  if (m.length === 3) {
                    bind_attribute.push(m[1]);
                    bind_expression.push(m[2]);
                  }
                }
              }); // start for

              for (var iterator = 0; iterator < bind_attribute.length; iterator++) {
                var output = "";

                try {
                  var output = _this.saferEval(bind_expression[iterator], _objectSpread({}, _this.data), _this.methods);
                } catch (messageError) {// console.log(  );
                }

                var nameAttr = bind_attribute[iterator];

                if ([null, undefined, false].includes(output)) {
                  attrEl.removeAttribute(nameAttr);
                } else {
                  attrEl.setAttribute(nameAttr, _this.isBooleanAttr(nameAttr) ? nameAttr : output);
                }

                ;
              } // End For                                                

            }
            /*=====          End of ATRIBUTE BIND    ======*/

            /**/

          });
        }

        ;
      });
    }; // ---------------------------------------------------------------------    

    /**
    *
    *
    */


    this.initializeDirectives = function (el) {
      var _this2 = this;

      var el = el || this.el;
      var attributesCatch = ['text', 'html', 'show'];
      attributesCatch.forEach(function (attrCatch) {
        var attrEls = el.querySelectorAll('[pp-' + attrCatch + ']');

        if (attrEls.length > 0) {
          attrEls.forEach(function (attrEl) {
            var expression = attrEl.getAttribute('pp-' + attrCatch); // Detectando Filtros separados por |

            var expressionArray = expression.split('|').map(function (value) {
              return value.trim();
            }); // variable de salida 

            var output = "";

            try {
              output = _this2.saferEval(expressionArray[0], _objectSpread({}, _this2.data), _this2.methods); // Capturando Filtros                       

              if (expressionArray.length > 1) {
                for (var iterator = 1; iterator < expressionArray.length; iterator++) {
                  var Filtro = expressionArray[iterator];

                  if (_this2.filters.hasOwnProperty(Filtro)) {
                    if (typeof output == 'string') {
                      output = _this2.filters[Filtro](output);
                    }
                  }
                }
              } // Capturando Filtros    

            } catch (messageError) {//console.error(messageError);
            }

            switch (attrCatch) {
              case 'text':
                _this2.handleTextDirective(attrEl, output);

                break;

              case 'show':
                _this2.handleShowDirective(attrEl, output);

                break;

              case 'html':
                _this2.handleHtmlDirective(attrEl, output);

                break;
            }
          });
        }

        ;
      });
    }; // ---------------------------------------------------------------------


    this.HelperFunctionInitialize = function (el, EventName, done) {
      var _this3 = this;

      var expression = el.getAttribute('pp-' + EventName);

      var handle = function handle(NativeEvent) {
        var $data = _objectSpread({}, _this3.data);

        var $dataTemporal = Object.assign(_objectSpread({}, _this3.data), {
          $el: el,
          $event: NativeEvent
        });

        try {
          var safer = _this3.saferEval(expression, $dataTemporal, _this3.methods);
        } catch (messageError) {//console.log( messageError );
        }

        _this3.data = _objectSpread({}, _this3.omit($dataTemporal, '$el', '$event'));

        _this3.detectingChangeData($data);

        if (typeof done == 'function') {
          done(handle);
        }

        ;
      };

      el.addEventListener(EventName, handle);
    }; // ---------------------------------------------------------------------

    /*
    *@var initialize
    *@type Function
    *@description - Funcion que inicializa las caracteristicas reactivas de esta 
    * librearia
    *@param el - > Objecto  de del Dom a Inicializar
    */


    this.initialize = function (el) {
      var _this4 = this;

      var el = el || this.el;
      this.lisenEvent['mouse'].forEach(function (lEvent) {
        var ElementEvent = el.querySelectorAll('[pp-' + lEvent + ']');

        if (ElementEvent.length > 0) {
          ElementEvent.forEach(function (ElEvent) {
            _this4.HelperFunctionInitialize(ElEvent, lEvent);
          });
        }

        ;
      });
      this.lisenEvent['mouse'].forEach(function (lEventOnce) {
        var ElementEvent = el.querySelectorAll('[pp-' + lEventOnce + '-once]');

        if (ElementEvent.length > 0) {
          ElementEvent.forEach(function (ElEventOnce) {
            _this4.HelperFunctionInitialize(ElEventOnce, lEvent + '-once', function (handle) {
              ElEventOnce.removeEventListener(lEvent, handle);
            });
          });
        }

        ;
      });
      this.initializeDirectivesAll(el);
    }; // ---------------------------------------------------------------------  

    /**
    *@var initializeDirevesAll
    *@type Function
    */


    this.initializeDirectivesAll = function (el) {
      this.initializeDirectives(el);
      this.initializeDirectivesComplex(el);
    }; // ---------------------------------------------------------------------


    this.on('dataChange', function () {
      return _this5.initializeDirectivesAll(_this5.el);
    });
    this.initialize(this.el);
    this.emit('finished'); //----------------------------------------------------------------------------
  };
});
