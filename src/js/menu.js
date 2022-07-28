function menu() {
  const btnOpen = document.querySelector('.header__menu-btn')
  const btnClose = document.querySelector('.menu__btn-clouse')
  const menu = document.querySelector('.menu')
  const bodyLock = document.querySelector('.wrapper')


  const openMenu = () => {
    menu.classList.add('menu-vizible')
    bodyLock.classList.add('lock')
  }


  const closeMenu = () => {
    menu.classList.remove('menu-vizible')
    bodyLock.classList.remove('lock')
  }


  btnOpen.addEventListener('click', openMenu)
  btnClose.addEventListener('click', closeMenu)

  menu.addEventListener('click', (event) => {
    console.log(event.target);
    const target = event.target

    if (target.classList.contains('nav__link')) closeMenu()
  })
}

menu()