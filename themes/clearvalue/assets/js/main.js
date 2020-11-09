const sliderIntervalTime = 6000000 // 5sec

const app = {

    glide: null,

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

                        if (entry.target.classList.contains('section-slider') && app.glide === null) {
                            app.setupSlider()
                        }

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

    setupSlider() {
        if (document.querySelector('.home')) {
            app.glide = new Glide('.glide', {
                autoplay: 6000,
                hoverpause: false,
            }).mount()
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

    initGoUpButton() {

        let goUpDiv = document.createElement('div');
        goUpDiv.className = 'go-up';
        goUpDiv.innerHTML = '<img src="/images/icon-arrow-up.svg"><span>Go Up</span>';

        goUpDiv.onclick = () => {
            window.scrollTo(0,0);
        };

        document.body.appendChild(goUpDiv);

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

    setupIntercomMessage() {
        if (window.Intercom) {
            const elements = document.querySelectorAll('.contact-us-link')
            for (let i = 0; i < elements.length; i++) {
                elements[i].addEventListener('click', (e) => {
                    if (window.Intercom) {
                        e.cancelable = true;
                        e.preventDefault();
                        app.openIntercomMessage()
                        return false
                    }
                })
            }
        }
    },

    openIntercomMessage() {
        if (window.Intercom) {
            window.Intercom("showNewMessage");
            window.setTimeout(() => {
                const int = document.querySelector('.intercom-messenger-frame')
                // console.log('>>>>>> int:', int)
                if (int === null) {
                    window.location.href = 'mailto:help@claritus.io';
                }
            }, 2000)
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

    initContactUsModal() {
        let modal = document.getElementById("contact-us-modal");

        let openButtons = document.querySelectorAll('.open-contact-us-modal');
        openButtons.forEach(button => {
            button.onclick = function() {
                modal.style.display = "block";
            }
        });

        let closeBtn = document.getElementById("close-contact-us");
        closeBtn.onclick = function() {
            modal.style.display = "none";

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

            submitForm(modal);
        };
    },
};

function postAsync(url2get, sendstr)    {
    let req;
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (req != undefined) {
        // req.overrideMimeType("application/json"); // if request result is JSON

        try {
            req.open("POST", url2get, false);
        }
        catch(err) {
            alert("couldnt complete request. Is JS enabled for that domain?\\n\\n" + err.message);
            return false;
        }
        req.send(sendstr);

        if (req.readyState == 4) {
            if (req.status == 200) {
                return req.responseText;
            } else {
                return "XHR error: " + req.status +" "+req.statusText;
            }
        }
    }
}

// function toggleMenu() {
//     const menu = document.getElementById('menu')
//
//     if (menu.classList.contains('menu--active')) {
//         menu.classList.toggle('menu--active')
//
//         setTimeout(() => {
//             menu.classList.toggle('is-block')
//         }, 500)
//     } else {
//         menu.classList.toggle('is-block')
//         setTimeout(() => {
//             menu.classList.toggle('menu--active')
//         }, 300)
//
//     }
// }
function submitForm(modal) {

    let submittedForm = modal.querySelector('.form');

    let url = submittedForm.action;
    let requestedString = "name=" + submittedForm.querySelector('.input[name=name]').value
        + "&email=" + submittedForm.querySelector('.input[name=email]').value
        + "&message=" + submittedForm.querySelector('.input[name=message]').value;
    let ret = postAsync(url, requestedString) ;

    if (ret.match(/^XHR error/)) {
        console.log(ret);
        return;
    }

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
}


document.addEventListener('DOMContentLoaded', function () {

    app.setupSnapScrolling();
    app.initMenuOpening();
    app.homeScrollToPricing();
    app.setupIntercomMessage();
    app.initGoUpButton();
    app.initContactUsModal();

    if (app.isMobile() && window.Intercom) {
        window.Intercom('update', {
            'hide_default_launcher': true
        })

    }

    window.addEventListener('scroll', function(e) {
        let element = document.querySelector('.go-up');
        if (element && window.scrollY > 20) {
            element.classList.add('is-visible')
        } else if (element){
            element.classList.remove('is-visible')
        }
    });
})
