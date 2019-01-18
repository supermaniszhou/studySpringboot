package com.zhou.service.sys.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zhou.entity.sys.SysUserRole;
import com.zhou.mapper.sys.SysUserRoleMapper;
import com.zhou.service.sys.SysUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysUserRoleServiceImpl implements SysUserRoleService {
    @Autowired
    private SysUserRoleMapper mapper;

    @Override
    public int deleteByPrimaryKey(Long id) {
        return mapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(SysUserRole sysUserRole) {
        return mapper.insert(sysUserRole);
    }

    @Override
    public int insertSelective(SysUserRole sysUserRole) {
        return mapper.insertSelective(sysUserRole);
    }

    @Override
    public SysUserRole selectByPrimaryKey(Long id) {
        return mapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(SysUserRole sysUserRole) {
        return mapper.updateByPrimaryKeySelective(sysUserRole);
    }

    @Override
    public int updateByPrimaryKey(SysUserRole sysUserRole) {
        return mapper.updateByPrimaryKey(sysUserRole);
    }

    @Override
    public Page<SysUserRole> selectPageList(SysUserRole sysUserRole, int page, int pagesize) {
        PageHelper.startPage(page, pagesize);
        return mapper.selectSysUserRoleAll(sysUserRole);
    }

    @Override
    public SysUserRole selectSysUserRolebyCondition(SysUserRole sysUserRole) {
        return mapper.selectSysUserRolebyCondition(sysUserRole);
    }
}
