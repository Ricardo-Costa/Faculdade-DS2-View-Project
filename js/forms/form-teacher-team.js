/**
 * Created by Ricardo on 14/10/2016.
 */

$(document).ready(function () {

    // formulário para Definição de Turmas
    var formDefineTeam = '#form-define-team';
    $(formDefineTeam).ajaxForm({
        url: urlFormActions['formDefineTeam'],
        type: "POST",
        dataType: "json",
        success: function (e) {
            if (e['return'] != undefined) {
                if (e['return'] === "true") {
                    $(formDefineTeam).resetForm();
                    bootbox.alert(e['message'], function () {
                        window.location.assign(BASE_URL);
                    });
                } else {
                    bootbox.alert(e['message']);
                }
            } else {
                bootbox.alert(MSG_ALERT_ERROR);
            }
        },
        error: function () {
            bootbox.alert(MSG_ALERT_ERROR);
        }
    });
    delete (formDefineTeam);

});