/**
 * Created by Ricardo on 14/10/2016.
 */

// formulário de envio de respostas de questionário realizado pelo alunos
var formStudentEndingTask = '#form-student-ending-task';
$(formStudentEndingTask).ajaxForm({
    url: urlFormActions['formStudentEndingTask'],
    type: "POST",
    dataType: "json",
    success: function (e) {
        if (e['return'] != undefined) {
            if (e['return'] == true) {
                $(formStudentEndingTask).resetForm();
            }
            bootbox.alert(e['message']);
        } else {
            bootbox.alert(MSG_ALERT_ERROR);
        }
    },
    error: function () {
        bootbox.alert(MSG_ALERT_ERROR);
    }
});
delete (formStudentEndingTask);