let $burgerButton = document.querySelector('.header__burger')
let $burgerMenu = document.querySelector('.header__burger-menu')
let $burgerCloseButton = document.querySelector('.header__burger-menu-close')
let body = document.querySelector('body')
$burgerButton.addEventListener('click', function () {
  $burgerMenu.style.top = '0px'
  body.style.overflow = 'hidden'
})
$burgerCloseButton.addEventListener('click', function () {
  $burgerMenu.style.top = '-999px'
  body.style.overflow = 'visible'
})
