// content.js
const FEED_SELECTOR = 'div[role="main"] .x9f619.x1n2onr6.x1ja2u2z';

function applyFocusMode() {
  chrome.storage.local.get(['fbFeedHidden'], (result) => {
    const isHidden = result.fbFeedHidden !== false; // Default to true
    
    // Remove existing style if any
    const existingStyle = document.getElementById('fb-focus-style');
    if (existingStyle) existingStyle.remove();

    if (isHidden) {
      const style = document.createElement('style');
      style.id = 'fb-focus-style';
      style.innerHTML = `
        ${FEED_SELECTOR} {
            display: none !important;
        }
        /* Optional: Also hide the "Stories" bar at the top */
        div[aria-label="Stories"] {
            display: none !important;
        }
      `;
      document.documentElement.appendChild(style);
    }
  });
}

// Run on initial load
applyFocusMode();

// Listen for messages from popup.js to update UI without refreshing
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "recheckFocus") {
    applyFocusMode();
  }
});