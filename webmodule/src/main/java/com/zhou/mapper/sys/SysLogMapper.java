package com.zhou.mapper.sys;

import com.github.pagehelper.Page;
import com.zhou.entity.sys.SysLog;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SysLogMapper {
    int queryCount(SysLog t);

    void add(SysLog t);

    void delete(SysLog t);

    void update(SysLog t);

    SysLog query(SysLog t);

    Page<SysLog> queryList(SysLog t);

    List<SysLog> getAll();

    List<SysLog> getAll(SysLog t);
}