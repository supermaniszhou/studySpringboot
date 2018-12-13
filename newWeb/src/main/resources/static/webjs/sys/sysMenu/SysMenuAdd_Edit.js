var sysMenuAddEdit = (function () {
    $(function () {
        $(".bootstrap-dialog").removeAttr("tabindex");
        var h = ($(window).height() - 250);
        $(".form-horizontal").css({"height": h + "px"});

        $("#menuParent").select2();

        $.post("/sysMenu/getMenuList", {flag: "up"}, function (data) {
            $("#menuParent").select2ToTree({treeData: {dataArr: data}, maximumSelectionLength: 5});

        });


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
                    container: '#menuNameError',
                    validators: {
                        notEmpty: {
                            message: '菜单名称不可以为空！',
                        }
                    }
                }
                ,
                menuUrl: {
                    container: '#menuUrlError',
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
                    formValidator();//初始化验证

                    ToastrMessage.successMessage(data.msg, "1000", "toast-top-center");

                } else {
                    ToastrMessage.errorMessage(data.msg, "2000", "toast-top-center");

                }

            });

        }
    }

    function doEdit() {
        var bootstrapValidator = $("#sysMenuForm").data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            //设为同步
            // $.ajaxSettings.async = false;
            $.post("/sysMenu/doEdit", $("#sysMenuForm").serialize(), function (data) {
                // document.getElementById('sysMenuForm').reset();
                $("#sysMenuForm").data('bootstrapValidator').destroy();
                formValidator();//初始化验证
                if (data.code == 0) {
                    $("#returnStatus").val(data.code);
                    ToastrMessage.successMessage(data.msg, "1000", "toast-top-center");
                    // $("#SysMenutable").bootstrapTable('refresh');
                } else {
                    ToastrMessage.errorMessage(data.msg, "1000", "toast-top-center");
                }

            });
            //设为异步
            // $.ajaxSettings.async = true;
        }
    }


    return {
        doAdd: doAdd,
        doEdit: doEdit,
    };
})();