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

// todo - definir urls de validações
urlFormValidations = {
    'cpf' : BASE_URL_VALIDATION + 'cpf',// validação de número de cpf
    'email' : BASE_URL_VALIDATION + 'email',// Verifica se email NÃO existe no sistema
    'phone' : BASE_URL_VALIDATION + 'phone',// Verifica se número de telefone NÃO existe no sistema
}
// todo - definir urls recebimmento de dados de formulários
urlFormActions = {
    'userRegister' : BASE_URL + 'user/register',// Registro de usuários
    'passRedefinition' : BASE_URL + 'user/re-password',// Redefinição de senha do usuário
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
    // mácara para CPF's
    $(".cpf").mask("999.999.999-99");
});