package com.zhou.util;

public class DataColumnType {
    /**
     * MYSQL字段类型转换
     *
     * @param type 字段类型
     * @return JAVA类型
     */
    public static String processMySqlType(String type) {
        String t = type.toLowerCase();
        if (t.contains("char") || t.contains("text")) {
            return "String";
        } else if (t.contains("bigint")) {
            return "Long";
        } else if (t.contains("int")) {
            return "Integer";
        } else if (t.contains("date") || t.contains("time") || t.contains("year")) {
            return "Date";
        } else if (t.contains("text")) {
            return "String";
        } else if (t.contains("bit")) {
            return "Boolean";
        } else if (t.contains("decimal")) {
            return "BigDecimal";
        } else if (t.contains("blob")) {
            return "byte[]";
        } else if (t.contains("float")) {
            return "Float";
        } else if (t.contains("double")) {
            return "Double";
        } else if (t.contains("json") || t.contains("enum")) {
            return "String";
        }
        return "String";
    }

    /**
     * ORACLE字段类型转换
     *
     * @param type 字段类型
     * @return JAVA类型
     */
    public static String processOracleType(String type,String length) {
        String t = type.toUpperCase();
        if (t.contains("CHAR") || t.contains("VARCHAR2")|| t.contains("VARCHAR")) {
            return "String";
        } else if (t.contains("DATE") || t.contains("TIMESTAMP")) {
            return "Date";
        } else if (t.contains("NUMBER")) {
            if (length.trim().length()==1) {
                return "Integer";
            } else if (length.trim().length()==2) {
                return "Long";
            }
        } else if (t.contains("FLOAT")) {
            return "Float";
        } else if (t.contains("BLOB")) {
            return "Object";
        } else if (t.contains("RAW")) {
            return "byte[]";
        }
        return "String";
    }
}
