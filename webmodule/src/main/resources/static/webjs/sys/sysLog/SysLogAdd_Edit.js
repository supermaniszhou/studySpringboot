var sysLogAddEdit = (function () {
    $(function () {
        $('#sysLogForm').bootstrapValidator({
//        live: 'disabled',
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {

                userId: {
                    validators: {
                        notEmpty: {
                            message: '账号名称不可以为空！',
                        }
                    }
                },
                userName: {
                    validators: {
                        notEmpty: {
                            message: '账号名称不可以为空！',
                        },
                        // regexp: {
                        //     regexp: /^[a-zA-Z]+$/,
                        //     message: '账户名必须为字母'
                        // },
                        // callback: {
                        //     message: 'Wrong answer',
                        //     callback: function(value, validator) {
                        //         var sum='a';
                        //         return value == sum;
                        //     }
                        // }
                    }
                },
                userIp: {
                    validators: {
                        notEmpty: {
                            message: '账号名称不可以为空！',
                        }
                    }
                },
                userMac: {
                    validators: {
                        notEmpty: {
                            message: '账号名称不可以为空！',

                        }
                    }
                },
                oporateComment: {
                    validators: {
                        notEmpty: {
                            message: '账号名称不可以为空！',

                        }
                    }
                },
                // oporateTime: {
                //     validators: {
                //         notEmpty: {
                //             message: '账号名称不可以为空！',
                //
                //         }
                //     }
                // },
                opotateType: {
                    validators: {
                        notEmpty: {
                            message: '账号名称不可以为空！',

                        }
                    }
                },
            }
        });
    });

    function toAdd() {
        document.getElementById('sysLogForm').reset();
        $(".modal-footer").html("");
        $(".modal-footer").append('<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="sysLogAddEdit.doAdd()">保存</button>');
        $('#sysLogAdd').modal('show');
    }

    function doAdd() {
        var bootstrapValidator = $("#sysLogForm").data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            var d = {};
            var formData = $("#sysLogForm").serializeArray();
            $.each(formData, function (i, item) {
                d[item.name] = item.value;
            });
            $.post("/sysLog/doAdd", d, function (data) {
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
                            $("#SysLogtable").bootstrapTable('refresh');
                        }
                    });
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
            url: "/sysLog/toEdit",
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
        $("#userId").val(u.userId);
        $("#userName").val(u.userName);
        $("#userIp").val(u.userIp);
        $("#userMac").val(u.userMac);
        $("#oporateComment").val(u.oporateComment);
        $("#oporateTime").val(u.oporateTime);
        $("#opotateType").val(u.opotateType);
        //显示模态框
        $(".modal-footer").html("");
        $(".modal-title").html("");
        if (data.flag == 'edit') {
            $(".modal-title").html("修改");
            $(".modal-footer").append('<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="sysLogAddEdit.doEdit()">确认修改</button>');
        } else if (data.flag == 'view') {
            $(".modal-title").html("查看");
        }
        $('#sysLogAdd').modal('show');
    }

    function doEdit() {
        var bootstrapValidator = $("#sysLogForm").data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            $.post("/sysLog/doEdit", $("#sysLogForm").serialize(), function (data) {
                document.getElementById('sysLogForm').reset();
                if (data.code == 0) {

                    $('#sysLogAdd').modal('hide');
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
                    $("#SysLogtable").bootstrapTable('refresh');
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
                    $.post("/sysLog/doDel", {id: id}, function (data) {
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
                            $("#SysLogtable").bootstrapTable('refresh');
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