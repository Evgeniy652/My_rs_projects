import i18Obj from './translate.js';

console.log('1.Task:https://github.com/rolling-scopes-school/tasks/blob/master/tasks/portfolio/portfolio-part3.md \n2.Deploy:https://rolling-scopes-school.github.io/evgeniy652-JSFEPRESCHOOL/portfolio/ \n3.Done 25.01.2022 / deadline 31.01.2022 \n4.Score: 80 / 80 \n5.Самооценка  работы : \n 1)[+]Смена изображений в секции portfolio +25\n 2)[+]Перевод страницы на два языка +25 \n 3)[+]Переключение светлой и тёмной темы +25\n 4)[+]Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5');
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
	restoreTheme();
	theme();
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

function restoreTheme() {
	const theme = localStorage.getItem('theme');
	if(!theme) {
		return;
	}
	const imgBtnTheme = document.querySelector('.theme-btn img.hover-logo')
	const arrTheme = document.querySelectorAll('.change-theme');
	const formLink = (img) => `./assets/svg/${img}.svg`;

	arrTheme.forEach((el)=>{
		if (theme === 'dark') {
			el.classList.remove('light-theme');
		} else {
			el.classList.add('light-theme');
		}
	});

	if (theme === 'dark') {
		imgBtnTheme.src = formLink('sun');
	} else {
		imgBtnTheme.src = formLink('dark');
	}
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

function setThemeStorage(theme) {
	localStorage.setItem('theme', theme);
}

function theme() {
	const arrTheme = document.querySelectorAll('.change-theme');
	const btnTheme = document.querySelector('.theme-btn');
	const imgBtnTheme = btnTheme.querySelector('img.hover-logo')
	const formLink = (img) => `./assets/svg/${img}.svg`;

	btnTheme.addEventListener('click', function(event){
		arrTheme.forEach((el)=>{
			  el.classList.toggle('light-theme');
	  	});

		if (imgBtnTheme.src.includes('sun')) {
			imgBtnTheme.src = formLink('dark');
			setThemeStorage('sun');
		} else {
			imgBtnTheme.src = formLink('sun');
			setThemeStorage('dark');
		}
	} )
}
