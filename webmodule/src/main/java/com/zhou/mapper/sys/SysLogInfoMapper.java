package com.zhou.mapper.sys;

import com.zhou.entity.sys.SysLogInfo;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;
import org.springframework.stereotype.Component;

@Component
@SqlResource("SysLogInfo")
public interface SysLogInfoMapper extends BaseMapper<SysLogInfo> {
}
