/**
 * Created by Ricardo on 06/11/2016.
 */
$(document).ready(function () {

    // formulário para criação de novos debates
    var formForumCreateDisc = '#form-forum-create-discussion';
    $(formForumCreateDisc).ajaxForm({
        url: urlFormActions['formForumCreateDiscussion'],
        type: "POST",
        dataType: "json",
        success: function (e) {
            if (e['return'] != undefined) {
                if (e['return'] === "true") {
                    $(formForumCreateDisc).resetForm();
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
    delete (formForumCreateDisc);

});