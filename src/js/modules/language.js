import { menuClose } from './functions.js'
// import ruLocales from '../../files/locales/ru'
// import uaLocales from '../../files/locales/ua'

export function languageSwitcher() {
   const langList = document.querySelectorAll('.header__lang-item')
   langList.forEach((item) => {
      item.addEventListener('click', (el) => {
         if (!el.target.classList.contains('_active')) {
            resetLang()
            item.classList.add('_active')
            window.localStorage.setItem('lang', item.value)
            setLang()
            menuClose()
         }
      })
   })
   function resetLang() {
      langList.forEach((item) => {
         item.classList.remove('_active')
      })
   }
}

export function setLang() {
   let lang = (window.hasOwnProperty('localStorage') && window.localStorage.getItem('lang')) || 'ru'
   const curLangBtnEl = document.querySelector(`[data-language= ${lang}]`)
   curLangBtnEl.classList.add('_active')
   const locales = selectLocales(lang)
   const allDataEl = document.querySelectorAll('[data-lg]')
   const allDataElPlaceholder = document.querySelectorAll('[data-lg-placeholder]')
   allDataEl.forEach((lgItem) => {
      const landPath = lgItem.dataset.lg.split('.')
      const curVal = getTransfer(locales, landPath)
      lgItem.innerHTML = curVal
   })
   allDataElPlaceholder.forEach((lgItem) => {
      const landPath = lgItem.dataset.lgPlaceholder.split('.')
      const curVal = getTransfer(locales, landPath)
      lgItem.setAttribute('placeholder', curVal)
   })
}

function selectLocales(language) {
   if (language === 'ru') return ruLocales
   if (language === 'ua') return uaLocales
}

function getTransfer(obj, way) {
   let result
   runner(obj, way)
   function runner(obj, way, n = 0) {
      if (way.length === n) return
      result = obj[way[n]]
      runner(obj[way[n]], way, (n += 1))
   }
   return result
}
