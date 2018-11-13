package com.zhou.service.sys;

import com.github.pagehelper.Page;
import com.zhou.entity.sys.SysMenu;

import java.util.List;


public interface SysMenuService {

    int queryCount(SysMenu t);

    public void addObj(SysMenu t);

    public void deleteObj(SysMenu t);

    public void updateObj(SysMenu t);

    public SysMenu queryObj(SysMenu t);

    public Page<SysMenu> queryList(SysMenu t, int page, int pagesize);

    public List<SysMenu> getAll();

    public List<SysMenu> getAll(SysMenu t);
}