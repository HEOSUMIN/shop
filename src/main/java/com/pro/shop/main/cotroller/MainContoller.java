package com.pro.shop.main.cotroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainContoller {

	@GetMapping("/")
	public String shopMain() {
		
		return "main";
	}
	
}
