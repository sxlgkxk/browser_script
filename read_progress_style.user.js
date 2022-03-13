// ==UserScript==
// @name         read_progress_style
// @include      *
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/read_comment.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/read_comment.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  readonlinefreebook style & scrollProgress
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==


const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const create = tag => document.createElement(tag);

(function() {
    function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
    }

    var container=create('p')
    container.style="z-index:3000; position:fixed; bottom:50px; left:50px; color:#a9a9a9; font-size:20px"
    container.textContent=parseInt(getScrollPercent())+'%'
    document.body.append(container);

    window.onscroll=()=>{
        container.textContent=parseInt(getScrollPercent())+'%'
    }
})();