const app = {
    earlyAccessClick(e){
        const parent = e.target.closest('.early-access');
        const input = parent.querySelector('input.input');
    },
};

window.addEventListener('load', function(){
    const buttons = document.querySelectorAll('.early-access .button');
    for (let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', app.earlyAccessClick)
    }

});

function checkHeroVisibility() {
    let heroElement = document.querySelector('.hero');
    if (!heroElement) {
        return false;
    }
    let rect = heroElement.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;

    // Only completely visible elements return true:
    let isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    let headerElement = document.querySelector('.cv-header.header-shadow');
    if (!isVisible && window.scrollY > 100) {
        headerElement.classList.remove('d-none');
        headerElement.classList.add('slide-in');
    } else {
        headerElement.classList.add('d-none');
        headerElement.classList.remove('slide-in');
    }

}

document.addEventListener('DOMContentLoaded', function(){
    window.addEventListener('scroll', checkHeroVisibility);
}, false);
