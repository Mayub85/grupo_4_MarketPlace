function deleteProduct(el){
    let res = confirm("¿Está seguro que desea eliminar el producto?");
    if(res){
        let id = el.attributes["data-id"].value;
        $.ajax({
            url: `/admin/productDelete/${id}`,
            type: 'DELETE',
            success: function(result) {
                let url = window.location.href.split("?")[0];
                window.location = `${url}?state=1&id=${id}`
            },
            error: function(result) {
                console.log(result);
                let url = window.location.href.split("?")[0];
                window.location = `${url}?state=0&showMessage=1&msg=${result.responseJSON.message}`
            }
        });
    }
}