import { ACCESS_NAME, REFRESH_NAME } from './env.js'

const buttonCopy = document.querySelector('#button-copy')
const buttonPaste = document.querySelector('#button-paste')
const spanFeedback = document.querySelector('#span-feedback')

buttonCopy.addEventListener('click', function(event){
  event.preventDefault()

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url

    chrome.cookies.get({url, name: ACCESS_NAME}, function(cookie) {
      chrome.storage.local.set({ 
        accessCookie: cookie.value
      })
    });
  
    chrome.cookies.get({url, name: REFRESH_NAME}, function(cookie) {
      chrome.storage.local.set({ 
        refreshCookie: cookie.value
      })
    });

    spanFeedback.innerText = 'Done!'
  });

})

buttonPaste.addEventListener('click', function(event){
  event.preventDefault()

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url

    chrome.storage.local.get(["accessCookie", "refreshCookie"])
    .then((storage) => {

      chrome.cookies.set({
        url,
        value: storage.accessCookie,
        name: ACCESS_NAME
      })

      chrome.cookies.set({
        url,
        value: storage.refreshCookie,
        name: REFRESH_NAME
      })

      spanFeedback.innerText = 'Done!'
    });
  });
})
