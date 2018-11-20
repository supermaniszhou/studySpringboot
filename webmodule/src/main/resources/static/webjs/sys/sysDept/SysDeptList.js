var sysDeptModle = (function () {

    $(function () {
        initDeptTree();
    });
    function initDeptTree() {
        $.post("/sysDept/getSysDeptData", {}, function (data) {
            var d = data.rows;
            var $table = $("#sysDepttable");
            //清空数据
            $table.bootstrapTable('destroy');
            $table.bootstrapTable({
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
                    {field: 'name', title: '部门名称'},
                    // {field: 'status', title: '状态', sortable: true, align: 'center', formatter: 'statusFormatter'},
                    // {field: 'url', title: '地址'},
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
                treeShowField: 'name',
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

    function opeate(value, row, index) {
        var html = '<a title="修改" href="javascript:void(0)" onclick="sysDeptModle.toEditSysDept(\'' + row.id + '\')"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></a>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;<a title="查看" href="javascript:void(0)" onclick="sysDeptModle.toViewSysDept(\'' + row.id + '\')"><i class="fa fa-bars fa-lg" aria-hidden="true"></i></a>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;<a title="删除" href="javascript:void(0)" onclick="sysDeptModle.doDelSysDept(\'' + row.id + '\')" ><i class="fa fa-times fa-lg" aria-hidden="true"></i></a>';
        return html;
    }

    //查询条件
    function queryParams(params) {
        return {
            pageSize: params.pageSize,
            pageIndex: params.pageNumber,
            // id:$.trim($("#id").val()),
            // deptName:$.trim($("#deptName").val()),
            // parentId:$.trim($("#parentId").val()),
            // dpetRegion:$.trim($("#dpetRegion").val()),
            // deptLogo:$.trim($("#deptLogo").val()),
            // deptPicPath:$.trim($("#deptPicPath").val()),
            // deptLevel:$.trim($("#deptLevel").val()),
            // deptOrder:$.trim($("#deptOrder").val()),
            // createUserid:$.trim($("#createUserid").val()),
            // createUsername:$.trim($("#createUsername").val()),
            // createUserOrg:$.trim($("#createUserOrg").val()),
            // createUserOrgname:$.trim($("#createUserOrgname").val()),
            // createTime:$.trim($("#createTime").val()),
            // updateTime:$.trim($("#updateTime").val()),
            // isDelRadio:$.trim($("#isDelRadio").val()),
            // isEnableRadio:$.trim($("#isEnableRadio").val()),
        };
    }

    //查询事件
    function SearchData() {
        $('#sysDepttable').bootstrapTable('refresh', {pageNumber: 1});
    }

    function toAddSysDept() {
        parent.BootstrapDialog.show({
            title: '新增',
            message: $('<div></div>').load('/sysDept/toaddSysDept'),
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
                    $("#sysDepttable").bootstrapTable('refresh');
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

    function toEditSysDept(id) {
        parent.BootstrapDialog.show({
            title: '修改',
            message: $('<div></div>').load('/sysDept/toEditSysDept?id=' + id),
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
                    $("#sysDepttable").bootstrapTable('refresh');
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

    function toViewSysDept(id) {
        parent.BootstrapDialog.show({
            title: '查看',
            message: $('<div></div>').load('/sysDept/toEditSysDept?id=' + id),
            draggable: false,
            type: BootstrapDialog.TYPE_DEFAULT,
            size: BootstrapDialog.SIZE_WIDE,
            closable: true,//右上角的关闭按钮
            // cssClass: ' ',
        });
    }

//删除
    function doDelSysDept(id) {
        parent.BootstrapDialog.show({
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_DANGER,
            message: '你确认删除吗？',
            buttons: [{
                label: '确认删除',
                cssClass: 'btn-primary',
                action: function (dialogItself) {
                    $.post("/sysDept/doDelSysDept", {id: id}, function (data) {
                        dialogItself.close();
                        if (data.code == 0) {
                            ToastrMessage.successMessage(data.msg, "1000", "toast-top-center");
                            $("#sysDepttable").bootstrapTable('refresh');
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
        toAddSysDept: toAddSysDept,
        toEditSysDept: toEditSysDept,
        toViewSysDept: toViewSysDept,
        doDelSysDept: doDelSysDept,
    }
})();

