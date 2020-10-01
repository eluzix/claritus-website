const sliderIntervalTime = 60000000; // 5sec

const app = {
    // earlyAccessClick(e){
    //     const parent = e.target.closest('.early-access');
    //     const input = parent.querySelector('input.input');
    // },

    overlayScrollbar() {
        OverlayScrollbars(document.querySelectorAll('body'), {
            scrollbars: {
                snapHandle: true,
                clickScrolling: true,
                autoHide: 'scroll',
            },
        });
    },

    setupSnapScrolling() {
        try {
            const observer = new IntersectionObserver((entries) => {
                const navbar = document.querySelector('header nav.nav')

                entries.forEach((entry) => {
                    // console.log(entry.target, '>>>', entry.intersectionRatio)
                    if (entry.intersectionRatio >= 0.95) {
                        entry.target.classList.add('is-visible')
                        entry.target.classList.forEach((cls) => {
                            if (cls.startsWith('section-')) {
                                navbar.classList.add('on-' + cls)
                            }
                        })
                    } else {
                        entry.target.classList.remove('is-visible')
                        entry.target.classList.forEach((cls) => {
                            if (cls.startsWith('section-')) {
                                navbar.classList.remove('on-' + cls)
                            }
                        })
                    }
                })
            }, {
                rootMargin: '0px',
                threshold: 0.95
            })

            const sections = [...document.querySelectorAll('.home section')]
            sections.forEach((section, index) => {
                observer.observe(section)
            })
        } catch (e) {
            console.log('[IntersectionObserver] error:', e)
        }
    },

    setupSlider() {
        if (document.querySelector('.home')) {
            var slider = new KeenSlider("#main-slider", {
                loop: true,
                created: function (instance) {
                    let timerId = setInterval(() => {
                        document
                            .getElementById("arrow-right").click()
                    }, sliderIntervalTime);
                    document.querySelectorAll('.arrow--right').forEach(element => {
                        element.addEventListener("click", function () {
                            instance.next();
                        });
                    });
                    document.querySelectorAll('.arrow--left').forEach(element => {
                        element.addEventListener("click", function () {
                            instance.prev();
                        });
                    })

                    var dots_wrapper = document.getElementById("dots");
                    var slides = document.querySelectorAll(".keen-slider__slide");
                    slides.forEach(function (t, idx) {
                        var dot = document.createElement("button");
                        dot.classList.add("dot");
                        dots_wrapper.appendChild(dot);
                        dot.addEventListener("click", function () {
                            instance.moveToSlide(idx);
                        });
                    });
                    updateClasses(instance);
                },
                slideChanged(instance) {
                    updateClasses(instance);
                },
            });
        }
    },

    initMenuOpening() {
        var control = document.getElementById('menu-burger');
        control.onclick = function() {
            toggleMenu();
        };
        var controlFooter = document.getElementById('menu-burger-footer');
        controlFooter.onclick = function() {
            toggleMenu();
        };

        var closeIcon = document.getElementById('icon-close');
        closeIcon.onclick = function() {
            toggleMenu();
        };

        var background = document.querySelector('#menu .background');
        background.onclick = function() {
            toggleMenu();
        };
    }
};

function toggleMenu() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('menu--active');
}

function updateClasses(instance) {
    var slide = instance.details().relativeSlide;

    var dots = document.querySelectorAll(".dot");
    dots.forEach(function(dot, idx) {
        idx === slide
            ? dot.classList.add("dot--active")
            : dot.classList.remove("dot--active");
    });
}

document.addEventListener('DOMContentLoaded', function () {

    app.overlayScrollbar();
    app.setupSnapScrolling();
    app.setupSlider();
    app.initMenuOpening();

});
