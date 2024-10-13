package com.pro.shop.review.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pro.shop.member.model.service.MemberService;
import com.pro.shop.review.model.service.ReviewService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/review")
public class ReviewController {

	//썸네일 크기
	public static final int THUMB_WIDTH_SIZE = 540;
	public static final int THUMB_HEIGHT_SIZE = 540;
		
		
	private final ReviewService reviewService;
	private final MemberService memberService;
	
	@Autowired
	public ReviewController(ReviewService reviewService, MemberService memberService) {
		this.reviewService = reviewService;
		this.memberService = memberService;
		
	}
	
	@GetMapping("/write")
	public void reviewWriteForm(@RequestParam("orderNo") String orderNo)  {
		
	}
}
