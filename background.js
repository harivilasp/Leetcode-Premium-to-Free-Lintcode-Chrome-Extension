function leetcode(link, sciHubDomain) {
  // Use the link to search on Leetcode
  link=link.replace("problems","problem");
  link=link.replace("leetcode.com","lintcode.com");
  // console.log(link);
  return link;
}

function newTableetcode(tab, link) {
  // Tab is the current tab and link is the link to append Leetcode.io
  chrome.storage.sync.get({
    domain: 'Leetcode.tw' // Updated default domain ( As of DEC 03 - 2017 )
  }, function(items) {
    chrome.tabs.query({
        active: true
      }, tabs => {
        let index = tabs[0].index;
        chrome.tabs.create({index: index + 1, url: leetcode(link, items.domain)});
      }
    );
  });
}

function sameTableetcode(tab, link) {
  // Tab is the current tab and link is the link to append Leetcode.io
  chrome.storage.sync.get({
    domain: 'Leetcode.tw' // Updated default domain ( As of DEC 03 - 2017 )
  }, function(items) {
    chrome.tabs.update(tab.id, {url: leetcode(link, items.domain)});
  });
}

function openOptions(){
  if (chrome.runtime.openOptionsPage) {
  // New way to open options pages, if supported (Chrome 42+).
  chrome.runtime.openOptionsPage();
  } else {
    // Reasonable fallback.
    window.open(chrome.runtime.getURL('options.html'));
  }
}
// Setup extension click action
chrome.browserAction.onClicked.addListener(function(tab) {
  sameTableetcode(tab, tab.url);
});

// Setup context menu actions
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        title: 'Leetcode-Fy',
        id: 'page', // you'll use this in the handler function to identify this context menu item
        contexts: ['page'],
    });
    chrome.contextMenus.create({
        title: 'Leetcode-Fy',
        id: 'link', // you'll use this in the handler function to identify this context menu item
        contexts: ['link'],
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "page") { // here's where you'll need the ID
      sameTableetcode(tab, tab.url);
    } else if (info.menuItemId === "link") {
      newTableetcode(tab, info.linkUrl);
    }
});
