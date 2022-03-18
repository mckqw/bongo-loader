// ==UserScript==
// @name         Bongo Loader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Replace any old loader with a cool bongo cat
// @author       Matthew Clark
// @match        https://any.old.site/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// ==/UserScript==

const fs = require('fs');
const css = require('./assets/styles/styles.css');

// svg/html template to inject
const content = fs.readFileSync(__dirname + '/assets/templates/content.html', 'utf8');

// class to
const classToReplace = '.js-log-animation';

// If the loader is added after the DOM has been loaded, ie when js injects html, we want to watch for that class
const classToWatch = 'build-page';


const domInsertionObserver = new MutationObserver((mutationRecord) => {
  const mutation = mutationRecord[0];
  if (mutation.addedNodes.length) {
    mutation.addedNodes.forEach((node)=> {
      if (node.classList.contains('build-page')) {
        const logAnimation = document.querySelector(classToReplace);

        if (logAnimation)
          logAnimation.innerHTML = content;
      }
    })
  }
});

const search = (tree, target) => {
  return [...tree.childNodes].reduce((prev, current) => {
    if (current.innerText === target ) {
      return current;
    }
  });
};

domInsertionObserver.observe(document, { childList: true, subtree: true });
