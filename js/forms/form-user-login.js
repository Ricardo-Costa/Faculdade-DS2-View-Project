/**
 * Created by Ricardo on 14/10/2016.
 */
// checar campo de email no formulário de login
$('#login_email').focus(function () {
    // informa
    $('#div-login-info-email').html(' ');
}).blur(function () {
    checkEmail($(this).val(), function (data) {
        if (data['return'] != undefined) {
            var btnLogar = document.getElementById('input-logar');
            if (data['return'] == true) {
                // informa
                $('#div-login-info-email').html('Usuário não está registrado no sistema.');
                $('#div-form-login-info-email').addClass('has-error');
                //btnLogar.setAttribute('onclick', 'return false;');
                //btnLogar.setAttribute('disabled', 'disabled');
            } else {
                // informar usuário
                $('#div-info-email').html(' ');
                $('#div-form-login-info-email').removeClass('has-error');
                //btnLogar.setAttribute('onclick', '');
                //btnLogar.removeAttribute('disabled');
            }
            delete (btnLogar);
        }
    });
});

/**
 * formulário de LOGIN de usuário
 */
$(formId_UserLogin).submit(function (e) {
    // $(formId_UserLogin).submit(function (e) {
    var postData = $(this).serializeArray();
    $.ajax({
        url: BASE_URL + 'user/login',
        type: "POST",
        data: postData,
        dataType: "json",
        success: function (e) {
            if (e['return'] != undefined) {
                if (e['return'] == true) {
                    $(formId_UserLogin).resetForm();
                    window.location.assign(BASE_URL + getUserTypeName(e['userType']) + '/panel');
                } else {
                    bootbox.alert(e['message']);
                }
            } else {
                bootbox.alert(getMessage());
            }
        },
        error: function () {
            bootbox.alert(getMessage());
        }
    });
    e.preventDefault();
});

delete (formId_UserLogin);