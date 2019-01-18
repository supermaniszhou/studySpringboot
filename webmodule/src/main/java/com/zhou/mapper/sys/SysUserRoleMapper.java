package com.zhou.mapper.sys;

import com.zhou.entity.sys.SysUserRole;
import com.github.pagehelper.Page;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SysUserRoleMapper {
    int deleteByPrimaryKey(SysUserRole id);

    int insert(SysUserRole record);

    void insertBatch(List<SysUserRole> list);

    int insertSelective(SysUserRole record);

    SysUserRole selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SysUserRole record);

    int updateByPrimaryKey(SysUserRole record);

    Page<SysUserRole> selectSysUserRoleAll(SysUserRole record);

    SysUserRole selectSysUserRolebyCondition(SysUserRole record);
}