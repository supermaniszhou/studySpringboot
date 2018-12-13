package com.zhou.mapper.sys;


import com.github.pagehelper.Page;
import com.zhou.entity.sys.SysUser;

public interface SysUserMapper {
    int deleteByPrimaryKey(Long id);

    int insert(SysUser record);

    int insertSelective(SysUser record);

    SysUser selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SysUser record);

    int updateByPrimaryKey(SysUser record);

    Page<SysUser> selectPageList(SysUser t);

    SysUser selectObject(SysUser t);
}