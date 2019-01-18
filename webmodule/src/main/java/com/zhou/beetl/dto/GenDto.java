package com.zhou.beetl.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GenDto {
    /*
    数据源名称
    */
    private String dataSource;
    /*
    表名
    */
    private String tableName;
    /*
    sql文件存放路径
    */
    private String sqlPath;
    /*
    实体存放路径
    */
    private String entityPath;
    /*
   数据库类型
   */
    private String dbType;

}
