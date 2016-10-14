/**
 * Created by Ricardo on 14/10/2016.
 */
// formulário de envio de respostas no painel de alunos
$(formId_endingTask).ajaxForm({
    url: BASE_URL + 'student/endingTask',
    type: "POST",
    dataType: "json",
    success: function (e) {
        if (e['return'] != undefined) {
            if (e['return'] == true) {
                $(formId_endingTask).resetForm();
            }
            bootbox.alert(e['message']);
        } else {
            bootbox.alert(getMessage());
        }
    },
    error: function () {
        bootbox.alert(getMessage());
    }
});
delete (formId_endingTask);