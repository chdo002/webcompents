
焦点轮播图js组件使用说明
===============
开始调用组件，在html页面中写下如下代码：

	window.onload = function(){
		var _translate = {
			content:'slide',//滑动体（所有图片拼接起来的滑动体）
			prev:'prev',//前进按钮
			next:'next',//后退按钮
			img:'container'//外层相框（为了获取单张图片的宽度）
		}
		new Slide(_translate);/将本页面要用到的参数以json的形式穿送到组件中
	}

注意，上述的从页面中传入的**slide，prev，next，container**在页面中必须是类名

然后从页面写的页面中引入**slide.js**就可以了。

>js组件就是面向对象的写法。组件就像一个黑匣子，我们不需要知道其内部功能就可以像如上的那样去调用他。但是我们开发者是要开发组件的，所以不仅要会用，还要会开发组件。
