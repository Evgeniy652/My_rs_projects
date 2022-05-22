const paginator = {
	total: 48,
	pageIndex: 1,
	pageSize: null,
	// INFO: number of pages
	pageNumber: null,
};
let cachedData = [];
let saved = [];

const navEndEdgeEl = document.querySelector('.nav-end-edge');
const navEndEl = document.querySelector('.nav-end');
const navGoEl = document.querySelector('.nav-go');
const navGoEdgeEl = document.querySelector('.nav-go-edge');

const pageIndexEl = document.querySelector('.nav-num');
const navigationEl = document.querySelector('.navigation');
const slider = document.querySelector('.cards-container');
const cardsImg = document.querySelectorAll('.card-img>img');
const cardsText = document.querySelectorAll('.card-text');

async function start() {
	await getData();
	reportWindowSize();
	renderData(cachedData, 0);
}

async function getData() {
	saved = [];

	const res = await fetch('../pets.json');
	const resData = (await res.json());
	const randomData = resData.map((e) => {
		const rN = randomNum(resData.length);
		const resObj = resData.find((i) => i.id == rN);

		return resObj;
	}).slice(0, paginator.pageSize);

	cachedData = cachedData.concat(randomData);
}

function renderData(data, startIndex) {
	const neededData = data.slice(startIndex);

	cardsImg.forEach((el, i)=>{
		if (i > neededData.length - 1) {
			return;
		}

		const resObj = neededData[i];
		el.src = `.${resObj.img}`;
		el.dataset.id = resObj.id;
		cardsText[i].textContent = `${resObj.name}`;
	});

	pageIndexEl.textContent = paginator.pageIndex;

	clearGray();

	if (paginator.pageIndex === 1) {
		navEndEdgeEl.classList.add('gray');
		navEndEl.classList.add('gray');
	}

	if (paginator.pageIndex === paginator.pageNumber) {
		navGoEdgeEl.classList.add('gray');
		navGoEl.classList.add('gray');
	}

}

function clearGray() {
	navEndEdgeEl.classList.remove('gray');
	navEndEl.classList.remove('gray');
	navGoEdgeEl.classList.remove('gray');
	navGoEl.classList.remove('gray');
}

function arrowsHandler(e) {
	if (e.target.classList.contains('nav-end') || e.target.classList.contains('nav-end-edge')) {
		if (paginator.pageIndex === 1) {
			return;
		}

		if (e.target.classList.contains('nav-end')) {
			paginator.pageIndex = paginator.pageIndex - 1;
			const startIndex = (paginator.pageIndex - 1) * paginator.pageSize;
			getNewDataAndRunRenderFrom(startIndex);

		}

		if (e.target.classList.contains('nav-end-edge')) {
			paginator.pageIndex = 1;
			getNewDataAndRunRenderFrom(0);
		}
	}

	if (e.target.classList.contains('nav-go') || e.target.classList.contains('nav-go-edge')) {
		if (paginator.pageIndex === paginator.pageNumber) {
			return;
		}

		if (e.target.classList.contains('nav-go')) {
			const startIndex = paginator.pageIndex * paginator.pageSize;
			paginator.pageIndex = paginator.pageIndex + 1;
			getNewDataAndRunRenderFrom(startIndex);
		}

		if (e.target.classList.contains('nav-go-edge')) {
			const startIndex = paginator.total - paginator.pageSize;
			paginator.pageIndex = paginator.pageNumber;
			getNewDataAndRunRenderFrom(startIndex);
		}
	}
}

async function checkingDataExisting() {
	const numberOfEntities = cachedData.length;
	const numberOfNeededData = paginator.pageIndex * paginator.pageSize;

	if (numberOfEntities < numberOfNeededData) {
		await getData();
		return checkingDataExisting();
	}

	return;
}

async function getNewDataAndRunRenderFrom(startIndex) {
	await checkingDataExisting();
	renderData(cachedData, startIndex);
}

window.onload = function () {
	const hamburger = document.querySelector('.hamburger');
	const hamburger2 = document.querySelector('.hamburger2');
	const menu = document.querySelector('.menu');
	const navigation = document.querySelector('.nav-mobile');
	const delCont = document.querySelectorAll('.del-cont');

	function appearMenu() {
		menu.classList.add('mobail-menu-active');
		menu.classList.remove('mobail-menu');
		backWin.classList.add('overfl');
		delCont.forEach((el)=>{
			el.classList.toggle('delete')
		})
	}

	function leaveMenu() {
		menu.classList.add('mobail-menu');
		menu.classList.remove('mobail-menu-active');
		backWin.classList.remove('overfl');
		delCont.forEach((el)=>{
			el.classList.toggle('delete')
		})
	}

	window.addEventListener('resize', reportWindowSize);
	navigationEl.addEventListener('click', arrowsHandler);

	hamburger.addEventListener(('click'), appearMenu);
	hamburger2.addEventListener(('click'), leaveMenu);
	slider.addEventListener('click',(e)=> loadData(e, cachedData, modalWin, backWin));
	navigation.addEventListener(('click'), (event) => {
		if (event.target.tagName=='A' || event.target.tagName=='LI') {
			leaveMenu();
		}
	});

	start();
}

function reportWindowSize() {
	const savedCountOnPage = paginator.pageSize && paginator.pageIndex * paginator.pageSize;

	if (window.innerWidth >= 1275) {
		paginator.pageSize = 8;
		paginator.pageIndex = savedCountOnPage ? Math.round(savedCountOnPage/paginator.pageSize) : 1;

		paginator.pageNumber = paginator.total/paginator.pageSize;

		const startIndex = (paginator.pageIndex - 1) * paginator.pageSize;
		getNewDataAndRunRenderFrom(startIndex);
 	}

	if (window.innerWidth >= 763 && 1275 > window.innerWidth) {
		paginator.pageSize = 6;
		paginator.pageIndex = savedCountOnPage ? Math.trunc(savedCountOnPage/paginator.pageSize) : 1;

		paginator.pageNumber = paginator.total/paginator.pageSize;

		const startIndex = (paginator.pageIndex - 1) * paginator.pageSize;
		getNewDataAndRunRenderFrom(startIndex);
	}

	if (window.innerWidth < 763) {
		paginator.pageSize = 3;
		paginator.pageIndex = savedCountOnPage ? Math.trunc(savedCountOnPage/paginator.pageSize) : 1;

		paginator.pageNumber = paginator.total/paginator.pageSize;

		const startIndex = (paginator.pageIndex - 1) * paginator.pageSize;
		getNewDataAndRunRenderFrom(startIndex);
	}
}


/* slider attempt 2 */


function randomNum(length){
	if(length==saved.length){
		return saved.shift();
	}

	let numR= Math.floor(Math.random() * length);
	if (saved.includes(numR)) {
		return randomNum(length);
	} else {
		saved.push(numR);
		return numR;
	}
}

/* slider  attempt 2 end */

function loadData(event,data,modalWin,backWin) {
	if (!data) {
		return;
  	}

  	if (event.target.classList.contains('card') || event.target.classList.contains('card-img')) {
		const imgEl = event.target.querySelector('img');
		const dataCard = data.find((o)=>{return o.id==imgEl.dataset.id});
		console.log(JSON.stringify(dataCard));
		allAddData(dataCard);
		modalWin.classList.remove('win-n');
		backWin.classList.add('win-back');
  	}

  	if (event.target.tagName === 'IMG') {
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
	popImg.src = '.'+`${findObj.img}`;
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
}, true);
