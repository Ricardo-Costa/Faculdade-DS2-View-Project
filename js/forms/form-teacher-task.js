/**
 * Created by Ricardo on 14/10/2016.
 */
// formulário de criação de tarefas"
$(formId_createTask).ajaxForm({
    url: BASE_URL + 'teacher/createNewTask',
    type: "POST",
    dataType: "json",
    success: function (e) {
        if (e['return'] != undefined) {
            if (e['return'] == true) {
                bootbox.alert(e['message'], function () {
                    $(formId_createTask).resetForm();
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
        bootbox.alert(getMessage());
        // $(formId_createTask).resetForm();
    }
});
delete (formId_createTask);

// formulário de edição de tarefas
$(formId_editTask).ajaxForm({
    url: BASE_URL + 'teacher/updateDataTask',
    type: "POST",
    dataType: "json",
    success: function (e) {
        if (e['return'] != undefined) {
            if (e['return'] == true) {
                $(formId_editTask).resetForm();
                bootbox.alert(e['message'], function () {
                    window.location.assign(BASE_URL);
                });
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
delete (formId_editTask);