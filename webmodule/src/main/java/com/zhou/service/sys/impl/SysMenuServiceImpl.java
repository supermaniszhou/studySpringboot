package com.zhou.service.sys.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zhou.entity.sys.SysMenu;
import com.zhou.mapper.sys.SysMenuMapper;
import com.zhou.service.sys.SysMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysMenuServiceImpl implements SysMenuService<SysMenu> {
    @Autowired
    private SysMenuMapper<SysMenu> mapper;

    @Override
    public int queryCount(SysMenu sysMenu) {
        return mapper.queryCount(sysMenu);
    }

    @Override
    public void addObj(SysMenu sysMenu) {
        mapper.add(sysMenu);
    }

    @Override
    public void deleteObj(SysMenu sysMenu) {
        mapper.delete(sysMenu);
    }

    @Override
    public void updateObj(SysMenu sysMenu) {
        mapper.update(sysMenu);
    }

    @Override
    public SysMenu queryObj(SysMenu sysMenu) {
        return mapper.query(sysMenu);
    }

    @Override
    public Page<SysMenu> queryList(SysMenu sysMenu, int page, int pagesize) {
        PageHelper.startPage(page, pagesize);
        return mapper.queryList(sysMenu);
    }

    @Override
    public List<SysMenu> getAll() {
        return mapper.getAll();
    }
}
