package com.zhou.entity.sys;

import java.io.Serializable;
import java.util.Date;

public class SysLog implements Serializable{
    private Integer id;//编号
    private String userId;//用户ID
    private String userName;//用户名称
    private String userIp;//用户IP地址
    private String userMac;//用户Mac地址
    private String oporateComment;//操作内容
    private Date oporateTime;//操作时间
    private Integer opotateType;//操作类型
    public SysLog(){}
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getUserIp() {
        return userIp;
    }

    public void setUserIp(String userIp) {
        this.userIp = userIp;
    }
    public String getUserMac() {
        return userMac;
    }

    public void setUserMac(String userMac) {
        this.userMac = userMac;
    }
    public String getOporateComment() {
        return oporateComment;
    }

    public void setOporateComment(String oporateComment) {
        this.oporateComment = oporateComment;
    }
    public Date getOporateTime() {
        return oporateTime;
    }

    public void setOporateTime(Date oporateTime) {
        this.oporateTime = oporateTime;
    }
    public Integer getOpotateType() {
        return opotateType;
    }

    public void setOpotateType(Integer opotateType) {
        this.opotateType = opotateType;
    }

}

