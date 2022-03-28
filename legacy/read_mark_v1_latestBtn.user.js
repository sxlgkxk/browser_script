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

//-------------------------------- common functions --------------------------------
var scripts_dom = document.createElement('script');
scripts_dom.src = 'https://unpkg.com/axios/dist/axios.min.js';
scripts_dom.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(scripts_dom);

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

(function(){

//-------------------------------- code snippets --------------------------------

let latest_url=null
let latest_percent=0

//-------------------------------- latest_panel --------------------------------

body=document.querySelector('body')
mark_panel=document.createElement('div')
document.body.before(mark_panel)

mark_panel_list_html=""
for(let i=0;i<10;i++){
	url=localStorage.getItem("mark_url"+i)
	percent=localStorage.getItem("mark_percent"+i)
	markDesc=url+" "+percent
	mark_panel_list_html+=`<li><span class="markOrder">`+i+`</span><button onclick="document.setMark(`+i+`)">+</button><button onclick="document.gotoMark(`+i+`)">go</button><span class="markSpan" id="mark`+i+`">`+markDesc+`</span></li>`
}

mark_panel.innerHTML=`<div id="markPanel" hidden>
<ol>`+mark_panel_list_html+
`</ol>
</div>
<style>
	#markPanel{
		color: #fff;
		background-color: #333;
		position: fixed;
		bottom: 100px;
		right: 0px;
		height: 250px;
		width: 200px;
		opacity: 0.9;
		z-index: 3000;
		padding: 10px;
	}
	span.markOrder{
		font-weight: bold;
		color: #8bdb81;
		padding-right: 10px;
	}
	span.markSpan{
		font-size: 12px;
	}
	[hidden] { display: none !important; }
</style>`

document.toggleMarkPanel=()=>{
	markPanel=document.querySelector("#markPanel");
	if(markPanel.hidden){
		markPanel.hidden=false
	}else{
		markPanel.hidden=true
	}
}
document.setMark=function(val){
	localStorage.setItem("mark_url"+val, "/url")
	localStorage.setItem("mark_percent"+val, "60%")
	document.querySelector("#mark"+val).textContent="hi"
}
document.gotoMark=function(val){
	url=localStorage.setItem("mark_url"+val)
	percent=localStorage.setItem("mark_percent"+val)
}

//-------------------------------- mark_button --------------------------------

body=document.querySelector('body')
mark_button=document.createElement('button')
body.before(mark_button)

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
	
	if(location.href==latest_url && Math.abs(document.documentElement["scrollTop"]-latest_percent/100*document.documentElement["scrollHeight"])<=2){
		// 多书签
		document.toggleMarkPanel()
	}else{
		// 默认书签
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
}

//-------------------------------- goto_latest_button --------------------------------

goto_latest_button=document.createElement('button')
body.before(goto_latest_button)

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
			latest_url=content["url"]
			latest_percent=content["percent"]
			read_latest_date=content["date"]

			if(location.href==latest_url && Math.abs(document.documentElement["scrollTop"]-latest_percent/100*document.documentElement["scrollHeight"])<=2){
				// 多书签
				document.toggleMarkPanel()
			}else{
				// 默认书签
				localStorage.setItem("is_goto_recent", "true")
				if(location.href!=latest_url)
					location.href=latest_url
				else{
					document.documentElement["scrollTop"]=latest_percent/100*document.documentElement["scrollHeight"]
					localStorage.setItem("is_goto_recent", "")

					now=Math.round(new Date())
					date_html="latest "+Math.round((now-read_latest_date)/1000/3600)+"h"
					goto_latest_button.innerHTML=date_html
				}
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