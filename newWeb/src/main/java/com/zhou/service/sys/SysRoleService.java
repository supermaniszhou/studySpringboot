package com.zhou.service.sys;
import com.github.pagehelper.Page;
import com.zhou.entity.sys.SysRole;


public interface SysRoleService {

    int deleteByPrimaryKey(Long id);

    int insert(SysRole sysRole);

    int insertSelective(SysRole sysRole);

    SysRole selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SysRole sysRole);

    int updateByPrimaryKey(SysRole sysRole);

    Page<SysRole> selectPageList(SysRole t, int page, int pagesize);

    SysRole selectSysRolebyCondition(SysRole sysRole);
}