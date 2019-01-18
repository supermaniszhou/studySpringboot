package com.zhou.entity.sys;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

public class SysUser implements Serializable{
    private String roleNames;

    private Long id;

    private String realname;

    private String username;

    private String useridenty;

    private String password;

    private String email;

    private String address;

    private String phone;

    private Short age;

    private Short sex;

    private String qq;

    private String weixin;



    private String isdel;

    private String isdisable;

    private Date createtime;

    private Date updatetime;

    private Short loginstatus;

    private String meno;



    private String userOrg;

    private Short userHeight;

    private String picPath;

    private String userBirthday;

    public String getRoleNames() {
        return roleNames;
    }

    public void setRoleNames(String roleNames) {
        this.roleNames = roleNames;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public Short getAge() {
        return age;
    }

    public void setAge(Short age) {
        this.age = age;
    }

    public Short getSex() {
        return sex;
    }

    public void setSex(Short sex) {
        this.sex = sex;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq == null ? null : qq.trim();
    }

    public String getWeixin() {
        return weixin;
    }

    public void setWeixin(String weixin) {
        this.weixin = weixin == null ? null : weixin.trim();
    }

    public String getUseridenty() {
        return useridenty;
    }

    public void setUseridenty(String useridenty) {
        this.useridenty = useridenty == null ? null : useridenty.trim();
    }

    public String getIsdel() {
        return isdel;
    }

    public void setIsdel(String isdel) {
        this.isdel = isdel == null ? null : isdel.trim();
    }

    public String getIsdisable() {
        return isdisable;
    }

    public void setIsdisable(String isdisable) {
        this.isdisable = isdisable == null ? null : isdisable.trim();
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

    public Short getLoginstatus() {
        return loginstatus;
    }

    public void setLoginstatus(Short loginstatus) {
        this.loginstatus = loginstatus;
    }

    public String getMeno() {
        return meno;
    }

    public void setMeno(String meno) {
        this.meno = meno == null ? null : meno.trim();
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname == null ? null : realname.trim();
    }

    public String getUserOrg() {
        return userOrg;
    }

    public void setUserOrg(String userOrg) {
        this.userOrg = userOrg == null ? null : userOrg.trim();
    }

    public Short getUserHeight() {
        return userHeight;
    }

    public void setUserHeight(Short userHeight) {
        this.userHeight = userHeight;
    }

    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath == null ? null : picPath.trim();
    }

    public String getUserBirthday() {
        return userBirthday;
    }

    public void setUserBirthday(String userBirthday) {
        this.userBirthday = userBirthday == null ? null : userBirthday.trim();
    }
}