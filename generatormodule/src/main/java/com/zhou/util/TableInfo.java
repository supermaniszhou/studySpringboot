package com.zhou.util;

import com.zhou.strategy.NamingStrategy;
import org.apache.commons.lang3.StringUtils;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class TableInfo {

    //其他数据库不需要这个方法 oracle和db2需要
    private static String getSchema(Connection conn) throws Exception {
        String schema;
        schema = conn.getMetaData().getUserName();
        if ((schema == null) || (schema.length() == 0)) {
            throw new Exception("ORACLE数据库模式不允许为空");
        }
        return schema.toUpperCase().toString();

    }

    public static void getTables(Connection connection, String inTableName) {
        try {
            DatabaseMetaData metaData = connection.getMetaData();
//            ResultSet rs = metaData.getTables(null, convertDatabaseCharsetType("zlc", "oracle"), null, new String[]{"TABLE"});
            ResultSet rs = metaData.getTables(null, getSchema(connection), null, new String[]{"TABLE"});
            List<List<String>> mapLinkedList = new LinkedList<>();
            String tableName = "";

            List<String> columnList = new LinkedList<>();//列集合
            List<String> fieldList = new LinkedList<>();//属性集合
            Map<String, String> columnFieldMap = new LinkedHashMap<>();//字段 属性 map
            Map<String, String> fieldRemarks = new LinkedHashMap<>();// 属性  注释 map
            String tableSchem = "";//表模式
            while (rs.next()) {
                if (rs.getString(4) != null && (rs.getString(4).equalsIgnoreCase("TABLE") || rs
                        .getString(4).equalsIgnoreCase("VIEW"))) {
                    tableName = rs.getString(3).toLowerCase();
                    if (inTableName.equalsIgnoreCase(tableName)) {
                        try {
                            ResultSet resultSet = connection.getMetaData().getColumns(null,
                                    getSchema(connection), tableName.toUpperCase(), "%");
                            while (resultSet.next()) {
                                List<String> list = new LinkedList<>();

                                String typeName = resultSet.getString("TYPE_NAME");
                                String columnName = resultSet.getString("COLUMN_NAME");
                                String memo = StringUtils.trimToEmpty(resultSet.getString("REMARKS"));
                                tableSchem = resultSet.getString("TABLE_SCHEM");
                                String lent=resultSet.getString("COLUMN_SIZE");//获取字段类型的长度

                                list.add(DataColumnType.processOracleType(typeName,lent));
                                list.add(NamingStrategy.underlineToCamel(columnName));
                                list.add(memo);
                                mapLinkedList.add(list);

                                columnList.add(columnName);
                                fieldList.add(NamingStrategy.underlineToCamel(columnName));

                                columnFieldMap.put(columnName, NamingStrategy.underlineToCamel(columnName));

                                fieldRemarks.put(NamingStrategy.underlineToCamel(columnName), memo);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    } else {
//                        System.out.println("表不存在");
                    }
                }
            }
            String formatName = org.apache.velocity.util.StringUtils.capitalizeFirstLetter(NamingStrategy.underlineToCamel(inTableName));
            FileUtil filiU = new FileUtil();
            List<String> list2 = filiU.getList2();
            VolecityOperate.loadTemplateToInit(mapLinkedList, formatName, list2, inTableName, columnList, fieldList, columnFieldMap, tableSchem,fieldRemarks);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e1) {
            e1.printStackTrace();
        }

    }


}
