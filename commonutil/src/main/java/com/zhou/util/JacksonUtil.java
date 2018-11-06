package com.zhou.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintStream;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/12/28 0028.
 */
public class JacksonUtil {
    private static ObjectMapper objectMapper = null;

    private static String jsonStr="";

    static {
        objectMapper = new ObjectMapper();
    }

    /**
     * 将对象转换成json
     * */
    public static String toObjJson(Object obj) {
        try {
            jsonStr = objectMapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            try {
                File file =new File("");
                System.setErr(new PrintStream(file.getName()));
            } catch (FileNotFoundException f) {
            }
        }
        return jsonStr;
    }
    /**
     * 将map 转换json
     * */
    public static String toMapJson(Map<String,Object> map){
        try {
            jsonStr = objectMapper.writeValueAsString(map);
        } catch (JsonProcessingException e) {
            try {
                File file =new File("");
                System.setErr(new PrintStream(file.getName()));
            } catch (FileNotFoundException f) {
            }
        }
        return jsonStr;
    }

    /**
     * 将list转换成json
     * */
    public static String toListJson(List list){
        try {
            jsonStr = objectMapper.writeValueAsString(list);
        } catch (JsonProcessingException e) {
            try {
                File file =new File("");
                System.setErr(new PrintStream(file.getName()));
            } catch (FileNotFoundException f) {
            }
        }
        return jsonStr;
    }


    public String getJsonStr() {
        return jsonStr;
    }

    public void setJsonStr(String jsonStr) {
        this.jsonStr = jsonStr;
    }
}
