/* @author: Leandro Salar, Marcelo Salar. @version: 0.1;  */

/* Declaracion de variables
============================ */
$url     = 'php/funciones.php';
$urlFbk  = 'php/facebook/facebookphp.php';
$nImagen = 0;
$w       = parseInt($(window).width());
$h       = parseInt($(window).height());

/* Inicio del doc  
=================== */
$(document).ready(function(){
    /* clase .nada hace que no se envien datos ni funcionen clicks 
==================================================================== */
    $(".nada").click(function(a){
    	a.preventDefault();
    }).submit(function(a){
    	a.preventDefault();
    });     
});

/* Comienzo de las funciones 
=================================================================== */
function funcionesDeCarga() // carga esta funcion cuando termina de cargar el 
{
    $("#ideaDeFondo").css({width:$w,height:$h});

    // arma el fondo
    $k=15;
    $i=0;
    for($i=0;$i<$k;$i++)
    {
        $t = $w/($i+1);
        $("#ideaDeFondo").append('<div class="redondito positionAbsolute medida'+$i+'" style="width:'+$t+'px;height:'+$t+'px"></div> ');
    } //fin del bucle que hace el fondo
} // fin de funcionesDeCarga

/* Funciones de el framework para leer los resultados del ajax
=================================================================== */
function termina(xq,v)
{
    /**
     * xq -> corresponde al caso del switch
     * v -> resultado en array que envia el ajax
     */
    if( xq == "enviamail" )
    {
        $("form[name=solicitud] input[type=text]").val("");
        $("form[name=solicitud] input[name=nombre]").val("Muchas gracias");       
    }
}