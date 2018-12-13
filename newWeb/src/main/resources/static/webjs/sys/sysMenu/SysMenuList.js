var sysMenuModle = (function () {

    $(function () {
        initSysMenuTable();
    });


    function initSysMenuTable() {
        $.post("/sysMenu/getSysMenuData", {}, function (data) {
            var d = data.rows;
            var $table = $("#SysMenutable");
            //清空数据
            $table.bootstrapTable('destroy');
            $table.bootstrapTable({
                // url:'/sysMenu/getSysMenuData',
                data: d,
                contentType: "application/x-www-form-urlencoded",
                idField: 'id',
                dataType: 'jsonp',
                columns: [
                    {
                        field: 'check', checkbox: true, formatter: function (value, row, index) {
                            if (row.check == true) {
                                // console.log(row.serverName);
                                //设置选中
                                return {checked: true};
                            }
                        }
                    },
                    {field: 'menuName', title: '菜单名称'},
                    // {field: 'status', title: '状态', sortable: true, align: 'center', formatter: 'statusFormatter'},
                    {field: 'url', title: '地址'},
                    {
                        field: 'operate',
                        title: '操作',
                        align: 'center',
                        // events: operateEvents,
                        formatter: opeate
                    },
                ],

                // bootstrap-table-treegrid.js 插件配置 -- start

                //在哪一列展开树形
                treeShowField: 'menuName',
                //指定父id列
                parentIdField: 'pid',

                onResetView: function (data) {
                    //console.log('load');
                    $table.treegrid({
                        initialState: 'collapsed',// 所有节点都折叠
                        // initialState: 'expanded',// 所有节点都展开，默认展开
                        treeColumn: 1,
                        // expanderExpandedClass: 'glyphicon glyphicon-minus',  //图标样式
                        // expanderCollapsedClass: 'glyphicon glyphicon-plus',
                        onChange: function () {
                            $table.bootstrapTable('resetWidth');
                        }
                    });

                    //只展开树形的第一级节点
                    $table.treegrid('getRootNodes').treegrid('expand');

                },
                onCheck: function (row) {
                    var datas = $table.bootstrapTable('getData');
                    // 勾选子类
                    // alert(datas);
                    selectChilds(datas, row, "id", "pid", true);

                    // 勾选父类
                    selectParentChecked(datas, row, "id", "pid")

                    // 刷新数据
                    $table.bootstrapTable('load', datas);
                },

                onUncheck: function (row) {
                    var datas = $table.bootstrapTable('getData');
                    selectChilds(datas, row, "id", "pid", false);
                    $table.bootstrapTable('load', datas);
                },
                // bootstrap-table-treetreegrid.js 插件配置 -- end
            });

        });
    }

    function opeate(value, row, index) {
        var html = '<a  href="javascript:void(0)"  data-toggle="tooltip" data-placement="top" title="修改" onclick="sysMenuModle.toUpdateMenu(' + row.id + ',\'edit\')"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></a>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;<a    href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="查看" onclick="sysMenuModle.toViewMenu(' + row.id + ',\'view\')"><i class="fa fa-bars fa-lg" aria-hidden="true"></i></a>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;<a   href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="删除" onclick="sysMenuModle.doDel(' + row.id + ')" ><i class="fa fa-times fa-lg" aria-hidden="true"></i></a>';
        return html;
    }

    /**
     * 跳转到新增页面并可以提交表单数据
     * */
    function toAddMenuPage() {
        BootstrapDialog.show({
            title: '新增',
            message: $('<div></div>').load('/sysMenu/toAddMenuPage'),
            draggable: false,
            type: BootstrapDialog.TYPE_DEFAULT,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,//右上角的关闭按钮
            cssClass: 'dialogModalH ',
            buttons: [{
                label: '保存',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    dialogRef.getModalBody().find('form').find("button").trigger('click');
                    initSysMenuTable();
                    // dialogRef.close();
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


    function toUpdateMenu(id, flag) {
        BootstrapDialog.show({
            title: '修改',
            message: $('<div></div>').load('/sysMenu/toEditMenu?id=' + id + "&flag=" + flag),
            draggable: false,
            type: BootstrapDialog.TYPE_DEFAULT,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,//右上角的关闭按钮
            cssClass: 'dialogModalH ',
            buttons: [{
                label: '确认修改',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    dialogRef.getModalBody().find('form').find("button").trigger('click');
                    initSysMenuTable();
                    // dialogRef.close();
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

    function toViewMenu(id, flag) {
        BootstrapDialog.show({
            title: '查看',
            message: $('<div></div>').load('/sysMenu/toEditMenu?id=' + id + "&flag=" + flag),
            draggable: false,
            type: BootstrapDialog.TYPE_DEFAULT,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,//右上角的关闭按钮
            cssClass: 'dialogModalH ',
            buttons: [{
                icon: 'glyphicon glyphicon-eye-close',
                label: '关闭',
                action: function (dialog) {
                    dialog.close();
                }
            }]
        });
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
                    $.ajaxSettings.async = false;
                    $.post("/sysMenu/doDel", {id: id}, function (data) {
                        if (data.code == 0) {

                            dialogItself.close();
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
                            // $("#SysMenutable").bootstrapTable('refresh');

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
                    initSysMenuTable();
                    $.ajaxSettings.async = true;
                }
            }, {
                label: '取消',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }]
        });
    }


    /*
    // 格式化类型
        function typeFormatter(value, row, index) {
            if (value === 'menu') {
                return '菜单';
            }
            if (value === 'button') {
                return '按钮';
            }
            if (value === 'api') {
                return '接口';
            }
            return '-';
        }

        // 格式化状态
        function statusFormatter(value, row, index) {
            if (value === 1) {
                return '<span class="label label-success">正常</span>';
            } else {
                return '<span class="label label-default">锁定</span>';
            }
        }

        // 初始化操作按钮的方法
        window.operateEvents = {
            'click .RoleOfadd': function (e, value, row, index) {
                add(row.id);
            },
            'click .RoleOfdelete': function (e, value, row, index) {
                del(row.id);
            },
            'click .RoleOfedit': function (e, value, row, index) {
                update(row.id);
            }
        };
    */

    /**
     * 选中父项时，同时选中子项
     * @param datas 所有的数据
     * @param row 当前数据
     * @param id id 字段名
     * @param pid 父id字段名
     */
    function selectChilds(datas, row, id, pid, checked) {
        for (var i in datas) {
            if (datas[i][pid] == row[id]) {
                datas[i].check = checked;
                selectChilds(datas, datas[i], id, pid, checked);
            }
            ;
        }
    }

    function selectParentChecked(datas, row, id, pid) {
        for (var i in datas) {
            if (datas[i][id] == row[pid]) {
                datas[i].check = true;
                selectParentChecked(datas, datas[i], id, pid);
            }
            ;
        }
    }

    //查询条件
    function queryParams(params) {
        return {
            pageSize: params.pageSize,
            pageIndex: params.pageNumber,
        };
    }

    //查询事件
    function SearchData() {
        $('#SysMenutable').bootstrapTable('refresh', {pageNumber: 1});
    }


    return {
        SearchData: SearchData,
        toAddMenuPage: toAddMenuPage,
        toUpdateMenu: toUpdateMenu,
        toViewMenu: toViewMenu,
        doDel: doDel,

    }
})();

