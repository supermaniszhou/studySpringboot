package com.zhou.service.sys;


import com.github.pagehelper.Page;
import com.zhou.entity.sys.SysUser;

/**
 * Created by Administrator on 2018/4/19.
 */
public interface SysUserService {

    int deleteByPrimaryKey(Long id);

    int insert(SysUser record);

    int insertSelective(SysUser record);

    SysUser selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SysUser record);

    int updateByPrimaryKey(SysUser record);

    Page<SysUser> selectPageList(SysUser t, int page, int pagesize);

    SysUser selectBySysUser(SysUser sysUser);
}
