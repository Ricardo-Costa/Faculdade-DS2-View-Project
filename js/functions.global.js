/**
 * Created by Ricardo on 12/10/2016.
 */

/**
 * Obter seguimentos de url corrente
 *
 * @param segmentNum - numero da sequencia
 * Exemplo:  http://localhost/<segment-1>/<segment-2>/<segment-3>
 *
 * @returns {*}
 */
function getSegmentUrl(segmentNum) {
    var pageUrl = window.location.href.split('/');
    if (pageUrl[segmentNum + 2] != undefined) {
        return pageUrl[segmentNum + 2];
    }
    return null;
}

/**
 * Retorna function de ação
 *
 * @param functionName
 * @param parameters
 * @param formEnd - Recebe uma segunda função
 * @returns {*}
 */
function getFunctionContext(functionName, parameters, formEnd) {
    if (functionName != "" && parameters.constructor === Array) {
        // conteudo de retorno
        var content = functionName + '(';
        for (var i = 0; parameters[i] != undefined; i++) {
            if (parameters[i + 1] != undefined) {
                content += "'" + parameters[i] + "',";
            } else {
                content += "'" + parameters[i] + "'";
            }
        }
        return content + ');' + formEnd;
    }
    return '';
}

/**
 * Formar botão de açães do sistema
 *
 * @param classGlyphicon - Classe glyphicon para icone do botão
 * @param setFunction - Formar função que o botão deverá receber
 * @param disabled - ...se o botão vai estar desativado
 * @param title
 * @returns {string}
 */
function formatButtonTBodyOptions(classGlyphicon, setFunction, disabled, title) {
    // formatar titulo do componente
    title = (disabled)? '...' : title ;
    if (disabled === true) {
        return '<div class="btn-group" role="group">' +
            '<button type="button" class="btn btn-default disabled btn-sm" disabled onclick="' + setFunction + '" ' +
            ' data-toggle="tooltip" data-placement="top" title="'+ title +'" >' +
            '<i class="' + classGlyphicon + '"></i></button></div>';
    }
    return '<div class="btn-group" role="group">' +
        '<button type="button" class="btn btn-default btn-sm" onclick="' + setFunction + '" ' +
        ' data-toggle="tooltip" data-placement="top" title="'+ title +'" >' +
        '<i class="' + classGlyphicon + '"></i></button></div>';
}

/**
 * Verifica se CPF é válido
 *
 * @param _cpf
 * @param handleData
 */
function checkCPF(_cpf, handleData) {
    $.ajax({
        url: urlFormValidations['validationCPF'],
        type: "POST",
        data: { cpf : _cpf },
        dataType: "json",
        success: function (e) {
            handleData(e);
        }
    });
}

/**
 * Verifica se Número de Telefone é válido
 *
 * @param _phone
 * @param handleData
 */
function checkPhone(_phone, handleData ) {
    $.ajax({
        url: urlFormValidations['validationPhone'],
        type: "POST",
        data: { phone : _phone },
        dataType: "json",
        success: function (e) {
            handleData(e);
        }
    });
}

/**
 * Verifica se email NÃO existe no sistema
 *
 * @param _email
 * @param handleData
 */
function checkEmail(_email, handleData) {
    $.ajax({
        url: urlFormValidations['validationEmail'],
        type: "POST",
        data: { email : _email },
        dataType: "json",
        success: function (e) {
            handleData(e);
        }
    });
}

/**
 * Formar Ul & Li em div de paginação de tabelas
 *
 * @param divPgHtmlId
 * @param qtd
 * @param pgCurrent
 * @param titleFunction
 */
function formatPaginationPanel(divPgHtmlId, qtd, pgCurrent, titleFunction) {
    // Define quantidades de links que devem ser exibidos na paginação
    var count = parseInt(mainArray.length / qtd) ;
    var divPg = '<ul class="pagination">';
    for (var i = 1; i <= count; i++) {
        if (i == pgCurrent) {
            divPg += '<li class="active"><a href="#" onclick="'+ titleFunction
                +'('+ i +', '+ qtd +'); return false;">'+ i +'</a></li>';
        } else {
            divPg += '<li><a href="#" onclick="'+ titleFunction+'('+ i +', '+ qtd
                +'); return false;">'+ i +'</a></li>';
        }
    }
    divPg += '</ul>';
    $(divPgHtmlId).html(divPg);
}

/**
 * Verificar se formulário possui inputs vazios.
 *
 * @param formIdHtml
 *
 * @returns {boolean}
 */
function checkFormEmptyInputs(formIdHtml) {
    var inputsArray = $(formIdHtml).serializeArray(), input;
    for (var i=0; i < inputsArray.length; i++) {
        input = inputsArray[i];
        if (input.value == '' || input.value == null) {
            return true;
        }
    }
    return false;
}

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
            '<a href="forum-discussion.html" target="_blank">'+ data[i]['title'] +'</a>' +
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
 * Estruturar script básico do componente "tooltip"
 *
 * @returns {string}
 */
function getScriptTooTip() {
    return '<script type="text/javascript">' +
        '$(function () {$(\'[data-toggle="tooltip"]\').tooltip()})</script>';
}

$(document).ready(function (){
    $('[data-toggle="tooltip"]').tooltip();
});