package com.pro.shop.config;

import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(basePackages = "com.pro.shop", annotationClass = Mapper.class)
public class MybatisConfiguration {

	

}
