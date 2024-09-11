
/* 관리자페이지 상품목록 검색어 유무 확인 */
function checkKeywordForProduct() {
	let form = document.querySelector('#searchForm');
	let keyword = document.querySelector('input[name=keyword]').value;
	if(keyword.length == 0) {
		Swal.fire({
			icon: 'warning',
			title: '검색어를 입력하세요',
			confirmButtonColor: '#00008b',
			confirmButtonText: '확인'
		}).then((result) => {
			if(result.isConfirmed) {
				window.location.assign('/admin/product/list');
			}
		})
	} else {
		form.submit();
	}
}