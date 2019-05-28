class Blog{
	constructor(){
		this.setInitVariables();
		this.registerEvents();
		this.likedSet = new Set();
	}
	setInitVariables(){
		this.$blogList = document.querySelector('.blogList .list');
		this.$likeList = document.querySelector('.likeList .list');
	}
	setInitData(dataURL) {
		this.getData(dataURL, this.insertPosts.bind(this)); // 화살표 함수 때문에 .bind(this) 로 this 를 설정.
	}
	getData(dataURL, fn) {
		const oReq = new XMLHttpRequest();
		oReq.addEventListener('load', () => {
			const list = JSON.parse(oReq.responseText).body;
			fn(list)
		});
		oReq.open('GET', dataURL);
		oReq.send();
	}
	insertPosts(list){
		list.forEach((v) => {
			this.$blogList.innerHTML += `
				<li>
					<a href="#">${v.title}</a>
					<button type="button" class="btn_like">Like</button>
				</li>
			`;
		})
	}
	registerEvents(){
		const $startBtn = document.querySelector('.btn_start');
		const dataURL = './data/data.json';
		$startBtn.addEventListener('click', () => {
			this.setInitData(dataURL);
		});

		//like 버튼 클릭시 찜목록 업데이트.
		this.$blogList.addEventListener('click', ({target}) => {
			const targetClassName = target.className;
			if(! target.classList.contains('btn_like')) return;
			const postTitle = target.previousElementSibling.textContent;
			
			//찜목록 삭제&추가
			if(target.classList.contains('complete')){
				this.likedSet.delete(postTitle);
				target.classList.remove('complete');
				target.innerText = 'Like';
			}else{
				this.likedSet.add(postTitle);
				target.classList.add('complete');
				target.innerText = 'Cancel';
			}

			this.updateLikedList();
		})
	}
	updateLikedList() {
		let likedSum = '';
		this.likedSet.forEach((v) => {
			likedSum += `<li>${v}</li>`;
		})
		this.$likeList.innerHTML = likedSum;
	}
}

export default Blog;

