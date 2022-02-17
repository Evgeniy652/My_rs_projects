const cards = document.querySelectorAll('.card');
let scoreFound = document.querySelector('.score');
let winFound = document.querySelector('.win');
let numMoves = document.querySelector('.mov');
let moves=0;
let found=0;
let arrClickCards =[];
let countCard=0;
let records={};

(function shuffle() {
	cards.forEach(card => {
	  let ramdomPos = Math.floor(Math.random() * 12);
	  card.style.order = ramdomPos;
	})
  })();

function flipCard() {
  this.classList.add('flip');//Переменная this представляет собой карту , которая была нажата.
  countCard+=1;
  arrClickCards.push(this);
  moves+=1;
  numMoves.textContent=moves;
  if(countCard==2 && arrClickCards[0].dataset.cardnum===arrClickCards[1].dataset.cardnum){
	arrClickCards[0].classList.add('none-click');
	arrClickCards[1].classList.add('none-click');
	found+=1;
	 arrClickCards =[];
     countCard=0;
	 scoreFound.textContent=found;
	 if(found==1 ){
     winFound.textContent='quick-witted';
	 }
	 if(found==2 ){
		winFound.textContent='able';
		}
	if(found==3 ){
		winFound.textContent='clever';
			}
	if(found==4 ){
		winFound.textContent='fierce';
				}
	 if(found==5 ){
		winFound.textContent='super brain';
		}
	 if(found==6){
		winFound.textContent='Winner!!!';
		setTimeout(()=>{ let result=prompt(`Winner !!! Number of moves: ${moves}! \n Enter record name:`, 'Winner')},250) ;
		if(result!=null && localStorage.length<10){
			localStorage.setItem(moves,result);
			
		}
		if(result!=null && localStorage.length>9){
			let a=localStorage.key(0);
			localStorage.removeItem(a);
			localStorage.setItem(moves,result);
			}
		}
		}

else if (countCard==2 && arrClickCards[0].dataset.cardnum!=arrClickCards[1].dataset.cardnum){
	setTimeout(()=>{arrClickCards[0].classList.remove('flip');
	arrClickCards[1].classList.remove('flip');
	 arrClickCards =[];
     countCard=0;}, 400);
}
else if (countCard>2){
	arrClickCards.forEach((el)=>{
		el.classList.remove('flip');
	})
}
}


cards.forEach(card => card.addEventListener('click', flipCard));






  
 



