package com.pro.shop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.pro.shop.handler.LoginFailureHandler;
import com.pro.shop.handler.LoginSuccessHandler;
import com.pro.shop.member.model.service.MemberService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor 	//생성자 주입을 자동으로 설정 
public class SecurityConfig {

	private final MemberService memberService;
	private final PasswordEncoder passwordEncoder;
	private final LoginSuccessHandler loginSuccessHandler;
	private final LoginFailureHandler loginFailureHandler;

	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf((csrfConfig) -> csrfConfig.disable())
				.authorizeHttpRequests(
						auto -> auto.requestMatchers("/", "/member/**").permitAll().anyRequest().authenticated())
				.formLogin(formLogin -> formLogin.loginPage("/member/signin").defaultSuccessUrl("/")
						.successHandler(loginSuccessHandler).failureHandler(loginFailureHandler).usernameParameter("username")
						.passwordParameter("password"));

		return http.build();

	}
	
	
    public AuthenticationManager authenticationManager(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(memberService).passwordEncoder(passwordEncoder);
        return auth.build();
    }

//
//	@Bean
//	public UserDetailsService userDetailsService() {
//		InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
//		
//		manager.createUser(User.withUsername("user1").password("1234").roles("user").build());
//
//		return manager;
//	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring().requestMatchers("/css/**", "/js/**", "/image/**");
	}
}
