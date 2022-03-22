class API{
	addScript(src){
		var scripts_dom = document.createElement('script');
		scripts_dom.src = src;
		scripts_dom.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(scripts_dom);
	}

	getScrollPercent() {
		var h = document.documentElement,
			b = document.body,
			st = 'scrollTop',
			sh = 'scrollHeight';
		return ((h[st]||b[st]) / ((h[sh]||b[sh])) * 100).toFixed(2);
	}

	getGistToken(){
		gist_token=localStorage.getItem('gist_token')
		if(!gist_token){
			gist_token=prompt('gist_token?')
			localStorage.setItem('gist_token',gist_token)
		}
		return gist_token
	}

	async gist_get_async(gist_id, filename){
		response=await axios.get("https://api.github.com/gists/"+gist_id)
		data=response.data
		content=data.files[filename].content
		return content
	}

	async gist_set_async(gist_id, filename, content){
		files={}
		files[filename]={"content":content}
		gist_token=getGistToken()
		return await axios.patch("https://api.github.com/gists/"+gist_id, {files:files}, {headers:{Authorization:"token "+gist_token}})
	}

	addStyle(html){
		let style=document.createElement("div")
		document.body.before(style)
		style.innerHTML =`<style>`+html+`</style>`
	}

	getUuid(){
		uuid=localStorage.getItem('uuid')
		if(!uuid){
			uuid=String(Math.random()).substring(2,4)
			localStorage.setItem('uuid', uuid)
		}
		return uuid
	}

	getDateStr(date=null){
		date=date?date:new Date()
		year=String(date.getFullYear()).substring(2,4)
		month=String(date.getMonth()+1).padStart(2,'0')
		day=String(date.getDate()).padStart(2,'0')
		return year+month+day
	}

	$ = selector => document.querySelector(selector);
	$$ = selector => document.querySelectorAll(selector);
	create = tag => document.createElement(tag);
}
window.Api=new API()

// -------------------------------- main --------------------------------

Api.addScript('https://unpkg.com/axios/dist/axios.min.js')

Api.addStyle(`
	button.float_btn{
		font-weight: bold;
		color: #fff;
		background-color: #333;
		position: fixed;
		width: 50px;
		height: 50px;
		right: 50px;
		bottom: 50px;
		opacity: 0.8;
		z-index: 3000;
	}
	[hidden] { display: none !important; }
`)











