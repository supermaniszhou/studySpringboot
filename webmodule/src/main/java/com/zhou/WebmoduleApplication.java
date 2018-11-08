package com.zhou;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.context.annotation.Bean;

@EnableAutoConfiguration
@SpringBootApplication
//用于mybatis 扫描mapper 接口
@MapperScan(basePackages = {"com.zhou.mapper.*"})
public class WebmoduleApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebmoduleApplication.class, args);
    }

    /**
     * 设置session失效时间
     */
    @Bean
    public EmbeddedServletContainerCustomizer containerCustomizer() {
        return new EmbeddedServletContainerCustomizer() {
            @Override
            public void customize(ConfigurableEmbeddedServletContainer configurableEmbeddedServletContainer) {
                configurableEmbeddedServletContainer.setSessionTimeout(1800);
            }
        };
    }
}
