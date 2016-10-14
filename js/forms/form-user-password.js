/**
 * Created by Ricardo on 14/10/2016.
 */
/**
 * formulário para requisitar redefinição de senha
 */
$(formId_rePassword).submit(function (e) {
    if ($("#g-recaptcha-response").val() != '') {
        waitingDialog.show('Aguarde...');
        var postData = $(this).serializeArray();
        $.ajax({
            url: BASE_URL + 'user/repassword',
            type: "POST",
            data: postData,
            dataType: "json",
            success: function (e) {
                waitingDialog.hide();
                if (e['return'] != undefined) {
                    if (e['return'] == true) {
                        $(formId_rePassword).resetForm();
                        bootbox.alert(e['message'], function () {
                            window.location.assign(BASE_URL);
                        })
                    } else {
                        bootbox.alert(e['message']);
                    }
                } else {
                    bootbox.alert(getMessage());
                }
                $(formId_rePassword).resetForm();
            },
            error: function () {
                waitingDialog.hide();
                bootbox.alert(getMessage());
                $(formId_rePassword).resetForm();
            }
        });
        delete (postData);
    }
    e.preventDefault();
});
delete (formId_rePassword);

// formulário de redefinição de senha
formCurrent = '#form-define-password';
$(formCurrent).ajaxForm({
    url: BASE_URL + 'user/define-password',
    type: "POST",
    dataType: "json",
    success: function (e) {
        if (e['return'] != undefined) {
            if (e['return'] == true) {
                $(formCurrent).resetForm();
                bootbox.alert(e['message'], function () {
                    window.location.assign(BASE_URL);
                })
            } else {
                bootbox.alert(e['message']);
            }
        } else {
            bootbox.alert(getMessage());
        }
        $(formCurrent).resetForm();
    },
    error: function () {
        bootbox.alert(getMessage());
        $(formCurrent).resetForm();
    }
});