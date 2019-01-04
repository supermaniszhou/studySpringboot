package com.zhou.common.base;

import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/12/26 0026.
 */
public class BaseController {
    public static final String SUCCESS_FLAG = "0";
    public static final String ERROR_FLAG = "-1";
    public static final String SUCCESS_MSG = "成功";
    public static final String ERROR_MSG = "出错";
    public static final String VIEW_PATH = "views/";

    /**
     * @InitBinder用于在@Controller中标注于方法上，表示为当前控制器注册一个属性编辑器，只对当前的Controller有效。
     * @InitBinder标注的方法必须有一个参数WebDataBinder。所谓的属性编辑器可以理解就是帮助我们完成参数绑定。
     * */
    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }


    public static final Map<String, Object> success() {
        Map<String, Object> map = new HashMap<>();
        map.put("code", SUCCESS_FLAG);
        map.put("msg", SUCCESS_MSG);
        return map;

    }

    public static final Map<String, Object> error() {
        Map<String, Object> map = new HashMap<>();
        map.put("code", ERROR_FLAG);
        map.put("msg", ERROR_MSG);
        return map;

    }

    public static final Map<String, Object> responseTo(long total, Object obj) {
        Map<String, Object> map = new HashMap<>();
        map.put("total", total);
        map.put("rows", obj);
        return map;
    }

    public static final Map<String, Object> responseTo(String flag, String msg) {
        Map<String, Object> map = new HashMap<>();
        map.put("code", flag);
        map.put("msg", msg);
        return map;
    }

    public static final Map<String, Object> responseTo(String flag, String msg, long count, Object list) {
        Map<String, Object> map = new HashMap<>();
        map.put("code", flag);
        map.put("msg", msg);
        map.put("total", count);
        map.put("rows", list);
        return map;
    }

    public static final Map<String, Object> responseTo(String flag, String msg, Object obj, String s) {
        Map<String, Object> map = new HashMap<>();
        map.put("code", flag);
        map.put("msg", msg);
        map.put("data", obj);
        map.put("flag", s);
        return map;
    }
}
