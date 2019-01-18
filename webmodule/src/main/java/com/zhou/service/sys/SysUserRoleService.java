package com.zhou.service.sys;
import com.github.pagehelper.Page;
import com.zhou.entity.sys.SysUserRole;

import java.util.List;


public interface SysUserRoleService {

    void insertBatch(SysUserRole sysUserRole) throws Exception;

    int deleteByPrimaryKey(SysUserRole id);

    int insert(SysUserRole sysUserRole);

    int insertSelective(SysUserRole sysUserRole);

    SysUserRole selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SysUserRole sysUserRole);

    int updateByPrimaryKey(SysUserRole sysUserRole);

    Page<SysUserRole> selectPageList(SysUserRole t, int page, int pagesize);

    SysUserRole selectSysUserRolebyCondition(SysUserRole sysUserRole);
}