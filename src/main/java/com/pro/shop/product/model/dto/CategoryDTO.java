package com.pro.shop.product.model.dto;

import lombok.Data;

@Data
public class CategoryDTO {
	private int categoryNo;
	private int upCategoryNo;
	private String categoryName;
	private int depth;
	private int sort;
}
