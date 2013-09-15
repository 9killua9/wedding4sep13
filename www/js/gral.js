/* @author: Leandro Salar, Marcelo Salar. @version: 0.1;  */

/* Declaracion de variables
============================ */
$url     = 'http://www.reiatsu.com.ar/clientes/juliocaunedo/phonegap/wedding/php/funciones.php';
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

    cargaTotal();
});

function cargaTotal()
{
    /*Acomoda tam de dashboard*/
    $(".dashboardCubos").css({width:(($w/2)-1), height:(($h-95)/3)})
    /*Dirige seccion al cargar*/
    var $ur = window.localStorage.getItem("ur");
    if($ur != null)
        cambiaSeccion("pageMenu");
    else
        cambiaSeccion("pageLogin");
    
    /* Login y usuarios */
    $("form[name=login]").submit(function(a){
        a.preventDefault();
        if( $("form[name=login] input[name=user]").val().length > 4 && $("form[name=login] input[name=password]").val() != "" )
        {
            $data = 'h=login&'+$("form[name=login]").serialize();
            lmPost($url,$data,"login");
        }
        else
            alert("Complete Nick and Password");

        return false;
    });
}
function cambiaSeccion(page)
{    
    $(".medidasPaginas").addClass("animacionFadeCenterScaleOut").addClass("one");
    setTimeout(function(){
        $("#"+page).removeClass("animacionFadeCenterScaleOut").removeClass("oculto").addClass("animacionFadeCenterScale").addClass("one");
        switch(page)
        {
            case "pageMenu":
                setTimeout(function(){
                    $(".dashboardCubos").each(function(i){
                        $(this).css("-webkit-animation-delay", i+".1s").removeClass("oculto").addClass("animacionFadeCenterScale");
                    });        
                },600);
            break;
        }
    },700);
}
/* Funciones de el framework para leer los resultados del ajax
=================================================================== */
function termina(xq,v)
{
    /**
     * xq -> corresponde al caso del switch
     * v -> resultado en array que envia el ajax
     */
    if( xq == "login" )
    {
        if(v['aviso'] == "si")
        {
            window.localStorage.setItem("ur", v['nick']);
            window.localStorage.setItem("dispositivo", v['dispositivo']);

            cambiaSeccion("pageMenu");
        }
    }
}