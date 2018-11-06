package com.zhou.mapper.sys;

import com.zhou.entity.sys.SysLog;
import com.zhou.mapper.SqlMapper.CommonMapper;
import org.springframework.stereotype.Repository;


@Repository
public interface SysLogMapper<T extends SysLog> extends CommonMapper<T> {
}