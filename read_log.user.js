// ==UserScript==
// @name         read_log
// @include      http://readonlinefreebook.com/*
// @include      https://readonlinefreebook.com/*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/read_log.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/read_log.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  read log
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function(){

blockWidth=10
blockPadding=3
// weeksCount=53
weeksCount=30 // 393, 94
canvasWidth=(blockWidth+blockPadding)*weeksCount+blockPadding
canvasHeight=(blockWidth+blockPadding)*7+blockPadding

//-------------------------------- common functions --------------------------------

function addScript(src){
	var scripts_dom = document.createElement('script');
	scripts_dom.src = src;
	scripts_dom.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(scripts_dom);
}
addScript('https://unpkg.com/axios/dist/axios.min.js')

function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return ((h[st]||b[st]) / ((h[sh]||b[sh])) * 100).toFixed(2);
}

function getGistToken(){
	gist_token=localStorage.getItem('gist_token')
	if(!gist_token){
		gist_token=prompt('gist_token?')
		localStorage.setItem('gist_token',gist_token)
	}
	return gist_token
}

async function gist_get_async(gist_id, filename){
	// gist_get_async("cfa70a44bb181edbb2be19dacbcf6808", "read_log.json").then((content)=>{console.log(content)})
	response=await axios.get("https://api.github.com/gists/"+gist_id)
	data=response.data
	content=data.files[filename].content
	return content
}

async function gist_set_async(gist_id, filename, content){
	// gist_set_async("cfa70a44bb181edbb2be19dacbcf6808", "read_log.json", "[]").then((content)=>{console.log(content)})
	files={}
	files[filename]={"content":content}
	gist_token=getGistToken()
	return await axios.patch("https://api.github.com/gists/"+gist_id, {files:files}, {headers:{Authorization:"token "+gist_token}})
}

function addScript(html){
	style=document.createElement("div")
	body.before(style)
	style.innerHTML =`<style>`+html+`</style>`
}

//-------------------------------- code snippets --------------------------------

function addLine(){
	line=document.createElement("hr")
	line.classList.add("mark")
	line.style.top=document.documentElement["scrollTop"]+35+"px"
	body.before(line)
}

addScript(`
	hr.mark{
		position: absolute;
		width: 100%;
		left:0px;
	}
	#heatmap{
		background-color: #0d1117;
		margin: 0 auto;
		display:block;
	}
`)

function getColor(count){
	colors=[
		"#161b22",
		"#cef1dd",
		"#9ee3bb",
		"#6dd499",
		"#3cc677",
		"#33a865",
		"#2a8b53",
		"#216d41"
	]
	max_count=30
	return colors[Math.ceil(count/max_count*(colors.length-1))]
}

function setBlock(x,y,count,ctx){
	ctx.fillStyle = getColor(count);
	ctx.fillRect(x*(blockWidth+blockPadding)-blockWidth, y*(blockWidth+blockPadding)-blockWidth, blockWidth, blockWidth); 
}

function getRegularWeekday(date){
	weekday=date.getDay()
	return weekday?weekday:7
}

function sum(array){
	return array.reduce((partialSum, a) => partialSum + a, 0)
}

function refreshHeatmap(){
	log=localStorage.getItem('readlog')
	log=log?JSON.parse(log):{}

	now=new Date();
	now1=new Date(now-getRegularWeekday(now)*3600*24*1000)

	canvas=document.querySelector('canvas#heatmap')
	ctx=canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for(i=0;i<365;i++){
		date=new Date(now-i*3600*24*1000)
		weekday=getRegularWeekday(date)
		y=weekday

		date1=new Date(date-getRegularWeekday(date)*3600*24*1000)
		x=weeksCount-(now1-date1)/1000/3600/24/7

		dateStr=getDateStr(date)
		uuid=getUuid()
		data=log[dateStr]
		count=data?sum(Object.values(data)):0

		setBlock(x,y,count,ctx)
	}
}

function getUuid(){
	uuid=localStorage.getItem('uuid')
	if(!uuid){
		uuid=String(Math.random()).substring(2,4)
		localStorage.setItem('uuid', uuid)
	}
	return uuid
}

function getDateStr(date=null){
	date=date?date:new Date()
	year=String(date.getFullYear()).substring(2,4)
	month=String(date.getMonth()+1).padStart(2,'0')
	day=String(date.getDate()).padStart(2,'0')
	return year+month+day
}

function updateLocalLog(uuid, date){
	log=localStorage.getItem('readlog')
	log=log?JSON.parse(log):{}
	if(!log[date]) log[date]={}
	if(!log[date][uuid]) log[date][uuid]=0
	log[date][uuid]+=1
	localStorage.setItem('readlog', JSON.stringify(log))
}

function updateGist(){
	gist_id="cfa70a44bb181edbb2be19dacbcf6808"
	filename="read_log.json"

	log=localStorage.getItem('readlog')
	log=log?JSON.parse(log):{}

	// pull
	gist_get_async(gist_id, filename).then((content)=>{
		remoteLog=JSON.parse(content)
		for(let [date, data] of Object.entries(remoteLog)){
			if(!log[date]){
				log[date]=data;
				continue
			}
			for(let [uuid, count] of Object.entries(data)){
				if(uuid!=getUuid()){
					log[date][uuid]=count
				}
			}
		}

		// push
		gist_set_async(gist_id, filename, JSON.stringify(log)).then((response)=>{alert("update success")})
		localStorage.setItem('readlog', JSON.stringify(log))

		refreshHeatmap()
	})
}

//-------------------------------- statistics --------------------------------

chapter_dom=document.querySelector("div.chapter-detail")
heatmap_panel=document.createElement("div")
chapter_dom.before(heatmap_panel)
heatmap_panel.innerHTML =`<canvas id="heatmap" width="`+canvasWidth+`" height="`+canvasHeight+`"></canvas>`

canvas=document.querySelector("canvas#heatmap")
canvas.onclick=updateGist

//-------------------------------- interval log --------------------------------

function log(){
	addLine()

	uuid=getUuid()
	date=getDateStr()
	updateLocalLog(uuid, date)
	
	refreshHeatmap()
}
document.log=log

setInterval(()=>{document.log()},1000*300)
refreshHeatmap()

})();