let sldrRoot = document.querySelector('.background');
let sldrList = sldrRoot.querySelector('.sliders');
let sldrElements = sldrList.querySelectorAll('.img');
let leftArrow = sldrRoot.querySelector('.slider-arrow-left');
let rightArrow = sldrRoot.querySelector('.slider-arrow-right');
let indicatorDots = sldrRoot.querySelector('.slider-dots');
let sldrButton = document.getElementById('auto-button');
let elemCount = 0;
let stop = 'STOP';
let start = 'START';
let autoScroll = 0;
let status = 0;

leftArrow.addEventListener('click', function() {
	check();
	elemPrev();
}, false);
rightArrow.addEventListener('click', function() {
	elemNext();
}, false);
addEventListener('keyup', function(event) {
    if (event.keyCode == 37){
      	check();
		elemPrev();	
    } 
}, false);
addEventListener('keyup', function(event) {
    if (event.keyCode == 39){
    	check();
      	elemNext();
 	}    
}, false);
sldrButton.addEventListener('click', function() {
	console.log(status);
	if (status == 0) {
		console.log('run');
    	sldrButton.innerHTML = stop;
    	setAutoScroll();
    	status = 1;
    	localStorage.setItem('auto', 1);
  	}
  	else {
  		console.log('no');
    	sldrButton.innerHTML = start;
    	clearInterval(autoScroll);
    	status = 0;
    	localStorage.setItem('auto', 0);
  	}
}, false);

function check(){
	if(status == 1){
		clearInterval(autoScroll);
		setAutoScroll();
	};
};

function elemPrev(num) {
	num = num || 1;
	let prevElement = currentElement;
	currentElement -= num;
	if(currentElement < 0) currentElement = elemCount - 1;
	sldrElements[currentElement].style.opacity = '1';
	sldrElements[prevElement].style.opacity = '0';
	dotOn(prevElement); dotOff(currentElement);
	localStorage.setItem('slideIndexStorage',Number(currentElement));
};

function elemNext(num){
	num = num || 1;
	let prevElement = currentElement;
	currentElement += num;
	if(currentElement >= elemCount) currentElement = 0;
	sldrElements[currentElement].style.opacity = '1';
	sldrElements[prevElement].style.opacity = '0';
	dotOn(prevElement); dotOff(currentElement);
	localStorage.setItem('slideIndexStorage', Number(currentElement));
};

function dotOn(num) {
	indicatorDotsAll[num].style.cssText = 'background-color:#DEB887; cursor:pointer;'
};

function dotOff(num) {
	indicatorDotsAll[num].style.cssText = 'background-color:#CD853F; cursor:default;'
};

function setAutoScroll() {
	autoScroll = setInterval(elemNext, 3000);
};	

function initialize() {
	let slideIndex;
	elemCount = sldrElements.length;
	if (localStorage.hasOwnProperty('slideIndexStorage')){
		slideIndex = Number(localStorage.getItem('slideIndexStorage'));
		currentElement = slideIndex;
	}else{
		currentElement = 0;
		localStorage.setItem('slideIndexStorage',0);
	}
	if (localStorage.hasOwnProperty('auto')){
		status = Number(localStorage.getItem('auto'));
	}else{
		localStorage.setItem('auto',0);
	}

	sldrElements[currentElement].style.opacity = '1';
	console.log(status);
	if (status == 1) {
		sldrButton.innerHTML = stop;
		setAutoScroll();
	}else if (status == 0){
		sldrButton.innerHTML = start;
		clearInterval(autoScroll);
	};

	let sum = '', diffNum;

	for(let i = 0; i < elemCount; i++) {
		sum += '<span class="dot"></span>'
	};

	indicatorDots.innerHTML = sum;
	indicatorDotsAll = sldrRoot.querySelectorAll('span.dot');

	for(let n = 0; n < elemCount; n++) {
		indicatorDotsAll[n].addEventListener('click', function() {
		diffNum = Math.abs(n - currentElement);
		if(n < currentElement) {
			check();
			elemPrev(diffNum);
		}
		else if(n > currentElement) {
			check();
			elemNext(diffNum);
		}
	    }, false)
	};
	dotOff(slideIndex);  
	for(let i = 0; i < elemCount; i++) {
		if(i != slideIndex){
			dotOn(i);
		}
	}
}
initialize();
