const inicializarDatePicker = (fechaHoyMasUno,fechaFormateada,misFechasBloqueadas)=>{


  $("#form-field-fecha").datepicker("destroy");
    $("#form-field-fecha").datepicker({

        
        dateFormat: "dd-mm-yy",

        minDate: fechaHoyMasUno!="" ?  fechaHoyMasUno :  fechaFormateada,

          dayRender : function(date,cell){
            
            cell.css('background','red');
          
            
        } ,

        beforeShowDay: function(date) {
          
              
          let dateString = $.datepicker.formatDate("dd-mm-yy", date),

          
              condicional1 = (misFechasBloqueadas.includes(dateString) ),

              condicional2 = (date.getDay() == 0 || date.getDay() == 6);



          if(condicional1 || condicional2){ 

            
                
                return [false, 'red-1'];

            }
        

        
            
          return [true,'red'];

        }

      });




}

export default inicializarDatePicker ;