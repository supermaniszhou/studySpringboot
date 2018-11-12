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
                id: {
                    container: '#idError',
                    validators: {
                        notEmpty: {
                            message: '不可为空！',
                        }
                    }
                },
                username: {
                    container: '#usernameError',
                    validators: {
                        notEmpty: {
                            message: '姓名不可为空！',
                        }
                    }
                },
                password: {
                    container: '#passwordError',
                    validators: {
                        notEmpty: {
                            message: '密码不可为空！',
                        }
                    }
                },
                email: {
                    container: '#emailError',
                    validators: {
                        notEmpty: {
                            message: '邮箱不可为空！',
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
                            message: '联系方式不可为空！',
                        }
                    }
                },
                age: {
                    container: '#ageError',
                    validators: {
                        notEmpty: {
                            message: '年龄不可为空！',
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
                    }
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
                        }
                    }
                },
                isdel: {
                    container: '#isdelError',
                    validators: {
                        notEmpty: {
                            message: '是否删除：0未删除，1：已删除不可为空！',
                        }
                    }
                },
                isdisable: {
                    container: '#isdisableError',
                    validators: {
                        notEmpty: {
                            message: '是否启用：0不启用，1：启用不可为空！',
                        }
                    }
                },
                createtime: {
                    container: '#createtimeError',
                    validators: {
                        notEmpty: {
                            message: '创建时间不可为空！',
                        }
                    }
                },
                updatetime: {
                    container: '#updatetimeError',
                    validators: {
                        notEmpty: {
                            message: '修改时间不可为空！',
                        }
                    }
                },
                loginstatus: {
                    container: '#loginstatusError',
                    validators: {
                        notEmpty: {
                            message: '登录状态不可为空！',
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
                realname: {
                    container: '#realnameError',
                    validators: {
                        notEmpty: {
                            message: '真实姓名不可为空！',
                        }
                    }
                },
                userOrg: {
                    container: '#userOrgError',
                    validators: {
                        notEmpty: {
                            message: '所属机构不可为空！',
                        }
                    }
                },
                userHeight: {
                    container: '#userHeightError',
                    validators: {
                        notEmpty: {
                            message: '身高不可为空！',
                        }
                    }
                },
                picPath: {
                    container: '#picPathError',
                    validators: {
                        notEmpty: {
                            message: '头像路径不可为空！',
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
            $.post("/user/doAdd", $("#sysUserForm").serialize(), function (data) {
                if (data.code == 0) {
                    document.getElementById('sysUserForm').reset();
                    $("#sysUserForm").data('bootstrapValidator').destroy();
                    sysUserFormValidator();//初始化验证
                    ToastrMessage.successMessage(data.msg, "1000", "toast-top-center");
                    // $('#sysUserAdd').modal('hide');
                    // BootstrapDialog.show({
                    //     type: BootstrapDialog.TYPE_SUCCESS,
                    //     title: '成功 ',
                    //     message: data.msg,
                    //     size: BootstrapDialog.SIZE_SMALL,//size为小，默认的对话框比较宽
                    //     onshown: function (dialogRef) {
                    //         setTimeout(function () {
                    //             dialogRef.close();
                    //         }, 1000);
                    //     }
                    // });
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
        if(data.flag=='edit'){
            $(".modal-title").html("修改");
            $(".modal-footer").append('<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="sysUserAdd.doEdit()">确认修改</button>');
        }else if(data.flag=='view'){
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