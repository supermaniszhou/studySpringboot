package com.zhou.mapper.SqlMapper;

import com.github.pagehelper.Page;

import java.util.List;

/**
 * Created by Administrator on 2017/12/26 0026.
 */
public interface CommonMapper<T> {

    int queryCount(T t);

    void add(T t);

    void delete(T t);

    void update(T t);

    T query(T t);

    Page<T> queryList(T t);

    List<T> getAll();

}
