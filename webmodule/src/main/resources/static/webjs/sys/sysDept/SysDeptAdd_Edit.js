var sysDeptAddEdit = (function () {
    $(function () {
        sysDeptFormValidator();
    });

    function sysDeptFormValidator() {
        $('#sysDeptForm').bootstrapValidator({
//        live: 'disabled',
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {

                deptName: {
                    container: '#deptNameError',
                    validators: {
                        notEmpty: {
                            message: '部门名称不可为空！',
                        }
                    }
                },

            }
        });
    }


    function doAddSysDept() {
        var bootstrapValidator = $("#sysDeptForm").data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            //异步请求改同步
            console.log($("#sysDeptForm").serialize());
            $.ajaxSettings.async = false;
            $.post("/sysDept/doAddSysDept", $("#sysDeptForm").serialize(), function (data) {
                if (data.code == 0) {
                    document.getElementById('sysDeptForm').reset();
                    $('#sysDeptForm').data('bootstrapValidator').destroy();
                    sysDeptFormValidator();
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


    function doEditSysDept() {
        var bootstrapValidator = $("#sysDeptForm").data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            $.ajaxSettings.async = false;
            $.post("/sysDept/doEditSysDept", $("#sysDeptForm").serialize(), function (data) {
                document.getElementById('sysDeptForm').reset();
                if (data.code == 0) {
                    document.getElementById('sysDeptForm').reset();
                    $('#sysDeptForm').data('bootstrapValidator').destroy();
                    sysDeptFormValidator();
                    ToastrMessage.successMessage(data.msg, "1000", "toast-top-center");
                    $("#flagInput").val("success");
                    $("#SysDepttable").bootstrapTable('refresh');
                } else {
                    ToastrMessage.errorMessage(data.msg, "2000", "toast-top-center");
                    $("#flagInput").val("error");
                }
            });
            $.ajaxSettings.async = true;
        }
    }

    return {
        doAddSysDept: doAddSysDept,
        doEditSysDept: doEditSysDept,
    };
})();