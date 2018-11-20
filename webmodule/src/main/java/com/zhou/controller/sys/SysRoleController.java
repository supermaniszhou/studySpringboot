package com.zhou.controller.sys;

import com.github.pagehelper.PageInfo;
import com.zhou.common.base.BaseController;
import com.zhou.entity.sys.SysRole;
import com.zhou.service.sys.SysRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;


/**
 * Created by Administrator on 2017/12/25 0025.
 */
@RestController
@RequestMapping("/sysRole")
public class SysRoleController extends BaseController {
    @Autowired
    private SysRoleService sysRoleService;


    @RequestMapping(value = "/toSysRoleList")
    public ModelAndView toSysRoleList(Model model) {
        return new ModelAndView(VIEW_PATH + "sysRole/SysRole_list");
    }

    @RequestMapping("/getSysRoleData")
    public Map<String, Object> getSysRoleData(SysRole sysRole) {

        List<SysRole> list=null;
        PageInfo<SysRole> pageInfo=null;
        try {
            list = sysRoleService.selectPageList(sysRole, sysRole.getPageIndex(), sysRole.getPageSize());
            pageInfo = new PageInfo<>(list);
        }catch (Exception e){
            e.printStackTrace();
        }
        return responseTo(pageInfo.getTotal(), list);
    }

    @RequestMapping("/toaddSysRole")
    public ModelAndView toaddSysRole() {
        return new ModelAndView(VIEW_PATH + "sysRole/SysRole_add");
    }

    @RequestMapping(value = "/doAddSysRole")
    public Map<String, Object> doAddSysRole(SysRole sysRole) {
        try {
            sysRoleService.insertSelective(sysRole);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping(value = "toEditSysRole")
    public ModelAndView toEditSysRole(@RequestParam(value = "id") long id, Model model) {
        SysRole sysRole = null;
        try {
            sysRole = (SysRole) sysRoleService.selectByPrimaryKey(id);
            model.addAttribute("sysRole", sysRole);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ModelAndView(VIEW_PATH + "sysRole/SysRole_edit");
    }

    @RequestMapping(value = "doEditSysRole")
    public Map<String, Object> doEditSysRole(SysRole sysRole) {
        try {
            sysRoleService.updateByPrimaryKeySelective(sysRole);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping(value = "doDelSysRole")
    public Map<String, Object> doDelSysRole(@RequestParam(value = "id", required = true) long id) {
        try {
            sysRoleService.deleteByPrimaryKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }
}
