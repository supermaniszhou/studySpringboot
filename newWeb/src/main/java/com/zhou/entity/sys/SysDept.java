package com.zhou.entity.sys;
import lombok.Data;

import java.lang.*;
import java.math.*;
import java.io.*;
import java.util.*;
import com.zhou.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SysDept extends BaseEntity implements Serializable{
    private Long id;//

    private String deptName;//部门名称

    private Long parentId;//上级编号

    private Long dpetRegion;//所属区域

    private String deptLogo;//部门LOGO

    private String deptPicPath;//部门图片

    private Integer deptLevel;//部门级别

    private Long deptOrder;//部门排序

    private Long createUserid;//

    private String createUsername;//

    private Long createUserOrg;//

    private String createUserOrgname;//

    private Date createTime;//

    private Date updateTime;//

    private Integer isDelRadio;//

    private Integer isEnableRadio;//



}

