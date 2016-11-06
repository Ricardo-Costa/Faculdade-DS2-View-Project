/**
 * Created by Ricardo on 02/11/2016.
 */

$(document).ready(function () {
    // formulário para registro de usuários administradooores
    var formRegisterAdm = '#form-adm-register';
    $(formRegisterAdm).submit(function (dataForm) {
        // verificar preechimento de inputs
        if (!checkFormEmptyInputs(formRegisterAdm)) {
            waitingDialog.show('Aguarde...');
            var postData = $(this).serializeArray();

            $.ajax({
                url: urlFormActions['formRegisterAdm'],
                type: "POST",
                data: postData,
                dataType: "json",
                success: function (data) {
                    waitingDialog.hide();
                    if (data['return'] != undefined) {
                        if (data['return'] == true) {
                            $(formRegisterAdm).resetForm();
                        } bootbox.alert(data['message']);
                    } else {
                        bootbox.alert(MSG_ALERT_ERROR);
                    }
                },
                error: function () {
                    waitingDialog.hide();
                    bootbox.alert(MSG_ALERT_ERROR);
                }
            });
        }
        dataForm.preventDefault();
    });
    delete (formRegisterAdm);
});