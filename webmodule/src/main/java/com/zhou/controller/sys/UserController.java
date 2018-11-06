package com.zhou.controller.sys;

import com.github.pagehelper.PageInfo;
import com.zhou.common.base.BaseController;
import com.zhou.entity.sys.SysUser;
import com.zhou.service.sys.UserService;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/12/25 0025.
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseController {
    @Autowired
    private UserService userService;


    @RequestMapping("/main")
    public ModelAndView toMain() {
        return new ModelAndView(VIEW_PATH + "main");
    }

    @RequestMapping(value = "/list")
    @ResponseBody
    public List<SysUser> getList() {
        return userService.getAll();
    }


    @RequestMapping(value = "/toUserList")
    public ModelAndView toUserList(Model model) {
        List<SysUser> list = userService.getAll();
        model.addAttribute("user", list);
        return new ModelAndView(VIEW_PATH + "user/user_list");
    }

    @RequestMapping("/getUserData")
    @ResponseBody
    public Map<String, Object> getUserData(@RequestParam(value = "pageSize", required = false) int pageSize,
                                           @RequestParam(value = "pageIndex", required = false) int pageIndex,
                                           @RequestParam(value = "username", required = false) String username,
                                           @RequestParam(value = "identy", required = false) String identy) {

        Map<String, Object> map = new HashedMap();
        SysUser sysUser = new SysUser();
        sysUser.setUsername(username);
        sysUser.setUseridenty(identy);
        int count = userService.queryCount(sysUser);
        List<SysUser> list = userService.queryList(sysUser, pageIndex, pageSize);
        PageInfo<SysUser> pageInfo = new PageInfo<>(list);

        map.put("total", pageInfo.getTotal());
        map.put("rows", list);
        return map;
    }

    @RequestMapping("/toadd")
    public ModelAndView toadd() {
        return new ModelAndView(VIEW_PATH + "user/user_add");
    }

    @RequestMapping(value = "/doAdd")
    @ResponseBody
    public Map<String, Object> doAdd(SysUser sysUser) {
        try {
            userService.addObj(sysUser);
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
            user.setId(Integer.parseInt(id));
            sysUser = (SysUser) userService.queryObj(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return responseTo(SUCCESS_FLAG, SUCCESS_MSG, sysUser, flag);
    }

    @RequestMapping(value = "doEdit")
    @ResponseBody
    public Map<String, Object> doEdit(SysUser sysUser) {
        try {
            userService.updateObj(sysUser);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping(value = "doDel")
    @ResponseBody
    public Map<String, Object> doDel(@RequestParam(value = "id", required = true) Integer id) {
        try {
            SysUser sysUser = new SysUser();
            sysUser.setId(id);
            userService.deleteObj(sysUser);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping("/toView")
    public ModelAndView toView(@RequestParam("id") Integer id, Model model) {
        SysUser sysUser = null;
        try {
            SysUser user = new SysUser();
            user.setId(id);
            sysUser = (SysUser) userService.queryObj(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("sysUser", sysUser);
        return new ModelAndView(VIEW_PATH + "user/user_view");
    }
}
