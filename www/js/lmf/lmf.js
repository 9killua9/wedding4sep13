/**
 *
 *@author: Leandro Salar, Marcelo Salar.
 *@version: 0.1;
 *@argument: Framework de trabajo de Reiatsu.com.ar
 **/

$(document).ready(function(){
});


/* ---------------------------------------------
------ Solucion para simplificar Ajax ----------
------------------------------------------------ */
function lmPost($url,$data,xq)
{
    $devolucion="";
    $.ajax({
        type:'post',
        url: $url,
        data: $data,
        dataType: 'json',
        success: function(v){
            
            if( v == null )
            {
                v = " Sin resultados ";
            }
            
            
            termina(xq,v);
        }
    });
}

/* ---------------------------------------------
------ Solucion para validar formularios -------
------------------------------------------------ */
function validaForm(qf)
{
    dato = new Array();
    
    dato[0] = ".lmNombre";
    dato[3] = ".lmApellido";
    dato[2] = ".lmDni";
    dato[1] = ".lmMail";
    dato[4] = ".lmTelefono";
    dato[5] = ".lmByc";
    dato[6] = ".lmComentario";  

    var i =0;
    for(i=0;i<=6;i++)
    {
        if($('form[name='+qf+'] '+dato[i]).is(dato[i]))
        {
            if ($('form[name='+qf+'] '+dato[5]).attr("checked") != "checked")
            {
                alert("- Acepte bases y condiciones -");
                return false;
            }
            if( $('form[name='+qf+'] '+dato[i]).val() == "" || $('form[name='+qf+'] '+dato[i]).val().length < 4 )
            {
                $(dato[i]).val("complete todos los datos");
                return false;
            }
            if( i == 6)
            {
                return true;
            }
        }
    }
}

/* ---------------------------------------------
------ Solucion para popups --------------------
------------------------------------------------ */
function lmPopUp(contenido)
{   
    // Creo el html del popUp
    //var fondoPop = '<div id="fondoPopUp" class="positionAbsolute oculto" style="background-color:#000000;opacity:0.8"></div>\
    //                 <div id="cuerpoPopUp" class="positionAbsolute oculto">'+contenidoPop+'</div>';
    
    // Cargo el codigo en el body
    $("#fondoPopUp, #cuerpoPopUp").fadeIn("fast");
    if ($("#cuerpoPopUp").css("display") == "block")
    {
        $("#cuerpoPopUp .popeOjo").fadeOut("fast",function(){
            $("#"+contenido).fadeIn("slow");
        });
    }
    else
    {
        $("#"+contenido).fadeIn("slow");
    }
    
    // Genero el borrar codigo del body 
    $("#fondoPopUp, .cierraPopUp").click(function(){
        $("#fondoPopUp,#cuerpoPopUp, #cuerpoPopUp .popeOjo").fadeOut("slow");
    });
}
function cierraPopUp()
{
    $("#fondoPopUp,#cuerpoPopUp, #cuerpoPopUp .popeOjo").fadeOut("slow");
}

function sacaEspacios(myString)
{
    rep = myString.replace(/^\s+/g,'').replace(/\s+$/g,'');
    // console.log(rep);
    return rep
}