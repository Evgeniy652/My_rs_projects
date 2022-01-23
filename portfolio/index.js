console.log('1.Task:https://github.com/rolling-scopes-school/tasks/blob/master/tasks/portfolio/portfolio-part1.md \n2.Deploy:https://rolling-scopes-school.github.io/evgeniy652-JSFEPRESCHOOL/portfolio/ \n3.Done 04.01.2022 / deadline 17.01.2022 \n4.Score: 110 / 110 \n5.Самооценка  работы : \n 1)[+]Вёрстка валидная +10 \n 2)[+]Вёрстка семантическая +20 \n 3)[+]Вёрстка соответствует макету +48 \n 4)[+]Требования к css + 12 \n 5)[+]Интерактивность, реализуемая через css +20');
window.onload = function () {
	// console.log('onload');
	const hamburger = document.querySelector(".hamburger");
	const nav = document.querySelector(".navig");
	hamburger.addEventListener('click', () => {
		// console.log('click');
		hamburger.classList.toggle("is-active");
		nav.classList.toggle('nav-active');
	});
	closeMenu();
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

}


