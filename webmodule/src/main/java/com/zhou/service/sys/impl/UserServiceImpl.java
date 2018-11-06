package com.zhou.service.sys.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zhou.entity.sys.SysUser;
import com.zhou.mapper.sys.UserMapper;
import com.zhou.service.sys.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2018/4/19.
 */
@Service
public class UserServiceImpl implements UserService<SysUser> {

    @Autowired
    private UserMapper<SysUser> userMapper;

    @Override
    public int queryCount(SysUser sysUser) {
        return userMapper.queryCount(sysUser);
    }

    @Override
    public void addObj(SysUser sysUser) {
        userMapper.add(sysUser);
    }

    @Override
    public void deleteObj(SysUser sysUser) {
        userMapper.delete(sysUser);
    }

    @Override
    public void updateObj(SysUser sysUser) {
        userMapper.update(sysUser);
    }

    @Override
    public SysUser queryObj(SysUser sysUser) {
        return userMapper.query(sysUser);
    }


    @Override
    public Page<SysUser> queryList(SysUser sysUser, int page, int pagesize) {
        PageHelper.startPage(page, pagesize);
        return userMapper.queryList(sysUser);
    }

    @Override
    public List<SysUser> getAll() {
        return userMapper.getAll();
    }

    @Override
    public SysUser query(SysUser sysUser) {
        return userMapper.query(sysUser);
    }
}
