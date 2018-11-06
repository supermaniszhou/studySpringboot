package com.zhou;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan({"com.zhou.mapper.SqlMapper","com.zhou.mapper.sys"})
public class WebmoduleApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebmoduleApplication.class, args);
	}
}
