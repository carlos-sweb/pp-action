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
 * Power Panel View <https://github.com/carlos-sweb/pp-action>
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
  var isBooleanAttr = function isBooleanAttr(attrName) {
    // As per HTML spec table https://html.spec.whatwg.org/multipage/indices.html#attributes-3:boolean-attribute
    // Array roughly ordered by estimated usage
    var booleanAttributes = ['disabled', 'checked', 'required', 'readonly', 'hidden', 'open', 'selected', 'autofocus', 'itemscope', 'multiple', 'novalidate', 'allowfullscreen', 'allowpaymentrequest', 'formnovalidate', 'autoplay', 'controls', 'loop', 'muted', 'playsinline', 'default', 'ismap', 'reversed', 'async', 'defer', 'nomodule'];
    return booleanAttributes.includes(attrName);
  },
      pm = "pp-model",
      isRequired = function isRequired(el) {
    return hasAttr(el, 'required');
  },
      isValid = function isValid(el) {
    var tag = el.tagName;
    var validType = getAttr(el, 'type');

    if (tag == 'INPUT' && ['text', 'search', 'password'].indexOf(validType) != -1) {
      // Falta pattern
      return isRequired(el) && isEmpty(el.value) ? false : hasAttr(el, 'minlength') && el.value.length < getAttr(el, 'minlength') ? false : hasAttr(el, 'maxlength') && el.value.length > getAttr(el, 'maxlength') ? false : true;
    }

    ;

    if (tag == 'INPUT' && ['url'].indexOf(validType) != 1) {
      return isRequired(el) && isEmpty(e.value) ? false : true;
    }

    if (tag == 'INPUT' && ['date', 'number']) {
      return false;
    } else {
      return hasAttr(el, "required") && el.value == '' ? false : true;
    }
  },
      isValidForm = function isValidForm(form) {
    var valid = true;
    var $form = omit(form, '$valid', '$dirty');

    for (var key in $form) {
      if (valid) {
        valid = $form[key].$valid;
      }
    } //console.log(valid);


    return valid;
  },

  /**
  *@var lisenEvent
  *@type Object[Array]
  *@description listado de eventos de javascript
  */
  lisenEvent = {
    'window': ['afterprint', 'beforeprint', 'beforeunload', 'error', 'hashchange', 'load', 'message', 'offline', 'online', 'pagehide', 'pageshow', 'popstate', 'resize', 'storage', 'unload'],
    'mouse': ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'wheel'],
    'keyboard': ['keydown', 'keypress', 'keyup'],
    'drag': ['drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'scroll'],
    'clipboard': ['copy', 'cut', 'paste'],
    'media': [],
    'form': ['blur', 'change', 'contextmenu', 'focus', 'input', 'invalid', 'reset', 'search', 'select', 'submit']
  },
      rAttr = function rAttr(el, attr) {
    el.removeAttribute(attr);
  },

  /**
  *@var setAttr
  *@type Function
  *@description - Function que setea el valor de un attirbuto
  */
  setAttr = function setAttr(el, attr, vl) {
    el.setAttribute(attr, vl);
  },

  /*
  *@var hasAttr
  *@type Function
  *@description - Function que comprueba la existencia de un attributo
  */
  hasAttr = function hasAttr(el, attr) {
    return el.hasAttribute(attr);
  },

  /*
  *@var getAttr
  *@type Function
  *@description - Function get attribute 
  *@params 
  *  el - > type ElementHtml
  *  attr -> string , name of attribute
  */
  getAttr = function getAttr(el, attr) {
    return hasAttr(el, attr) ? el.getAttribute(attr) : '';
  },
      qAll = function qAll(el, selector) {
    return el.querySelectorAll(selector);
  },
      // ------------------------------------------------

  /*
  *@var debounce
  *@type Function
  *@description - Esta funcion crea un intervalo de tiempo para ser ejecutada
  * previniendo la sobre ejecutación de funciones 
  */
  debounce = function debounce(func, wait) {
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
  },

  /**
  *@var pick
  *@type Function
  *@description - Funcion que se encarga de devolver las keys dadas en un objeto
  */
  pick = function pick() {
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
  },

  /*
  *@var omit
  *@type Function
  *@description - Function que omite keys dadas para un objeto
  */
  omit = function omit() {
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
  },

  /*
  *@var getLisenEvent
  *@type Function
  *@
  */
  getLisenEvent = function getLisenEvent() {
    var result = [];

    for (var i in lisenEvent) {
      result = result.concat(lisenEvent[i]);
    }

    return result;
  },

  /*
  *@var modelHelperAttributes
  *@type Function
  *@description - Capturar los datos necesarios para la entrada de input
  */
  modelHelperAttributes = function modelHelperAttributes(el) {
    var model = getAttr(el, pm),
        debounceTime = getAttr(el, "pp-model-debounce"),
        form = getAttr(el, "pp-data-form"),
        type = hasAttr(el, 'type') ? el.type.toLowerCase() : "";
    return {
      model: model,
      debounceTime: debounceTime == null ? 0 : debounceTime,
      debounceValue: parseInt(debounceTime == null ? 0 : debounceTime),
      type: type,
      form: form
    };
  },
      isString = function isString(value) {
    return typeof value == 'string';
  },
      isFunction = function isFunction(value) {
    return typeof value == 'function';
  },
      isEmpty = function isEmpty(value) {
    if (value == null) {
      return !0;
    }

    if (typeof value == 'string') {
      return value.length == 0 ? !0 : !1;
    }

    if (_typeof(value) == 'object' || typeof value == 'array') {
      if (typeof value.length == 'undefined') {
        return Object.values(value).length == 0 ? !0 : !1;
      } else {
        return value.length == 0 ? !0 : !1;
      }
    }
  },

  /**
  *@var isUrl
  *@type Function
  *@param 
  *      @value {String} valor para confirmar que sea un url
  *      @options {Object}
  *               schemes {Array}  = [http,https,ftp] || pp-data-url-schemes
  *               allowLocal { boolean } = http://localhost || pp-data-url-allowLocal 
  *               allowDataUrl {boolean} = ?id=20 || pp-data-url-allowDataUrl
  */
  isUrl = function isUrl(value, options) {
    if (!isString(value)) {
      return false;
    }

    var options = options || {},
        schemes = options.schemes || ['http', 'https'],
        allowLocal = options.allowLocal || false,
        allowDataUrl = options.allowDataUrl || false; // https://gist.github.com/dperini/729294

    var regex = "^" + // protocol identifier
    "(?:(?:" + schemes.join("|") + ")://)" + // user:pass authentication
    "(?:\\S+(?::\\S*)?@)?" + "(?:";
    var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";

    if (allowLocal) {
      tld += "?";
    } else {
      regex += // IP address exclusion
      // private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" + "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" + "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})";
    }

    regex += // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broacast addresses
    // (first & last IP address of each class)
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" + // host name
    "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" + // domain name
    "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" + tld + ")" + // port number
    "(?::\\d{2,5})?" + // resource path
    "(?:[/?#]\\S*)?" + "$";

    if (allowDataUrl) {
      // RFC 2397
      var mediaType = "\\w+\\/[-+.\\w]+(?:;[\\w=]+)*";
      var urlchar = "[A-Za-z0-9-_.!~\\*'();\\/?:@&=+$,%]*";
      var dataurl = "data:(?:" + mediaType + ")?(?:;base64)?," + urlchar;
      regex = "(?:" + regex + ")|(?:^" + dataurl + "$)";
    }

    var PATTERN = new RegExp(regex, 'i');

    if (!PATTERN.exec(value)) {
      return false;
    } else {
      return true;
    }
  }; // Main Function


  return function (options) {
    var _this8 = this;

    // ------------------------------------------------

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
      if (isString(eventName)) {
        if (isFunction(callbacks)) {
          if (!this.events.hasOwnProperty(eventName)) {
            this.events[eventName] = [];
          }

          this.events[eventName].push(callbacks);
        }
      }
    }; // No use


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

    /*=============================================
    =   SECCION DEFINICION DE VARIABLES           =
    =============================================*/

    /**
    *@var el
    *@description element html 
    **/


    this.el = document.querySelector(options.el || null);
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

    this.detectingChangeData = function (data, NativeEvent) {
      var keys = Object.keys(data);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (data.hasOwnProperty(key)) {
          if (data[key] != this.data[key]) {
            // execute watch function
            if (this.watch.hasOwnProperty(key)) {
              if (typeof this.watch[key] == 'function') {
                this.watch[key](data[key], this.data[key], NativeEvent);
              }
            }

            this.emit('dataChange');
            break;
          }

          ;
        } else {
          // execute watch function 
          if (this.watch.hasOwnProperty(key)) {
            if (typeof this.watch[key] == 'function') {
              // valor antiguo 
              //  
              this.watch[key](data[key], this.data[key], NativeEvent);
            }
          }

          this.emit('dataChange');
          break;
        }
      }
    };
    /**
      <input type="button">
      <input type="checkbox">
      <input type="color">
      <input type="date">
      <input type="datetime-local">
      <input type="email">
      <input type="file">
      <input type="hidden">
      <input type="image">
      <input type="month">
      <input type="number">
      <input type="password">
      <input type="radio">
      <input type="range">
      <input type="reset">
      <input type="search">
      
      <input type="tel">
      <input type="text">
      <input type="time">
      <input type="url">
      <input type="week">
       <input type="submit">
    */


    this.handleMaxLengthDirective = function (el, output) {
      if (typeof output == 'string') {
        output = parseInt(output);
      }

      if (typeof output == 'number' && ['INPUT'].indexOf(el.tagName) != -1) {
        if (Number.isInteger(output) && output > 0) {
          if (['text', 'password', 'search'].indexOf(el.type) != -1) {
            setAttr(el, "maxlength", output.toString());
          }
        }
      }

      if (typeof output == 'number' && ['TEXTAREA'].indexOf(el.tagName) != -1) {
        if (Number.isInteger(output) && output > 0) {
          setAttr(el, "maxlength", output.toString());
        }
      }
    };

    this.handleMinLengthDirective = function (el, output) {
      if (typeof output == 'string') {
        output = parseInt(output);
      }

      if (typeof output == 'number' && ['INPUT'].indexOf(el.tagName) != -1) {
        if (Number.isInteger(output) && output > 0) {
          if (['text', 'password', 'search'].indexOf(el.type) != -1) {
            setAttr(el, "minlength", output.toString());
          }
        }
      }

      if (typeof output == 'number' && ['TEXTAREA'].indexOf(el.tagName) != -1) {
        if (Number.isInteger(output) && output > 0) {
          setAttr(el, "minlength", output.toString());
        }
      }
    };

    this.handleMaxDirective = function (el, output) {
      if (el.type == 'number') {}

      if (el.type == 'date') {}
    };

    this.handleMinDirective = function (el, output) {
      if (el.type == 'number') {}

      if (el.type == 'date') {}
    };
    /*
    *@var
    *@type Function
    *@description -
    */


    this.handleFormDirective = function (el) {
      var _this = this;

      if (hasAttr(el, 'name')) {
        // -----------------------------------------------------------------------------------
        el.addEventListener("submit", function (event) {
          if (hasAttr(el, 'pp-submit-prevent')) {
            event.preventDefault();
          }
        }); // -----------------------------------------------------------------------------------

        el.addEventListener("reset", function (event) {
          console.log("Escucnahdo reset");
        });
        var nameForm = getAttr(el, 'name');

        if (isString(nameForm) && !isEmpty(nameForm)) {
          // ---------------------------------------------------------------------------------
          if (!this.$form.hasOwnProperty(nameForm)) {
            this.$form[nameForm] = {
              $valid: true,
              $dirty: false
            };
            this.$form[nameForm].$valid = isValidForm(this.$form[nameForm]);
          }

          ; // ---------------------------------------------------------------------------------
          // realizamos un enlace con el formulario que esta asociado a este elemento                              

          var othersDirectives = Array.from(qAll(el, "[pp-text],[pp-show],[pp-class],[pp-model],[pp-click],[pp-disabled]"));
          othersDirectives.forEach(function (e) {
            return !hasAttr(e, 'pp-data-form') && setAttr(e, 'pp-data-form', nameForm);
          }); // realizamos un enlace con el formulario que esta asociado a este elemento

          var inputs = Array.from(qAll(el, "input[pp-model],select[pp-model],textarea[pp-model]")); // ---------------------------------------------------------------------------------

          inputs.forEach(function (input) {
            // Agregamos esta información                
            if (input.hasAttribute(pm)) {
              var model = input.getAttribute(pm);

              if (isString(model) && model != '') {
                if (_this.data.hasOwnProperty(model)) {
                  // aqui hay que crear un sistema de validacion
                  // Check format value                        
                  _this.$form[nameForm][model] = {
                    $required: isRequired(input),
                    $valid: isValid(input),
                    $dirty: false,
                    $value: input.value
                  };
                  _this.$form[nameForm].$valid = isValidForm(_this.$form[nameForm]);
                }
              }
            }
          }); // ---------------------------------------------------------------------------------
        }
      }
    };
    /**
    *@var handleRequiredDirective
    *@type Function
    *@description - Esta directiva afecta la propiedad de required de un input
    */
    // ****** hay que arreglar el codigo que se repite aqui


    this.handleRequiredDirective = function (el, output) {
      if (typeof output == 'boolean' && ['INPUT', 'TEXTAREA'].indexOf(el.tagName) != -1) {
        // ------------------------------------------------------------------------------
        var updateRequired = function updateRequired(__el, property) {
          // ****************************************************************************
          var nameForm = getAttr(__el, 'pp-data-form'),
              model = getAttr(__el, pm); // ****************************************************************************

          if (this.$form.hasOwnProperty(nameForm)) {
            if (this.$form[nameForm].hasOwnProperty(model)) {
              if (this.$form[nameForm][model][property] != output) {
                this.$form[nameForm][model][property] = output;
                this.emit("dataChange");
              }
            }
          } //*****************************************************************************

        }; // ------------------------------------------------------------------------------            


        if (output == true && hasAttr(el, 'required') == false) {
          setAttr(el, 'required');
          updateRequired.bind(this)(el, '$required');
        } // ******************************************************************************


        if (output == false && el.hasAttribute('required') == true) {
          rAttr(el, 'required');
          updateRequired.bind(this)(el, '$required');
        } // ******************************************************************************                                                      

      }
    };
    /*
    *@var handleReadonlyDirective
    *@type Function
    *@description - Directive que afecta la propiedad solo lectura de los input y textareas
    */


    this.handleReadonlyDirective = function (el, output) {
      if (typeof output == 'boolean' && ['INPUT', 'TEXTAREA'].indexOf(el.tagName) != -1) {
        output ? setAttr(el, 'readonly', '') : rAttr(el, 'readonly');
      }
    };
    /**
    *@var handleDisabledDirective
    *@type Function
    *@description - directive que manipula la propiedad disabled del elemento
    **/


    this.handleDisabledDirective = function (el, output) {
      if (typeof output == 'boolean' && ['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA'].indexOf(el.tagName) != -1) {
        output ? setAttr(el, "disabled", "") : rAttr(el, "disabled");
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
      el.style.display = output ? '' : 'none';
    };
    /**
    *@var initializeModel
    *@type Function
    *@description - Directive que se encarga de manipular las entradas input y select, provenientes de 
    * una formulario si fuese necesario
    **/


    this.initializeModel = function (el) {
      var _this2 = this;

      el = el || this.el, qAll(el, 'input[pp-model],select[pp-model],textarea[pp-model]').forEach(function (attrEl) {
        var tg = attrEl.tagName;
        tg == 'INPUT' && _this2.modelInput(attrEl);
        tg == 'SELECT' && _this2.modelSelect(attrEl);
        tg == 'TEXTAREA' && _this2.modelInput(attrEl);
      });
    };
    /**
    *@var modelSelect
    *@type Function
    *@description - model que 
    */


    this.modelSelect = function (input) {
      var _this3 = this;

      var _modelHelperAttribute = modelHelperAttributes(input),
          model = _modelHelperAttribute.model,
          debounceTime = _modelHelperAttribute.debounceTime,
          debounceValue = _modelHelperAttribute.debounceValue,
          form = _modelHelperAttribute.form;

      qAll(input, "option").forEach(function (option) {
        if (option.value == _this3.data[model].toString()) {
          setAttr(option, "selected", "");
        } else {
          if (hasAttr(option, "selected")) {
            rAttr(option, "selected");
          }
        }
      });
      var debounceFunction = debounce(function (event) {
        var format = event.target.getAttribute("pp-model-format");

        switch (format) {
          case null:
            _this3.data[model] = event.target.value;
            break;

          case 'string':
            _this3.data[model] = event.target.value.toString();
            break;

          case 'number':
            _this3.data[model] = parseInt(event.target.value);
            break;
        }

        _this3.emit('dataChange');
      }, debounceValue);
      input.addEventListener("change", debounceFunction);
    };
    /**
    *@var modelInput
    *@type Function
    *@description - Function especifica que se le aplica al input tag
    **/


    this.modelInput = function (input) {
      var _this4 = this;

      var _modelHelperAttribute2 = modelHelperAttributes(input),
          model = _modelHelperAttribute2.model,
          debounceTime = _modelHelperAttribute2.debounceTime,
          debounceValue = _modelHelperAttribute2.debounceValue,
          type = _modelHelperAttribute2.type,
          form = _modelHelperAttribute2.form; //-------------------------------------------------------------------        


      if (this.data.hasOwnProperty(model)) {
        input.value = this.data[model].toString();

        if (this.$form.hasOwnProperty(form)) {
          if (this.$form[form].hasOwnProperty(model)) {
            this.$form[form][model].$value = input.value;
            this.$form[form].$valid = isValidForm(this.$form[form]);
          }
        }
      } //-------------------------------------------------------------------
      // Funcion interna para el addEventList


      var debounceFunction = debounce(function (event) {
        if (_this4.data[model].toString() !== event.target.value) {
          // Run watch
          if (_this4.watch.hasOwnProperty(model)) {
            if (typeof _this4.watch[model] == 'function') {
              try {
                _this4.watch[model](event.target.value, _this4.data[model], event);
              } catch (errorWatch) {
                console.log(errorWatch);
              }
            }
          } // Run watch


          switch (type) {
            case 'text':
            case 'password':
            case 'search':
            case '':
              _this4.data[model] = event.target.value;

              if (_this4.$form.hasOwnProperty(form)) {
                if (_this4.$form[form].hasOwnProperty(model)) {
                  // Estamos validando
                  _this4.$form[form][model].$value = event.target.value;
                  _this4.$form[form][model].$valid = isValid(event.target);

                  if (!_this4.$form[form][model].$dirty) {
                    _this4.$form[form][model].$dirty = true;
                  }

                  _this4.$form[form].$valid = isValidForm(_this4.$form[form]); // estamos cambiando el valor
                }
              }

              _this4.emit('dataChange');

              break;
          }
        }
      }, debounceValue); // Funcion interna para el addEventList
      //-------------------------------------------------------------------
      //Listado de eventos que pueden cambiar el valor de este input

      lisenEvent.keyboard.forEach(function (eventName) {
        input.addEventListener(eventName, debounceFunction);
      });
      input.addEventListener("blur", function (NativeEvent) {
        var form = getAttr(NativeEvent.target, "pp-data-form");
        var model = getAttr(NativeEvent.target, pm);

        if (!_this4.$form[form][model].$dirty) {
          _this4.$form[form][model].$dirty = true;

          _this4.emit("dataChange");
        }
      }); //-------------------------------------------------------------------    
    }; // ------------------------------------------------------------------------

    /**
    *@var modelSetValue
    *@type Function
    *@description - funcion que actualiza a los input su valor, según cambie la data
    *este cambio de valor del input o del pp-model es externo al mismo input
    */


    this.modelSetValue = function (el) {
      var _this5 = this;

      var el = el || this.el;
      var m = Object.values(Array.from(this.el.querySelectorAll("[pp-model]")));
      m.forEach(function (input) {
        var _modelHelperAttribute3 = modelHelperAttributes(input),
            form = _modelHelperAttribute3.form,
            model = _modelHelperAttribute3.model;

        if (['INPUT', 'SELECT', 'TEXTAREA'].indexOf(input.tagName) != -1) {
          if (_this5.data.hasOwnProperty(model)) {
            // no hacemos nada parece con esto por mientas
            if (input.value != _this5.data[model].toString()) {
              input.value = _this5.data[model]; // ---------------------------------------------------------------

              if (_this5.$form.hasOwnProperty(form)) {
                if (_this5.$form[form].hasOwnProperty(model)) {
                  _this5.$form[form][model].$value = _this5.data[model];
                  _this5.$form[form][model].$valid = isValid(input);
                  _this5.$form[form].$valid = isValidForm(_this5.$form[form]);
                }
              } // ---------------------------------------------------------------

            } // 

          }
        }
      });
    }; // --------------------------------------------------------------------------

    /**
    *@var initializeDirectivesComplex
    *@type Function
    *@description - directive que se encarga de ejecutar el anailicis de las 
    *directivas multi paramatetros que son las directivas bind,style,class
    *@example - bind='attribute:expression , attribute:expression | filtros:parametros '
    *
    */


    this.initializeDirectivesComplex = function (el) {}; // ---------------------------------------------------------------------    

    /**
    *
    *
    */


    this.initializeDirectives = function (el) {
      var _this6 = this;

      var el = el || this.el;
      ['maxlength', 'minlength', 'max', 'min', 'text', 'html', 'show', 'disabled', 'readonly', 'required'].forEach(function (attrCatch) {
        qAll(el, '[pp-' + attrCatch + ']').forEach(function (attrEl) {
          var expression = getAttr(attrEl, 'pp-' + attrCatch);

          if (expression != "" && expression != null) {
            // Detectando Filtros separados por |
            var expressionArray = expression.split('|').map(function (value) {
              return value.trim();
            }); // variable de salida 

            var output = ""; // Pasando $formulario

            var form = attrEl.getAttribute("pp-data-form");
            var $form = void 0;

            if (form != null) {
              if (_this6.$form.hasOwnProperty(form)) {
                $form = _this6.$form[form];
              }
            } // Pasando $formulario


            try {
              output = _this6.saferEval(expressionArray[0], _objectSpread(_objectSpread({}, _this6.data), {
                $form: $form
              }), _this6.methods); // Capturando Filtros                       

              if (expressionArray.length > 1) {
                for (var iterator = 1; iterator < expressionArray.length; iterator++) {
                  var Filtro = expressionArray[iterator];

                  if (_this6.filters.hasOwnProperty(Filtro)) {
                    if (isString(output)) {
                      output = _this6.filters[Filtro](output);
                    }
                  }
                }
              } // Capturando Filtros    

            } catch (messageError) {
              console.warn(messageError);
            }

            if (attrCatch == "text") {
              _this6.handleTextDirective(attrEl, output);
            }

            if (attrCatch == "show") {
              _this6.handleShowDirective(attrEl, output);
            }

            if (attrCatch == "disabled") {
              _this6.handleDisabledDirective(attrEl, output);
            }

            if (attrCatch == "readonly") {
              _this6.handleReadonlyDirective(attrEl, output);
            }

            if (attrCatch == "required") {
              _this6.handleRequiredDirective(attrEl, output);
            }

            if (attrCatch == "html") {
              _this6.handleHtmlDirective(attrEl, output);
            } // Forms input


            if (attrCatch == "maxlength") {
              _this6.handleMaxLengthDirective(attrEl, output);
            }

            if (attrCatch == "minlength") {
              _this6.handleMinLengthDirective(attrEl, output);
            }

            if (attrCatch == "max") {
              _this6.handleMaxDirective(attrEl, output);
            }

            if (attrCatch == "min") {
              _this6.handleMinDirective(attrEl, output);
            }
          } //END IF

        });
      });
    };
    /*
    *@var HelperFunctionInitialize
    *@type Function
    *@description - Esta funcion ayuda ha inicializar los eventos 
    *Esta funcion esta dentro del ciclo de eventos
    */


    this.HelperFunctionInitialize = function (NativeEvent, stringAttribute) {
      var target = NativeEvent.target;
      var expression = getAttr(target, stringAttribute);

      var $data = _objectSpread({}, this.data);

      var form = getAttr(target, 'pp-data-form');
      var $form = null;

      if (this.$form.hasOwnProperty(form)) {
        $form = this.$form[form];
      }

      var $dataTemporal = Object.assign(_objectSpread({}, this.data), {
        $el: target,
        $event: NativeEvent,
        $form: $form
      });

      try {
        var safer = this.saferEval(expression, $dataTemporal, this.methods);
      } catch (messageError) {
        console.log(messageError);
      }

      this.data = _objectSpread({}, omit($dataTemporal, '$el', '$event'));
      this.detectingChangeData($data, NativeEvent);
    };
    /**
    *
    *
    */


    var h = function h(root, attr, remove) {
      return function hf(NativeEvent) {
        root.HelperFunctionInitialize(NativeEvent, attr);

        if (remove) {
          NativeEvent.target.removeEventListener(NativeEvent.type, hf);
        }
      };
    }; //* function que ayuda al this.initialize *//
    // ---------------------------------------------------------------------

    /*
    *@var initialize
    *@type Function
    *@description - Funcion que inicializa las caracteristicas reactivas de esta 
    * librearia
    *@param el - > Objecto  de del Dom a Inicializar
    */


    this.initialize = function (el) {
      var _this7 = this;

      var iTime = Date.now();
      var el = el || this.el; // forEach

      getLisenEvent().forEach(function (lEvent) {
        //if        
        qAll(el, '[pp-' + lEvent + ']').forEach(function (ElEvent) {
          var attrNameEvent = 'pp-' + lEvent,
              expresion = getAttr(ElEvent, attrNameEvent);
          ElEvent.addEventListener(lEvent, h(_this7, attrNameEvent, false));
        }); //if        
        //if        

        qAll(el, '[pp-' + lEvent + '-once]').forEach(function (ElEventOnce) {
          var attrNameEventOnce = 'pp-' + lEvent + '-once';
          var expresionOnce = getAttr(ElEventOnce, attrNameEventOnce);
          ElEventOnce.addEventListener(lEvent, h(_this7, attrNameEventOnce, true));
        }); //if
      }); // forEach      

      qAll(el, "[pp-form]").forEach(function (elForm) {
        setAttr(elForm, "pp-data-form", getAttr(elForm, 'name'));

        _this7.handleFormDirective(elForm);
      }); // Esta Funcion solo se ejecutara una vez
      // ya que e activan eventos donde se escuchan los  cambios      

      this.initializeModel(el);
      this.initializeDirectivesAll(el); // Tiempo for initialize all 

      console.log(Date.now() - iTime);
    }; // ---------------------------------------------------------------------   

    /**
    *@var initializeDirevesAll
    *@type Function
    */


    this.initializeDirectivesAll = function (el) {
      this.initializeDirectivesComplex(el);
      this.initializeDirectives(el);
    }; // ---------------------------------------------------------------------


    this.on('dataChange', function () {
      _this8.modelSetValue(_this8.el);

      _this8.initializeDirectivesAll(_this8.el);
    }); // ---------------------------------------------------------------------

    this.initialize(this.el);
    this.emit('finished'); //----------------------------------------------------------------------------
  };
});
