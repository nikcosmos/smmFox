//Webp========================================================================================================================================================
export function isWebp() {
   // Проверка поддержки webp
   function testWebP(callback) {
      let webP = new Image()
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2)
      }
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
   }
   testWebP(function (support) {
      let className = support === true ? 'webp' : 'no-webp'
      document.documentElement.classList.add(className)
   })
}
//Burger========================================================================================================================================================
export function menuInit() {
   if (document.querySelector('.icon-menu')) {
      document.addEventListener('click', function (e) {
         if (bodyLockStatus && e.target.closest('.icon-menu')) {
            bodyLockToggle()
            document.documentElement.classList.toggle('menu-open')
         }
      })
   }
}
export function menuOpen() {
   bodyLock()
   document.documentElement.classList.add('menu-open')
}
export function menuClose() {
   bodyUnlock()
   document.documentElement.classList.remove('menu-open')
}
//BodyLock========================================================================================================================================================
export let bodyLockStatus = true
export let bodyLockToggle = (delay = 500) => {
   if (document.documentElement.classList.contains('lock')) {
      bodyUnlock(delay)
   } else {
      bodyLock(delay)
   }
}
export let bodyUnlock = (delay = 500) => {
   let body = document.querySelector('body')
   if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll('[data-lp]')
      setTimeout(() => {
         for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index]
            el.style.paddingRight = '0px'
         }
         body.style.paddingRight = '0px'
         document.documentElement.classList.remove('lock')
      }, delay)
      bodyLockStatus = false
      setTimeout(function () {
         bodyLockStatus = true
      }, delay)
   }
}
export let bodyLock = (delay = 500) => {
   let body = document.querySelector('body')
   if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll('[data-lp]')
      for (let index = 0; index < lock_padding.length; index++) {
         const el = lock_padding[index]
         el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
      }
      body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
      document.documentElement.classList.add('lock')

      bodyLockStatus = false
      setTimeout(function () {
         bodyLockStatus = true
      }, delay)
   }
}
//Navigation========================================================================================================================================================
export function pageNavigation() {
   // data-goto - Куда ехать
   // data-goto-header - Учитывать Хедер
   // data-goto-top - На сколько не докрутить
   document.addEventListener('click', pageNavigationAction)
   function pageNavigationAction(e) {
      if (e.type === 'click') {
         const targetElement = e.target
         if (targetElement.closest('[data-goto]')) {
            const gotoLink = targetElement.closest('[data-goto]')
            const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : ''
            const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false
            const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500
            const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0
            gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop)
            e.preventDefault()
         }
      }
   }
}
export let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
   const targetBlockElement = document.querySelector(targetBlock)
   if (targetBlockElement) {
      let headerItem = ''
      let headerItemHeight = 0
      if (noHeader) {
         headerItem = 'header.header'
         const headerElement = document.querySelector(headerItem)
         if (!headerElement.classList.contains('_header-scroll')) {
            headerElement.style.cssText = `transition-duration: 0s;`
            headerElement.classList.add('_header-scroll')
            headerItemHeight = headerElement.offsetHeight
            headerElement.classList.remove('_header-scroll')
            setTimeout(() => {
               headerElement.style.cssText = ``
            }, 0)
         } else {
            headerItemHeight = headerElement.offsetHeight
         }
      }
      document.documentElement.classList.contains('menu-open') ? menuClose() : null

      let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY
      targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition
      targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition
      window.scrollTo({
         top: targetBlockElementPosition,
         behavior: 'smooth',
      })
   }
}
//========================================================================================================================================================
