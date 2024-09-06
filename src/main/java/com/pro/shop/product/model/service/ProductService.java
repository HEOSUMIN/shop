package com.pro.shop.product.model.service;

import java.util.List;

import com.pro.shop.product.model.dto.BrandDTO;
import com.pro.shop.product.model.dto.CategoryDTO;
import com.pro.shop.upload.medel.dto.AttachmentDTO;


public interface ProductService {
	
	List<CategoryDTO> getCategoryList();
	
	List<BrandDTO> getBrandList();
	
	int addProduct(	int categoryNo,int brandNo,String prodName,String prodDesc,int prodPrice,int discountRate,
			String prodDetailContent,String prodSize ,String prodColor);
	
	int checkCategoryNo(String categoryName);
	
	int checkBrandNo(String brandName);
	
	int checkCurrProdNo();
	
	int attachProdThumbnail(AttachmentDTO attachment);
}
 