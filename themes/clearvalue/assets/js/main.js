const sliderIntervalTime = 5000; // 5sec

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




    var slider = new KeenSlider("#main-slider", {
        loop: true,
        created: function(instance) {
            let timerId = setInterval(() => {
                document
                    .getElementById("arrow-right").click()
            }, sliderIntervalTime);
            document
                .getElementById("arrow-left")
                .addEventListener("click", function() {
                    instance.prev();
                });

            document
                .getElementById("arrow-right")
                .addEventListener("click", function() {
                    instance.next();
                });
            var dots_wrapper = document.getElementById("dots");
            var slides = document.querySelectorAll(".keen-slider__slide");
            slides.forEach(function(t, idx) {
                var dot = document.createElement("button");
                dot.classList.add("dot");
                dots_wrapper.appendChild(dot);
                dot.addEventListener("click", function() {
                    instance.moveToSlide(idx);
                });
            });
            updateClasses(instance);
        },
        slideChanged(instance) {
            updateClasses(instance);
        },
    });

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

function updateClasses(instance) {
    var slide = instance.details().relativeSlide;
    var arrowLeft = document.getElementById("arrow-left");
    var arrowRight = document.getElementById("arrow-right");
    slide === 0
        ? arrowLeft.classList.add("arrow--disabled")
        : arrowLeft.classList.remove("arrow--disabled");
    slide === instance.details().size - 1
        ? arrowRight.classList.add("arrow--disabled")
        : arrowRight.classList.remove("arrow--disabled");

    var dots = document.querySelectorAll(".dot");
    dots.forEach(function(dot, idx) {
        idx === slide
            ? dot.classList.add("dot--active")
            : dot.classList.remove("dot--active");
    });
}


document.addEventListener('DOMContentLoaded', function(){
    window.addEventListener('scroll', checkHeroVisibility);

    let toggle = document.getElementById('nav-toggle');
    let menu = document.getElementById('nav-menu');

    toggle.onclick = function() {
        toggle.classList.toggle('is-active');
        menu.classList.toggle('is-active');
        toggleFixed.classList.toggle('is-active');
        menuFixed.classList.toggle('is-active');
    };

    let toggleFixed = document.getElementById('nav-toggle-fixed');
    let menuFixed = document.getElementById('nav-menu-fixed');

    toggleFixed.onclick = function() {
        toggle.classList.toggle('is-active');
        menu.classList.toggle('is-active');
        toggleFixed.classList.toggle('is-active');
        menuFixed.classList.toggle('is-active');
    };


}, false);

async function getEarlyAccess(elem) {
    let value = (elem && elem.parentElement && elem.parentElement.parentElement
        && elem.parentElement.parentElement.querySelector('.email-input input')
        && elem.parentElement.parentElement.querySelector('.email-input input').value)
        || (elem.parentElement.parentElement.parentElement.querySelector('.email-input input')
            && elem.parentElement.parentElement.parentElement.querySelector('.email-input input').value)
    ;
    console.log('elem',elem);
    console.log('value',value);
    if (value) {
        let response = await fetch(`https://29iax1x5e5.execute-api.us-east-1.amazonaws.com/dev/waiting-list?email=${encodeURIComponent(value)}`);

        if (response.ok) {
            if (elem.parentElement.parentElement.querySelector('.email-input input')) {
                elem.parentElement.parentElement.querySelector('.email-input input').value = '';
            }
            if (elem.parentElement.parentElement.parentElement.querySelector('.email-input input')) {
                elem.parentElement.parentElement.parentElement.querySelector('.email-input input').value = '';
            }
        } else {
            console.log(response.status);
        }
    }
}
