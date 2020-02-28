const app = {
    earlyAccessClick(e){
        const parent = e.target.closest('.early-access');
        const input = parent.querySelector('input.input');

        console.log('!!!!!!!!!!!!!!!', e, input.value)
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
    let headerButton = document.querySelector('.cv-header .early-access-button');
    if (isVisible) {
        headerButton.classList.add("d-none");
    } else {
        headerButton.classList.remove("d-none");
    }
}

document.addEventListener('DOMContentLoaded', function(){
    console.log('DOMContentLoaded');
    window.addEventListener('scroll', checkHeroVisibility);
}, false);

