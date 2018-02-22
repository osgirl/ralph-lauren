_satellite.pushAsyncScript(function(event, target, $variables){
  try{var page=_satellite.getVar('pageName');}
catch(e){page="page not set";}
try{var category= _satellite.getVar('pageLevel1');}
catch(e){category='category not set';}
  
!function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");

 pintrk('load', '2620045262904');
 pintrk('page', {
   page_name: page,
   page_category: category,
 });


});
