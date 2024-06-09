package com.spring.container.spring;

import com.spring.container.spring.service.MemberServiceImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public MemberServiceImpl memberService() {
		return new MemberServiceImpl();
	}

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.addAllowedOrigin("http://localhost:3000"); // 허용된 오리진
		config.addAllowedOrigin("*"); // 모든 도메인 허용
		config.addAllowedMethod("*"); // 모든 HTTP 메서드 허용
		config.addAllowedHeader("*"); // 모든 헤더 허용
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}

}