package com.zhou.util;

import java.util.UUID;

/**
 * Created by Administrator on 2017/12/26 0026.
 */
public class GenerateUUID {
    public static String getUUID(){
        return UUID.randomUUID().toString().replace("-","");
    }
}
