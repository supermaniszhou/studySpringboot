package com.zhou.service.app.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zhou.entity.app.ZLeavebill;
import com.zhou.mapper.app.ZLeavebillMapper;
import com.zhou.service.app.ZLeavebillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZLeavebillServiceImpl implements ZLeavebillService<ZLeavebill> {
    @Autowired
    private ZLeavebillMapper<ZLeavebill> mapper;

    @Override
    public int queryCount(ZLeavebill zLeavebill) {
        return mapper.queryCount(zLeavebill);
    }

    @Override
    public void addObj(ZLeavebill zLeavebill) {
        mapper.add(zLeavebill);
    }

    @Override
    public void deleteObj(ZLeavebill zLeavebill) {
        mapper.delete(zLeavebill);
    }

    @Override
    public void updateObj(ZLeavebill zLeavebill) {
        mapper.update(zLeavebill);
    }

    @Override
    public ZLeavebill queryObj(ZLeavebill zLeavebill) {
        return mapper.query(zLeavebill);
    }

    @Override
    public Page<ZLeavebill> queryList(ZLeavebill zLeavebill, int page, int pagesize) {
        PageHelper.startPage(page, pagesize);
        return mapper.queryList(zLeavebill);
    }

    @Override
    public List<ZLeavebill> getAll() {
        return mapper.getAll();
    }

    @Override
    public List<ZLeavebill> getAll(ZLeavebill zLeavebill) {
        return mapper.getAll(zLeavebill);
    }
}
