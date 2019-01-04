var userModle = (function () {

    $(function () {
        initSysUserTable();
    });

    function initSysUserTable() {
        // $('#sysUserTable').bootstrapTable('destroy');
        $('#sysUserTable').bootstrapTable({
            url: '/user/getUserData',
            queryParamsType: '',              //默认值为 'limit' ,在默认情况下 传给服务端的参数为：offset,limit,sort
            queryParams: queryParams,
            uniqueId: "id",
            method: "post",
            contentType: "application/x-www-form-urlencoded",
            undefinedText: "",//当数据为 undefined 时显示的字符
            striped: false,                   //是否显示行间隔色
            cache: false,

            pagination: true,
            sortable: true, //是否启用排序
            sortOrder: "asc",//排序方式
            sortName: 'age',//根据哪个字段排序

            sidePagination: "server",         //分页方式：client客户端分页，server服务端分页（*）

            pageNumber: 1,
            pageSize: 10,
            pageList: [10, 25, 50, 100],

            // search: true,
            uniqueId: "id",                       //每一行的唯一标识，一般为主键列
            height: 500,

            paginationPreText: "上一页",
            paginationNextText: "下一页",
            silentSort: true,
            showColumns: true,
            showRefresh: true,
            detailView: false,
            clickToSelect: true,                //是否启用点击选中行
            detailFormatter: function (index, row) {
                return "账号:" + row.username + ";名字：" + row.realname + "；电话：" + row.phone;
            },
            columns: [
                {checkbox: true, width: '5%'}
                , {
                    field: 'id',
                    title: 'id',
                    visible: false
                }, {
                    field: 'username',
                    title: '名字',
                    width: '10%',
                }, {
                    field: 'age',
                    title: '年龄',
                    width: '10%',
                    sortable: true,
                }, {
                    field: 'address',
                    title: '地址',
                    width: 'auto'
                }, {
                    field: 'sex',
                    title: '性别',
                    width: '10%',
                    formatter: function (value, row) {
                        if (value == 2) {
                            return "女";
                        } else if (value == 1) {
                            return "男";
                        }
                    }
                },
                {
                    title: '角色管理',
                    field: 'id',
                    width: '10%',
                    formatter: roleManage,
                    align: 'center',
                },
                {
                    title: '操作',
                    field: 'id',
                    width: '20%',
                    formatter: opeate,
                    align: 'center',
                }
            ]
        });
    }

    function opeate(value, row, index) {
        var html = '<a title="修改" href="javascript:void(0)" onclick="userModle.toEditUserPage(\'' + row.id + '\')"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></a>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;<a title="查看" href="javascript:void(0)" onclick="userModle.toViewUserPage(\'' + row.id + '\')"><i class="fa fa-bars fa-lg" aria-hidden="true"></i></a>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;<a title="删除" href="javascript:void(0)" onclick="userModle.doDelSysUser(\'' + row.id + '\')" ><i class="fa fa-times fa-lg" aria-hidden="true"></i></a>';
        return html;
    }

    function roleManage(value, row, index) {
        var html = '<a href="javascript:void(0)" onclick="userModle.toConfigRole(\'' + row.id + '\')" class="btn btn-info btn-xs"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>角色权限</a>';
        return html;
    }

    //查询条件
    function queryParams(params) {
        return {
            pageSize: params.pageSize,
            pageIndex: params.pageNumber,
            username: $.trim($("#usernameForm").val()),
            identy: $.trim($("#useridentyForm").val())
        };
    }

    //查询事件
    function SearchData() {
        $('#sysUserTable').bootstrapTable('refresh', {pageNumber: 1});
    }

    function toAddUserPage() {
        parent.BootstrapDialog.show({
            title: '新增',
            message: $('<div></div>').load('/user/toadd'),
            draggable: true,//移动弹框
            type: BootstrapDialog.TYPE_DEFAULT,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,//右上角的关闭按钮
            // cssClass: ' ',
            closeByBackdrop: false,//点击遮罩关闭弹框
            closeByKeyboard: false,
            buttons: [{
                label: '保存',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    dialogRef.getModalBody().find('form').find("button").trigger('click');
                    $("#sysUserTable").bootstrapTable('refresh');
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
    //

    function toConfigRole(id) {
        parent.BootstrapDialog.show({
            title: '角色设置',
            message: $('<div></div>').load('/user/toConfigRole?id=' + id),
            draggable: true,
            type: BootstrapDialog.TYPE_DEFAULT,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,//右上角的关闭按钮
            // cssClass: '',
            backdrop: false,
            buttons: [{
                label: '保存',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    dialogRef.getModalBody().find('form').find("button").trigger('click');
                    var val = dialogRef.getModalBody().find('#flagInput').val();
                    $("#sysUserTable").bootstrapTable('refresh');
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
    function toEditUserPage(id) {
        parent.BootstrapDialog.show({
            title: '修改',
            message: $('<div></div>').load('/user/toEditSysUser?id=' + id),
            draggable: true,
            type: BootstrapDialog.TYPE_DEFAULT,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,//右上角的关闭按钮
            // cssClass: '',
            backdrop: false,
            buttons: [{
                label: '保存',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    dialogRef.getModalBody().find('form').find("button").trigger('click');
                    var val = dialogRef.getModalBody().find('#flagInput').val();
                    $("#sysUserTable").bootstrapTable('refresh');
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

    function toViewUserPage(id) {
        parent.BootstrapDialog.show({
            title: '查看',
            message: $('<div></div>').load('/user/toEditSysUser?id=' + id),
            draggable: false,
            type: BootstrapDialog.TYPE_DEFAULT,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,//右上角的关闭按钮
            cssClass: 'dialogModalH ',
        });
    }

    function doDelSysUser(id) {
        parent.BootstrapDialog.show({
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
                    $.post("/user/doDelSysUser", {id: id}, function (data) {
                        dialogItself.close();
                        if (data.code == 0) {
                            ToastrMessage.successMessage(data.msg, "1000", "toast-top-center");
                            $("#sysUserTable").bootstrapTable('refresh');
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
        toAddUserPage: toAddUserPage,
        toEditUserPage: toEditUserPage,
        toConfigRole: toConfigRole,
        toViewUserPage: toViewUserPage,
        doDelSysUser: doDelSysUser,
    }
})();

