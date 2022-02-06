const video = document.querySelector('.player-video');
const playBtn = document.querySelector('.play-btn');
const progressRange = document.querySelector('.progress-range');
const volumeRange = document.querySelector('.volume-range');
const volumeBtn = document.querySelector('.volume-btn');
const mainPlayImg = document.querySelector('.main-play-img');

volumeBtn.addEventListener('click', toggleVolume);
playBtn.addEventListener('click', toggleVideo);

volumeRange.addEventListener('input', handleVolumeRange);
progressRange.addEventListener('input', scrub);

video.addEventListener('timeupdate', handleProgress);

video.addEventListener('click', toggleVideo);
mainPlayImg.addEventListener('click', toggleVideo);

function toggleVideo() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}

	playBtn.classList.toggle('pause');
	mainPlayImg.classList.toggle('no-active');
}

function toggleVolume() {
	video.muted = !video.muted;
	volumeBtn.classList.toggle('mute');
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressRange.value = percent;
	changeColorOfProgress(progressRange);

	if (video.currentTime === video.duration) {
		playBtn.classList.toggle('pause');
		mainPlayImg.classList.toggle('no-active');
	}
}

function scrub() {
	video.currentTime = this.value / 100 * video.duration;
	changeColorOfProgress(progressRange);
}

function handleVolumeRange() {
	video.volume = this.value / 100;
	changeColorOfProgress(volumeRange);

	if (video.volume === 0) {
		toggleVolume();
	}

	if (volumeBtn.classList.contains('mute') && video.volume > 0) {
		toggleVolume();
	}
}

function changeColorOfProgress(input) {
	const value = (input.value - input.min) / (input.max - input.min) * 100;
	input.style.background = 'linear-gradient(to right, #bdae82 0%, #bdae82 ' + value + '%, #c8c8c8 ' + value + '%, #c8c8c8 100%)';
};

console.log('1.Task:https://github.com/rolling-scopes-school/tasks/blob/master/tasks/js30%23/js30-3.md \n2.Deploy:https://rolling-scopes-school.github.io/evgeniy652-JSFEPRESCHOOL/custom-video/ \n3.Done 01.02.2022 / deadline 07.02.2022 \n4.Score: 70 / 70 \n5.Самооценка  работы : \n 1)[+]Вёрстка +10 \n 2)[+]Кнопка Play/Pause на панели управления +10 \n 3)[+]Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка +10 \n 4)[+]При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка +10 \n 5)[+]При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10 \n 6)[+]Кнопка Play/Pause в центре видео +10 \n 7)[+]Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10');