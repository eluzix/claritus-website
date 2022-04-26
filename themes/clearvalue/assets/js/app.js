document.addEventListener("DOMContentLoaded", function (event) {
    const slider = document.querySelector('.feedback-slider');
    const flkty = new Flickity(slider, {
        // options
        wrapAround: true,
        prevNextButtons: false,
        cellAlign: 'left',
        draggable: true,
        pageDots: false,
        contain: true,
        adaptiveHeight: false,
    });

    // header
    let scrollPosition = window.scrollY;
    const header = document.querySelector('.header-section');

    window.addEventListener('scroll', function () {
        scrollPosition = window.scrollY;
        if (scrollPosition > 50) {
            header.classList.add('header--fixed');
        } else {
            header.classList.remove('header--fixed');
        }
    });

    // Faq
    const faqButtons = document.querySelectorAll('.faq__question');

    faqButtons.forEach((button) => {
        button.addEventListener('click', () => {

            const activeElem = document.querySelector('.faq--opened');
            const faqBlock = button.closest('.faq');

            if (activeElem && activeElem !== faqBlock) {
                activeElem.classList.remove('faq--opened')
            }

            faqBlock.classList.toggle('faq--opened');
        })
    })
});