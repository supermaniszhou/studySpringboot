var sysMenuAddEdit = (function () {
    $(function () {
        formValidator();
    });

    function formValidator() {
        $('#sysMenuForm').bootstrapValidator({
            /**
             *  指定不验证的情况
             *  值可设置为以下三种类型：
             *  1、String  ':disabled, :hidden, :not(:visible)'
             *  2、Array  默认值  [':disabled', ':hidden', ':not(:visible)']
             *  3、带回调函数
             [':disabled', ':hidden', function($field, validator) {
            // $field 当前验证字段dom节点
            // validator 验证实例对象
            // 可以再次自定义不要验证的规则
            // 必须要return，return true or false;
                return !$field.is(':visible');
            }]
             */
            // excluded: [':disabled', ':hidden', ':not(:visible)'],

            /**
             * 生效规则（三选一）
             * enabled 字段值有变化就触发验证
             * disabled,submitted 当点击提交时验证并展示错误信息
             */
            // live: 'disabled',
            message: '不能为空！',
            /**
             * 指定验证后验证字段的提示字体图标。（默认是bootstrap风格）
             * Bootstrap 版本 >= 3.1.0
             * 也可以使用任何自定义风格，只要引入好相关的字体文件即可
             * 默认样式
             .form-horizontal .has-feedback .form-control-feedback {
            top: 0;
            right: 15px;
        }
             * 自定义该样式覆盖默认样式
             .form-horizontal .has-feedback .form-control-feedback {
            top: 0;
            right: -15px;
        }
             .form-horizontal .has-feedback .input-group .form-control-feedback {
            top: 0;
            right: -30px;
        }
             */
            feedbackIcons:
                {
                    valid: 'glyphicon glyphicon-ok',
                    invalid:
                        'glyphicon glyphicon-remove',
                    validating:
                        'glyphicon glyphicon-refresh'
                }
            ,
            fields: {

                menuName: {
                    validators: {
                        notEmpty: {
                            message: '菜单名称不可以为空！',
                        }
                    }
                }
                ,
                menuUrl: {
                    validators: {
                        notEmpty: {
                            message: '地址不可以为空！',
                        }
                    }
                }
                ,
            }
        });
    }


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
                if (data.code == 0) {
                    //清空表单 并清除表单验证
                    document.getElementById('sysMenuForm').reset();
                    $("#sysMenuForm").data('bootstrapValidator').destroy();

                    formValidator();
                    ToastrMessage.successMessage(data.msg, "1000", "toast-top-center");

                } else {
                    ToastrMessage.errorMessage(data.msg, "2000", "toast-top-center");

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

                    ToastrMessage.successMessage(data.msg, "1000", "toast-top-center");

                    // $("#SysMenutable").bootstrapTable('refresh');
                } else {
                    ToastrMessage.errorMessage(data.msg, "1000", "toast-top-center");

                }

            });
        }
    }


    return {
        toAdd: toAdd,
        doAdd: doAdd,
        toUpdate: toUpdate,
        doEdit: doEdit,
    };
})();