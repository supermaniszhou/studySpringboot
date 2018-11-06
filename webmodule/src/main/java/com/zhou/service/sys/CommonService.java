package com.zhou.service.sys;

import com.github.pagehelper.Page;

import java.util.List;

/**
 * Created by Administrator on 2018/4/20.
 */
public interface CommonService<T> {

    int queryCount(T t);

    public void addObj(T t);

    public void deleteObj(T t);

    public void updateObj(T t);

    public T queryObj(T t);

    public Page<T> queryList(T t, int page, int pagesize);

    public List<T> getAll();
}
