package com.pro.shop.member.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pro.shop.member.model.dao.MemberMapper;
import com.pro.shop.member.model.dto.AuthorityDTO;
import com.pro.shop.member.model.dto.MemberDTO;
import com.pro.shop.member.model.dto.RoleDTO;
import com.pro.shop.member.model.dto.UserImpl;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional
@Service("memberSerivce")
public class MemberServiceImpl implements MemberService {

	
	private MemberMapper memberMapper;
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	public MemberServiceImpl(MemberMapper memberMapper, PasswordEncoder passwordEncoder) {
		this.memberMapper = memberMapper;
		this.passwordEncoder = passwordEncoder;
		
		/* [PasswordEncoder]
		 * 1. pom.xml 통해 spring-boot-starter-security 의존성 주입
		 * 2. ContextConfiguration에서 BCryptPasswordEncoder에 대해 Bean 등록
		 */
	}

	/**
	 * 아이디 중복 검사
	 * @return 중복된 아이디 개수
	 */
	@Override
	public int checkId(String memberId) {
		// TODO Auto-generated method stub
		return 0;
	}
	

	/**
	 * 이메일 중복 검사
	 * @return 중복된 이메일 개수
	 */
	@Override
	public int checkEmail(String email) {
		// TODO Auto-generated method stub
		return 0;
	}

	/*
	 * 회원가입 
	 */
	@Override
	public boolean signUpMember(MemberDTO member) throws Exception {
	
		member.setMemberPwd(passwordEncoder.encode(member.getMemberPwd()));	//pwd 암호화 
		 
		/* 회원등록 */
		int resultA = memberMapper.insertMember(member);
	
		/* 권한등록 */
		RoleDTO role = new RoleDTO();
		role.setMemberId(member.getMemberId());
		role.setAuthorityCode(1);
		
		int resultB = memberMapper.insertRole(role);
	
		return resultA > 0 && resultB > 0 ? true : false;
	}

	
	/*
	 * 로그인
	 *  UserImpl 통해 id, pwd, authorities 이외에 추가 정보 호
	 */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MemberDTO member = memberMapper.findMemberById(username); //회원조회
		
		
		if(member == null) {
			member = new MemberDTO();
		}
		
		List<GrantedAuthority> authorities = new ArrayList<>();	//권한리스트 
		
		if(member != null && member.getRoleList() != null) {
			for(RoleDTO role : member.getRoleList()) {
				AuthorityDTO authority = role.getAuthority();
				
				if(authority != null) {
					authorities.add(new SimpleGrantedAuthority(authority.getAuthName())); 	//권한 이름 전달 
				}
			}
		}
		
		
		UserImpl user = new UserImpl(member.getMemberId(), member.getMemberPwd(), authorities);
		user.setDetails(member);
		
		log.info("user: {}", user);
		
	
		return user;
	}
	
	

	@Override
	public void updateLatestLoginDate(String username) {
		memberMapper.updateLatestLoginDate(username);
		
	}
	
	
}
