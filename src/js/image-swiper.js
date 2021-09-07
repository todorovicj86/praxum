var swiper = new Swiper(".js-img-swiper", {
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
        el: ".swiper-pagination-images",
        clickable: true,
      },
  breakpoints: {
    320: {
      slidesPerView: 1.15,
      centeredSlides: true,
      spaceBetween: 5
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 0
    },

    1600: {
      slidesPerView: 3,
      spaceBetween: 0
    }
  },
});