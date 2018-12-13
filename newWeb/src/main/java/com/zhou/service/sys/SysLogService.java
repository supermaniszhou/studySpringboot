package com.zhou.service.sys;

import com.github.pagehelper.Page;
import com.zhou.entity.sys.SysLog;

import java.util.List;


public interface SysLogService {

    int queryCount(SysLog t);

    public void addObj(SysLog t);

    public void deleteObj(SysLog t);

    public void updateObj(SysLog t);

    public SysLog queryObj(SysLog t);

    public Page<SysLog> queryList(SysLog t, int page, int pagesize);

    public List<SysLog> getAll();

    public List<SysLog> getAll(SysLog t);
}