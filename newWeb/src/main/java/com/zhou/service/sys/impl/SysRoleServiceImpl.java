package com.zhou.service.sys.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zhou.entity.sys.SysRole;
import com.zhou.mapper.sys.SysRoleMapper;
import com.zhou.service.sys.SysRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysRoleServiceImpl implements SysRoleService {
    @Autowired
    private SysRoleMapper mapper;

    @Override
    public int deleteByPrimaryKey(Long id) {
        return mapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(SysRole sysRole) {
        return mapper.insert(sysRole);
    }

    @Override
    public int insertSelective(SysRole sysRole) {
        return mapper.insertSelective(sysRole);
    }

    @Override
    public SysRole selectByPrimaryKey(Long id) {
        return mapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(SysRole sysRole) {
        return mapper.updateByPrimaryKeySelective(sysRole);
    }

    @Override
    public int updateByPrimaryKey(SysRole sysRole) {
        return mapper.updateByPrimaryKey(sysRole);
    }

    @Override
    public Page<SysRole> selectPageList(SysRole sysRole, int page, int pagesize) {
        PageHelper.startPage(page, pagesize);
        return mapper.selectSysRoleAll(sysRole);
    }

    @Override
    public SysRole selectSysRolebyCondition(SysRole sysRole) {
        return mapper.selectSysRolebyCondition(sysRole);
    }
}
