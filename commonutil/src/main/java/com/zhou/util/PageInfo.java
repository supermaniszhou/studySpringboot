package com.zhou.util;

import com.github.pagehelper.Page;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

public class PageInfo<T> implements Serializable {

    private long total;
    private List<T> list;

    public PageInfo() {
    }

    public PageInfo(List<T> list) {
        if (list instanceof Page) {
            Page page = (Page) list;
            this.list = page;
            this.total = page.getTotal();
        } else if (list instanceof Collection) {
            this.total = list.size();
        }
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }
}
