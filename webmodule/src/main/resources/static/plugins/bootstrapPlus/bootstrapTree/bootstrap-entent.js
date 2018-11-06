function itemOnclick(target){
    //找到当前节点id
    var nodeid = $(target).attr('data-nodeid');
    var tree = $('#main-menu');
    //获取当前节点对象
    var node = tree.treeview('getNode', nodeid);

    if(node.state.expanded){
        //处于展开状态则折叠
        tree.treeview('collapseNode', node.nodeId);
    } else {
        //展开
        tree.treeview('expandNode', node.nodeId);
    }
}