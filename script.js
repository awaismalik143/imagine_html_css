
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".Navbar_1");
    if (window.scrollY > 50) {
      navbar.classList.add("shrink");
    } else {
      navbar.classList.remove("shrink");
    }
  });


const sections = document.querySelectorAll('.srco');
const navLinks = document.querySelectorAll('.nav-link');

// sccroll 
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - sectionHeight / 6) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('activeee');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('activeee');
    }
  });
});


navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(nav => nav.classList.remove('activeee'));
    link.classList.add('activeee');
  });
});


const bar_icon = document.querySelector('#bar_icon')
const rightdiv = document.querySelector('.bar_div_right_side')
const cross_icon = document.querySelector('#cross_icon')


bar_icon.addEventListener('click',function(){
    rightdiv.classList.add('active')
    rightdiv.classList.remove('close_div')

})
cross_icon.addEventListener('click',function(){
    rightdiv.classList.add('close_div')
    rightdiv.classList.remove('active')

})


// ===========slider ===========================
	
	let testSlide = document.querySelectorAll('.testItem');
	
	let dots = document.querySelectorAll('.dot');

	var counter = 0;

	
	function switchTest(currentTest){
		currentTest.classList.add('active');
		var testId = currentTest.getAttribute('attr');
		if(testId > counter){
			testSlide[counter].style.animation = 'next1 0.5s ease-in forwards';
			counter = testId;
			testSlide[counter].style.animation = 'next2 0.5s ease-in forwards';
		}
		else if(testId == counter){return;}
		else{
			testSlide[counter].style.animation = 'prev1 0.5s ease-in forwards';
			counter = testId;
			testSlide[counter].style.animation = 'prev2 0.5s ease-in forwards';
		}
		indicators();
	}


	function indicators(){
		for(i = 0; i < dots.length; i++){
			dots[i].className = dots[i].className.replace(' active', '');
		}
		dots[counter].className += ' active';
	}


	function slideNext(){
		testSlide[counter].style.animation = 'next1 0.5s ease-in forwards';
		if(counter >= testSlide.length - 1){
			counter = 0;
		}
		else{
			counter++;
		}
		testSlide[counter].style.animation = 'next2 0.5s ease-in forwards';
		indicators();
	}
	function autoSliding(){
		deleteInterval = setInterval(timer, 4000);
		function timer(){
			slideNext();
			indicators();
		}
	}
	autoSliding();

	
	const container = document.querySelector('.indicators');
	container.addEventListener('mouseover', pause);
	function pause(){
		clearInterval(deleteInterval);
	}

	
	const sliderArea = document.querySelector('.testRow'); 
let isDragging = false;
let startX = 0;
let dragThreshold = 50;

function getCoordX(e) {
    return e.touches ? e.touches[0].pageX : e.pageX;
}

function startDrag(e) {
    clearInterval(deleteInterval); 
    isDragging = true;
    startX = getCoordX(e);
    if (e.type === 'mousedown') {
        e.preventDefault(); 
        sliderArea.style.cursor = 'grabbing';
    }
}

function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    if (e.type === 'mouseup') {
        sliderArea.style.cursor = 'grab';
    }
    let endX;
    if (e.type === 'touchend' && e.changedTouches && e.changedTouches.length > 0) {
        endX = e.changedTouches[0].pageX;
    } else if (e.type === 'mouseup') {
        endX = getCoordX(e);
    } else {
        return; 
    }
    const diff = startX - endX; 
    if (Math.abs(diff) > dragThreshold) {
        if (diff > 0) {
            slideNext();
        } else {
            slidePrev();
        }
    }
    autoSliding();
}

function moveDrag(e) {
    if (!isDragging) return;
    if (e.type === 'touchmove') {
        e.preventDefault(); 
    }
}

if (sliderArea) {
    sliderArea.addEventListener('mousedown', startDrag);
    sliderArea.addEventListener('mousemove', moveDrag);
    document.addEventListener('mouseup', endDrag);
    sliderArea.addEventListener('touchstart', startDrag);
    sliderArea.addEventListener('touchmove', moveDrag);
    sliderArea.addEventListener('touchend', endDrag);
    sliderArea.style.cursor = 'grab';
} else {
    console.error("Could not find the slider area element with class '.testRow'.");
}

function slidePrev(){
    testSlide[counter].style.animation = 'prev1 0.5s ease-in forwards';
    if(counter <= 0){
        counter = testSlide.length - 1;
    }
    else{
        counter--;
    }
    testSlide[counter].style.animation = 'prev2 0.5s ease-in forwards';
    indicators();
}

const mainContainer = document.querySelector('.container');
if (mainContainer) {
    mainContainer.addEventListener('dblclick', function() {
        clearInterval(deleteInterval);
        slideNext();
        autoSliding();
    });
}
