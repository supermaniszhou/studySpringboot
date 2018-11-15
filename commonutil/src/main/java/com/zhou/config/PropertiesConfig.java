package com.zhou.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * @Project : studySpringboot
 * @Package Name : com.zhou.config
 * @Description : 读取配置文件
 * @Author : lilian
 * @Creation Date : 2018/11/15 14:49
 * @ModificationHistory Who When What
 * _________ ________________ ____________________________________________
 */
@Configuration
@ConfigurationProperties(
        prefix = "zlc"
)
@PropertySource(
    value = {"classpath:application.properties"},
    ignoreResourceNotFound = true,
    encoding = "UTF-8"
)
public class PropertiesConfig {
    private String sessionInfo;
    private String basePath;
    private String sessionInactiveTime;
    private String pathUploadFile;
    private String pathDownloadFile;
    private String filterExcludePath;//过滤排除路径
    private String defaultUserPwd;

    public PropertiesConfig() {
    }

    public String getSessionInfo() {
        return sessionInfo;
    }

    public void setSessionInfo(String sessionInfo) {
        this.sessionInfo = sessionInfo;
    }

    public String getBasePath() {
        return basePath;
    }

    public void setBasePath(String basePath) {
        this.basePath = basePath;
    }

    public String getSessionInactiveTime() {
        return sessionInactiveTime;
    }

    public void setSessionInactiveTime(String sessionInactiveTime) {
        this.sessionInactiveTime = sessionInactiveTime;
    }

    public String getPathUploadFile() {
        return pathUploadFile;
    }

    public void setPathUploadFile(String pathUploadFile) {
        this.pathUploadFile = pathUploadFile;
    }

    public String getPathDownloadFile() {
        return pathDownloadFile;
    }

    public void setPathDownloadFile(String pathDownloadFile) {
        this.pathDownloadFile = pathDownloadFile;
    }

    public String getFilterExcludePath() {
        return filterExcludePath;
    }

    public void setFilterExcludePath(String filterExcludePath) {
        this.filterExcludePath = filterExcludePath;
    }

    public String getDefaultUserPwd() {
        return defaultUserPwd;
    }

    public void setDefaultUserPwd(String defaultUserPwd) {
        this.defaultUserPwd = defaultUserPwd;
    }
}
