
function keepInTouch(self) {

    let url = 'https://r5hjka5yve.execute-api.us-east-1.amazonaws.com/staging/waiting-list?email=';

    let form = document.querySelector('.email-input');
    let emailField = document.getElementById('subscribe-email');
    let emailFieldIcon = document.getElementById('subscribe-email-icon');
    let validationError = document.getElementById('validation-error');
    validationError.style.display = 'none';

    if (emailField.value && validateEmail(emailField.value)) {
        form.classList.add('is-loading');
        emailField.hidden = true;
        emailFieldIcon.style.display = 'none';
        self.style.display = 'none';

        fetch(`${url}${emailField.value}`,  {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).catch(() => {
            //do nothing
        }).finally(() => {
            let successMessage = document.getElementById('subscribe-success');
            successMessage.hidden = false;
            form.classList.remove('is-loading');
        })
    } else {
        validationError.style.display = 'block';
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const app = {
    initMenuOpening: function () {
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

    toggleMenu: function () {
        const menu = document.getElementById('menu')
        const header = document.querySelector('header.header')
        const burger = document.getElementById('menu-burger')

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
};

document.addEventListener('DOMContentLoaded', function () {

    app.initMenuOpening();

})