/**
 * 轮播图组件
 * @author cation
 * @email shoe11414255@qq.com
 */
;(function(name,definition){
	// 检测有模块加载器
	var hasDefine = typeof define === 'function';

	// 检测是否有普通模块加载-node
	var hasExports = typeof module !== 'undefined' && module.exports;

	// 封装模块
	if (hasDefine) {
		define(definition);
	} else if (hasExports) {
		module.exports = definition();
	} else {
		this[name] = definition();
	}
})('Silder', function(){
	
	/**
	 * @method isType()
	 * @description 判断类型
	 *
	 * @param {string} type 数据类型
	 *
	 * @return {boolean} 指定参数以否是指定类型
	 *
	 * @example
	 * ```js
	 *   var a = [];
	 *   isArray(a)  --> true 
	 *   isString(a) --> false
	 *
	 *   var b = document.createElement('div');
	 *   isWindow(b) --> false
	 *   isElement(b) --> true
	 */
	function isType(type) {
		return function(obj) {
			return Object.prototype.toString.call(obj) === "[object " + type + "]"
	  	}
	}
	var isObject = isType("Object");
	var isString = isType("String");
	var isArray = Array.isArray || isType("Array");
	var isFunction = isType("Function");
	var isWindow = function(obj) {
		return obj != null && obj == obj.window
	}
	var isDocument = function(obj) {
		return obj != null && obj.nodeType == obj.DOCUMENT_NODE
	}
	var isElement = function(obj){
		return obj != null && obj.nodeType == obj.ELEMENT_NODE
	}
	var likeArray = function (obj) {
    	return typeof obj.length == 'number'
 	}

 	/**
	 * @method function.bind()
	 * @description 对Function的this指针上下文延长
	 *
	 * @param {object、this} target 延长指定的上下文
	 * @param {Array} agrs 回调函数执行的参数传递
	 *
	 * @return {function} 函数函数执行，传递指定参数
	 * 
	 */
	Function.prototype.bind = Function.prototype.bind || function (target, agrs) {
		var self = this;

		return function (agrs){
			if (!(isArray(agrs))) {
				agrs = [agrs];
			}

			self.apply(target, agrs);
		}
	}

 	/**
 	 * @method _forEach()
 	 * @description 遍历元素，分别对于回调函数处理
 	 * 
 	 * @param {Array | element | object} elements 需要遍历处理的元素
 	 * @param {function} callback 回调处理函数
 	 *
 	 * @return {Array | element | object} 返回当前元素
 	 */
 	function _forEach(elements, callback) {
	    var i, key
	    if (likeArray(elements)) {
	     	for (i = 0; i < elements.length; i++) {
	     		if (callback.call(elements[i], i, elements[i]) === false) return elements	
	     	}
	    } else {
			for (key in elements) {
				if (callback.call(elements[key], key, elements[key]) === false) return elements	
			}
	    }

	    return elements
	}

	/**
	 * @method addEvent()
	 * @description 给指定Dom对象绑定事件
	 *
	 * @param {documentDom} el 需要绑定事件的DOM对象
	 * @param {string} type 绑定的事件类型
	 * @param {function} fn 事件执行的回调函数
	 * @param {boolean} capture 判断是否事件冒泡
	 */
	function addEvent(el, type, fn, capture) {
		capture = !!capture ? true : false;

		if (el.addEventListener){
            el.addEventListener(type, fn, capture);
        } else if (el.attachEvent){
            el.attachEvent("on" + type, fn);
        } else {
            el["on" + type] = fn;
        }
	}

	/**
	 * @method removeEvent()
	 * @description 给指定Dom对象解除事件
	 *
	 * @param {documentDom} el 需要解除事件的DOM对象
	 * @param {string} type 解除的事件类型
	 * @param {function} fn 事件执行的回调函数
	 * @param {boolean} capture 判断是否事件冒泡
	 */
	function removeEvent(el, type, fn, capture) {
		capture = !!capture ? true : false;

        if (el.removeEventListener){
            el.removeEventListener(type, fn, capture);
        } else if (el.detachEvent){
            el.detachEvent("on" + type, fn);
        } else {
            el["on" + type] = null;
        }
	}

	/**
	 * @method vendor()
	 * @description 判断浏览器的私有头部，并返回其值
	 *
	 * @param {string} style 样式属性
	 *
	 * @return {string} 返回特定属性在浏览器的私有头部
	 */
	// 判断浏览器内核类型 - 适配样式属性
	var elementStyle = document.createElement('div').style;
	function vendor(style) {
		var vendors = ['webkit', 'moz', 'ms', 'o', ''],
			tmp,
			i = 0,
			l = vendors.length;

		var style_C = style.charAt(0).toUpperCase() + style.substr(1)
		for ( ; i < l; i++ ) {
			tmp = vendors[i] + (vendors[i] ? style_C : style);
			if ( tmp in elementStyle ) {
				return vendors[i];
			}
		}
		return false;
	}

	/**
	 * @method prefixStyle()
	 * @description 样式属性补全
	 * 
	 * @param {strong} style 样式
	 *
	 * @return {string} 返回补全的样式
	 */
	function prefixStyle(style) {
		if ( vendor(style) === false ) return false;
		if ( vendor(style) === '' ) return style;
		return vendor(style) + style.charAt(0).toUpperCase() + style.substr(1);
	}
	/**
	 * @method  translateZ()
	 * @description 判断是否支持3D
	 */
	function translateZ(){
		if(prefixStyle('perspective')){
			return ' translateZ(0)';
		}else{
			return '';
		}
	}
	
	// 正常判断图片路径
	var isImgUrl = /(^data:.*?;base64)|(\.(jpg|png|gif)$)/;
	// 占坑图片--替换错误图片
	var isReplaceImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC';
	// 事件类型
	var eventType =  {
		touchstart : 1,
		touchmove : 1,
		touchend : 1,

		mousedown : 2,
		mousemove : 2,
		mouseup : 2,
		mouseout : 2,

		MSPointerDown : 3,
		MSPointerMove : 3,
		MSPointerUp : 3
	};
	// 过渡效果
	var easingType = 'cubic-bezier(0.1, 0.57, 0.1, 1)';

	/**
	 * @class Silder
	 * @description 轮播图切换组件类
	 *
	 * @param {string | array} imgs 图片地址值
	 * @param {string | isElement} wrapper 操作节点对象或者选择器
	 * @param {object} opts 类实例化传入属性
	 *
	 * @example
	 * ```js
	 *  var imgs = [
	 *		'IMG_2007.jpg',
	 *		'IMG_2008.jpg',
	 *		'IMG_2009',
	 *		'IMG_2010.jpg',
	 *		'IMG_2011.jpg',
	 *		'IMG_2012.jpg'
	 *	]
	 *	var _silder = new Silder(imgs, '.silder', {
	 *		'imgPrefix' : 'images/',
	 *		'moveInit' : true,
	 *		'arrowInit' : false,
	 *		'indicatorInit' : false
	 *	});
	 *
	 * ```js - opts
	 * -自定义轮播图属性 
	 *    imgPrefix 图片地址值前缀
	 * 
	 *    silderBoxClass 轮播图box类名
	 *    silderBoxImgClass 轮播图boxImg类名
	 *    silderBoxImgItemClass 轮播图boxImgItem类名
	 *    silderIndicatorClass 轮播图Indicator类名
	 *    silderIndicatorItemClass 轮播图IndicatorItem类名
	 *    silderArrowLeftClass 轮播图arrowLeft类名
	 *    silderArrowRightClass 轮播图arrowRight类名
	 *
	 * 	  silderBoxStyle 轮播图box样式
	 *    silderBoxImgStyle 轮播图boxImg样式
	 *    silderBoxImgItemStyle 轮播图boxImgItem样式
	 *    silderIndicatorStyle 轮播图Indicator样式
	 *    silderIndicatorItemStyle 轮播图IndicatorItem样式
	 *    silderArrowStyle 轮播图arrow样式
	 *    silderArrowLeftStyle 轮播图arrowLeft样式
	 *    silderArrowRightStyle 轮播图arrowRight样式
	 * 
	 *    indicatorBgInit 轮播图指标默认背景色
	 *	  indicatorBgAction 轮播图指标激活背景色
	 *	  
	 *	  arrowLeftImg 左按钮图片地址值
	 *	  arrowRightImg 右按钮图片地址值
	 *	  
	 * -自定义元素切换开启
	 *    moveInit 是否开启默认移动操作
	 *    indicatorInit 是否生成指标按钮
	 *    arrowInit 是否生成按钮图片
	 *    
	 * -自定义事件
	 *    silderCreate 轮播图生成观察著
	 *    silderEventCreate 轮播图moveInit事件绑定观察者
	 *    silderEventDestory 轮播图moveInit事件注销观察者
	 *    silderStart 轮播图move开始观察者
	 *    silderMove 轮播图move移动观察者
	 *    silderEnd 轮播图move结束观察者
	 *    silderNext 轮播图move下一个观察者
	 *    silderPrev 轮播图move上一个观察者
	 *    silderTranslfate 轮播图图片移动观察者
	 *    silderTransitionEnd 轮播图图片移动过渡结束观察者
	 * -自定义事件集合 events = [
	 * 					'silderCreate' : fn,
	 * 					.....
	 * 				]
	 * ....
	 */
	function Silder(imgs, wrapper, opts){
		var argsLen = arguments.length;

		// Silder(imgs) --- 第一个参数必须是imgs
		if ( !isString(imgs) && !isArray(imgs) ) {
			throw new Error('传入的imgs参数，必须是地址值序列化或者是数组，建议是数组！！')	
		}

		// 传入2个参数
		if (argsLen === 2) {
			if ( isElement(type) || isString(type) ) {
				// Silder(imgs, wrapper)
				wrapper = type;
			} else if ( !isElement(type) && isObject(type) ) {
				// Silder(imgs, opts)
				opts = wrapper;
				wrapper = undefined;
			}
		}

		// 图片集合
		if ( isString(imgs) ) {
			this.images = imgs.split(',');
		} else if ( isArray(imgs) ) {
			this.images = imgs;
		}
		this.imagesLen = this.images.length;

		// 操作对象设置
    	if ( typeof wrapper == 'undefined' ) {
			this.wrapper = window.document.body;
		} else {
			this.wrapper = isString(wrapper) ? document.querySelector(wrapper) : wrapper;
		}

		if (!isElement(this.wrapper)) {
			throw new Error('传入的wrapper-Element元素不准确，请确认上传！')
		}

		// 默认控制元素
		this.silderBox = null;
		this.silderBoxImg = null;
		this.silderIndicator = null;
		this.silderArrowLeft = null;
		this.silderArrowLeft = null;

		// 默认控制-样式
		this.silderBoxClass = 'silder-box';
		this.silderBoxImgClass = 'silder-img';
		this.silderBoxImgItemClass = 'silder-img-item';
		this.silderIndicatorClass = 'silder-indicator';
		this.silderIndicatorItemClass = 'silder-indicator-item';
		this.silderArrowLeftClass = 'silder-arrow';
		this.silderArrowRightClass = 'silder-indicator';

		this.indicatorBgInit = '#ff0000';
		this.indicatorBgAction = '#266dc5';

		// 默认控制-属性
		this.events = {}; 
		this.silderIndex = 0;

		this.translateThreshold = 100;
		this.transitionTime = 400;
		this.transitionProperty = 'left, ' + '-' + vendor('transform') + '-transform';
		
		this.moveX = true;
		this.moveY = false;
		this.useTransform = prefixStyle('transform') !== false;

		this.moveInit = true;		
		this.indicatorInit = true;
		this.arrowInit = true;

		this.hasPointer = window.navigator.msPointerEnabled ? true : false; // 是否支持IE10的touch
		this.hasTouch = ("ontouchstart" in window) ? true : false; // 是否支持touch事件

		// 传递参数
        for (i in opts) {
            this[i] = opts[i];
        }

        // 只允许一个方向移动
        if (this.moveX) {
        	this.moveY = false;
        } else {
        	this.moveY = true;
        }

		this.init();
	}

	Silder.prototype = {
		/**
		 * @method init()
		 * @description 初始化组件
		 */
		init : function(){
			// 组件元素生成
			this.silderCreate();

			// 组件事件初始化
			this.initEvents(false);
		},

		/**
		 * @method silderCreate()
		 * @description 组件元素生成
		 *
		 * @silderCreate 触发组件生成观察者
		 */
		silderCreate: function(){
			// DOM生成
			this.imgCreate();
			this.indicatorCreate();
			this.arrowCreate();

			// 添加样式
			this.silderStyle();
			this.imgStyle();
			this.indicatorStyle();
			this.arrowStyle();

			// 组件生成观察者
			this.emit('silderCreate');
		},

		/**
		 * @mehod imgCreate()
		 * @description 生成轮播图的图片元素
		 */
		imgCreate : function(){
			var i = 0, 
				len = this.imagesLen,
				box = document.createElement('div'),
				boxImg = document.createElement('ul'),
				wrapper = this.wrapper;
			box.className = this.silderBoxClass;
			boxImg.className = this.silderBoxImgClass;

			// 生成图片，地址值错误的，替换代替图片地址值
			for (;i < len; i++) {
				var imgItem = document.createElement('li');
					imgItem.className = this.silderBoxImgItemClass;
				var img = document.createElement('img');

				if (isImgUrl.test(this.images[i])) {
					img.src = this.imgPrefix ? this.imgPrefix + this.images[i] : this.images[i];
				} else {
					img.src = isReplaceImg;
					console.log('第' + (i + 1) + '图片地址值有问题');
				}

				imgItem.appendChild(img);
				boxImg.appendChild(imgItem);
			}

			// 判断图片是否大于1，并且在前后添加图片，可以循环播放
			if (len > 1) {
				var imgItemFisrt = boxImg.firstChild.cloneNode(true);
				var imgItemLast = boxImg.lastChild.cloneNode(true);

				boxImg.insertBefore(imgItemLast, boxImg.firstChild);
				boxImg.appendChild(imgItemFisrt);

				this.imagesLen += 2;
				this.silderIndex <= 1 && ( this.silderIndex = 1 );
			}

			// 将DOM保存到对象中，并生成DOM树
			box && ( box.appendChild(boxImg), this.silderBoxImg = boxImg );
			box && ( wrapper.appendChild(box), this.silderBox = box );
		},

		/**
		 * @mehod indicatorCreate()
		 * @description 生成轮播图的指标元素
		 */
		indicatorCreate : function(){
			if (!this.indicatorInit) {
				return
			}

			var i = 0, 
				len = this.imagesLen,
				indicator,
				wrapper = this.wrapper;

			// 在图片数目大于2时，指标数目比图片数目少2个
			if (len > 2) {
				len -= 2;
			}

			// 生成指标DOM
			indicator = document.createElement('div');
			indicator.className = this.silderIndicatorClass;

			for (;i < len; i++) {
				var indicatorItem = document.createElement('span');
					indicatorItem.className = this.silderIndicatorItemClass;
					indicator.appendChild(indicatorItem);
			}

			// 将DOM保存到对象中，并生成DOM树
			indicator && ( wrapper.appendChild(indicator), this.silderIndicator = indicator );
		},

		/**
		 * @mehod arrowCreate()
		 * @description 生成轮播图的按钮元素
		 */
		arrowCreate : function(){
			if (!this.arrowInit) {
				return
			}

			var	arrowLeft,
				arrowRight,
				wrapper = this.wrapper;

			// 判断是否传入按钮图片地址值，替换默认图片值
			if (!this.arrowLeftImg) {
				this.arrowLeftImg = 'arrow_left.png';
			}

			if (!this.arrowRightImg) {
				this.arrowRightImg = 'arrow_right.png';
			}

			// 生成按钮DOM
			arrowLeft = document.createElement('div');
			arrowRight = document.createElement('div');
			arrowLeft.className = this.silderArrowLeftClass;
			arrowRight.className = this.silderArrowRightClass;

			var imgLeft = document.createElement('img');
			var imgRight = document.createElement('img');
			imgLeft.src = this.arrowLeftImg;
			imgRight.src = this.arrowRightImg;

			arrowLeft.appendChild(imgLeft);
			arrowRight.appendChild(imgRight);

			// 将DOM保存到对象中，并生成DOM树
			arrowLeft && ( wrapper.appendChild(arrowLeft), this.silderArrowLeft = arrowLeft );
			arrowRight && ( wrapper.appendChild(arrowRight), this.silderArrowRight = arrowRight );
		},

		/**
		 * @mehod silderStyle()
		 * @description 轮播图组件默认相关样式、属性设置
		 */
		silderStyle : function(){
			var that = this;
			var boxImg = this.silderBoxImg,
				wrapper = this.wrapper;

			// 设置轮播图的宽度
			if ( !this.silderWidth ) {
				this.silderWidth = wrapper.clientWidth ? wrapper.clientWidth : window.innerWidth;
			}

			// 设置轮播图的高度
			if ( !this.silderHeight ) {
				this.silderHeight = wrapper.clientHeight ?  wrapper.clientHeight : window.innerHeight;
			}

			// 设置轮播图的开始位置
			var translateX, translateY;
			if ( this.moveX ) {
				translateX = - (this.silderIndex * this.silderWidth);
				translateY = 0;
			} else {
				translateX = 0;
				translateY = - (this.silderIndex * this.silderWidth);
			}
			this.startX = this.x = translateX;
			this.startY = this.y = translateY;

			// 设置过渡属性值
			this._transitionProperty( this.transitionProperty );
		},

		/**
		 * @mehod imgStyle()
		 * @description 轮播图图片样式设置
		 */
		imgStyle : function(){
			var that = this;
			var box = this.silderBox,
				boxImg = this.silderBoxImg,
				imgItem,
				wrapper = this.wrapper,
				len = this.imagesLen;

			// 如果wrapper的position没有设置，并设置为relative，overflow:hidden
			if (wrapper.style.position != 'absolute') {
				wrapper.style.position = 'relative';
			}
			wrapper.style.overflow = 'hidden';

			// 设置轮播图图片相关元素样式
			box.style.cssText = 'overflow:hidden;margin:0;padding:0;';
			box.style.width = this.silderWidth;
			box.style.height = this.silderHeight;
			
			boxImg && ( imgItem = boxImg.querySelectorAll('.' + this.silderBoxImgItemClass) );
			boxImg.style.cssText = 'overflow:hidden;margin:0;padding:0;list-style-type:none;';
			if ( this.moveX ) {
				boxImg.style.width = this.silderWidth * len;
			}
			if ( this.moveY ) {
				boxImg.style.height = this.silderHeight * len;
			}

			_forEach(imgItem, function(i, item){
				item.style.cssText = 'float:left;';
				item.style.width = that.silderWidth;
				item.style.height = that.silderHeight;

				var _img = item.getElementsByTagName('img')[0];
				_img.style.width = '100%';
				_img.style.height = '100%';

				// 自定时imgItem样式
				for (i in this.silderBoxImgItemStyle) {
					item.style[prefixStyle(i)] = this.silderBoxImgItemStyle[i];
				}

				// 自定时img样式
				for (i in this.silderBoxImgItemImgStyle) {
					_img.style[prefixStyle(i)] = this.silderBoxImgItemImgStyle[i];
				}
			})

			// 自定义box样式
			for (i in this.silderBoxStyle) {
				box.style[prefixStyle(i)] = this.silderBoxStyle[i];
			}

			// 自定义boxImg样式
			for (i in this.silderBoxImgStyle) {
				boxImg.style[prefixStyle(i)] = this.silderBoxImgStyle[i];
			}

			// 设置图片开始显示哪一个
			boxImg.style[prefixStyle('transform')] = 'translate('+ this.x +'px, '+ this.y +'px)' + translateZ();
		},

		/**
		 * @mehod indicatorStyle()
		 * @description 轮播图指标样式设置
		 */
		indicatorStyle : function(){
			if (!this.indicatorInit) {
				return
			}

			var indicator = this.silderIndicator,
				indicatorItem = indicator.querySelectorAll('.' + this.silderIndicatorItemClass),
				indicatorBgInit = this.indicatorBgInit;

			// 设置指标相关元素样式
			indicator.style.cssText = 'position:absolute;left:0;bottom:5%;width:100%;height:20px;text-align:center;';		
			_forEach(indicatorItem, function(i, item){
				item.style.cssText = 'display:inline-block;width:20px;height:20px;margin-left:10px;border-radius:50%;background-color:'+ indicatorBgInit +';';
				if (i == 0) {
					item.style.marginLeft = 0;
				}

				// 自定义指标按钮样式
				for (i in this.silderIndicatorItemStyle) {
					item.style[prefixStyle(i)] = this.silderIndicatorItemStyle[i];
				}
			})

			// 设置开始指标哪一个激活
			indicatorItem[this.silderIndex - 1].style.backgroundColor = this.indicatorBgAction;

			// 自定义指标样式
			for (i in this.silderIndicatorStyle) {
				indicator.style[prefixStyle(i)] = this.silderIndicatorStyle[i];
			}
		},

		/**
		 * @mehod arrowStyle()
		 * @description 轮播图按钮样式设置
		 */
		arrowStyle : function(){
			if (!this.arrowInit) {
				return
			}

			var arrowLeft = this.silderArrowLeft,
				arrowRight = this.silderArrowRight;

			// 设置按钮相关元素样式
			var cssText = 'position:absolute;top:50%;z-index:9;width:60px;heigt:60px;cursor:pointer;'
			arrowLeft.style.cssText = cssText;
			arrowRight.style.cssText = cssText;
			arrowLeft.style.left = 0;
			arrowRight.style.right = 0;

			addEvent(arrowLeft, 'click', this._prev.bind(this), false);
			addEvent(arrowRight, 'click', this._next.bind(this), false);

			// 自定义按钮样式
			for (i in this.silderArrowStyle) {
				arrowLeft.style[prefixStyle(i)] = this.silderArrowStyle[i];
				arrowRight.style[prefixStyle(i)] = this.silderArrowStyle[i];
			}

			// 自定义左按钮样式
			for (i in this.silderArrowLeftStyle) {
				arrowLeft.style[prefixStyle(i)] = this.silderArrowLeftStyle[i];
			}

			// 自定义右按钮样式
			for (i in this.silderArrowRightStyle) {
				arrowRight.style[prefixStyle(i)] = this.silderArrowRightStyle[i];
			}
		},	

		/**
    	 * @method initEvents()
    	 * @description 初始化事件
    	 * 
    	 * @param  {booleam} remove 选择事件绑定还是解除
    	 *
    	 * @silderEventCreate 触发事件绑定观察者
    	 * @silderEventDestory 触发事件注销观察者
    	 */
		initEvents: function (remove) {
			var eventType = remove ? removeEvent : addEvent;
			var target = this.distDom ? this.distDom : this.wrapper;

			// pc-mouse
			if ( (!this.hasPointer && !this.hasTouch) && this.moveInit ) {
				eventType(target, 'mousedown', this);
				eventType(target, 'mousemove', this);
				eventType(target, 'mousecancel', this);
				eventType(target, 'mouseup', this);
				eventType(target, 'mouseout', this);
			}

			// mobile-ie
			if ( this.hasPointer && this.moveInit ) {
				eventType(target, 'MSPointerDown', this);
				eventType(target, 'MSPointerMove', this);
				eventType(target, 'MSPointerCancel', this);
				eventType(target, 'MSPointerUp', this);
				eventType(target, 'MSPointerOut', this);
			}

			// mobile-webkit
			if ( this.hasTouch && this.moveInit ) {
				eventType(target, 'touchstart', this);
				eventType(target, 'touchmove', this);
				eventType(target, 'touchcancel', this);
				eventType(target, 'touchend', this);
			}

			// 过渡效果结束事件
			eventType(this.silderBoxImg, 'transitionend', this);
			eventType(this.silderBoxImg, 'oTransitionEnd', this);
			eventType(this.silderBoxImg, 'MSTransitionEnd', this);
			eventType(this.silderBoxImg, 'webkitTransitionEnd', this);

			if (!remove) {
				// silderCreate
	       		this.emit('silderEventCreate');
			} else {
				// silderDestory
	       		this.emit('silderEventDestory');
			}
		},

		/**
		 * @method _destory()
		 * @description 注销轮播图move事件
		 */
		_destory : function(){
			this.initEvents(true);
		},

		/**
		 * @method this.handleEvent(e)
		 * @description 事件绑定，默认回调this->handleEvent
		 *
		 * @param {event} e event对象
		 */
		handleEvent: function (e) {
			switch ( e.type ) {
				case 'touchstart':
				case 'MSPointerDown':
				case 'mousedown':
					this._start(e);
					break;
				case 'touchmove':
				case 'MSPointerMove':
				case 'mousemove':
					this._move(e);
					break;
				case 'touchend':
				case 'MSPointerUp':
				case 'MSPointerOut':
				case 'mouseup':
				case 'mouseout':
				case 'touchcancel':
				case 'MSPointerCancel':
				case 'mousecancel':
					this._end(e);
					break;
				case 'transitionend':
				case 'webkitTransitionEnd':
				case 'oTransitionEnd':
				case 'MSTransitionEnd':
					this._transitionEnd(e);
			}
		},

		/**
         * @method emit()
         * @description 观察者事件触发类型
         *
         * @param {string} type 事件类型
         */
        emit : function (type) {
            if ( !this.events[type] ) {
                return;
            }

            var i = 0,
                l = this.events[type].length;

            if ( !l ) {
                return;
            }

            for ( ; i < l; i++ ) {
                this.events[type][i].apply(this, [].slice.call(arguments, 1)); 
            }
        },

        /**
         * @method on()
         * @description 对应观察者事件订阅回调函数
         *
         * @param {string} type 事件类型
         * @param {function} fn 订阅回调函数
         */
        on : function (type, fn) {
            if ( !this.events[type] ) {
                this.events[type] = [];
            }

            this.events[type].push(fn);
        },

        /**
         * @method _start()
         * @description 轮播图move开始处理函数
         *
         * @silderStart 触发move开始观察者
         */
		_start : function(e){
			// 判断操作的是图片元素，禁止图片有拖拽效果
			if (e.target.tagName == 'IMG') {
				e.preventDefault();
			}

			// 禁止PC上右键的操作
			if ( eventType[e.type] != 1 ) {
				if ( e.button !== 0 ) {
					return
				}
			}

			// 判断操作的事件类型，保持操作一致
			if ( this.initiated && eventType[e.type] !== this.initiated ) {
				return
			}

			// 判断图片切换是否处于过渡中
			if (this.moved) {
				return
			}

			// 停止运动，确保位置x,y正确
			this._transitionTime();

			this.initiated = eventType[e.type];
			this.moved = false;

			// 位置值操作
			var point = e.touches ? e.touches[0] : e;
			this.pointX = point.pageX;
			this.pointY = point.pageY;
			this.startX = this.x;
			this.startY = this.y;

			if (!this.moveX) {
				this.pointX = 0;
			}

			if (!this.moveY) {
				this.pointY = 0;
			}

			// move开始观察者
			this.emit('silderStart');
		},

		/**
         * @method _move()
         * @description 轮播图move移动处理函数
         *
         * @silderMove 触发move移动观察者
         */
		_move : function(e){
			// 判断操作的事件类型，保持操作一致
			if ( eventType[e.type] !== this.initiated ) {
				return
			}

			e.preventDefault();

			// 位置值操作
			var point = e.touches ? e.touches[0] : e,
				deltaX = point.pageX - this.pointX,
				deltaY = point.pageY - this.pointY,
				newX, newY;

			if (!this.moveX) {
				deltaX = 0;
			}

			if (!this.moveY) {
				deltaY = 0;
			}

			this.pointX = point.pageX;
			this.pointY = point.pageY;

			newX = this.x + deltaX;
			newY = this.y + deltaY;

			// 图片移动
			this._translate(newX, newY);

			// move移动观察者
			this.emit('silderMove');
		},

		/**
         * @method _end()
         * @description 轮播图move移动结束处理函数
         *
         * @silderEnd 触发move结束观察者
         */
		_end : function(e){
			// 判断操作的事件类型，保持操作一致
			if ( eventType[e.type] !== this.initiated ) {
				return;
			}

			this.isInTransition = 0;
			this.initiated = 0;

			// 判断是否有move，没有判断为点击 --> 按钮的点击
			if ( Math.abs(this.x - this.startX) > 10 || Math.abs(this.y - this.startY) ) {
				this.moved = true;
			} else {
				this.moved = false;
				return
			}

			// 停止运动，确保位置x,y正确
			var	newX = Math.round(this.x),
				newY = Math.round(this.y);
			this._transitionTo(newX, newY);	

			// 判断图片切换方向
			this._posMove();

			// move结束观察者
			this.emit('silderEnd');
		},

		/**
		 * @method _posMove()
		 * @description 初始图片切换成功的方向，并且设置轮播图的位置x,y
		 */
		_posMove : function(){
			var delX = this.x - this.startX;
			var delY = this.y - this.startY;

			if ( this.moveX ) {
				if ( delX > 0 && Math.abs(delX) >= this.translateThreshold ) {
					this.x = this.startX + this.silderWidth;
				} else if ( delX < 0 && Math.abs(delX) >= this.translateThreshold ) {
					this.x = this.startX - this.silderWidth;
				} else {
					this.x = this.startX;
				}
			}

			if ( this.moveY ) {
				if ( delY > 0 && Math.abs(delY) >= this.translateThreshold ) {
					this.y = this.startY + this.silderHeight;
				} else if ( delY < 0 && Math.abs(delY) >= this.translateThreshold ) {
					this.y = this.startY - this.silderHeight;
				} else {
					this.y = this.startY;
				}
			}

			// 图片切换，有过渡效果
			this._transitionTo(this.x, this.y, this.transitionTime, easingType);
		},

		/**
		 * @method _next()
		 * @description 初始图片切换下一个
		 */
		_next : function(e){
			e.stopPropagation();

			if (this.moved) {
				return
			}

			if ( this.moveX ) {
				this.x = this.x - this.silderWidth;
			}

			if ( this.moveY ) {
				this.y = this.y - this.silderWidth;
			}

			// 图片切换，有过渡效果
			this._transitionTo(this.x, this.y, this.transitionTime, easingType);

			// 图片切换下一个观察者
			this.emit('silderNext');
		},

		/**
		 * @method _next()
		 * @description 初始图片切换上一个
		 */
		_prev : function(e){
			e.stopPropagation();

			if (this.moved) {
				return
			}

			if ( this.moveX ) {
				this.x = this.x + this.silderWidth;
			}

			if ( this.moveY ) {
				this.y = this.y + this.silderWidth;
			}

			this._transitionTo(this.x, this.y, this.transitionTime, easingType);

			// 图片切换上一个观察者
			this.emit('silderPrev');
		},	

		/**
		 * @method _transitionTo()
		 * @description 图片切换处理函数
		 *
		 * @param {number} x 轮播图x位置值
		 * @param {number} y 轮播图y位置值
		 * @param {number} time 切换过渡时间
		 * @param {string} easing 过渡效果设置，css3的设置形式
		 */
		_transitionTo : function (x, y, time, easing) {
			easing = easing || easingType;

			this.isInTransition = time > 0;

			this._transitionTimingFunction(easing);
			this._transitionTime(time);
			this._translate(x, y);
		},

		/**
		 * @method _transitionProperty()
		 * @description 切换过渡属性设置
		 *
		 * @param {string} property 过渡效果属性值
		 */
		_transitionProperty : function(property){
			property = property || 'all';

			this.silderBoxImg.style[prefixStyle('transitionProperty')] = property;
		},	

		/**
		 * @method _transitionTime()
		 * @description 切换过渡时间设置
		 *
		 * @param {number} time 过渡时间值
		 */
		_transitionTime : function (time) {
			time = time || 0;
			this.silderBoxImg.style[prefixStyle('transitionDuration')] = time + 'ms';
		},

		/**
		 * @method _transitionTimingFunction()
		 * @description 切换过渡效果设置
		 *
		 * @param {String} easing css3形式的过渡效果值
		 */
		_transitionTimingFunction : function (easing) {
			this.silderBoxImg.style[prefixStyle('transitionTimingFunction')] = easing;
		},

		/**
		 * @method _translate()
		 * @description 切换移动位置值设置
		 *
		 * @param {number} x 轮播图x位置值
		 * @param {number} y 轮播图y位置值
		 *
		 * @silderTranslate 触发切换移动观察者
		 */
		_translate : function (x, y) {
			//	是否开启位置旋转-硬件加速效果
			if ( this.useTransform ) {
				this.silderBoxImg.style[prefixStyle('transform')] = 'translate(' + x + 'px,' + y + 'px)' + translateZ();
			} else {
				x = Math.round(x);
				y = Math.round(y);
				this.silderBoxImg.style.left = x + 'px';
				this.silderBoxImg.style.top = y + 'px';
			}
			this.x = x;
			this.y = y;

			// 图片移动观察者
			this.emit('silderTranslate');
		},

		/**
		 * @method _transitionEnd()
		 * @description 切换过渡结束处理函数
		 *
		 * @silderTransitionEnd 触发切换过渡结束观察者
		 */
		_transitionEnd: function (event) {
			var e = event ? event : window.event;
			if ( e.target != this.silderBoxImg || !this.isInTransition ) {
				return;
			}

			// 停止运动
			this._transitionTime();
			this.moved = false;

			// 并将isInTransition设为false
			// 执行停止回调函数
			this.isInTransition = 0;

			// 替换位置
			this._posReplace();

			// 指标更换
			this.indicatorReplace();

			// 图片移动过渡结束观察者
			this.emit('silderTransitionEnd');
		},

		/**
		 * @method _posReplace()
		 * @description 切换结束轮播图位置和位置值的设置
		 */
		_posReplace : function(){
			var delX = this.x - this.startX;
			var delY = this.y - this.startY;
			var len = this.imagesLen;

			// 判断方向，设置轮播图位置值-index
			if (this.moveX) {
				if (delX > 0) {
					this.silderIndex -= 1;
				} else if (delX < 0) {
					this.silderIndex += 1;
				}
			}

			if (this.moveY) {
				if (delY > 0) {
					this.silderIndex -= 1;
				} else if (delY < 0) {
					this.silderIndex += 1;
				}
			}

			// 判断边界值，替换轮播图的位置 -index
			if ( this.silderIndex == len - 1 ) {
				this.silderIndex = 1;
			}

			if ( this.silderIndex == 0 ) {
				this.silderIndex = len - 2;
			}

			this.isInTransition = 0;
			this.initiated = 0;
			
			// 根据轮播图的位置-index,设置轮播图的位置值
			var newX, newY;
			if (this.moveX) {
				newX = - (this.silderIndex * this.silderWidth),
				newY = 0;
			} else {
				newY = - (this.silderIndex * this.silderWidth),
				newX = 0;
			}
			
			this._transitionTo(newX, newY);

			// 若没有移动切换 --> 按钮的点击切换，start位置值赋值
			if (!this.moveInit) {
				this.startY = this.y;
				this.startX = this.x;
			}
		},

		/**
		 * @method indicatorReplace()
		 * @description 切换结束轮播图指标设置
		 */
		indicatorReplace : function(){
			if (!this.indicatorInit) {
				return
			}

			var indicator = this.silderIndicator,
				indicatorItem = indicator.querySelectorAll('.silder-indicator-item')
				indicatorBgInit = this.indicatorBgInit;

			// 将所有指标恢复默认背景色
			_forEach(indicatorItem, function(i, item){
				item.style.backgroundColor = indicatorBgInit;
			})

			// 激活当前位置的指标
			indicatorItem[this.silderIndex - 1].style.backgroundColor = this.indicatorBgAction;
		}
	}

	return Silder;
})

