(function () {
	blockWidth = 10
	blockPadding = 3
	// weeksCount=53
	weeksCount = 25 // 328, 94
	canvasWidth = (blockWidth + blockPadding) * weeksCount + blockPadding
	canvasHeight = (blockWidth + blockPadding) * 7 + blockPadding
	window.forceRefresh = false

	async function gist_get_async(gist_id, filename) {
		log = sessionStorage.getItem('readlog')
		if (!log || window.forceRefresh) {
			window.forceRefresh = false
			response = await axios.get("https://api.github.com/gists/" + gist_id)
			data = response.data
			content = data.files[filename].content
			sessionStorage.setItem('readlog', content)
			console.log(content)
			return content
		} else
			return log
	}

	function addScript(src) {
		var scripts_dom = document.createElement('script');
		scripts_dom.src = src;
		scripts_dom.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(scripts_dom);
	}
	addScript('https://unpkg.com/axios/dist/axios.min.js')

	function addStyle(html) {
		style = document.createElement("div")
		document.body.before(style)
		style.innerHTML = `<style>` + html + `</style>`
	}

	addStyle(`
	#heatmap{
		background-color: #0d1117;
		margin: 0 auto;
		display:block;
	}
`)

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
		max_count = 12 * 8
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

	function getDateStr(date = null) {
		date = date ? date : new Date()
		year = String(date.getFullYear()).substring(2, 4)
		month = String(date.getMonth() + 1).padStart(2, '0')
		day = String(date.getDate()).padStart(2, '0')
		return year + month + day
	}

	function refreshHeatmap() {
		gist_id = "cfa70a44bb181edbb2be19dacbcf6808"
		filename = "read_log.json"

		gist_get_async(gist_id, filename).then((content) => {
			log = JSON.parse(content)

			now = new Date();
			now1 = new Date(now - getRegularWeekday(now) * 3600 * 24 * 1000)

			canvas = document.querySelector('canvas#heatmap')
			ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// for(i=0;i<365;i++){
			for (i = 0; i < 175; i++) {
				date = new Date(now - i * 3600 * 24 * 1000)
				weekday = getRegularWeekday(date)
				y = weekday

				date1 = new Date(date - getRegularWeekday(date) * 3600 * 24 * 1000)
				x = weeksCount - (now1 - date1) / 1000 / 3600 / 24 / 7

				dateStr = getDateStr(date)
				data = log[dateStr]
				count = data ? sum(Object.values(data)) : 0

				setBlock(x, y, count, ctx)
			}
		})
	}
	wait_interval = setInterval(function () {
		if (!axios) return
		clearInterval(wait_interval)

		refreshHeatmap()
	}, 200)

	canvas = document.querySelector("canvas#heatmap")
	canvas.onclick = function () {
		window.forceRefresh = true
		refreshHeatmap()
		alert("refresh success")
	}
})();