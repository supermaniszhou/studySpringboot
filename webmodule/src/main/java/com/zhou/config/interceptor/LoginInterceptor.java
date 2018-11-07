package com.zhou.config.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;

public class LoginInterceptor implements HandlerInterceptor {
    private static final Logger log = LoggerFactory.getLogger(LoginInterceptor.class);


    @Autowired
    private RedisTemplate<String, Object> template;
    /**
     * 进入controller层之前拦截请求  开始进入请求地址拦截
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        log.info("开始进入login拦截器---------------------------------");
        boolean flag = true;
        String url = request.getServletPath();
        String userId = (String) request.getSession().getAttribute("userId");
        List<String> list = Arrays.asList(IGNORE_URI());
        if (list.contains(url)) {
            flag = true;
        } else {
            if ("/error".equals(url)) {
                request.getSession().invalidate();
                response.sendRedirect("/login/loginpage");
                return flag = false;
            } else {
                if (null != userId && !"".equals(userId)) {
                    flag = true;
                } else {
                    response.sendRedirect("/login/loginpage");
                    flag = false;
                }
            }
        }
        return flag;
    }

    /**
     * 处理请求完成后视图渲染之前的处理操作
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object o, ModelAndView modelAndView) throws Exception {
        log.info("------处理请求完成后视图渲染之前的处理操作-----------------");
//        request.getRequestDispatcher("/login/toIndexPage").forward(request, response);
    }

    /**
     * 视图渲染之后的操作
     */
    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }

    public String[] IGNORE_URI() {
        String[] uris = {"/login/loginpage", "/login/login", "css"};
        return uris;
    }
}
