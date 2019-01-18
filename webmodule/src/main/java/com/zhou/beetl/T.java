package com.zhou.beetl;


import com.zhou.util.DbUtil;
import org.beetl.sql.core.*;
import org.beetl.sql.core.db.DBStyle;
import org.beetl.sql.core.db.MySqlStyle;
import org.beetl.sql.core.db.OracleStyle;
import org.beetl.sql.ext.DebugInterceptor;
import org.beetl.sql.ext.gen.GenConfig;
import org.springframework.util.ResourceUtils;

import java.sql.Connection;

public class T {

    public static void main(String[] args) throws Exception{
        Connection connection = DbUtil.getConnection();
        DBStyle dbStyle;
        ConnectionSource source = ConnectionSourceHelper.getSimple(DbUtil.DRIVER, DbUtil.URL, DbUtil.USERNAME, DbUtil.PASSWORD);
        //数据库类型
        dbStyle = new OracleStyle();
        // sql语句目录
        SQLLoader loader = new ClasspathLoader( ResourceUtils.getURL("classpath:beetlSql/").getPath());
        // 数据库命名跟java命名转化规则，UnderlinedNameConversion 指数据库表和列是下划线分割
        UnderlinedNameConversion nc = new  UnderlinedNameConversion();
        // 最后，创建一个SQLManager,DebugInterceptor 不是必须的，但可以通过它查看sql执行情况
        SQLManager sqlManager = new SQLManager(dbStyle,loader,source,nc,new Interceptor[]{new DebugInterceptor()});

        //生成实体类，以及sql的md文件
//        sqlManager.genSQLFile("SYS_LOG_INFO",new GenConfig());
        sqlManager.genPojoCode("SYS_LOG_INFO","com.zhou.entity.sys");
    }

}
