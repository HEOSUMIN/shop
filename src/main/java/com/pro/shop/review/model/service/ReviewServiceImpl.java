package com.pro.shop.review.model.service;

import org.springframework.stereotype.Service;

import com.pro.shop.review.model.dao.ReviewMapper;

@Service("reviewService")
public class ReviewServiceImpl implements ReviewService {
	
	private ReviewMapper reviewMapper;
	

}
