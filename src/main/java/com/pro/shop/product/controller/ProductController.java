package com.pro.shop.product.controller;

import java.io.File;
import java.io.IOException;
import java.net.http.HttpRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.pro.shop.member.model.service.MemberService;
import com.pro.shop.paging.model.dto.Criteria;
import com.pro.shop.paging.model.dto.ItemCriteria;
import com.pro.shop.product.model.dto.BrandDTO;
import com.pro.shop.product.model.dto.CategoryDTO;
import com.pro.shop.product.model.dto.ProductDTO;
import com.pro.shop.product.model.service.ProductService;
import com.pro.shop.upload.model.dto.AttachmentDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;

@Slf4j
@Controller
@SessionAttributes("loginMember")
public class ProductController {
	
	//썸네일 크기
	public static final int THUMB_WIDTH_SIZE = 540;
	public static final int THUMB_HEIGHT_SIZE = 540;
	
	private final ProductService productService;
	private final MemberService memberService;
	private final MessageSource messageSource;

	@Autowired
	public ProductController(ProductService productService, MemberService memberService, MessageSource messageSource) {
		this.productService = productService;
		this.memberService = memberService;
		this.messageSource = messageSource;
	}
	
	
	/*
	 * 관리자 - 상품등록 
	 */
	@GetMapping("/admin/product/add")
	public void addProduct(Model model) {
		List<CategoryDTO> category = productService.getCategoryList();
		model.addAttribute("category", category);
		
		List<BrandDTO> brand = productService.getBrandList();
		model.addAttribute("brand", brand);
	}
	
	
	/*
	 *  관리자 - 상품등록 - 상위 카테고리에 따른 하위 카테고리 조회 
	 */
	@GetMapping(value="/option", produces="application/json; charset=UTF-8")
	@ResponseBody
	public List<CategoryDTO> checkMainCategory(@RequestParam("roomNo") int roomNo, Model model) {
		List<CategoryDTO> mainCategoryList = productService.getMainCategoryList(roomNo);
		model.addAttribute("mainCategoryList", mainCategoryList);		
		
		return mainCategoryList;
	}
	
	
	/*
	 * 관리자 - 상품등록 - 브랜드 중복검사 및 새 브랜드 추가 
	 */
	@PostMapping(value="/admin/product/addBrand", produces="application/json; charset=UTF-8")
	@ResponseBody
	public ModelAndView addBrand(@RequestBody Map<String, String> param, Locale locale ) {
		ModelAndView mv = new ModelAndView();
		MappingJackson2JsonView jsonView = new MappingJackson2JsonView();
		mv.setView(jsonView);
		
		//중복검사 
		String brandName = param.get("brand").replaceAll("\\s","");
		log.info(brandName);
		
		int brandCount = productService.checkBrandName(brandName);
		
		if(brandCount > 0) {
			String errorMessage = messageSource.getMessage("errorWhileAddingANewBrand", null, locale);
			mv.addObject("errorMessage", errorMessage);
			log.info(errorMessage);
		}
		
		//새 브랜드 추가
		if(brandCount == 0) { 
			int result = productService.addNewBrand(brandName);
			if(result == 1) {
				log.info("새 브랜드 추가 완료 : {}", brandName);
			}
		}
		return mv;
	}
	
	
	/*
	 * 관리자 - 상품등록
	 */
	@PostMapping(value="/admin/product/add", consumes={MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	@ResponseBody
	public ModelAndView addProduct(@RequestPart("params") Map<String,Object> params, @RequestParam(value="files", required=false) List<MultipartFile> files, HttpServletRequest request, HttpServletResponse response, Locale locale) {
		
		log.info("params: {}" ,params);
		/* jsonView 적용 */
		ModelAndView mv = new ModelAndView();
		MappingJackson2JsonView jsonView = new MappingJackson2JsonView();
		mv.setView(jsonView);
		
		
		
		/* 상품추가 */
		//String categoryName = params.get("category").toString();
		int categoryNo = Integer.parseInt(params.get("category").toString()) ;
		String brandName =  params.get("brand").toString();
		int brandNo = productService.checkBrandNo(brandName);
		String prodName = params.get("prodName").toString();
		String prodDesc = params.get("prodDesc").toString();
		int prodPrice = Integer.parseInt(params.get("prodPrice").toString());
		int discountRate = Integer.parseInt(params.get("discountRate").toString());
		//String prodDetailContent = params.get("prodDetailContent").toString();
		String prodSize = params.get("prodSize").toString();
		String prodColor = params.get("prodColor").toString();
		
	
		//ProductDTO 객체에 값으로 설정
		ProductDTO product = new ProductDTO();
		product.setCategoryNo(categoryNo);
		product.setBrandNo(brandNo);
		product.setProdName(prodName);
		product.setProdDesc(prodDesc);
		product.setProdPrice(prodPrice);
		product.setDiscountRate(discountRate);
		//product.setProdDetailContent(prodDetailContent);
		product.setProdSize(prodSize);
		product.setProdColor(prodColor);

		//상품 정보 추가
		int addresult = productService.addProduct(categoryNo, brandNo, prodName, prodDesc, prodPrice, discountRate, null, prodSize, prodColor);
				
		log.info("상품 insert end");
		

		String realPath = request.getSession().getServletContext().getRealPath("/");
		log.info("src/main/webapp : {}", realPath);
		
		
		String originalUploadPath = realPath + "upload" + File.separator + "product" + File.separator + "original";
		String thumbnailUploadPath = realPath + "upload" + File.separator + "product" + File.separator + "thumbnail";
		File originalDirectory = new File(originalUploadPath);
		File thumbnailDirectory = new File(thumbnailUploadPath);
		
		if(!originalDirectory.exists() || !thumbnailDirectory.exists()) { //지정 폴더가 존재하지 않을 시 생성
			originalDirectory.mkdirs(); //생성할 폴더가 하나이면 mkdir, 상위 폴더도 존재하지 않으면 한 번에 생성하란 의미로 mkdirs를 이용
			thumbnailDirectory.mkdirs();
		}
		
		Map<String, String> fileMap = new HashMap<>();
		List<Map<String, String>> fileList = new ArrayList<>();
		
		log.info("files : {}", files);
		
		for(MultipartFile file : files) {
			UUID uuid = UUID.randomUUID(); //랜덤 문자 생성
			
			String origFileName = file.getOriginalFilename(); //원본파일명
			
			String extension = FilenameUtils.getExtension(origFileName); //확장자
			String randomFileName = uuid.toString().replace("-", "") + "." + extension; //랜덤파일명
			
			try {
				//원본 크기 파일을 original 폴더에 저장
				File target = new File(originalUploadPath, randomFileName);
				byte[] bytes = file.getBytes();
				FileCopyUtils.copy(bytes, target);
				
				String origFileUrl = "/upload/product/original/" + uuid.toString().replace("-", "") + "." + extension;
				fileMap.put("origFileName", origFileName);
				fileMap.put("saveFileName", randomFileName);
				fileMap.put("savePath", origFileUrl);
				
				//썸네일 파일을 thumbnail 폴더에 저장
				Thumbnails.of(originalUploadPath + File.separator + randomFileName) //썸네일로 변환 후 저장
						  .size(THUMB_WIDTH_SIZE, THUMB_HEIGHT_SIZE)
						  .toFile(thumbnailUploadPath + File.separator + "thumbnail_" + randomFileName);
				fileMap.put("thumbnailPath", "/upload/product/thumbnail/thumbnail_" + randomFileName); //웹서버에서 접근 가능한 형태로 썸네일의 저장 경로 작성
				
				fileList.add(fileMap);
				
				//현재 상품번호 조회
				int currProdNo = productService.checkCurrProdNo();
				
				//product 객체의 AttachmentList 설정
				product.setAttachmentList(new ArrayList<AttachmentDTO>());
				List<AttachmentDTO> list = product.getAttachmentList();
				log.info("fileList size : {}", fileList.size());
				
				AttachmentDTO tempFileInfo = new AttachmentDTO();
				for(int i=0; i < fileList.size(); i++) {
					tempFileInfo.setRefProdNo(currProdNo);
					tempFileInfo.setOrigFileName(fileList.get(i).get("origFileName"));
					tempFileInfo.setSaveFileName(fileList.get(i).get("saveFileName"));
					tempFileInfo.setSavePath(fileList.get(i).get("savePath"));
					tempFileInfo.setThumbnailPath(fileList.get(i).get("thumbnailPath"));
					
					if(i == 0) { //index 기준으로 첫번째 첨부 이미지는 메인썸네일, 그 다음은 서브썸네일에 해당
						tempFileInfo.setFileType("THUMB_MAIN");
					} else {
						tempFileInfo.setFileType("THUMB_SUB");
					}
					
					
					list.add(tempFileInfo);
				}
				productService.attachProdThumbnail(tempFileInfo);
			} catch (IOException e) { e.printStackTrace(); }
		}
		
		if(addresult == 1) {
			String successMessage = messageSource.getMessage("productAddedSuccessfully", null, locale);
			mv.addObject("successMessage", successMessage);
		} else {
			String errorMessage = messageSource.getMessage("errorWhileAddingAProduct", null, locale);
			mv.addObject("errorMessage", errorMessage);
		}
		
		return mv;
	}
	
	/*
	 * 관리자 - 상품 목록 조회 
	 */
	@GetMapping("admin/product/list")
	public void getProductList(@Valid @ModelAttribute("criteria") Criteria criteria, BindingResult bindingResult, HttpServletRequest request, Model model) {
		log.info("상품 목록 조회 - 관리자 ");
		
		int total = productService.getTotalNumber(criteria); //전체
		int onSale = productService.getOnSaleNumber(criteria); //판매중
		
		
		List<ProductDTO> productList = productService.getProductList(criteria);
		List<ProductDTO> onSaleOnly = productService.getOnSaleOnly(criteria); //판매중
		
		
		log.info("productList : {}", productList);
		log.info("onSaleOnly : {}", onSaleOnly);
		
		
		model.addAttribute("total", total);
		model.addAttribute("onSale", onSale);
		
		model.addAttribute("productList", productList);
		model.addAttribute("onSaleOnly", onSaleOnly);
		
	}
	
	/*
	 * 상품 목록 
	 */
	@GetMapping("/product/list")
	public void getProductListByCategory(@Valid @ModelAttribute("itemCriteria") ItemCriteria itemCriteria, HttpSession session, Model model) {
		
		log.info("model : {}" , model);
		
		String section = itemCriteria.getSection();
		
		itemCriteria.setSection(section);
		
		List<ProductDTO> sortedList = productService.getProductListByCategorySection(itemCriteria);
		List<ProductDTO> productList = new ArrayList<>();
		
		//리스트 출력 
		for(int i=0; i<sortedList.size(); i++) {
			int prodNo = sortedList.get(i).getProdNo();
			ProductDTO productDTO = productService.getProductDetails(prodNo);
			productList.add(productDTO);
		}
		
		
		List<AttachmentDTO> thumbnailList = new ArrayList<>();
		for(int i=0; i<productList.size(); i++) {
			int prodNo = productList.get(i).getProdNo();
			AttachmentDTO mainThumb = productService.getMainThumbnailByProdNo(prodNo);
			thumbnailList.add(mainThumb);
			
		}
		
		
		log.info("thumbnailList : {}", thumbnailList);
		
		
		
		model.addAttribute("section", section == null || section == "" ? "전체 상품" : section);
		model.addAttribute("productList", productList);
		model.addAttribute("thumbnailList", thumbnailList);
	}
	
	
	
}
