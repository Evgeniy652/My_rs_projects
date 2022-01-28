import i18Obj from './translate.js';

console.log('1.Task:https://github.com/rolling-scopes-school/tasks/blob/master/tasks/portfolio/portfolio-part2.md \n2.Deploy:https://rolling-scopes-school.github.io/evgeniy652-JSFEPRESCHOOL/portfolio/ \n3.Done 18.01.2022 / deadline 24.01.2022 \n4.Score: 85 / 85 \n5.Самооценка  работы : \n 1)[+]Вёрстка соответствует макету. Ширина экрана 768px +48 \n 2)[+]Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15 \n 3)[+]На ширине экрана 768рх и меньше реализовано адаптивное меню +22');
window.onload = function () {
	// console.log('onload');
	const hamburger = document.querySelector(".hamburger");
	const nav = document.querySelector(".navig");
	const langElement = document.querySelector((".switch-lng"));

	langElement.addEventListener(('click'), switchLang)

	hamburger.addEventListener('click', () => {
		// console.log('click');
		hamburger.classList.toggle("is-active");
		nav.classList.toggle('nav-active');
	});
	closeMenu();
	switchingPhoto();
	// переключение языков-начало
	restoreLang();
};

function closeMenu() {
	const navList = document.querySelector('.nav-list');
	const nav = document.querySelector(".navig");
	const hamburger = document.querySelector(".hamburger");
	navList.addEventListener('click', (event) => {
		if ( event.target.tagName == 'A') {
			nav.classList.remove('nav-active');
			hamburger.classList.remove("is-active");
		}
	});

};

function restoreLang() {
	const lang = localStorage.getItem('lang');
	if(!lang) {
		return;
	}
	translate(lang);
};


function switchingPhoto() {
	const allImg = document.querySelectorAll('.portfolio-image');
	const allBtns = document.querySelector(".buttons-portfolio");
	const takeEachBtn = document.querySelectorAll('.portfolio-btn');
	allBtns.addEventListener('click', changeImage);
	function changeImage(event){
		if(event.target.classList.contains('portfolio-btn')){
			const btn= event.target;
			const season = btn.dataset.season;
			allImg.forEach((img,ind)=>img.src=`./assets/img/${season}/${ind+1}.jpg`);
			takeEachBtn.forEach((el)=>{
				el.classList.remove('button1');
				el.classList.remove('button2');
				if(!el.classList.contains('button2') && el!=btn){
					el.classList.add('button2'); 
				}
				})
				btn.classList.add('button1');
		}
	};
};

function switchLang(event) {
	const clickedItem = event.target;
	const lang = localStorage.getItem('lang');

	if (clickedItem.classList.contains('ru') && lang != 'ru') {
		translate('ru');
	}

	if (clickedItem.classList.contains('en') && lang != 'en') {
		translate('en');
	}

	event.preventDefault();
	return;
};


function translate(lang, clickedEl) {
	const foundGOldColor = document.querySelector('.switch-lng .gold-color');
	foundGOldColor.classList.remove('gold-color');

	if (clickedEl) {
		clickedEl.classList.add('gold-color');
	} else {
		const foundLang = document.querySelector('.' + lang);
		foundLang.classList.add('gold-color');
	}

	const allLangElements = document.querySelectorAll('[data-i18n]');

	allLangElements.forEach((el) => {
		const data = el.dataset.i18n;

		if (data == null) {
			console.log('Нету перевода в словаре');
			return;
		}

		if (el.placeholder) {
			el.placeholder = i18Obj[lang][data];
		}

		el.textContent = i18Obj[lang][data];
		setLocalStorage(lang);
	});
}

function setLocalStorage(lang) {
	localStorage.setItem('lang', lang);
}
