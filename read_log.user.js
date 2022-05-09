// ==UserScript==
// @name         read_log
// @include      http://readonlinefreebook.com/*
// @include      https://readonlinefreebook.com/*
// @include      *wikipedia.org*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/read_log.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/read_log.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.2
// @description  read log
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {

	blockWidth = 10
	blockPadding = 3
	// weeksCount=53
	weeksCount = 30 // 393, 94
	canvasWidth = (blockWidth + blockPadding) * weeksCount + blockPadding
	canvasHeight = (blockWidth + blockPadding) * 7 + blockPadding

	//-------------------------------- common functions --------------------------------

	function addScript(src) {
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
		return ((h[st] || b[st]) / ((h[sh] || b[sh])) * 100).toFixed(2);
	}

	function getGistToken() {
		gist_token = localStorage.getItem('gist_token')
		if (gist_token != null && gist_token.length > 10) {
			gist_token = prompt('gist_token?')
			if (gist_token) {
				localStorage.setItem('gist_token', gist_token)
			}
		}
		return gist_token
	}

	async function gist_get_async(gist_id, filename) {
		// gist_get_async("cfa70a44bb181edbb2be19dacbcf6808", "read_log.json").then((content)=>{console.log(content)})
		response = await axios.get("https://api.github.com/gists/" + gist_id)
		data = response.data
		content = data.files[filename].content
		return content
	}

	async function gist_set_async(gist_id, filename, content) {
		// gist_set_async("cfa70a44bb181edbb2be19dacbcf6808", "read_log.json", "[]").then((content)=>{console.log(content)})
		files = {}
		files[filename] = { "content": content }
		gist_token = getGistToken()
		return await axios.patch("https://api.github.com/gists/" + gist_id, { files: files }, { headers: { Authorization: "token " + gist_token } })
	}

	function addStyle(html) {
		style = document.createElement("div")
		document.body.before(style)
		style.innerHTML = `<style>` + html + `</style>`
	}

	//-------------------------------- code snippets --------------------------------

	addStyle(`
		#wpmArea{
			position: absolute;
			right: 10px;
			left:10px;
			background-color: rgba(255, 255, 255, 0.2);
		}
		#heatmap{
			background-color: #0d1117;
			margin: 0 auto;
			display:block;
		}
		table#history_table {
			border-collapse: collapse;
			width: 100%;
		}
		#history_table th, #history_table td {
			text-align: left;
			padding: 8px;
		}
		button.pagiBtn{
			background-color: #333;
			color: #fff;
			margin: 4px;
			padding-left: 15px;
			padding-right: 15px;
			padding-top: 9px;
			padding-bottom: 9px;
		}
	`)

	for (let i = 1; i <= 31; i++) {
		addStyle(`td.historyDay` + i + `{background-color: rgba(` + Math.floor(Math.random() * 255) + `,` + Math.floor(Math.random() * 255) + `,` + Math.floor(Math.random() * 255) + `, 0.5);}`)
	}

	function getColor(count) {
		colors = [
			"#161b22",
			"#cef1dd",
			"#9ee3bb",
			"#6dd499",
			"#3cc677",
			"#33a865",
			"#2a8b53",
			"#216d41"
		]
		max_count = 60 * 8
		return colors[Math.ceil(Math.min(count / max_count, 1) * (colors.length - 1))]
	}

	function setBlock(x, y, count, ctx) {
		ctx.fillStyle = getColor(count);
		ctx.fillRect(x * (blockWidth + blockPadding) - blockWidth, y * (blockWidth + blockPadding) - blockWidth, blockWidth, blockWidth);
	}

	function getRegularWeekday(date) {
		weekday = date.getDay()
		return weekday ? weekday : 7
	}

	function sum(array) {
		return array.reduce((partialSum, a) => partialSum + a, 0)
	}

	function refreshHeatmap() {
		log = localStorage.getItem('readlog')
		log = log ? JSON.parse(log) : {}

		now = new Date();
		now1 = new Date(now - getRegularWeekday(now) * 3600 * 24 * 1000)

		canvas = document.querySelector('canvas#heatmap')
		ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (i = 0; i < 365; i++) {
			date = new Date(now - i * 3600 * 24 * 1000)
			weekday = getRegularWeekday(date)
			y = weekday

			date1 = new Date(date - getRegularWeekday(date) * 3600 * 24 * 1000)
			x = weeksCount - (now1 - date1) / 1000 / 3600 / 24 / 7

			dateStr = getDateStr(date)
			uuid = getUuid()
			data = log[dateStr]
			count = data ? sum(Object.values(data)) : 0

			setBlock(x, y, count, ctx)
		}
	}

	function getUuid() {
		uuid = localStorage.getItem('uuid')
		if (!uuid) {
			uuid = String(Math.random()).substring(2, 4)
			localStorage.setItem('uuid', uuid)
		}
		return uuid
	}

	function getHistoryDateStr(date = null) {
		date = new Date(date)
		month = String(date.getMonth() + 1)
		day = String(date.getDate())
		return month + "." + day
	}

	function getDateStr(date = null) {
		date = date ? date : new Date()
		year = String(date.getFullYear()).substring(2, 4)
		month = String(date.getMonth() + 1).padStart(2, '0')
		day = String(date.getDate()).padStart(2, '0')
		return year + month + day
	}

	function updateLocalLog(uuid, date) {
		log = localStorage.getItem('readlog')
		log = log ? JSON.parse(log) : {}
		if (!log[date]) log[date] = {}
		if (!log[date][uuid]) log[date][uuid] = 0
		log[date][uuid] += 1
		localStorage.setItem('readlog', JSON.stringify(log))
	}

	function updateGist() {
		gist_id = "cfa70a44bb181edbb2be19dacbcf6808"
		filename = "read_log.json"

		log = localStorage.getItem('readlog')
		log = log ? JSON.parse(log) : {}

		// pull
		gist_get_async(gist_id, filename).then((content) => {
			remoteLog = JSON.parse(content)
			for (let [date, data] of Object.entries(remoteLog)) {
				if (!log[date]) {
					log[date] = data;
					continue
				}
				for (let [uuid, count] of Object.entries(data)) {
					if (uuid != getUuid()) {
						log[date][uuid] = count
					}
				}
			}

			// push
			gist_set_async(gist_id, filename, JSON.stringify(log)).then((response) => { alert("update success") })
			localStorage.setItem('readlog', JSON.stringify(log))

			refreshHeatmap()
		})
	}

	//-------------------------------- statistics --------------------------------

	chapter_dom = document.querySelector("div.chapter-detail")
	if (!chapter_dom) chapter_dom = document.body
	heatmap_panel = document.createElement("div")
	chapter_dom.before(heatmap_panel)
	heatmap_panel.innerHTML = `<canvas id="heatmap" width="` + canvasWidth + `" height="` + canvasHeight + `"></canvas>`

	canvas = document.querySelector("canvas#heatmap")
	canvas.onclick = updateGist

	refreshHeatmap()

	//-------------------------------- wpm --------------------------------

	// function log(){
	// 	addLine()

	// 	uuid=getUuid()
	// 	date=getDateStr()
	// 	updateLocalLog(uuid, date)

	// 	lastGistUpdateDate=localStorage.getItem('lastGistUpdateDate')
	// 	if (!lastGistUpdateDate || lastGistUpdateDate!=date){
	// 		updateGist()
	// 		localStorage.setItem('lastGistUpdateDate', date)
	// 	}

	// 	refreshHeatmap()
	// }
	// document.log=log

	// setInterval(()=>{document.log()},1000*60)
	// refreshHeatmap()

	addStyle(`
		canvas#wpmCanvas {
			background-color: #333;
			position: fixed;
			bottom: 0px;
			right: 100px;
			width: 50px;
			height: 50px;
			opacity: 0.8;
			z-index: 3000;
		}
	`)
	// wpm_dom = document.createElement('div')
	// document.body.before(wpm_dom)
	// wpm_dom.innerHTML = `<canvas id="wpmCanvas" width="50px" height="50px"></canvas>`
	// let wpmQueue=[0]

	function drawWpmCanvas(){
		// console.log('draw')
		canvas = document.querySelector("canvas#wpmCanvas")
		ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// lines
		ctx.beginPath();
		ctx.moveTo(50,50-50*Math.min(wpmQueue[wpmQueue.length-1]/500, 1));
		for(let i=wpmQueue.length-1;i>=0;i--){
			y=50*Math.min(wpmQueue[i]/500,1);
			x=50-(wpmQueue.length-1-i)*5-5;
			ctx.lineTo(x, 50-y);
			// console.log(x, y)
		}
		ctx.strokeStyle = "white";
		ctx.stroke();

		// draw wpm number
		ctx.font = "16px Arial bold";
		ctx.fillStyle = "#9aa83a";
		ctx.fillText(wpmQueue[wpmQueue.length-1], 5, 21);

	}
	// drawWpmCanvas()

	// let wpmArea = document.createElement("div")
	// wpmArea.id="wpmArea"
	// wpmArea.classList.add("wpmArea")
	// wpmArea.style.top = "0px"
	// wpmArea.style.height = "0px"
	// document.body.before(wpmArea)
	let forceUpdateWpmArea=false;
	
	let lastStartTime=new Date().getTime()
	function updateWpmArea(){
		_lineStart=parseInt(wpmArea.style.top.replace("px",""))
		_lineEnd=_lineStart+parseInt(wpmArea.style.height.replace("px",""))

		lineEnd=document.documentElement["scrollTop"]+window.innerHeight*0.2
		lineStart=Math.min(_lineEnd, lineEnd)-1;

		// queue push
		if(new Date().getTime()-lastStartTime>1000*60 || forceUpdateWpmArea){
			forceUpdateWpmArea=false;
			lastStartTime=new Date().getTime()
			wpmArea.style.top=lineStart+"px"
			wpmQueue.push(wpmArea[wpmQueue.length-1])
		}
		wpmArea.style.height=(lineEnd-_lineStart)+"px"

		words_cnt=countWords(_lineStart, lineEnd)
		// console.log(_lineStart, lineEnd, words_cnt)
		wpmQueue[wpmQueue.length-1]=Math.round(words_cnt/((new Date().getTime()-lastStartTime)/1000/60))
		// drawWpmCanvas()
	}
	// let wpmInterval=setInterval(updateWpmArea, 1000)

	// document.querySelector('canvas#wpmCanvas').onclick = function(){
	// 	forceUpdateWpmArea=true;
	// 	updateWpmArea()
	// 	updateWpmArea()
	// }

	function countWords(lineStart, lineEnd){
		let items=document.querySelector('div.chapterContent')
		if(!items) return 0;
		items=items.querySelectorAll('p')
		let words_cnt=0;
		for(let item of items){
			let top=item.offsetTop;
			let text=item.innerText;
			let height=item.offsetHeight;
			let _words_cnt=text.split(" ").length;
			let end=top+height;

			if(lineStart > end || lineEnd < top) continue;

			if(lineStart<top && lineEnd>end){
				words_cnt+=_words_cnt;
				// console.log("1: "+text)
			}else if(lineStart<top && lineEnd>top){
				words_cnt+=_words_cnt*(lineEnd-top)/height;
				// console.log("2: "+text)
			}else if(lineStart<end && lineEnd>end){
				words_cnt+=_words_cnt*(end-lineStart)/height;
				// console.log("3: "+text)
			}else if(lineStart>top && lineEnd<end){
				words_cnt+=_words_cnt*(lineEnd-lineStart)/height;
				// console.log("4: "+text)
			}
		}
		return Math.round(words_cnt)
	}
	cnt=countWords(0, 100000)
	console.log(cnt)

	//-------------------------------- history --------------------------------

	chapter_dom = document.querySelector("div.chapter-detail")
	if (!chapter_dom) chapter_dom = document.body
	history_panel = document.createElement("div")
	chapter_dom.before(history_panel)
	history_panel.innerHTML = `<div>
	<table id="history_table">
	</table>
	<button id="history_prev" class="pagiBtn">\<</button>
	<button id="history_next" class="pagiBtn">\></button>
	<input id="history_input" type="text" value="1" size="3">
	<button id="history_go" class="pagiBtn">go</button>
</div>`

	history_data = localStorage.getItem('history_data')
	history_data = history_data ? JSON.parse(history_data) : {}
	history_data[location.href] = { date: new Date().getTime(), title: document.title.replace(" - Wikipedia", ''), url: location.href }
	localStorage.setItem('history_data', JSON.stringify(history_data))
	history_list = Object.values(history_data).sort((a, b) => { return b.date - a.date })

	function setHistoryTable(page) {
		page = page ? page : 1
		history_pageSize = 10
		history_table = document.querySelector("#history_table")
		history_table.innerHTML = ""

		start = (page - 1) * history_pageSize
		end = Math.min(start + history_pageSize, history_list.length)

		for (i = start; i < end; i++) {
			day = new Date(history_list[i].date).getDate()
			history_table.innerHTML += `<tr>
			<td class="historyDay`+ day + `">` + getHistoryDateStr(history_list[i].date) + `</td>
			<td><a href="`+ history_list[i].url + `">` + history_list[i].title + `</a></td>
		</tr>`
		}
	}
	setHistoryTable(1)

	document.querySelector('#history_prev').onclick = () => {
		history_page = document.querySelector('#history_input').value;
		setHistoryTable(--history_page);
		document.querySelector('#history_input').value = history_page
	}
	document.querySelector('#history_next').onclick = () => {
		history_page = document.querySelector('#history_input').value;
		setHistoryTable(++history_page);
		document.querySelector('#history_input').value = history_page
	}

	document.querySelector('#history_go').onclick = () => {
		history_page = document.querySelector('#history_input').value;
		setHistoryTable(history_page);
	}

})();