package com.zhou.entity.sys;

import java.lang.*;
import java.math.*;
import java.io.*;
import java.util.Date;

public class SysUser implements Serializable {
    private Integer id;//
    private String username;//姓名
    private String password;//密码
    private String email;//邮箱
    private String address;//地址
    private String phone;//联系方式
    private Integer age;//年龄
    private Integer sex;//性别
    private String qq;//QQ号
    private String weixin;//微信号
    private String useridenty;//身份证号
    private String isdel;//是否删除：0未删除，1：已删除
    private String isdisable;//是否启用：0不启用，1：启用
    private Date createtime;//创建时间
    private Date updatetime;//修改时间
    private Integer loginstatus;//登录状态
    private String meno;//描述
    private String realname;//真实姓名
    private String userOrg;//所属机构
    private Integer userHeight;//身高
    private String picPath;//头像路径
    private String userBirthday;//出生日期

    public SysUser() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public String getWeixin() {
        return weixin;
    }

    public void setWeixin(String weixin) {
        this.weixin = weixin;
    }

    public String getUseridenty() {
        return useridenty;
    }

    public void setUseridenty(String useridenty) {
        this.useridenty = useridenty;
    }

    public String getIsdel() {
        return isdel;
    }

    public void setIsdel(String isdel) {
        this.isdel = isdel;
    }

    public String getIsdisable() {
        return isdisable;
    }

    public void setIsdisable(String isdisable) {
        this.isdisable = isdisable;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
    }

    public Integer getLoginstatus() {
        return loginstatus;
    }

    public void setLoginstatus(Integer loginstatus) {
        this.loginstatus = loginstatus;
    }

    public String getMeno() {
        return meno;
    }

    public void setMeno(String meno) {
        this.meno = meno;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public String getUserOrg() {
        return userOrg;
    }

    public void setUserOrg(String userOrg) {
        this.userOrg = userOrg;
    }

    public Integer getUserHeight() {
        return userHeight;
    }

    public void setUserHeight(Integer userHeight) {
        this.userHeight = userHeight;
    }

    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    public String getUserBirthday() {
        return userBirthday;
    }

    public void setUserBirthday(String userBirthday) {
        this.userBirthday = userBirthday;
    }

}

