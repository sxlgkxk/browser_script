(function () {
	async function gist_get_async(gist_id, filename) {
		response = await axios.get("https://api.github.com/gists/" + gist_id)
		data = response.data
		content = data.files[filename].content
		return content
	}

	async function gist_set_async(gist_id, filename, content) {
		files = {}
		files[filename] = { "content": content }
		gist_token = getGistToken()
		return await axios.patch("https://api.github.com/gists/" + gist_id, { files: files }, { headers: { Authorization: "token " + gist_token } })
	}

	function getGistToken() {
		gist_token = localStorage.getItem('gist_token')
		if (!gist_token) {
			gist_token = prompt('gist_token?')
			localStorage.setItem('gist_token', gist_token)
		}
		return gist_token
	}

	updateBtn = document.querySelector('#exerciseUpdateBtn')
	document.updateExerciseGist=function updateGist() {
		gist_id = "ef99f4c2c10980f092768c3d5c40a05d"
		filename = "exercise_log.json"

		log = localStorage.getItem('exlog')
		log = log ? JSON.parse(log) : {}

		nowStr = getDateStr()
		log[nowStr] = parseInt(document.querySelector('#ex_select').value)

		// pull
		gist_get_async(gist_id, filename).then((content) => {
			remoteLog = JSON.parse(content)
			for (let [date, count] of Object.entries(remoteLog)) {
				log[date] = log[date] ? Math.max(log[date], remoteLog[date]) : remoteLog[date]
				if (date == nowStr)
					document.querySelector('#ex_select').value = log[date]
			}

			// push
			gist_set_async(gist_id, filename, JSON.stringify(log)).then((response) => { alert("update success") })
			localStorage.setItem('exlog', JSON.stringify(log))
		})
	}
	updateBtn.onclick = document.updateExerciseGist


	document.querySelector('#ex_select').onchange = function (event) {
		log = localStorage.getItem('exlog')
		log = log ? JSON.parse(log) : {}
		nowStr = getDateStr()
		count = event.target.value
		log[nowStr] = count
		localStorage.setItem('exlog', JSON.stringify(log))

		lastGistUpdateDate=localStorage.getItem('lastExerciseGistUpdateDate')
		if (!lastGistUpdateDate || lastGistUpdateDate!=date){
			document.updateExerciseGist()
			localStorage.setItem('lastExerciseGistUpdateDate', nowStr)
		}
	}

	log = localStorage.getItem('exlog')
	log = log ? JSON.parse(log) : {}
	nowStr = getDateStr()
	count = log[nowStr] ? log[nowStr] : 0
	document.querySelector('#ex_select').value = count

	addStyle(`
		:root {
		--background-gradient: linear-gradient(30deg, #f39c12 30%, #f1c40f);
		--gray: #34495e;
		--darkgray: #2c3e50;
		}

		select {
		/* Reset Select */
		appearance: none;
		outline: 0;
		border: 0;
		box-shadow: none;
		/* Personalize */
		flex: 1;
		padding: 0 1em;
		color: #fff;
		background-color: var(--darkgray);
		background-image: none;
		cursor: pointer;
		}
		/* Remove IE arrow */
		select::-ms-expand {
		display: none;
		}
		/* Custom Select wrapper */
		.select {
		position: relative;
		display: flex;
		width: 20em;
		height: 3em;
		border-radius: .25em;
		overflow: hidden;
		}
		/* Arrow */
		.select::after {
		content: '\25BC';
		position: absolute;
		top: 0;
		right: 0;
		padding: 1em;
		background-color: #34495e;
		transition: .25s all ease;
		pointer-events: none;
		}
		/* Transition */
		.select:hover::after {
		color: #f39c12;
		}
	`)

})();