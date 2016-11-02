
/**
 * Retorna usuários cadastrados no sistema.
 *
 * @param urlAjaxRequestKey - Chave para definição de requisição dos usuários.
 *
 * @param handleData
 */
function getUsers(urlAjaxRequestKey, handleData) {
    $.ajax({
        url: urlAjaxRequest[urlAjaxRequestKey],
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data[0] != undefined) {
                handleData(data);
            }
        },
        error: function () { handleData([]); }
    });
}

/**
 * Formatar conteúdo da requisição de listagem de usuários.
 *
 * @param tableBodyTarget - ID Html do componente de tbody "alvo"
 * @param data
 */
function admPanelTableFormatContent(tableBodyTarget, data) {
    if (data[0] != undefined) {
        var dataHtml = '';
        // definir botão de banimento de usuário de acordo com o estado do usuário
        var buttonBan = function (data) {
            if (data[i]['status'] == STATUS_ACTIVE) {
                return formatButtonTBodyOptions('glyphicon glyphicon-off', getFunctionContext('banUser', [data[i]['id']], 'getUsersTeachers();'), false);
            }
            return formatButtonTBodyOptions('glyphicon glyphicon-off', null, true);
        };
        // formatar definição de status do usuário
        var status = function (status) { // todo - verificações para status de usuários
            switch (status) {
                case STATUS_INACTIVE :
                    return '<i style="color:rgba(128, 128, 128, 0.83)">Inativo</i>';
                case STATUS_ACTIVE   :
                    return '<i style="color:rgba(0, 156, 0, 0.77)">Ativo</i>';
                case STATUS_BANNED   :
                    return '<i style="color:rgba(198, 34, 9, 0.67)">Banido</i>';
            }
        };
        for (var i = 0; (data[i] != undefined); i++) {
            // formando conteúdo da tag <tbody>
            dataHtml += '<tr><td><b>' + data[i]['name'] + '</b></td>' +
                '<td>' + data[i]['cpf'] + '</td><td>' + data[i]['email'] + '</td>' +
                '<td>' + status(data[i]['status']) + '</td><td>' +
                formatButtonTBodyOptions('glyphicon glyphicon-ok',
                    'alert(\'Aprovar usuario {professor}\\nEnviar email, confirmando a aprovação da conta deste...\')',
                    data[i]['status'] != STATUS_INACTIVE, 'Aprovar') + ' ' +
                formatButtonTBodyOptions('glyphicon glyphicon-ban-circle',
                    'alert(\'(Banir / Inativar) usuário da aplicação\\n Obs.:Solicitar confirmação deste evento...\')',
                    data[i]['status'] == STATUS_BANNED, 'Banir') + ' ' +
                formatButtonTBodyOptions('glyphicon glyphicon-user',
                    'alert(\'Ver perfil do usuario \\n { Redirecionar para a página deste... {Userd ID : '+ data[i]['id'] +'} }\')',
                    false, 'Perfil') + ' '
                + '</td></tr>';
        }
        $(tableBodyTarget).html(dataHtml +
            '<script type="text/javascript">$(function () {$(\'[data-toggle="tooltip"]\').tooltip()})' +
            '</script>');
        delete (dataHtml);
    }
}

/**
 * Retornar todos os estudantes.
 * */
function getUsersStudents() {
    getUsers('admGetStudents', function (data) {
        data = setValuesToDebug(data, 'testAdmGetStudents');
        admPanelTableFormatContent('#tbody-adm-user-students', data);
    });
}

/**
 * Retornar todos os professores.
 * */
function getUsersTeachers() {
    getUsers('admGetTeachers', function (data) {
        data = setValuesToDebug(data, 'testAdmGetTeachers');
        admPanelTableFormatContent('#tbody-adm-user-teachers', data);
    });
}

/**
 * Retornar todos os administradores do sistema.
 */
function getUsersAdministrators() {
    getUsers('admGetAdministrators', function (data) {
        data = setValuesToDebug(data, 'testAdmGetAdministrators');
        admPanelTableFormatContent('#tbody-adm-user-administrators', data);
    });
}

/**
 * Banir usuário do sistema.
 *
 * @param userId
 */
function banUser(userId) {
    bootbox.confirm("Deseja realmente \"inativar\" este usuário no sistema?", function(result) {
        if (result) {
            $.ajax({
                url: BASE_URL + "administrator/banUser",
                type: "POST",
                dataType: "json",
                data: {user_id:userId},
                success: function (data) {
                    if (data['return'] != undefined) {
                        bootbox.alert(data['message']);
                    } else {
                        bootbox.alert(MSG_ALERT_ERROR);
                    }
                },
                error: function () {
                    bootbox.alert(MSG_ALERT_ERROR);
                }
            });
        }
    });
}