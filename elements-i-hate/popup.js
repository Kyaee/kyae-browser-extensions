// popup.js
const btn = document.getElementById('toggleBtn');

function updateUI(isHidden) {
  btn.textContent = isHidden ? "Show Feed" : "Hide Feed";
  btn.className = isHidden ? "toggle-btn" : "toggle-btn off";
  
  // Update the badge
  chrome.action.setBadgeText({ text: isHidden ? "ON" : "OFF" });
  chrome.action.setBadgeBackgroundColor({ color: isHidden ? "#1877F2" : "#808080" });
}

// Get initial state
chrome.storage.local.get(['fbFeedHidden'], (result) => {
  updateUI(result.fbFeedHidden !== false);
});

btn.onclick = () => {
  chrome.storage.local.get(['fbFeedHidden'], (result) => {
    const newState = result.fbFeedHidden === false;
    chrome.storage.local.set({ fbFeedHidden: newState }, () => {
      updateUI(newState);
      
      // Notify the content script to apply/remove the CSS
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.runtime.sendMessage({ action: "recheckFocus" });
          // Also send to the specific tab just in case
          chrome.tabs.sendMessage(tabs[0].id, { action: "recheckFocus" });
        }
      });
    });
  });
};