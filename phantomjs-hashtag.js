var fs = require('fs');
var page = require('webpage').create();

    
function parser (tagName){
    var url = 'https://www.instagram.com/explore/tags/' + tagName; 
    page.open(url, function (status) { 
        page.viewportSize = { width: 1024 , height: 600 };
        page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36';
        page.settings.resourceTimeout = 20000;
        page.settings.loadImages = false; 
        var links = page.evaluate(function() { 
            var l = document.getElementsByTagName("a"); 
            var a = []; 
            for (i=0;i<l.length;i++) { 
                if (l[i].href.includes('/p/')) { 
                    a.push(l[i].href); 
                } 
            } 
            return a; 
    }); 
    console.log(links); 
    phantom.exit(); 
    });
}