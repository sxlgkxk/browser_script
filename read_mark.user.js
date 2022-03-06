// ==UserScript==
// @name         read_mark
// @include      http://readonlinefreebook.com/*
// @include      https://readonlinefreebook.com/*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/read_mark.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/read_mark.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  read mark
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var scripts_dom = document.createElement('script');
scripts_dom.src = 'https://unpkg.com/axios/dist/axios.min.js';
scripts_dom.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(scripts_dom);

(function(){

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const create = tag => document.createElement(tag);

function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return ((h[st]||b[st]) / ((h[sh]||b[sh])) * 100).toFixed(2);
}

// buttons dom insert
body=document.querySelector('body')
mark_button=document.createElement('button')
body.before(mark_button)

goto_latest_button=document.createElement('button')
body.before(goto_latest_button)

// move button style
mark_button.innerHTML=`<style>
	.float_btn{
		font-weight: bold;
		color: #fff;
		background-color: #333;
		position: fixed;
		width: 50px;
		height: 50px;
		opacity: 0.8;
		z-index: 1;
	}
</style`

// mark_button
mark_button.innerHTML+='mark'
mark_button.id='read_mark_btn'
mark_button.classList.add("float_btn")
mark_button.style.bottom='50px'
mark_button.style.right='50px'
mark_button.onclick=()=>{
	gist_token=localStorage.getItem('gist_token')
	if(!gist_token){
		gist_token=prompt('gist_token?')
		localStorage.setItem('gist_token',gist_token)
	}
	
	let push_text=JSON.stringify({
		"percent": getScrollPercent(),
		"url": location.href,
		"date": Math.round(new Date())
	})

	let gist_id="00fd89bedaf51674bfdb7bdb38720749"
	axios.patch("https://api.github.com/gists/"+gist_id
			, {files:{"read_latest.json":{"content": push_text}}}
			, {headers:{Authorization:"token "+gist_token}}
		)
		.then((response) => {
			alert('mark success')
		})
}

// goto_latest_button
goto_latest_button.innerHTML='latest'
goto_latest_button.id='goto_latest_btn'
goto_latest_button.classList.add("float_btn")
goto_latest_button.style.bottom='50px'
goto_latest_button.style.right='100px'
goto_latest_button.onclick=()=>{
	gist_token=localStorage.getItem('gist_token')
	if(!gist_token){
		gist_token=prompt('gist_token?')
		localStorage.setItem('gist_token',gist_token)
	}
	let gist_id="00fd89bedaf51674bfdb7bdb38720749"
	axios.get("https://api.github.com/gists/"+gist_id)
		.then((response) => {
			let data = response.data;
			content=JSON.parse(data.files["read_latest.json"].content)
			url=content["url"]
			percent=content["percent"]
			read_latest_date=content["date"]

			localStorage.setItem("is_goto_recent", "true")
			if(location.href!=url)
				location.href=url
			else{
				document.documentElement["scrollTop"]=percent/100*document.documentElement["scrollHeight"]
				localStorage.setItem("is_goto_recent", "")

				now=Math.round(new Date())
				date_html="latest "+Math.round((now-read_latest_date)/1000/3600)+"h"
				goto_latest_button.innerHTML=date_html
			}
		})
}
if(localStorage.getItem("is_goto_recent")) {
	let wait_dom_interval = setInterval(() => {
		if (!axios) return
		clearInterval(wait_dom_interval)
		$("#goto_latest_btn").click()
	}, 200)
}
})();