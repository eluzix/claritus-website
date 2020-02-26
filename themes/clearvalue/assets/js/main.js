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

})
