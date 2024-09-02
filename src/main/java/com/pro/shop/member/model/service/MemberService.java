package com.pro.shop.member.model.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.pro.shop.member.model.dto.MemberDTO;

public interface MemberService extends UserDetailsService {
	
	/* 회원가입 */  
	int checkId(String memberId);
	
	int checkEmail(String email);
	
	boolean signUpMember(MemberDTO member) throws Exception;
	
	void updateLatestLoginDate(String username);
	
}
