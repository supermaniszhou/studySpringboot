package com.zhou.controller.sys;

import com.zhou.common.base.BaseController;
import com.zhou.entity.sys.SysUser;
import com.zhou.service.sys.SysUserService;
import com.zhou.util.Base64Zlc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping(value = "/login")
public class LoginController extends BaseController {
    @Autowired
    private SysUserService<SysUser> userService;
    @Autowired
    private RedisTemplate<String, Object> template;

    /**
     * 登录页
     */
    @RequestMapping(value = "/loginpage")
    public ModelAndView toLoginPage() {
        return new ModelAndView(VIEW_PATH + "index/login");
    }

    /**
     * 登录操作
     */
    @RequestMapping(value = "/login")
    public Map<String, Object> login(HttpServletRequest request, HttpServletResponse response, @ModelAttribute SysUser sysUser, Model model) {
        SysUser user = null;
        String token = "";
        try {
            String usernamepwd = sysUser.getUsername().concat(sysUser.getPassword());
            try {
                user = userService.queryObj(sysUser);
            } catch (Exception e) {
                e.printStackTrace();
            }
            //将用户信息存到redis中
            if (null != user) {
                if (!sysUser.getPassword().equals(user.getPassword())) {
                    model.addAttribute("error", "密码不正确");
                    return responseTo(ERROR_FLAG, "密码不正确");
                } else {
                    template.opsForValue().set(Base64Zlc.encodeString(usernamepwd), user);
                    template.expire(Base64Zlc.encodeString(user.getUsername()), 30 * 60, TimeUnit.SECONDS);
                    System.out.println(request.getSession().getId());
                    //将用户信息放在cookie中
                    Cookie cookie = new Cookie("userOnly", Base64Zlc.encodeString(usernamepwd));
                    cookie.setMaxAge(30 * 60);
                    cookie.setPath("/");
                    response.addCookie(cookie);

                    request.getSession().setAttribute("userId",Base64Zlc.encodeString(user.getUsername()));
                    return responseTo(SUCCESS_FLAG, "/login/toIndexPage");
                }
            } else {
                model.addAttribute("error", "此用户不存在");
                return responseTo(ERROR_FLAG, "此用户不存在");
            }
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", "登录出错了");
            return responseTo(ERROR_FLAG, "登录出错了");
        }
    }

    @RequestMapping(value = "/toIndexPage")
    public ModelAndView toIndexPage() {
        return new ModelAndView(VIEW_PATH + "index/index");
    }

    /**
     * 退出操作
     */
    @RequestMapping(value = "/logOut")
    public ModelAndView logOut(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        String value = eachCookieGetValue(cookies);
        template.delete(value);
        return new ModelAndView(VIEW_PATH + "index/login");
    }

    public String eachCookieGetValue(Cookie[] cookies) {
        String cookValue = "";
        if (null != cookies) {
            for (Cookie co : cookies) {
                if ("userOnly".equals(co.getName())) {
                    cookValue = co.getValue();
                    break;
                }
            }
        }
        return cookValue;
    }
}
