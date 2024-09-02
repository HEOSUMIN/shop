package com.pro.shop.member.model.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;


@Data
public class MemberDTO {
	
	@NotBlank(message="{NotBlank.member.memberId}") //null, "", " " 모두 비허용 
	@Pattern(regexp="/^[A-Za-z0-9]{6,15}$/", message = "{Pattern.member.memberId}")
	private String memberId;		//회원 id
	
	@NotBlank
	@Pattern(regexp = "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/")
	private String memberPwd;		//회원 비밀번호 
	
	@NotBlank
	private String name; 			//이름 
	
	@NotBlank
	private String phone;			//전화번호 
	
	@NotBlank
	@Email
	private String email;			//이메일 

	private String address;			//주소 

	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss SSS")
	private Date latestLoginDate;	//최근로그인일시
	
	
	private List<RoleDTO> roleList;
}
