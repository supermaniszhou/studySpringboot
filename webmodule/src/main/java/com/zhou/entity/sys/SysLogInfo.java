package com.zhou.entity.sys;

import java.math.*;
import java.util.Date;
import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;


/*
 *
 * gen by beetlsql 2019-01-17
 */
@Setter
@Getter
public class SysLogInfo {
    private String clientIp;
    private String httpStatusCode;
    private Long id;
    private String method;
    private String paramData;
    private String returnData;
    private String returnTime;
    private String sessionId;
    private Long timeConsuming;
    private String type;
    private String uri;
    private Date time;

    public SysLogInfo() {
    }


}
