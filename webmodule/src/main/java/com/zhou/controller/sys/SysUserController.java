package com.zhou.controller.sys;

import com.github.pagehelper.PageInfo;
import com.zhou.common.base.BaseController;
import com.zhou.entity.sys.SysUser;
import com.zhou.service.sys.SysUserService;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
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
@RequestMapping("/user")
public class SysUserController extends BaseController {
    @Autowired
    private SysUserService userService;

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

    @RequestMapping(value = "toEdit")
    @ResponseBody
    public Map<String, Object> toEdit(@RequestParam(value = "id") String id, @RequestParam("flag") String flag) {
        SysUser sysUser = null;
        try {
            SysUser user = new SysUser();
            user.setId(Long.parseLong(id));
            sysUser = userService.selectBySysUser(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return responseTo(SUCCESS_FLAG, SUCCESS_MSG, sysUser, flag);
    }

    @RequestMapping(value = "doEdit")
    @ResponseBody
    public Map<String, Object> doEdit(SysUser sysUser) {
        try {
            userService.updateByPrimaryKeySelective(sysUser);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping(value = "doDel")
    @ResponseBody
    public Map<String, Object> doDel(@RequestParam(value = "id", required = true) Long id) {
        try {
            SysUser sysUser = new SysUser();
            sysUser.setId(id);
            userService.deleteByPrimaryKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping("/toView")
    public ModelAndView toView(@RequestParam("id") Long id, Model model) {
        SysUser sysUser = null;
        try {
            SysUser user = new SysUser();
            user.setId(id);
            sysUser = userService.selectBySysUser(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("sysUser", sysUser);
        return new ModelAndView(VIEW_PATH + "user/user_view");
    }
}
