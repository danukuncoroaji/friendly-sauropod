const axios = require('axios');
const fs = require('fs');

var guildID = "916379725201563759";
var channelID = "1037811694564560966";

async function run() {
    try {
        const data = fs.readFileSync('config.json', 'utf8');
        const json = JSON.parse(data);

        for (const iterator of json.data) {
            await sendKomen(iterator.Authorization, iterator.content);
        }
    } catch (err) {
        console.error(err);
    }
}

async function sendKomen(auth, content) {
    const config = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.309 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36',
            'Host': 'discord.com',
            'Connection': 'keep-alive',
            'X-Super-Properties': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImlkLUlEIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk1LjAuNDYzOC42OSBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiOTUuMC40NjM4LjY5Iiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjEwNDE0NCwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0=',
            'Authorization': auth,
            'Accept-Language': 'en-US',
            'Content-Type': 'application/json',
            'Accept': '/',
            'Origin': 'https://discord.com',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Cookie': '__dcfduid=67fb3b701b7e11ec81b0e71d636e2a74; __sdcfduid=67fb3b711b7e11ec81b0e71d636e2a74dd1348e9b919c73ab7d69c0ba2cb34237994baa2d4b15cbb955ce54d227010a9; _gcl_au=1.1.1614913359.1632299031; _ga=GA1.2.2087218998.1632299032; _fbp=fb.1.1632299036476.947492841; __stripe_mid=221f42e3-b519-428c-ad2c-b1fd01b5b7962cef22; _gid=GA1.2.244866263.1636354926; OptanonConsent=isIABGlobal=false&datestamp=Tue+Nov+09+2021+18:34:11+GMT+0800+(Waktu+Standar+Singapura)&version=6.17.0&hosts=&landingPath=NotLandingPage&groups=C0001:1,C0002:1,C0003:1&AwaitingReconsent=false; locale=en-US; _gat_UA-53577205-2=1',
        },
        data: {
            content: content,
            nonce: Math.floor(Math.random() * 100000000000000000),
            tts: false,
        },
        method: 'post',
        url: `https://discord.com/api/v9/channels/${channelID}/messages`,
    };

    await axios(config)
        .then(response => {
            console.log("[" + now() + "]" + " - success : " + content);
        })
        .catch(error => {
            // if (!(error.response && error.response.status === 429)) {
            //     console.log("[" + now() + "]" + error);
            // }
        });
}

function now() {
    const now = new Date();
    const time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    return time;
}

setInterval(run, 10000);
