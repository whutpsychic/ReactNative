//this is a solution of onMessage not working
const patchPostMessageFunction = function() {
  const originalPostMessage = window.ReactNativeWebView.postMessage;

  const patchedPostMessage = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };

  // patchedPostMessage.toString = function() {
  //   return String(Object.hasOwnProperty).replace(
  //     'hasOwnProperty',
  //     'postMessage',
  //   );
  // };

  window.ReactNativeWebView.postMessage = patchedPostMessage;
};
const patchPostMessageJsCode = `(${String(patchPostMessageFunction)})();`;

export default patchPostMessageJsCode;
