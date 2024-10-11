
let fileItems = document.querySelectorAll('[type=file]');
let thumbTd = document.querySelectorAll('.thumbTd');
let imageBox = document.querySelectorAll('.imageBox');
fileItems.forEach(item => item.addEventListener('change', previewImage));

/* 사진 파일 등록 */
function previewImage(){
	let index = Array.from(fileItems).indexOf(this); //fileItems 기준으로 index 생성
	console.log(index);
	if(this.files && this.files[0]) {
		let reader = new FileReader();
		reader.readAsDataURL(this.files[0]);
		reader.onload = function() {
			imageBox[index].innerHTML = "<img src='" + reader.result + "'>";
		}
	} else {
		thumbTd.forEach(item => item.addEventListener('click', reselectImage));
	}
}

function reselectImage() {
	let index = Array.from(thumbTd).indexOf(this); //thumbTd 기준으로 index 생성
	//console.log(index);
	if(index == 0) {
		fileItems[index].click();
	}
};


/* room 분류 변경 시  */
function roomCategory(){
	let roomNo = document.getElementById('roomCategoryName').value;

	/* 메인,하위분류 리셋  */	
 	//	document.getElementById('mainCategoryName').value = '';
	//document.getElementById('subCategoryName').value = '';		
	
	$('#mainCategoryName').children('option').remove();
	$('#subCategoryName').children('option').remove();
	$('#mainCategoryName').prepend('<option selected disabled hidden >선택</option>');
	$('#subCategoryName').prepend('<option selected disabled hidden >선택</option>');
	
	
	$.ajax({
	    url : '/option',
	    type : 'get',
	    dataType : 'json',
		contentType: "application/json; charset=UTF-8",
	    data : {roomNo : roomNo},
		success: function (result) {
				 for (i = 0; i < result.length; i++) {
						console.log(result[i].categoryName);
	                    $('#mainCategoryName').append("<option value='" + result[i].categoryNo + "'>" +result[i].categoryName + "</option>");
	              }
								 
		        }
	      }).fail(function (error) {
	          alert(JSON.stringify(error));
      });
	  
}

/* main 분류 변경 시  */
function mainCategory(){
	
	let roomNo = document.getElementById('mainCategoryName').value;
	
	console.log("mainCategoryNo:: ", roomNo);

	/* 하위분류 리셋  */	
	//document.getElementById('subCategoryName').value = '';
	$('#subCategoryName').children('option').remove();
	$('#subCategoryName').prepend('<option selected disabled hidden >선택</option>');
	
	
	$.ajax({
	    url : '/option',
	    type : 'get',
	    dataType : 'json',
		contentType: "application/json; charset=UTF-8",
	    data : {roomNo : roomNo},
		success: function (result) {
				 for (i = 0; i < result.length; i++) {
	                    $('#subCategoryName').append("<option value='" + result[i].categoryNo + "'>" +result[i].categoryName + "</option>");
	              }
								 
		        }
	      }).fail(function (error) {
	          alert(JSON.stringify(error));
      });
}

/* 새 브랜드 추가 */
function addABrand(){
	let brand = document.getElementById('brandName').value;
	
	if(brand == 'etc'){
		$('#addNewBrand').attr('disabled', false);
		$('#addNewBrand').css('background-color', 'transparent');
		
		$('#addNewBrand').blur(function(){
			brand = document.getElementById('addNewBrand').value;
			console.log("addNewBrand : " + brand);
			
			let param = { brand : brand };
					
			$.ajax({
				url : '/admin/product/addBrand',
				data : JSON.stringify(param),
				type : 'post',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success : function(data){
					if(data.errorMessage){
						Swal.fire({
							icon: 'error',
							title: data.errorMessage,
							confirmButtonColor: '#00008b',
							confirmButtonText: '확인'
						}).then((result) => {
							if(result.isConfirmed) {
								$('#addNewBrand').val(''); //입력값 삭제 및 입력란 비활성화
								$('#addNewBrand').attr('disabled', true);
								$('#addNewBrand').css('background-color', '#E5E5E5');
								$('#brandName').val(brand); //해당 브랜드 자동 선택
								return;
							}
						})
					}
				},
				error : function(status, error){ console.log(status, error); }
			});
		})
		
	}else{
		$('#addNewBrand').val('');
		$('#addNewBrand').attr('disabled', true);
		$('#addNewBrand').css('background-color', '#E5E5E5');
	}
}


/* 옵션 행 추가 */
$('#addRow').on('click', function(){ //상품 등록
	  let table_body = document.getElementById('table_body');
	    let first_tr   = table_body.firstElementChild;
	    let tr_clone   = first_tr.cloneNode(true);//*1)복제된 node 반환

	    table_body.append(tr_clone);
	    clean_first_tr(table_body.firstElementChild);
	
});

/* 옵션 행 삭제 */
$('#delRow').on('click', function(){ //상품 등록
	
	var checkRows = $("[name='chkbox']:checked");
	
	for(var i=checkRows.length-1; i>-1; i--){
 		checkRows.eq(i).closest('tr').remove();
	}
	
});

/* 금액입력시 (숫자, 콤마) */ 
function onlyNumberWithComma(obj) {
  obj.value = Number(obj.value.replace(/[^0-9]/g,'')).toLocaleString();
}

/*  */

$('#test').on('click', function(){ 


	let optionCtgryNoArr = new Array();
	let optionValueArr = new Array();
	let optionExtChrgArr = new Array();
	let optArr = new Array();
		
	for(var i=0; i< $('#table_body tr').length; i++){
		
		var tr =  $('#table_body tr').eq(i);
		var td = tr.children();
		
		var optionCtgryNo = td.eq(1).find('select[name="optionCategoryNo"] option:selected').val(); //옵션명
		var optionValue = td.eq(2).find('input[type="text"]').val();								//옵션값
		var optionExtChrg = td.eq(3).find('input[type="text"]').val();								//옵션추가금액
			
		optionCtgryNoArr.push(optionCtgryNo);
		optionValueArr.push(optionValue);
		optionExtChrgArr.push(optionExtChrg);
		
		optArr.push({ optionCtgryNoArr : optionCtgryNo,
			optionValueArr : optionValue,
			optionExtChrgArr : optionExtChrg
		});
	}
	
	console.log(optionCtgryNoArr);
	console.log(optArr);
	
	

});




/* 상품등록 폼 제출 */
function submitProductForm(){
	
	//카테고리 
	let category = document.getElementById('subCategoryName').value;
	if(category == 'etc') {
		category = document.getElementById('addNewCategory').value;
	}
	
	//브랜드
	let brand = document.getElementById('brandName').value;
	if(brand == 'etc') {
		brand = document.getElementById('addNewBrand').value;
	}
	
	//상품명 
	let prodName = document.getElementById("prodName").value;
	
	//상품 설명 
	let prodDesc = document.getElementById('prodDesc').value;
	
	//할인율
	let discountRate = document.getElementById('discount').value;
	console.log(discountRate);
	
	//원가
	let prodPrice = document.getElementById('prodPrice').value;
	
	//규격 
	let prodSize = document.getElementById('prodSize').value;
	
	//색상 
	let prodColor = document.getElementById('prodColor').value;
	
	//옵션
	let optionCtgryNoArr = new Array();
	let optionValueArr = new Array();
	let optionExtChrgArr = new Array();
	let optArr = new Array();
		
	for(var i=0; i< $('#table_body tr').length; i++){
		
		var tr =  $('#table_body tr').eq(i);
		var td = tr.children();
		
		var optionCtgryNo = td.eq(1).find('select[name="optionCategoryNo"] option:selected').val(); //옵션명
		var optionValue = td.eq(2).find('input[type="text"]').val();								//옵션값
		var optionExtChrg = td.eq(3).find('input[type="text"]').val();								//옵션추가금액
		
		alert(optionCtgryNo+"    "+optionValue+"     "+optionExtChrg);
		optionCtgryNoArr.push(optionCtgryNo);
		optionValueArr.push(optionValue);
		optionExtChrgArr.push(optionExtChrg);
		
		optArr.push({ optionCtgryNoArr : optionCtgryNo,
			optionValueArr : optionValue,
			optionExtChrgArr : optionExtChrg
		});
	}

	console.log(optionCtgryNoArr);
	console.log(optArr);
	
	
	
	
	
	
	
	//상세내용
	let prodDetailContent = CKEDITOR.instances['prodDetailContent'].getData();
	console.log(prodDetailContent);
	
	
	
	//FormData 객체 생성
	let formData = new FormData();
	
	let attached = $('.files');
	console.log(attached.length);
	for(let i=0; i < attached.length; i++) {
		if(attached[i].files.length > 0) {
			for(let j=0; j < attached[i].files.length; j++) {
				formData.append("files", $('.files')[i].files[j]);
			}
		}
	}

	let params = { category : category
				 , brand : brand
				 , prodName : prodName
				 , prodDesc : prodDesc
				 , discountRate : discountRate
				 , prodPrice : prodPrice
				 , prodSize : prodSize
				 , prodColor : prodColor
				 , prodDetailContent : prodDetailContent
				 , optionCtgryNoArr : optionCtgryNoArr
				 , optionValueArr : optionValueArr
				 , optionExtChrgArr : optionExtChrgArr
				 , optArrLength : optArr.length
				 };
	
	formData.append("params", new Blob([JSON.stringify(params)], {type : 'application/json'}));
	
	
	for( let value of formData.values()){
		console.log(value);
	}
	
	$.ajax({
			url : '/admin/product/add',
			data : formData,
			processData: false,
			contentType: false,
			enctype: 'multipart/form-data',
			type : 'post',
			traditional : true,
			success : function(data){
				if(data.errorMessage) {
					Swal.fire({
						icon: 'error',
						title: data.errorMessage,
						confirmButtonColor: '#00008b',
						confirmButtonText: '확인'
					}).then((result) => {
						if(result.isConfirmed) {
							return;
						}
					})
				}
				
				if(data.successMessage) {
					Swal.fire({
						icon: 'success',
						title: data.successMessage,
						confirmButtonColor: '#00008b',
						confirmButtonText: '확인'
					}).then((result) => {
						if(result.isConfirmed) {
							window.location.reload(); //페이지 새로고침
							window.history.scrollRestoration = 'manual'; //스크롤 최상단 고정
						}
					})
				}
			},
			error : function(status, error){ console.log(status, error); }
	});
}


/* 상품수정 폼 제출 */
function submitEditProdForm(){
	
	//상품번호 
	let prodNo = document.getElementById('prodNo').value;
	
	//카테고리 
	let category = document.getElementById('subCategoryName').value;

	//브랜드
	let brand = document.getElementById('brandName').value;
	if(brand == 'etc') {
		brand = document.getElementById('addNewBrand').value;
	}
	
	//상품명 
	let prodName = document.getElementById("prodName").value;
	
	//상품 설명 
	let prodDesc = document.getElementById('prodDesc').value;
	
	//할인율
	let discountRate = document.getElementById('discount').value;
	console.log(discountRate);
	
	//원가
	let prodPrice = document.getElementById('prodPrice').value;
	
	//규격 
	let prodSize = document.getElementById('prodSize').value;
	
	//색상 
	let prodColor = document.getElementById('prodColor').value;
	
	//상세내용
	let prodDetailContent = CKEDITOR.instances['prodDetailContent'].getData();
	console.log(prodDetailContent);

	//FormData 객체 생성
	let formData = new FormData();
	
	let attached = $('. v');
	console.log(attached.length);
	for(let i=0; i < attached.length; i++) {
		if(attached[i].files.length > 0) {
			for(let j=0; j < attached[i].files.length; j++) {
				formData.append("files", $('.files')[i].files[j]);
			}
		}
	}

	let params = { prodNo : prodNo
				 , category : category
				 , brand : brand
				 , prodName : prodName
				 , prodDesc : prodDesc
				 , discountRate : discountRate
				 , prodPrice : prodPrice
				 , prodSize : prodSize
				 , prodColor : prodColor
				 , prodDetailContent : prodDetailContent
				 };
	
	formData.append("params", new Blob([JSON.stringify(params)], {type : 'application/json'}));
	
	
	for( let value of formData.values()){
		console.log(value);
	}
	
	$.ajax({
			url : '/admin/product/edit',
			data : formData,
			processData: false,
			contentType: false,
			enctype: 'multipart/form-data',
			type : 'post',
			traditional : true,
			success : function(data){
				if(data.errorMessage) {
					Swal.fire({
						icon: 'error',
						title: data.errorMessage,
						confirmButtonColor: '#00008b',
						confirmButtonText: '확인'
					}).then((result) => {
						if(result.isConfirmed) {
							return;
						}
					})
				}
				
				if(data.successMessage) {
					Swal.fire({
						icon: 'success',
						title: data.successMessage,
						confirmButtonColor: '#00008b',
						confirmButtonText: '확인'
					}).then((result) => {
						if(result.isConfirmed) {
							window.location.reload(); //페이지 새로고침
							window.history.scrollRestoration = 'manual'; //스크롤 최상단 고정
						}
					})
				}
			},
			error : function(status, error){ console.log(status, error); }
	});

}


