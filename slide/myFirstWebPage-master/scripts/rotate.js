function setCurrentCircles(cur_index)
{
	if(!document.getElementsByTagName) {concole.log("不支持");return;}
	var current_circles = document.getElementsByTagName("span");
	for(var i=0;i<current_circles.length;i++)   current_circles[i].className="";

	for (var i = 0; i < current_circles.length; i++) 
	{
		var cir_index = parseInt(current_circles[i].getAttribute("index"));  //一定要parse哟，否则得到的是字符串，不是数字
		if(cir_index==cur_index)                      //严格来说应该用 ===
			{
				current_circles[i].className = "current_circle";
				break;
			}
	};
}
	


function dealWithSlideShow()
{
	if(!document.getElementById) return;
	if(!document.getElementsByTagName) return;
	var container = document.getElementById("container");
	var image_lists =document.getElementById("images");
	var pre = document.getElementById("leftarrow");
	var next = document.getElementById("rightarrow");
	var dot_lists = document.getElementsByTagName("span");

	var index = 1;

	
	next.onclick = function()
	{
		index++;
		if (index==6) {index=1;}
		setCurrentCircles(index);
		moveImages("images",(-400)*(index-1),10);
		
		
	}
	pre.onclick = function()
	{
		index--;
		if(index==0) 
		{
			index=5;
		}
		setCurrentCircles(index);                  // 注意顺序
		var now_x = (-400)*(index-1);
		moveImages("images",now_x,10);
		
	}
	for (var i = 0; i < dot_lists.length; i++) 
	{
		dot_lists[i].onclick = function()
		{
			var dot_index = parseInt(this.getAttribute("index"));    //千万不能用dot_lists[i].getAttribute()要不然就嵌套了
			console.log(this.getAttribute("index"));
			moveImages("images",(-400)*(dot_index-1),10);      
			index = dot_index;
			setCurrentCircles(index);
		}
	};


}


addLoadEvent(dealWithSlideShow);
