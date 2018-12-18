chrome.tabs.onUpdated.addListener(function(){
    chrome.tabs.getSelected(null,function(tab) {//get current tab without any selectors
   
        if(tab.url.indexOf("thoptv") >= 0 || tab.url.indexOf("127.0.0.1") >= 0){
            
            console.log('>>> start');
			
			var curver = 18;
						
			//thyme
			chrome.webRequest.onBeforeRequest.addListener(
			  page => {
					return {
						cancel: true,
					};
				},
				{
				urls: [
						"https://licensing.bitmovin.com/impression",
						"https://licensing.bitmovin.com/licensing"
					],
					types: ["xmlhttprequest"]
				},
				["blocking"]
			);
			
            //sony premium
			chrome.webRequest.onHeadersReceived.addListener(details => {
				var origin = tab.url.match(/^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/)[0];
                for (var i = 0; i < details.responseHeaders.length; ++i) {
                    if (details.responseHeaders[i].name === 'Access-Control-Allow-Origin') {
                        details.responseHeaders[i].value= origin;
                    }
                }
                details.responseHeaders.push({
                    name: 'Access-Control-Allow-Credentials',
                    value: 'true'
                });
				
                return { responseHeaders: details.responseHeaders };
                }, {urls: ['https://sonypremiumrtmp-lh.akamaihd.net/*']}, ['responseHeaders', 'blocking']);
                
				
			//tvingo	
			chrome.webRequest.onBeforeSendHeaders.addListener(
                function(details) {
                    
                for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'User-Agent') {
                    details.requestHeaders[i].value = "tvingoplus@livetv.tvingo1Z!2018";
                    }if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders[i].value = "";
                    }
                }
                return {requestHeaders: details.requestHeaders};
                },
                {urls: ['http://okaystreamz.tk:35580/*']},
                ["blocking", "requestHeaders"]);
                
            //vlive
			chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
                console.log(details);
                details.requestHeaders.push({
                    name: 'Referer',
                    value: 'http://crichd.ws/'
                });

                return { requestHeaders: details.requestHeaders };
               }, {
                urls: ['*://*.slive.pw/*','*://*.vlive.pw/*','*://*.wcast.tv/*']
               }, [
                "requestHeaders", "blocking"
               ]);
			   
			   //itv
			chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
                console.log(details);
                details.requestHeaders.push({
                    name: 'Referer',
                    value: 'http://itvhd.live/'
                });

                return { requestHeaders: details.requestHeaders };
               }, {
                urls: ['http://bdixlive.ml/*']
               }, [
                "requestHeaders", "blocking"
               ]);
			   
			     //bdiptv
			chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
                console.log(details);
                details.requestHeaders.push({
                    name: 'Referer',
                    value: 'http://bdiptv.stream/kalkata.html'
                });

                return { requestHeaders: details.requestHeaders };
               }, {
                urls: ['http://bdlive.stream/*']
               }, [
                "requestHeaders", "blocking"
               ]);

			//livenet key		
			chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
                console.log(details);
                details.requestHeaders.push({
                    name: 'Authorization',
                    value: 'Basic QFN3aWZ0MTIjOkBTd2lmdDEyIw=='
                });
				details.requestHeaders.push({
                    name: 'Modified',
                    value: '10514213542576073889'
                });
				for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'Accept-Language') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Accept') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'User-Agent') {
                    details.requestHeaders[i].value="Dalvik/1.6.0 (Linux; U; Android 4.4.4; HM 1S MIUI/V8.2.3.0.KHCMIEK)";
                    }if (details.requestHeaders[i].name === 'Accept-Encoding') {
                    details.requestHeaders[i].value="gzip";
                    }
                }

                return { requestHeaders: details.requestHeaders };
            }, {
                urls: ["http://212.83.183.94:8085/temp/deg.php*"]
            }, [
                "requestHeaders", "blocking"
            ]);

            //livenet image
			chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
                console.log(details);
				for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'Accept') {
                    details.requestHeaders[i].value="text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
                    }
                }

                return { requestHeaders: details.requestHeaders };
            }, {
                urls: ["http://cdn.livenettv.co/*.jpg*"]
            }, [
                "requestHeaders", "blocking"
            ]);
					
					
			chrome.webRequest.onBeforeSendHeaders.addListener(
                function(details) {
                for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'User-Agent') {
                    details.requestHeaders[i].value = "HD-ipl-STM/3.0";
                    }if (details.requestHeaders[i].name === 'Referer') {
                    details.requestHeaders[i].value = "";
                    }if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders[i].value = "";
                    }
                
                }
                return {requestHeaders: details.requestHeaders};
                },
                {urls: ["http://*/HDSTM*"]},
                ["blocking", "requestHeaders"]);
				 
				 
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
                if(details.url.indexOf("hssports") > -1){
                    for (var i = 0; i < details.requestHeaders.length; ++i) {
                        if (details.requestHeaders[i].name === 'User-Agent') {
                            details.requestHeaders[i].value = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36";
                        }if (details.requestHeaders[i].name === 'Origin') {
                            details.requestHeaders.splice(i,1);
                        }if (details.requestHeaders[i].name === 'Referer') {
                            details.requestHeaders.splice(i,1);
                        }
                    }
                }else{
                    for (var i = 0; i < details.requestHeaders.length; ++i) {
                        if (details.requestHeaders[i].name === 'User-Agent') {
                        details.requestHeaders[i].value = "JioTV/1.0.4 Adobe Primetime/2.5 ExoPlayerDemo/2.0 (Linux;Android 5.0.1) ExoPlayerLib/2.7.3/19.0 (Linux;Android 6.0.1) ExoPlayerLib/2.7.2";
                        }if (details.requestHeaders[i].name === 'Origin') {
                        details.requestHeaders[i].value = "";
                        }if (details.requestHeaders[i].name === 'Referer') {
                        details.requestHeaders[i].value = "";
                        }
                    }
                }
                
                return {requestHeaders: details.requestHeaders};
                },
                {urls: ['*://*.akamaihd.net/*.m3u8*','*://*.akamaihd.net/*.ts*','*://*.akamaihd.net/*.key*','*://*.akamaized.net/*.key*','*://*.akamaized.net/*.m3u8*','*://*.akamaized.net/*.ts*','*://*.akamaized.net/*.aac*','*://*.jio.com/*/*.ts*','*://*.jio.com/*/*.m3u8*','http://*.onlybest.tv/*','https://*.onlybest.tv/*','http://www.mytvonline.org/*','https://www.mytvonline.org/*']},
                ["blocking", "requestHeaders"]);
                
            
			  
            //no idea
            chrome.webRequest.onBeforeSendHeaders.addListener(
                    function(details) {
                    for (var i = 0; i < details.requestHeaders.length; ++i) {
                        if (details.requestHeaders[i].name === 'Referer') {
                        details.requestHeaders.splice(i, 1);
                        break;
                        }
                    }
                    return {requestHeaders: details.requestHeaders};
                    },
                    {urls: ["http://163.172.220.115:8080/*"]},
                    ["blocking", "requestHeaders"]);
                

                
            //airtel    
            chrome.webRequest.onBeforeSendHeaders.addListener(
                function(details) {
                for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'User-Agent') {
                    details.requestHeaders[i].value = aua;
                    }if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders[i].value = "";
                    }if (details.requestHeaders[i].name === 'Referer') {
                    details.requestHeaders[i].value = "";
                    }
                
                }
                return {requestHeaders: details.requestHeaders};
                },
                {urls: ["*://*/04.m3u8*", "*://*/05.m3u8*", "*://*/06.m3u8*", "*://*/07.m3u8*", "*://*/08.m3u8*", "*://*/*.hls.ts*", "*://*.airtel.tv/*", "*://125.17.105.168/*", "*://125.17.129.8/*","*://125.17.129.9/*", "*://125.17.129.10/*", 
            "*://125.17.129.11/*","*://125.17.129.12/*","*://125.17.129.13/*", "*://125.17.129.14/*","*://125.17.129.15/*", "*://125.17.129.16/*","*://*/88888888/*", "*://125.17.129.17/*","*://125.17.129.18/*","*://125.17.129.19/*",
            "*://125.17.129.20/*","*://*/01.m3u8*", "*://*/02.m3u8*", "*://*/03.m3u8*","*://*/PLTV/*","*://*/index.m3u8*"]},
                ["blocking", "requestHeaders"]);
				
				//rockstar
				chrome.webRequest.onBeforeSendHeaders.addListener(
                function(details) {
                for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'User-Agent') {
                    details.requestHeaders[i].value = rua;
                    }if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders[i].value = "";
                    }if (details.requestHeaders[i].name === 'Referer') {
                    details.requestHeaders[i].value = "";
                    }
                
                }
                return {requestHeaders: details.requestHeaders};
                },
                {urls: ["*://*.channelsiptv.com/*"]},
                ["blocking", "requestHeaders"]);
				
            
                chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
                    console.log(details);
                    details.requestHeaders.push({
                        name: 'Connection',
                        value: 'keep-alive'
                    });
                    details.requestHeaders.push({
                        name: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate'
                    });
                    details.requestHeaders.push({
                        name: 'Pragma',
                        value: 'no-cache'
                    });
                    details.requestHeaders.push({
                        name: 'Age',
                        value: '1'
                    });
                    details.requestHeaders.push({
                        name: 'Expires',
                        value: '0'
                    });
                    return { requestHeaders: details.requestHeaders };
                }, {
                    urls: ["*://*/04.m3u8*", "*://*/05.m3u8*", "*://*/06.m3u8*", "*://*/07.m3u8*", "*://*/08.m3u8*", "*://*/*.hls.ts*", "*://*.airtel.tv/*", "*://125.17.105.168/*", "*://125.17.129.8/*","*://125.17.129.9/*", "*://125.17.129.10/*", 
                "*://125.17.129.11/*","*://125.17.129.12/*","*://125.17.129.13/*", "*://125.17.129.14/*","*://125.17.129.15/*", "*://125.17.129.16/*","*://*/88888888/*", "*://125.17.129.17/*","*://125.17.129.18/*","*://125.17.129.19/*",
                "*://125.17.129.20/*","*://*/01.m3u8*", "*://*/02.m3u8*", "*://*/03.m3u8*","*://*/PLTV/*","*://*/index.m3u8*","*://31.3.245.58/*"]
                }, [
                    "requestHeaders", "blocking"
                ]);

			//swift	
			chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
				console.log(details);
				for (var i = 0; i < details.requestHeaders.length; ++i) {
					
                    if (details.requestHeaders[i].name === 'User-Agent') {
                    details.requestHeaders[i].value=swiftplayer;
                    }if (details.requestHeaders[i].name === 'Accept-Encoding') {
                    details.requestHeaders[i].value="gzip";
                    }
                
                }

                return { requestHeaders: details.requestHeaders };
            }, {
                urls: ["http://185.148.3.188:5051/*","http://185.107.95.68:5051/*","http://46.166.184.36:5051/*","http://46.166.184.35:5051/*","http://212.8.253.141:5051/*","http://185.21.216.147:8880/*","http://185.21.217.13:7071/*","http://*.galaxystreamz.xyz:5051/*","http://78.129.150.110:5051/*","http://50.7.196.130:5051/*","http://*.galaxystreamz.xyz:8880/*"]
            }, [
                "requestHeaders", "blocking"
            ]);
			
			//redbox
			chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
                details.requestHeaders.push({
                    name: 'Authorization',
                    value: redbox["auth"]
                });
				for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'Accept-Language') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Accept') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders.splice(i,1);
                    }
                }
                return { requestHeaders: details.requestHeaders };
            }, {
                urls: ["http://51.15.209.90:8800/*"]
            }, [
                "requestHeaders", "blocking"
            ]);
				
			
			

			chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
				for (var i = 0; i < details.requestHeaders.length; ++i) {
					
					if (details.requestHeaders[i].name === 'User-Agent') {
                      details.requestHeaders[i].value = redbox["ua"];
           
                    }
                }

                return { requestHeaders: details.requestHeaders };
            }, {
                urls: ["http://*.redboxtv.net:4554/*","http://*.ruby.pt:4554/*"]
            }, [
                "requestHeaders", "blocking"
            ]);
			
			//swift tokens
			chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
				tpass = swift[details.url];
                details.requestHeaders.push({
                    name: 'Authorization',
                    value: tpass
                });
				
				for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'Accept-Language') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Accept') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'User-Agent') {
                    details.requestHeaders[i].value=stua;
                    }if (details.requestHeaders[i].name === 'Accept-Encoding') {
                    details.requestHeaders[i].value="gzip";
                    }
                }
                return { requestHeaders: details.requestHeaders };
            }, {
                urls: ["http://swiftstreamz.com/*.php*"]
            }, [
                "requestHeaders", "blocking"
            ]);
			
				
            //lily
			chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
				console.log(lua);
				for (var i = 0; i < details.requestHeaders.length; ++i) {
					
                    if (details.requestHeaders[i].name === 'User-Agent') {
                    details.requestHeaders[i].splice(i,1);
                    }if (details.requestHeaders[i].name === 'Accept-Encoding') {
                    details.requestHeaders[i].value="gzip";
                    }if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders.splice(i,1);
                    }
                
                }
				details.requestHeaders.push({
                    name: 'User-Agent',
                    value: lua
                });
				console.log(details.requestHeaders);
                return { requestHeaders: details.requestHeaders };
            }, {
                urls: ["http://103.24.96.74/*","http://109.169.19.173:1935/*","http://113.203.232.3:1935/*","http://103.185.144.63:8081/*","http://149.202.205.24:1935/*","http://158.69.124.9:1935/*","http://158.69.228.195:1935/*","http://158.69.229.29:1935/*","http://158.69.229.30:1935/*","http://163.172.60.131:8554/*","http://163.172.60.77:8554/*",
				"http://163.172.82.211:25461/*","http://185.147.13.230:8554/*","http://185.21.216.152:8554/*","http://185.21.217.16:2052/*","http://185.21.217.18:8554/*","http://185.21.217.29:9100/*","http://185.21.217.30:8554/*","http://185.21.217.32:9099/*","http://185.21.217.48:8554/*","http://185.21.217.9:8554/*","http://198.16.102.98:8554/*","http://199.167.151.237:1935/*","http://212.83.183.94:8085/*","http://217.182.192.199:25461/*","http://218.248.64.74:1935/*","http://46.166.184.33:8554/*","http://38.96.175.40:1935/*","http://46.166.184.41:8554/*","http://51.254.209.160:1935/*","http://63.149.204.50:8000/*","http://63.237.48.28/*","http://67.231.248.131:1935/*","http://69.64.57.213:1935/*","http://78.129.139.44:8554/*","http://78.129.241.19:8554/*","http://84.244.187.12:1935/*","http://87.117.234.51:8554/*","http://89.163.255.249:8554/*","http://*.livenettv.sx:2086/*","http://*.livenettv.net:8090/*","http://*.livenettv.sx/*","http://*.tru.io:7983/*","http://kiki.cr.rs:7623/*","http://mia.tru.io:8565/*","http://chappie.tru.io:7983/*"
				]
            }, [
                "requestHeaders", "blocking"
            ]);
			
            chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
                details.requestHeaders.push({
                    name: 'Modified',
                    value: '10513273646586170879'
                });
				for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'Accept-Language') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Accept') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders.splice(i,1);
                    //}if (details.requestHeaders[i].name === 'User-Agent') {
                    //details.requestHeaders[i].value=ltua;
                    }if (details.requestHeaders[i].name === 'Accept-Encoding') {
                    details.requestHeaders[i].value="gzip";
                    }
                }

                return { requestHeaders: details.requestHeaders };
            }, {
                urls: ["http://212.83.158.140:6060/aves.nettv*"]
            }, [
                "requestHeaders", "blocking"
            ]);  
           
			
            chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
                details.requestHeaders.push({
                    name: 'Modified',
                    value: '10514223748556278829'
                });
				for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'Accept-Language') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Accept') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Accept-Encoding') {
                    details.requestHeaders[i].value="gzip";
                    }
                }

                return { requestHeaders: details.requestHeaders };
            }, {
                urls: ["http://linenettv.net:8090/*"]
            }, [
                "requestHeaders", "blocking"
            ]); 
			
			chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
                details.requestHeaders.push({
                    name: 'Modified',
                    value: '10513273646566375819'
                });
				for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'Accept-Language') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Accept') {
                    details.requestHeaders.splice(i,1);
					}if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Accept-Encoding') {
                    details.requestHeaders[i].value="gzip";
                    }
                }

                return { requestHeaders: details.requestHeaders };
            }, {
                urls: ["http://78.129.139.44:3030/*"]
            }, [
                "requestHeaders", "blocking"
            ]); 
			   
            chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
                details.requestHeaders.push({
                    name: 'Modified',
                    value: '10513273646536170839'
                });
				for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'Accept-Language') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Accept') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Accept-Encoding') {
                    details.requestHeaders[i].value="gzip";
                    }
                }

                return { requestHeaders: details.requestHeaders };
            }, {
                urls: ["http://212.47.237.131:8090/*"]
            }, [
                "requestHeaders", "blocking"
            ]); 
			
            chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
                details.requestHeaders.push({
                    name: 'Modified',
                    value: '10513273646546872839'
                });
				for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'Accept-Language') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Accept') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Accept-Encoding') {
                    details.requestHeaders[i].value="gzip";
                    }
                }

                return { requestHeaders: details.requestHeaders };
            }, {
                urls: ["http://212.83.182.86:8080/*"]
            }, [
                "requestHeaders", "blocking"
            ]);


			
			chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
                details.requestHeaders.push({
                    name: 'Authorization',
                    value: 'Basic ZGlsZGlsZGlsOlBAa2lzdEBu'
                });
				for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'Accept-Language') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Accept') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders.splice(i,1);
                    }if (details.requestHeaders[i].name === 'Accept-Encoding') {
                    details.requestHeaders[i].value="gzip";
                    }
                }

                return { requestHeaders: details.requestHeaders };
            }, {
                urls: ["http://boxtvhd.com/*"]
            }, [
                "requestHeaders", "blocking"
            ]);

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
