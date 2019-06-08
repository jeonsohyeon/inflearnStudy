module.exports = {
	html : function(title, list, body, control){
		return `${title}${list}${control}${body}`;
	},
	list : function(filelist){
		var list = '<ul>';
		var i = 0;
		while(i < filelist.length){
			list +=`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
			i++;
		}
		list +='</ul>';
		return list;
	}
}