/**
 * Created by Ricardo on 06/11/2016.
 */

/**
 * Formatar dados das listas de discussões.
 *
 * @param data
 * @returns {string}
 */
function formatDataDiscussion(data) {
    var dataHtml = '';
    for (var i=0; data[i] != undefined; i++) {
        dataHtml += '<tr><td><div class="forum-user-field">' +
            '<a href="user-profile.html">' +
            '<img class="forum-user-img" src="img/user-profile.svg" width="30" height="30" />' +
            '<br/>' + data[i]['user']['name'] +'</a></div></td><td>' +
            '<span class="label label-primary label-acronym">'+ data[i]['team'] +'</span>' +
            '<a href="forum-discussion.html">'+ data[i]['title'] +'</a>' +
            '</td><td><span class="label label-default pull-right"> '+ data[i]['date'] +' </span>' +
            '<span class="label label-success pull-right"> '+ data[i]['replies'] +' resp. </span>' +
            '<span class="label label-like pull-right">'+ data[i]['likes'] +'</span></td></tr>';
    }
    return dataHtml;
}

/**
 * Exibir debates "relacionados" no fórum
 */
function showForumRelatedDiscussions() {
    forumGetRelatedDiscussions(function (data) {
        $('#forum-tbody-related-discussions').html(formatDataDiscussion(data));
    });
}

/**
 * Exibir todos os debates no fórum
 */
function showForumAllDiscussions() {
    forumGetAllDiscussions(function (data) {
        // ToDo - Modificar essa estrutura após testes...
        var dataHtml = formatDataDiscussion(data);
        $('#forum-tbody-all-discussions').html(
            // ToDo - Modificar essa estrutura após testes...
            dataHtml + dataHtml + dataHtml + dataHtml
        );
    });
}

/**
 * Buscar debates "Relacionados ao Usuário" no fórum
 *
 * @param handleData
 */
function forumGetRelatedDiscussions(handleData) {
    $.ajax({
        url: urlAjaxRequest['forumGetRelatedDiscussions'],
        type: "POST",
        dataType: "json",
        success: function (e) {
            handleData(e);
        },
        error: function (e) {
            handleData(setValuesToDebug(e, 'testForumGetRelatedDiscussions'));
        }
    });
}

/**
 * Buscar todos os debates do fórum
 *
 * @param handleData
 */
function forumGetAllDiscussions(handleData) {
    $.ajax({
        url: urlAjaxRequest['forumGetAllDiscussions'],
        type: "POST",
        dataType: "json",
        success: function (e) {
            handleData(e);
        },
        error: function (e) {
            handleData(setValuesToDebug(e, 'testForumGetRelatedDiscussions'));
        }
    });
}

/**
 * Formatar Options do Select em painel de Criação de debates.
 *
 * Obs.: Baseando-se nas turmas atuais do Aluno.
 */
function formatOptionsToStudents() {
    studentGetTeams(function (data) {
        // aplicar valores de debug
        data = setValuesToDebug(data, 'testStudentGetTeams');
        if (data[0] != undefined) {
            var optionsHtml = '';
            for (var i = 0; (data[i] != undefined); i++) {
                optionsHtml += '<option value="' + data[i]['id'] +
                    '">' + data[i]['description'] + '</option>';
            }
            $('#target-team').html(optionsHtml);
            delete (optionsHtml);
        }
    });
}