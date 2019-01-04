package com.zhou.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 通过@ControllerAdvice可以将对于控制器的全局配置放置在同一个位置，
 * 注解了@ControllerAdvice的类的方法可以使用@ExceptionHandler，
 *
 * @InitBinder，@ModelAttribute注解到方法上，这对所有注解了@RequestMapping的控制器内的方法有效。
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * @ControllerAdvice中除了配置@InitBinder,还可以有@ExceptionHandler用于全局处理控制器里面的异常；
     * @ModelAttribute作用是绑定键值对到Model里，让全局的@RequestMapping都能获得在此处设置的键值对。 　
     * 补充：如果 @ExceptionHandler注解中未声明要处理的异常类型，则默认为方法参数列表中的异常类型。
     */
    @ExceptionHandler(Exception.class)
    @ResponseBody
    String handleException(Exception e) {
        return e.getMessage();
    }

}
