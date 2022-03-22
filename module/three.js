(function(){

class ThreeUtil{
	static getDateStr(date=null){
		date=date?date:new Date()
		let year=String(date.getFullYear()).substring(2,4)
		let month=String(date.getMonth()+1).padStart(2,'0')
		let day=String(date.getDate()).padStart(2,'0')
		return year+month+day
	}
}

window.ThreeUtil=ThreeUtil;















})();