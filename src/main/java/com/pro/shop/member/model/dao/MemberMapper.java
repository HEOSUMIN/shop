package com.pro.shop.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.pro.shop.member.model.dto.MemberDTO;
import com.pro.shop.member.model.dto.RoleDTO;


@Mapper
public interface MemberMapper {
	

	int checkId(String memberId);			//아이디 중복 검사
	
	int checkEmail(String email);			//아이디 중복 검사
	
	int insertMember(MemberDTO member);			//회원 정보 등록
	
	int insertRole(RoleDTO role);		//회원 권한 등록 
	
	
	/*
	 * 로그인 
	 */
	void updateLatestLoginDate(String username);  //성공 시 최근 로그인 일시 업데이트
	
	MemberDTO findMemberById(String username);
	

}
