package com.zhou.service.sys.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zhou.entity.sys.SysLog;
import com.zhou.mapper.sys.SysLogMapper;
import com.zhou.service.sys.SysLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysLogServiceImpl implements SysLogService<SysLog> {
    @Autowired
    private SysLogMapper<SysLog> mapper;

    @Override
    public int queryCount(SysLog sysLog) {
        return mapper.queryCount(sysLog);
    }

    @Override
    public void addObj(SysLog sysLog) {
        mapper.add(sysLog);
    }

    @Override
    public void deleteObj(SysLog sysLog) {
        mapper.delete(sysLog);
    }

    @Override
    public void updateObj(SysLog sysLog) {
        mapper.update(sysLog);
    }

    @Override
    public SysLog queryObj(SysLog sysLog) {
        return mapper.query(sysLog);
    }

    @Override
    public Page<SysLog> queryList(SysLog sysLog, int page, int pagesize) {
        PageHelper.startPage(page, pagesize);
        return mapper.queryList(sysLog);
    }

    @Override
    public List<SysLog> getAll() {
        return mapper.getAll();
    }
}
