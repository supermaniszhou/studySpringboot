package com.zhou.service.sys;
import com.github.pagehelper.Page;
import com.zhou.entity.sys.SysDept;


public interface SysDeptService {

    int deleteByPrimaryKey(Long id);

    int insert(SysDept sysDept);

    int insertSelective(SysDept sysDept);

    SysDept selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SysDept sysDept);

    int updateByPrimaryKey(SysDept sysDept);

    Page<SysDept> selectPageList(SysDept t, int page, int pagesize);

    SysDept selectSysDeptbyCondition(SysDept sysDept);
}