package com.zhou.controller.sys;

import com.github.pagehelper.PageInfo;
import com.zhou.common.base.BaseController;
import com.zhou.entity.sys.SysUser;
import com.zhou.service.sys.SysUserService;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/12/25 0025.
 */
@RestController
@RequestMapping("/user")
public class SysUserController extends BaseController {
    @Autowired
    private SysUserService userService;


    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }

    @RequestMapping(value = "/toUserList")
    public ModelAndView toUserList(Model model) {
        return new ModelAndView(VIEW_PATH + "user/user_list");
    }

    @RequestMapping("/getUserData")
    @ResponseBody
    public Map<String, Object> getUserData(@RequestParam(value = "pageSize", required = false) int pageSize,
                                           @RequestParam(value = "pageIndex", required = false) int pageIndex,
                                           @RequestParam(value = "username", required = false) String username,
                                           @RequestParam(value = "identy", required = false) String identy) {

        SysUser sysUser = new SysUser();
        sysUser.setUsername(username);
        sysUser.setUseridenty(identy);
        List<SysUser> list = userService.selectPageList(sysUser, pageIndex, pageSize);
        PageInfo<SysUser> pageInfo = new PageInfo<>(list);

        return responseTo(pageInfo.getTotal(), list);
    }

    @RequestMapping("/toadd")
    public ModelAndView toadd() {
        return new ModelAndView(VIEW_PATH + "user/sysUser_add");
    }

    @RequestMapping(value = "/doAddSysUser")
    public Map<String, Object> doAddSysUser(SysUser sysUser) {
        System.out.println("-----------------------------");
        try {
            userService.insertSelective(sysUser);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping(value = "toEditSysUser")
    public ModelAndView toEdit(@RequestParam(value = "id") long id, Model model) {
        SysUser sysUser = null;
        try {
            sysUser = userService.selectByPrimaryKey(id);
            model.addAttribute("sysUser", sysUser);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ModelAndView(VIEW_PATH + "user/sysUser_edit");
    }

    @RequestMapping(value = "doEditSysUser")
    public Map<String, Object> doEditSysUser(SysUser sysUser) {
        try {
            userService.updateByPrimaryKeySelective(sysUser);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping(value = "doDelSysUser")
    public Map<String, Object> doDelSysUser(@RequestParam(value = "id", required = true) Long id) {
        try {
            userService.deleteByPrimaryKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }


}
