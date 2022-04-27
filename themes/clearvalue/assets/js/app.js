document.addEventListener("DOMContentLoaded", function (event) {
  // Slider
  const slider = document.querySelector(".feedback-slider");
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
});
