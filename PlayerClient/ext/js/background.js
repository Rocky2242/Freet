chrome.tabs.onUpdated.addListener(function(){
    chrome.tabs.getSelected(null,function(tab) {//get current tab without any selectors
   
        if(tab.url.indexOf("127.0.0.1") >= 0 || tab.url.indexOf("localhost") >= 0 || tab.url.indexOf('thoptv') >= 0){
            
            console.log('>>> start');
			
            //jio key
            chrome.webRequest.onBeforeSendHeaders.addListener(
                function(details) {
                    
                for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'User-Agent') {
                    details.requestHeaders[i].value = "JioTV";
                    }if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders[i].value = "";
                    }if (details.requestHeaders[i].name === 'Referer') {
                    details.requestHeaders[i].value = "";
                    }
                }
                return {requestHeaders: details.requestHeaders};
                },
                {urls: ['*://*.jio.com/*/*.key*']},
                ["blocking", "requestHeaders"]);

            //jio and others
            chrome.webRequest.onBeforeSendHeaders.addListener(
                function(details) {
                    for (var i = 0; i < details.requestHeaders.length; ++i) {
                        if (details.requestHeaders[i].name === 'User-Agent') {
                            details.requestHeaders[i].value = "JioTV/1.0.4 Adobe Primetime/2.5 ExoPlayerDemo/2.0 (Linux;Android 5.0.1) ExoPlayerLib/2.7.3/19.0 (Linux;Android 6.0.1) ExoPlayerLib/2.7.2";
                        }if (details.requestHeaders[i].name === 'Origin') {
                            details.requestHeaders[i].value = "";
                        }if (details.requestHeaders[i].name === 'Referer') {
                            details.requestHeaders[i].value = "";
                        }
                    }

                    return {requestHeaders: details.requestHeaders};
                },
                {urls: ['*://*.akamaihd.net/*.m3u8*','*://*.akamaihd.net/*.ts*','*://*.akamaihd.net/*.key*','*://*.akamaized.net/*.key*','*://*.akamaized.net/*.m3u8*','*://*.akamaized.net/*.ts*','*://*.akamaized.net/*.aac*','*://*.jio.com/*/*.ts*','*://*.jio.com/*/*.m3u8*','http://*.onlybest.tv/*','https://*.onlybest.tv/*','http://www.mytvonline.org/*','https://www.mytvonline.org/*']},
                ["blocking", "requestHeaders"]);


            //all
            chrome.webRequest.onHeadersReceived.addListener(function(details) {
                let flag = true;
                for (var i = 0; i < details.responseHeaders.length; ++i) {
                    if (details.responseHeaders[i].name === 'Access-Control-Allow-Origin') {
                        details.responseHeaders[i].value = '*';
                        flag=false;
                        break;
                    }
                }
                if(flag){
                    details.responseHeaders.push({
                        name: 'Access-Control-Allow-Origin',
                        value: '*'
                    });
                }
                return { responseHeaders: details.responseHeaders };
            }, {
                urls: ["*://*.channelsiptv.com/*","*://iptvbase.net/*",'*://easyview.eu/*','http://bdlive.stream/*',"http://bdixlive.ml/*","http://swiftstreamz.com/token*","http://www.filmon.com/*","http://boxtvhd.com/*","http://212.83.182.86:8080/*","http://212.47.237.131:8090/*","http://78.129.139.44:3030/*","http://linenettv.net:8090/*","http://212.83.158.140:6060/*", '*://www.sonyliv.com/api/v4/vod/*','*://*.boxtv.com/*','http://51.15.209.90:8800/*','http://212.83.183.94:8085/*','*://*.slive.pw/*','*://*.vlive.pw/*','*://*.wcast.tv/*','*://pankajbd.com/*','http://swiftstreamz.com/*','http://beeiptv.com/*','http://*.beeiptv.com:8081/*','http://api.ntv.com.tr/*','http://cdn-usa1-streaming.ani-box.com:1935/*','http://85.132.78.6:1935/*','http://cdn-live-egress.rbmtv.com/*','http://95.67.47.115/hls/*','http://www.djing.com/*','http://skydvn-nowtv-atv-prod.skydvn.com/*',
                    '*://*.akamaihd.net/*.m3u8*','*://*.akamaihd.net/*.ts*','*://*.akamaihd.net/*.key*','*://*.akamaized.net/*.key*','*://*.akamaized.net/*.m3u8*','*://*.akamaized.net/*.ts*','*://*.onlybest.tv/*','*://*.mytvonline.org/*',"*://*.jio.com/*/*.ts*","*://*.jio.com/*/*.key*","*://*.jio.com/*/*.m3u8*","*://*/04.m3u8*", "*://*/05.m3u8*", "*://*/06.m3u8*", "*://*/07.m3u8*", "*://*/08.m3u8*", "*://*/*.hls.ts*", "*://*.airtel.tv/*", "*://125.17.105.168/*", "*://125.17.129.8/*","*://125.17.129.9/*", "*://125.17.129.10/*", 
                    "*://125.17.129.11/*","*://125.17.129.12/*","*://125.17.129.13/*", "*://125.17.129.14/*","*://125.17.129.15/*", "*://125.17.129.16/*","*://*/88888888/*", "*://125.17.129.17/*","*://125.17.129.18/*","*://125.17.129.19/*",
                    "*://125.17.129.20/*","*://*/01.m3u8*", "*://*/02.m3u8*", "*://*/03.m3u8*","*://*/PLTV/*","*://*/index.m3u8*","*://83.218.223.86/*","http://www.metafilegenerator.de/*","http://61.58.60.247:9000/*","http://61.216.177.73/*",
                    "http://hlslive.lcdn.une.net.co/*","http://64.22.99.223/*","http://61.216.177.7/*","http://95.67.8.22/*","http://61.58.60.247:9000/*","http://64.22.99.227/*","http://64.22.99.223:1935/*","*://103.205.133.43/*","*://*.asianetmobiletvplus.com/*","*://livestream.5centscdn.com/*","*://adiyar.livebox.co.in/*","*://ott.bitryt.biz/*","*://*.cinesoft.live/*","*://*.cloudfront.net/*","http://tbmrepo.com/*"]
            }, [
                "responseHeaders", "blocking"
            ]);

        }

    });
});
