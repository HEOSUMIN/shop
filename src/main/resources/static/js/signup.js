/* 아이디 유효성 검사 및 중복 확인 */
$('#memberId').on('propertychange change keyup paste input focusout', function(){
	const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const memberId = $('[name=memberId]').val();
	
	if(memberId != '') {
		$.ajax({
			url : '/member/checkId',
			type: 'post',
			data : {'memberId' : memberId},
			success : function(result){
				//console.log(result);
	    		if(result > 0) {
	    			$('#checkIdMsg').text('이미 사용 중인 아이디입니다');
	    			$('#registBtn').attr('disabled', true);
	    		} else {
		    		if(!regexp.test(memberId) || memberId.length < 6) {
		    			$('#checkIdMsg').text('이메일 형식이 올바르지 않습니다');
		    			$('#registBtn').attr('disabled', true);
		    		} else {
		    			$('#checkIdMsg').text('');
		    			$('#registBtn').attr('disabled', false);
		    		}
	    		}
			},
			error : function(status, error){ console.log(status, error); }
		});
	} else {
		$('#checkIdMsg').text('아이디는 필수 입력 항목입니다');
		$('#registBtn').attr('disabled', true);
	}
});


/* 이메일 자동완성 */
function autoDomain(email, value){
    let emailId = value.split('@');
    let domainList = ['naver.com','gmail.com','hanmail.net','kakao.com','hotmail.com','nate.com','msn.com'];
    let availableBox = new Array; // 자동완성 키워드 리스트
    for(let i=0; i < domainList.length; i++ ){
        availableBox.push( emailId[0] +'@'+ domainList[i] );
    }
    $("#"+email).autocomplete({
        source: availableBox,
        focus: function(event, ui) {
            return false;
        }
    });
}


/* 비밀번호 유효성 검사 */
$('#memberPwd').on('propertychange change keyup paste input focusout', function(){
	const regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
	const memberPwd = $('[name=memberPwd]').val();
	
	if(memberPwd != '') {
		/* 1. 영문, 숫자, 특수기호 포함 여부 검사 */
		if(!regexp.test(memberPwd)) {
			$('#checkPwdMsg').text('8~16자의 영문 대소문자/숫자/특수기호 조합하여 입력하세요');
			$('#registBtn').attr('disabled', true);
		} else {
			$('#checkPwdMsg').text('');
			$('#registBtn').attr('disabled', false);
		}
		
		/* 2. 아이디와 연속 일치 여부 검사 */
		if(isValidPwd()) {
			$('#checkPwdMsg').text('아이디와 연속 3자리 이상 일치하는 비밀번호는 사용할 수 없어요');
			$('#registBtn').attr('disabled', true);
		}
	} else {
		$('#checkPwdMsg').text('비밀번호는 필수 입력 항목입니다');
		$('#registBtn').attr('disabled', true);
	}
});


/* 비밀번호 입력란과 확인란 일치 여부 확인 */
$('#confirmPwd').on('propertychange change keyup paste input', function(){
	if($('#memberPwd').val() != $(this).val()) {
		$('#confirmPwdMsg').text('비밀번호가 일치하지 않습니다');
		$('#registBtn').attr('disabled', true);
	} else {
		$('#confirmPwdMsg').text('');
		$('#registBtn').attr('disabled', false);
	}
});


function isValidPwd() {
	let id = $('[name=memberId]').val();
	let pwd = $('[name=memberPwd]').val();
	
	let tmp = '';
	let count = 0;
	
	for(i=0; i < id.length-2; i++) {
		tmp = id.charAt(i) + id.charAt(i+1) + id.charAt(i+2);
		if(pwd.indexOf(tmp) > -1) { count = count + 1 };
	}
	return count > 0 ? true : false;
}


/* 비밀번호 표시 */
$('.visibility i').click(function(){
	const password = document.querySelector('#memberPwd');
	const confirmPwd = document.querySelector('#confirmPwd');
	
	if(password.type === 'password' && confirmPwd.type === 'password') {
		password.type = 'text';
		confirmPwd.type = 'text';
		$(this).attr('class', 'fa-solid fa-eye');
		$(this).attr('class', 'fa-solid fa-eye').css('filter', 'invert(7%) sepia(98%) saturate(7437%) hue-rotate(243deg) brightness(78%) contrast(132%)');
    } else {
		password.type = 'password';
		confirmPwd.type = 'password';
		$(this).attr('class', 'fa-solid fa-eye-slash');
		$(this).attr('class', 'fa-solid fa-eye-slash').css('filter', 'invert(47%) sepia(2%) saturate(2314%) hue-rotate(167deg) brightness(95%) contrast(80%)');
    }
});


/* 이름 유효성 검사 */
$('#name').focusout(function(){
	const regexp = /^[가-힣]{2,6}$/;
	const name = $('[name=name]').val();
	
	if(name != '') {
		if(!regexp.test(name)) {
			$('#checkNameMsg').text('2글자 이상의 한글 이름을 입력하세요');
			$('#registBtn').attr('disabled', true);
		} else {
			$('#checkNameMsg').text('');
			$('#registBtn').attr('disabled', false);
		}
	} else {
		$('#checkNameMsg').text('이름은 필수 입력 항목입니다');
		$('#registBtn').attr('disabled', true);
	}
});



/* 주소 API */
function DaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            let detail = document.getElementById('detailAddress').value;
            document.getElementById('postalCode').value = data.zonecode;
            document.getElementById('address').value = data.roadAddress;
            if(data.buildingName != '') {
                document.getElementById('detailAddress').value = data.buildingName;
            }
            document.getElementById('detailAddress').focus();
        }
    }).open();
}