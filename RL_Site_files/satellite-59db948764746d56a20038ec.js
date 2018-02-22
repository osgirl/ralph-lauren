_satellite.pushAsyncScript(function(event, target, $variables){
  var axel = Math.random() + "";
var a = axel * 10000000000000;
var dcIMG = document.createElement('iFrame');
try{var Category = _satellite.getVar('pageLevel1');} //example: baby
catch(e){Category='Category not set';}
try{var Brand = _satellite.getVar('DCMFloodlightu2');} //example: baby boy (brand variable not truly for brand per 360i)
catch(e){Brand='Brand not set';}
try{var PageName = _satellite.getVar('pageName');}
catch(e){PageName='Page Name not set';}
try{var PageType = _satellite.getVar('pageType');}
catch(e){PageType='Page Type not set';}
try{var ProdType = _satellite.getVar('DCMFloodlightu10');}
catch(e){ProdType = 'Product Type not set';}
try{var ProductIDView =  _satellite.getVar('productIDListView');}
catch(e){ProductIDView = '';}
try{var ProductIDCart = _satellite.getVar('productIDListCart');}
catch(e){ProductIDCart= '';}
try{var ProductIDTransaction = _satellite.getVar('productIDListTransaction');}
catch(e){ProductIDTransaction = '';}
try{var ProductNameView =  _satellite.getVar('productNameListView');}
catch(e){ProductNameView = '';}
try{var ProductNameCart = _satellite.getVar('productNameListCart');}
catch(e){ProductNameCart= '';}
try{var ProductNameTransaction = _satellite.getVar('productNameListTransaction');}
catch(e){ProductNameTransaction = '';}


if(ProductIDView.length > 0){var ProductID = ProductIDView};
if(ProductIDCart.length > 0){var ProductID = ProductIDCart};
if(ProductIDTransaction.length > 0){var ProductID = ProductIDTransaction};

if(ProductNameView.length > 0){var ProductName = ProductNameView};
if(ProductNameCart.length > 0){var ProductName = ProductNameCart};
if(ProductNameTransaction.length > 0){var ProductName = ProductNameTransaction};

dcIMG.setAttribute('src', "https://8124591.fls.doubleclick.net/activityi;src=8124591;type=rluni0;cat=rluni0;u1="+Category+";u2="+Brand+";u3="+ProductName+";u4="+ProductID+";u5="+PageName+";u6="+PageType+";u10="+ProdType+";dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1;num=" + a + "?")
dcIMG.setAttribute('height','1');
dcIMG.setAttribute('width','1');
dcIMG.setAttribute('Border','0');
dcIMG.setAttribute('style','display:none');
document.body.appendChild(dcIMG);
});
