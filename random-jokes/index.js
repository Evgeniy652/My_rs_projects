window.onload=function(){
	const btnClick =document.querySelector('.btn');
	const foto =document.querySelector('.image');
	let save=num(1,40);
	function num(min, max) {
		// случайное число от min до (max+1)
		let rand = min + Math.random() * (max + 1 - min);
		return Math.floor(rand);

	  }

	function nextImg(){
		let newNumber=num(1,40);
		while(save===newNumber){
			newNumber=num(1,40);
		}
		save=newNumber;

			foto.src=`./img/${save}.gif`;
	}


	btnClick.addEventListener('click', nextImg);
	nextImg();
}