chrome.storage.local.get(['fbFeedHidden'], (result) => {
  if (result.fbFeedHidden !== false) {
    const style = document.createElement('style');
    style.innerHTML = `
      div[role="main"] > div:nth-child(3), 
      #ssrb_feed_start + div,
      div[aria-label="Stories"] + div {
          display: none !important;
      }
    `;
    document.documentElement.appendChild(style);
  }
});