function initNewsletter() {
  const button = document.querySelector(
    ".footer-subscribe button.footer-subscribe__btn"
  );

  if (!button) {
    return;
  }

  button.onclick = (e) => {
    e.preventDefault();
    let email = document.getElementById("footer-newsletter-email");

    const field = email.closest(".footer-subscribe__field");

    field.classList.remove("footer-subscribe__field--error");

    if (!email.value.trim() || !validateEmail(email.value)) {
      field.classList.add("footer-subscribe__field--error");

      return;
    }

    button.classList.add("btn--loading");
    button.disabled = true;

    email = encodeURIComponent(email.value.trim());

    fetch(
      "https://6sdobm19id.execute-api.us-east-1.amazonaws.com/newsletter?email=" +
        email,
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then(() => {
        document
          .querySelector(".footer-subscribe-step1")
          .classList.add("hidden");
        document
          .querySelector(".footer-subscribe-step2")
          .classList.add("active");

        button.classList.remove("btn--loading");
        button.disabled = false;
      })
      .catch((e) => {
        //do nothing
        console.error(e);

        button.classList.remove("btn--loading");
        button.disabled = false;
      });
  };
}

function getUTMCookie() {
  const cstr = document.cookie
    .split("; ")
    .find((row) => row.startsWith("_cv_c"));

  if (cstr) {
    try {
      return JSON.parse(decodeURIComponent(cstr.split("=")[1]));
    } catch (e) {
      console.error("[getUTMCookie] error parsing cookie:", e);
    }
  }

  return [];
}

function utmCookie() {
  const params = {};
  if (window.location.search) {
    const pairs = window.location.search.substring(1).split("&");
    pairs.forEach((pair) => {
      const kv = pair.split("=");
      if (kv.length > 1) {
        const k = kv[0].toLowerCase();
        if (k.startsWith("utm")) {
          params[k] = decodeURIComponent(kv[1]);
        }
      }
    });
  }

  const cookie = getUTMCookie();
  if (Object.keys(params).length > 0) {
    const comparableCookies = cookie.map((item) => {
      const filtered = Object.keys(item)
        .filter((key) => key.toLowerCase().startsWith("utm"))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: item[key],
          };
        }, {});

      return filtered;
    });

    const paramsStr = JSON.stringify(params);
    let addParams = true;

    for (let i in comparableCookies) {
      if (paramsStr === JSON.stringify(comparableCookies[i])) {
        // ignore the same cookie
        addParams = false;
        break;
      }
    }

    if (addParams) {
      params["session"] =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      params["referrer"] = document.referrer;
      params["dt"] = Math.round(Date.now() / 1000);
      cookie.unshift(params);
    }
  }

  if (cookie.length > 0) {
    const apexDomain = document.domain
      .split(".")
      .reverse()
      .splice(0, 2)
      .reverse()
      .join(".");
    document.cookie = `_cv_c=${encodeURIComponent(
      JSON.stringify(cookie)
    )};path=/;max-age=2592000;domain=${apexDomain}`;
  }
}

// Init header
function initHeaderScroll() {
  let scrollPosition = window.scrollY;
  const header = document.querySelector(".header-section");

  const onScroll = () => {
    scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      header.classList.add("header--fixed");
    } else {
      header.classList.remove("header--fixed");
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll);
}

// Init sliders
function initSlider() {
  const slider = document.querySelector(".feedback-slider");
  
  if (!slider) {
    return;
  }

  // load slider js
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("async", true);
  script.setAttribute(
    "src",
    "https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"
  );

  const head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(script);

  script.addEventListener("load", function () {
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

    slider.classList.add("feedback-slider--initialized");
  });
}

// Init lazy load
function initMissingLazyLoad() {
  if (!window.lozad) {
    return;
  }

  const observer = window.lozad();
  observer.observe();

  const lazyImages = document.querySelectorAll(
    '.lozad:not([data-loaded="true"])'
  );
  if (lazyImages && lazyImages.length) {
    lazyImages.forEach((im) => {
      observer.triggerLoad(im);
    });
  }
}

// Init burger menu
function initBurgerMenu() {
  const navMenu = document.querySelector(".header-nav-menu");
  const burgerBtn = document.querySelector(".nav-btn");
  const closeMenuBtn = document.querySelector(".nav-menu-header__close");
  const navMenuMask = document.querySelector(".nav-menu-mask");

  burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.toggle("nav-btn--opened");

    navMenu.style.display = "block";
    setTimeout(() => {
      navMenu.classList.toggle("header-nav-menu--active");
    }, 1);
  });

  closeMenuBtn.addEventListener("click", () => {
    closeNavMenu();
  });

  navMenuMask.addEventListener("click", () => {
    closeNavMenu();
  });

  function closeNavMenu() {
    burgerBtn.classList.remove("nav-btn--opened");
    
    navMenu.classList.remove("header-nav-menu--active");
    setTimeout(() => {
      navMenu.style.display = "none";
    }, 500);
  }
}

// Init FAQ
function initFaq() {
  const faqButtons = document.querySelectorAll(".faq__question");

  if (!faqButtons.length) return;

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
}

// Init tabs
function initTabs() {
  const tabNavBtns = document.querySelectorAll(".tab-nav__item");

  if (!tabNavBtns.length) return;

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
}

// Init contact form
function initContactFormSubmit() {
  const form = document.querySelector(".contact-form");

  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();

      if (!validateContactForm()) {
        return;
      }

      submitContactForm();
    };
  }

  function submitContactForm() {
    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.classList.add("btn--loading");
    submitBtn.disabled = true;

    grecaptcha.ready(function () {
      grecaptcha
        .execute("6LeptuEZAAAAAH5olX9oeDX9C2Ck2KG_Dd2zXhKw", {
          action: "submit",
        })
        .then(function (token) {
          const submittedForm = document.querySelector(".contact-form");

          let url = "https://6sdobm19id.execute-api.us-east-1.amazonaws.com/contact-us";

          // let url = "https://jsonplaceholder.typicode.com/posts";

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

          // try {
          //   const response = await fetch(url, {
          //     method: "POST",
          //     mode: "no-cors",
          //     headers: {
          //       "Content-Type": "application/x-www-form-urlencoded",
          //     },
          //     body: urlEncodedData,
          //   });
          //
          //   console.log(response)
          //
          //   if (!response?.ok) {
          //     throw new Error();
          //   }
          //
          //   document
          //     .querySelector(".contact-section")
          //     .classList.add("contact-section--submitted");
          // } catch (e) {
          //   console.log("error sending mail", e);
          // }

          fetch(url, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: urlEncodedData,
          }).then(() => {
            console.log("[email sent]");
          });

          setTimeout(() => {
            document
              .querySelector(".contact-section")
              .classList.add("contact-section--submitted");

            submitBtn.classList.remove("btn--loading");
            submitBtn.disabled = false;
          }, 1500);
        })
        .catch((e) => {
          console.error("grecaptcha error:", e);
          submitBtn.classList.remove("btn--loading");
          submitBtn.disabled = false;
        });
    });
  }

  function validateContactForm() {
    let isValidForm = true;

    const fields = form.querySelectorAll(".field__input");

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
}

function validateEmail(mail) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    mail
  );
}

// Init header active link
function initHeaderActiveLink() {
  const rout = window.location.pathname.split("/")[1];

  const links = document.querySelectorAll(`[data-link='${rout}']`);

  if (!links.length) return;

  links.forEach((link) => {
    link.classList.add("active");
  });
}

// Init scroll top
function initScrollTopHandler() {
  const anchor = document.querySelector(".scroll-top");

  if (!anchor) return;

  anchor.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// custom select
function initCustomSelects() {
  let x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          let y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    let x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);
}

function initRequestDemoLink() {
  const link = document.getElementById('request-demo-link');

  if (!link) {
    return;
  }

  link.addEventListener("click", (event) => {
    event.preventDefault();

    const form = document.getElementById('request-demo-form');
    
    if (!form) {
      return;
    }

    form.querySelector('input').focus();
  });
}

function initDemoFormSubmit() {
  const form = document.getElementById("request-demo-form");

  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();

      if (!validateDemoForm()) {
        return;
      }

      submitDemoForm();
    };
  }

  function submitDemoForm() {
    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.classList.add("btn--loading");
    submitBtn.disabled = true;

    let data = {
      name: form.querySelector("[name=name]").value,
      email: form.querySelector("[name=email]").value,
      website: form.querySelector("[name=website]").value,
      userType: form.querySelector("[name=user-type]").selectedIndex,
      portfolios: form.querySelector("[name=portfolios]").value,
    };

    console.log('SUBMIT: ', data)

    setTimeout(() => {
      submitBtn.classList.remove("btn--loading");
      submitBtn.disabled = false;
    }, 3000)
  }

  function validateDemoForm() {
    let isValidForm = true;

    const fields = form.querySelectorAll(".field__input");

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
}

// Trigering functions
window.addEventListener("load", function (event) {
  // header
  initHeaderScroll();

  // Lazy load
  initMissingLazyLoad();

  // Slider
  initSlider();

  // Burger
  initBurgerMenu();

  // Faq
  initFaq();

  // Tab
  initTabs();

  // Contact us
  initContactFormSubmit();

  // Scroll top
  initScrollTopHandler();

  // Set active link
  initHeaderActiveLink();

  //cookies
  try {
    utmCookie();
  } catch (e) {
    console.error("[utmCookie] error:", e);
  }

  // newsletter
  initNewsletter();

  initCustomSelects();

  initRequestDemoLink();

  initDemoFormSubmit();
});