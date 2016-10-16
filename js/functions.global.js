/**
 * Created by Ricardo on 12/10/2016.
 */
function setMessage(msg) {
    message = msg;
}
function getMessage() {
    return window.message;
}

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
 * @param c - Classe do icone do botão
 * @param setFunction - Formar função que o botão deverá receber
 * @param disabled - ...se o botão vai estar desativado
 * @returns {string}
 */
function formButtonToTable(c, setFunction, disabled) {
    if (disabled === true) {
        return '<div class="btn-group" role="group">' +
            '<button type="button" class="btn btn-default disabled" disabled onclick="' + setFunction + '">' +
            '<i class="' + c + '"></i></button></div>';
    }
    return '<div class="btn-group" role="group">' +
        '<button type="button" class="btn btn-default" onclick="' + setFunction + '">' +
        '<i class="' + c + '"></i></button></div>';
}

/**
 * Verifica se CPF é válido
 *
 * @param _cpf
 * @param handleData
 */
function checkCPF(_cpf, handleData) {
    $.ajax({
        url: urlFormValidations['cpf'],
        type: "POST",
        data: {cpf: _cpf},
        dataType: "json",
        success: function (e) {
            handleData(e);
        }
    });
}

/**
 * Verifica se Número de Telefone é válido
 *
 * @param phone
 * @param handleData
 */
function checkPhone( phone, handleData ) {
    $.ajax({
        url: urlFormValidations['phone'],
        type: "POST",
        data: { telefone : phone },
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
        url: urlFormValidations['email'],
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
