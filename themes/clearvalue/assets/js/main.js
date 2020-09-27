const sliderIntervalTime = 6000; // 5sec

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
};


// function checkHeroVisibility() {
//     let heroElement = document.querySelector('.hero');
//     if (!heroElement) {
//         return false;
//     }
//     let rect = heroElement.getBoundingClientRect();
//     let elemTop = rect.top;
//     let elemBottom = rect.bottom;
//
//     // Only completely visible elements return true:
//     let isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
//     let headerElement = document.querySelector('.cv-header.header-shadow');
//     if (!isVisible && window.scrollY > 100) {
//         headerElement.classList.remove('d-none');
//         headerElement.classList.add('slide-in');
//     } else {
//         headerElement.classList.add('d-none');
//         headerElement.classList.remove('slide-in');
//     }
//
// }

// function updateClasses(instance) {
//     var slide = instance.details().relativeSlide;
//     var arrowLeft = document.getElementById("arrow-left");
//     var arrowRight = document.getElementById("arrow-right");
//     slide === 0
//         ? arrowLeft.classList.add("arrow--disabled")
//         : arrowLeft.classList.remove("arrow--disabled");
//     slide === instance.details().size - 1
//         ? arrowRight.classList.add("arrow--disabled")
//         : arrowRight.classList.remove("arrow--disabled");
//
//     var dots = document.querySelectorAll(".dot");
//     dots.forEach(function(dot, idx) {
//         idx === slide
//             ? dot.classList.add("dot--active")
//             : dot.classList.remove("dot--active");
//     });
// }

// function setupMenuEvents() {
//     let heroElement = document.querySelector('.hero');
//     if (heroElement) {
//         window.addEventListener('scroll', checkHeroVisibility);
//     }
//
//
//     let toggle = document.getElementById('nav-toggle');
//     let menu = document.getElementById('nav-menu');
//
//     if (toggle){
//         toggle.onclick = function() {
//             toggle.classList.toggle('is-active');
//             menu.classList.toggle('is-active');
//             toggleFixed.classList.toggle('is-active');
//             menuFixed.classList.toggle('is-active');
//         };
//     }
//
//     let toggleFixed = document.getElementById('nav-toggle-fixed');
//     let menuFixed = document.getElementById('nav-menu-fixed');
//
//     if (toggleFixed) {
//         toggleFixed.onclick = function() {
//             if (toggle){
//                 toggle.classList.toggle('is-active');
//                 menu.classList.toggle('is-active');
//             }
//             toggleFixed.classList.toggle('is-active');
//             menuFixed.classList.toggle('is-active');
//         };
//     }
// }

// function setupSlider() {
//     if (document.querySelector('.home')){
//         var slider = new KeenSlider("#main-slider", {
//             loop: true,
//             created: function(instance) {
//                 let timerId = setInterval(() => {
//                     document
//                     .getElementById("arrow-right").click()
//                 }, sliderIntervalTime);
//                 document
//                 .getElementById("arrow-left")
//                 .addEventListener("click", function() {
//                     instance.prev();
//                 });
//
//                 document
//                 .getElementById("arrow-right")
//                 .addEventListener("click", function() {
//                     instance.next();
//                 });
//                 var dots_wrapper = document.getElementById("dots");
//                 var slides = document.querySelectorAll(".keen-slider__slide");
//                 slides.forEach(function(t, idx) {
//                     var dot = document.createElement("button");
//                     dot.classList.add("dot");
//                     dots_wrapper.appendChild(dot);
//                     dot.addEventListener("click", function() {
//                         instance.moveToSlide(idx);
//                     });
//                 });
//                 updateClasses(instance);
//             },
//             slideChanged(instance) {
//                 updateClasses(instance);
//             },
//         });
//     }
// }

// async function getEarlyAccess(elem) {
//     let value = (elem && elem.parentElement && elem.parentElement.parentElement
//         && elem.parentElement.parentElement.querySelector('.email-input input')
//         && elem.parentElement.parentElement.querySelector('.email-input input').value)
//         || (elem.parentElement.parentElement.parentElement.querySelector('.email-input input')
//             && elem.parentElement.parentElement.parentElement.querySelector('.email-input input').value)
//     ;
//     if (value) {
//         let response = await fetch(`https://29iax1x5e5.execute-api.us-east-1.amazonaws.com/dev/waiting-list?email=${encodeURIComponent(value)}`);
//
//         if (response.ok) {
//             if (elem.parentElement.parentElement.querySelector('.email-input input')) {
//                 elem.parentElement.parentElement.querySelector('.email-input input').value = '';
//             }
//             if (elem.parentElement.parentElement.parentElement.querySelector('.email-input input')) {
//                 elem.parentElement.parentElement.parentElement.querySelector('.email-input input').value = '';
//             }
//         } else {
//             console.log(response.status);
//         }
//     }
// }

// function coloredTitle() {
//     let pageTitle = document.querySelector('h1.title:not(.simple)');
//
//     if (pageTitle && pageTitle.innerHTML) {
//         let word_array = pageTitle.innerHTML.split(/\s+/); // split on spaces
//         let last_word = word_array.pop();             // pop the last word
//         let first_part = word_array.join(' ');        // rejoin the first words together
//
//
//         pageTitle.innerHTML = [first_part, ' <span class="text-green">', last_word, '</span>'].join('')
//     }
// }

document.addEventListener('DOMContentLoaded', function(){
    // const buttons = document.querySelectorAll('.early-access .button');
    // for (let i = 0; i < buttons.length; i++){
    //     buttons[i].addEventListener('click', app.earlyAccessClick)
    // }

    // setupMenuEvents();
    // setupSlider();
    // coloredTitle();
    
    app.overlayScrollbar()
    app.setupSnapScrolling()
});
