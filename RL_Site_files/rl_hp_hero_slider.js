(function($){$.rlHPSwipe=function(el,options){evt_type=("ontouchstart"in window)?'touchstart':'click';var defaults={data:{sensitivity:30,timing:600,callback_delay:null,startTouch:null,doubleTap:false,lastSwipe:null,slideQty:el.children('.rl-slide').length,childWidth:el.children('.rl-slide').width(),proximity:(el.children('.rl-slide').width()/2),
swiping:false,start_x:null,down_x:null,swipe_pos:null,up_x:null,limit_r:(-1*(el.width()- el.parent().width()))}}
var plugin=this;plugin.settings={}
var init=function(){plugin.settings=$.extend({},defaults,options);plugin.el=el;plugin.options=options;plugin.isIE=checkIfIE();plugin.el.settings=defaults.data;data=plugin.el.settings;if(evt_type=='click'){plugin.el.on('mousedown',function(e){e.preventDefault();addSettings(e);}).on('mouseenter',function(){data.swiping=false;}).on('mousemove',function(e){if(data.swiping==true){e.preventDefault();e.stopPropagation();drag(e);}}).on('mouseup',function(e){swipeEnd(e);}).on('mouseleave',function(e){swipeEnd(e);});}else{plugin.el.on('touchstart',function(e){addSettings(e);}).on('touchmove',function(e){if(!data.doubleTap&&data.swiping){drag(e);}}).on('touchend',function(e){swipeEnd(e);});}
addControls();prepareSlides();activateControls();}
var addSettings=function(e){if(!data.swiping){var now=new Date().getTime();data.slideQty=plugin.el.children('.rl-slide').length;data.childWidth=plugin.el.children('.rl-slide').width();data.proximity=(plugin.el.children('.rl-slide').width()/2);
data.startTouch=now;data.swiping=true;data.start_x=plugin.el.position().left;data.start_y=plugin.el.position().top;plugin.el.data('limit_r',(-1*(el.width()- el.parent().width())));if(evt_type=='touchstart'){var lastTouch=plugin.el.data('lastTouch')||now+ 1;var delta=now- lastTouch;if(delta<500&&delta>0){data.doubleTap=true;}else{data.doubleTap=false;}
data.down_x=e.originalEvent.touches[0].pageX;data.up_x=null;data.down_y=e.originalEvent.touches[0].pageY;data.up_y=null;}else{data.down_x=e.pageX;}}}
var drag=function(e){clearTimeout(data.callback_delay);data.limit_r=plugin.el.data('limit_r');if(evt_type=='touchstart'){data.up_x=e.originalEvent.touches[0].pageX;swipe_pos=((e.originalEvent.touches[0].pageX- data.down_x)+data.start_x);data.up_y=e.originalEvent.touches[0].pageY;if((data.down_y- data.up_y)>30||(data.down_y- data.up_y)<-30){data.swiping=false;}
if((e.originalEvent.touches[0].pageX- data.down_x)>=0){var direction='right';}else{var direction='left';}}else{swipe_pos=((e.pageX- data.down_x)+data.start_x);if((e.pageX- data.down_x)>=0){var direction='right';}else{var direction='left';}}
if(data.swiping){data.swipe_pos=swipe_pos;move(0,direction);onMove(e);}}
var swipeEnd=function(e){if(data.swiping){var now=new Date().getTime();var delta=now- data.startTouch;if(evt_type!='touchstart'){data.up_x=e.pageX;}
if(data.up_x&&(data.down_x-data.up_x)!=0){if(data.down_x<data.up_x){var direction='right';}else{var direction='left';}
addMomentum(delta,direction);}}
data.swiping=false;}
var move=function(timing,direction){if(direction==='right'){var slideToMove=".rl-currSlide";var newPosX=data.swipe_pos+'px';}else if(direction==='left'){var slideToMove=".rl-nextSlide";var newPosX='calc(100% + '+ data.swipe_pos+'px)';}else{var slideToMove='.rl-slide:eq('+ direction+')';var newPosX='0';}
plugin.el.find(slideToMove).addClass("rl-movingSlide").css({'transform':'translateX('+ newPosX+')','transition-duration':timing+'ms'});}
var snap=function(direction,speed){if(direction==='right'){data.swipe_pos=data.childWidth;}else{data.swipe_pos=-1*data.childWidth;}
if(!speed){speed=data.timing;}
move(speed,direction);prepareSlides(direction);updateDots();data.callback_delay=setTimeout(onSwipeEnd,data.timing);}
var flic=function(){flic_pos=getNewPosition();if(flic_pos||flic_pos==0){flic_pos=(flic_pos>0)?0:flic_pos;data.limit_r=plugin.el.data('limit_r');flic_pos=(flic_pos<data.limit_r)?data.limit_r:flic_pos;data.swipe_pos=flic_pos;}else{data.swipe_pos=plugin.el.position().left;}
snap();}
var addMomentum=function(delta,direction){if(delta>0){snap(direction);}}
var getNewPosition=function(){var flic_pos;pageX=data.start_x;if(data.start_x%data.childWidth<0){pageX=(Math.round(data.swipe_pos/data.childWidth)*data.childWidth);}
if(data.up_x&&data.up_x!=data.down_x){if((data.up_x- data.down_x)>data.sensitivity){flic_pos=pageX+ data.childWidth;}
if(data.up_x&&((data.down_x- data.up_x)>data.sensitivity)){flic_pos=pageX- data.childWidth;}}
return flic_pos;}
var prepareSlides=function(direction){$(".rl-movingSlide").removeClass('rl-movingSlide');var $currSlide=plugin.el.find(".rl-currSlide");if(plugin.el.find(".rl-nextSlide").length>0){if(direction==='right'){if($currSlide.index(".rl-hp-hero-slider .rl-slide")==0){$currSlide.removeClass("rl-currSlide").addClass("rl-nextSlide").siblings(".rl-nextSlide").removeClass("rl-nextSlide").siblings(".rl-slide").last().addClass("rl-currSlide");}else{plugin.el.find(".rl-nextSlide").removeClass("rl-nextSlide");$currSlide.removeClass("rl-currSlide").addClass("rl-nextSlide").prev(".rl-slide").addClass("rl-currSlide");}}else{$currSlide.addClass("rl-prevSlide").removeClass("rl-currSlide").siblings(".rl-nextSlide").addClass("rl-currSlide").removeClass("rl-nextSlide");}}else{plugin.el.find(".rl-slide:eq(0)").addClass("rl-currSlide");}
$currSlide=plugin.el.find(".rl-currSlide");if($currSlide.index(".rl-hp-hero-slider .rl-slide")>=(data.slideQty- 1)){plugin.el.find(".rl-slide:eq(0)").addClass("rl-nextSlide").siblings(".rl-nextSlide").removeClass("rl-nextSlide");}else if(direction!='right'){$currSlide.next(".rl-slide").addClass("rl-nextSlide");}
if($currSlide.index(".rl-hp-hero-slider .rl-slide")==0){plugin.el.find('.rl-slide:eq('+(data.slideQty- 1)+')').addClass("rl-nextSlideLeft").siblings(".rl-nextSlideLeft").removeClass("rl-nextSlideLeft");}else{$currSlide.prev(".rl-slide").addClass("rl-nextSlideLeft").siblings(".rl-nextSlideLeft").removeClass("rl-nextSlideLeft");}
lazyLoadImages();setTimeout(function(){if(plugin.el.find(".rl-prevSlide").length>0){plugin.el.find(".rl-prevSlide").removeClass("rl-prevSlide");}
plugin.el.find(".rl-slide").attr("style",null);},data.timing);}
var addControls=function(){plugin.el.append('<div class="rl-slide-arrow rl-slide-arrow-left"><div class="rl-arrow"></div></div><div class="rl-slide-arrow rl-slide-arrow-right"><div class="rl-arrow"></div></div>');var btnMarkup="";var currBtn;for(currBtn=1;currBtn<=data.slideQty;currBtn++){var btnClass="";if(currBtn==1){btnClass='rl-dot-active';}
btnMarkup+='<li class="'+ btnClass+'"><button type="button" aria-controls="rl-slide" aria-label="'+ currBtn+' of '+ data.slideQty+'" tabindex="0" aria-selected="true">'+ currBtn+'</button></li>'}
plugin.el.append('<ul class="rl-slide-dots">'+ btnMarkup+'</ul>');}
var activateControls=function(){plugin.el.find('.rl-slide-arrow').on("mousedown",function(e){data.swiping=false;}).on('click',function(e){if($(this).hasClass('rl-slide-arrow-left')){var direction='right';}else{var direction='left';}
snap(direction);});plugin.el.find('.rl-slide-dots li').on('click',function(e){$this=$(this);var btnIdx=$this.index('.rl-slide-dots li');var currSlideIdx=$('.rl-hp-hero-slider .rl-currSlide').index('.rl-hp-hero-slider .rl-slide');if(btnIdx!==currSlideIdx){$('.rl-slide:eq('+ btnIdx+')').addClass('rl-nextSlide').siblings('.rl-nextSlide').removeClass('rl-nextSlide');move()
setTimeout(function(){move(data.timing,btnIdx);$this.addClass("rl-dot-active").siblings().removeClass("rl-dot-active");prepareSlides('left');updateDots();},3);}});}
var updateDots=function(){var currSlideIdx=$('.rl-currSlide').index('.rl-hp-hero-slider .rl-slide');plugin.el.find('.rl-slide-dots li:eq('+ currSlideIdx+')').addClass("rl-dot-active").siblings().removeClass("rl-dot-active");}
var autoSlide=function(){var arrowRight=$('.rl-slide-arrow-right');var autoSlideTiming=3000;var hpSlide="";startAutoPlay();plugin.el.on("mouseenter",function(){clearInterval(hpSlide);}).on('mouseleave',function(){startAutoPlay();});function startAutoPlay(){hpSlide=setInterval(function(){moveToNextSlide();},autoSlideTiming);}
function moveToNextSlide(){arrowRight.trigger("click");}}
var lazyLoadImages=function(){addImages(plugin.el.find(".rl-nextSlide"));addImages(plugin.el.find(".rl-nextSlideLeft"));function addImages($slideElm){if(!$slideElm.hasClass("imgLoaded")){$thisPic=$slideElm.find(".rl-picture");if(plugin.isIE){$thisPic.children(".rl-image").attr("src",$thisPic.attr("data-image-desktop"));}else{$thisPic.children(".rl-image").attr("src",$thisPic.attr("data-image-mobile"));}
$thisPic.children(".rl-image-src-mobile").attr("srcset",$thisPic.attr("data-image-mobile"));$thisPic.children(".rl-image-src-desktop").attr("srcset",$thisPic.attr("data-image-desktop"));$slideElm.addClass("rl-imgLoaded");}}}
function checkIfIE(){var rv=false;if(navigator.appName=='Microsoft Internet Explorer'){var ua=navigator.userAgent,re=new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");if(re.exec(ua)!==null){rv=true;}}else if(navigator.appName=="Netscape"){if(navigator.appVersion.indexOf('Trident')>-1){rv=true;}}
return rv;}
var onMove=function(e){if(plugin.options.onMove)plugin.options.onMove.call(plugin);}
var onSwipeEnd=function(){if(plugin.options.onSwipeEnd)plugin.options.onSwipeEnd.call(plugin);}
plugin.jumpTo=function(pos,timing){clearTimeout(data.callback_delay);data.swipe_pos=pos;timing=(typeof timing=='number')?timing:data.timing;move(timing);}
init();}
$('document').ready(function(){var swiper=new jQuery.rlHPSwipe(jQuery('.rl-hp-hero-slider'),{});});})(jQuery);