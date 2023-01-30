
window.onload = () => document.querySelector('.wrapper').classList.add('wrapper_show');


function scrollIndicator(){
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector(".scroll-progress").style.width = scrolled + "%";
}

function fixHeader(){
    const navbarHeader = document.querySelector('.navbar__header');
    const navbarBody = document.querySelector('.navbar__body');
    const header = document.querySelector('header');

    if(navbarHeader.getBoundingClientRect().bottom <= 0){
        navbarBody.classList.add('navbar__body_fixed');
        header.classList.add('header_margin');
    }
    else {
        navbarBody.classList.remove('navbar__body_fixed');
        header.classList.remove('header_margin');
    }
}

window.onscroll = () => {
    fixHeader();
    scrollIndicator();
}


(function showContent(){
    const observer = new IntersectionObserver((entries, observer) => 
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('intersacting');
                observer.unobserve(entry.target);
            }
        }), {threshold: .5}
    )
    observer.observe(document.querySelector('.portfolio__preview'));
}());


(function slider(){
    const sliderBody = document.querySelector('.slider__body');
    const sliderLine = document.querySelector('.slider__line');
    const sliderItem = document.querySelector('.slider__item');
    const sliderBodyWidth = Number(window.getComputedStyle(sliderBody).width.slice(0, -2));
    const sliderItemWidth = Number(window.getComputedStyle(sliderItem).width.slice(0, -2))+20;
    const step = Math.floor(sliderBodyWidth / sliderItemWidth) * sliderItemWidth;
    const numOfItems = document.getElementsByClassName('slider__item').length;

    let transform = 0;

    const onSliderBtn = (direction) => {
        if(direction === 'left'){
            if(transform == 0) transform -= (Math.ceil(numOfItems / Math.floor(sliderBodyWidth / sliderItemWidth))-1) * step;
            else transform += step;
        }
        if(direction === 'right'){
            if(numOfItems - Math.floor(Math.abs(transform) / sliderItemWidth) <=  Math.floor(sliderBodyWidth / sliderItemWidth)) transform = 0;
            else transform -= step;
        }
        sliderLine.style = `transform: translateX(${transform}px`;
    }
    document.querySelector('.slider__btn-left').addEventListener('click', () => onSliderBtn('left'));
    document.querySelector('.slider__btn-right').addEventListener('click', () => onSliderBtn('right'));
}());


function toggleBurger(){
    document.querySelector('.burger__btn').classList.toggle('burger__btn_active');
    document.querySelector('.overlay').classList.toggle('overlay_active');
    document.body.classList.toggle('no-scroll');
}

document.querySelector('.burger__btn').onclick = toggleBurger;

document.querySelectorAll('.overlay__item').forEach(item => item.onclick = toggleBurger);

document.querySelectorAll('a[href*="#"]').forEach((item) => {
    item.onclick = e => {
        e.preventDefault()
        const elem = document.querySelector('' + item.getAttribute('href'));
        const level = elem.getBoundingClientRect().top - window.innerHeight/3.5;
        window.scrollBy({
            top: level,
            behavior: "smooth"
        })
    }
});


document.querySelector('.footer__up').onclick = () => window.scrollTo(0, 0);


