package com.zhou.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DbUtil {

    private static DataColumnType dataColumnTypeEnum;

    private static String driverName;
    private static String url;
    private static String username;
    private static String password;

    public static Connection getConn() {
        Connection conn = null;
        try {
            /**===========从文件中读取链接信息================================*/
//            ResourceBundle resourceBundle = ResourceBundle.getBundle("jdbc");
//            driverName = resourceBundle.getString("driverName");
//            url = resourceBundle.getString("url");
//            username = resourceBundle.getString("username");
//            password = resourceBundle.getString("password");
//            Class.forName(driverName);
//            conn = DriverManager.getConnection(url, username, password);
            /**==========使用properties 获取数据库链接信息=================================*/
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Properties props = new Properties();
            props.put("user", "zlc");
            props.put("password", "zlc");
            props.put("remarksReporting", "true");
            conn = DriverManager.getConnection("jdbc:oracle:thin:@127.0.0.1:1521:orcl", props);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return conn;
    }

    public static void closeCon(Connection connection) {
        try {
            if (null != connection) {
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static DataColumnType getDataColumnTypeEnum() {
        return dataColumnTypeEnum;
    }

    public static void setDataColumnTypeEnum(DataColumnType dataColumnTypeEnum) {
        DbUtil.dataColumnTypeEnum = dataColumnTypeEnum;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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
}
