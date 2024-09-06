package com.pro.shop.product.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pro.shop.product.model.dto.BrandDTO;
import com.pro.shop.product.model.dto.CategoryDTO;
import com.pro.shop.upload.medel.dto.AttachmentDTO;

@Mapper
public interface ProductMapper {

	List<CategoryDTO> getCategoryList();
	int checkCategoryNo(String categoryName);
	
	
	List<BrandDTO> getBrandList();
	int checkBrandNo(String brandName);
	
	
	
	
	int addProduct(	int categoryNo,int brandNo,String prodName,String prodDesc,int prodPrice,int discountRate,
			String prodDetailContent,String prodSize ,String prodColor);

	int checkCurrProdNo();
	
	int attachProdThumbnail(AttachmentDTO attachment);
}
