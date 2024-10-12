package com.pro.shop.member.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.pro.shop.member.model.dto.UserImpl;
import com.pro.shop.member.model.service.MemberService;
import com.pro.shop.product.model.dto.ProductDTO;
import com.pro.shop.product.model.service.ProductService;
import com.pro.shop.upload.model.dto.AttachmentDTO;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/mypage")
@SessionAttributes({"loginMember"})
public class MypageController {

	private final MemberService memberService;
	private final ProductService prodService;
	
	@Autowired
	public MypageController(MemberService memberService, ProductService prodService) {
		this.memberService = memberService;
		this.prodService = prodService;
	}
	
	/* 마이페이지 메인 */
	@GetMapping("main")
	public void getMypage(@AuthenticationPrincipal UserImpl user, HttpSession session, Model model ) {
		log.info("user : {}", user);
		
		List<Integer> recentlyViewed = (List<Integer>) session.getAttribute("recentlyViewed");
		
		if(recentlyViewed != null) {
			List<ProductDTO> recentlyViewedItems = new ArrayList<>();
			List<AttachmentDTO> recentlyViewedThumbnailList = new ArrayList<>();
			
			for(int i=0; i<recentlyViewed.size(); i++) {
				int prodNo = recentlyViewed.get(i);
				ProductDTO productDTO = prodService.getProductDetails(prodNo);
				recentlyViewedItems.add(productDTO);
				AttachmentDTO mainThumb = prodService.getMainThumbnailByProdNo(prodNo);
				recentlyViewedThumbnailList.add(mainThumb);
				
			}
			
			model.addAttribute("recentlyViewedItems",recentlyViewedItems);
			model.addAttribute("recentlyViewedThumbnailList",recentlyViewedThumbnailList);
		}
		
		model.addAttribute("memberWishItem","");
		model.addAttribute("preparingOrderCount","");
		model.addAttribute("dispatchedOrderCount","");
		model.addAttribute("deliveredOrderCount","");
	}
	
	

}
