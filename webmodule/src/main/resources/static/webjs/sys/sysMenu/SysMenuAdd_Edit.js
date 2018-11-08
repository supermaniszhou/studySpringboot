var sysMenuAddEdit = (function () {
    $(function () {
        $('#sysMenuForm').bootstrapValidator({
//        live: 'disabled',
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                id: {
                    validators: {
                        notEmpty: {
                            message: '账号名称不可以为空！',
                            callback: function (value, validator) {
                                flag = false;
                            }
                        }
                    }
                },
                menuName: {
                    validators: {
                        notEmpty: {
                            message: '账号名称不可以为空！',
                            callback: function (value, validator) {
                                flag = false;
                            }
                        }
                    }
                },
                menuLevel: {
                    validators: {
                        notEmpty: {
                            message: '账号名称不可以为空！',
                            callback: function (value, validator) {
                                flag = false;
                            }
                        }
                    }
                },
                menuParent: {
                    validators: {
                        notEmpty: {
                            message: '账号名称不可以为空！',
                            callback: function (value, validator) {
                                flag = false;
                            }
                        }
                    }
                },
                menuOrder: {
                    validators: {
                        notEmpty: {
                            message: '账号名称不可以为空！',
                            callback: function (value, validator) {
                                flag = false;
                            }
                        }
                    }
                },
                menuChild: {
                    validators: {
                        notEmpty: {
                            message: '账号名称不可以为空！',
                            callback: function (value, validator) {
                                flag = false;
                            }
                        }
                    }
                },
                memo: {
                    validators: {
                        notEmpty: {
                            message: '账号名称不可以为空！',
                            callback: function (value, validator) {
                                flag = false;
                            }
                        }
                    }
                },
                menuUrl: {
                    validators: {
                        notEmpty: {
                            message: '账号名称不可以为空！',
                            callback: function (value, validator) {
                                flag = false;
                            }
                        }
                    }
                },
            }
        });
    });

    function toAdd() {
        document.getElementById('sysMenuForm').reset();
        $(".modal-footer").html("");
        $(".modal-footer").append('<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="sysMenuAddEdit.doAdd()">保存</button>');
        $('#sysMenuAdd').modal('show');
    }

    function doAdd() {
        var bootstrapValidator = $("#sysMenuForm").data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            $.post("/sysMenu/doAdd", $("#sysMenuForm").serialize(), function (data) {
                document.getElementById('sysMenuForm').reset();
                if (data.code == 0) {
                    document.getElementById('sysMenuForm').reset();
                    $('#sysMenuAdd').modal('hide');
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
                    $("#SysMenutable").bootstrapTable('refresh');
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
            url: "/sysMenu/toEdit",
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
        $("#menuName").val(u.menuName);
        $("#menuLevel").val(u.menuLevel);
        $("#menuParent").val(u.menuParent);
        $("#menuOrder").val(u.menuOrder);
        $("#menuChild").val(u.menuChild);
        $("#memo").val(u.memo);
        $("#menuUrl").val(u.menuUrl);
        //显示模态框
        $(".modal-footer").html("");
        $(".modal-title").html("");
        if (data.flag == 'edit') {
            $(".modal-title").html("修改");
            $(".modal-footer").append('<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="sysMenuAddEdit.doEdit()">确认修改</button>');
        } else if (data.flag == 'view') {
            $(".modal-title").html("查看");
        }
        $('#sysMenuAdd').modal('show');
    }

    function doEdit() {
        var bootstrapValidator = $("#sysMenuForm").data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            $.post("/sysMenu/doEdit", $("#sysMenuForm").serialize(), function (data) {
                document.getElementById('sysMenuForm').reset();
                if (data.code == 0) {

                    $('#sysMenuAdd').modal('hide');
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
                    $("#SysMenutable").bootstrapTable('refresh');
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

                action: function (dialogItself) {
                    $.post("/sysMenu/doDel", {id: id}, function (data) {
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
                            $("#SysMenutable").bootstrapTable('refresh');
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