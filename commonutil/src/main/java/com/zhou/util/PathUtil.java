package com.zhou.util;

/**
 * Created by Administrator on 2018/5/23.
 */

public class PathUtil {

    public static   String getClassRootPath() {
        String path = PathUtil.class.getResource("/").getPath();
        return path;
    }

}
