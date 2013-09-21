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
        $iu = window.localStorage.getItem("id_admin");
    if($ur != null && $iu != null)
    {
        cambiaSeccion("pageMenu");
        cargaLeads('todos');
    }
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

    /* funcion para el form de los leads */
    $("form[name=leadsAdd]").submit(function(a){
        a.preventDefault();
        var cant = parseInt($("form[name=leadsAdd] input").length)-1;
        $("form[name=leadsAdd] input").each(function(event){
            if($(this).val().length < 2 && $(this).val() != "Save" )
            {
                $(this).addClass("lineaRoja");
            }   
            else
                $(this).removeClass("lineaRoja");

            if( event == cant && $("form[name=leadsAdd] input").hasClass("lineaRoja") == false)
            {
                $data = 'h=addLeads&id_admin='+$iu+'&dispo=cellphone&'+$("form[name=leadsAdd]").serialize();
                lmPost($url,$data,"addLeads");
            }
        });
        return false;
    });
    $(".dashboardCubos").hammer().on('tap',function(event){
        $(this).css("background-color","#ffffff");
        setTimeout(function(){
            $('.dashboardCubos').css("background-color","#f9f6e7");
        },500);
    });
}
function cargaLeads(cuales)
{
    /* hace las cargas de los datos Leads y demases */
    $data = 'h=cargaLeads&cuales='+cuales+'&id_admin='+$iu;
    lmPost($url,$data,"cargaLeads");
}
function haceCambioLeads(id,cuales)
{
    $("#pageLeads .footer .menuContenedor div.selected").removeClass("selected");
    $("#"+id).addClass("selected");

    cargaLeads(cuales);
}
function haceCambioLeadsForms(id,cuales)
{
    $("#pageLeadsForm .footer .menuContenedor div.selected").removeClass("selected");
    $("#"+id).addClass("selected");    
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
                        $(this).css("-webkit-animation-delay","1."+(i+1)+"s").removeClass("oculto").addClass("animacionFadeCenterScale");
                    });        
                },600);
            break;
        }
    },700);
}

function lmPost($url,$data,xq)
{
    $.ajax({
        type:'POST',
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
            window.localStorage.setItem("ur",v['nick']);
            window.localStorage.setItem("dispositivo",v['dispositivo']);
            window.localStorage.setItem("id_admin",v['id']);

            cargaLeads('todos');
            cambiaSeccion("pageMenu");
        }
    }
    else if( xq == "cargaLeads" )
    {
        $loading = '<div class="loading"> Loading leads...</div>';
        $("#muestraContLeads").html($loading);
        
        if(v['aviso'] == "si")
        {
            $vueltas = v['vueltas'];
            $i       = 0;
            $ht      = '';
            for($i=0; $i<$vueltas;$i++)
            {
                $ht  += '<div class="cajaLeads floatLeft w100">\
                            <div class="icono floatLeft">\
                                <img src=".'+v[$i]['imagen']+'" />\
                            </div>\
                            <div class="floatLeft subCajaLeads">\
                                <div class="floatLeft nombreLeads negro">'+v[$i]['nombre_usuario']+'</div>\
                                <div class="clearBoth"></div>\
                                <div class="floatLeft fechaHoraLeads gris">'+v[$i]['fecha_lead']+'</div>\
                            </div>\
                            <div class="floatRight flechita">\
                                <img src="template/iconos/flechita.png" />\
                            </div>\
                        </div> ';
            }

            $("#muestraContLeads").html($ht);
        }
        else
        {
            $ht = '<div class="celeste floatLeft w100 textAlignCenter"> Not leads found </div>';
            $("#muestraContLeads").html($ht);
        }   
    }
    else if( xq == "addLeads" )
    {
        $loading = '<div class="loading"> Loading leads...</div>';
        $("#muestraContLeads").html($loading);
        
        if(v['aviso'] == "si")
        {
            cargaLeads('todos');
            cambiaSeccion("pageLeads");
        }
    }
}