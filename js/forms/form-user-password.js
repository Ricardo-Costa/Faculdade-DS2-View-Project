/**
 * Created by Ricardo on 14/10/2016.
 */

// formulário para requisitar o reenvio de senhas
var formResendPassword = '#form-resend-password';
$(formResendPassword).ajaxForm({
    url: urlFormActions['formResendPassword'],
    type: "POST",
    dataType: "json",
    success: function (e) {
        if (e['return'] != undefined) {
            if (e['return'] == true) {
                $(formResendPassword).resetForm();
                bootbox.alert(e['message'], function () {
                    window.location.assign(BASE_URL);
                })
            } else {
                bootbox.alert(e['message']);
            }
        } else {
            bootbox.alert(MSG_ALERT_ERROR);
        }
        $(formResendPassword).resetForm();
    },
    error: function () {
        bootbox.alert(MSG_ALERT_ERROR);
        $(formResendPassword).resetForm();
    }
});
delete (formResendPassword);