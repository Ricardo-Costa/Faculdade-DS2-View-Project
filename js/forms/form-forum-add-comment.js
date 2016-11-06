/**
 * Created by Ricardo on 06/11/2016.
 */
$(document).ready(function () {

    // formulário para criação de novos debates
    var formForumAddCommentDisc = '#form-discussion-add-comment';
    $(formForumAddCommentDisc).ajaxForm({
        url: urlFormActions['formForumAddComment'],
        type: "POST",
        dataType: "json",
        success: function (e) {
            if (e['return'] != undefined) {
                if (e['return'] === "true") {
                    $(formForumAddCommentDisc).resetForm();
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
    delete (formForumAddCommentDisc);

});