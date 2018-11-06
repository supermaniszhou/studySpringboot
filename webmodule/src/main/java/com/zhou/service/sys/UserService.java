package com.zhou.service.sys;

import com.github.pagehelper.Page;
import com.zhou.entity.sys.SysUser;

import java.util.List;

/**
 * Created by Administrator on 2018/4/19.
 */
public interface UserService <T extends SysUser>  {

    int queryCount(T t);

    public void addObj(T t);

    public void deleteObj(T t);

    public void updateObj(T t);

    public T queryObj(T t);

    public Page<T> queryList(T t, int page, int pagesize);

    public List<T> getAll();

    SysUser query(SysUser sysUser);
}
