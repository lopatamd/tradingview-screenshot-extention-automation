# TradingView Watchlist Screenshot Automation

This project automates the process of taking screenshots of all symbols in a TradingView watchlist using a browser extension content script.

## Features

- Automatically focuses and navigates through each watchlist item.
- Captures and downloads screenshots for each symbol.
- Uses keyboard and mouse event simulation for reliable navigation.

## Usage

1. Load the extension in your browser (Chrome recommended).
2. Open a TradingView page with a visible watchlist.
3. Run the content script (`content.js`).
4. Screenshots will be captured and downloaded for each symbol.

## Requirements

- Chrome browser
- TradingView account with a visible watchlist
- Extension permissions for `chrome.runtime.sendMessage`

## File Structure

- `content.js` - Main automation script

## License

MIT
