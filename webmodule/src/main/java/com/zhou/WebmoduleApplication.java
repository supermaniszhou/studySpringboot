package com.zhou;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableAutoConfiguration
@SpringBootApplication
//用于mybatis 扫描mapper 接口
@MapperScan(basePackages={"com.zhou.mapper.SqlMapper","com.zhou.mapper.sys"})
public class WebmoduleApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebmoduleApplication.class, args);
	}
}
