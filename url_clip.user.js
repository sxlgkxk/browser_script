// ==UserScript==
// @name         url_clip
// @include      *wikipedia.org*
// @include      *https://www.bilibili.com/*
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  url clip
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
	setTimeout(function () {
		// hexo url
		dom = document.createElement('div');
		dom.id = 'url-hexo-container';
		let title='', imageUrl='';
		title = document.title.replace('"', "'");

		if(location.href.startsWith('https://www.bilibili.com/')) {
			imageUrl=document.querySelector('head > meta[itemprop="thumbnailUrl"]').getAttribute('content')
		} else {
		}

		dom.innerHTML = `<span>{%url ${location.href} "${title}" %}</span><br>`
		if(imageUrl)
			dom.innerHTML+=`<span>${imageUrl}</span><br>`
		dom.innerHTML+=`<span>{%endurl%}</span>
			<style>
				#url-hexo-container {
					text-align: center;
					background-color: #ddd;
					color: #000;
					padding: 10px;
					font-size: 20px;
					text-shadow: none;
				}
			</style>
		`
		document.body.prepend(dom);

	}, 10)

})();