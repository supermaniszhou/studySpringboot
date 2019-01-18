package com.zhou.service.sys.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zhou.entity.sys.SysDept;
import com.zhou.mapper.sys.SysDeptMapper;
import com.zhou.service.sys.SysDeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysDeptServiceImpl implements SysDeptService {
    @Autowired
    private SysDeptMapper mapper;

    @Override
    public int deleteByPrimaryKey(Long id) {
        return mapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(SysDept sysDept) {
        return mapper.insert(sysDept);
    }

    @Override
    public int insertSelective(SysDept sysDept) {
        if (sysDept.getId() == 0 || sysDept.getId()==null) {
            sysDept.setParentId(null);
        }
        return mapper.insertSelective(sysDept);
    }

    @Override
    public SysDept selectByPrimaryKey(Long id) {
        return mapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(SysDept sysDept) {
        if (sysDept.getId() == 0 || sysDept.getId()==null) {
            sysDept.setParentId(null);
        }
        return mapper.updateByPrimaryKeySelective(sysDept);
    }

    @Override
    public int updateByPrimaryKey(SysDept sysDept) {
        return mapper.updateByPrimaryKey(sysDept);
    }

    @Override
    public Page<SysDept> selectPageList(SysDept sysDept, int page, int pagesize) {
        PageHelper.startPage(page, pagesize);
        return mapper.selectSysDeptAll(sysDept);
    }

    @Override
    public SysDept selectSysDeptbyCondition(SysDept sysDept) {
        return mapper.selectSysDeptbyCondition(sysDept);
    }
}
