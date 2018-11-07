package com.zhou.mapper.sys;

import com.github.pagehelper.Page;
import com.zhou.entity.sys.SysUser;
import com.zhou.mapper.SqlMapper.CommonMapper;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Created by Administrator on 2017/12/25 0025.
 */
@Repository
public interface SysUserMapper<T extends SysUser> extends CommonMapper<T> {
    
}
