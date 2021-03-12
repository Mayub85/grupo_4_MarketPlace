function deleteUser(el){
    let res = confirm("¿Está seguro que desea eliminar usuario?");
    if(res){
        let id = el.attributes["data-id"].value;
        $.ajax({
            url: `/admin/userDelete/${id}`,
            type: 'DELETE',
            success: function(result) {
                let url = window.location.href.split("?")[0];
                window.location = `${url}?state=1&id=${id}`
            },
            error: function(result) {
                console.log(result);
                let url = window.location.href.split("?")[0];
                if(result.responseJSON){
                    window.location = `${url}?state=0&showMessage=1&msg=${result.responseJSON.message}`;
                } else {
                    window.location = `${url}?state=0&showMessage=1&msg=${"Error inesperado. Inténtelo más tarde."}`;
                }
            }
        });
    }
}