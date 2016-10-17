/**
 * Created by Ricardo on 14/10/2016.
 */

$(document).ready(function () {

    var selectUser = $('#select-user-type');
    selectUser.change(function () {
        if (selectUser.val() != USER_TEACHER) {
            $('#info-user-type-teacher').slideUp();
        } else {
            $('#info-user-type-teacher').slideDown();
        }
    });

    // tratar campo de telefone
    $("#span-info-phone").mask("(999) 99999-9999").focus(function () {
        // informar "help-block"
        $('#span-info-phone').html(' ');
    }).blur(function () {
        checkPhone($(this).val(), function (data) {
            if (data['return'] != undefined) {
                if (data['return'] == true) {
                    // informar "help-block"
                    $('#span-info-phone').html(' ');
                    $('#form-group-phone').removeClass('has-error');
                } else {
                    // informar usuario via "help-block"
                    $('#span-info-phone').html(data['message']);
                    $('#form-group-phone').addClass('has-error');
                }
            }
        });
    });

    // tratar campo de email
    $("#email").focus(function () {
        // informa
        $('#div-info-email').html(' ');
    }).blur(function () {
        checkEmail($(this).val(), function (data) {
            if (data['return'] != undefined) {
                if (data['return'] == true) {
                    // informa
                    $('#div-info-email').html(' ');
                    $('#form-group-email').removeClass('has-error');
                } else {
                    // informar usuário
                    $('#div-info-email').html(data['message']);
                    $('#form-group-email').addClass('has-error');
                }
            }
        });
    });

    // tratar campos de CPF
    $("#cpf").focus(function () {
        // informa
        $('#span-info-cpf').html(' ');
    }).blur(function () {
        checkCPF($(this).val(), function (data) {
            if (data['return'] != undefined) {
                if (data['return'] == true) {
                    // informa
                    $('#span-info-cpf').html(' ');
                    $('#form-user-register-div-cpf').removeClass('has-error');
                } else {
                    // informar usuário
                    $('#span-info-cpf').html(data['message']);
                    $('#form-user-register-div-cpf').addClass('has-error');
                }
            }
        });
    });


    // formulário para registro de usuários
    var formRegisterUser = '#form-register-user';
    $(formRegisterUser).submit(function (e) {
        waitingDialog.show('Aguarde...');
        var postData = $(this).serializeArray();
        $.ajax({
            url: urlFormActions['userRegister'],
            type: "POST",
            data: postData,
            dataType: "json",
            success: function (e) {
                waitingDialog.hide();
                if (e['return'] != undefined) {
                    if (e['return'] == true) {
                        $(formRegisterUser).resetForm();
                        bootbox.alert(e['message'], function () {
                            window.location.assign(BASE_URL);
                        })
                    } else {
                        bootbox.alert(e['message']);
                    }
                } else {
                    bootbox.alert(MSG_ALERT_ERROR);
                }
            },
            error: function () {
                waitingDialog.hide();
                bootbox.alert(MSG_ALERT_ERROR);
            }
        });
        e.preventDefault();
    });
    delete (formRegisterUser);

});