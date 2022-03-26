(function(){

class _Api{
	static addScript(src){
		var scripts_dom = document.createElement('script');
		scripts_dom.src = src;
		scripts_dom.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(scripts_dom);
	}

	static getScrollPercent() {
		var h = document.documentElement,
			b = document.body,
			st = 'scrollTop',
			sh = 'scrollHeight';
		return ((h[st]||b[st]) / ((h[sh]||b[sh])) * 100).toFixed(2);
	}

	static getGistToken(){
		gist_token=localStorage.getItem('gist_token')
		if(!gist_token){
			gist_token=prompt('gist_token?')
			localStorage.setItem('gist_token',gist_token)
		}
		return gist_token
	}

	static async gist_get_async(gist_id, filename){
		response=await axios.get("https://api.github.com/gists/"+gist_id)
		data=response.data
		content=data.files[filename].content
		return content
	}

	static async gist_set_async(gist_id, filename, content){
		files={}
		files[filename]={"content":content}
		gist_token=getGistToken()
		return await axios.patch("https://api.github.com/gists/"+gist_id, {files:files}, {headers:{Authorization:"token "+gist_token}})
	}

	static addStyle(html){
		let style=document.createElement("div")
		document.body.before(style)
		style.innerHTML =`<style>`+html+`</style>`
	}

	static getUuid(){
		uuid=localStorage.getItem('uuid')
		if(!uuid){
			uuid=String(Math.random()).substring(2,4)
			localStorage.setItem('uuid', uuid)
		}
		return uuid
	}

	static getDateStr(date=null){
		date=date?date:new Date()
		year=String(date.getFullYear()).substring(2,4)
		month=String(date.getMonth()+1).padStart(2,'0')
		day=String(date.getDate()).padStart(2,'0')
		return year+month+day
	}
}

window.Api=_Api

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

	/*
	table {
		border-collapse: collapse;
		width: 100%;
	}

	th, td {
		text-align: left;
		padding: 8px;
	}

	tr:nth-child(even){background-color: #f2f2f2}

	th {
		background-color: #04AA6D;
		color: white;
	}
		
	textarea {
		padding: 10px;
		line-height: 1.5;
		border-radius: 5px;
		border: 1px solid #ccc;
		box-shadow: 1px 1px 1px #999;
	}
	*/
`)

// window.$ = selector => document.querySelector(selector);
// window.$$ = selector => document.querySelectorAll(selector);
// window.create = tag => document.createElement(tag);












})();