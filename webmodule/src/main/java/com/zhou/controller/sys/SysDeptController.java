package com.zhou.controller.sys;

import com.github.pagehelper.PageInfo;
import com.zhou.common.base.BaseController;
import com.zhou.entity.sys.SysDept;
import com.zhou.service.sys.SysDeptService;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/12/25 0025.
 */
@RestController
@RequestMapping("/sysDept")
public class SysDeptController extends BaseController {
    @Autowired
    private SysDeptService sysDeptService;


    @RequestMapping(value = "/toSysDeptList")
    public ModelAndView toSysDeptList(Model model) {
        return new ModelAndView(VIEW_PATH + "sysDept/SysDept_list");
    }

    @RequestMapping("/getSysDeptData")
    public Map<String, Object> getSysDeptData(SysDept sysDept) {

        List<SysDept> list = null;
        PageInfo<SysDept> pageInfo = null;
        List<Map<String, Object>> mapList = new ArrayList<>();
        try {
            list = sysDeptService.selectPageList(sysDept, sysDept.getPageIndex(), sysDept.getPageSize());
            pageInfo = new PageInfo<>(list);

            for (SysDept dept : list) {
                Map<String, Object> m = new HashMap<>();
                m.put("id", dept.getId());
                m.put("pid", dept.getParentId());
                m.put("name", dept.getDeptName());
                mapList.add(m);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return responseTo(pageInfo.getTotal(), mapList);
    }

    @RequestMapping(value = "/getAllDeptList")
    public List<Map<String, Object>> getAllList() {
        SysDept sysDept = new SysDept();
        List<SysDept> list = sysDeptService.selectPageList(sysDept, 0, 0);
        List<Map<String, Object>> parents = new ArrayList<>();
        for (SysDept dept : list) {
            Map<String, Object> map = new HashMap<>();
            if (dept.getParentId() == 0 || dept.getParentId() == -1) {
                map.put("id", dept.getId());
                map.put("text", dept.getDeptName());
                map.put("nodes", "");
                parents.add(map);
            }
        }
        for (Map<String, Object> map : parents) {
            long parentId = (long) map.get("id");
            map.put("nodes", getChild(parentId,list));
        }

        return parents;
    }

    public List<Map<String, Object>> getChild(Long id, List<SysDept> list) {
        List<Map<String, Object>> childMap = new ArrayList<>();
        for (SysDept dept : list) {
            Map<String, Object> map = new HashMap<>();
            if (id == dept.getParentId()) {
                map.put("id", dept.getId());
                map.put("text", dept.getDeptName());
                map.put("nodes", "");
                childMap.add(map);
            }
        }

        for (Map<String, Object> m : childMap) {
            long vl = (long) m.get("id");
            m.put("nodes", getChild(vl, list));
        }

        return childMap;
    }

    @RequestMapping("/toaddSysDept")
    public ModelAndView toaddSysDept() {
        return new ModelAndView(VIEW_PATH + "sysDept/SysDept_add");
    }

    @RequestMapping(value = "/doAddSysDept")
    public Map<String, Object> doAddSysDept(SysDept sysDept) {
        try {
            sysDeptService.insertSelective(sysDept);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping(value = "/toEditSysDept")
    public ModelAndView toEditSysDept(@RequestParam(value = "id") long id, Model model) {
        SysDept sysDept = null;
        try {
            sysDept =  sysDeptService.selectByPrimaryKey(id);
            model.addAttribute("sysDept", sysDept);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ModelAndView(VIEW_PATH + "sysDept/SysDept_edit");
    }

    @RequestMapping(value = "/doEditSysDept")
    public Map<String, Object> doEditSysDept(SysDept sysDept) {
        try {
            sysDeptService.updateByPrimaryKeySelective(sysDept);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping(value = "/doDelSysDept")
    public Map<String, Object> doDelSysDept(@RequestParam(value = "id", required = true) long id) {
        try {
            sysDeptService.deleteByPrimaryKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }
}
