var sysRoleModle = (function () {
    $('#sysRoletable').bootstrapTable({
        url: '/sysRole/getSysRoleData',
        queryParamsType: '',              //默认值为 'limit' ,在默认情况下 传给服务端的参数为：offset,limit,sort
        queryParams: queryParams,
        method: "post",
        contentType: "application/x-www-form-urlencoded",
        undefinedText: "",//当数据为 undefined 时显示的字符
        pagination: true,
        pageNumber: 1,
        pageSize: 5,
        pageList: [10, 25, 50, 100],
        sidePagination: "server",         //分页方式：client客户端分页，server服务端分页（*）
        striped: false,                   //是否显示行间隔色
        cache: false,
        //uniqueId: "id",                       //每一行的唯一标识，一般为主键列
        height: 500,
        paginationPreText: "上一页",
        paginationNextText: "下一页",
        search: false,
        sortable: true, //是否启用排序
        sortOrder: "asc",//排序方式
        showColumns: true,
        showRefresh: true,
        detailView: false,
        columns: [
            {checkbox: true, width: '5%'},

            {
                field: 'id',
                title: '',
                visible: false
            },

            {
                field: 'roleName',
                title: '角色名称',
                sortable: true,
                align: 'center',
                visible: true
            },


            {
                field: 'createUsername',
                title: '创建者姓名',
                sortable: true,
                align: 'center',
                visible: true
            },


            {
                field: 'createTime',
                title: '创建时间',
                sortable: true,
                align: 'center',
                visible: true
            },

            {
                field: 'isDel',
                title: '删除状态',
                sortable: true,
                align: 'center',
                visible: true,
                formatter: function (value, row) {
                    if (value == 0) {
                        return "未删除";
                    } else if (value == 1) {
                        return "已删除";
                    }
                }
            },

            {
                field: 'isEnable',
                title: '是否启用',
                sortable: true,
                align: 'center',
                visible: true,
                formatter: function (value, row) {
                    if (value == 0) {
                        return "已启用";
                    } else if (value == 1) {
                        return "未启用";
                    }
                }
            },

            {
                title: '操作',
                field: 'id',
                width: '20%',
                align: 'center',
                formatter: opeate
            }
        ]
    });

    function opeate(value, row, index) {
        var html = '<a title="修改" href="javascript:void(0)" onclick="sysRoleModle.toEditSysRole(\'' + row.id + '\')"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></a>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;<a title="查看" href="javascript:void(0)" onclick="sysRoleModle.toViewSysRole(\'' + row.id + '\')"><i class="fa fa-bars fa-lg" aria-hidden="true"></i></a>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;<a title="删除" href="javascript:void(0)" onclick="sysRoleModle.doDelSysRole(\'' + row.id + '\')" ><i class="fa fa-times fa-lg" aria-hidden="true"></i></a>';
        return html;
    }

    //查询条件
    function queryParams(params) {
        return {
            pageSize: params.pageSize,
            pageIndex: params.pageNumber,
            roleName: $.trim($("#roleName").val()),
            isEnable: $.trim($("input[name='isEnable']:checked").val()),
        };
    }

    //查询事件
    function SearchData() {
        $('#sysRoletable').bootstrapTable('refresh', {pageNumber: 1});
    }

    function toAddSysRole() {
        parent.BootstrapDialog.show({
            title: '新增',
            message: $('<div></div>').load('/sysRole/toaddSysRole'),
            draggable: true,//移动弹框
            type: BootstrapDialog.TYPE_DEFAULT,
            size: BootstrapDialog.SIZE_NORMAL,
            closable: true,//右上角的关闭按钮
            // cssClass: ' ',
            closeByBackdrop: false,//点击遮罩关闭弹框
            closeByKeyboard: false,
            buttons: [{
                label: '保存',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    dialogRef.getModalBody().find('#sysRoleForm').find("button").trigger('click');
                    $("#sysRoletable").bootstrapTable('refresh');
                    var val = dialogRef.getModalBody().find('#flagInput').val();
                    if (val == "success") {
                        SearchData();
                        dialogRef.close();
                    }
                }
            }, {
                icon: 'glyphicon glyphicon-eye-close',
                label: '关闭',
                action: function (dialog) {
                    dialog.close();
                }
            }]
        });
    }

    function toEditSysRole(id) {
        parent.BootstrapDialog.show({
            title: '修改',
            message: $('<div></div>').load('/sysRole/toEditSysRole?id=' + id),
            draggable: true,
            type: BootstrapDialog.TYPE_DEFAULT,
            size: BootstrapDialog.SIZE_NORMAL,
            closable: true,//右上角的关闭按钮
            // cssClass: '',
            backdrop: false,
            buttons: [{
                label: '保存',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    dialogRef.getModalBody().find('#sysRoleForm').find("button").trigger('click');
                    var val = dialogRef.getModalBody().find('#flagInput').val();
                    $("#sysRoletable").bootstrapTable('refresh');
                    if (val == "success") {
                        dialogRef.close();
                    }
                }
            }, {
                icon: 'glyphicon glyphicon-eye-close',
                label: '关闭',
                action: function (dialog) {
                    dialog.close();
                }
            }]
        });
    }

    function toViewSysRole(id) {
        parent.BootstrapDialog.show({
            title: '查看',
            message: $('<div></div>').load('/sysRole/toEditSysRole?id=' + id),
            draggable: false,
            type: BootstrapDialog.TYPE_DEFAULT,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,//右上角的关闭按钮
            // cssClass: ' ',
        });
    }

    function doDelSysRole(id) {
        parent.BootstrapDialog.show({
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_DANGER,
            message: '你确认删除吗？',
            buttons: [{
                label: '确认删除',
                cssClass: 'btn-primary',
                action: function (dialogItself) {
                    $.post("/sysRole/doDelSysRole", {id: id}, function (data) {
                        dialogItself.close();
                        if (data.code == 0) {
                            ToastrMessage.successMessage(data.msg, "1000", "toast-top-center");
                            $("#sysRoletable").bootstrapTable('refresh');
                        } else {
                            ToastrMessage.successMessage(data.msg, "2000", "toast-top-center");

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
        SearchData: SearchData,
        toAddSysRole: toAddSysRole,
        toEditSysRole: toEditSysRole,
        toViewSysRole: toViewSysRole,
        doDelSysRole: doDelSysRole,
    }
})();

