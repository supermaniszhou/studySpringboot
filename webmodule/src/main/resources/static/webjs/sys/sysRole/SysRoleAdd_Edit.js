var sysRoleAddEdit = (function () {
    $(function () {
        sysRoleFormValidator();
    });

    function sysRoleFormValidator() {
        $('#sysRoleForm').bootstrapValidator({
//        live: 'disabled',
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                roleName: {
                    container: '#roleNameError',
                    validators: {
                        notEmpty: {
                            message: '角色名称不可为空！',
                        }
                    }
                }
            }
        });
    }


    function doAddSysRole() {
        var bootstrapValidator = $("#sysRoleForm").data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            //异步请求改同步
            $.ajaxSettings.async = false;
            alert($("#sysRoleForm").serialize());
            $.post("/sysRole/doAddSysRole", $("#sysRoleForm").serialize(), function (data) {
                if (data.code == 0) {
                    document.getElementById('sysRoleForm').reset();
                    $('#sysRoleForm').data('bootstrapValidator').destroy();
                    sysRoleFormValidator();
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


    function doEditSysRole() {
        var bootstrapValidator = $("#sysRoleForm").data('bootstrapValidator');
        //手动触发验证
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            $.ajaxSettings.async = false;
            $.post("/sysRole/doEditSysRole", $("#sysRoleForm").serialize(), function (data) {
                document.getElementById('sysRoleForm').reset();
                if (data.code == 0) {
                    document.getElementById('sysRoleForm').reset();
                    $('#sysRoleForm').data('bootstrapValidator').destroy();
                    sysRoleFormValidator();
                    ToastrMessage.successMessage(data.msg, "1000", "toast-top-center");
                    $("#flagInput").val("success");
                    $("#SysRoletable").bootstrapTable('refresh');
                } else {
                    ToastrMessage.errorMessage(data.msg, "2000", "toast-top-center");
                    $("#flagInput").val("error");
                }
            });
            $.ajaxSettings.async = true;
        }
    }

    return {
        doAddSysRole: doAddSysRole,
        doEditSysRole: doEditSysRole,
    };
})();