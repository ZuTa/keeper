var Keeper = {
    currentLink : null,
    init : function() {
        var that = this;

        chrome.tabs.query({
            'active': true,
            'windowId': chrome.windows.WINDOW_ID_CURRENT,
            currentWindow:true
            }, function (tabs) {
                that.currentLink = tabs[0].url;
                document.getElementById("currentLink").innerHTML = that.truncate(tabs[0].url, 30);
            }
        );

        $('#close-button').click(function() {
            window.close();
        });

        $('#keep-button').click(function() {
            var itemToKeep = {
                'url' : that.currentLink,
                'tags' : that.fetchTags(),
                'notes': $('#notes').val(),
                'checked' : false
            };

            chrome.storage.sync.get({"urls" : []}, function (result) {
                var urls = result.urls;
                
                urls.push(itemToKeep);

                chrome.storage.sync.set({"urls" : urls}, function() {
                    // TODO: handle errors chrome.runtime.lastError
                });
            });
        });
    },

    truncate : function(str, threshold) {
        return str.length > threshold ? str.substr(0, threshold) + '...' :  str;
    },

    fetchTags : function() {
        var str = $('#tags').val().trim();

        return str.length > 0 ? str.split() : [];
    },
}

$(function() {
    Keeper.init();
});
