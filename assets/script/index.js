'use strict';

import {select, selectAll, onEvent} from './utility.js'

const acceptCookiesBtn = select('.accept-cookies-btn')
const flexbox = select('.flexbox')
const startModal = select('.start')
const settingModal = select('.final')
const cookiesModals = select('.cookies-modals')
const settingCookiesBtn = select('.settings-cookies-btn')
const checkbox = selectAll('input[type=checkbox]')
const saveCookies = select('.save-button')
let width = window.innerWidth;
let height = window.innerHeight;

function loadWindow() {
    setTimeout(() => {
        flexbox.classList.add('blur-content')
        cookiesModals.style.display = 'grid'
    }, 1000)
    checkbox.forEach((input) => {
        input.checked = true
    })
}

function showSettings() {
    startModal.style.display = 'none'
    settingModal.style.display = 'block'
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
  
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function checkCookies() {
    console.log(document.cookie ? 'Cookies avaible' : 'No cookies found')
    if (document.cookie.length > 0) {
        flexbox.classList.remove('blur-content')
        settingModal.style.display = 'none'
    } else {
        loadWindow() 
    }
}

function setCookie(name, value, seconds) {
    const date = new Date()
    date.setSeconds(date.getSeconds() + seconds)
    let UTCDate = date.toUTCString()
    encodeURIComponent(name)
    encodeURIComponent(value)
    document.cookie = `${name}=${value}; expires=${UTCDate}; path=/`;
    console.log(document.cookie)
}

function printCookies() {
    if (document.cookie.length > 0) {
        const cookies = document.cookie.split('; ')
        for (let i = 0; i < cookies.length; i++) {
            console.log(
                decodeURIComponent(cookies[i].split('=')[0]) + ': ' + 
                decodeURIComponent(cookies[i].split('=')[1])
            )
        }
    } else {
        console.log('No cookies found')
    }
}

function setAllCookies() {
    setCookie('Width', width, 15)
    setCookie('Height', height, 15)
    setCookie('OS', getOS(), 15)
    setCookie('Browser', getBrowser(), 15)

    flexbox.classList.remove('blur-content')
    settingModal.style.display = 'none'
    startModal.style.display = 'none'
    printCookies()
}

function getBrowser() {
    let nav = navigator.userAgent.toLowerCase();
    let brow;

    switch (true) {
        case nav.includes('edge') || nav.includes('edg'):
            brow = 'Edge';
            break;
        case nav.includes('chrome'):
            brow = 'Chrome';
            break;
        case nav.includes('firefox'):
            brow = 'Firefox';
            break;
        default:
            brow = 'Unknown';
    }

    return brow
}

function getOS() {
    let oscpu = navigator.platform;
    let os;
    if (oscpu.includes('Win32')) {
        os = 'Windows';
    } else {
        os = `Mac/iOS`;
    }

    return os
}

function checkInput() {
    let newCookie;
    for (let i = checkbox.length - 1; i >= 0; i--) {
        if (checkbox[i].checked) {
            newCookie = checkbox[i].className
        }
        
        switch (newCookie) {
            case 'browser':
                setCookie('Browser', getBrowser(), 15)
                break
            case 'width':
                setCookie('Width', width, 15)
                break
            case 'height':
                setCookie('Height', height, 15)
                break
            case 'os':
                setCookie('OS', getOS(), 15)
                break
            default:
                setCookie('Rejected', 'Rejected', 15)
        }
    }
    
    flexbox.classList.remove('blur-content')
    settingModal.style.display = 'none'
    startModal.style.display = 'none'
}

onEvent('click', settingCookiesBtn, showSettings)
onEvent('click', acceptCookiesBtn, setAllCookies)
onEvent('click', saveCookies, checkInput)
onEvent('load', window, checkCookies)