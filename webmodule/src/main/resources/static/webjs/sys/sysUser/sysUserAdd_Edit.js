var sysUserAdd = (function () {
    $(function () {
        sysUserFormValidator();
    });

    function sysUserFormValidator() {
        $('#sysUserForm').bootstrapValidator({
//        live: 'disabled',
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {

                // username: {
                //     container: '#usernameError',
                //     validators: {
                //         notEmpty: {
                //             message: '账户名不可为空！',
                //         },
                //         stringLength: {
                //             min: 6,
                //             max: 20,
                //             message: '长度为6~20个字符(字母或数字)'
                //         },
                //         regexp: {
                //             regexp: /^[a-zA-Z0-9_\.]+$/,
                //             message: '只能是字母或数字'
                //         }
                //     }
                // },
                // password: {
                //     container: '#passwordError',
                //     validators: {
                //         notEmpty: {
                //             message: '密码不可为空！',
                //         },
                //         stringLength: {
                //             min: 6,
                //             max: 20,
                //             message: '长度为6~20个字符(字母、数字、特殊字符)'
                //         },
                //         regexp: {
                //             regexp: /^[a-zA-Z0-9_\.]+[a-zA-Z0-9_\.~'!@#￥$%^&*()-+_=:``]*$/,
                //             message: '字母、数字、特殊字符'
                //         }
                //     }
                // },
                email: {
                    container: '#emailError',
                    validators: {
                        notEmpty: {
                            message: '邮箱不可为空！',
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: '邮箱地址不合法！'
                        }
                    }
                },
                address: {
                    container: '#addressError',
                    validators: {
                        notEmpty: {
                            message: '地址不可为空！',
                        }
                    }
                },
                phone: {
                    container: '#phoneError',
                    validators: {
                        notEmpty: {
                            message: '手机号码不可为空！',
                        },
                        digits: {
                            message: '值只能包含数字'
                        },
                        regexp: {
                            regexp: /^[1][3,4,5,7,8][0-9]{9}$/,
                            message: '手机号码不合法！'
                        }

                    }
                },
                age: {
                    container: '#ageError',
                    validators: {
                        notEmpty: {
                            message: '年龄不可为空！',
                        },
                        digits: {
                            message: '值只能包含数字'
                        },
                        lessThan: {
                            value: 100,
                            inclusive: true,
                            message: '年龄必须小于100岁。'
                        },
                        greaterThan: {
                            value: 10,
                            inclusive: false,
                            message: '年龄必须大于或等于10岁。'
                        }
                    }
                },
                sex: {
                    container: '#sexError',
                    validators: {
                        notEmpty: {
                            message: '性别不可为空！',
                        }
                    }
                },
                qq: {
                    container: '#qqError',
                    validators: {
                        notEmpty: {
                            message: 'QQ号不可为空！',
                        }
                    },
                    digits: {
                        message: '值只能包含数字'
                    },
                },
                weixin: {
                    container: '#weixinError',
                    validators: {
                        notEmpty: {
                            message: '微信号不可为空！',
                        }
                    }
                },
                useridenty: {
                    container: '#useridentyError',
                    validators: {
                        notEmpty: {
                            message: '身份证号不可为空！',
                        },
                        regexp: {
                            regexp: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                            message: '身份证号不合法'
                        }

                    }
                },

                meno: {
                    container: '#menoError',
                    validators: {
                        notEmpty: {
                            message: '描述不可为空！',
                        }
                    }
                },
                userBirthday: {
                    container: '#userBirthdayError',
                    validators: {
                        notEmpty: {
                            message: '出生日期不可为空！',
                        }
                    }
                },
                userHeight: {
                    container: '#userHeightError',
                    validators: {
                        regexp: {
                            regexp: /^[1-9]{1}[0-9]{1,2}$/,
                            message: '值只能包含数字,并且不能大于300',
                        }
                    }
                },

            }
        });
    }


    function doAddUser() {
        var bootstrapValidator = $("#sysUserForm").data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            $.post("/user/doAddSysUser", $("#sysUserForm").serialize(), function (data) {
                if (data.code == 0) {
                    document.getElementById('sysUserForm').reset();
                    $("#sysUserForm").data('bootstrapValidator').destroy();
                    sysUserFormValidator();//初始化验证
                    ToastrMessage.successMessage(data.msg, "1000", "toast-top-center");

                    // $("#table2").bootstrapTable('refresh');
                } else {
                    ToastrMessage.errorMessage(data.msg, "2000", "toast-top-center");
                    /*BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: '错误 ',
                        message: data.msg,
                        size: BootstrapDialog.SIZE_SMALL,//size为小，默认的对话框比较宽
                        onshown: function (dialogRef) {
                            setTimeout(function () {
                                dialogRef.close();
                            }, 1000);
                        }
                    });*/
                }

            });
        }
    }

    function toUpdate(id, flag) {
        $.ajax({
            url: "/user/toEdit",
            async: true,
            type: "POST",
            data: {
                id: id,
                flag: flag
            },
            // 成功后开启模态框
            success: showEdit,
            error: function () {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: '错误 ',
                    message: "请求出错",
                    size: BootstrapDialog.SIZE_SMALL,//size为小，默认的对话框比较宽
                    onshown: function (dialogRef) {
                        setTimeout(function () {
                            dialogRef.close();
                        }, 1000);
                    }
                });
            },
            dataType: "json"
        });
    }

    function showEdit(data) {
        var u = data.data;
        $("#id").val(u.id);
        $("#username").val(u.username);
        $("#realname").val(u.realname);
        $("#password").val(u.password);
        $("#email").val(u.email);
        $("#phone").val(u.phone);
        $("#useridenty").val(u.useridenty);
        $("#birthday").val(u.birthday);
        $("#age").val(u.age);
        $(":radio[name='sex'][value='" + u.sex + "']").prop("checked", "true");
        $("#address").val(u.address);
        $("#meno").val(u.meno);
        //显示模态框
        $(".modal-footer").html("");
        $(".modal-title").html("");
        if (data.flag == 'edit') {
            $(".modal-title").html("修改");
            $(".modal-footer").append('<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="sysUserAdd.doEdit()">确认修改</button>');
        } else if (data.flag == 'view') {
            $(".modal-title").html("查看");
        }
        $('#sysUserAdd').modal('show');
    }

    function doEdit() {
        var bootstrapValidator = $("#sysUserForm").data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            $.post("/user/doEdit", $("#sysUserForm").serialize(), function (data) {
                document.getElementById('sysUserForm').reset();
                if (data.code == 0) {

                    $('#sysUserAdd').modal('hide');
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        title: '成功 ',
                        message: data.msg,
                        size: BootstrapDialog.SIZE_SMALL,//size为小，默认的对话框比较宽
                        onshown: function (dialogRef) {
                            setTimeout(function () {
                                dialogRef.close();
                            }, 1000);
                        }
                    });
                    $("#table2").bootstrapTable('refresh');
                } else {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: '错误 ',
                        message: data.msg,
                        size: BootstrapDialog.SIZE_SMALL,//size为小，默认的对话框比较宽
                        onshown: function (dialogRef) {
                            setTimeout(function () {
                                dialogRef.close();
                            }, 1000);
                        }
                    });
                }

            });
        }
    }

    function doDel(id) {
        BootstrapDialog.show({
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_DANGER,
            message: '你确认删除吗？',
            buttons: [{
                label: '确认删除',
                cssClass: 'btn-primary',
                data: {
                    js: 'btn-confirm',
                    'user-id': '3'
                },
                action: function (dialogItself) {
                    $.post("/user/doDel", {id: id}, function (data) {
                        dialogItself.close();
                        if (data.code == 0) {
                            BootstrapDialog.show({
                                type: BootstrapDialog.TYPE_SUCCESS,
                                title: '成功 ',
                                message: data.msg,
                                size: BootstrapDialog.SIZE_SMALL,//size为小，默认的对话框比较宽
                                onshown: function (dialogRef) {
                                    setTimeout(function () {
                                        dialogRef.close();
                                    }, 1000);
                                }
                            });
                            $("#table2").bootstrapTable('refresh');
                        } else {
                            BootstrapDialog.show({
                                type: BootstrapDialog.TYPE_DANGER,
                                title: '错误 ',
                                message: data.msg,
                                size: BootstrapDialog.SIZE_SMALL,//size为小，默认的对话框比较宽
                                onshown: function (dialogRef) {
                                    setTimeout(function () {
                                        dialogRef.close();
                                    }, 1000);
                                }
                            });
                        }
                    });
                }
            }, {
                label: '取消',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }]
        });
    }

    return {
        doAddUser: doAddUser,
        toUpdate: toUpdate,
        doEdit: doEdit,
        doDel: doDel
    };
})();