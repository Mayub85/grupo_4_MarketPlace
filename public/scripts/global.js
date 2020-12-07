var fslider;
$(document).ready(()=>{
    $("body").toasty();
    $('#sandwich').on( "click", function() {
        $("#menu").slideToggle();
    });
    
    $('#inputSearch').keyup(function(e){ 
        var code = e.key;
        if(code==="Enter") e.preventDefault();
        if(code===" " || code==="Enter" || code===","|| code===";"){
            search();
        } 
    });

    $('#btnSearch').on('click', ()=>{
       search();
    });
});

function search(){
    let txt = $("#inputSearch").val();
    if(txt.toLowerCase() == "herni!"){
        $("body").toasty('pop');
    }else{
        alert(txt);
    }
}
