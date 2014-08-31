var current_tab_url = null;

chrome.browserAction.onClicked.addListener(function(tab) {

});

chrome.windows.onCreated.addListener(function() {
    
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    refresh_badge();
});

chrome.tabs.getSelected(null, function(tab) {
    current_tab_url = tab.url;
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getCurrentTabUrl") {
        console.log(current_tab_url);
        sendResponse({data: current_tab_url});
    }
    else {
        sendResponse({});
    }
});

function refresh_badge() {
    chrome.storage.sync.get("urls", function(result) {
        count = result.urls.length;
        if (count == 0) {
            chrome.browserAction.setBadgeBackgroundColor({color:[0, 0, 0, 0]}); 
        }
        else {
            chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
            chrome.browserAction.setBadgeText({text:count.toString()});
        }
    });
}

function init() {
    refresh_badge();
}

init();
