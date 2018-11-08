var sysMenuModle = (function () {

    $(function () {
        initTable();
    });
    //初始化操作按钮的方法
    // window.operateEvents = {
    //     'click .RoleOfadd': function (e, value, row, index) {
    //         add(row.id);
    //     },
    //     'click .RoleOfdelete': function (e, value, row, index) {
    //         del(row.id);
    //     },
    //     'click .RoleOfedit': function (e, value, row, index) {
    //         update(row.id);
    //     }
    // };

    function initTable() {
        $.post("/sysMenu/getSysMenuData", {}, function (data) {
            var d = data.rows;
            var $table = $("#SysMenutable");
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
        var html = '<a title="修改" href="javascript:void(0)" onclick="sysMenuAddEdit.toUpdate(' + row.id + ',\'edit\')"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></a>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;<a title="查看" href="javascript:void(0)" onclick="sysMenuAddEdit.toUpdate(' + row.id + ',\'view\')"><i class="fa fa-bars fa-lg" aria-hidden="true"></i></a>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;<a title="删除" href="javascript:void(0)" onclick="sysMenuAddEdit.doDel(' + row.id + ')" ><i class="fa fa-times fa-lg" aria-hidden="true"></i></a>';
        return html;
    }

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
        SearchData: SearchData
    }
})();

