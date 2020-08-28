// --------------------------------------------------------------------------
    /**
    *@var initializeDirectivesComplex
    *@type Function
    *@description - directive que se encarga de ejecutar el anailicis de las 
    *directivas multi paramatetros que son las directivas bind,style,class
    *@example - bind='attribute:expression , attribute:expression | filtros:parametros '
    *
    */
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

              var form = getAttr(attrEl,'pp-data-form');
              var $form = void(0);
              if( this.$form.hasOwnProperty("form") ){
                $form  = this.$form[form];
              }

              var classList = {};
               try{                
                 classList = this.saferEval( expression , {...this.data,...{$form:$form}}, this.methods );
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