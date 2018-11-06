package com.zhou.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * @Desicription:
 * @Author : 周刘成
 * @Creation Date :  下午 3:19 2018/11/5 0005.
 * @ModificationHistory Who When What
 * _________ ________________ ____________________________________________
 */
@RestController
@RequestMapping(value = "/home")
public class HomeController {

    @RequestMapping(value = "/toIndexPage")
    public ModelAndView toIndexPage() {
        return new ModelAndView("views/index");
    }

    @RequestMapping(value = "/toLoginPage")
    public ModelAndView toLoginPage() {
        return new ModelAndView("views/index/login");
    }


}
