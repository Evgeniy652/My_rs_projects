const cards = document.querySelectorAll('.card');
let scoreFound = document.querySelector('.score');
let winFound = document.querySelector('.win');
let numMoves = document.querySelector('.mov');
const statisticBtn = document.querySelector('.btn2');
let moves=0;
let found=0;
let arrClickCards =[];
let countCard=0;
let result='';
let textValue='';
let isInProcess = false;
const records=getResultsAsArray() || [];

(function shuffle() {
	cards.forEach(card => {
	  let ramdomPos = Math.floor(Math.random() * 12);
	  card.style.order = ramdomPos;
	})
  })();

function flipCard() {
    if (isInProcess) {
        return;
    }

    if (countCard==1) {
        isInProcess = true;
    }

  this.classList.add('flip');//Переменная this представляет собой карту , которая была нажата.
  this.classList.add('none-click');
  countCard+=1;
  arrClickCards.push(this);
  moves+=1;
  numMoves.textContent=moves;

  if(countCard==2 && arrClickCards[0].dataset.cardnum===arrClickCards[1].dataset.cardnum){
    isInProcess = false;

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
        setTimeout(() => {
            result = prompt(`Winner !!! Number of moves: ${moves}!\nEnter record name:`, 'Winner');

            if (!result) {
                result='Winner';
            }

            if (records.length === 10) {
                records.shift();
            }

            records.push(result+': '+moves+' moves');
            setResultsToLS(records);
        }, 500)
    }
}

else if (countCard==2 && arrClickCards[0].dataset.cardnum!=arrClickCards[1].dataset.cardnum){
	setTimeout(()=>{
        isInProcess = false;

        arrClickCards[0].classList.remove('flip');
        arrClickCards[1].classList.remove('flip');
        arrClickCards[0].classList.remove('none-click');
        arrClickCards[1].classList.remove('none-click');
        arrClickCards =[];
        countCard=0;
    }, 400);
}
else if (countCard>2){
	arrClickCards.forEach((el)=>{
		el.classList.remove('flip');
	})
}
}


cards.forEach(card => card.addEventListener('click', flipCard));
statisticBtn.addEventListener('click', showStatistic);

function getResultsAsArray() {
    const result = JSON.parse(localStorage.getItem('score'));

    return result;
}

function setResultsToLS(result) {
    const resultAsStr = JSON.stringify(result);

    localStorage.setItem('score', resultAsStr);
}

function showStatistic() {
    let readableScore = '';

    if (!records.length) {
        readableScore = 'There are no any winners yet';
    } else {
        readableScore = [...records].reverse().map((v, i) => `${i+1}. ${v}`).join('\n');
    }

    alert(readableScore);
}
