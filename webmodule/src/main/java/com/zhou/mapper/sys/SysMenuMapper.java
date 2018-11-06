package com.zhou.mapper.sys;

import com.zhou.entity.sys.SysMenu;
import com.zhou.mapper.SqlMapper.CommonMapper;
import org.springframework.stereotype.Repository;


@Repository
public interface SysMenuMapper<T extends SysMenu> extends CommonMapper<T> {
}