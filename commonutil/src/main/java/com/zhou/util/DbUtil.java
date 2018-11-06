package com.zhou.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;

/**
 * Created by Administrator on 2018/4/19.
 */
public class DbUtil {
    private final static Logger LOGGER = LoggerFactory.getLogger(DbUtil.class);


    private static final String DRIVER = "oracle.jdbc.driver.OracleDriver";
    private static final String URL = "jdbc:oracle:thin:@127.0.0.1:1521:orcl";
    private static final String USERNAME = "zlc";
    private static final String PASSWORD = "zlc";

    private static final String SQL = "SELECT * FROM ";// 数据库操作

    static {
        try {
            Class.forName(DRIVER);
        } catch (ClassNotFoundException e) {
            LOGGER.error("can not load jdbc driver", e);
        }
    }

    /**
     * 获取数据库连接
     *
     * @return
     */
    public static Connection getConnection() {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
        } catch (SQLException e) {
            LOGGER.error("get connection failure", e);
        }
        return conn;
    }

    public static void closeConnection(Connection conn) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                LOGGER.error("close connection failure", e);
            }
        }
    }

    public static void main(String[] args) {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;

        try {
            String sql = "select * from USERINFO";
            conn = getConnection();
            st = conn.createStatement();
            rs = st.executeQuery(sql);
            ResultSetMetaData meta = rs.getMetaData();
//            for (int i = 1; i <= meta.getColumnCount(); i++) {
//                System.out.println("field======" + meta.getColumnName(i));//获取字段名
//            }

            for (int j=1;j<=meta.getColumnCount();j++){
                System.out.println("type======" + meta.getColumnTypeName(j));//获取字段数据类型
                System.out.println("type======" + meta.getColumnClassName(j));//获取字段数据类型
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
    }


}
