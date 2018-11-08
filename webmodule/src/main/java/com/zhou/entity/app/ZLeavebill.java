package com.zhou.entity.app;
import java.lang.*;
import java.io.*;
import java.util.Date;

public class ZLeavebill implements Serializable{
    private String id;//编号
    private Integer days;//请假天数
    private String content;//请假类型
    private String remark;//请假内容
    private Date leaveStarttime;//请假开始时间
    private Integer state;//状态
    private String userId;//请假人编号
    private String userName;//请假人姓名
    private String userDept;//所属单位
    private Date leaveEndtime;//请假截止日期
    public ZLeavebill(){}
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public Integer getDays() {
        return days;
    }

    public void setDays(Integer days) {
        this.days = days;
    }
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
    public Date getLeaveStarttime() {
        return leaveStarttime;
    }

    public void setLeaveStarttime(Date leaveStarttime) {
        this.leaveStarttime = leaveStarttime;
    }
    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
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
    public String getUserDept() {
        return userDept;
    }

    public void setUserDept(String userDept) {
        this.userDept = userDept;
    }
    public Date getLeaveEndtime() {
        return leaveEndtime;
    }

    public void setLeaveEndtime(Date leaveEndtime) {
        this.leaveEndtime = leaveEndtime;
    }

}

