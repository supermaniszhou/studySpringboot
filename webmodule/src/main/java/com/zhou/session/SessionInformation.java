package com.zhou.session;

import com.zhou.entity.sys.SysMenu;
import com.zhou.entity.sys.SysUser;

import java.util.*;

/**
 * @Project : studySpringboot
 * @Package Name : com.zhou.session
 * @Description : session实体
 * @Author : lilian
 * @Creation Date : 2018/11/15 14:58
 * @ModificationHistory Who When What
 * _________ ________________ ____________________________________________
 */
public class SessionInformation {
    private SysUser sysUser;
    private String userOrgName;
    /*private List<SysRole> roleList = new ArrayList();*/
    private String roleIdStr = "";
    private String roleNameStr = "";
    private List<SysMenu> menuList = new ArrayList();
    private Map<String, Object> menuMapTree = new HashMap();
    private String menuIdStr = "";
    private String menuJson;

    public SessionInformation() {
    }

    public SysUser getSysUser() {
        return sysUser;
    }

    public void setSysUser(SysUser sysUser) {
        this.sysUser = sysUser;
    }

    public String getUserOrgName() {
        return userOrgName;
    }

    public void setUserOrgName(String userOrgName) {
        this.userOrgName = userOrgName;
    }

    public String getRoleIdStr() {
        return roleIdStr;
    }

    public void setRoleIdStr(String roleIdStr) {
        this.roleIdStr = roleIdStr;
    }

    public String getRoleNameStr() {
        return roleNameStr;
    }

    public void setRoleNameStr(String roleNameStr) {
        this.roleNameStr = roleNameStr;
    }

    public List<SysMenu> getMenuList() {
        return menuList;
    }

    public void setMenuList(List<SysMenu> menuList) {
        this.menuList = menuList;
    }

    public Map<String, Object> getMenuMapTree() {
        return menuMapTree;
    }

    public void setMenuMapTree(Map<String, Object> menuMapTree) {
        this.menuMapTree = menuMapTree;
    }

    public String getMenuIdStr() {
        return menuIdStr;
    }

    public void setMenuIdStr(String menuIdStr) {
        this.menuIdStr = menuIdStr;
    }

    public String getMenuJson() {
        return menuJson;
    }

    public void setMenuJson(String menuJson) {
        this.menuJson = menuJson;
    }
}
