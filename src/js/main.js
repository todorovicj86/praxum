var menuIcon = document.querySelectorAll('.js-hamburger');
var body = document.querySelector('body');
var activeClass = 'active';
var scrollDisabled = 'scroll-disabled';
var accordionBtn = document.querySelectorAll('.js-accordion-button');
var selected = document.querySelector('.js-selected');
var optionsContainer = document.querySelector('.js-options-container');
var optionsList = document.querySelectorAll('.js-option');
var form = document.getElementById('contact-form');

function toggleClass(element, classes) {
  element.classList.toggle(classes);
}

function removeClass(element, classes) {
  element.classList.remove(classes);
}

function handleMenu(e, id) {
  var list = document.querySelector(id);
  toggleClass(list, activeClass);
  toggleClass(e.target, activeClass);
  toggleClass(body, scrollDisabled);
}

function handleAccordion(element) {
  var panel = element.nextElementSibling;
  toggleClass(element, activeClass);
  toggleClass(panel, activeClass);
}


function handleDropdown() {
  selected.addEventListener('click', function () {
    toggleClass(optionsContainer, activeClass);
  });
  
  optionsList.forEach( option => {
    option.addEventListener('click', function (e) {
      selectedOption = this.querySelector('label');
      selected.innerHTML = selectedOption.innerHTML;
      removeClass(optionsContainer, activeClass);
    })
  });
}


function init() {
  
  menuIcon.forEach(menu => {
    menu.addEventListener('click', function (e) {
      let id = e.target.dataset.target;
      handleMenu(e, id);
    })
  });

  accordionBtn.forEach(button => {
    button.addEventListener('click', function () {
      handleAccordion(this);
    })
  });

  if (form) {
    handleDropdown();
  }
}

init();
