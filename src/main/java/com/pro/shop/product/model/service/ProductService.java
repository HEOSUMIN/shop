package com.pro.shop.product.model.service;

import java.util.List;

import com.pro.shop.paging.model.dto.Criteria;
import com.pro.shop.paging.model.dto.ItemCriteria;
import com.pro.shop.product.model.dto.BrandDTO;
import com.pro.shop.product.model.dto.CategoryDTO;
import com.pro.shop.product.model.dto.ProductDTO;
import com.pro.shop.upload.model.dto.AttachmentDTO;

public interface ProductService {
	
	List<CategoryDTO> getCategoryList();
	
	List<BrandDTO> getBrandList();
	
	int addProduct(	int categoryNo,int brandNo,String prodName,String prodDesc,int prodPrice,int discountRate,
			String prodDetailContent,String prodSize ,String prodColor);
	
	int checkCategoryNo(String categoryName);
	
	int checkBrandNo(String brandName);
	
	int checkCurrProdNo();
	
	int attachProdThumbnail(AttachmentDTO attachment);
	
	
	//상품목록조회 
	List<ProductDTO> getProductList(Criteria criteria);
	
	//
	List<ProductDTO> getOnSaleOnly(Criteria criteria);
	
	//전체 상품 수 
	int getTotalNumber(Criteria criteria);
	
	//판매중인 상품 수 
	int getOnSaleNumber(Criteria criteria);
	
	ProductDTO getProductDetails(int prodNo);
	
	
	List<ProductDTO> getProductListByCategorySection(ItemCriteria itemCriteria);
	
	AttachmentDTO getMainThumbnailByProdNo(int prodNo);
}
 