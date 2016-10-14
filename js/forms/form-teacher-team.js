/**
 * Created by Ricardo on 14/10/2016.
 */
// formulário de registro de turmas
$(formId_defineNewTeam).ajaxForm({
    url: BASE_URL + 'administrator/defineTeam',
    type: "POST",
    dataType: "json",
    success: function (e) {
        if (e['return'] != undefined) {
            bootbox.alert(e['message']);
        } else {
            bootbox.alert(getMessage());
        }
        $(formId_defineNewTeam).resetForm();
    },
    error: function () {
        bootbox.alert(getMessage());
        $(formId_defineNewTeam).resetForm();
    }
});
delete (formId_defineNewTeam);