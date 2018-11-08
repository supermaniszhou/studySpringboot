var userModle = (function () {
    $('#table2').bootstrapTable({
        url: '/user/getUserData',
        queryParamsType: '',              //默认值为 'limit' ,在默认情况下 传给服务端的参数为：offset,limit,sort
        queryParams: queryParams,
        uniqueId: "id",
        method: "post",
        contentType: "application/x-www-form-urlencoded",
        pagination: true,
        pageNumber: 1,
        pageSize: 5,
        pageList: [10, 20, 50, 100],
        sidePagination: "server",         //分页方式：client客户端分页，server服务端分页（*）
        striped: false,                   //是否显示行间隔色
        cache: false,
        uniqueId: "id",                       //每一行的唯一标识，一般为主键列
        height: 500,
        paginationPreText: "上一页",
        paginationNextText: "下一页",
        search: false,
        sortName: 'username',//根据哪个字段排序
        sortOrder: 'asc',
        showColumns: true,
        showRefresh: true,
        detailView: true,
        detailFormatter: function (index, row) {
            return "账号:" + row.username + ";名字：" + row.realname + "；电话：" + row.phone;
        },
        columns: [
            {checkbox: true, width: '5%'}
            , {
                field: 'id',
                title: 'id',
                sortable: true,
                visible: false
            }, {
                field: 'username',
                title: '名字',
                width: '10%',
                sortable: true
            }, {
                field: 'age',
                title: '年龄'
                , sortable: true,
                width: '10%'
            }, {
                field: 'address',
                title: '地址',
                sortable: true,
                width: 'auto'
            }, {
                field: 'sex',
                title: '性别',
                sortable: true,
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
                title: '操作',
                field: 'id',
                width: '20%',
                formatter: opeate
            }
        ]
    });

    function opeate(value, row, index) {
        var html = '<a title="修改" href="javascript:void(0)" onclick="sysUserAdd.toUpdate(' + row.id + ',\'edit\')"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></a>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;<a title="查看" href="javascript:void(0)" onclick="sysUserAdd.toUpdate(' + row.id + ',\'view\')"><i class="fa fa-bars fa-lg" aria-hidden="true"></i></a>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;<a title="删除" href="javascript:void(0)" onclick="sysUserAdd.doDel(' + row.id + ')" ><i class="fa fa-times fa-lg" aria-hidden="true"></i></a>';
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
        $('#table2').bootstrapTable('refresh', {pageNumber: 1});
    }

    return {
        SearchData: SearchData
    }
})();

