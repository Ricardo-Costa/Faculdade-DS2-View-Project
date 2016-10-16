/**
 * Created by Ricardo on 12/10/2016.
 */


/**
 * Define URL base do sistema
 *
 * @type {string}
 */
const BASE_URL = 'http://localhost/';// todo -> http://' + location.host + '/'

/**
 * Define URL base para validações
 *
 * Ex: http://localhost/validation/cpf
 *
 * @type {string}
 */
const BASE_URL_VALIDATION = BASE_URL + 'validation/';


/**
 * Configura URL's de Validações
 *
 * @type {{validationCPF: string, validationEmail: string, validationPhone: string, validationCreateTask: string}}
 */
urlFormValidations = {
    // Validação de número de cpf
    // Obs: Dado submetido em POST, nome da variavel: "cpf"
    // Obs2: Deve verificar se numero de cpf é válido
    'validationCPF'         : BASE_URL_VALIDATION + 'cpf',

    // Verifica se email NÃO existe no sistema
    'validationEmail'       : BASE_URL_VALIDATION + 'email',

    // Verifica se número de telefone NÃO existe no sistema
    'validationPhone'       : BASE_URL_VALIDATION + 'phone',

    // Verifica se professor possui os requisitos mínimos para criação de uma Tarefa
    // Obs: Professor precisa ter no mínimo uma turma definida, e 1/n Alunos relacionados a esta.
    'validationCreateTask'  : BASE_URL_VALIDATION + 'create-task',

}


/**
 * Configura URL's para recebimento de dados de formulários
 *
 * @type {{formRegisterUser: string, formResendPassword: string}}
 */
urlFormActions = {

    // Registro de usuários
    // Obs: Dados submetidos com POST
    'formRegisterUser'  : BASE_URL + 'user/register',

    // Reenvio de senha para email do usuário
    'formResendPassword': BASE_URL + 'user/resend-password',

}


/**
 * Configura URL's para requisições "implícitas" realizadas pelo próprio sistema
 *
 * @type {{getTasks: string, getTask: string, getStudents: string, getTeams: string}}
 */
urlAjaxRequest = {

    // Listar todas as tarefas atuais do professor
    'getTasks'      : BASE_URL + 'teacher/list-tasks',

    // Buscar todos os dados da Tarefa criada pelo professor
    // Obs: esta requisição envia em POST a variável "task_id"
    'getTask'       : BASE_URL + 'teacher/task',

    // Buscar Alunos relacionados ao professor
    'getStudents'   : BASE_URL + 'teacher/list-students',

    // Buscar todas as turmas definidas pelo professor
    'getTeams'      : BASE_URL + 'teacher/list-teams',

}


/**
 * Deve ser configurado o Tipo/Perfil dos usuários.
 *
 * Obs: Apenas os que são diferentes de Administrador.
 *
 * @type {string}
 */
const
    USER_STUDENT = '2',
    USER_TEACHER = '3';

/**
 * Definição de mensagens de errors do sistema
 *
 * @type {string}
 */
const
    MSG_ALERT_ERROR = 'Erro ao tentar executar processo.';


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
            'testGetTasks' : [
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
            ],
            // Buscar todas as turmas deste professor
            'testGetTeams' : [
                {
                    "id" : 1, "description" : "Turma de POO", "teacher" : 1
                },
                {
                    "id" : 2, "description" : "Turma de Matemática", "teacher" : 1
                },
            ]
        };
        console.log('Formato de dados necessário:');
        console.log(data[keyValueTest]);
        return data[keyValueTest];
    }
    return defaultValue;
}