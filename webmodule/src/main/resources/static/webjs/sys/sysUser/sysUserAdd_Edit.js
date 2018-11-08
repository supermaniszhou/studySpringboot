var sysUserAdd = (function () {
    $(function () {
        $('#sysUserForm').bootstrapValidator({
//        live: 'disabled',
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                username: {
                    message: 'The username is not valid',
                    validators: {
                        notEmpty: {
                            message: '账号名称不可以为空！',
                            callback: function (value, validator) {
                                flag = false;
                            }
                        },
                        stringLength: {
                            min: 3,
                            max: 30,
                            message: '账号长度3-30字符！'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: '账号只能是字母和数字！'
                        },
                        different: {
                            field: 'password',
                            message: 'The username and password cannot be the same as each other'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '密码不可以为空'
                        },
                        identical: {
                            field: 'confirmPassword',
                            message: '密码和确认密码不一致'
                        },
                        different: {
                            field: 'username',
                            message: '密码不可以为账号'
                        }
                    }
                },
                email: {
                    validators: {
                        emailAddress: {
                            message: 'The input is not a valid email address'
                        }
                    }
                },
                confirmPassword: {
                    validators: {
                        notEmpty: {
                            message: '确认密码不可以为空'
                        },
                        identical: {
                            field: 'password',
                            message: '确认密码不正确'
                        },
                        different: {
                            field: 'username',
                            message: '确认密码不可以为账号名'
                        }
                    }
                }
            }
        });
    });

    function toAdd() {
        document.getElementById('sysUserForm').reset();
        $(".modal-footer").html("");
        $(".modal-footer").append('<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="sysUserAdd.doAdd()">保存</button>');
        $('#sysUserAdd').modal('show');
    }

    function doAdd() {
        var bootstrapValidator = $("#sysUserForm").data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            $.post("/user/doAdd", $("#sysUserForm").serialize(), function (data) {
                document.getElementById('sysUserForm').reset();
                if (data.code == 0) {
                    document.getElementById('sysUserForm').reset();
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
        toAdd: toAdd,
        doAdd: doAdd,
        toUpdate: toUpdate,
        doEdit: doEdit,
        doDel: doDel
    };
})();