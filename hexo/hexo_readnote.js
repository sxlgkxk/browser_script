(function () {
	async function gist_get_async(gist_id, filename) {
		content = sessionStorage.getItem(gist_id + filename)
		if (!content || window.forceRefresh) {
			window.forceRefresh = false
			response = await axios.get("https://api.github.com/gists/" + gist_id)
			data = response.data
			content = data.files[filename].content
			sessionStorage.setItem(gist_id + filename, content)
			return content
		} else
			return content
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
		table#readnotes button{
			margin-left: 5px;
			padding-left: 5px;
			padding-right: 5px;
			padding-top: 2px;
			padding-bottom: 2px;
		}
	`)

	function getDateStr(date = 0) {
		date = new Date(date)
		year = String(date.getFullYear()).substring(2, 4)
		month = String(date.getMonth() + 1).padStart(2, '0')
		day = String(date.getDate()).padStart(2, '0')
		return year + month + day
	}
	function getReadableDateStr(date = 0) {
		date = new Date(date)
		year = String(date.getFullYear()).substring(2, 4)
		month = String(date.getMonth() + 1)
		day = String(date.getDate())
		return year + `.` + month + `.` + day
	}

	function refreshNotes() {
		gist_id = "cc15e8e69ba32a44b11e7855689c6fae"
		filename = "booksnote.json"

		gist_get_async(gist_id, filename).then((content) => {
			table_dom = document.querySelector('#hexo_readnote_table')
			content = JSON.parse(content)
			html = `
			<table id="readnotes">
				<thead>
					<tr>
						<th>
							book
							<button>+</button>
						</th>
						<th>note</th>
						<th>created</th>
					</tr>
				</thead>
				<tbody>
			`
			for (note of content) {
				tr = `<tr>`
				tr += `	<td>
							<a href="` + note.url + `">` + note.title + `</a>
							<button>+</button>
						</td>`
				tr += `	<td>` 
							+ note.note 
							+`<button>+</button>`
					+ `</td>`
				tr += `	<td>` 
							+ getReadableDateStr(note.created) 
							+`<button>+</button>`
					+ `</td>`
				tr += `</tr>`
				html += tr
			}
			html += `
				</tbody>
			</table>
			`
			table_dom.innerHTML = html
		})
	}
	wait_interval = setInterval(function () {
		if (!axios) return
		clearInterval(wait_interval)

		refreshNotes()
	}, 200)
})();