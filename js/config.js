/**
 * Created by Ricardo on 12/10/2016.
 */


/** Url padrão */
// const BASE_URL = 'http://' + location.host + '/';
const BASE_URL = 'http://localhost/';
// todo - definir url base de validações;
// todo Ex: http://localhost/nome-servico/nome-recurso
// todo Ex: http://localhost/validation/cpf -> se é um numero de cpf válido...
// todo Ex: http://localhost/validation/email -> se email a ser cadastrado nao existe no sistema...
const BASE_URL_VALIDATION = BASE_URL + 'validation/';


// Requisições definidas em modo POST

// todo - definir urls de validações
urlFormValidations = {
    'cpf' : BASE_URL_VALIDATION + 'cpf',// validação de número de cpf
    'email' : BASE_URL_VALIDATION + 'email',// Verifica se email NÃO existe no sistema
    'phone' : BASE_URL_VALIDATION + 'phone',// Verifica se número de telefone NÃO existe no sistema
    'createTask' : BASE_URL_VALIDATION + 'create-task',// Verifica se professor em questão possui no mínimo uma "turma", ...dado necessário para criaçao de tarefas
}

// todo - definir urls recebimmento de dados de formulários
urlFormActions = {
    'userRegister' : BASE_URL + 'user/register',// Registro de usuários
    'passRedefinition' : BASE_URL + 'user/re-password',// Redefinição de senha do usuário
}

// todo - definir urls de requerimentos "implícitos"
urlAjaxRequest = {
    'listTasks' : BASE_URL + 'teacher/listTasks',// Listar todas as tarefas atuais do professor
    'getTask' : BASE_URL + 'teacher/getTask',// Buscar tarefa via id desta
    'getStudents' : BASE_URL + 'teacher/getStudents',// Buscar Alunos
}


/** Dados de usuários */
const
    USER_STUDENT = '2',
    USER_TEACHER = '3';

/** Estados de usuários */
const
    STATUS_INACTIVE = '0',
    STATUS_ACTIVE = '1';

const MSG_ALERT_ERROR = 'Erro ao tentar executar processo.';


/**
 *  Recebe ID HTML de formulário manipulado.
 *
 * @type {string}
 */
var formCurrent = '';


/** Recebe valores de Arrays para formação de tabelas em Paineis de usuários. */
var mainArray = [];


/** @var message - Mensagens de interação */
var message = MSG_ALERT_ERROR; // mensagem pradrão de retorno


$(document).ready(function () {
    // mácara para telefones e telefones celulares
    $(".phones").mask("(999) 9999-9999");
    $(".cels").mask("(999) 99999-9999");
    // máscara para CPF's
    $(".cpf").mask("999.999.999-99");
});


// Definições para panel de criação de tarefas
// Define o número limite de questões que podem ser criadas em uma tarefa
const NUM_LIMIT_QUESTIONS = 10;
// Define o número limite de items que podem ser criadas em uma tarefa
const NUM_LIMIT_ITEMS = 5;// todo - Se exceder 5, configure a letra abaixo
// Letras para exibição correspondentes aos valores de itens
var items = { 1 : 'A', 2 : 'B', 3 : 'C', 4 : 'D', 5 : 'E' };


// Sistema básico de Debug
// todo - Esta variável deve ser setada com TRUE se você desejar receber dados de exemplos em requisições
systemDebugRequest = true;
function setValuesToDebug(defaultValue, keyValueTest) {
    if (systemDebugRequest) {
        var data = {
            // dados básicos para apresentação da lista de tarefas do painel de professores
            'testListTasks' : [
                {
                    "id" : 1 ,
                    "summary" : "Tarefa de Matemática definida em: 14-10-2016 15:03 - Data prevista para encerramento: 15-10-2016 10:00",
                    "finished" : true
                },
                {
                    "id" : 2 ,
                    "summary" : "Tarefa de POO definida em: 14-10-2016 17:35 - Data prevista para encerramento: 20-10-2016 17:00",
                    "finished" : false
                }
            ],
            // buscar dados da tarefa via ID desta
            'testGetTask' : {
                "questions" : [
                    // Primeira questão de um questionario
                    {
                        "number" : 1,
                        "points" : 2,
                        "description" : "Este é o enunciado da quesão de número X do questionário blabla," +
                        " marque a alternativa correta para os itens seguintes",
                        "items" : [
                            {
                                "letter" : "A",
                                "description" : "Item A é a resposta da questão X, este é o enunciado do item AAA",
                                "response" : false
                            },
                            {
                                "letter" : "B",
                                "description" : "Item B é a resposta da questão X, este é o enunciado do item BBB",
                                "response" : true
                            },
                            {
                                "letter" : "C",
                                "description" : "Item C é a resposta da questão X, este é o enunciado do item CCC",
                                "response" : false
                            },
                        ]
                    },
                    // Segunda questão de um questionario
                    {
                        "number" : 2,
                        "points" : 5,
                        "description" : "Este é o enunciado da quesão de número X do questionário blabla," +
                        " marque a alternativa correta para os itens seguintes",
                        "items" : [
                            {
                                "letter" : "A",
                                "description" : "Item A é a resposta da questão X, este é o enunciado do item AAA",
                                "response" : false
                            },
                            {
                                "letter" : "B",
                                "description" : "Item B é a resposta da questão X, este é o enunciado do item BBB",
                                "response" : false
                            },
                            {
                                "letter" : "C",
                                "description" : "Item C é a resposta da questão X, este é o enunciado do item CCC",
                                "response" : true
                            },
                        ]
                    }
                ],
                "references" : "Salve o poderoso Timão o Campeão dos Campeões. Segue link para o sucesso... http://timao.com.br"
            },
            // buscar estudantes relacionados a este professor
            'testGetStudents' : [
                {
                    "id" : 1,
                    "team" : "Turma de POO",
                    "name" : "João Teste",
                    "email" : "joao.teste@mail.com"
                },
                {
                    "id" : 3,
                    "team" : "Turma de Matemática",
                    "name" : "Ana Maria Aluna",
                    "email" : "ana.maria@mail.com"
                },
                {
                    "id" : 15,
                    "team" : "Turma de DS2",
                    "name" : "Kaio Teste",
                    "email" : "kaio@mail.com"
                },
            ]
        };
        console.log('Formato de dados necessário:');
        console.log(data[keyValueTest]);
        return data[keyValueTest];
    }
    return defaultValue;
}