(async () => {
  // This is the main function that will be executed on the page.

  /**
   * Simulates a mouse click on an element. This is used once to focus
   * on the first item in the watchlist.
   * @param {HTMLElement} element The element to click.
   */
  function simulateMouseClick(element) {
    const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    element.dispatchEvent(clickEvent);
  }

  /**
   * Simulates pressing the "ArrowDown" key on the keyboard.
   * This is a more reliable way to navigate the watchlist than simulating clicks.
   */
  function simulateArrowDown() {
    const keydownEvent = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      code: 'ArrowDown',
      keyCode: 40,
      which: 40,
      bubbles: true,
      cancelable: true,
    });
    // Dispatch the event on the document body, so TradingView's
    // global keyboard listeners can capture it.
    document.body.dispatchEvent(keydownEvent);
  }


  // Helper function to introduce a delay.
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Find all the div elements that represent a row for each symbol in the watchlist.
  const watchlistItems = document.querySelectorAll('div[data-symbol-full]');

  if (watchlistItems.length === 0) {
    alert("No watchlist items found. Make sure you are on a page with a TradingView watchlist and the list is visible.");
    return;
  }

  // --- Main Automation Logic ---

  // 1. Click the first item to give the watchlist focus.
  const firstItem = watchlistItems[0];
  firstItem.scrollIntoView({ block: 'center', behavior: 'smooth' });
  await sleep(300);
  simulateMouseClick(firstItem);
  await sleep(1500); // Wait for the first chart to load.

  // 2. Take a screenshot of the first item.
  let symbol = firstItem.getAttribute('data-symbol-full');
  chrome.runtime.sendMessage({
    action: "captureAndDownload",
    filename: symbol.replace(/[:/]/g, "_")
  });
  await sleep(500);

  // 3. Loop through the rest of the items using keyboard navigation.
  for (let i = 1; i < watchlistItems.length; i++) {
    // Simulate pressing the down arrow to go to the next symbol.
    simulateArrowDown();

    // Wait for the chart to update.
    await sleep(1500);

    // Get the symbol for the current item for the filename.
    const currentItem = watchlistItems[i];
    symbol = currentItem.getAttribute('data-symbol-full');

    // Send a message to capture and download the screenshot.
    chrome.runtime.sendMessage({
      action: "captureAndDownload",
      filename: symbol.replace(/[:/]/g, "_")
    });

    // Wait a moment before the next key press.
    await sleep(500);
  }

  alert("Finished taking screenshots for all items in the watchlist!");
})();
