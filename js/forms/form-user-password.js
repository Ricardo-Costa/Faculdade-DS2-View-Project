/**
 * Created by Ricardo on 14/10/2016.
 */

$(document).ready(function () {

    // formulário para definição de nova senha
    var formDefinePassword = '#form-define-password';
    $(formDefinePassword).ajaxForm({
        url: urlFormActions['formDefinePassword'],
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data['return'] != undefined) {
                if (data['return'] == true) {
                    $(formDefinePassword).resetForm();
                    bootbox.alert(data['message'], function () {
                        window.location.assign(BASE_URL);
                    })
                } else {
                    bootbox.alert(data['message']);
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
        success: function (data) {
            waitingDialog.hide();
            if (data['return'] != undefined) {
                if (data['return'] == true) {
                    $(formRequestRePassword).resetForm();
                    bootbox.alert(data['message'], function () {
                        window.location.assign(BASE_URL);
                    })
                } else {
                    bootbox.alert(data['message']);
                }
            } else {
                bootbox.alert(MSG_ALERT_ERROR);
            }
            $(formRequestRePassword).resetForm();
        },
        error: function () {
            waitingDialog.hide();
            bootbox.alert(MSG_ALERT_ERROR);
            $(formRequestRePassword).resetForm();
        }
    });
    delete (formRequestRePassword);

});