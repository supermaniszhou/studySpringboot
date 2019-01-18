package com.zhou.service.sys.impl;

import com.zhou.entity.sys.SysLogInfo;
import com.zhou.mapper.sys.SysLogInfoMapper;
import com.zhou.service.sys.SysLogInfoService;
import org.beetl.sql.core.SQLManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SysLogInfoServiceImpl implements SysLogInfoService {

    @Autowired
    private SysLogInfoMapper sysLogInfoMapper;
    @Autowired
    private SQLManager sqlManager;

    @Override
    public void insertSysloginfo(SysLogInfo sysLogInfo) {
        sqlManager.insert(sysLogInfo);
    }
}
