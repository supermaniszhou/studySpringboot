package com.zhou.controller.sys;

import com.zhou.common.base.BaseController;
import com.zhou.entity.sys.SysMenu;
import com.zhou.service.sys.SysMenuService;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * Created by Administrator on 2017/12/25 0025.
 */
@RestController
@RequestMapping("/sysMenu")
public class SysMenuController extends BaseController {
    @Autowired
    private SysMenuService sysMenuService;


    @RequestMapping(value = "/toSysMenuList")
    public ModelAndView toSysMenuList(Model model) {
        return new ModelAndView(VIEW_PATH + "sysMenu/SysMenu_list");
    }

    @RequestMapping("/getSysMenuData")
    @ResponseBody
    public Map<String, Object> getSysMenuData() {

        Map<String, Object> map = new HashedMap();
        SysMenu sysMenu = new SysMenu();
        int count = sysMenuService.queryCount(sysMenu);
        List<SysMenu> list = sysMenuService.queryList(sysMenu, 0, 0);
        List<Map<String, Object>> mapList = new ArrayList<>();
        for (SysMenu menu : list
                ) {
            Map<String, Object> m = new HashMap<>();
            m.put("id", menu.getId());
            m.put("pid", menu.getMenuParent());
            m.put("menuName", menu.getMenuName());
            m.put("url", menu.getMenuUrl());
            mapList.add(m);
        }
        map.put("total", count);
        map.put("rows", mapList);
        return map;
    }

    @RequestMapping(value = "/toAddMenuPage")
    public ModelAndView toAddMenuPage(HttpServletRequest request) {
        return new ModelAndView(VIEW_PATH + "sysMenu/sysMenu_add");
    }


    @RequestMapping(value = "/doAdd")
    @ResponseBody
    public Map<String, Object> doAdd(SysMenu sysMenu) {
        try {
            sysMenuService.addObj(sysMenu);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping(value = "toEdit")
    @ResponseBody
    public Map<String, Object> toEdit(@RequestParam(value = "id") String id, @RequestParam("flag") String flag) {
        SysMenu sysMenu = null;
        try {
            SysMenu obj = new SysMenu();
            obj.setId(Integer.parseInt(id));
            sysMenu = (SysMenu) sysMenuService.queryObj(obj);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return responseTo(SUCCESS_FLAG, SUCCESS_MSG, sysMenu, flag);
    }

    @RequestMapping(value = "doEdit")
    @ResponseBody
    public Map<String, Object> doEdit(SysMenu sysMenu) {
        try {
            sysMenuService.updateObj(sysMenu);
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
            SysMenu sysMenu = new SysMenu();
            sysMenu.setId(id);
            sysMenuService.deleteObj(sysMenu);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping(value = "/getMenuList")
    @ResponseBody
    public List<Map<String, Object>> getMenuList(@RequestParam(value = "flag", required = false) String flag) {
        List<SysMenu> sysMenuList = null;
        List<Map<String, Object>> parent = new LinkedList<>();
        SysMenu menu = new SysMenu();
        try {
            if (null != flag && !"".equals(flag)) {
                menu.setFlag(flag);
                menu.setYesNo(0);
            }  else {
                menu.setFlag(flag);
            }
            sysMenuList = sysMenuService.getAll(menu);
            //获取一级菜单
            for (SysMenu sysMenu : sysMenuList) {
                Map<String, Object> map = new LinkedHashMap<>();
                if(null != sysMenu.getMenuParent()){
                    if (sysMenu.getMenuParent() == 0 || sysMenu.getMenuParent() == -1) {
                        map.put("id", sysMenu.getId());
                        map.put("text", sysMenu.getMenuName());
                        map.put("href", sysMenu.getMenuUrl());
                        map.put("nodes", "");
                        parent.add(map);
                    }
                }
            }
            //为一级菜单设置子菜单
            for (Map<String, Object> m : parent) {
                Integer idVal = (Integer) m.get("id");
                m.put("nodes", getChild(idVal, sysMenuList));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return parent;
    }

    public List<Map<String, Object>> getChild(Integer pid, List<SysMenu> allList) {
        List<Map<String, Object>> child = new LinkedList<>();
        for (SysMenu sysMenu : allList) {
            Map<String, Object> map = new LinkedHashMap<>();
            if (null != sysMenu.getMenuParent() && sysMenu.getMenuParent() != 0) {
                if (pid == sysMenu.getMenuParent()) {
                    map.put("id", sysMenu.getId());
                    map.put("text", sysMenu.getMenuName());
                    map.put("href", sysMenu.getMenuUrl());
                    child.add(map);
                }
            }
        }

        for (Map<String, Object> menu : child) {
            if (null == menu.get("href") || "".equals(menu.get("href"))) {
                menu.put("nodes", getChild((Integer) menu.get("id"), allList));
            }
        }

        if (child.size() == 0) {
            return null;
        }
        return child;
    }

}
