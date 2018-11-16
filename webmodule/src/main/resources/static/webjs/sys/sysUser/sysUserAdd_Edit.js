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
            $.ajaxSettings.async = false;
            $.post("/user/doAddSysUser", $("#sysUserForm").serialize(), function (data) {
                if (data.code == 0) {
                    document.getElementById('sysUserForm').reset();
                    $("#sysUserForm").data('bootstrapValidator').destroy();
                    sysUserFormValidator();//初始化验证
                    ToastrMessage.successMessage(data.msg, "1000", "toast-top-center");
                    $("#flagInput").val("success");
                    // $("#table2").bootstrapTable('refresh');
                } else {
                    ToastrMessage.errorMessage(data.msg, "2000", "toast-top-center");
                    $("#flagInput").val("error");
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
            $.ajaxSettings.async = true;
        }
    }

    function doEditSysUser() {
        var bootstrapValidator = $("#sysUserForm").data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            $.ajaxSettings.async = false;
            $.post("/user/doEditSysUser", $("#sysUserForm").serialize(), function (data) {
                if (data.code == 0) {
                    document.getElementById('sysUserForm').reset();
                    $("#sysUserForm").data('bootstrapValidator').destroy();
                    sysUserFormValidator();//初始化验证
                    ToastrMessage.successMessage(data.msg, "1000", "toast-top-center");
                    $("#flagInput").val("success");
                } else {
                    ToastrMessage.errorMessage(data.msg, "2000", "toast-top-center");
                    $("#flagInput").val("error");
                }

            });
            $.ajaxSettings.async = true;
        }
    }


    return {
        doAddUser: doAddUser,
        doEditSysUser: doEditSysUser,

    };
})();