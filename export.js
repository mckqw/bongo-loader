// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://gitlab.disney.com/DDM/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// ==/UserScript==

const fs = require('fs');
const content = fs.readFileSync(__dirname + '/content.html', 'utf8');
const finished = fs.readFileSync(__dirname + '/finished.html', 'utf8');
const css = require('./styles.css');

const domInsertionObserver = new MutationObserver((mutationRecord) => {
  const mutation = mutationRecord[0];
  if (mutation.addedNodes.length) {
    mutation.addedNodes.forEach((node)=> {
      if (node.classList.contains('build-page')) {
        const logAnimation = document.querySelector('.js-log-animation');

        if (logAnimation)
          logAnimation.innerHTML = content;

        const jobSucceeded = search(document.querySelector('.job-log'), 'Job succeeded');

        if (jobSucceeded)
          jobSucceeded.innerHTML = finished;

      } else if (node.dataset.qa.selector === 'job_log_content' && node.getAttribute('is-complete')){
        const jobSucceeded = search(document.querySelector('.job-log'), 'Job succeeded');

        if (jobSucceeded)
          jobSucceeded.innerHTML = finished;
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
