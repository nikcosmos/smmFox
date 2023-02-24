(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function menuClose() {
        bodyUnlock();
        document.documentElement.classList.remove("menu-open");
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function pageNavigation() {
        document.addEventListener("click", pageNavigationAction);
        function pageNavigationAction(e) {
            if ("click" === e.type) {
                const targetElement = e.target;
                if (targetElement.closest("[data-goto]")) {
                    const gotoLink = targetElement.closest("[data-goto]");
                    const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                    const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                    const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                    const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                    gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                    e.preventDefault();
                }
            }
        }
    }
    let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
        const targetBlockElement = document.querySelector(targetBlock);
        if (targetBlockElement) {
            let headerItem = "";
            let headerItemHeight = 0;
            if (noHeader) {
                headerItem = "header.header";
                const headerElement = document.querySelector(headerItem);
                if (!headerElement.classList.contains("_header-scroll")) {
                    headerElement.style.cssText = `transition-duration: 0s;`;
                    headerElement.classList.add("_header-scroll");
                    headerItemHeight = headerElement.offsetHeight;
                    headerElement.classList.remove("_header-scroll");
                    setTimeout((() => {
                        headerElement.style.cssText = ``;
                    }), 0);
                } else headerItemHeight = headerElement.offsetHeight;
            }
            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
            let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
            targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
            targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
            window.scrollTo({
                top: targetBlockElementPosition,
                behavior: "smooth"
            });
        }
    };
    function languageSwitcher() {
        const langList = document.querySelectorAll(".header__lang-item");
        langList.forEach((item => {
            item.addEventListener("click", (el => {
                if (!el.target.classList.contains("_active")) {
                    resetLang();
                    item.classList.add("_active");
                    window.localStorage.setItem("lang", item.value);
                    setLang();
                    menuClose();
                }
            }));
        }));
        function resetLang() {
            langList.forEach((item => {
                item.classList.remove("_active");
            }));
        }
    }
    function setLang() {
        let lang = window.hasOwnProperty("localStorage") && window.localStorage.getItem("lang") || "ru";
        const curLangBtnEl = document.querySelector(`[data-language= ${lang}]`);
        curLangBtnEl.classList.add("_active");
        const locales = selectLocales(lang);
        const allDataEl = document.querySelectorAll("[data-lg]");
        const allDataElPlaceholder = document.querySelectorAll("[data-lg-placeholder]");
        allDataEl.forEach((lgItem => {
            const landPath = lgItem.dataset.lg.split(".");
            const curVal = getTransfer(locales, landPath);
            lgItem.innerHTML = curVal;
        }));
        allDataElPlaceholder.forEach((lgItem => {
            const landPath = lgItem.dataset.lgPlaceholder.split(".");
            const curVal = getTransfer(locales, landPath);
            lgItem.setAttribute("placeholder", curVal);
        }));
    }
    function selectLocales(language) {
        if ("ru" === language) return ruLocales;
        if ("ua" === language) return uaLocales;
    }
    function getTransfer(obj, way) {
        let result;
        runner(obj, way);
        function runner(obj, way, n = 0) {
            if (way.length === n) return;
            result = obj[way[n]];
            runner(obj[way[n]], way, n += 1);
        }
        return result;
    }
    isWebp();
    menuInit();
    languageSwitcher();
    setLang();
    pageNavigation();
})();