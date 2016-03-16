/**
 * Created by 陈奇 on 2014/11/29.
 */
var slide = null;
var prev = null;
var next = null;
function Slide(p){
    var self = this;
    this.slide = document.getElementsByClassName(p.content)[0];
    this.prev = document.getElementsByClassName(p.prev)[0];
    this.next = document.getElementsByClassName(p.next)[0];
    this.img = document.getElementsByClassName(p.img)[0].clientWidth;
    this.slideImg = this.slide.clientWidth;

    this.next.onclick = function(){
        self.animate(-self.img);
        //self.animate(-600);
    }
    this.prev.onclick = function(){
        self.animate(self.img);
        //self.animate(600);
    }
}


Slide.prototype.animate = function(offset){
    var newLeft = parseInt(this.slide.style.left) + offset;
    this.slide.style.left = newLeft + 'px';
    if(newLeft > -this.img){
        this.slide.style.left = -(this.slideImg-2*this.img) +'px';
    }
    if(newLeft < -(this.slideImg-2*this.img)){
        this.slide.style.left = -this.img +'px';
    }
}