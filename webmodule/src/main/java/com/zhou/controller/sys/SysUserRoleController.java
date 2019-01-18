package com.zhou.controller.sys;

import com.github.pagehelper.PageInfo;
import com.zhou.common.base.BaseController;
import com.zhou.entity.sys.SysUserRole;
import com.zhou.service.sys.SysUserRoleService;
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

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/12/25 0025.
 */
@RestController
@RequestMapping("/sysUserRole")
public class SysUserRoleController extends BaseController {
    @Autowired
    private SysUserRoleService sysUserRoleService;


    @RequestMapping(value = "/toSysUserRoleList")
    public ModelAndView toSysUserRoleList(Model model) {
        return new ModelAndView(VIEW_PATH + "sysUserRole/SysUserRole_list");
    }

    @RequestMapping("/getSysUserRoleData")
    public Map<String, Object> getSysUserRoleData(SysUserRole sysUserRole) {

        List<SysUserRole> list = null;
        PageInfo<SysUserRole> pageInfo = null;
        try {
            list = sysUserRoleService.selectPageList(sysUserRole, sysUserRole.getPageIndex(), sysUserRole.getPageSize());
            pageInfo = new PageInfo<>(list);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return responseTo(pageInfo.getTotal(), list);
    }

    @RequestMapping("/toaddSysUserRole")
    public ModelAndView toaddSysUserRole() {
        return new ModelAndView(VIEW_PATH + "sysUserRole/SysUserRole_add");
    }

    @RequestMapping(value = "/doAddSysUserRole")
    public Map<String, Object> doAddSysUserRole(SysUserRole sysUserRole) {
        try {
            sysUserRoleService.insertSelective(sysUserRole);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping(value = "/toEditSysUserRole")
    public ModelAndView toEditSysUserRole(@RequestParam(value = "id") long id, Model model) {
        SysUserRole sysUserRole = null;
        try {
            sysUserRole = (SysUserRole) sysUserRoleService.selectByPrimaryKey(id);
            model.addAttribute("sysUserRole", sysUserRole);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ModelAndView(VIEW_PATH + "sysUserRole/SysUserRole_edit");
    }

    @RequestMapping(value = "/doEditSysUserRole")
    public Map<String, Object> doEditSysUserRole(SysUserRole sysUserRole) {
        try {
            sysUserRoleService.updateByPrimaryKeySelective(sysUserRole);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping(value = "/doDelSysUserRole")
    public Map<String, Object> doDelSysUserRole(@RequestParam(value = "id", required = true) long id) {
        try {
            SysUserRole userRole = new SysUserRole();
            userRole.setId(id);
            sysUserRoleService.deleteByPrimaryKey(userRole);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }
}
