function addLoadEvent(func) 
{
	var oldEvent = window.onload;
	if(typeof window.onload!='function')
	{
		window.onload = func;
	}
	else
	{
		window.onload = function(){
			oldEvent();
			func();
		}
		
	}
}

function moveImages(element_id,final_x,interval)
{
	var elem =document.getElementById(element_id);
	console.log(elem);
	if(elem.movement) clearTimeout(elem.movement);

	if (!elem.style.left) {elem.style.left="200px";};
	var xpos = parseInt(elem.style.left);
	if(xpos == final_x) return true;
	if(xpos<final_x) 
		{
			distance = Math.ceil((final_x-xpos)/10);
			elem.style.left = xpos+distance+"px";
		}
	else 
		{
			distance = Math.ceil((xpos-final_x)/10);
			elem.style.left = xpos-distance+"px";
		}
	var repeat = "moveImages('"+element_id+"',"+final_x+","+interval+")";          //为什么这边书上197页有单引号
	elem.movement = setTimeout(repeat,interval);

}