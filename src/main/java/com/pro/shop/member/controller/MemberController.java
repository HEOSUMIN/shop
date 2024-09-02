package com.pro.shop.member.controller;

import java.util.Locale;
import java.util.Map;

import org.springframework.context.MessageSource;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.pro.shop.member.model.dto.MemberDTO;
import com.pro.shop.member.model.dto.UserImpl;
import com.pro.shop.member.model.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Controller
@RequestMapping("/member")
public class MemberController {
	
	private final MemberService memberService;
	private final PasswordEncoder passwordEncoder;
	private final MessageSource messageSource;
	
	
	/* MessageSource
	 * 1. ContextConfiguration 통해 Bean 등록
	 * 2. classpath 하위에 messages 폴더 및 properties 파일 생성
	 */
	public MemberController(MemberService memberService, PasswordEncoder passwordEncoder,  MessageSource messageSource) {
		this.memberService = memberService;
		this.passwordEncoder = passwordEncoder;
		this.messageSource = messageSource;
		
	}
	
	/*
	 * 아이디 중복 검사
	 * @return 중족된 아이디 개수 
	 */
	@PostMapping(value="/checkId", produces="application/json; charset=UTF-8")
	@ResponseBody	//ajax 통신에서 JSON 응답을 치르기 위해서는 어노테이션 추가, spring-web의 경우 jackson-databind 등 기본적으로 추가돼 있는 의존성들을 고려하여야 함
	public int checkId(String memberId) {
		int result = memberService.checkId(memberId);
		
		return result;
	}
	
	
	/*
	 * 이메일 중복 검사
	 * @return 중복된 이메 개수 
	 */
	@PostMapping(value="/checkEmail", produces="application/json; charset=UTF-8")
	@ResponseBody	
	public int checkEmail(String email) {
		int result = memberService.checkId(email);
		
		return result;
	}
	
	
	/*
	 * 회원가입
	 * @return 회원가입 폼 또는 에러 페이지로 연결 
	 */
	@GetMapping("/signup")
	public String signUpForm() {
		//@AuthenticationPrincipal UserImpl user, Model model
		
		//이미 로그인 되어 있는 경우 
//		if(user !=null) {
//			
//		}
		return "member/signup";
	}
	
	
	@PostMapping("/signup")
	public Object signUpMember(@Validated @ModelAttribute("member") MemberDTO member, BindingResult bindingResult,
			@RequestParam Map<String, String>params, RedirectAttributes rttr, Model model, Locale locale) throws Exception{
		
		/* 회원가입 성공 로직 */
		String phone = params.get("phoneA") + params.get("phoneB") + params.get("phoneC");
		String address = params.get("postalCode") + "$" + params.get("address") + "$" + params.get("detailAddress");
		
		member.setPhone(phone);
		member.setAddress(address);
		member.setEmail(params.get("memberId"));
		
		System.out.println(member.getEmail());
		
		
		memberService.signUpMember(member);
		
		
		return "redirect:/";
	}

	
	/**
	 * 로그인
	 * @return 로그인 폼 또는 에러 페이지로 연결
	 */
	@GetMapping("/signin")
	public String signInForm(@AuthenticationPrincipal UserImpl user, Model model, Locale locale) {
		
		if(user != null) {
			model.addAttribute("loginAccessDenied", messageSource.getMessage("loginAccessDenied", null, locale));
			return "/common/denied";
		}
		
		return "/member/signin";
	}
	
	
	@PostMapping("/signin")
	public String singnInMember(@RequestParam(required = false) String errorTitle, @RequestParam(required = false) String errorText,
			@RequestParam(required = false) String resetPasswordRequired, HttpServletRequest request, HttpSession session,
			RedirectAttributes rttr, Locale locale) {
		
		
		String uri = request.getHeader("Referer");	//사용자 이전 경로 
		
		String loginMember = (String) session.getAttribute("loginMember");
		
		log.info("22222!요청 loginMember : {}", loginMember);
		
		if(loginMember == null) {
			if(uri != null && !(uri.contains("/signin"))) { //돌아가야 할 이전 경로가 존재하고, 사용자가 직접 로그인페이지를 요청한 것이 아닌 경우
				request.getSession().setAttribute("prevPage", uri); //이전 경로를 session상에 저장하여 LoginSuccessHandler 통해 처리
			}
		}
		
		log.info("!!!!!!요청 uri : {}", uri);
		
		
		/*
		 * 로그인 실패
		 * : LoginFailureHandler로부터 @RequestParam 어노테이션 통해 넘어온 에러메시지 출력
		 */
		if(errorTitle != null) {
			rttr.addFlashAttribute("signInMessageTitle", errorTitle);
			rttr.addFlashAttribute("signInMessageText", errorText);
			return "redirect:/member/signin";
		}
		
		return uri;
		
	}
	

}
