function initNewsletter() {
  const button = document.querySelector('.footer-subscribe button.footer-subscribe__btn')
  console.log('>>>>>>> button:', button)
  button.onclick = (e)=>{
    e.preventDefault();
    let email = document.getElementById('footer-newsletter-email').value
    if (!email || email.trim() === '') {
      return
    }

    email = encodeURIComponent(email.trim())

    fetch('https://f6gcz330p3.execute-api.us-east-1.amazonaws.com/newsletter?email=' + email,  {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then(() => {
      document.querySelector('.footer-subscribe-step1').classList.add('hidden')
      document.querySelector('.footer-subscribe-step2').classList.add('active')
    }).catch((e) => {
      //do nothing
      console.error(e)
    })
  }
}

window.addEventListener("load", function (event) {
  // Lazy load
  const observer = lozad();
  observer.observe();

  // Slider
  const slider = document.querySelector(".feedback-slider");

  if (slider) {
    const flkty = new Flickity(slider, {
      // options
      wrapAround: true,
      prevNextButtons: false,
      cellAlign: "left",
      draggable: true,
      pageDots: false,
      contain: true,
      adaptiveHeight: false,
    });

    document
      .querySelector(".slider-arrow--prev")
      .addEventListener("click", function () {
        flkty.previous(false, false);
      });

    document
      .querySelector(".slider-arrow--next")
      .addEventListener("click", function () {
        flkty.next(false, false);
      });
  }

  // header
  let scrollPosition = window.scrollY;
  const header = document.querySelector(".header-section");

  window.addEventListener("scroll", function () {
    scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      header.classList.add("header--fixed");
    } else {
      header.classList.remove("header--fixed");
    }
  });

  // Burger
  const navMenu = document.querySelector(".header-nav-menu");
  const burgerBtn = document.querySelector(".nav-btn");
  const closeMenuBtn = document.querySelector(".nav-menu-header__close");
  const navMenuMask = document.querySelector(".nav-menu-mask");

  burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.toggle("nav-btn--opened");
    navMenu.classList.toggle("header-nav-menu--active");
  });

  closeMenuBtn.addEventListener("click", () => {
    closeNavMenu();
  });

  navMenuMask.addEventListener("click", () => {
    closeNavMenu();
  });

  function closeNavMenu() {
    navMenu.classList.remove("header-nav-menu--active");
    burgerBtn.classList.remove("nav-btn--opened");
  }

  // Faq
  const faqButtons = document.querySelectorAll(".faq__question");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const activeElem = document.querySelector(".faq--opened");
      const faqBlock = button.closest(".faq");

      if (activeElem && activeElem !== faqBlock) {
        activeElem.classList.remove("faq--opened");
      }

      faqBlock.classList.toggle("faq--opened");
    });
  });

  // Tab

  const tabNavBtns = document.querySelectorAll(".tab-nav__item");

  tabNavBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const activeTab = document.querySelector(".tab-nav__item--active");

      if (activeTab === btn) return;

      const planName = btn.dataset.plan;

      activeTab.classList.remove("tab-nav__item--active");
      btn.classList.add("tab-nav__item--active");

      document.querySelector(".tab--active").classList.remove("tab--active");
      document.querySelector(`#${planName}`).classList.add("tab--active");
    });
  });

  // Contact us

  const modal = document.querySelector(".contact-form");

  if (modal) {
    modal.onsubmit = function (e) {
      e.preventDefault();

      if (!validateForm()) return;

      submitContactForm();
    };
  }

  function submitContactForm() {
    const submitBtn = modal.querySelector("button[type=submit]");
    submitBtn.classList.add("btn--loading");
    submitBtn.disabled = true;

    grecaptcha.ready(function () {
      grecaptcha
        .execute("6LeptuEZAAAAAH5olX9oeDX9C2Ck2KG_Dd2zXhKw", {
          action: "submit",
        })
        .then(async function (token) {
          const submittedForm = document.querySelector(".contact-form");

          // let url =
          // "https://nkm2iod3hf.execute-api.us-east-1.amazonaws.com/prod/contact-us";

          let url = "www.google.com";

          let data = {
            token: token,
            name: submittedForm.querySelector("[name=name]").value,
            email: submittedForm.querySelector("[name=email]").value,
            msg: submittedForm.querySelector("[name=message]").value,
          };

          let urlEncodedData = "",
            urlEncodedDataPairs = [],
            name;

          for (name in data) {
            urlEncodedDataPairs.push(
              encodeURIComponent(name) + "=" + encodeURIComponent(data[name])
            );
          }

          urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");

          try {
            const response = await fetch(url, {
              method: "POST",
              mode: "no-cors",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: urlEncodedData,
            });

            if (!response.ok) {
              throw new Error();
            }

            document
              .querySelector(".contact-section")
              .classList.add("contact-section--submitted");
          } catch (e) {
            console.log("error sending mail", e);
          }

          submitBtn.classList.remove("btn--loading");
          submitBtn.disabled = false;

          // fetch(url, {
          //   method: "POST",
          //   mode: "no-cors",
          //   headers: {
          //     "Content-Type": "application/x-www-form-urlencoded",
          //   },
          //   body: urlEncodedData,
          // })
          //   .then(() => {
          //     document
          //       .querySelector(".contact-section")
          //       .classList.add("contact-section--submitted");
          //   })
          //   .catch((e) => {
          //     //do nothing
          //     console.log('error sending mail', e)
          //   })
          //   .finally(() => {
          //     submitBtn.classList.remove("btn--loading");
          //     submitBtn.disabled = false;
          //   });

          // app.clearData();
        })
        .catch((e) => {
          console.error("grecaptcha error:", e);
          submitBtn.classList.remove("btn--loading");
          submitBtn.disabled = false;
        });
    });
  }

  function validateForm() {
    let isValidForm = true;

    const fields = modal.querySelectorAll(".field__input");

    fields.forEach((input) => {
      if (
        !input.value ||
        (input.type === "email" && !validateEmail(input.value))
      ) {
        isValidForm = false;
        input.closest(".field").classList.add("field--error");
      } else {
        input.closest(".field").classList.remove("field--error");
      }
    });

    return isValidForm;
  }

  function validateEmail(mail) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    );
  }

  // Scroll top

  document.querySelector(".scroll-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // newsletter
  initNewsletter()
});

