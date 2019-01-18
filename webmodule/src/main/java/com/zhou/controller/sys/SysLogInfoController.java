package com.zhou.controller.sys;

import com.zhou.common.base.BaseController;
import com.zhou.entity.sys.SysLogInfo;
import com.zhou.service.sys.SysLogInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping(value = "/sysLogInfo")
public class SysLogInfoController extends BaseController {

    @Autowired
    private SysLogInfoService sysLogInfoService;

    @RequestMapping(value = "/doAddSysLoginfo")
    public Map<String, Object> doAddSysLoginfo() {
        SysLogInfo logInfo = new SysLogInfo();
//        logInfo.setId(1l);
        logInfo.setClientIp("127.0.0.1");
        logInfo.setHttpStatusCode("200");
        logInfo.setMethod("post");
        logInfo.setParamData("{js:js}");
        logInfo.setReturnData("{mm:mm}");
        logInfo.setSessionId("12121212121212");
//        logInfo.setTime(new Date());
        try {
            sysLogInfoService.insertSysloginfo(logInfo);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return success();
    }
}
