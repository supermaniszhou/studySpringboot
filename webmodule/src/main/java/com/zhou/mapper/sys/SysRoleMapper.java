package com.zhou.mapper.sys;

import com.zhou.entity.sys.SysRole;
import com.github.pagehelper.Page;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SysRoleMapper {
    int deleteByPrimaryKey(Long id);

    int insert(SysRole record);

    int insertSelective(SysRole record);

    SysRole selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SysRole record);

    int updateByPrimaryKey(SysRole record);

    Page<SysRole> selectSysRoleAll(SysRole record);

    SysRole selectSysRolebyCondition(SysRole record);
}