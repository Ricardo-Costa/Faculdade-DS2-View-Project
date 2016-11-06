/**
 * Created by Ricardo on 12/10/2016.
 */

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
    $('#summernote').summernote();
});