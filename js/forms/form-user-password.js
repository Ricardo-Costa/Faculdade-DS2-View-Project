/**
 * Created by Ricardo on 14/10/2016.
 */

// formulário para definição de nova senha
var formDefinePassword = '#form-define-password';
$(formDefinePassword).ajaxForm({
    url: urlFormActions['formDefinePassword'],
    type: "POST",
    dataType: "json",
    success: function (e) {
        if (e['return'] != undefined) {
            if (e['return'] == true) {
                $(formDefinePassword).resetForm();
                bootbox.alert(e['message'], function () {
                    window.location.assign(BASE_URL);
                })
            } else {
                bootbox.alert(e['message']);
            }
        } else {
            bootbox.alert(MSG_ALERT_ERROR);
        }
        $(formDefinePassword).resetForm();
    },
    error: function () {
        bootbox.alert(MSG_ALERT_ERROR);
        $(formDefinePassword).resetForm();
    }
});
delete (formDefinePassword);

// formulário para solicitação de redefinição de senha
var formRequestRePassword = '#form-require-password';
$(formRequestRePassword).ajaxForm({
    url: urlFormActions['formRequestRePassword'],
    type: "POST",
    dataType: "json",
    success: function (e) {
        if (e['return'] != undefined) {
            if (e['return'] == true) {
                $(formRequestRePassword).resetForm();
                bootbox.alert(e['message'], function () {
                    window.location.assign(BASE_URL);
                })
            } else {
                bootbox.alert(e['message']);
            }
        } else {
            bootbox.alert(MSG_ALERT_ERROR);
        }
        $(formRequestRePassword).resetForm();
    },
    error: function () {
        bootbox.alert(MSG_ALERT_ERROR);
        $(formRequestRePassword).resetForm();
    }
});
delete (formRequestRePassword);