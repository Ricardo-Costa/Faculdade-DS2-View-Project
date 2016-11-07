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
 * Define URL base da página onde o Aluno irá responder a Tarefa em questão
 *
 * Ex: http://localhost/student?responds_task={id-task}
 *
 * ...ou url amigavel:
 *
 * Ex: http://localhost/student/responds-task/{id-task}
 *
 * @type {string}
 */
const BASE_URL_STUDENT_RESPONDS_TASK = BASE_URL + 'student?responds_task=';


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
    'validationCreateTask'  : BASE_URL_VALIDATION + 'create-task'

}


/**
 * Configura URL's para recebimento de dados de formulários
 *
 * @type {{
 * formRegisterUser: string, formRequestRePassword: string, formDefinePassword: string,
 * formDefineTeam: string, formCreateTask: string, formUpdateTask: string
 * }}
 */
urlFormActions = {

    // [ Página externa ] - Registro de usuários
    // Obs: Dados submetidos com POST
    'formRegisterUser'  : BASE_URL + 'user/register',

    // [ Página externa ] - Realizar solicitação de redefinição de nova senha
    // Obs: Dados submetidos com POST
    'formRequestRePassword': BASE_URL + 'user/request-re-password',

    // [ Página externa ] - Realizar definição de nova senha do usuário
    // Obs: Dados submetidos com POST
    'formDefinePassword': BASE_URL + 'user/define-password',

    // [ Painel de Definição de Turmas ] - Definição de novas turmas
    'formDefineTeam': BASE_URL + 'teacher/define-team',

    // [ Painel de Criação de Tarefas ] - Criar nova Tarefas
    'formCreateTask': BASE_URL + 'teacher/create-task',

    // [ Painel de Edição de Tarefas ] - Professor atualiza dados da Tarefas
    'formUpdateTask': BASE_URL + 'teacher/create-task',

    // [ Painel de Conclusão/Resolução de Tarefas ] - Aluno responde tarefa
    'formStudentEndingTask': BASE_URL + 'student/ending-task',

    // [ Painel de Adm/Cadastro de Adm Users ] - Resgistrar novo Admin.
    'formRegisterAdm': BASE_URL + 'administrator/register',

    // [ Forum / Criação de Debates ] - Criar debate
    'formForumCreateDiscussion': BASE_URL + 'forum/create-discussion',

    // [ Forum / Debate ] - Adicionar comentario ao debate
    'formForumAddComment': BASE_URL + 'forum/add-comment'

}


/**
 * Configura URL's para requisições "implícitas" realizadas pelo próprio sistema
 *
 * @type {{
 * getTasks: string, getTask: string, getStudents: string, getTeams: string,
 * studentGetTeams: string, studentGetFinishedTasks: string, studentGetPendingTasks: string,
 * studentGetDataTask: string
 * }}
 */
urlAjaxRequest = {


    // ########## Requisições do painel de professores ###################################

    // Listar todas as tarefas atuais do professor
    'getTasks'      : BASE_URL + 'teacher/list-tasks',

    // Buscar todos os dados da Tarefa criada pelo professor
    // Obs: esta requisição envia em POST a variável "task_id"
    'getTask'       : BASE_URL + 'teacher/task',

    // Buscar Alunos relacionados ao professor
    'getStudents'   : BASE_URL + 'teacher/list-students',

    // Buscar todas as turmas definidas pelo professor
    'getTeams'      : BASE_URL + 'teacher/list-teams',


    // ########### Requisições do painel de estudantes ####################################

    // Buscar todas as turmas que este aluno participa atualmente
    'studentGetTeams'           : BASE_URL + 'student/list-teams',

    // Buscar todas as tarefas "encerradas" para este aluno
    'studentGetFinishedTasks'   : BASE_URL + 'student/list-finished-tasks',

    // Buscar todas as tarefas "pendentes" para este aluno
    'studentGetPendingTasks'    : BASE_URL + 'student/list-pending-tasks',

    // Buscar dados da tarefa encerrada para o Aluno
    'studentGetTask'            : BASE_URL + 'student/task',


    // ########### Requisições do painel de administradores ################################

    // Buscar usuários do tipo estudante
    'admGetStudents'        : BASE_URL + 'adm/list-students',

    // Buscar usuários do tipo professor
    'admGetTeachers'        : BASE_URL + 'adm/list-teachers',

    // Buscar usuários do tipo administrador
    'admGetAdministrators'  : BASE_URL + 'adm/list-administrators',


    // ########### Requisições do Fórum  ####################################################

    // Buscar debates relacionados ao Aluno ou Professor logado atualmente
    // Obs.: Se este usuário é um ADM, este deve receber como resposta dessa requisição,
    // ...TODOS os debates correntes
    'forumGetRelatedDiscussions' : BASE_URL + 'forum/list-related-discussions',

    // Buscar todos os debates atuais do sistema
    // Obs.: LIMIT deve ser utilizado, pois esta página utiliza paginação
    'forumGetAllDiscussions'     : BASE_URL + 'forum/list-all-discussions'


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
 * Define o "estados" da conta do usuário no sistema.
 *
 * @type {number}
 */
const
    STATUS_INACTIVE = 0,// ...quando o usuário cria a conta, mas nao pode acessar ainda [professores]
    STATUS_ACTIVE   = 1,// ...quando o usuário está plenamente ativo na plataforma
    STATUS_BANNED   = -1 ;// ...quando o usuário está proibido de acessar o sistema


/**
 * Definição de mensagens de errors do sistema
 *
 * @type {string}
 */
const
    MSG_ALERT_ERROR = 'Erro ao tentar realizar processo.';


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
const NUM_LIMIT_ITEMS = 5;// todo - Se exceder 5, configure a letra abaixo de forma correspondente
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
                    "id" : 1, "description" : "Turma de POO", "teacher" : 1, "quantity_students" : 12
                },
                {
                    "id" : 2, "description" : "Turma de Matemática", "teacher" : 1, "quantity_students" : 45
                },
            ],
            // Buscar todas as turmas do Aluno
            'testStudentGetTeams' : [
                {
                    "id" : 723, "description" : "Turma de POO", "teacher" : "Carlos Silva"
                },
                {
                    "id" : 45, "description" : "Turma de Banco de Dados II", "teacher" : "Maria Teste"
                },
            ],
            // Buscar todas as tarefas finalizadas para este Aluno
            'testStudentGetPendingTasks' : [
                {
                    "id" : 4,
                    "summary" : "<b>Tarefa de POO I</b> definida em: 14-10-2016 15:03 - Data prevista para encerramento: 15-10-2016 10:00",
                },
                {
                    "id" : 6,
                    "summary" : "<b>Tarefa de POO III</b> definida em: 17-10-2016 15:03 - Data prevista para encerramento: 25-10-2016 15:00",
                },
            ],
            // Buscar todas as tarefas pendentes do Aluno
            'testStudentGetFinishedTasks' : [
                {
                    "id" : 1,
                    "summary" : "<b>Tarefa de Lógica Alg.</b> definida em: 17-10-2016 15:03 - encerrada em: 25-10-2016 15:00",
                },
                {
                    "id" : 2,
                    "summary" : "<b>Tarefa de POO I</b> definida em: 17-10-2016 15:03 - encerrada em: 25-10-2016 15:00",
                }
            ],
            // Aluno busca dados da tarefa via ID desta.
            'testStudentGetTask' : {
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

            'testAdmGetStudents' : [
                {
                    'id' : 13211,
                    'name' : 'Pedro ALuno Teste',
                    'cpf' : '311.234.554-94',
                    'email' : 'pedro.teste@mail.com',
                    'status' : 1
                },
                {
                    'id' : 2213,
                    'name' : 'Maria Aluna Teste',
                    'cpf' : '123.254.437-31',
                    'email' : 'maria@mail.com',
                    'status' : 1
                },
                {
                    'id' : 4245,
                    'name' : 'Carlos Aluno Teste',
                    'cpf' : '323.234.434-54',
                    'email' : 'carlos.aluno@mail.com',
                    'status' : -1
                },
            ],

            'testAdmGetTeachers' : [
                {
                    'id' : 11321,
                    'name' : 'Caio Prof Teste',
                    'cpf' : '311.234.554-94',
                    'email' : 'caio.prof@mail.com',
                    'status' : 1
                },
                {
                    'id' : 2321,
                    'name' : 'Renata Prof Teste',
                    'cpf' : '123.254.437-31',
                    'email' : 'renata@mail.com',
                    'status' : 0
                },
                {
                    'id' : 4215,
                    'name' : 'Max prof Teste',
                    'cpf' : '323.234.434-54',
                    'email' : 'max@mail.com',
                    'status' : -1
                },
            ],

            'testAdmGetAdministrators' : [
                {
                    'id' : 1421,
                    'name' : 'João Adm Teste',
                    'cpf' : '311.234.524-94',
                    'email' : 'joao.teste@mail.com',
                    'status' : 1
                },
                {
                    'id' : 231,
                    'name' : 'Carla Adm Teste',
                    'cpf' : '123.254.427-31',
                    'email' : 'carla@mail.com',
                    'status' : 1
                },
                {
                    'id' : 42315,
                    'name' : 'Bianca Adm Teste',
                    'cpf' : '323.234.424-54',
                    'email' : 'bianca.adm@mail.com',
                    'status' : 0
                },
            ],

            'testForumGetRelatedDiscussions' : [
                {
                    'id' : 1421,
                    'team' : 'POO III',
                    'title' : 'A relação entre a Class Thread e a interface Runnable.',
                    'likes' : 23,
                    'replies' : 12,
                    'date' : '07/08/2016',
                    'user' : {
                        'id' : 124,
                        'name' : 'Carlos Jr.'
                    }
                },
                {
                    'id' : 1421,
                    'team' : 'DB II',
                    'title' : 'Impáctos da utilização de Frameworks ORM.',
                    'likes' : 45,
                    'replies' : 15,
                    'date' : '17/07/2016',
                    'user' : {
                        'id' : 124,
                        'name' : 'Marcos Silva'
                    }
                },
                {
                    'id' : 1421,
                    'team' : 'Eng Sof I',
                    'title' : 'Qual a melhor ferramenta para gerenciamento de projetos?',
                    'likes' : 32,
                    'replies' : 6,
                    'date' : '22/06/2016',
                    'user' : {
                        'id' : 124,
                        'name' : 'Ana M.'
                    }
                },
                {
                    'id' : 1421,
                    'team' : 'ADS I',
                    'title' : 'A questão 1 desta tarefa não deveria ser anulada?',
                    'likes' : 4,
                    'replies' : 3,
                    'date' : '14/04/2016',
                    'user' : {
                        'id' : 124,
                        'name' : 'Pedro A.'
                    }
                }
            ]
        };
        //console.log('Formato de dados necessário:');
        //console.log(data[keyValueTest]);
        return data[keyValueTest];
    }
    return defaultValue;
}