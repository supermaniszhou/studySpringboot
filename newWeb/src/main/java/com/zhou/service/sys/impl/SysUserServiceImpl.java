package com.zhou.service.sys.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zhou.entity.sys.SysUser;
import com.zhou.mapper.sys.SysUserMapper;
import com.zhou.service.sys.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2018/4/19.
 */
@Service
public class SysUserServiceImpl implements SysUserService {

    @Autowired
    private SysUserMapper userMapper;

    @Override
    public int deleteByPrimaryKey(Long id) {
        return userMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(SysUser record) {
        return userMapper.insert(record);
    }

    @Override
    public int insertSelective(SysUser record) {
        return userMapper.insertSelective(record);
    }

    @Override
    public SysUser selectByPrimaryKey(Long id) {
        return userMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(SysUser record) {
        return userMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(SysUser record) {
        return userMapper.updateByPrimaryKey(record);
    }

    @Override
    public Page<SysUser> selectPageList(SysUser t, int page, int pagesize) {
        PageHelper.startPage(page, pagesize);
        return userMapper.selectPageList(t);
    }

    @Override
    public SysUser selectBySysUser(SysUser sysUser) {
        return userMapper.selectObject(sysUser);
    }
}
