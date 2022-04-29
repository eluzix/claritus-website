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

  modal.onsubmit = function (e) {
    e.preventDefault();

    if (!validateForm()) return;
  };

  function submitForm() {}

  function validateForm() {
    let isValidForm = true;

    const fields = modal.querySelectorAll(".field__input");

    fields.forEach((input) => {
      if (
        !input.value ||
        (input.type === "email" && validateEmail(input.value))
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
});
