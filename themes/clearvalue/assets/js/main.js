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
    let headerElement = document.querySelector('.cv-header');
    let headerButton = document.querySelector('.cv-header .early-access-button');
    if (isVisible) {
        headerElement.classList.remove('header-shadow');
        headerButton.classList.add("d-none");
    } else {
        headerElement.classList.add('header-shadow');
        headerButton.classList.remove("d-none");
    }
}

document.addEventListener('DOMContentLoaded', function(){
    window.addEventListener('scroll', checkHeroVisibility);
}, false);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-159218662-2');
