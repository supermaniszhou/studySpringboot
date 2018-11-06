package com.zhou.entity.sys;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
//@AllArgsConstructor
public class SysMenu implements Serializable {
    private Integer id;//
    private String menuName;//菜单名称
    private Integer menuLevel;//等级
    private Integer menuParent;//父级
    private String menuOrder;//排序
    private String menuChild;//子级
    private String memo;//描述
    private String menuUrl;//地址
    private String menuIcon;//图标
    private Integer yesNo;//是否启用

    private String parentName;//父级菜单名称




}

