// Listen for a click on the browser action icon.
chrome.action.onClicked.addListener((tab) => {
  // Execute the content script in the active tab.
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});

// Listen for messages from the content script.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "captureAndDownload") {
    // Capture the visible part of the tab.
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
      // Download the captured image.
      chrome.downloads.download({
        url: dataUrl,
        filename: `${request.filename}.png`,
        saveAs: false
      });
    });
  }
});
