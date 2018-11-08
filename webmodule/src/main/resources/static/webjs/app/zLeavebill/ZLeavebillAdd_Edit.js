var zLeavebillAddEdit = (function () {
    $(function () {
        $('#zLeavebillForm').bootstrapValidator({
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
                            message: '编号不可为空！',
                        }
                    }
                },
                days: {
                    validators: {
                        notEmpty: {
                            message: '请假天数不可为空！',
                        }
                    }
                },
                content: {
                    validators: {
                        notEmpty: {
                            message: '请假类型不可为空！',
                        }
                    }
                },
                remark: {
                    validators: {
                        notEmpty: {
                            message: '请假内容不可为空！',
                        }
                    }
                },
                leaveStarttime: {
                    validators: {
                        notEmpty: {
                            message: '请假开始时间不可为空！',
                        }
                    }
                },
                state: {
                    validators: {
                        notEmpty: {
                            message: '状态不可为空！',
                        }
                    }
                },
                userId: {
                    validators: {
                        notEmpty: {
                            message: '请假人编号不可为空！',
                        }
                    }
                },
                userName: {
                    validators: {
                        notEmpty: {
                            message: '请假人姓名不可为空！',
                        }
                    }
                },
                userDept: {
                    validators: {
                        notEmpty: {
                            message: '所属单位不可为空！',
                        }
                    }
                },
                leaveEndtime: {
                    validators: {
                        notEmpty: {
                            message: '请假截止日期不可为空！',
                        }
                    }
                },
            }
        });
    });

    function toAdd() {
        document.getElementById('zLeavebillForm').reset();
        $(".modal-footer").html("");
        $(".modal-footer").append('<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="zLeavebillAddEdit.doAdd()">保存</button>');
        $('#zLeavebillAdd').modal('show');
    }

    function doAdd() {
        var bootstrapValidator = $("#zLeavebillForm").data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            $.post("/zLeavebill/doAdd", $("#zLeavebillForm").serialize(), function (data) {
                document.getElementById('zLeavebillForm').reset();
                if (data.code == 0) {
                    document.getElementById('zLeavebillForm').reset();
                    $('#zLeavebillAdd').modal('hide');
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
                    $("#ZLeavebilltable").bootstrapTable('refresh');
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
            url: "/zLeavebill/toEdit",
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
        $("#days").val(u.days);
        $("#content").val(u.content);
        $("#remark").val(u.remark);
        $("#leaveStarttime").val(u.leaveStarttime);
        $("#state").val(u.state);
        $("#userId").val(u.userId);
        $("#userName").val(u.userName);
        $("#userDept").val(u.userDept);
        $("#leaveEndtime").val(u.leaveEndtime);
        //显示模态框
        $(".modal-footer").html("");
        $(".modal-title").html("");
        if (data.flag == 'edit') {
            $(".modal-title").html("修改");
            $(".modal-footer").append('<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="zLeavebillAddEdit.doEdit()">确认修改</button>');
        } else if (data.flag == 'view') {
            $(".modal-title").html("查看");
        }
        $('#zLeavebillAdd').modal('show');
    }

    function doEdit() {
        var bootstrapValidator = $("#zLeavebillForm").data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            $.post("/zLeavebill/doEdit", $("#zLeavebillForm").serialize(), function (data) {
                document.getElementById('zLeavebillForm').reset();
                if (data.code == 0) {

                    $('#zLeavebillAdd').modal('hide');
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
                    $("#ZLeavebilltable").bootstrapTable('refresh');
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
                    $.post("/zLeavebill/doDel", {id: id}, function (data) {
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
                            $("#ZLeavebilltable").bootstrapTable('refresh');
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