window.onload = function () {
	const hamburger = document.querySelector('.hamburger');
	const hamburger2 = document.querySelector('.hamburger2');
	const menu = document.querySelector('.menu');
	const navigation = document.querySelector('.nav-mobile');
	const delCont = document.querySelectorAll('.del-cont');
	



	function appearMenu(){
		menu.classList.add('mobail-menu-active');
		menu.classList.remove('mobail-menu');
		backWin.classList.add('overfl');
		delCont.forEach((el)=>{
			el.classList.toggle('delete')
		})
	}

	function leaveMenu(){
		menu.classList.add('mobail-menu');
		menu.classList.remove('mobail-menu-active');
		backWin.classList.remove('overfl');
		delCont.forEach((el)=>{
			el.classList.toggle('delete')
		})
	}

	hamburger.addEventListener(('click'), appearMenu);
	hamburger2.addEventListener(('click'), leaveMenu);


	navigation.addEventListener(('click'), (event)=>{
		if(event.target.tagName=='A' || event.target.tagName=='LI'){
			leaveMenu();
		}
	})


getData();

}

/* slider attempt 2 */

const slider = document.querySelector('.slider');

const cardsImg = document.querySelectorAll('.card-img>img');

const cardsText = document.querySelectorAll('.card-text');

const saved = [];

function randomNum(length){

	if(length==saved.length){
		return saved.shift();
	}

	let numR= Math.floor(Math.random() * length);
	if (saved.includes(numR)) {
		return randomNum(length);
	} else {
		return numR;
	}
}

function fillImg(data) {
	let arrName =[];
	cardsImg.forEach((el)=>{
		let num = randomNum(data.length);
		console.log(num);
		let resObj = data.find((i)=>{
			return i.id==num;
		})
		arrName.push(resObj.name);
		saved.push(+resObj.id);
		el.src=`${resObj.img}`; 
		el.dataset.id=resObj.id;

		})

		let numName = 0;
		cardsText.forEach((e)=>{
			e.textContent = `${arrName[numName]}`;
			numName++;

		})


}

async function getData() {

	const res = await fetch('./pets.json');

	let data = await res.json();

	fillImg(data);

		

		slider.addEventListener(('click'),nextSlide);
		slider.addEventListener('click',(e)=>loadData(e,data,modalWin,backWin));
		

		function nextSlide(event) {
		if (event.target.classList.contains('arrow')){
			fillImg(data);

		}
		  
			  }
		  
}

/* slider  attempt 2 end */




function loadData(event,data,modalWin,backWin) {
	if (!data) {
		return;
	  }
	  
	  if(event.target.classList.contains('card') || event.target.classList.contains('card-img')) {
		const imgEl = event.target.querySelector('img');
		const dataCard = data.find((o)=>{return o.id==imgEl.dataset.id});
		console.log(JSON.stringify(dataCard));
		allAddData(dataCard);
		modalWin.classList.remove('win-n');
		backWin.classList.add('win-back');
	
	  }
	  
	  if(event.target.tagName === 'IMG') {
		const dataCard = data.find((o)=>{ return o.id == event.target.dataset.id});
		console.log(JSON.stringify(dataCard));
		allAddData(dataCard);
		modalWin.classList.remove('win-n');
		backWin.classList.add('win-back');
	  }
	  
	  if(event.target.classList.contains('card-text') || event.target.classList.contains('card-btn')) {
		const imgEl = event.target.closest('.card').querySelector('img');
		const dataCard = data.find((o)=>{ return o.id ==imgEl.dataset.id});
		console.log(JSON.stringify(dataCard));
		allAddData(dataCard);
		modalWin.classList.remove('win-n');
		backWin.classList.add('win-back');
	  }
}

const popImg = document.querySelector('.wind>img');
const h3 = document.querySelector('.modal-content>h3');
const h4 = document.querySelector('.modal-content>h4');
const h5 = document.querySelector('.modal-content>h5');
const age= document.querySelector('.age');
const inoculations = document.querySelector('.inoculations');
const diseases = document.querySelector('.diseases');
const parasites = document.querySelector('.parasites');
const modalWin = document.querySelector('.modal-win');
const backWin = document.body;
const wind =document.querySelector('.wind');


function allAddData(findObj) {
	popImg.src = `${findObj.img}`;
	h3.textContent = `${findObj.name}`;
	h4.textContent = `${findObj.type}-${findObj.breed}`;
	h5.textContent = `${findObj.description}`;
	age.innerHTML= '<b>Age:</b> '+`${findObj.age}`;
	inoculations.innerHTML= '<b>Inoculations:</b> '+ `${findObj.inoculations}`;
	diseases.innerHTML= '<b>Diseases:</b> '+ `${findObj.diseases}`;
	parasites.innerHTML= '<b>Parasites:</b> '+ `${findObj.parasites}`;
}


backWin.addEventListener('click', (event)=>{
	if(backWin.classList.contains('win-back')) {
		if (wind.contains(event.target)) {
			return;
		}

		if(event.target.classList.contains('close') ) {
			modalWin.classList.add('win-n');
			backWin.classList.remove('win-back');
		}

		if(!event.target.classList.contains('wind')) {
			modalWin.classList.add('win-n');
			backWin.classList.remove('win-back');
		}
	}
	
}, true)
