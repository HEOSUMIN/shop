package com.pro.shop.product.model.dto;

import lombok.Data;

@Data
public class OptionDTO {
	private int optionNo;
	private int refProdNo;
	private int refStockNo;
	private String optionCategoryNo;
	private String optionCategoryNm;
	private String optionValue;
	private int optionExtChrg;
	
	private ProductDTO product;
	
}
