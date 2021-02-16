const sliderIntervalTime = 6000 * 1000

const app = {

    setupSnapScrolling() {
        try {
            const observer = new IntersectionObserver((entries) => {
                const navbar = document.querySelector('header nav.nav')

                entries.forEach((entry) => {
                    if (entry.intersectionRatio >= 0.05) {
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
                                                          threshold: [0.05]
                                                      })

            const sections = [...document.querySelectorAll('.home section')]
            sections.forEach((section, index) => {
                observer.observe(section)
            })
        } catch (e) {
            console.log('[IntersectionObserver] error:', e)
        }
    },

    initMenuOpening() {
        const control = document.getElementById('menu-burger')
        if (control) {
            control.onclick = app.toggleMenu
        }

        const closeIcon = document.getElementById('icon-close')
        if (closeIcon) {
            closeIcon.onclick = app.toggleMenu
        }

        const background = document.querySelector('#menu .background')
        if (background) {
            background.onclick = app.toggleMenu
        }
    },

    isMobile: () => {
        let check = false;
        // eslint-disable-next-line
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
        })(navigator.userAgent || navigator.vendor || window.opera)
        return check
    },

    homeScrollToPricing() {
        const isP = document.querySelector('.section-1 a.is-p')
        if (isP){
            isP.addEventListener('click', (e) => {
                e.cancelable = true;
                e.preventDefault();

                document.querySelector('.home-footer .pricing').scrollIntoView(
                  {
                      behavior: 'smooth'
                  })

                return false
            })
        }
    },

    toggleMenu() {
        const menu = document.getElementById('menu')
        const header = document.querySelector('header.header')
        const burger = document.getElementById('menu-burger')
        // burger.classList.toggle('is-active')

        if (menu.classList.contains('menu--active')) {
            menu.classList.toggle('menu--active')

            setTimeout(() => {
                header.classList.remove('menu-open')
                burger.classList.remove('is-active')
                menu.classList.toggle('is-block')
            }, 400)
        } else {
            menu.classList.toggle('is-block')
            setTimeout(() => {
                header.classList.add('menu-open')
                burger.classList.add('is-active')
                menu.classList.toggle('menu--active')
            }, 200)
        }
    },

    getUTMCookie() {
        const cstr = document.cookie
        .split('; ')
        .find(row => row.startsWith('_cv_c'))

        if (cstr){
            try {
                return JSON.parse(decodeURIComponent(cstr.split('=')[1]))
            } catch (e) {
                console.error('[getUTMCookie] error parsing cookie:', e)
            }
        }

        return []
    },

    utmCookie() {
        const params = {}
        if (window.location.search) {
            const pairs = window.location.search.substring(1).split('&')
            pairs.forEach((pair) => {
                const kv = pair.split('=')
                if (kv.length > 1) {
                    const k = kv[0].toLowerCase()
                    if (k.startsWith('utm')){
                         params[k] = decodeURIComponent(kv[1])
                    }
                }
            })
        }

        const cookie = this.getUTMCookie()
        if (Object.keys(params).length > 0){
            const comparableCookies = cookie.map((item) => {
                const filtered = Object.keys(item)
                .filter(key => key.toLowerCase().startsWith('utm'))
                .reduce((obj, key) => {
                    return {
                        ...obj,
                        [key]: item[key]
                    };
                }, {});

                return filtered
            })

            const paramsStr = JSON.stringify(params)
            let addParams = true

            for (let i in comparableCookies){
                if (paramsStr === JSON.stringify(comparableCookies[i])){
                    // ignore the same cookie
                    addParams = false
                    break
                }
            }

            if (addParams){
                params['session'] = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                params['referrer'] = document.referrer
                cookie.unshift(params)
            }
        }

        if (cookie.length > 0) {
            const apexDomain = document.domain.split('.').reverse().splice(0,2).reverse().join('.');
            document.cookie = `_cv_c=${encodeURIComponent(JSON.stringify(cookie))};path=/;max-age=2592000;domain=${apexDomain}`
        }
    },

    isHeaderInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= -100
        );
    },

    setupSliderTestimonials() {
        if (document.querySelector('.home')) {
            let slider = new KeenSlider("#main-slider", {
                loop: true,
                created: function (instance) {
                    let timerId = setInterval(() => {
                        document
                            .getElementById("arrow-right").click()
                    }, sliderIntervalTime);
                    document
                        .getElementById("arrow-left")
                        .addEventListener("click", function () {
                            instance.prev();
                        });
                    document
                        .getElementById("arrow-left-mobile")
                        .addEventListener("click", function () {
                            instance.prev();
                        });

                    document
                        .getElementById("arrow-right")
                        .addEventListener("click", function () {
                            instance.next();
                        });
                    document
                        .getElementById("arrow-right-mobile")
                        .addEventListener("click", function () {
                            instance.next();
                        });
                    let dots_wrapper = document.getElementById("dots");
                    let slides = document.querySelectorAll(".keen-slider__slide");

                    slides.forEach(function (t, idx) {
                        let dot = document.createElement("button");
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

    initScrollTop() {
        document.querySelectorAll('.scroll-to-top').forEach(item => {
            item.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            })
        })
    },

    initLazyLoad() {
        const options = {
            root: null,
            rootMargin: "75px 0px",
            threshold: 0.01,
        };
        const imagesCallback = function(entries, observer) {
            for (let i = 0; i < entries.length; i++) {
                if (entries[i].intersectionRatio > 0) {
                    // Stop watching and load the image
                    observer.unobserve(entries[i].target);
                    let dataSrc = entries[i].target.dataset.src;

                    if (dataSrc) {
                        entries[i].target.src = dataSrc; //preload image
                        delete entries[i].target.dataset.src;
                    }

                    entries[i].target.classList.remove("lazy-image");
                }
            }
        };

        const images = document.querySelectorAll(".lazy-image[data-src]");
        const imagesObserver = new IntersectionObserver(imagesCallback, options);
        for (let i = 0; i < images.length; i++) {
            imagesObserver.observe(images[i]);
        }
    },

    initContactUsModal() {
        let modal = document.getElementById("contact-us-modal");

        if (!modal) {
            return;
        }

        let openButtons = document.querySelectorAll('.open-contact-us-modal, .contact-us-link');
        openButtons.forEach(button => {
            button.onclick = function(e) {
                e.preventDefault();
                modal.classList.add('is-active');
            }
        });

        let closeBtn = document.getElementById("close-contact-us");
        closeBtn.onclick = function() {
            modal.classList.remove('is-active')

            let successMessage = modal.querySelector('.form-submit');
            if (successMessage) {
                successMessage.classList.add('is-hidden')
            }

            let submittedForm = modal.querySelector('.form');
            if (submittedForm) {
                submittedForm.classList.remove('is-hidden')
            }
        };

        modal.querySelector('.form').onsubmit = function (e) {
            e.preventDefault();

            if (app.validateForm(modal)) {
                app.submitForm(modal);
            } else if (!app._contactModelValidated) {
                app._contactModelValidated = true;

                modal.querySelectorAll('.input').forEach(element => {
                    element.addEventListener('input', () => {
                        app.validateForm(modal);
                    })
                });
            }
        };
    },

    validateForm(modal) {
        let inputsAreValid = true;

        modal.querySelectorAll('.input').forEach(element => {
            if (!element.value ||
                (element.type === 'email' && !app.validateEmail(element.value))) {
                inputsAreValid = false;
                element.classList.add('is-invalid');
                element.parentElement.querySelector('.error-message').classList.add('is-active');
            } else {
                element.classList.remove('is-invalid');
                element.parentElement.querySelector('.error-message').classList.remove('is-active')
            }
        });

        return inputsAreValid;
    },

    validateEmail(mail) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail);
    },

    submitForm(modal) {
        grecaptcha.ready(function() {
            grecaptcha.execute('6LeptuEZAAAAAH5olX9oeDX9C2Ck2KG_Dd2zXhKw', {action: 'submit'}).then(function(token) {
                // Add your logic to submit to your backend server here.
                let submittedForm = modal.querySelector('.form');

                let url = 'https://nkm2iod3hf.execute-api.us-east-1.amazonaws.com/prod/contact-us';
                // let url = 'https://29iax1x5e5.execute-api.us-east-1.amazonaws.com/dev/contact-us';
                let data = {
                    token: token,
                    name: submittedForm.querySelector('.input[name=name]').value,
                    email: submittedForm.querySelector('.input[name=email]').value,
                    msg: submittedForm.querySelector('.input[name=message]').value,
                };

                let urlEncodedData = "",
                    urlEncodedDataPairs = [],
                    name;

                for ( name in data ) {
                    urlEncodedDataPairs.push( encodeURIComponent( name ) + '=' + encodeURIComponent( data[name] ) );
                }

                urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );

                fetch(url,  {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: urlEncodedData
                }).catch(() => {
                    //do nothing
                })

                app.clearData();

            }).catch((e) => {
                console.error('grecaptcha error:', e)
            })
        })
    },

    clearData() {
        let modal = document.getElementById("contact-us-modal");
        let submittedForm = modal.querySelector('.form');
        submittedForm.querySelector('.input[name=name]').value = '';
        submittedForm.querySelector('.input[name=email]').value = '';
        submittedForm.querySelector('.input[name=message]').value = '';

        let successMessage = modal.querySelector('.form-submit.is-hidden');
        if (successMessage) {
            successMessage.classList.remove('is-hidden')
        }

        if (submittedForm) {
            submittedForm.classList.add('is-hidden')
        }
    },
};

function updateClasses(instance) {
    let slide = instance.details().relativeSlide;
    let arrowLeft = document.getElementById("arrow-left");
    let arrowLeftMobile = document.getElementById("arrow-left-mobile");
    let arrowRight = document.getElementById("arrow-right");
    let arrowRightMobile = document.getElementById("arrow-right-mobile");

    if (slide === 0) {
        arrowLeft.classList.add("arrow--disabled");
        arrowLeftMobile.classList.add("arrow--disabled");
    } else {
        arrowLeft.classList.remove("arrow--disabled");
        arrowLeftMobile.classList.remove("arrow--disabled");
    }
    if (slide === instance.details().size - 1) {
        arrowRight.classList.add("arrow--disabled")
        arrowRightMobile.classList.add("arrow--disabled")
    } else {
        arrowRight.classList.remove("arrow--disabled");
        arrowRightMobile.classList.remove("arrow--disabled");
    }

    let dots = document.querySelectorAll(".dot");
    dots.forEach(function(dot, idx) {
        idx === slide
            ? dot.classList.add("dot--active")
            : dot.classList.remove("dot--active");
    });
}

function checkHeaderVisibility() {
    const headerElement = document.querySelector('header');
    // const landingPageElement = document.querySelector('.landing-page');
    const landingPageElement = document.querySelector('.root');
    const noScroll = document.querySelector('.no-header-scroll');

    // if (!headerElement || !landingPageElement) {
    if (!headerElement || noScroll) {
        return false;
    }

    let isVisible = app.isHeaderInViewport(landingPageElement);
    if (isVisible) {
        headerElement.classList.remove('white-header');
        document.querySelector('.header-hidden-height').style.display = 'none';
    } else {
        headerElement.classList.add('white-header');
        document.querySelector('.header-hidden-height').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener("scroll", checkHeaderVisibility, false);

    app.setupSnapScrolling();
    app.initMenuOpening();
    app.homeScrollToPricing();
    app.setupSliderTestimonials();
    app.initScrollTop();
    app.initLazyLoad();
    app.initContactUsModal();

    try {
        app.utmCookie()
    } catch (e) {
        console.error('[utmCookie] error:', e)
    }

    if (app.isMobile() && window.Intercom) {
        window.Intercom('update', {
            'hide_default_launcher': true
        })
    }
})
