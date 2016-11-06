
/**
 * Formatar apresentação de dados para tabela de turmas do aluno
 */
function studentListTeams() {
    studentGetTeams(function (data) {
        // aplicar valores de debug
        data = setValuesToDebug(data, 'testStudentGetTeams');
        if (data[0] != undefined) {
            // Recebe formatação do conteudo da tabela
            var dataHtml = '';
            for (var i = 0; (data[i] != undefined); i++) {
                dataHtml += '<tr><td>' + data[i]['description'] + '</td>' +
                    '<td>' + data[i]['teacher'] + '</td>' +
                    '<td>' + formatButtonTBodyOptions('glyphicon glyphicon-minus', 'unbindTeam('+ data[i]['id'] +')', false, 'Desvincular-se') + '</td></tr>';
            }
            $('#tbody_MyTeams').html(dataHtml + getScriptTooTip());
            delete (dataHtml);
        }
    });
}

/**
 * Desvincular-se da Turma em questão.
 *
 * @param teamId
 */
function unbindTeam(teamId) {
    // todo implementar aqui
    alert('Desvincular-se a Turma ID { '+ teamId +' }');
}

/**
 * Buscar todas as turmas que este aluno participa atualmente
 */
function studentGetTeams(callback) {
    $.ajax({
        url: urlAjaxRequest['studentGetTeams'],
        type: "POST",
        dataType: "json",
        success: function (data) {
            // aplicar valores de debug
            callback(setValuesToDebug(data, 'testStudentGetTeams'));
        },
        error: function (data) {
            // aplicar valores de debug
            callback(setValuesToDebug(data, 'testStudentGetTeams'));
        },
    })
}

/**
 * Listar tarefas finalizadas para este estudante
 */
function studentListFinishedTasks() {
    studentGetFinishedTasks(function (data) {
        var dataHtml = '';
        if (data[0] != undefined) {
            dataHtml = '<ul class="panel-display-ul-li">';
            for (var i = 0; (data[i] != undefined); i++) {
                dataHtml += '<li class="title-li-tasks"><button type="button" ' +
                    ' data-toggle="tooltip" data-placement="top" title="Visualizar"' +
                    ' class="btn btn-primary btn-sm" onclick="studentFormatDataTask(' +
                    data[i]['id'] + ', ' + (i + 1) + ');"><span class="glyphicon ' +
                    ' glyphicon-search"></span></button> - ' + data[i]["summary"] + '.</li>' +
                    '<div id="container-data-task-' + (i + 1) + '" class="container-data-task"></div>';
            }
            dataHtml += "</ul>";
        } else {
            dataHtml = "<br/><p class='text-center'> Nenhuma tarefa aplicada atualmente... </p>";
        }
        $('#student-div-finished-tasks').html(dataHtml + getScriptTooTip());
        delete (dataHtml);
    });
}

/**
 * Buscar tarefas já finalizadas para ete Aluno
 * @param callback
 */
function studentGetFinishedTasks(callback) {
    $.ajax({
        url: urlAjaxRequest['studentGetFinishedTasks'],
        type: "POST",
        dataType: "json",
        success: function (data) {
            callback(setValuesToDebug(data, 'testStudentGetFinishedTasks'));
        },
        error: function (data) {
            callback(setValuesToDebug(data, 'testStudentGetFinishedTasks'));
        }
    })
}

/**
 * Listar tarefas pendentes do ALuno
 */
function studentListPendingTasks() {
    studentGetPendingTasks(function (data) {
        // Recebe conteudo formatado para view
        var dataHtml = '';
        if (data[0] != undefined) {
            dataHtml = '<ul class="panel-display-ul-li">';
            // listar tarefas atuais
            for (var i = 0; data[i] != undefined; i++) {
                dataHtml +=
                    '<li class="title-li-tasks"><button type="button" class="btn btn-primary" ' +
                    ' data-toggle="tooltip" data-placement="top" title="Responder"' +
                    ' onclick="respondTask('+ data[i]["id"] +')">' +
                    '<span class="glyphicon glyphicon-pencil"></span></button> - ' +
                    data[i]["summary"] + '<div id="container-data-task-' + (i + 1) + // Config id html (unico)
                    '" class="container-data-task"></div>';
            }
            dataHtml += "</ul>";
        } else {
            dataHtml = "<br/><p class='text-center'> Nenhuma tarefa aplicada atualmente... </p>";
        }
        $('#student-div-pendants-tasks').html(dataHtml + getScriptTooTip());
        delete (dataHtml);
    });
}

/**
 * Buscar tarefas pendentes do aluno
 */
function studentGetPendingTasks(callback) {
    $.ajax({
        url: urlAjaxRequest['studentGetPendingTasks'],
        type: "POST",
        dataType: "json",
        success: function (data) {
            callback(setValuesToDebug(data, 'testStudentGetPendingTasks'));
        },
        error: function (data) {
            callback(setValuesToDebug(data, 'testStudentGetPendingTasks'));
        }
    })
}

/**
 * Redirecionar para a página pricipal de exibiçao de tarefas,
 * onde o usuário aluno poderá responder a tarefa de contexto.
 *
 * @param taskId - Recebe ID da tarefa a ser respondida
 */
function respondTask(taskId) {
    // formatar URL e redirecionar para página
    window.location.assign(BASE_URL_STUDENT_RESPONDS_TASK + taskId);
}

/**
 * Formatar exibição de dados da tarefa para o Aluno
 *
 * @param taskId
 * @param keyIdContainer - ID Html de identificador de tarefa em content
 */
function studentFormatDataTask(taskId, keyIdContainer) {
    studentGetDataTask(taskId, function (data){
        // ocultar outras tarefas
        for (var y = 1; document.getElementById("container-data-task-" + y) != null; y++) {
            if (y != keyIdContainer) {
                $("#container-data-task-" + y).slideUp();
            }
        }
        // conteudado html
        var dataHtml = '<ul class="task-data-ul"><br/>';
        // receber conteúdo extra desta tarefa
        if (data['extra']) {
            dataHtml += '<span class="label label-default">Extra</span>' +
                '<div class="panel panel-default"><div class="panel-body">' + data['extra'] +'</div></div>';
        }

        for (var i = 0; data['questions'][i] != undefined; i++) {
            // recebe itens
            var items = '';
            var verifyResponse = function (response) {
                return response;
            };
            // pegar itens da questão
            for (var j = 0; data['questions'][i]['items'] != undefined; j++) {
                // verifica
                if (data['questions'][i]['items'][j] != undefined) {
                    if (verifyResponse(data['questions'][i]['items'][j]['response'])) {
                        items += '<li><b>' + data['questions'][i]['items'][j]['letter'] + ') ' + data['questions'][i]['items'][j]['description'] + '</b> [Resposta] </li>'
                    } else {
                        items += '<li>' + data['questions'][i]['items'][j]['letter'] + ') ' + data['questions'][i]['items'][j]['description'] + '</li>'
                    }
                } else {
                    break;
                }
            }
            // forma conteudo da listagem de itens
            var getItems = function (dataItems) {
                if (dataItems != '') {
                    return '<li>Alternativas:<br/><ul>' + dataItems + '</ul></li>'
                } else {
                    return dataItems;
                }
            };
            // formando conteúdo
            dataHtml += '<li><b>Questão ' + data['questions'][i]['number'] + '°</b> - ' + data['questions'][i]['description'] + ' (<span>' + data['questions'][i]['points'] + ' Ponto(s)</span>)</li>' + getItems(items) + '<br/>';
        }
        $("#container-data-task-" + keyIdContainer).html(dataHtml + '</ul>').slideDown();
        delete (dataHtml);
        delete (items);
        delete (getItems);
    });
}

/**
 * Buscar dados da tarefa para o usuário aluno
 *
 * @param taskId
 * @param callback
 */
function studentGetDataTask(taskId, callback) {
    $.ajax({
        url: urlAjaxRequest['studentGetTask'],
        type: "POST",
        data: { task_id : taskId },
        dataType: "json",
        success: function (data) {
            callback(setValuesToDebug(data, 'testStudentGetTask'));
        },
        error: function (data) {
            callback(setValuesToDebug(data, 'testStudentGetTask'));
        }
    });
}