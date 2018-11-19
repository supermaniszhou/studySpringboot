package com.zhou.entity.sys;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.lang.*;
import java.math.*;
import java.io.*;
import java.util.*;
@Setter
@Getter
public class SysRole implements Serializable{
    private Integer id;//

    private String roleName;//角色名称

    private Integer createUserid;//创建者编号

    private String createUsername;//创建者姓名

    private Integer createUserOrg;//创建者部门

    private String createUserOrgname;//创建者部门

    private Date createTime;//创建时间

    private Date updateTime;//修改时间

    private Integer isDel;//删除状态：0：未删除，1：已删除

    private Integer isEnable;//是否启用：0启用，1：不启用



}

