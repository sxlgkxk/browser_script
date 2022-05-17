// ==UserScript==
// @name         url_clip
// @include      *wikipedia.org*
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

		// if(location.href.startsWith('https://www2.javhdporn.net/video/')) {
		// 	imageUrl=document.querySelector('head > meta[property="og:image"]').getAttribute('content')
		// } else {
		// }

		dom.innerHTML = `<span>{%url ${location.href} "${title}" %}</span><br>`
			// +`<span>${imageUrl}</span><br>`
			+`<span>{%endurl%}</span>
			<style>
				#url-hexo-container {
					width: 100%;
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