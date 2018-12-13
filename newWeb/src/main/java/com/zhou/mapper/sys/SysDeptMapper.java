package com.zhou.mapper.sys;

import com.zhou.entity.sys.SysDept;
import com.github.pagehelper.Page;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SysDeptMapper {
    int deleteByPrimaryKey(Long id);

    int insert(SysDept record);

    int insertSelective(SysDept record);

    SysDept selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SysDept record);

    int updateByPrimaryKey(SysDept record);

    Page<SysDept> selectSysDeptAll(SysDept record);

    SysDept selectSysDeptbyCondition(SysDept record);
}