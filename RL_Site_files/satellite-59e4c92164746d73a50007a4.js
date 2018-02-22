_satellite.pushAsyncScript(function(event, target, $variables){
  /** DO NOT MODIFY THIS CODE**/
!function(_window, _document) {
var OB_ADV_ID='00bd5980f25494c55d4b5153bb3de5d924';
if (_window.obApi) { return; }
var api = _window.obApi = function() {api.dispatch ? api.dispatch.apply(api, arguments) : api.queue.push(arguments);};api.version = '1.0';api.loaded = true;api.marketerId = OB_ADV_ID;api.queue = [];var tag = _document.createElement('script');tag.async = true;tag.src = '//amplify.outbrain.com/cp/obtp.js';tag.type = 'text/javascript';var script = _document.getElementsByTagName('script')[0];script.parentNode.insertBefore(tag, script);}(window, document);
obApi('track', 'PAGE_VIEW');

});
