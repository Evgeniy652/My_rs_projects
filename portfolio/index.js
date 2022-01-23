console.log('1.Task:https://github.com/rolling-scopes-school/tasks/blob/master/tasks/portfolio/portfolio-part2.md \n2.Deploy:https://rolling-scopes-school.github.io/evgeniy652-JSFEPRESCHOOL/portfolio/ \n3.Done 18.01.2022 / deadline 24.01.2022 \n4.Score: 85 / 85 \n5.Самооценка  работы : \n 1)[+]Вёрстка соответствует макету. Ширина экрана 768px +48 \n 2)[+]Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15 \n 3)[+]На ширине экрана 768рх и меньше реализовано адаптивное меню +22');
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


