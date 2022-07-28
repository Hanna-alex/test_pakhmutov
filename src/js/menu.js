const menuBtn = document.querySelector('.header__menu')
const menu = document.querySelector('.menu')

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('header__menu--active')
})