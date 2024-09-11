package com.pro.shop.product.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pro.shop.paging.model.dto.Criteria;
import com.pro.shop.paging.model.dto.ItemCriteria;
import com.pro.shop.product.model.dao.ProductMapper;
import com.pro.shop.product.model.dto.BrandDTO;
import com.pro.shop.product.model.dto.CategoryDTO;
import com.pro.shop.product.model.dto.ProductDTO;
import com.pro.shop.upload.model.dto.AttachmentDTO;

@Service("productService")
public class ProductServiceImpl implements ProductService {
	
	private ProductMapper productMapper;
	
	@Autowired
	public ProductServiceImpl(ProductMapper productMapper) {
		this.productMapper = productMapper;
	}
	
	@Override
	public List<CategoryDTO> getCategoryList() {
		return productMapper.getCategoryList();
	}

	@Override
	public List<BrandDTO> getBrandList() {
		return productMapper.getBrandList();
	}

	@Override
	public int addProduct(int categoryNo, int brandNo, String prodName, String prodDesc, int prodPrice,
			int discountRate, String prodDetailContent, String prodSize, String prodColor) {
		int result = productMapper.addProduct(categoryNo, brandNo, prodName, prodDesc, 
				prodPrice,discountRate,prodDetailContent,prodSize,prodColor);
		
		return result;
	}

	@Override
	public int checkCategoryNo(String categoryName) {
		return productMapper.checkCategoryNo(categoryName);
	}

	@Override
	public int checkBrandNo(String brandName) {
		return productMapper.checkBrandNo(brandName);
	}

	@Override
	public int checkCurrProdNo() {
		return productMapper.checkCurrProdNo();
	}

	@Override
	public int attachProdThumbnail(AttachmentDTO attachment) {
		return productMapper.attachProdThumbnail(attachment);
	}

	@Override
	public List<ProductDTO> getProductList(Criteria criteria) {
		return productMapper.getProductList(criteria);
	}
	
	@Override
	public List<ProductDTO> getOnSaleOnly(Criteria criteria) {
		return productMapper.getOnSaleOnly(criteria);
	}
	
	@Override
	public int getTotalNumber(Criteria criteria) {
		return productMapper.getTotalNumber(criteria);
	}
	
	@Override
	public int getOnSaleNumber(Criteria criteria) {
		return productMapper.getOnSaleNumber(criteria);
	}

	@Override
	public ProductDTO getProductDetails(int prodNo) {
		return productMapper.getProductDetails(prodNo);
	}

	@Override
	public List<ProductDTO> getProductListByCategorySection(ItemCriteria itemCriteria) {
		return productMapper.getProductListByCategorySection(itemCriteria);
	}

	@Override
	public AttachmentDTO getMainThumbnailByProdNo(int prodNo) {
		return productMapper.getMainThumbnailByProdNo(prodNo);
	}


	
	
}