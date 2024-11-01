
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

/*========================option=================================*/
/* option 카테고리 추가 */
function addOptionCategry(){
	let optCategoty = document.getElementById('optionCategoryNo').value;
	
	if(optCategoty == 'etc'){
		 var x = $(this).closest('tr').index();
	     var y = $(this).closest('td').index();
	     console.log(x+"/"+y+"/"+$(this).closest('td').text());
		
		
		/*
		
		let table_body = document.getElementById('table_body');
	    let first_tr   = table_body.firstElementChild;
			
		var checkRows = $("[name='chkbox']:checked");

		for(var i=checkRows.length-1; i>-1; i--){
			checkRows.eq(i).closest('tr').remove();
		}
		
		
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
	}*/
	
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

/* 옵션 열기 클릭 시 */
function optionOpen(){
	if ($('.optionAdd').css('display') == 'none') {
		$('.optionAdd').show();  
		$('.optionDetailBtn').show();  
		$('.optionDetailDiv').show(); 
		
	} else {
		$('.optionAdd').hide();
		$('.optionDetailBtn').hide();  
		$('.optionDetailDiv').hide(); 
	}
}

/* 옵션 추가 버튼 클릭 시 */
let idNum = 0;
function optionAdd(){
	$('.optionAdd').append(
		'<div class="optionForm" id="optionForm'+ idNum +'">'+
			'<ul>'+
				'<li style="width:40%"><p>옵션명</p></li>'+
				'<li><p>옵션값 ( ,로 옵션값을 구분하여 입력해 주세요.)</p></li>'+
				'<li style="width:30%"></li>'+
				'<li style="width:10%"></li>'+
			'</ul>'+
			'<ul class="option111">'+
				'<li style="width:40%"><input type="text" class="optCategoryNm" name="optCategoryNm" id="optCategoryNm"></li>'+
				'<li><input type="text" name="optNm" id="optNm"></li>'+
				'<li style="width:30%"><input type="checkbox" id="combYn"><span style="color:#82888d;font-weight:400;">필수</span></li>'+
				'<li style="width:10%" id="optionDelBtn"><span>&times;</span></li>'+				
			'</ul>'+
		'</div>'
	)
	idNum++;
	
	$('.optionDetailBtn').show();  
}

/* 옵션 삭제 버튼 클릭 시 */
$(document).on('click', '#optionDelBtn', function(){
	alert("옵션 변경시 세부 입력사항을 새로 입력해야 합니다. 삭제하시겠습니까?");			//수정 
	
	$(this).closest('.optionForm').remove();
	$('.optionTable').remove();
});

/* 세부사항 입력 버튼 클릭 시 */
var combineYn = '';
function optionDetailBtn(){
	
	$('.optionTable').remove();
	
	var combineYn = document.getElementById('combineYn').value;
	console.log("combineYn::"+combineYn);
	
	/* 조합형 */  
	if(combineYn == "Y"){		//수정
	
		/* thead 구성 */
		var textThead="";
		for(var i=0; i< optCategory.length; i++){
			textThead += '<th>'+optCategory[i]+'</th>'
		}
				
		$('.optionDetailDiv').append(
			'<table class="optionTable" id="optionTable">'+
				'<thead>'+
			    	'<tr>'+
				      	'<th>checkBox</th>'+
						textThead+
						'<th>옵션추가금액</th>'+
				       	'<th>재고</th>'+
				        '<th>재고추가</th>'+
				        '<th>상태</th>'+
					'</tr>'+
				'</thead>'+
				'<tbody id="table_body">'+
				'</tbody>'+
			'</table>'	
		)
		
		var textTbody="";
		for(let i=0; i< optValue.length; i++){	//우선 옵션 2개까지만 가능하도록. 후에 수정 
			for(let j=0; j< optValue[i].length; j++){
				textTbody += '<tr>'+
								'<td>'+
									'<input type="checkbox" name="chkbox"  class="form_control">'+
								'</td>'+
								'<td>'+
									'<p>'+optValue[i][j]+'</p>'+
								'</td>'+
								'<td>'+
									'<p>'+optValue[i+1][j]+'</p>'+
								'</td>'+
								'<td>'+
									'<input type="text"  class="form_control">'+
								'</td>'+
								'<td>'+
									'<input type="text"   class="form_control">'+
								'</td>'+
								'<td>'+
									'<input type="text"   class="form_control">'+
								'</td>'+
								'<td>'+
									'<input type="text"   class="form_control">'+
								'</td>'+					
							'</tr>'
			}
		}
		/* tbody 구성 */
		$('#table_body').append(
			textTbody
		)
					
	}else{
	/* 비조합형 */
		let optCategory = new Array(); //옵션명 담을 배열 
		let optValue = new Array();		//옵션값 담을 배열
	
		for(var i=0; i< $('.option111').length ; i++){
			var optCategoryNm = $('.option111:eq('+i+') > li:eq(0)').children('#optCategoryNm').val();	//옵션명
			var optNm = $('.option111:eq('+i+') > li:eq(1)').children('#optNm').val()					//옵션값
			optCategory.push(optCategoryNm);
			optValue.push(optNm);
		}
	
	
		let optNmArry = new Array();
		var text="";
		for(var i=0; i< optCategory.length; i++){
			optNmArry = optValue[i].split(",");	// optValue배열에 담긴값 텍스트로 저장 
		
			for(var j=0; j<optNmArry.length; j++){
				text += '<tr>'+
							'<td>'+
								'<input type="checkbox" name="chkbox"  class="form_control">'+
							'</td>'+
							'<td>'+
								'<p>'+optCategory[i]+'</p>'+
							'</td>'+
							'<td>'+
								'<p>'+optNmArry[j]+'</p>'+
							'</td>'+
							'<td>'+
								'<input type="text" id="optionExtChrg"  class="form_control">'+
							'</td>'+
							'<td>'+
								'<input type="text" id="optionStock"  class="form_control">'+
							'</td>'+
							'<td>'+
								'<input type="text"   class="form_control">'+
							'</td>'+
							'<td>'+
								'<input type="text"   class="form_control">'+
							'</td>'+					
						'</tr>'
			}
		}
		
		$('.optionDetailDiv').show();  
		
		$('.optionDetailDiv').append(
			'<table class="optionTable" id="optionTable">'+
				'<thead>'+
			    	'<tr>'+
				      	'<th>checkBox</th>'+
						'<th>옵션명</th>'+
						'<th>옵션값</th>'+
						'<th>옵션추가금액</th>'+
				       	'<th>재고</th>'+
				        '<th>재고추가</th>'+
				        '<th>상태</th>'+
					'</tr>'+
				'</thead>'+
				'<tbody id="table_body">'+
				text+
				'</tbody>'+
			'</table>'
		)
	}
}

function test(){

}


$("#combineYn").change(function(){
	
	if($("#combineYn").is(":checked")){
		document.getElementById('combineYn').value = "Y";
		optionDetailBtn();
		
	}else{
		document.getElementById('combineYn').value = "N";
		optionDetailBtn();
	}
});
	
		
/*==============================================================*/


/* 금액입력시 (숫자, 콤마) */ 
function onlyNumberWithComma(obj) {
  obj.value = Number(obj.value.replace(/[^0-9]/g,'')).toLocaleString();
}

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
	let optionNameArr = new Array();	
	let optionValueArr = new Array();
	let optionExtChrgArr = new Array();
	let optionStockArr = new Array();
	let optArr = new Array();
		
	for(var i=0; i< $('#table_body tr').length; i++){
		
		var tr =  $('#table_body tr').eq(i);
		var td = tr.children();

		var optionName = td.eq(1).find('p').text(); 					//옵션명 										
		var optionValue = td.eq(2).find('p').text();					//옵션값
		var optionExtChrg = td.eq(3).find('input[type="text"]').val();	//옵션추가금액 			
		var optionStock = td.eq(4).find('input[type="text"]').val();	//재고 
		
		alert(optionName+"    "+optionValue+"     "+optionExtChrg+"      "+optionStock);
		
		optionNameArr.push(optionName);
		optionValueArr.push(optionValue);
		optionExtChrgArr.push(optionExtChrg);
		optionStockArr.push(optionStock);
		
		optArr.push({ optionNameArr : optionName,
						optionValueArr : optionValue,
						optionExtChrgArr : optionExtChrg,
						optionStockArr : optionStock
		});
	}

	console.log(optionNameArr);
	console.log(optionValueArr);
	console.log(optionExtChrgArr);
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
				 , optionNameArr : optionNameArr
				 , optionValueArr : optionValueArr
				 , optionExtChrgArr : optionExtChrgArr
				 , optionStockArr : optionStockArr
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
	
	//옵션
	let optionNameArr = new Array();	
	let optionValueArr = new Array();
	let optionExtChrgArr = new Array();
	let optionStockArr = new Array();
	let optArr = new Array();
		
	for(var i=0; i< $('#table_body tr').length; i++){
		
		var tr =  $('#table_body tr').eq(i);
		var td = tr.children();

		var optionName = td.eq(1).find('p').text(); 					//옵션명 										
		var optionValue = td.eq(2).find('p').text();					//옵션값
		var optionExtChrg = td.eq(3).find('input[type="text"]').val();	//옵션추가금액 			
		var optionStock = td.eq(4).find('input[type="text"]').val();	//재고 
		
		alert(optionName+"    "+optionValue+"     "+optionExtChrg+"      "+optionStock);
		
		optionNameArr.push(optionName);
		optionValueArr.push(optionValue);
		optionExtChrgArr.push(optionExtChrg);
		optionStockArr.push(optionStock);
		
		optArr.push({ optionNameArr : optionName,
						optionValueArr : optionValue,
						optionExtChrgArr : optionExtChrg,
						optionStockArr : optionStock
		});
	}

	console.log(optionNameArr);
	console.log(optionValueArr);
	console.log(optionExtChrgArr);
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
				 , optionNameArr : optionNameArr
 				 , optionValueArr : optionValueArr
 				 , optionExtChrgArr : optionExtChrgArr
 				 , optionStockArr : optionStockArr
 				 , optArrLength : optArr.length
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


/* ---------- details ---------------*/

/* 옵션 드롭다운 */
$('.dropdown').on('click', function() {
	$('.dropdown').not($(this)).removeClass('open');
	$(this).toggleClass('open');
	if ($(this).hasClass('open')){
		$(this).find('.option').attr('tabindex', 0);
		$(this).find('.selected').focus();
	} else {
		$(this).find('.option').removeAttr('tabindex');
		$(this).focus();
	}
	
});

/* 드롭다운 옵션 선택 시 */
let selectedIdx = 0;
let prev_optionNameArry = new Array();
let selectedText = "";
let optionExtChrg = 0;
$('.dropdown .option').on('click', function() {
	
	/* 옵션 seletbox 선택전 초기값 저장 */
	let optionName = $(this).closest('.dropdown').find('.current').attr('value');
	prev_optionNameArry.push(optionName);
	
	
	$(this).closest('.list').find('.selected').removeClass('selected');
	$(this).addClass('selected');
	
	
	selectedText += optionName+": "+$(this).closest('.list').find('.selected').attr('value')+"\n";
	optionExtChrg += parseInt($(this).find('#optionExtChrg').attr('value'));
	
	
	//선택한 값으로 selectbox값 변경 
	let text = $(this).data('display-text')|| $(this).html();
	$(this).closest('.dropdown').find('.current').html(text); //선택값 반영
	//$(this).closest('.dropdown').prev('select').val($(this).data('value')).trigger('change');
	
	
	//옵션개수
	let optionCnt = parseInt($('.dropdown').length)-1;		
	if($(this).closest('.dropdown').index() == optionCnt){ 	//마지막 옵션 선택인 경우 
		
		//모든 옵션 선택시 optionBox 초기값으로 돌리기
		for(var i=0; i<=optionCnt; i++){		
			$('.current').eq(i).text(prev_optionNameArry[i]+"을 선택해주세요. ");
		}
		
		//이미 선택된 옵션인지 확인
		if($('#selectedName').text() === selectedText) {
			//초기화 
			prev_optionNameArry.splice(0);
			selectedText = "";
			optionExtChrg = 0;
			
			Swal.fire({
				icon: 'warning',
				title: '이미 선택된 옵션입니다',
				confirmButtonColor: '#00008b',
				confirmButtonText: '확인'
			}).then((result) => {
				if(result.isConfirmed) {
					return;
				}
			})
			
			return;
		}
		
		$('#selectedOption').append(
			'<div class="selectedInfo">' +
				'<div id="selectedName" class="selectedName' + selectedIdx + '"></div>' +
				'<div id="selectedExtchrg" class="selectedExtchrg' + selectedIdx + '"></div>' +
				'<div class="countBox">' +
					'<button type="button" class="button-down" disabled><i class="fa-solid fa-minus"></i></button>' +
					'<input type="number" class="selectedAmount" name="selectedAmount" value="1">' +
					'<button type="button" class="button-up"><i class="fa-solid fa-plus"></i></button>' +
				'</div>' +
				'<div id="selectedPrice" class="selectedPrice'+selectedIdx+'"></div>' +
				'<a href="#" class="button-delete" return false;"><i class="fa-solid fa-xmark"></i></a>' +
			'</div>'
		)
		
		$('.selectedName' + selectedIdx).text(selectedText);		//상품옵션				
		let hiddenPriceValue = $('.getHiddenPrice').attr('value');	//판매가 value
		
		//옵션추가금액 합한 금액 
		let totPrice = parseInt(hiddenPriceValue) + optionExtChrg;
		$('.selectedPrice'+ selectedIdx).text(totPrice.toLocaleString('ko-KR'));
		$('.selectedPrice'+ selectedIdx).attr('value', totPrice);
		
		//총옵션추가금액 
		$('.selectedExtchrg'+ selectedIdx).attr('value', optionExtChrg);
		
		sumTotalPrice();
		
		selectedIdx++;
		
		//초기화 
		prev_optionNameArry.splice(0);
		selectedText = "";
		optionExtChrg = 0;
	}
	
});

/* 총 금액 계산 */
function sumTotalPrice() {
	let total = 0;
	for(var i=0; i<=selectedIdx; i++){
		document.querySelectorAll('.selectedPrice'+i).forEach(function(item){
			let price = parseInt(item.getAttribute('value'));
			total += price;
		});
	}
	$('#totalPrice').text(total.toLocaleString('ko-KR'));
}

/* 옵션 선택 후 삭제 버튼 클릭 시 */
$(document).on('click', '.selectedInfo .button-delete', function(){ //up 버튼
	$(this).closest('.selectedInfo').remove();
	sumTotalPrice(); //합계 금액 다시 계산
});

/* 옵션 수량 증가 */
$(document).on('click', '.countBox .button-up', function(){ //up 버튼
	let selectedAmount = $(this).closest('div.selectedInfo').find('input[name=selectedAmount]').val(); //input
	//console.log("selectedAmount : " + selectedAmount);
	let count = parseInt(selectedAmount);
	count++;
	if(count > 1) {
		$(this).closest('div.selectedInfo').find('.button-down').prop('disabled', false);
	}
	$(this).closest('div.selectedInfo').find('input[name=selectedAmount]').val(count); //증가한 수량 대입

	//수량에 따른 판매가 계산
	let originalPrice = $('.getHiddenPrice').attr('value');
	let optionExtChrg = $(this).closest('div.selectedInfo').find('#selectedExtchrg').attr('value');
	let price = parseInt(originalPrice)+parseInt(optionExtChrg);
	let result = count * price;
	
	$(this).closest('div.selectedInfo').find('#selectedPrice').attr('value', result);
	$(this).closest('div.selectedInfo').find('#selectedPrice').text(result.toLocaleString('ko-KR') + "원"); //원화 단위로 출력
	sumTotalPrice();
});

/* 옵션 수량 감소 */
$(document).on('click', '.countBox .button-down', function(){ //down 버튼
	let selectedAmount = $(this).closest('div.selectedInfo').find('input[name=selectedAmount]').val(); //input
	//console.log("selectedAmount : " + selectedAmount);
	let count = parseInt(selectedAmount);
	count--;
	console.log(count);
	if(count == 1) {
		$(this).closest('div.selectedInfo').find('.button-down').prop('disabled', true);
	}
	$(this).closest('div.selectedInfo').find('input[name=selectedAmount]').val(count); //감소한 수량 대입
	
	//수량에 따른 판매가 계산
	let originalPrice = $('.getHiddenPrice').attr('value');
	let optionExtChrg = $(this).closest('div.selectedInfo').find('#selectedExtchrg').attr('value');
	let price = parseInt(originalPrice)+parseInt(optionExtChrg);
	let result = count * price;
	
	$(this).closest('div.selectedInfo').find('#selectedPrice').attr('value', result);
	$(this).closest('div.selectedInfo').find('#selectedPrice').text(result.toLocaleString('ko-KR') + "원"); //원화 단위로 출력
	sumTotalPrice();
});

/* 상품 선택 내역 */
function setOrderList() {
	//일치하는 옵션 고유번호 확인
	document.querySelectorAll('.selectedName').forEach(function(currentValue, currentIndex) {
		let searchName = currentValue.innerText;
		let options = document.querySelectorAll('.option');
		for(let i=0; i < options.length; i++) {
			if(options[i].innerText === searchName) {
				//console.log(options[i].value);
				orderOptionNo.push(options[i].value);
			}
		}
	});
	//옵션별 선택 수량 확인
	document.querySelectorAll('.selectedAmount').forEach(function(currentValue) {
		//console.log(currentValue.value);
		orderOptionQt.push(currentValue.value);
	});
}


