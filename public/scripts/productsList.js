var fslider;
$(document).ready(()=>{
  
    
});

function deleteProduct(el){
    let res = confirm("¿Está seguro que desea eliminar el producto?");
    if(res){
        let id = el.attributes["data-id"].value;
        //window.location = `/admin/productDelete/${id}`;
        $.ajax({
            url: `/admin/productDelete/${id}`,
            type: 'DELETE',
            success: function(result) {
                window.location = `/admin/productsList?state=1&id=${id}`
            },
            error: function(result) {
                //alert(result.responseJSON.message);
                window.location = `/admin/productsList?state=0&showMessage=1&msg=${result.responseJSON.message}`
            }
        });
    }
}