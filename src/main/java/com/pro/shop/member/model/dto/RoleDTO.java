package com.pro.shop.member.model.dto;

import lombok.Data;

@Data
public class RoleDTO {

	private String memberId;
	
	private int autorityCode;
	
	private AuthorityDTO authority;
}
