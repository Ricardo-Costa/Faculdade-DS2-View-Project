
/**
 * Verifica se este professor possui permissão para criação de novas tarefas
 */
function validationCreateTask() {
    var showElements = function (showPanelCreateTasks) {
        if (showPanelCreateTasks) {
            $('#div-create-tasks-now').removeClass('hide');
            $('#div-create-tasks-now-off').addClass('hide');
            // Preencher select do painel
            setSelectToCreateTask();
        } else {
            $('#div-create-tasks-now').addClass('hide');
            $('#div-create-tasks-now-off').removeClass('hide');
        }
    };
    $.ajax({
        url: urlFormValidations['createTask'],
        type: "POST",
        dataType: "json",
        success: function (data) {
            showElements(data['return']);
        },
        error: function () {
            showElements(systemDebugRequest);
        }
    });
}

/**
 * Formatar apresentação de dados recebidos pela requisição de Listar Tarefas
 *
 * @param data
 */
function formatGetTasks(data) {
    var dataHtml = '';
    // set com debug
    data = setValuesToDebug(data, 'testGetTasks');
    // formatar botões de edição de tarefas
    var getBtnEdition = function (i, data, indicator) {
        // tornar botão ativo se esta tarefa está ativa
        return (!data[i]['finished'])?
        '<button title="Editar Tarefa" onclick="editTask('+ data[i]['id'] +')" ' +
        ' id="btn-edt-task-'+ indicator +'" type="button" class="btn btn-primary btn-sm" ' +
        ' onclick="alert(\'aki sim :D\')"><span class="glyphicon ' +
        ' glyphicon-pencil"></span></button>' :
            // ocultar botão se tarefa já foi encerrada
        '<button title="Indisponível" id="btn-edt-task-'+ indicator +'" type="button" disabled="" ' +
        ' class="btn btn-primary disabled btn-sm"><span class="glyphicon glyphicon-pencil">' +
        '</span></button>';
    }
    for (var i = 0; data[i] != undefined; i++) {
        // formando conteúdo
        dataHtml += '<li class="title-li-tasks"><div class="tasks-def"><div class="tasks-bnts">' +
            ' <button title="Visualizar" type="button" class="btn btn-primary ' +
            ' btn-sm" onclick="getTask(' + data[i]['id'] + ', ' + (i + 1) + ');">' +
            '<span class="glyphicon glyphicon-search"></span></button> ' + getBtnEdition(i, data, (i + 1)) +
            ' <button title="Avaliar Respostas" type="button" class="btn btn-primary ' +
            ' btn-sm" onclick="alert(\'Buscar respostas...\')//evaluateQuestions">' +
            '<span class="glyphicon glyphicon-list-alt"></span></button> ' +
            '</div><div class="tasks-summary" '+ ((data[i]['finished'])? 'style="opacity: 0.6"' : '')
            +'>'+ data[i]['summary'] + ((data[i]['finished'])?
                ' - <span class="label label-default">Encerrada</span></span>' :
                ' - <span class="label label-success">Em andamento</span></span>') + '</div></div></li>' +
            '<div id="container-data-task-' + (i + 1) + '" class="container-data-task"></div>';
    }
    $('#teacher-panel-currents-tasks').html(dataHtml).show();
    delete (dataHtml);
}

/**
 * Retornar lista de tarefas atuais
 */
function getTasks() {
    $.ajax({
        url: urlAjaxRequest['getTasks'],
        type: "POST",
        dataType: "json",
        success: function (data) {
            formatGetTasks(data);
        },
        error: function (data) {
            formatGetTasks(data);
        }
    })
}

/**
 * Formatar apresentação de dados recebidos pela requisição de buscar Tarefa
 *
 * @param data
 * @param keyIdContainer
 */
function formatGetTask(data, keyIdContainer) {
    // ocultar outras tarefas
    for (var y = 1; document.getElementById("container-data-task-" + y) != null; y++) {
        if (y != keyIdContainer) {
            $("#container-data-task-" + y).slideUp();
        }
    }
    // conteudado html
    var dataHtml = '<ul class="task-data-ul"><br/>';
    // set com debug
    data = setValuesToDebug(data, 'testGetTask');
    // receber conteúdo de referencias desta tarefa
    if (data['references']) {
        dataHtml += '<span class="label label-primary">Referências</span>' +
            '<div class="panel panel-default"><div class="panel-body">' + data['references'] +'</div></div>';
    }

    for (var i = 0; data['questions'][i] != undefined; i++) {
        // recebe items
        var items = '';
        // recebe items da questão
        for (var j = 0; data['questions'][i]['items'] != undefined; j++) {
            if (data['questions'][i]['items'][j] != undefined) {
                // Formatar item identificando items respostas
                items += (data['questions'][i]['items'][j]['response'])?
                '<li><b>' + data['questions'][i]['items'][j]['letter'] + ') ' + data['questions'][i]['items'][j]['description'] + '</b> [Resposta] </li>' :
                    items += '<li>' + data['questions'][i]['items'][j]['letter'] + ') ' + data['questions'][i]['items'][j]['description'] + '</li>'
            } else {
                break;
            }
        } // Formatar items na questão
        var getItems = function (dataItems) {
            if (dataItems != '') {
                return '<li>Alternativas:<br/><ul>' + dataItems + '</ul></li>'
            } else {
                return dataItems;
            }
        }; // formando conteúdo
        dataHtml += '<li><b>Questão ' + data['questions'][i]['number'] + '°</b> - ' + data['questions'][i]['description'] + ' (<span>' + data['questions'][i]['points'] + ' Ponto(s)</span>)</li>' + getItems(items) + '<br/>';
    }
    // Exibir conteudo da Tarefa
    $("#container-data-task-" + keyIdContainer).html(dataHtml + '</ul>').slideDown();
}

/**
 * Retorna dados da Tarefa
 *
 * @param taskId
 * @param keyIdContainer
 */
function getTask(taskId, keyIdContainer) {
    $.ajax({
        url: urlAjaxRequest['getTask'],
        type: "POST",
        data: { TaskId : taskId },
        dataType: "json",
        success: function (data) {
            formatGetTask(data, keyIdContainer);
        },
        error: function (data) {
            formatGetTask(data, keyIdContainer);
        }
    })
}


// Criar Nova Tarefas

// Contador de items de questões criados
var countItems = 0;
// Contador de quantidade de questões criadas
var countQuestions = 0;
// Recebe Identificador "temporário" da questão criada
var idQuestion = 0;
// Formata conteudo para uma questão do tipo objetiva
var addQuestObjective = function () {
    // setar contador de items
    countItems = 2;// Obs, porq questao deve ser iniciada com o mínimo de dois itens - A e B
    return '<label id="label_question_' + idQuestion + '" for="statement_' + idQuestion +
        '" class="control-label col-sm-3"> Questão ' + countQuestions + '</label>' +
        '<div class="col-sm-7">' +
        '<textarea id="question_' + idQuestion + '" class="form-control" name="question_' +
        idQuestion + '" maxlength="500" placeholder="Digite o enunciado da questão."' +
        ' required></textarea><br/>' +
        '<small>Obs: Deixe selecionado apenas o(s) item(s) considerado(s) resposta' +
        ' dessa questão.</small><br/>' +
        '<div class="input-group item-quest">' +
        '<span class="input-group-addon">' + items[1] + '</span>' +
        '<span class="input-group-addon">' +
        '<input name="item_' + items[1] + '_response_qst_' + idQuestion +
        '" type="checkbox" data-toggle="tooltip" data-placement="top" title="Resposta?" style="cursor:pointer" ' +
        ' aria-label="..."></span>' +
        '<input name="item_' + items[1] + '_description_qst_' + idQuestion +
        '" type="text" class="form-control" aria-label="..." placeholder="Descreva' +
        ' o enunciado do item"></div>' +
        '<div class="input-group item-quest">' +
        '<span class="input-group-addon">' + items[2] + '</span>' +
        '<span class="input-group-addon">' +
        '<input name="item_' + items[2] + '_response_qst_' + idQuestion +
        '" type="checkbox" data-toggle="tooltip" data-placement="top" title="Resposta?" style="cursor:pointer" ' +
        ' aria-label="..."></span>' +
        '<input name="item_' + items[2] + '_description_qst_' + idQuestion +
        '" type="text" class="form-control" aria-label="..." placeholder="' +
        'Descreva o enunciado do item" ></div>' +
        '<div id="item_' + items[3] + '_qst_' + idQuestion + '" ' +
        'class="input-group item-quest"></div>' +
        '<div id="item_' + items[4] + '_qst_' + idQuestion + '" ' +
        'class="input-group item-quest"></div>' +
            // todo -> Obs aqui ficou limitado a 5 itens, alterar posteriormente maneira de agregação
        '<div id="item_' + items[5] + '_qst_' + idQuestion + '" ' +
        'class="input-group item-quest"></div>' +
        '</div>' +
        '<div class="col-sm-1">' +
        '<input data-toggle="tooltip" data-placement="top" title="Pontos" ' +
        ' class="form-control" type="number" name="question_' +
        idQuestion + '_points" min="1" ' +
        'max="10" value="1" placeholder="Pontos." required />' +
        '</div><div class="col-sm-1">' +
        '<button class="btn btn-default btn-sm" onclick="dropQuestion(' +
        idQuestion + ')" type="button" data-toggle="tooltip" data-placement="top" ' +
        'title="Descartar"><span class="glyphicon glyphicon-trash">' +
        '</span></button></div><script>$(\'[data-toggle="tooltip"]\').tooltip()</script>';
};

/**
 * Adicionar novo item a esta questao
 */
function addItemQuestion() {
    if (countItems < NUM_LIMIT_ITEMS) {
        // Indicar novo item criado
        countItems++;
        var idLocal = '#item_' + items[countItems] + '_qst_' + idQuestion;
        // conteudo atual
        var content = $(idLocal).html();
        // HTML do item
        var itemHtml = '<span class="input-group-addon">' + items[countItems] + '</span>' +
            '<span class="input-group-addon">' +
            '<input name="item_' + items[countItems] + '_response_qst_' +
            idQuestion + '" type="checkbox" aria-label="..." required ' +
            ' data-toggle="tooltip" data-placement="top" title="Resposta?" style="cursor:pointer" /></span>' +
            '<input name="item_' + items[countItems] + '_description_qst_' +
            idQuestion + '" type="text" class="form-control" aria-label="..." ' +
            ' placeholder="Descreva o enunciado do item" required />' +
            '<script>$(\'[data-toggle="tooltip"]\').tooltip()</script>';
        $(idLocal).html(content + itemHtml);
    }
}

/**
 * Adiciona nova questão a tarefa
 */
function createNewQuestion() {
    if (countQuestions < NUM_LIMIT_QUESTIONS) {
        // Define novo identificador
        idQuestion++;
        // id html da div que receberá o conteúdo da questão
        var contentQuestionsId = "#question_" + idQuestion;
        // adiciona classe de formulário padrão do bootstrap
        var elementQuestion = document.getElementById("question_" + idQuestion);
        if (elementQuestion != null) {
            elementQuestion.className = "form-group quest-group";
        }
        delete (elementQuestion);
        // indicar que mais uma questão acaba de ser criada
        countQuestions++;
        // setar conteudo
        $(contentQuestionsId).html(addQuestObjective()).addClass('animated fadeInDown');
    } else {
        bootbox.alert('Limite de questões foi atingido.');
    }
}

/**
 * Excluir questao do formulario de criação
 *
 * @param questionId
 */
function dropQuestion(questionId) {
    bootbox.confirm("Deseja realmente excluir esta questão?", function (result) {
        if (result) {
            var idHtml = "#question_" + questionId;
            // oculta a div
            $(idHtml).removeClass('animated fadeInDown')
                .addClass('animated fadeOutUp');
            setTimeout(function () {
                $(idHtml).html("");
                updateLabelsQuestions();
                $(idHtml).slideUp();//.hide();
            }, 1000);
            countQuestions--;// indicar que uma questão acaba de ser removida
        }
    });
}

/**
 * @function updateLabelsQuestions - Atualiza nome de descrição para a ordem correta
 */
function updateLabelsQuestions() {
    var cont = 0;
    for (var i = 1; i <= NUM_LIMIT_QUESTIONS; i++) {
        if (document.getElementById('label_question_' + i) != null) {
            cont++;
            document.getElementById('label_question_' + i).innerHTML = "Questão " + cont;
        }
    }
}

/**
 * Formatar dados recebidos de Alunos relacionados a este professor
 *
 * @param data
 */
function formatTableStudents(data) {
    data = setValuesToDebug(data, 'testGetStudents');
    if (data[0] != undefined) {
        // Recebe quantidade de linhas a serem exibidas na tabela
        var qtd = 20;
        var dataHtml = '';
        // Recebe o Número do índice limite para identificação de elementos a serem exibidos
        var limit = qtd -1;
        // repassar valores do Array
        mainArray = data;
        for (var i = 0; (data[i] != undefined); i++) {
            if (i <= limit) {
                dataHtml += '<tr><td>' + data[i]['id'] + '</td>' +
                    '<td>' + data[i]['team'] + '</td>' +
                    '<td>' + data[i]['name'] + '</td>' +
                    '<td>' + data[i]['email'] + '</td></tr>';
            } else {
                break;
            }
        }
        $('#tbody_students').html(dataHtml);
        // setar paginaçao desta tabela
        formatPaginationPanel('#div-pagination-panel-tch-stds', qtd, 1, 'pgPnTchTbStds');
    }
}

/**
 * Buscar Alunos relacionados a este professor
 */
function getStudents() {
    $.ajax({
        url: urlAjaxRequest['getStudents'],
        type: "POST",
        dataType: "json",
        success: function (data) {
            formatTableStudents(data);
        },
        error: function (data) {
            formatTableStudents(data);
        }
    });
}

/**
 * Retorna Turmas do professor
 *
 * @param handleData
 */
function getTeams(handleData) {
    $.ajax({
        url: urlAjaxRequest['getTeams'],
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data[0] != undefined) {
                handleData(setValuesToDebug(data, 'testGetTeams'))
            } else {
                handleData(setValuesToDebug([], 'testGetTeams'))
            }
        },
        error: function (data) {
            handleData(setValuesToDebug(data, 'testGetTeams'));
        }
    });
}

/**
 * Listar em Select opções de turmas disponíveis para este professor
 *
 * Obs: Componente presente no painel de criação de tarefas
 */
function setSelectToCreateTask() {
    getTeams(function (data) {
        // options HTML
        var dataOptionsHtml = '<option value="0">Selecione a turma...</option>';
        for (var i=0; data[i] != undefined; i++) {
            dataOptionsHtml += '<option value="'+ data[i]['id'] +'">'+ data[i]['description'] +'</option>';
        }
        $('#panel-create-task-select-team').html(dataOptionsHtml);
    });
}