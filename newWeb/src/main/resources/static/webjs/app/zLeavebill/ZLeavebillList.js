var zLeavebillModle = (function () {
    $('#ZLeavebilltable').bootstrapTable({
        url: '/zLeavebill/getZLeavebillData',
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
                        showColumns: true,
        showRefresh: true,
        detailView: true,
                                columns: [
            {checkbox: true, width: '5%'},
            
                {
                    field: 'id',
                    title: '编号',
                    sortable: true
                                    },
            
                {
                    field: 'days',
                    title: '请假天数',
                    sortable: true
                                    },
            
                {
                    field: 'content',
                    title: '请假类型',
                    sortable: true
                                    },
            
                {
                    field: 'remark',
                    title: '请假内容',
                    sortable: true
                                    },
            
                {
                    field: 'leaveStarttime',
                    title: '请假开始时间',
                    sortable: true
                                    },
            
                {
                    field: 'state',
                    title: '状态',
                    sortable: true
                                    },
            
                {
                    field: 'userId',
                    title: '请假人编号',
                    sortable: true
                                    },
            
                {
                    field: 'userName',
                    title: '请假人姓名',
                    sortable: true
                                    },
            
                {
                    field: 'userDept',
                    title: '所属单位',
                    sortable: true
                                    },
            
                {
                    field: 'leaveEndtime',
                    title: '请假截止日期',
                    sortable: true
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
        var html = '<a title="修改" href="javascript:void(0)" onclick="zLeavebillAddEdit.toUpdate(' + row.id + ',\'edit\')"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></a>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;<a title="查看" href="javascript:void(0)" onclick="zLeavebillAddEdit.toUpdate(' + row.id + ',\'view\')"><i class="fa fa-bars fa-lg" aria-hidden="true"></i></a>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;<a title="删除" href="javascript:void(0)" onclick="zLeavebillAddEdit.doDel(' + row.id + ')" ><i class="fa fa-times fa-lg" aria-hidden="true"></i></a>';
        return html;
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
        $('#ZLeavebilltable').bootstrapTable('refresh', {pageNumber: 1});
    }

    return {
        SearchData: SearchData
    }
})();

