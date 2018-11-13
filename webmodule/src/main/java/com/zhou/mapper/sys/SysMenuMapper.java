package com.zhou.mapper.sys;

import com.github.pagehelper.Page;
import com.zhou.entity.sys.SysMenu;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SysMenuMapper {

    int queryCount(SysMenu t);

    void add(SysMenu t);

    void delete(SysMenu t);

    void update(SysMenu t);

    SysMenu query(SysMenu t);

    Page<SysMenu> queryList(SysMenu t);

    List<SysMenu> getAll();

    List<SysMenu> getAll(SysMenu t);
}