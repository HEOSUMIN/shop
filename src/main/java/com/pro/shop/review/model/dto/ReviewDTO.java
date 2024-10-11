package com.pro.shop.review.model.dto;

import java.util.Date;
import java.util.List;

import com.pro.shop.upload.model.dto.AttachmentDTO;

import lombok.Data;

@Data
public class ReviewDTO {
	private int reviewNo;
	private int optionNo;
	private String orderNo;
	private String memberId;
	private String reviewTitle;
	private String reviewContent;
	private Date revieRegDate;
	private int revieHits;
	private int revieRatings;
	
	private List<AttachmentDTO> attachmentList;
	
	
}
