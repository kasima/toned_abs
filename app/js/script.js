var trackCustomEvent = function() {
  window.optimizely = window.optimizely || [];
  window.optimizely.push(['trackEvent', EVENT_NAME]);
}