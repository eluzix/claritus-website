function initNewsletter() {
  const button = document.querySelector(
    ".footer-subscribe button.footer-subscribe__btn"
  );

  button.onclick = (e) => {
    e.preventDefault();
    let email = document.getElementById("footer-newsletter-email").value;
    if (!email || email.trim() === "") {
      return;
    }

    button.classList.add("btn--loading");
    button.disabled = true;

    email = encodeURIComponent(email.trim());

    fetch(
      "https://f6gcz330p3.execute-api.us-east-1.amazonaws.com/newsletter?email=" +
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

  window.addEventListener("scroll", function () {
    scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      header.classList.add("header--fixed");
    } else {
      header.classList.remove("header--fixed");
    }
  });
}

// Init slider
function initSlider() {
  const slider = document.querySelector(".feedback-slider");

  if (!slider) return;

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
  });
}

// Init lazy load
function initLazyLoad() {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("async", true);
  script.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js"
  );

  const head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(script);

  script.addEventListener("load", function () {
    const observer = lozad();
    observer.observe();

    const hpAssetImg = document.querySelector(".assets-section .assets-bg");
    if (hpAssetImg) {
      observer.triggerLoad(hpAssetImg);
    }
  });
}

// Init burger menu
function initBurgerMenu() {
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

      if (!validateForm()) return;

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
        .then(async function (token) {
          const submittedForm = document.querySelector(".contact-form");

          let url =
            "https://nkm2iod3hf.execute-api.us-east-1.amazonaws.com/prod/contact-us";

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

  function validateEmail(mail) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    );
  }
}

// Init typed text
function initTypedText() {
  const element = document.querySelector(".typed-text");

  if (!element) return;

  typeText(element);

  function typeText(element) {
    let txt = element.dataset.typed;
    let iteratorIncrement = 0;
    let iteratorDecrement = txt.length;
    let speed = 200;

    typeWriterIncrement();

    function typeWriterIncrement() {
      if (iteratorIncrement < txt.length) {
        element.innerHTML += txt.charAt(iteratorIncrement);
        iteratorIncrement++;
        setTimeout(typeWriterIncrement, speed);
      } else {
        setTimeout(() => {
          iteratorDecrement = txt.length;
          typeWriterDecrement();
        }, 3000);
      }
    }

    function typeWriterDecrement() {
      if (iteratorDecrement >= 0) {
        element.innerHTML = txt.slice(0, iteratorDecrement);
        iteratorDecrement--;
        setTimeout(typeWriterDecrement, speed * 0.5);
      } else {
        iteratorIncrement = 0;
        typeWriterIncrement();
      }
    }
  }
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

// Trigering functions
window.addEventListener("load", function (event) {
  // Lazy load
  initLazyLoad();

  // Slider
  initSlider();

  // header
  initHeaderScroll();

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

  // Typed text
  initTypedText();

  //cookies
  try {
    utmCookie();
  } catch (e) {
    console.error("[utmCookie] error:", e);
  }

  // newsletter
  initNewsletter();
});
