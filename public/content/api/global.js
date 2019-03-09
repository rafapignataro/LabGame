function postForm(form, elementId, elementResultId, redirect = '0') {

    $.ajax({
        type: "POST",
        url: 'https://gamelabespm.herokuapp.com/user',
        data: new FormData(form[0]),
        contentType: "application/json; charset=utf-8", 
        dataType: "jsonp",
        crossDomain: true,
        success: function (retorno) {
            try {
                console.log(retorno);

                if (retorno.status) {
                    // location.href = redirect;
                } else {
                    $('#' + elementId).html(retorno.Mensagem);
                    $('#' + elementResultId).show();
                }

            } catch (e) {
                $('#' + elementId).html(retorno);
                $('#' + elementResultId).show();
            }
        }
    });
    return false;
}