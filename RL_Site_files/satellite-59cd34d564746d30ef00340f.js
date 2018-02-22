_satellite.pushAsyncScript(function(event, target, $variables){
  //Set Global Custom Dimensions and Page Names
var obj = {
  'dimension1': _satellite.getVar("orderPaymentType"),  //order payment type
  'dimension2': _satellite.getVar("orderShipMethod"), // s.campaign
  'dimension3': _satellite.getVar("orderTransactionType"), // site sections
  'dimension4': _satellite.getVar("pageGender"), // page type
  'dimension5': _satellite.getVar("pageType"),  //ymail visitor ID placeholder
  // dimensions 6,7,8 at product level
  'dimension9': _satellite.getVar("userGender"), //ymail email ID placeholder
  'dimension10': _satellite.getVar("userID"), // internal campaign parameter
  'dimension11': _satellite.getVar("userLoginState") // searched term
};
ga('fc42699b0e938ee8fc91d51857c4c35b.set', obj);
console.log("Google Analytics Custom Dimensions set")

// send pageview
if(typeof _satellite.getVar("pageName") !== "undefined"){
ga('fc42699b0e938ee8fc91d51857c4c35b.send', {
  hitType: 'pageview',
  page: location.pathname,
  title:  _satellite.getVar("pageName")
}); 
}
});
