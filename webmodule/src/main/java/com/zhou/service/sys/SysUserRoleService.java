package com.zhou.service.sys;
import com.github.pagehelper.Page;
import com.zhou.entity.sys.SysUserRole;


public interface SysUserRoleService {

    int deleteByPrimaryKey(Long id);

    int insert(SysUserRole sysUserRole);

    int insertSelective(SysUserRole sysUserRole);

    SysUserRole selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SysUserRole sysUserRole);

    int updateByPrimaryKey(SysUserRole sysUserRole);

    Page<SysUserRole> selectPageList(SysUserRole t, int page, int pagesize);

    SysUserRole selectSysUserRolebyCondition(SysUserRole sysUserRole);
}