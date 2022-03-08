// ==UserScript==
// @name         unfamiliar_words
// @include      http://readonlinefreebook.com/*
// @include      https://readonlinefreebook.com/*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/unfamiliar_words.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/unfamiliar_words.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  show unfamiliar words
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

// readonlinefreebooks_novel_content_dom
let content_dom=document.querySelector('#des_novel')
if (!content_dom) content_dom=document.querySelector('div.chapterContent')

/* -------------------------------- words_dom -------------------------------- */

// words_dom: [normal, main, sub, ignore]
let words_dom=document.createElement('div')
content_dom.before(words_dom)
words_dom.style.width='100%'
words_dom.style.backgroundColor='#333'
words_dom.style.lineHeight='2'
words_dom.style.padding='20px'
words_dom.innerHTML=`<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`
let normal_html=`<details open><summary id="normal_summary">normal words</summary>`
	+`<button id="batch_ignore_btn" style="background-color:#444; color:#ddd ;border:0; margin-top:4px;margin-bottom:4px; margin-left:20px; padding-top:5px;padding-bottom:5px;">batch ignore</button>`
	+`<table style='width: 100%'>`
let main_html=`<details open><summary id="main_summary">main words</summary><table style='width: 100%'>`
let sub_html=`<details><summary id="sub_summary">sub words</summary><table style='width: 100%'>`
let ignore_html=`<details><summary id="ignored_summary">ignored words</summary>`
	+`<button id="ignored_update_btn" style="background-color:#444; color:#ddd ;border:0; margin-top:4px;margin-bottom:4px; margin-left:20px; padding-top:5px;padding-bottom:5px;">ignored words update</button>`
	+`<table style='width: 100%'>`
let search_html=`<input placeholder="search fuzzy here"></input>
	<li><b><i>word</i></b> desc</li>
	<li><b><i>word2</i></b> desc2</li>
`

/* -------------------------------- words extract -------------------------------- */

// novel text -> words_set
let content=content_dom.innerText
let word_regx=/\w{3,}/g
let words_set=new Set()
for(match of content.matchAll(word_regx)){
	words_set.add(match[0].toLowerCase())
}

/* -------------------------------- html format -------------------------------- */

let type="" 	// [normal, main, sub, ignore]
let desc="" 	// a kind of plant
let word=""		// cinnamon
let _tr_html=""
let cnt_normal=0, cnt_main=0, cnt_sub=0, cnt_ignore=0;

for(word of words_set){
	desc=localStorage.getItem("w-"+word)

	if(desc){
		if(desc[0]=='-')
			type='sub'
		else if(desc[0]=='#'){
			type='ignore';
			desc=""
		}else 
			type='main'
	}else{
		type='normal';
		desc=""
	}

	/*
		1. 比较糙. 因为js没有str.format方法
		2. 大概注解(以word==cinnamon为例):
			1. tr#w-cinnamon
			2. 第一个td: 存放title: td.w-main.w-main-title
			3. 第二个td: 存放button: td.w-modify, 属性值word=cinnamon
			4. 第三个td: 存放desc
	*/
	_tr_html=`<tr id="w-`+word+`">
		<td style="text-align: right; padding-right:20px;width: 120px;" class="w-`+type+` w-`+type+`-title">`
			+word
		+`</td>`
	_tr_html+=`<td style="width:60px">`
			+`<button style="background-color:#444; color:#666 ;border:0; margin-top:4px;margin-bottom:4px;margin-left:4px;margin-right:4px" class="w-modify" word="`+word+`">+</button>`
			+`<button style="background-color:#444; color:#666 ;border:0; margin-top:4px;margin-bottom:4px;margin-left:4px;margin-right:4px" class="w-translate" word="`+word+`">?</button>`
		+`</td>`
	_tr_html+=`<td class="w-`+type+`">`+desc+`</td></tr>`

	if(type=="normal") {normal_html += _tr_html; cnt_normal++}
	else if(type=="main") {main_html += _tr_html; cnt_main++}
	else if(type=="sub") {sub_html += _tr_html; cnt_sub++}
	else {ignore_html += _tr_html; cnt_ignore++}
}
normal_html+='</table></details>'
main_html+='</table></details>'
sub_html+='</table></details>'
ignore_html+='</table></details>'
words_dom.innerHTML+=normal_html+main_html+sub_html+ignore_html+search_html+`
	<style>
		td.w-main{color:#8bdb81;}
		td.w-sub{color:#9ad0ec;}
		td.w-ignore{color:#666}
		td.w-normal{color:#aaa}
		td.w-changed{color:#bdb2ff}
		td.w-main-title, td.w-sub-title{font-weight:bold}
		summary{color: #aaa;text-align: center;}
		td{font-family: Arial !important;}
	</style>
	<img src="https://picsum.photos/seed/`+location.href.replaceAll("/","")+`/400/300" style="margin-left:auto;margin-right:auto;display:block"></img>`
document.querySelector('#normal_summary').innerText+="("+cnt_normal+")"
document.querySelector('#main_summary').innerText+="("+cnt_main+")"
document.querySelector('#sub_summary').innerText+="("+cnt_sub+")"
document.querySelector('#ignored_summary').innerText+="("+cnt_ignore+")"

if(cnt_normal==0) document.querySelector('#batch_ignore_btn').style.display='none'

/* -------------------------------- edit event -------------------------------- */

// edit comment
for(button of document.querySelectorAll('.w-modify')){
	button.onclick=function(){
		word=this.getAttribute('word')
		desc=localStorage.getItem("w-"+word)
		if(!desc)desc="#"

		let new_desc = window.prompt("edit '"+word+"' description", desc);
		if(new_desc){
			localStorage.setItem("w-"+word, new_desc);
			let tr_dom=document.querySelector('#w-'+word)
			tr_dom.childNodes[3].innerText=new_desc;
			tr_dom.style.background="#555"

			tr_dom.childNodes[1].classList.remove("w-normal")
			tr_dom.childNodes[1].classList.add("w-changed")
		}
	}
}

// translate button
for(button of document.querySelectorAll('.w-translate')){
	button.onclick=function(){
		word=this.getAttribute('word')
		translate='hi'
		axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/"+word)
			.then((response) => {
				dictionaryHtml=''
				console.log(response.data)
				for (meaing of response.data[0]["meanings"]){
					dictionaryHtml+=`<b style="color:#8bdb81">`+meaing["partOfSpeech"]+`</b>`
					for (definition of meaing["definitions"]){
						example=definition["example"]
						dictionaryHtml+=`<li title="`+example+`">`+definition["definition"]+`</li>`
					}
				}
				let tr_dom=document.querySelector('#w-'+word)
				tr_dom.childNodes[3].innerHTML=dictionaryHtml;
			})
	}
}

// batch ignore button
let batch_ignore_btn=document.querySelector('#batch_ignore_btn')
batch_ignore_btn.onclick=function(){
	let words=document.querySelectorAll('td.w-normal.w-normal-title')
	for(word of words){
		let new_desc="#"
		localStorage.setItem("w-"+word.innerText, new_desc);
		let tr_dom=document.querySelector('#w-'+word.innerText)
		tr_dom.childNodes[3].innerText=new_desc;
		tr_dom.style.background="#555"

		tr_dom.childNodes[1].classList.remove("w-normal")
		tr_dom.childNodes[1].classList.add("w-changed")
	}
}

// gist : ignored_update_btn
let ignored_update_btn=document.querySelector('#ignored_update_btn')
ignored_update_btn.onclick=function(){
	gist_token=localStorage.getItem('gist_token')
	if(!gist_token){
		gist_token=prompt('gist_token?')
		localStorage.setItem('gist_token',gist_token)
	}

	// pull
	let gist_id="619c0365354b267317315c1a5435bcc0"
	let ignored_word_set=null
	axios.get("https://api.github.com/gists/"+gist_id)
		.then((response) => {
			let data = response.data;
			content=data.files["ignored_words.json"].content
			ignored_word_set=new Set(JSON.parse(content))

			for(word of ignored_word_set){
				word_desc=localStorage.getItem("w-"+word)
				if(!word_desc)
					localStorage.setItem("w-"+word, "#")
			}
		})
		.then(()=>{
			// merge
			for(i=0;i<localStorage.length;i++){
				key=localStorage.key(i)
				if (key.substr(0,2)=="w-"){
					val=localStorage.getItem(key)
					if(val[0]=="#")
						ignored_word_set.add(key.substr(2))
				}
			}
			let push_text=JSON.stringify(Array.from(ignored_word_set))

			// push
			axios.patch("https://api.github.com/gists/"+gist_id
					, {
						files:{
							"ignored_words.json":{
								"content": push_text,
							}
						}
					}
					, {headers:{Authorization:"token "+gist_token}})
				.then((response) => {
					alert('update success')
				})
		})
}

})();