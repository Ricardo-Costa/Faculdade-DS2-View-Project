/**
 * Created by Ricardo on 14/10/2016.
 */

// formulário de criação de tarefas
var formCreateTask = '#form-create-task';
$(formCreateTask).ajaxForm({
    url: urlFormActions['formCreateTask'],
    type: "POST",
    dataType: "json",
    success: function (e) {
        if (e['return'] != undefined) {
            if (e['return'] == true) {
                bootbox.alert(e['message'], function () {
                    $(formCreateTask).resetForm();
                    window.location.assign(BASE_URL);
                });
            } else {
                bootbox.alert(e['message']);
            }
        } else {
            bootbox.alert(e['message']);
        }
    },
    error: function () {
        bootbox.alert(MSG_ALERT_ERROR);
    }
});
delete (formCreateTask);

// formulário de edição de tarefas
var formUpdateTask = '#form-update-task';
$(formUpdateTask).ajaxForm({
    url: urlFormActions['formUpdateTask'],
    type: "POST",
    dataType: "json",
    success: function (e) {
        if (e['return'] != undefined) {
            if (e['return'] == true) {
                $(formUpdateTask).resetForm();
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
delete (formUpdateTask);