package com.pro.shop.product.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pro.shop.paging.model.dto.Criteria;
import com.pro.shop.paging.model.dto.ItemCriteria;
import com.pro.shop.product.model.dto.BrandDTO;
import com.pro.shop.product.model.dto.CategoryDTO;
import com.pro.shop.product.model.dto.ProductDTO;
import com.pro.shop.product.model.dto.RoomsDTO;
import com.pro.shop.product.model.dto.OptionCategoryDTO;
import com.pro.shop.product.model.dto.OptionDTO;
import com.pro.shop.upload.model.dto.AttachmentDTO;

@Mapper
public interface ProductMapper {
	
	List<RoomsDTO> getRoomList();

	List<CategoryDTO> getMainCategoryList(int roomNo);
	
	List<CategoryDTO> getCategoryList();
	
	int checkCategoryNo(String categoryName);
	
	List<OptionCategoryDTO> getOptCategoryList();
	
	
	List<BrandDTO> getBrandList();
	
	int checkBrandName(String brandName);
	
	int checkBrandNo(String brandName);
	
	int addNewBrand(String brandName);
	
	int addProduct(	int categoryNo,int brandNo,String prodName,String prodDesc,int prodPrice,int discountRate,
			String prodDetailContent,String prodSize ,String prodColor);
	
	int addProductOption(String optionName, String optionValue, int optionExtChrg);
	
	int editProduct(int prodNo, int categoryNo,int brandNo,String prodName,String prodDesc,int prodPrice,int discountRate,
			String prodDetailContent,String prodSize ,String prodColor);
	
	
	int checkCurrProdNo();
	
	int attachProdThumbnail(AttachmentDTO attachment);
	
	List<ProductDTO> getProductList(Criteria criteria);
	
	List<ProductDTO> getOnSaleOnly(Criteria criteria);
	
	int getTotalNumber(Criteria criteria);
	
	int getOnSaleNumber(Criteria criteria);
	
	ProductDTO getProductDetails(int prodNo);

	List<ProductDTO> getProductListByCategorySection(ItemCriteria itemCriteria);
	
	
	AttachmentDTO getMainThumbnailByProdNo(int prodNo);
	
	AttachmentDTO getSubThumbnailByProdNo(int prodNo);
	
	List<CategoryDTO> getSubCategoryList(int categoryNo);
	
	int getTotalNumberByCriteria(ItemCriteria itemCriteria);
	
	List<CategoryDTO> getUpCategoryList(int categoryNo);
	
	List<OptionDTO> getOptionListByProdNo(int prodNo);

	int deleteOption(int prodNo);
	
	int editProductOption(int refProdNo, String optionCtgryNo, String optionNm, int optionExtChrg);

	
}
