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
public class SysMenuServiceImpl implements SysMenuService {
    @Autowired
    private SysMenuMapper sysMenuMapper;

    @Override
    public int queryCount(SysMenu sysMenu) {
        return sysMenuMapper.queryCount(sysMenu);
    }

    @Override
    public void addObj(SysMenu sysMenu) {
        sysMenuMapper.add(sysMenu);
    }

    @Override
    public void deleteObj(SysMenu sysMenu) {
        sysMenuMapper.delete(sysMenu);
    }

    @Override
    public void updateObj(SysMenu sysMenu) {
        sysMenuMapper.update(sysMenu);
    }

    @Override
    public SysMenu queryObj(SysMenu sysMenu) {
        return sysMenuMapper.query(sysMenu);
    }

    @Override
    public Page<SysMenu> queryList(SysMenu sysMenu, int page, int pagesize) {
        PageHelper.startPage(page, pagesize);
        return sysMenuMapper.queryList(sysMenu);
    }

    @Override
    public List<SysMenu> getAll() {
        return sysMenuMapper.getAll();
    }

    @Override
    public List<SysMenu> getAll(SysMenu sysMenu) {
        return sysMenuMapper.getAll(sysMenu);
    }
}
