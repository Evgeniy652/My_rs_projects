window.onload=function(){
	const btnClick =document.querySelector('.btn');
	const foto =document.querySelector('.image');
	const paragraph =document.querySelector('.text');
	let pressed = document.getElementsByName('translation');
	const divLang = document.querySelector('.lang');
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

    nextImg();
	btnClick.addEventListener('click', nextImg );
	check();

	function check() {
		let url;
		let url2;
	if(pressed[0].checked) {
		 url='https://type.fit/api/quotes';
		 url2= './en-quotes.json';
		 
		}
		
	 if(pressed[1].checked){
		 url='https://api.jsonbin.io/b/62041f53b33b892c9f42d5c4/1';
		 url2='./ru-quotes.json';
		}

		getData(); 
	 async function getData() {
		try{
			const res = await fetch(url);

			let data = await res.json();

		 let saveQuote=num(0,data.length-1);
	
        function nextQuote(){
		  let numQuote=num(0,data.length-1);
		  
		  while(numQuote===saveQuote){
			numQuote=num(0,data.length-1);
		  }
		  saveQuote=numQuote;
		  paragraph.textContent=data[saveQuote].text;
	  }
	  nextQuote();
	  btnClick.addEventListener('click', nextQuote);
	  }

	catch(err){
		const res = await fetch(url2);

		let data = await res.json();

	    let saveQuote=num(0,data.length-1);

		function nextQuote(){
			let numQuote=num(0,data.length-1);
			while(numQuote===saveQuote){
			  numQuote=num(0,data.length-1);
			}
			saveQuote=numQuote;
			paragraph.textContent=data[saveQuote].text;
		}
		nextQuote();
	  btnClick.addEventListener('click', nextQuote);

	   }
	}
	 
	}

	
	divLang.addEventListener('click', (e) => {
	  if(e.target.tagName === 'INPUT'  ){
		check();
		nextImg();
	  }
	})

	console.log('1.https://github.com/rolling-scopes-school/tasks/blob/master/tasks/js30%23/js30-4.md \n2.Deploy:https://rolling-scopes-school.github.io/evgeniy652-JSFEPRESCHOOL/random-jokes/ \n3.Done 08.02.2022 / deadline 14.02.2022 \n4.Score: 70 / 70 \n5.Самооценка  работы : \n 1)[+]Вёрстка +10 \n 2)[+]При загрузке страницы приложения отображается рандомная цитата +10 \n 3)[+]При перезагрузке страницы цитата обновляется (заменяется на другую) +10 \n 4)[+]Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +10 \n 5)[+]Смена цитаты сопровождается любым другим эффектом, например, изменяется изображение или меняется фоновый цвет страницы, или проигрывается звук и т.д * +10 \n 6)[+]Можно выбрать один из двух языков отображения цитат: en/ru или en/be ** +10 \n 7)[+]Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10');
}



