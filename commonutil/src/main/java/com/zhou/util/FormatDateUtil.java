package com.zhou.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class FormatDateUtil {

    /**
     * 日期格式化 并返回格式化后的字符串
     * */
    public static String dateToString(Date date, String format) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
        return simpleDateFormat.format(date);
    }

    public static void main(String[] args) {
        String val=FormatDateUtil.dateToString(new Date(),"yyyyMMddHHmmssSSS");
        System.out.println(val);
    }

}
