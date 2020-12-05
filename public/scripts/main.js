$(document).ready(()=>{

    let fslider = $('.flexslider').flexslider({
        animation: "slide",
        itemMargin: 0,
    });

    $('.productsflexslider').flexslider({
        animation: "slide",
        controlNav: false,
        slideshow: false,
        itemWidth: 190,
        itemMargin: 5,
        maxItems: 5
      });
    //$("#menu-1").menu();
    $('#sandwich').on( "click", function() {
        // wrap
        //   .animate( { height: "hide" }, 2000, name )
        //   .delay( 800 )
        //   .animate( { height: "show" }, 2000, name );
        $("#menu").slideToggle();
      });
    $('#inputSearch').keyup(function(e){ 
        var code = e.key; // recommended to use e.key, it's normalized across devices and languages
        if(code==="Enter") e.preventDefault();
        if(code===" " || code==="Enter" || code===","|| code===";"){
            alert($(this).val());
        } 
    });
    $('#btnSearch').on('click', ()=>{
        alert($('#inputSearch').val());
    });

    //FIX ancho del slider principal
    setTimeout(()=>{fslider.resize();}, 200);
    
});

function search(){

}
