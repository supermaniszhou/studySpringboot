package com.zhou.main;


import com.zhou.util.DbUtil;
import com.zhou.util.TableInfo;

import java.sql.Connection;

public class MyGeneratorMain {
    public static void main(String[] args) {
        Connection connection = DbUtil.getConn();
        String inTableName = "SYS_DEPT";
        TableInfo.getTables(connection, inTableName);
    }
}
