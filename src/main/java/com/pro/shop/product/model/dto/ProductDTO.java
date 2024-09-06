package com.pro.shop.product.model.dto;

import java.util.Date;
import java.util.List;

import com.pro.shop.upload.medel.dto.AttachmentDTO;

import lombok.Data;

@Data
public class ProductDTO {

	private int prodNo;
	private int categoryNo;
	private int brandNo;
	private String prodName;
	private String prodDesc;
	private int prodPrice;			  //상품원가
	private int discountRate;		  //할인율
	private String prodSize;
	private String prodColor;
	private String prodDetailContent; //상품상세내용
	private int prodDetailViewCount;  //상품상세조회수
	private Date prodEnrollDate;	  //상품등록일자
	private Date prodChangeDate;	  //상품수정일자
	private char prodAvailYn;		  //상품판매여부
	private List<AttachmentDTO> attachmentList;
	
	private CategoryDTO category;
	private BrandDTO brand;
	//private OptionDTO option;
	
	
	
}
